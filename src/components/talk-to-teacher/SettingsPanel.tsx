import { X } from 'lucide-react';
import { TTTSettings, SUPPORTED_LANGUAGES } from './types';

interface SettingsPanelProps {
  open: boolean;
  settings: TTTSettings;
  onUpdate: (updates: Partial<TTTSettings>) => void;
  onClose: () => void;
}

export function SettingsPanel({ open, settings, onUpdate, onClose }: SettingsPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Translation Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Student Language */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-white/70 mb-2 block">
            Student Language
          </label>
          <select
            value={settings.studentLanguage}
            onChange={e => onUpdate({ studentLanguage: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#742a69]/60 appearance-none"
          >
            {SUPPORTED_LANGUAGES.filter(l => l.code !== 'en').map(l => (
              <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Teacher Language */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-white/70 mb-2 block">
            Teacher Language
          </label>
          <select
            value={settings.teacherLanguage}
            onChange={e => onUpdate({ teacherLanguage: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#742a69]/60 appearance-none"
          >
            {SUPPORTED_LANGUAGES.map(l => (
              <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoPlay}
              onChange={e => onUpdate({ autoPlay: e.target.checked })}
              className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#742a69] focus:ring-[#742a69]/50"
            />
            <span className="text-sm text-white/80">Auto-play translations</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showTranscript}
              onChange={e => onUpdate({ showTranscript: e.target.checked })}
              className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#742a69] focus:ring-[#742a69]/50"
            />
            <span className="text-sm text-white/80">Show text transcript</span>
          </label>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/30 text-center">
          LanguageBridge v1.0 — © 2026
        </p>
      </div>
    </div>
  );
}
