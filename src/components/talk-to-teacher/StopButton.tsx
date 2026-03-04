import { Square } from 'lucide-react';

interface StopButtonProps {
  visible: boolean;
  onStop: () => void;
}

export function StopButton({ visible, onStop }: StopButtonProps) {
  if (!visible) return null;

  return (
    <button
      onClick={onStop}
      className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white font-semibold text-sm shadow-lg shadow-red-500/30"
      aria-label="Stop recording"
    >
      <Square className="w-4 h-4 fill-current" />
      STOP
    </button>
  );
}
