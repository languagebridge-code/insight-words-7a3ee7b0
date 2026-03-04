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

const STATE_CONFIG: Record<SpeakerState, { bg: string; label: string }> = {
  idle: { bg: 'bg-white/[0.07]', label: 'Tap to speak' },
  listening: { bg: 'bg-blue-500/30', label: 'Listening...' },
  transcribing: { bg: 'bg-yellow-500/30', label: 'Transcribing...' },
  translating: { bg: 'bg-orange-500/30', label: 'Translating...' },
  speaking: { bg: 'bg-green-500/30', label: 'Playing audio...' },
  disabled: { bg: 'bg-white/[0.04]', label: '' },
};

export function SpeakerZone({ role, state, languageCode, text, disabled, onTap }: SpeakerZoneProps) {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === languageCode);
  const isRTL = RTL_LANGUAGES.includes(languageCode);
  const config = STATE_CONFIG[state];
  const emoji = role === 'student' ? '👨‍🎓' : '👩‍🏫';
  const roleLabel = role === 'student' ? 'Student' : 'Teacher';
  const isActive = state === 'listening' || state === 'speaking';

  return (
    <button
      onClick={onTap}
      disabled={disabled || state === 'disabled'}
      className={cn(
        'w-full rounded-2xl border border-white/20 p-4 transition-all duration-300 text-left',
        'focus:outline-none focus:ring-2 focus:ring-white/40',
        'hover:border-white/30 active:scale-[0.98]',
        config.bg,
        disabled && 'opacity-40 cursor-not-allowed',
      )}
      aria-label={`${roleLabel} speaker zone. ${config.label}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{emoji}</span>
          <div>
            <p className="text-[13px] font-bold text-white">{roleLabel}</p>
            <p className="text-xs text-white/60">
              {lang ? `${lang.name} (${lang.nativeName})` : languageCode}
            </p>
          </div>
        </div>
        {isActive && <AudioWaveform active className="mr-1" />}
      </div>

      {/* Mic icon */}
      <div className="flex justify-center py-4">
        <div className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
          state === 'listening' ? 'bg-blue-500/40 ring-4 ring-blue-400/30 animate-pulse' :
          state === 'speaking' ? 'bg-green-500/40 ring-4 ring-green-400/30' :
          'bg-white/10'
        )}>
          <Mic className={cn(
            'w-7 h-7 transition-colors',
            state === 'listening' ? 'text-blue-300' :
            state === 'speaking' ? 'text-green-300' :
            'text-white/50'
          )} />
        </div>
      </div>

      {/* Status / Text */}
      <div
        className={cn('min-h-[40px] text-center', isRTL && 'text-right')}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {text ? (
          <p className="text-sm text-white/90 leading-relaxed">{text}</p>
        ) : (
          <p className="text-sm text-white/40 italic">{config.label}</p>
        )}
      </div>
    </button>
  );
}
