import { supabase } from "@/integrations/supabase/client";

// Client for the LanguageBridge dashboard proxy at /api/lb-dashboard/*.
// The browser never calls the Azure backend directly and never holds any key —
// it only forwards the signed-in user's Supabase access token.

export class ApiError extends Error {
  status: number;
  code: string;
  details: string;
  constructor(status: number, code: string, details: string) {
    super(details || code);
    this.status = status;
    this.code = code;
    this.details = details || code;
  }
}

async function call<T>(
  route: string,
  opts: { method?: "GET" | "POST" | "PUT"; body?: unknown; search?: string } = {},
  retried = false,
): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new ApiError(401, "NO_SESSION", "Please sign in again.");

  const res = await fetch(`/api/lb-dashboard/${route}${opts.search ?? ""}`, {
    method: opts.method ?? "GET",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: opts.body === undefined ? null : JSON.stringify(opts.body),
  });

  if (res.status === 429 && !retried) {
    await new Promise((r) => setTimeout(r, 2000));
    return call<T>(route, opts, true);
  }

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  if (!res.ok) {
    const errBody = parsed as { error?: string; details?: string } | null;
    throw new ApiError(
      res.status,
      errBody?.error ?? `HTTP_${res.status}`,
      errBody?.details ?? "Couldn't load — try again.",
    );
  }
  return parsed as T;
}

// ---- Types (exact backend shapes) ----

export interface AuthLayer {
  userId: string;
  email: string;
  isSuperAdmin: boolean;
  role: "super_admin" | "district_admin" | "champion";
  permissions: string[];
  accessiblePilotIds: string[];
  accessibleSchoolCodes: string[];
}

export interface SummaryResponse {
  range: { from: string; to: string };
  schools: {
    schoolCode: string;
    schoolName: string;
    seatsPurchased: number;
    seatsUsed: number;
    termEnd: string;
    status: string;
  }[];
  seats: { purchased: number; used: number; overSeat: boolean };
  students: { enrolled: number; active: number };
  weeklyActive: { weekOf: string; students: number }[];
  languages: { language: string; students: number | null; suppressed: boolean }[];
  usage: {
    wordLookups: number;
    audioPlays: number;
    glossaryViews: number;
    simpleEnglishViews: number;
    talkToTeacherTurns: number;
    talkToTeacherMinutes: number;
    problemsReported: number;
    problemsFixed: number;
  };
  topWords: { word: string; students: number }[];
  value: {
    interpreterMinutesEquivalent: number;
    interpreterUsdPerHour: number;
    estimatedInterpreterValueUsd: number;
    note: string;
  };
  privacy: { minGroupSize: number; minStudentsPerWord: number; studentIdentity: string };
}

export interface StudentsResponse {
  schoolCode: string;
  range: { from: string; to: string };
  students: {
    studentCode: string;
    gradeBand: string;
    language: string;
    variant: string | null;
    enrolledAt: string;
    lastActive: string | null;
    wordLookups: number;
    audioPlays: number;
    glossaryViews: number;
    problemsReported: number;
  }[];
  note: string;
}

export interface HealthBanner {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  detail?: string;
  metric?: string;
  value?: number;
  threshold?: number;
  action?: string;
}

export interface HealthResponse {
  generatedAt: string;
  banners: HealthBanner[];
  freeTier: {
    translatorChars: { used: number; limit: number; source: string };
    ttsChars: { used: number; limit: number; source: string };
    sttSeconds: { used: number; limit: number; source: string };
    resetsOn: string;
  };
  dependencies: Record<
    string,
    {
      callsToday: number;
      failuresToday: number;
      latencyBucketsToday: Record<string, number>;
      blocked24h: number;
    }
  >;
  cosmos: {
    maxNormalizedRuPct: number | null;
    throttled1h: number | null;
    storageGb: number | null;
    provisionedRu: number | null;
    availabilityPct: number | null;
  };
  api: { requests24h: number | null; failed24h: number | null; executionsMonthToDate: number | null };
  tiers: { translator: string; speech: string };
  monitoringAvailable: boolean;
}

export interface OverviewResponse {
  range: { from: string; to: string };
  totals: {
    revenueUsd: number;
    meteredAzureCostUsd: number;
    unattributedAzureCostUsd: number;
    activeStudents: number;
    actualAzureBillUsd: number;
  };
  actualAzureBill: { totalUsd: number; byService: { service: string; costUsd: number }[] };
  notes: string[];
  districts: {
    pilotId: string;
    name: string;
    isDemo: boolean;
    revenueUsd: number;
    azureCostUsd: number;
    marginUsd: number;
    marginPct: number;
    seatsPurchased: number;
    seatsUsed: number;
    activeStudents: number;
    azureDependencyPct: number;
    schools: {
      schoolCode: string;
      schoolName: string;
      isDemo: boolean;
      status: string;
      tier: string;
      seatsPurchased: number;
      seatsUsed: number;
      overSeat: boolean;
      activeStudents: number;
      revenueUsd: number;
      azureCostUsd: number;
      azureCost: { translator: number; tts: number; stt: number };
      usage: {
        lookups: number;
        audioPlays: number;
        glossaryViews: number;
        flags: number;
        translatorChars: number;
        ttsChars: number;
        talkToTeacherMinutes: number;
      };
    }[];
  }[];
}

export interface SchoolLicense {
  schoolCode: string;
  schoolName: string;
  gradeBands: string[];
  seats: number;
  tier: string;
  pricingModel: string;
  annualPriceUsd: number | null;
  termStart: string;
  termEnd: string;
  status: string;
  dpaRef?: string;
  isDemo?: boolean;
}

export interface DistrictsResponse {
  districts: {
    pilotId: string;
    district: { pilotId: string; name: string; state?: string; contractAnnualUsd?: number | null; isDemo?: boolean };
    schools: SchoolLicense[];
    staff: { email: string; role: string; displayName?: string; invitedAt?: string }[];
  }[];
}

export interface PricingResponse {
  prices: {
    translatorPerMillionChars: number;
    ttsPerMillionChars: number;
    sttPerAudioHour: number;
    cosmosPer100RuHour: number;
    cosmosPerGbMonth: number;
    interpreterUsdPerHour: number;
    source: string;
    updatedAt: string;
  };
  freeTier: Record<string, unknown>;
}

export interface FlagRow {
  id: string;
  language: string;
  status: string;
  flagType: string;
  word?: string;
  note?: string;
  createdAt?: string;
  [key: string]: unknown;
}

// ---- API ----

export const lbApi = {
  authLayer: () => call<AuthLayer>("auth-layer"),
  summary: (body: { startDate: string; endDate: string; schoolCodes?: string[] }) =>
    call<SummaryResponse>("insights/summary", { method: "POST", body }),
  students: (body: { schoolCode: string; startDate: string; endDate: string }) =>
    call<StudentsResponse>("insights/students", { method: "POST", body }),
  health: () => call<HealthResponse>("ops/health"),
  overview: (from: string, to: string) =>
    call<OverviewResponse>("ops/overview", { search: `?from=${from}&to=${to}` }),
  districts: () => call<DistrictsResponse>("ops/districts"),
  saveDistricts: (body: unknown) => call<unknown>("ops/districts", { method: "PUT", body }),
  invite: (body: { email: string; role: string; schoolIds?: string[]; districtId?: string; displayName?: string }) =>
    call<{ invited: string; role: string; alreadyHadAccount: boolean }>("ops/invite", { method: "POST", body }),
  pricing: () => call<PricingResponse>("ops/pricing"),
  savePricing: (body: Record<string, number>) => call<unknown>("ops/pricing", { method: "PUT", body }),
  flagQueue: (params: { language?: string; status?: string; flagType?: string; limit?: number }) => {
    const q = new URLSearchParams();
    if (params.language) q.set("language", params.language);
    if (params.status) q.set("status", params.status);
    if (params.flagType) q.set("flagType", params.flagType);
    if (params.limit) q.set("limit", String(params.limit));
    const s = q.toString();
    return call<{ flags: FlagRow[] }>("flag-queue", { search: s ? `?${s}` : "" });
  },
  flagAction: (id: string, body: { language: string; action: string; note?: string; entryId?: string }) =>
    call<unknown>(`flag-queue/${id}/action`, { method: "POST", body }),
};

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.status === 401) return "Please sign in again.";
    if (err.status === 403) return "You don't have access to this.";
    return err.details || "Couldn't load — try again.";
  }
  return "Couldn't load — try again.";
}
