import { Mic } from 'lucide-react';
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
}

const STATE_LABELS: Record<SpeakerState, string> = {
  idle: 'Tap to speak',
  listening: 'Listening...',
  transcribing: 'Transcribing...',
  translating: 'Translating...',
  speaking: 'Playing audio...',
  disabled: '',
};

export function SpeakerZone({ role, state, languageCode, text, disabled, onTap }: SpeakerZoneProps) {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
  const isRTL = RTL_LANGUAGES.includes(languageCode);
  const label = STATE_LABELS[state];
  const emoji = role === 'student' ? '👨‍🎓' : '👩‍🏫';
  const roleLabel = role === 'student' ? 'Student' : 'Teacher';
  const isActive = state === 'listening' || state === 'speaking';

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
        disabled && 'opacity-40 cursor-not-allowed',
      )}
      aria-label={`${roleLabel} speaker zone. ${label}`}
    >
      {/* Role header */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <span className="text-xl font-bold text-white">{roleLabel}</span>
        {isActive && <AudioWaveform active className="ml-1" />}
      </div>

      {/* Status text */}
      <p className="text-sm text-white/70 italic">{text || label}</p>

      {/* Language */}
      <p className="text-sm text-white/80 font-medium">
        {lang ? lang.name : languageCode}
      </p>

      {/* Mic icon */}
      <div className={cn(
        'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 mt-2',
        state === 'listening' ? 'bg-white/30 ring-4 ring-white/20 animate-pulse' :
        state === 'speaking' ? 'bg-white/25 ring-4 ring-white/15' :
        'bg-white/15'
      )}>
        <Mic className={cn(
          'w-7 h-7 transition-colors',
          state === 'listening' ? 'text-white' :
          state === 'speaking' ? 'text-white/90' :
          'text-white/60'
        )} />
      </div>
    </button>
  );
}
