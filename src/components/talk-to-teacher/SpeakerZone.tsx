import { Mic, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpeakerState, SUPPORTED_LANGUAGES, RTL_LANGUAGES } from './types';
import { AudioWaveform } from './AudioWaveform';
import { useState, useEffect } from 'react';

interface SpeakerZoneProps {
  role: 'student' | 'teacher';
  state: SpeakerState;
  languageCode: string;
  text: string;
  disabled: boolean;
  onTap: () => void;
}

const STATE_LABELS: Record<SpeakerState, string> = {
  idle: 'Tap to speak',
  listening: 'Listening...',
  transcribing: 'Transcribing...',
  translating: 'Translating...',
  speaking: 'Playing audio...',
  disabled: '',
};

const PIPELINE_STEPS = ['transcribing', 'translating', 'speaking'] as const;

function ProcessingIndicator({ state }: { state: SpeakerState }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    const interval = setInterval(() => setElapsed(e => e + 0.1), 100);
    return () => clearInterval(interval);
  }, [state]);

  const currentIdx = PIPELINE_STEPS.indexOf(state as any);
  if (currentIdx === -1) return null;

  return (
    <div className="w-full mt-2 space-y-2">
      <div className="flex items-center justify-center gap-3">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={cn(
              'w-2.5 h-2.5 rounded-full transition-all duration-300',
              i < currentIdx ? 'bg-green-400' :
              i === currentIdx ? 'bg-white animate-pulse' :
              'bg-white/20'
            )} />
            <span className={cn(
              'text-[10px] font-medium transition-colors',
              i < currentIdx ? 'text-green-400' :
              i === currentIdx ? 'text-white' :
              'text-white/30'
            )}>
              {step === 'transcribing' ? 'STT' : step === 'translating' ? 'Translate' : 'TTS'}
            </span>
            {i < PIPELINE_STEPS.length - 1 && (
              <div className={cn(
                'w-4 h-0.5 rounded transition-colors',
                i < currentIdx ? 'bg-green-400/50' : 'bg-white/10'
              )} />
            )}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-white/40 text-center tabular-nums">{elapsed.toFixed(1)}s</p>
    </div>
  );
}

export function SpeakerZone({ role, state, languageCode, text, disabled, onTap }: SpeakerZoneProps) {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
  const label = STATE_LABELS[state];
  const emoji = role === 'student' ? '👨‍🎓' : '👩‍🏫';
  const roleLabel = role === 'student' ? 'Student' : 'Teacher';
  const isActive = state === 'listening' || state === 'speaking';
  const isProcessing = state === 'transcribing' || state === 'translating';

  return (
    <button
      onClick={onTap}
      disabled={disabled || state === 'disabled'}
      className={cn(
        'w-full rounded-2xl p-5 transition-all duration-300 text-center flex flex-col items-center gap-2',
        'focus:outline-none focus:ring-2 focus:ring-white/40',
        'active:scale-[0.98]',
        'bg-white/10 backdrop-blur-sm border border-white/20',
        state === 'listening' && 'bg-white/25 border-white/40',
        state === 'speaking' && 'bg-white/20 border-white/35',
        isProcessing && 'bg-white/15 border-white/30',
        disabled && 'opacity-40 cursor-not-allowed',
      )}
      aria-label={`${roleLabel} speaker zone. ${label}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <span className="text-xl font-bold text-white">{roleLabel}</span>
        {isActive && <AudioWaveform active className="ml-1" />}
      </div>

      <p className={cn(
        "text-sm text-white/70 italic",
        isProcessing && "flex items-center gap-2"
      )}>
        {isProcessing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        {text || label}
      </p>

      <ProcessingIndicator state={state} />

      <p className="text-sm text-white/80 font-medium">
        {lang ? lang.name : languageCode}
      </p>

      <div className={cn(
        'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 mt-2',
        state === 'listening' ? 'bg-white/30 ring-4 ring-white/20 animate-pulse' :
        state === 'speaking' ? 'bg-white/25 ring-4 ring-white/15' :
        isProcessing ? 'bg-white/20 ring-2 ring-white/10' :
        'bg-white/15'
      )}>
        {isProcessing ? (
          <Loader2 className="w-7 h-7 text-white/80 animate-spin" />
        ) : (
          <Mic className={cn(
            'w-7 h-7 transition-colors',
            state === 'listening' ? 'text-white' :
            state === 'speaking' ? 'text-white/90' :
            'text-white/60'
          )} />
        )}
      </div>
    </button>
  );
}
