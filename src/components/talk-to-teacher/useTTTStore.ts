import { useState, useCallback, useEffect } from 'react';
import { SpeakerState, HistoryEntry, TTTSettings, DEFAULT_SETTINGS } from './types';

const SETTINGS_KEY = 'lb_ttt_settings';
const HISTORY_KEY = 'lb_ttt_history';

function loadSettings(): TTTSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SETTINGS;
}

function loadHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored).map((e: any) => ({ ...e, timestamp: new Date(e.timestamp) }));
    }
  } catch {}
  return [];
}

export function useTTTStore() {
  const [settings, setSettingsState] = useState<TTTSettings>(loadSettings);
  const [history, setHistoryState] = useState<HistoryEntry[]>(loadHistory);
  const [studentState, setStudentState] = useState<SpeakerState>('idle');
  const [teacherState, setTeacherState] = useState<SpeakerState>('idle');
  const [studentText, setStudentText] = useState('');
  const [teacherText, setTeacherText] = useState('');
  const [activeZone, setActiveZone] = useState<'student' | 'teacher' | null>(null);

  const setSettings = useCallback((updates: Partial<TTTSettings>) => {
    setSettingsState(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const addHistoryEntry = useCallback((entry: Omit<HistoryEntry, 'id'>) => {
    setHistoryState(prev => {
      const next = [{ ...entry, id: crypto.randomUUID() }, ...prev];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistoryState([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return {
    settings,
    setSettings,
    history,
    addHistoryEntry,
    clearHistory,
    studentState,
    setStudentState,
    teacherState,
    setTeacherState,
    studentText,
    setStudentText,
    teacherText,
    setTeacherText,
    activeZone,
    setActiveZone,
  };
}
