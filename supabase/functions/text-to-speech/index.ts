import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map internal codes → Azure TTS voice name + locale
const TTS_VOICES: Record<string, { locale: string; voice: string }> = {
  prs: { locale: "fa-IR", voice: "fa-IR-DilaraNeural" }, // Dari → Persian voice
  fa: { locale: "fa-IR", voice: "fa-IR-DilaraNeural" },
  ar: { locale: "ar-SA", voice: "ar-SA-HamedNeural" },
  ur: { locale: "ur-PK", voice: "ur-PK-AsadNeural" },
  uk: { locale: "uk-UA", voice: "uk-UA-OstapNeural" },
  es: { locale: "es-US", voice: "es-US-AlonsoNeural" },
  en: { locale: "en-US", voice: "en-US-JennyNeural" },
};

// Languages without Azure TTS support — client will use browser SpeechSynthesis
const UNSUPPORTED_TTS = new Set(["ps", "so"]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, language, rate } = await req.json();

    if (!text || !language) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing text or language" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // If language not supported by Azure TTS, tell client to use browser fallback
    if (UNSUPPORTED_TTS.has(language) || !TTS_VOICES[language]) {
      return new Response(
        JSON.stringify({ success: true, useBrowserFallback: true, language }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const SPEECH_KEY = Deno.env.get("AZURE_SPEECH_KEY");
    const SPEECH_REGION = Deno.env.get("AZURE_SPEECH_REGION");
    if (!SPEECH_KEY || !SPEECH_REGION) {
      throw new Error("Azure Speech credentials not configured");
    }

    const voiceInfo = TTS_VOICES[language];
    const speakRate = rate && rate !== 1.0 ? ` rate="${((rate - 1) * 100).toFixed(0)}%"` : "";

    const ssml = `<speak version='1.0' xml:lang='${voiceInfo.locale}'>
  <voice name='${voiceInfo.voice}'>
    <prosody${speakRate}>${escapeXml(text)}</prosody>
  </voice>
</speak>`;

    const url = `https://${SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": SPEECH_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
      },
      body: ssml,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[text-to-speech] Azure error:", response.status, errText);
      return new Response(
        JSON.stringify({ success: false, error: "Text-to-speech failed." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Convert audio response to base64
    const audioBuffer = await response.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    console.log(`[text-to-speech] ${voiceInfo.voice}: ${text.substring(0, 40)}… (${audioBuffer.byteLength} bytes)`);

    return new Response(
      JSON.stringify({
        success: true,
        audioBase64: base64,
        language: voiceInfo.locale,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("[text-to-speech] Error:", e);
    return new Response(
      JSON.stringify({ success: false, error: "Text-to-speech service unavailable." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
