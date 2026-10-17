import { useEffect, useState } from "react";
import { AlertTriangle, Info, X } from "lucide-react";
import { lbApi, type HealthBanner } from "@/lib/lb-dashboard-api";

// Health banner bar for super-admins. Polls ops/health every 5 minutes.
// Snoozes live in localStorage keyed by banner id + severity, so a banner
// that worsens re-appears. critical: snooze max 1 hour; warning: 24 hours;
// info: dismissed until the banner's id changes severity.

const SNOOZE_KEY = "lb-health-snoozes";
const FLASH_MS = 10_000;
const POLL_MS = 5 * 60 * 1000;

type SnoozeMap = Record<string, number>; // "id|severity" -> snoozed-until epoch ms

function loadSnoozes(): SnoozeMap {
  try {
    return JSON.parse(localStorage.getItem(SNOOZE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveSnoozes(map: SnoozeMap) {
  localStorage.setItem(SNOOZE_KEY, JSON.stringify(map));
}

const HealthBannerBar = ({ onViewHealth }: { onViewHealth: () => void }) => {
  const [banners, setBanners] = useState<HealthBanner[]>([]);
  const [snoozes, setSnoozes] = useState<SnoozeMap>(loadSnoozes);
  const [flashing, setFlashing] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const health = await lbApi.health();
        if (!cancelled) setBanners(health.banners ?? []);
      } catch {
        // banner failures are non-fatal; keep whatever is on screen
      }
    };
    load();
    const t = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setFlashing(false), FLASH_MS);
    return () => clearTimeout(t);
  }, []);

  const now = Date.now();
  const visible = banners.filter((b) => (snoozes[`${b.id}|${b.severity}`] ?? 0) <= now);

  if (visible.length === 0) return null;

  const snooze = (b: HealthBanner) => {
    const hours = b.severity === "critical" ? 1 : b.severity === "warning" ? 24 : 24 * 365;
    const next = { ...snoozes, [`${b.id}|${b.severity}`]: now + hours * 60 * 60 * 1000 };
    setSnoozes(next);
    saveSnoozes(next);
  };

  return (
    <div className="space-y-2" role="alert" aria-live="polite">
      {visible.map((b) => {
        const styles =
          b.severity === "critical"
            ? `border-red-500 bg-red-500/10 text-red-900 dark:text-red-100 ${flashing ? "animate-pulse" : ""}`
            : b.severity === "warning"
              ? "border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-100"
              : "border-border bg-muted/50 text-foreground";
        return (
          <div key={`${b.id}|${b.severity}`} className={`rounded-lg border-2 p-3 flex items-start gap-3 ${styles}`}>
            {b.severity === "info" ? (
              <Info className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
            ) : (
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{b.title}</p>
              {b.detail && <p className="text-xs mt-0.5 opacity-90">{b.detail}</p>}
              {b.action && <p className="text-xs mt-1 font-medium">Action: {b.action}</p>}
              <button
                onClick={onViewHealth}
                className="text-xs underline mt-1 hover:opacity-80"
              >
                Details
              </button>
            </div>
            <button
              onClick={() => snooze(b)}
              aria-label={`Dismiss ${b.title}`}
              className="shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default HealthBannerBar;
