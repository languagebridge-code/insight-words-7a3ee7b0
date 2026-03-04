import { X, Trash2, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HistoryEntry, RTL_LANGUAGES, SUPPORTED_LANGUAGES } from './types';
import { useState, useCallback } from 'react';

interface HistoryPanelProps {
  open: boolean;
  entries: HistoryEntry[];
  onClear: () => void;
  onClose: () => void;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function HistoryPanel({ open, entries, onClear, onClose }: HistoryPanelProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const playAudio = useCallback(async (entry: HistoryEntry) => {
    if (!entry.audioBase64 || playingId === entry.id) return;
    setPlayingId(entry.id);
    try {
      const audio = new Audio(`data:audio/mpeg;base64,${entry.audioBase64}`);
      audio.onended = () => setPlayingId(null);
      audio.onerror = () => setPlayingId(null);
      await audio.play();
    } catch {
      setPlayingId(null);
    }
  }, [playingId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Conversation History</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close history"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
          {entries.length === 0 ? (
            <p className="text-sm text-white/40 text-center py-8">
              No conversation history yet. Start speaking to begin.
            </p>
          ) : (
            entries.map(entry => {
              const isRTL = RTL_LANGUAGES.includes(entry.languageCode);
              const lang = SUPPORTED_LANGUAGES.find(l => l.code === entry.languageCode);
              const emoji = entry.role === 'student' ? '👨‍🎓' : '👩‍🏫';

              return (
                <div
                  key={entry.id}
                  className={cn(
                    'rounded-xl p-3 border border-white/10',
                    entry.role === 'student' ? 'bg-blue-500/10' : 'bg-green-500/10'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{emoji}</span>
                    <span className="text-xs font-semibold text-white/70">
                      {lang?.name || entry.language}
                    </span>
                    <span className="text-xs text-white/40 ml-auto">
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                  <p
                    className="text-sm text-white/90 leading-relaxed"
                    dir={isRTL ? 'rtl' : 'ltr'}
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {entry.originalText}
                  </p>
                  {entry.translatedText && (
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-white/50 italic flex-1">
                        → {entry.translatedText}
                      </p>
                      {entry.audioBase64 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); playAudio(entry); }}
                          className={cn(
                            'w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0',
                            playingId === entry.id
                              ? 'bg-white/30 text-white'
                              : 'bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80'
                          )}
                          aria-label="Replay translation audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {entries.length > 0 && (
          <div className="p-4 pt-2 border-t border-white/10">
            <button
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
