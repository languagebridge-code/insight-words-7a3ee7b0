import { Mic, Square, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpeakerState, SUPPORTED_LANGUAGES, RTL_LANGUAGES } from './types';
import { AudioWaveform } from './AudioWaveform';

interface SpeakerZoneProps {
  role: 'student' | 'teacher';
  state: SpeakerState;
  languageCode: string;
  text: string;
  disabled: boolean;
  onTap: () => void;
  onStop?: () => void;
}

const STATE_LABELS: Record<SpeakerState, string> = {
  idle: 'Tap to speak',
  listening: 'Listening...',
  transcribing: 'Processing...',
  translating: 'Translating...',
  speaking: 'Playing audio...',
  disabled: '',
};

export function SpeakerZone({ role, state, languageCode, text, disabled, onTap, onStop }: SpeakerZoneProps) {
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
        'w-full rounded-2xl p-6 transition-all duration-300 text-center flex flex-col items-center justify-center gap-3 min-h-[200px] flex-1',
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

      <p className="text-sm text-white/80 font-medium">
        {lang ? lang.name : languageCode}
      </p>

      {state === 'listening' ? (
        <div className="relative w-14 h-14 mt-2">
          <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
          <span className="absolute inset-[-6px] rounded-full border-2 border-red-400/40 animate-pulse" />
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onStop?.(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onStop?.(); } }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center bg-red-500 cursor-pointer hover:bg-red-600 transition-all duration-300 animate-scale-in"
            aria-label="Stop recording"
          >
            <Square className="w-6 h-6 text-white fill-white animate-fade-in" />
          </div>
        </div>
      ) : (
        <div className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 mt-2 animate-scale-in',
          state === 'speaking' ? 'bg-white/25 ring-4 ring-white/15' :
          isProcessing ? 'bg-white/20 ring-2 ring-white/10' :
          'bg-white/15'
        )}>
          {isProcessing ? (
            <Loader2 className="w-7 h-7 text-white/80 animate-spin" />
          ) : (
            <Mic className={cn(
              'w-7 h-7 transition-colors duration-300 animate-fade-in',
              state === 'speaking' ? 'text-white/90' : 'text-white/60'
            )} />
          )}
        </div>
      )}
    </button>
  );
}
