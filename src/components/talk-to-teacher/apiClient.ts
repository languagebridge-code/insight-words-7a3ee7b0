import { supabase } from '@/integrations/supabase/client';

interface TranslateResponse {
  success: boolean;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  error?: string;
}

/**
 * Translate text via the Lovable Cloud edge function (powered by Gemini AI).
 * No external API keys needed.
 */
export async function translate(
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
): Promise<TranslateResponse> {
  const { data, error } = await supabase.functions.invoke('translate-text', {
    body: { text, sourceLanguage, targetLanguage },
  });

  if (error) {
    console.error('[TTT] translate invoke error:', error);
    throw new Error('Translation failed — could not reach the service. Please try again.');
  }

  if (!data || !data.success) {
    throw new Error(data?.error || 'Translation failed.');
  }

  return data as TranslateResponse;
}
