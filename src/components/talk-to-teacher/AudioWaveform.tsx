import { cn } from '@/lib/utils';

interface AudioWaveformProps {
  active: boolean;
  className?: string;
}

export function AudioWaveform({ active, className }: AudioWaveformProps) {
  return (
    <div className={cn('flex items-end gap-[3px] h-6', className)}>
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className={cn(
            'w-[3px] rounded-full bg-white/80 transition-all duration-200',
            active ? 'animate-pulse' : 'h-1'
          )}
          style={active ? {
            animation: `ttt-wave 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
            height: '100%',
          } : { height: '4px' }}
        />
      ))}
    </div>
  );
}
