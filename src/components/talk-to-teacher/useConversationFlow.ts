import { useRef, useCallback } from 'react';
import { useAudioRecorder } from './useAudioRecorder';
import { speechRecognition, translate, textToSpeech } from './apiClient';
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
  const recorder = useAudioRecorder();
  const sessionIdRef = useRef(crypto.randomUUID());
  const autoStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetStates = useCallback(() => {
    deps.setStudentState('idle');
    deps.setTeacherState('idle');
    deps.setActiveZone(null);
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }
  }, [deps]);

  const playAudioFromResponse = useCallback(async (audioUrl?: string, audioBase64?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let src: string;
      if (audioBase64) {
        // Prefer base64 — more reliable on mobile
        src = `data:audio/mp3;base64,${audioBase64}`;
      } else if (audioUrl) {
        src = audioUrl;
      } else {
        resolve();
        return;
      }
      const audio = new Audio();
      audio.onended = () => resolve();
      audio.onerror = (e) => {
        console.error('[TTT] Audio playback error:', e);
        // Don't reject — TTS failure is non-critical
        resolve();
      };
      // Set src after attaching handlers
      audio.src = src;
      audio.play().catch((err) => {
        console.error('[TTT] Audio play() rejected:', err);
        // Non-critical — resolve instead of reject
        resolve();
      });
    });
  }, []);

  const handleTap = useCallback(async (role: 'student' | 'teacher') => {
    // Check rate limit first
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
      // 1. Record audio
      await recorder.startRecording();

      // Auto-stop after 30 seconds
      autoStopTimerRef.current = setTimeout(async () => {
        if (recorder.isRecording) {
          await processRecording(role, speakerLang, targetLang, setSpeakerState, setTargetState, setSpeakerText, setTargetText, speakerLangInfo?.name || speakerLang);
        }
      }, 30000);
    } catch {
      resetStates();
    }
  }, [deps, recorder, resetStates]);

  const processRecording = useCallback(async (
    role: 'student' | 'teacher',
    speakerLang: string,
    targetLang: string,
    setSpeakerState: (s: SpeakerState) => void,
    setTargetState: (s: SpeakerState) => void,
    setSpeakerText: (t: string) => void,
    setTargetText: (t: string) => void,
    langName: string,
  ) => {
    try {
      // 2. Stop recording → get base64
      const audioBase64 = await recorder.stopRecording();

      // 3. Transcribe
      setSpeakerState('transcribing');
      const transcription = await speechRecognition(audioBase64, speakerLang, sessionIdRef.current);
      if (!transcription.success || !transcription.text) {
        toast.error('🔊 Could not hear you clearly. Please speak louder.');
        resetStates();
        return;
      }
      setSpeakerText(transcription.text);

      // 4. Translate
      setSpeakerState('translating');
      const translation = await translate(transcription.text, speakerLang, targetLang, sessionIdRef.current);
      if (!translation.success) {
        toast.error('⚠️ Translation failed. Please try again.');
        resetStates();
        return;
      }
      setTargetText(translation.translatedText);
      incrementUsage();

      // 5. Text-to-speech (if autoPlay)
      if (deps.settings.autoPlay) {
        setTargetState('speaking');
        setSpeakerState('idle');
        try {
          const tts = await textToSpeech(translation.translatedText, targetLang);
          if (tts.success) {
            await playAudioFromResponse(tts.audioUrl, tts.audioBase64);
          }
        } catch {
          // Non-critical — translation still worked
        }
      }

      // 6. Add to history
      deps.addHistoryEntry({
        role,
        language: langName,
        languageCode: speakerLang,
        originalText: transcription.text,
        translatedText: translation.translatedText,
        timestamp: new Date(),
      });

      resetStates();
    } catch (err: any) {
      toast.error(err.message || '❌ Something went wrong. Please try again.');
      resetStates();
    }
  }, [recorder, deps, resetStates, playAudioFromResponse]);

  const handleStop = useCallback(async () => {
    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }

    if (!recorder.isRecording) {
      resetStates();
      return;
    }

    // Determine which role is active from current state
    const speakerLang = deps.settings.studentLanguage;
    const targetLang = deps.settings.teacherLanguage;

    // We need to figure out who was recording — check activeZone from parent
    // This is called from TalkToTeacherApp which knows the activeZone
  }, [recorder, resetStates, deps]);

  return {
    handleTap,
    handleStop: async (activeZone: 'student' | 'teacher' | null) => {
      if (autoStopTimerRef.current) {
        clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = null;
      }

      if (!recorder.isRecording) {
        resetStates();
        return;
      }

      if (!activeZone) {
        resetStates();
        return;
      }

      const speakerLang = activeZone === 'student' ? deps.settings.studentLanguage : deps.settings.teacherLanguage;
      const targetLang = activeZone === 'student' ? deps.settings.teacherLanguage : deps.settings.studentLanguage;
      const setSpeakerState = activeZone === 'student' ? deps.setStudentState : deps.setTeacherState;
      const setTargetState = activeZone === 'student' ? deps.setTeacherState : deps.setStudentState;
      const setSpeakerText = activeZone === 'student' ? deps.setStudentText : deps.setTeacherText;
      const setTargetText = activeZone === 'student' ? deps.setTeacherText : deps.setStudentText;
      const speakerLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === speakerLang);

      await processRecording(
        activeZone, speakerLang, targetLang,
        setSpeakerState, setTargetState,
        setSpeakerText, setTargetText,
        speakerLangInfo?.name || speakerLang
      );
    },
    recorderError: recorder.error,
    isRecording: recorder.isRecording,
    remainingTranslations: getRemainingCount(),
  };
}
