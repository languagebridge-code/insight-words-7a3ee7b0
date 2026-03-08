export interface AdminStats {
  budget: {
    used: string;
    total: string;
    remaining: string;
    percentUsed: string;
    status: "healthy" | "warning" | "critical";
    alert: boolean;
  };
  totals: {
    requests: number;
    characters: number;
    cost: string;
    lastUpdated: string;
  };
  services: {
    translations: number;
    tts: number;
    stt: number;
  };
  users: {
    total: number;
    active: number;
    topUsers: TopUser[];
  };
  recentActivity: ActivityItem[];
  limits: {
    dailyTranslations: number;
    dailyTTS: number;
    rateLimit: number;
  };
}

export interface TopUser {
  userId: string;
  translations: number;
  tts: number;
  stt: number;
  totalCost: number;
  totalCharacters: number;
}

export interface ActivityItem {
  timestamp: string;
  userId: string;
  service: string;
  characters: number;
  cost: string;
  success: boolean;
  error: string | null;
}

export interface FlagItem {
  text: string;
  language: string;
  tier: number | null;
  source: "translation" | "glossary";
  flagCount: number;
  status: "logged" | "elevated" | "bounty" | "high_priority";
  firstFlagged: string;
  lastFlagged: string;
}

export interface FlagsResponse {
  summary: {
    logged: number;
    elevated: number;
    bounty: number;
    high_priority: number;
    total: number;
  };
  flags: FlagItem[];
}

export const LANGUAGE_MAP: Record<string, string> = {
  ur: "Urdu",
  ps: "Pashto",
  fa: "Persian",
  prs: "Dari",
  ar: "Arabic",
  so: "Somali",
  uk: "Ukrainian",
  uz: "Uzbek",
  en: "English",
  es: "Spanish",
  pt: "Portuguese",
  fr: "French",
  zh: "Chinese",
  mww: "Hmong",
};

export const FLAG_STATUS_CONFIG = {
  high_priority: { label: "High Priority", color: "bg-red-500", textColor: "text-red-700", bgLight: "bg-red-50", border: "border-l-red-500" },
  bounty: { label: "Bounty", color: "bg-orange-500", textColor: "text-orange-700", bgLight: "bg-orange-50", border: "border-l-orange-500" },
  elevated: { label: "Elevated", color: "bg-yellow-500", textColor: "text-yellow-700", bgLight: "bg-yellow-50", border: "border-l-yellow-500" },
  logged: { label: "Logged", color: "bg-gray-400", textColor: "text-gray-600", bgLight: "bg-gray-50", border: "border-l-gray-400" },
} as const;
