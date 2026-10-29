import { useEffect, useState, useRef, useCallback } from "react";
import { fetchExtensionUsage, fetchTttUsage } from "./adminApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface UnifiedItem {
  source: "extension" | "ttt";
  service: string;
  characters: number;
  success: boolean;
  created_at: string;
  userId?: string;
}

const SERVICE_ICONS: Record<string, string> = {
  translation: "🌍", translate: "🌍",
  tts: "🔊",
  stt: "🎤",
  session_start: "🚀",
};

const ActivityTab = () => {
  const [items, setItems] = useState<UnifiedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadData = useCallback(async () => {
    setError("");
    try {
      const [extRes, tttRes] = await Promise.allSettled([
        fetchExtensionUsage(), fetchTttUsage(),
      ]);

      if (extRes.status === "rejected" || tttRes.status === "rejected") setError("Some activity could not be loaded. Please try again.");
      const unified: UnifiedItem[] = [];

      if (extRes.status === "fulfilled") {
        for (const e of extRes.value.recentActivity) {
          unified.push({
            source: "extension",
            service: e.event_name,
            characters: e.properties?.text_length || e.properties?.characters || 0,
            success: true,
            created_at: e.created_at,
            userId: e.user_id,
          });
        }
      }

      if (tttRes.status === "fulfilled") {
        for (const t of tttRes.value.recentActivity.slice(0, 20)) {
          unified.push({
            source: "ttt",
            service: t.service,
            characters: t.characters,
            success: t.success,
            created_at: t.created_at,
          });
        }
      }

      unified.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setItems(unified);
      setCountdown(30);
    } catch {
      setError("Failed to load activity.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    if (!autoRefresh) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { loadData(); return 30; }
        return c - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoRefresh, loadData]);

  if (loading) {
    return <div className="space-y-3">{[1,2,3,4,5].map(i => <Skeleton key={i} className="h-16 rounded-lg" />)}</div>;
  }

  if (error) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-8 text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={loadData}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  const serviceName = (s: string) => {
    if (s === "translation" || s === "translate") return "Translation";
    if (s === "tts") return "Text-to-Speech";
    if (s === "stt") return "Speech-to-Text";
    if (s === "session_start") return "Session Start";
    return s;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold" >Recent Activity</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => { setAutoRefresh(e.target.checked); setCountdown(30); }}
              className="rounded"
            />
            Auto-refresh {autoRefresh && <span className="font-mono">({countdown}s)</span>}
          </label>
          <Button variant="outline" size="sm" onClick={loadData} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="p-12 text-center">
            <Activity className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium text-muted-foreground">No activity recorded yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <Card
              key={i}
              className={`border-border/50 overflow-hidden ${!item.success ? "border-l-4 border-l-destructive" : ""}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <span className="text-xl">{SERVICE_ICONS[item.service] || "📡"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium" >
                      {serviceName(item.service)}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${item.source === "extension" ? "bg-primary/10 text-primary" : "bg-accent/10 text-foreground"}`}>
                      {item.source === "extension" ? "Extension" : "TTT"}
                    </span>
                    {item.userId && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="font-mono text-xs text-muted-foreground">…{item.userId.slice(-8)}</span>
                      </>
                    )}
                    {!item.success && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">Failed</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium" >{item.characters.toLocaleString()} chars</p>
                </div>
                <div className="text-right shrink-0 w-24">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTab;
