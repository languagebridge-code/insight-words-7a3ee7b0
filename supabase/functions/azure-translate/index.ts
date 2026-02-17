import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins: your domain + Chrome extension
const ALLOWED_ORIGINS = [
  'https://insight-words.lovable.app',
  'https://languagebridge.app',
  'https://www.languagebridge.app',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('Origin') || '';
  // Allow Chrome extensions and known origins
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || origin.startsWith('chrome-extension://');
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-school-id, x-classroom-id, x-teacher-id',
    'Vary': 'Origin',
  };
}

// Simple in-memory rate limiter (per function instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 60; // requests per window
const RATE_WINDOW_MS = 60_000; // 1 minute

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const AZURE_TRANSLATOR_KEY = Deno.env.get('AZURE_TRANSLATOR_KEY');
    const AZURE_TRANSLATOR_REGION = Deno.env.get('AZURE_TRANSLATOR_REGION') || 'eastus';
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!AZURE_TRANSLATOR_KEY) {
      console.error('AZURE_TRANSLATOR_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Translation service unavailable.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract context from headers
    const classroomCode = req.headers.get('x-classroom-id') || '';
    const teacherCode = req.headers.get('x-teacher-id') || '';

    // Require a valid classroom code for all requests
    if (!classroomCode) {
      return new Response(
        JSON.stringify({ error: 'Classroom code is required.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limit by classroom code
    if (isRateLimited(classroomCode)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again shortly.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await req.json();
    const { text, sourceLanguage, targetLanguage } = body.data || body;

    if (!text || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: text, targetLanguage' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Translation request: ${sourceLanguage || 'auto'} → ${targetLanguage}`);

    // Call Azure Translator API
    const azureUrl = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0${sourceLanguage ? `&from=${sourceLanguage}` : ''}&to=${targetLanguage}`;
    
    const azureResponse = await fetch(azureUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ text }]),
    });

    if (!azureResponse.ok) {
      const errorText = await azureResponse.text();
      console.error('Azure API error:', azureResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Translation service temporarily unavailable. Please try again.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const azureResult = await azureResponse.json();
    const translation = azureResult[0]?.translations[0]?.text || text;
    const detectedLanguage = azureResult[0]?.detectedLanguage?.language || sourceLanguage || 'en';

    console.log(`Translation successful: ${text.substring(0, 50)}... → ${translation.substring(0, 50)}...`);

    // Log analytics if classroom code is provided
    if (classroomCode && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        
        // Find classroom by code
        const { data: classroom, error: classroomError } = await supabase
          .from('classrooms')
          .select('id')
          .eq('classroom_code', classroomCode)
          .maybeSingle();

        if (classroom && !classroomError) {
          const now = new Date();
          const sessionDate = now.toISOString().split('T')[0];
          const hour = now.getUTCHours();
          const langPair = `${detectedLanguage}-${targetLanguage}`;

          // Use the upsert function to log analytics
          const { error: analyticsError } = await supabase.rpc('upsert_analytics_daily', {
            p_classroom_id: classroom.id,
            p_session_date: sessionDate,
            p_translation_count: 1,
            p_characters: text.length,
            p_lang_pair: langPair,
            p_hour: hour,
          });

          if (analyticsError) {
            console.error('Analytics logging error:', analyticsError);
          } else {
            console.log(`Analytics logged for classroom ${classroomCode}`);
          }
        } else {
          console.log(`Classroom not found for code: ${classroomCode}`);
        }
      } catch (analyticsErr) {
        console.error('Failed to log analytics:', analyticsErr);
        // Don't fail the request if analytics logging fails
      }
    }

    return new Response(
      JSON.stringify({ 
        translation,
        detectedLanguage,
        originalText: text,
        targetLanguage,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Translation function error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
