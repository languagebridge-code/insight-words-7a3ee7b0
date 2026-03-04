import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, sourceLanguage, targetLanguage } = await req.json();

    if (!text || !sourceLanguage || !targetLanguage) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields: text, sourceLanguage, targetLanguage" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the user's text from ${sourceLanguage} to ${targetLanguage}. Return ONLY the translated text — no explanations, no quotation marks, no extra formatting. Preserve the tone and meaning as accurately as possible. This is for a school setting where a teacher and student are communicating.`,
          },
          { role: "user", content: text },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[translate-text] AI gateway error:", response.status, errText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limited — please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "AI usage limit reached." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({ success: false, error: "Translation service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content?.trim();

    if (!translatedText) {
      return new Response(
        JSON.stringify({ success: false, error: "No translation returned" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(`[translate-text] ${sourceLanguage} → ${targetLanguage}: "${text.substring(0, 40)}…" → "${translatedText.substring(0, 40)}…"`);

    return new Response(
      JSON.stringify({ success: true, translatedText, sourceLanguage, targetLanguage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("[translate-text] Error:", e);
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
