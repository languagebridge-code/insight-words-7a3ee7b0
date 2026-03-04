import { useRef, useCallback } from 'react';
import { translate } from './apiClient';
import { listenForSpeech, speakText, isSpeechRecognitionSupported } from './browserSpeech';
import { isRateLimited, incrementUsage, getRemainingCount } from './rateLimiter';
import { SpeakerState, SUPPORTED_LANGUAGES } from './types';
import { toast } from 'sonner';

interface ConversationDeps {
  settings: { studentLanguage: string; teacherLanguage: string; autoPlay: boolean; showTranscript: boolean };
  setStudentState: (s: SpeakerState) => void;
  setTeacherState: (s: SpeakerState) => void;
  setStudentText: (t: string) => void;
  setTeacherText: (t: string) => void;
  setActiveZone: (z: 'student' | 'teacher' | null) => void;
  addHistoryEntry: (entry: any) => void;
}

export function useConversationFlow(deps: ConversationDeps) {
  const sessionIdRef = useRef(crypto.randomUUID());
  const abortRef = useRef<(() => void) | null>(null);

  const resetStates = useCallback(() => {
    deps.setStudentState('idle');
    deps.setTeacherState('idle');
    deps.setActiveZone(null);
    abortRef.current = null;
  }, [deps]);

  const handleTap = useCallback(async (role: 'student' | 'teacher') => {
    // Check browser support
    if (!isSpeechRecognitionSupported()) {
      toast.error('Speech recognition requires Chrome or Edge browser.');
      return;
    }

    // Check rate limit
    if (isRateLimited()) {
      toast.error("⏳ You've reached your daily limit (50 translations). Try again tomorrow.");
      return;
    }

    const speakerLang = role === 'student' ? deps.settings.studentLanguage : deps.settings.teacherLanguage;
    const targetLang = role === 'student' ? deps.settings.teacherLanguage : deps.settings.studentLanguage;
    const setSpeakerState = role === 'student' ? deps.setStudentState : deps.setTeacherState;
    const setTargetState = role === 'student' ? deps.setTeacherState : deps.setStudentState;
    const setSpeakerText = role === 'student' ? deps.setStudentText : deps.setTeacherText;
    const setTargetText = role === 'student' ? deps.setTeacherText : deps.setStudentText;
    const speakerLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === speakerLang);

    deps.setActiveZone(role);
    setSpeakerState('listening');
    setTargetState('disabled');
    setSpeakerText('');
    setTargetText('');

    try {
      // 1. Listen via browser Speech Recognition
      const { promise, abort } = listenForSpeech(speakerLang);
      abortRef.current = abort;

      const transcript = await promise;
      abortRef.current = null;
      setSpeakerText(transcript);

      // 2. Translate via Lovable Cloud
      setSpeakerState('translating');
      const sourceName = speakerLangInfo?.name || speakerLang;
      const targetName = SUPPORTED_LANGUAGES.find(l => l.code === targetLang)?.name || targetLang;

      const result = await translate(transcript, sourceName, targetName);
      if (!result.success) {
        toast.error('⚠️ Translation failed. Please try again.');
        resetStates();
        return;
      }
      setTargetText(result.translatedText);
      incrementUsage();

      // 3. Speak translation via browser TTS (if autoPlay)
      if (deps.settings.autoPlay) {
        setTargetState('speaking');
        setSpeakerState('idle');
        try {
          await speakText(result.translatedText, targetLang);
        } catch {
          // Non-critical
        }
      }

      // 4. Add to history
      deps.addHistoryEntry({
        role,
        language: sourceName,
        languageCode: speakerLang,
        originalText: transcript,
        translatedText: result.translatedText,
        timestamp: new Date(),
      });

      resetStates();
    } catch (err: any) {
      if (err.message === '__aborted__') {
        resetStates();
        return;
      }
      toast.error(err.message || '❌ Something went wrong. Please try again.');
      resetStates();
    }
  }, [deps, resetStates]);

  const handleStop = useCallback(async (_activeZone: 'student' | 'teacher' | null) => {
    // Abort ongoing speech recognition
    if (abortRef.current) {
      abortRef.current();
      abortRef.current = null;
    }
    // Cancel any ongoing TTS
    window.speechSynthesis?.cancel();
    resetStates();
  }, [resetStates]);

  return {
    handleTap,
    handleStop,
    recorderError: null as string | null,
    isRecording: false,
    remainingTranslations: getRemainingCount(),
  };
}
