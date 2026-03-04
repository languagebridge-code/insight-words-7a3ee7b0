/**
 * Browser-native Speech Recognition (Web Speech API) and Speech Synthesis.
 * Eliminates external STT/TTS dependencies.
 */

// Map our internal language codes to BCP-47 codes for the Web Speech API
const LANG_TO_BCP47: Record<string, string> = {
  prs: 'fa-AF',   // Dari → Persian (Afghanistan)
  fa:  'fa-IR',   // Farsi → Persian (Iran)
  ps:  'ps-AF',   // Pashto
  ar:  'ar-SA',   // Arabic
  ur:  'ur-PK',   // Urdu
  so:  'so-SO',   // Somali
  uk:  'uk-UA',   // Ukrainian
  es:  'es-US',   // Spanish (US variant — common in schools)
  en:  'en-US',   // English
};

export function getBcp47(code: string): string {
  return LANG_TO_BCP47[code] || code;
}

/** Check if browser supports SpeechRecognition */
export function isSpeechRecognitionSupported(): boolean {
  return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/**
 * Listen via the Web Speech API.
 * Returns the recognised transcript.
 * Rejects if no speech detected or on error.
 */
export function listenForSpeech(
  languageCode: string,
  opts?: { maxDurationMs?: number },
): { promise: Promise<string>; abort: () => void } {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      promise: Promise.reject(new Error('Speech recognition is not supported in this browser. Please use Chrome.')),
      abort: () => {},
    };
  }

  const recognition = new SpeechRecognition();
  recognition.lang = getBcp47(languageCode);
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  let settled = false;
  const maxDuration = opts?.maxDurationMs ?? 30_000;

  const timer = setTimeout(() => {
    if (!settled) recognition.stop();
  }, maxDuration);

  const promise = new Promise<string>((resolve, reject) => {
    recognition.onresult = (event: any) => {
      settled = true;
      clearTimeout(timer);
      const transcript = event.results[0]?.[0]?.transcript || '';
      if (!transcript.trim()) {
        reject(new Error('Could not hear you clearly. Please speak louder.'));
      } else {
        resolve(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      settled = true;
      clearTimeout(timer);
      if (event.error === 'no-speech') {
        reject(new Error('No speech detected. Please try again.'));
      } else if (event.error === 'not-allowed') {
        reject(new Error('Microphone access required. Please enable in browser settings.'));
      } else if (event.error === 'aborted') {
        reject(new Error('__aborted__'));
      } else {
        reject(new Error(`Speech error: ${event.error}`));
      }
    };

    recognition.onend = () => {
      clearTimeout(timer);
      if (!settled) {
        settled = true;
        reject(new Error('No speech detected. Please try again.'));
      }
    };

    recognition.start();
  });

  return {
    promise,
    abort: () => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        recognition.abort();
      }
    },
  };
}

/**
 * Speak text using the browser's SpeechSynthesis API.
 * Resolves when speaking is done.
 */
export function speakText(text: string, languageCode: string, rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      console.warn('[TTT] SpeechSynthesis not supported');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getBcp47(languageCode);
    utterance.rate = rate;

    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const bcp47 = getBcp47(languageCode);
    const match = voices.find(v => v.lang.startsWith(bcp47.split('-')[0]));
    if (match) utterance.voice = match;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve(); // Non-critical — still resolve

    window.speechSynthesis.speak(utterance);

    // Safety timeout — some browsers hang
    setTimeout(() => {
      resolve();
    }, 30_000);
  });
}
