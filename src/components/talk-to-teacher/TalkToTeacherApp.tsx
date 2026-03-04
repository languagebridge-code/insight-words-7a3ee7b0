import { useState } from 'react';
import { Settings, History, Trash2, X, GripVertical } from 'lucide-react';
import { SpeakerZone } from './SpeakerZone';
import { SettingsPanel } from './SettingsPanel';
import { HistoryPanel } from './HistoryPanel';
import { StopButton } from './StopButton';
import { useTTTStore } from './useTTTStore';
import { useConversationFlow } from './useConversationFlow';
import { InstallPrompt } from './InstallPrompt';
import { toast } from 'sonner';

export function TalkToTeacherApp() {
  const store = useTTTStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const flow = useConversationFlow({
    settings: store.settings,
    setStudentState: store.setStudentState,
    setTeacherState: store.setTeacherState,
    setStudentText: store.setStudentText,
    setTeacherText: store.setTeacherText,
    setActiveZone: store.setActiveZone,
    addHistoryEntry: store.addHistoryEntry,
  });

  const isListening = store.studentState === 'listening' || store.teacherState === 'listening';
  const isBusy = (store.studentState !== 'idle' && store.studentState !== 'disabled')
    || (store.teacherState !== 'idle' && store.teacherState !== 'disabled');

  const handleStudentTap = () => {
    if (isBusy) return;
    flow.handleTap('student');
  };

  const handleTeacherTap = () => {
    if (isBusy) return;
    flow.handleTap('teacher');
  };

  const handleStop = () => {
    flow.handleStop(store.activeZone);
  };

  // Show recorder errors via toast — only once per error
  const [lastError, setLastError] = useState<string | null>(null);
  if (flow.recorderError && flow.recorderError !== lastError) {
    setLastError(flow.recorderError);
    toast.error(flow.recorderError);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #6B2D5B 0%, #8B3A6B 25%, #C46A5A 55%, #E89040 80%, #F5A623 100%)',
    }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <button className="w-9 h-9 flex items-center justify-center text-white/70">
          <GripVertical className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-white tracking-tight">Talk to Teacher</h1>
        <a
          href="https://www.languagebridge.app"
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white/80 hover:bg-white/30 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </a>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-4 max-w-[500px] mx-auto w-full">
        <div className="w-full flex flex-col gap-3">
          <SpeakerZone
            role="student"
            state={store.studentState}
            languageCode={store.settings.studentLanguage}
            text={store.settings.showTranscript ? store.studentText : ''}
            disabled={store.activeZone === 'teacher'}
            onTap={handleStudentTap}
          />
          <SpeakerZone
            role="teacher"
            state={store.teacherState}
            languageCode={store.settings.teacherLanguage}
            text={store.settings.showTranscript ? store.teacherText : ''}
            disabled={store.activeZone === 'student'}
            onTap={handleTeacherTap}
          />
        </div>

        {/* Stop Button */}
        <div className="mt-6">
          <StopButton visible={isListening} onStop={handleStop} />
        </div>
      </main>

      {/* Bottom bar */}
      <nav className="flex items-center justify-center gap-4 px-4 py-4">
        <button
          onClick={() => setHistoryOpen(true)}
          className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="History"
        >
          <History className="w-6 h-6 text-white/80" />
        </button>
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 text-white/80" />
        </button>
        <button
          onClick={() => { store.clearHistory(); toast.success('History cleared'); }}
          className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Clear history"
        >
          <Trash2 className="w-6 h-6 text-white/80" />
        </button>
      </nav>

      {/* Modals */}
      <SettingsPanel
        open={settingsOpen}
        settings={store.settings}
        onUpdate={store.setSettings}
        onClose={() => setSettingsOpen(false)}
      />
      <HistoryPanel
        open={historyOpen}
        entries={store.history}
        onClear={store.clearHistory}
        onClose={() => setHistoryOpen(false)}
      />
      <InstallPrompt />
    </div>
  );
}
