import { useEffect, useState } from "react";
import { fetchExtensionUsage, fetchTttUsage } from "./adminApi";
import type { ExtensionUsage, TttUsage } from "./adminApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BarChart3, Type, Hash } from "lucide-react";

interface OverviewTabProps {
  onNavigateToFlags: () => void;
  onAuthError: () => void;
}

const OverviewTab = ({ onNavigateToFlags, onAuthError }: OverviewTabProps) => {
  const [ext, setExt] = useState<ExtensionUsage | null>(null);
  const [ttt, setTtt] = useState<TttUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [extResult, tttResult] = await Promise.allSettled([
        fetchExtensionUsage(), fetchTttUsage(),
      ]);
      if (extResult.status === "fulfilled") setExt(extResult.value);
      if (tttResult.status === "fulfilled") setTtt(tttResult.value);
      if (extResult.status === "rejected" && tttResult.status === "rejected") {
        setError("Failed to load data.");
      }
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (error && !ext && !ttt) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={loadData} className="px-4 py-2 rounded-lg text-white" style={{ background: "#742a69" }}>Retry</button>
        </CardContent>
      </Card>
    );
  }

  const totalRequests = (ext?.totals.requests ?? 0) + (ttt?.totals.requests ?? 0);
  const totalChars = (ext?.totals.characters ?? 0) + (ttt?.totals.characters ?? 0);

  return (
    <div className="space-y-6">
      {/* Combined Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BarChart3} label="Total Requests" value={totalRequests.toLocaleString()} />
        <StatCard icon={Users} label="Extension Users" value={String(ext?.users.total ?? 0)} subtitle={`${ext?.users.sessions ?? 0} sessions`} />
        <StatCard icon={Type} label="Total Characters" value={totalChars.toLocaleString()} />
        <StatCard icon={Hash} label="TTT Requests" value={String(ttt?.totals.requests ?? 0)} subtitle={`${ttt?.totals.characters ?? 0} chars`} />
      </div>

      {/* Extension breakdown */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#742a69" }}>Extension (Chrome)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ServiceCard label="Translations" icon="🌍" value={ext?.services.translations ?? 0} />
          <ServiceCard label="Text-to-Speech" icon="🔊" value={ext?.services.tts ?? 0} />
          <ServiceCard label="Speech-to-Text" icon="🎤" value={ext?.services.stt ?? 0} />
        </div>
      </div>

      {/* TTT breakdown */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "#f37030" }}>Talk to Teacher (Web)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ServiceCard label="Translations" icon="🌍" value={ttt?.totals.translate ?? 0} />
          <ServiceCard label="Text-to-Speech" icon="🔊" value={ttt?.totals.tts ?? 0} />
          <ServiceCard label="Speech-to-Text" icon="🎤" value={ttt?.totals.stt ?? 0} />
        </div>
      </div>
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
