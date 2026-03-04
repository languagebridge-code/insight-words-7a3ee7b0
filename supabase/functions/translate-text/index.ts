import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Map internal codes → Azure Translator codes
const TRANSLATOR_CODE: Record<string, string> = {
  prs: "prs",
  fa: "fa",
  ps: "ps",
  ar: "ar",
  ur: "ur",
  so: "so",
  uk: "uk",
  es: "es",
  en: "en",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, sourceLanguage, targetLanguage } = await req.json();

    if (!text || !sourceLanguage || !targetLanguage) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing text, sourceLanguage, or targetLanguage" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const TRANSLATOR_KEY = Deno.env.get("AZURE_TRANSLATOR_KEY");
    const TRANSLATOR_REGION = Deno.env.get("AZURE_TRANSLATOR_REGION");
    if (!TRANSLATOR_KEY || !TRANSLATOR_REGION) {
      throw new Error("Azure Translator credentials not configured");
    }

    const from = TRANSLATOR_CODE[sourceLanguage] || sourceLanguage;
    const to = TRANSLATOR_CODE[targetLanguage] || targetLanguage;

    const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": TRANSLATOR_KEY,
        "Ocp-Apim-Subscription-Region": TRANSLATOR_REGION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ Text: text }]),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[translate-text] Azure error:", response.status, errText);
      return new Response(
        JSON.stringify({ success: false, error: "Translation failed. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const translatedText = data?.[0]?.translations?.[0]?.text || "";

    if (!translatedText) {
      return new Response(
        JSON.stringify({ success: false, error: "No translation returned" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(`[translate-text] ${from} → ${to}: "${text.substring(0, 40)}…" → "${translatedText.substring(0, 40)}…"`);

    return new Response(
      JSON.stringify({
        success: true,
        translatedText,
        sourceLanguage: from,
        targetLanguage: to,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("[translate-text] Error:", e);
    return new Response(
      JSON.stringify({ success: false, error: "Translation service unavailable." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
