import { useState } from 'react';
import { Settings, History } from 'lucide-react';
import { SpeakerZone } from './SpeakerZone';
import { SettingsPanel } from './SettingsPanel';
import { HistoryPanel } from './HistoryPanel';
import { StopButton } from './StopButton';
import { useTTTStore } from './useTTTStore';
import { useConversationFlow } from './useConversationFlow';
import { InstallPrompt } from './InstallPrompt';
import logoSvg from '@/assets/languagebridge-icon.png';
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

  // Show recorder errors via toast
  if (flow.recorderError) {
    toast.error(flow.recorderError);
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 md:px-6">
        <a href="https://www.languagebridge.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
          <img src={logoSvg} alt="LanguageBridge" className="w-7 h-7 rounded-md" />
          <h1 className="text-lg font-bold tracking-tight">Talk to Teacher</h1>
        </a>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40">{flow.remainingTranslations} left today</span>
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Open settings"
          >
            <Settings className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 md:px-6 max-w-[800px] mx-auto w-full">
        <div className="w-full grid gap-3 md:grid-cols-2">
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
      <nav className="flex items-center justify-center gap-6 px-4 py-3 border-t border-white/10">
        <button
          onClick={() => setHistoryOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] transition-colors text-sm text-white/70"
        >
          <History className="w-4 h-4" />
          History
        </button>
        <button
          onClick={() => setSettingsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] transition-colors text-sm text-white/70"
        >
          <Settings className="w-4 h-4" />
          Settings
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
