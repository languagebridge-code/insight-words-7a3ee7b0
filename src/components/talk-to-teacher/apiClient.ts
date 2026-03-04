import { supabase } from '@/integrations/supabase/client';

interface SpeechRecognitionResponse {
  success: boolean;
  text: string;
  confidence: number;
  language: string;
  error?: string;
  message?: string;
}

interface TranslateResponse {
  success: boolean;
  translatedText: string;
  confidence: number;
  sourceLanguage: string;
  targetLanguage: string;
  error?: string;
  message?: string;
}

interface TextToSpeechResponse {
  success: boolean;
  audioUrl?: string;
  audioBase64?: string;
  durationMs: number;
  language: string;
  error?: string;
  message?: string;
}

type ProxyEndpoint = 'speechRecognition' | 'translate' | 'textToSpeech';

async function invokeProxy<T>(endpoint: ProxyEndpoint, payload: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('talk-to-teacher-proxy', {
    body: { endpoint, payload },
  });

  if (error) {
    console.error(`[TTT] Proxy invoke failed for ${endpoint}:`, error);
    throw new Error('Load failed: could not reach translation service. Please try again.');
  }

  if (!data) {
    throw new Error('Load failed: empty response from translation service.');
  }

  return data as T;
}

export async function speechRecognition(
  audioBase64: string,
  language: string,
  sessionId: string
): Promise<SpeechRecognitionResponse> {
  return invokeProxy<SpeechRecognitionResponse>('speechRecognition', {
    audio: audioBase64,
    language,
    sessionId,
  });
}

export async function translate(
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
  sessionId: string
): Promise<TranslateResponse> {
  return invokeProxy<TranslateResponse>('translate', {
    text,
    sourceLanguage,
    targetLanguage,
    sessionId,
  });
}

export async function textToSpeech(
  text: string,
  language: string,
  voice: 'standard' | 'neural' = 'standard',
  rate: number = 1.0
): Promise<TextToSpeechResponse> {
  return invokeProxy<TextToSpeechResponse>('textToSpeech', {
    text,
    language,
    voice,
    rate,
  });
}
