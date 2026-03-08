import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map internal codes → Azure STT locale
const STT_LOCALE: Record<string, string> = {
  prs: "fa-IR",
  fa: "fa-IR",
  ps: "ps-AF",
  ar: "ar-SA",
  ur: "ur-PK",
  so: "so-SO",
  uk: "uk-UA",
  es: "es-US",
  en: "en-US",
};

function logUsage(service: string, chars: number, success: boolean, lang?: string) {
  try {
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) return;
    fetch(`${url}/rest/v1/ttt_usage_log`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ service, characters: chars, language: lang || null, success }),
    }).catch(() => {});
  } catch {}
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, language, mimeType } = await req.json();

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

    const binaryStr = atob(audio);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    let contentType = "audio/wav";
    if (mimeType?.includes("webm") && mimeType?.includes("opus")) {
      contentType = "audio/webm;codecs=opus";
    } else if (mimeType?.includes("ogg")) {
      contentType = "audio/ogg;codecs=opus";
    } else if (mimeType?.includes("webm")) {
      contentType = "audio/webm";
    } else if (mimeType?.includes("mp4")) {
      contentType = "audio/mp4";
    }

    console.log(`[speech-to-text] Using content-type: ${contentType} (from: ${mimeType})`);

    const url = `https://${SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${locale}&format=detailed`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": SPEECH_KEY,
        "Content-Type": contentType,
        "Accept": "application/json",
      },
      body: bytes.buffer,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[speech-to-text] Azure error:", response.status, errText);
      logUsage("stt", 0, false, locale);
      return new Response(
        JSON.stringify({ success: false, error: "Speech recognition failed. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const recognized = data.RecognitionStatus === "Success";
    const text = data.NBest?.[0]?.Display || data.DisplayText || "";
    const confidence = data.NBest?.[0]?.Confidence || 0;

    logUsage("stt", text.length, recognized && !!text, locale);
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
