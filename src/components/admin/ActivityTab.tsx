import { useEffect, useState, useRef, useCallback } from "react";
import { fetchAdminStats } from "./adminApi";
import type { ActivityItem } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityTabProps {
  onAuthError: () => void;
}

const SERVICE_ICONS: Record<string, string> = {
  translate: "🌍",
  tts: "🔊",
  stt: "🎤",
};

const ActivityTab = ({ onAuthError }: ActivityTabProps) => {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadData = useCallback(async () => {
    setError("");
    try {
      const s = await fetchAdminStats(100);
      setItems(s.recentActivity);
      setCountdown(30);
    } catch (e: any) {
      if (e.message === "NOT_AUTHENTICATED") { onAuthError(); return; }
      setError("Failed to load activity.");
    } finally {
      setLoading(false);
    }
  }, [onAuthError]);

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
    return <div className="space-y-3">{[1,2,3,4,5].map(i => <Skeleton key={i} className="h-16 rounded-xl" />)}</div>;
  }

  if (error) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadData} className="px-4 py-2 rounded-lg text-white" style={{ background: "#742a69" }}>Retry</button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold" style={{ color: "#4a1a45" }}>Recent Activity</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
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
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <Activity className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No activity recorded yet for this pilot</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <Card
              key={i}
              className={`border-0 shadow-sm overflow-hidden ${!item.success ? "border-l-4 border-l-red-500" : ""}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <span className="text-xl">{SERVICE_ICONS[item.service] || "📡"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium" style={{ color: "#4a1a45" }}>
                      {item.service === "translate" ? "Translation" : item.service === "tts" ? "Text-to-Speech" : "Speech-to-Text"}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="font-mono text-xs text-gray-500">…{item.userId.slice(-8)}</span>
                    {!item.success && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">Failed</span>
                    )}
                  </div>
                  {item.error && <p className="text-xs text-red-500 mt-1">{item.error}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium" style={{ color: "#4a1a45" }}>{item.characters.toLocaleString()} chars</p>
                  <p className="text-xs text-gray-500">${parseFloat(item.cost).toFixed(4)}</p>
                </div>
                <div className="text-right shrink-0 w-24">
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
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
