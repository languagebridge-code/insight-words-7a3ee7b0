import { useEffect, useState } from "react";
import { fetchAdminStats, fetchFlags } from "./adminApi";
import type { AdminStats, FlagsResponse } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FLAG_STATUS_CONFIG } from "./types";
import { AlertTriangle, Users, BarChart3, Type, Clock, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface OverviewTabProps {
  onNavigateToFlags: () => void;
  onAuthError: () => void;
}

const OverviewTab = ({ onNavigateToFlags, onAuthError }: OverviewTabProps) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [flags, setFlags] = useState<FlagsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [s, f] = await Promise.all([fetchAdminStats(), fetchFlags()]);
      setStats(s);
      setFlags(f);
    } catch (e: any) {
      if (e.message === "NOT_AUTHENTICATED") { onAuthError(); return; }
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <p className="text-red-600 mb-4">{error || "Failed to load data"}</p>
          <button onClick={loadData} className="px-4 py-2 rounded-lg text-white" style={{ background: "#742a69" }}>Retry</button>
        </CardContent>
      </Card>
    );
  }

  const budgetColor = stats.budget.status === "healthy" ? "#22c55e" : stats.budget.status === "warning" ? "#f59e0b" : "#ef4444";
  const budgetPercent = parseFloat(stats.budget.percentUsed);

  return (
    <div className="space-y-6">
      {/* Budget Card */}
      <Card className="border-0 shadow-sm overflow-hidden">
        {stats.budget.alert && (
          <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex items-center gap-2 text-yellow-800 text-sm">
            <AlertTriangle className="h-4 w-4" />
            Budget alert — approaching limit
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg" style={{ color: "#4a1a45" }}>Pilot Budget</h3>
            <span className="text-sm font-medium" style={{ color: budgetColor }}>
              {budgetPercent.toFixed(1)}% used
            </span>
          </div>
          <div className="relative h-4 w-full rounded-full overflow-hidden" style={{ background: "#f5eaf4" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(budgetPercent, 100)}%`, background: budgetColor }}
            />
          </div>
          <p className="text-sm mt-2" style={{ color: "#4a1a45" }}>
            <span className="font-semibold">${parseFloat(stats.budget.used).toFixed(2)}</span> spent of{" "}
            <span className="font-semibold">${parseFloat(stats.budget.total).toFixed(2)}</span> pilot budget
          </p>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BarChart3} label="Total Requests" value={stats.totals.requests.toLocaleString()} />
        <StatCard icon={Users} label="Total Users" value={String(stats.users.total)} subtitle={`${stats.users.active} active today`} />
        <StatCard icon={Type} label="Total Characters" value={stats.totals.characters.toLocaleString()} />
        <StatCard icon={Clock} label="Last Updated" value={formatDistanceToNow(new Date(stats.totals.lastUpdated), { addSuffix: true })} />
      </div>

      {/* Service Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ServiceCard label="Translations" icon="🌍" value={stats.services.translations} />
        <ServiceCard label="Text-to-Speech" icon="🔊" value={stats.services.tts} />
        <ServiceCard label="Speech-to-Text" icon="🎤" value={stats.services.stt} />
      </div>

      {/* Flags Summary */}
      {flags && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: "#4a1a45" }}>Translation Flags</h3>
              <button
                onClick={onNavigateToFlags}
                className="text-sm font-medium flex items-center gap-1 hover:underline"
                style={{ color: "#742a69" }}
              >
                View all flags <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {(["high_priority", "bounty", "elevated", "logged"] as const).map((s) => (
                <span
                  key={s}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${FLAG_STATUS_CONFIG[s].bgLight} ${FLAG_STATUS_CONFIG[s].textColor}`}
                >
                  <span className={`h-2 w-2 rounded-full ${FLAG_STATUS_CONFIG[s].color}`} />
                  {FLAG_STATUS_CONFIG[s].label}: {flags.summary[s]}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Users */}
      {stats.users.topUsers.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base" style={{ color: "#4a1a45" }}>Top Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead className="text-right">Translations</TableHead>
                  <TableHead className="text-right">TTS</TableHead>
                  <TableHead className="text-right">STT</TableHead>
                  <TableHead className="text-right">Characters</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...stats.users.topUsers]
                  .sort((a, b) => b.totalCost - a.totalCost)
                  .map((u) => (
                    <TableRow key={u.userId}>
                      <TableCell className="font-mono text-xs">…{u.userId.slice(-8)}</TableCell>
                      <TableCell className="text-right">{u.translations}</TableCell>
                      <TableCell className="text-right">{u.tts}</TableCell>
                      <TableCell className="text-right">{u.stt}</TableCell>
                      <TableCell className="text-right">{u.totalCharacters.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">${u.totalCost.toFixed(4)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

function StatCard({ icon: Icon, label, value, subtitle }: { icon: any; label: string; value: string; subtitle?: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: "#f5eaf4" }}>
            <Icon className="h-5 w-5" style={{ color: "#742a69" }} />
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: "#742a69" }}>{label}</p>
            <p className="text-xl font-bold" style={{ color: "#4a1a45" }}>{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ServiceCard({ label, icon, value }: { label: string; icon: string; value: number }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-5 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-xl font-bold" style={{ color: "#4a1a45" }}>{value.toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default OverviewTab;
