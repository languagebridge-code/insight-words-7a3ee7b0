import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExtensionEvent {
  user_id: string
  session_id: string
  event_name: string
  properties?: Record<string, unknown>
  classroom_id?: string
  extension_version?: string
  teacher_email?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const event: ExtensionEvent = await req.json()

    console.log('Received extension event:', event.event_name, 'from user:', event.user_id)

    // Validate required fields
    if (!event.user_id || !event.session_id || !event.event_name) {
      console.error('Missing required fields:', { user_id: event.user_id, session_id: event.session_id, event_name: event.event_name })
      return new Response(
        JSON.stringify({ error: 'Missing required fields: user_id, session_id, event_name' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert the event into analytics_events table
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        user_id: event.user_id,
        session_id: event.session_id,
        event_name: event.event_name,
        properties: event.properties || {},
        classroom_id: event.classroom_id || null,
        extension_version: event.extension_version || null,
        teacher_email: event.teacher_email || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Database insert error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to save event. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Event saved successfully:', data.id)

    return new Response(
      JSON.stringify({ success: true, event_id: data.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
