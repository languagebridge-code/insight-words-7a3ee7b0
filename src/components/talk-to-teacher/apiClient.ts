const API_BASE = 'https://api.languagebridge.app';
const TRIAL_KEY = 'trial_march2026';

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

const headers = {
  'Authorization': `Bearer ${TRIAL_KEY}`,
  'Content-Type': 'application/json',
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    throw new Error('Trial expired. Please refresh the page to get the latest key.');
  }
  if (res.status === 429) {
    throw new Error("You've reached your daily limit (50 translations). Try again tomorrow.");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || body.error || `Server error (${res.status})`);
  }
  return res.json();
}

export async function speechRecognition(
  audioBase64: string,
  language: string,
  sessionId: string
): Promise<SpeechRecognitionResponse> {
  const res = await fetch(`${API_BASE}/api/speechRecognition`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ audio: audioBase64, language, sessionId }),
  });
  return handleResponse<SpeechRecognitionResponse>(res);
}

export async function translate(
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
  sessionId: string
): Promise<TranslateResponse> {
  const res = await fetch(`${API_BASE}/api/translate`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text, sourceLanguage, targetLanguage, sessionId }),
  });
  return handleResponse<TranslateResponse>(res);
}

export async function textToSpeech(
  text: string,
  language: string,
  voice: 'standard' | 'neural' = 'standard',
  rate: number = 1.0
): Promise<TextToSpeechResponse> {
  const res = await fetch(`${API_BASE}/api/textToSpeech`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text, language, voice, rate }),
  });
  return handleResponse<TextToSpeechResponse>(res);
}
