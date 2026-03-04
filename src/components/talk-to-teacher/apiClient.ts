import { supabase } from '@/integrations/supabase/client';

/* ── Response types ── */

interface SpeechToTextResponse {
  success: boolean;
  text: string;
  confidence: number;
  language: string;
  error?: string;
}

interface TranslateResponse {
  success: boolean;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  error?: string;
}

interface TextToSpeechResponse {
  success: boolean;
  audioBase64?: string;
  useBrowserFallback?: boolean;
  language: string;
  error?: string;
}

/* ── API calls (all go through Lovable Cloud edge functions → Azure) ── */

export async function speechRecognition(
  audioBase64: string,
  language: string,
): Promise<SpeechToTextResponse> {
  const { data, error } = await supabase.functions.invoke('speech-to-text', {
    body: { audio: audioBase64, language },
  });

  if (error) {
    console.error('[TTT] speech-to-text invoke error:', error);
    throw new Error('Speech recognition failed. Please try again.');
  }

  if (!data) throw new Error('Empty response from speech service.');
  return data as SpeechToTextResponse;
}

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
    throw new Error('Translation failed. Please try again.');
  }

  if (!data || !data.success) {
    throw new Error(data?.error || 'Translation failed.');
  }

  return data as TranslateResponse;
}

export async function textToSpeech(
  text: string,
  language: string,
  rate: number = 1.0,
): Promise<TextToSpeechResponse> {
  const { data, error } = await supabase.functions.invoke('text-to-speech', {
    body: { text, language, rate },
  });

  if (error) {
    console.error('[TTT] text-to-speech invoke error:', error);
    throw new Error('Text-to-speech failed.');
  }

  if (!data) throw new Error('Empty response from TTS service.');
  return data as TextToSpeechResponse;
}
