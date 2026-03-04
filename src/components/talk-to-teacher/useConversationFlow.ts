import { useRef, useCallback } from 'react';
import { useAudioRecorder } from './useAudioRecorder';
import { speechRecognition, translate, textToSpeech } from './apiClient';
import { speakText } from './browserSpeech';
import { isRateLimited, incrementUsage, getRemainingCount } from './rateLimiter';
import { SpeakerState, SUPPORTED_LANGUAGES } from './types';
import { toast } from 'sonner';

// Shared AudioContext — unlocked on first user tap to bypass autoplay policy
let sharedAudioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext {
  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioContext();
  }
  return sharedAudioCtx;
}

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

  const playAudio = useCallback(async (audioBase64?: string): Promise<void> => {
    if (!audioBase64) return;
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();

      const binaryStr = atob(audioBase64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

      const audioBuffer = await ctx.decodeAudioData(bytes.buffer);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      return new Promise<void>((resolve) => {
        source.onended = () => resolve();
        source.start(0);
      });
    } catch (err) {
      console.warn('[TTT] AudioContext playback failed, trying Audio element fallback', err);
      // Fallback to Audio element
      return new Promise((resolve) => {
        const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });
    }
  }, []);

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
      // 1. Stop recording → get base64
      const audioBase64 = await recorder.stopRecording();

      // 2. Transcribe via Azure Speech-to-Text
      setSpeakerState('transcribing');
      const transcription = await speechRecognition(audioBase64, speakerLang);
      if (!transcription.success || !transcription.text) {
        toast.error('🔊 Could not hear you clearly. Please speak louder.');
        resetStates();
        return;
      }
      setSpeakerText(transcription.text);

      // 3. Translate via Azure Translator
      setSpeakerState('translating');
      const translation = await translate(transcription.text, speakerLang, targetLang);
      if (!translation.success) {
        toast.error('⚠️ Translation failed. Please try again.');
        resetStates();
        return;
      }
      setTargetText(translation.translatedText);
      incrementUsage();

      // 4. Text-to-speech (if autoPlay)
      if (deps.settings.autoPlay) {
        setTargetState('speaking');
        setSpeakerState('idle');
        try {
          const tts = await textToSpeech(translation.translatedText, targetLang);
          if (tts.success) {
            if (tts.useBrowserFallback) {
              // Language not supported by Azure TTS — use browser
              await speakText(translation.translatedText, targetLang);
            } else if (tts.audioBase64) {
              await playAudio(tts.audioBase64);
            }
          }
        } catch {
          // Non-critical — translation text is still shown
        }
      }

      // 5. Add to history
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
  }, [recorder, deps, resetStates, playAudio]);

  const handleTap = useCallback(async (role: 'student' | 'teacher') => {
    if (isRateLimited()) {
      toast.error("⏳ You've reached your daily limit (50 translations). Try again tomorrow.");
      return;
    }

    // Unlock AudioContext during user gesture (critical for autoplay policy)
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const speakerLang = role === 'student' ? deps.settings.studentLanguage : deps.settings.teacherLanguage;
    const setSpeakerState = role === 'student' ? deps.setStudentState : deps.setTeacherState;
    const setTargetState = role === 'student' ? deps.setTeacherState : deps.setStudentState;
    const setSpeakerText = role === 'student' ? deps.setStudentText : deps.setTeacherText;
    const setTargetText = role === 'student' ? deps.setTeacherText : deps.setStudentText;

    deps.setActiveZone(role);
    setSpeakerState('listening');
    setTargetState('disabled');
    setSpeakerText('');
    setTargetText('');

    try {
      await recorder.startRecording();

      // Auto-stop after 30 seconds
      autoStopTimerRef.current = setTimeout(() => {
        if (recorder.isRecording) {
          const targetLang = role === 'student' ? deps.settings.teacherLanguage : deps.settings.studentLanguage;
          const speakerLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === speakerLang);
          processRecording(
            role, speakerLang, targetLang,
            setSpeakerState, setTargetState,
            setSpeakerText, setTargetText,
            speakerLangInfo?.name || speakerLang,
          );
        }
      }, 30000);
    } catch {
      resetStates();
    }
  }, [deps, recorder, resetStates, processRecording]);

  return {
    handleTap,
    handleStop: async (activeZone: 'student' | 'teacher' | null) => {
      if (autoStopTimerRef.current) {
        clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = null;
      }

      if (!recorder.isRecording || !activeZone) {
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
        speakerLangInfo?.name || speakerLang,
      );
    },
    recorderError: recorder.error,
    isRecording: recorder.isRecording,
    remainingTranslations: getRemainingCount(),
  };
}
