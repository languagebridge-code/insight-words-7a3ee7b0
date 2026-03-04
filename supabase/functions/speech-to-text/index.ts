import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map internal codes → Azure STT locale
const STT_LOCALE: Record<string, string> = {
  prs: "fa-IR", // Dari → Persian fallback
  fa: "fa-IR",
  ps: "ps-AF",
  ar: "ar-SA",
  ur: "ur-PK",
  so: "so-SO",
  uk: "uk-UA",
  es: "es-US",
  en: "en-US",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, language } = await req.json();

    if (!audio || !language) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing audio or language" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const SPEECH_KEY = Deno.env.get("AZURE_SPEECH_KEY");
    const SPEECH_REGION = Deno.env.get("AZURE_SPEECH_REGION");
    if (!SPEECH_KEY || !SPEECH_REGION) {
      throw new Error("Azure Speech credentials not configured");
    }

    const locale = STT_LOCALE[language] || "en-US";

    // Decode base64 audio
    const binaryStr = atob(audio);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    const url = `https://${SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${locale}&format=detailed`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": SPEECH_KEY,
        "Content-Type": "audio/webm; codecs=opus",
        "Accept": "application/json",
      },
      body: bytes.buffer,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[speech-to-text] Azure error:", response.status, errText);
      return new Response(
        JSON.stringify({ success: false, error: "Speech recognition failed. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const recognized = data.RecognitionStatus === "Success";
    const text = data.NBest?.[0]?.Display || data.DisplayText || "";
    const confidence = data.NBest?.[0]?.Confidence || 0;

    console.log(`[speech-to-text] ${locale}: "${text.substring(0, 60)}…" (confidence: ${confidence})`);

    return new Response(
      JSON.stringify({
        success: recognized && !!text,
        text,
        confidence,
        language: locale,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("[speech-to-text] Error:", e);
    return new Response(
      JSON.stringify({ success: false, error: "Speech recognition service unavailable." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
