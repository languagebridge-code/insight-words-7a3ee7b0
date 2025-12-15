import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-extension-key',
};

interface UsageEvent {
  teacher_email: string;
  event_type: 'translation' | 'simplification' | 'vocabulary_lookup' | 'talk_to_teacher' | 'session_start' | 'session_end';
  language?: string;
  session_minutes?: number;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const event: UsageEvent = await req.json();
    
    console.log('Received usage event:', JSON.stringify(event));

    // Validate required fields
    if (!event.teacher_email || !event.event_type) {
      console.error('Missing required fields:', { teacher_email: event.teacher_email, event_type: event.event_type });
      return new Response(
        JSON.stringify({ error: 'teacher_email and event_type are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Find the teacher by email
    const { data: teacher, error: teacherError } = await supabase
      .from('teachers')
      .select('id')
      .eq('email', event.teacher_email)
      .maybeSingle();

    if (teacherError) {
      console.error('Error finding teacher:', teacherError);
      return new Response(
        JSON.stringify({ error: 'Failed to find teacher' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!teacher) {
      console.error('Teacher not found:', event.teacher_email);
      return new Response(
        JSON.stringify({ error: 'Teacher not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const today = new Date().toISOString().split('T')[0];

    // Get or create today's analytics record
    const { data: existing, error: fetchError } = await supabase
      .from('usage_analytics')
      .select('*')
      .eq('teacher_id', teacher.id)
      .eq('session_date', today)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching analytics:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch analytics' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare update based on event type
    let updateData: Record<string, any> = {};
    
    if (existing) {
      // Update existing record
      switch (event.event_type) {
        case 'translation':
          updateData.translation_count = (existing.translation_count || 0) + 1;
          break;
        case 'simplification':
          updateData.simplification_count = (existing.simplification_count || 0) + 1;
          break;
        case 'vocabulary_lookup':
          updateData.vocabulary_lookups = (existing.vocabulary_lookups || 0) + 1;
          break;
        case 'talk_to_teacher':
          updateData.talk_to_teacher_uses = (existing.talk_to_teacher_uses || 0) + 1;
          break;
        case 'session_start':
          updateData.student_sessions = (existing.student_sessions || 0) + 1;
          break;
        case 'session_end':
          if (event.session_minutes) {
            updateData.total_session_minutes = (existing.total_session_minutes || 0) + event.session_minutes;
          }
          break;
      }

      // Track language usage
      if (event.language) {
        const currentLanguages = existing.languages_used || [];
        if (!currentLanguages.includes(event.language)) {
          updateData.languages_used = [...currentLanguages, event.language];
        }
      }

      const { error: updateError } = await supabase
        .from('usage_analytics')
        .update(updateData)
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error updating analytics:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update analytics' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Updated analytics for teacher:', teacher.id, updateData);
    } else {
      // Create new record for today
      const newRecord: Record<string, any> = {
        teacher_id: teacher.id,
        session_date: today,
        translation_count: event.event_type === 'translation' ? 1 : 0,
        simplification_count: event.event_type === 'simplification' ? 1 : 0,
        vocabulary_lookups: event.event_type === 'vocabulary_lookup' ? 1 : 0,
        talk_to_teacher_uses: event.event_type === 'talk_to_teacher' ? 1 : 0,
        student_sessions: event.event_type === 'session_start' ? 1 : 0,
        total_session_minutes: event.session_minutes || 0,
        languages_used: event.language ? [event.language] : [],
      };

      const { error: insertError } = await supabase
        .from('usage_analytics')
        .insert(newRecord);

      if (insertError) {
        console.error('Error inserting analytics:', insertError);
        return new Response(
          JSON.stringify({ error: 'Failed to create analytics record' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Created new analytics record for teacher:', teacher.id);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Usage event recorded' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
