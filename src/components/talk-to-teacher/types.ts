export type SpeakerState = 'idle' | 'listening' | 'transcribing' | 'translating' | 'speaking' | 'disabled';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
}

export interface HistoryEntry {
  id: string;
  role: 'student' | 'teacher';
  language: string;
  languageCode: string;
  originalText: string;
  translatedText: string;
  translatedLanguageCode: string;
  audioBase64?: string;
  timestamp: Date;
}

export interface TTTSettings {
  studentLanguage: string;
  teacherLanguage: string;
  autoPlay: boolean;
  showTranscript: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'prs', name: 'Dari', nativeName: 'دری', rtl: true },
  { code: 'fa', name: 'Persian / Farsi', nativeName: 'فارسی', rtl: true },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', rtl: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', rtl: false },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false },
  { code: 'en', name: 'English', nativeName: 'English', rtl: false },
];

export const RTL_LANGUAGES = ['prs', 'fa', 'ps', 'ar', 'ur'];

export const DEFAULT_SETTINGS: TTTSettings = {
  studentLanguage: 'prs',
  teacherLanguage: 'en',
  autoPlay: true,
  showTranscript: true,
};
