import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { fetchExtensionUsage, fetchTttUsage } from "./adminApi";
import type { ExtensionUsage, TttUsage } from "./adminApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Users, BarChart3, Type, Hash, Download } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface OverviewTabProps {
  onNavigateToFlags: () => void;
  onAuthError: () => void;
}

const SERVICE_COLORS = {
  translations: "#742a69",
  tts: "#f37030",
  stt: "#2a9d8f",
};

const SOURCE_COLORS = {
  extension: "#742a69",
  ttt: "#f37030",
};

const serviceChartConfig: ChartConfig = {
  translations: { label: "Translations", color: SERVICE_COLORS.translations },
  tts: { label: "Text-to-Speech", color: SERVICE_COLORS.tts },
  stt: { label: "Speech-to-Text", color: SERVICE_COLORS.stt },
};

const dailyChartConfig: ChartConfig = {
  extension: { label: "Extension", color: SOURCE_COLORS.extension },
  ttt: { label: "Talk to Teacher", color: SOURCE_COLORS.ttt },
};

const OverviewTab = ({ onNavigateToFlags, onAuthError }: OverviewTabProps) => {
  const [ext, setExt] = useState<ExtensionUsage | null>(null);
  const [ttt, setTtt] = useState<TttUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = useCallback(async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f7f7f7",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      const date = new Date().toISOString().slice(0, 10);
      pdf.save(`languagebridge-report-${date}.pdf`);
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setExporting(false);
    }
  }, []);

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

  // Aggregate daily usage from recentActivity arrays
  const dailyData = useMemo(() => {
    const dayMap: Record<string, { extension: number; ttt: number }> = {};

    for (const item of ext?.recentActivity ?? []) {
      const day = item.created_at?.slice(0, 10);
      if (!day) continue;
      if (!dayMap[day]) dayMap[day] = { extension: 0, ttt: 0 };
      dayMap[day].extension++;
    }
    for (const item of ttt?.recentActivity ?? []) {
      const day = item.created_at?.slice(0, 10);
      if (!day) continue;
      if (!dayMap[day]) dayMap[day] = { extension: 0, ttt: 0 };
      dayMap[day].ttt++;
    }

    return Object.entries(dayMap)
      .map(([date, counts]) => ({ date, ...counts }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-14); // last 14 days
  }, [ext, ttt]);

  // Service breakdown data
  const serviceData = useMemo(() => {
    const extS = ext?.services ?? { translations: 0, tts: 0, stt: 0 };
    const tttT = ttt?.totals ?? { translate: 0, tts: 0, stt: 0 };
    return [
      { service: "Translations", extension: extS.translations, ttt: tttT.translate },
      { service: "TTS", extension: extS.tts, ttt: tttT.tts },
      { service: "STT", extension: extS.stt, ttt: tttT.stt },
    ];
  }, [ext, ttt]);

  // Pie data for source split
  const pieData = useMemo(() => {
    const extTotal = ext?.totals.requests ?? 0;
    const tttTotal = ttt?.totals.requests ?? 0;
    return [
      { name: "Extension", value: extTotal, fill: SOURCE_COLORS.extension },
      { name: "Talk to Teacher", value: tttTotal, fill: SOURCE_COLORS.ttt },
    ].filter(d => d.value > 0);
  }, [ext, ttt]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
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
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPdf}
          disabled={exporting}
          className="gap-1.5"
        >
          <Download className="h-3.5 w-3.5" />
          {exporting ? "Exporting…" : "Export PDF"}
        </Button>
      </div>
      <div ref={reportRef} className="space-y-6">
      {/* Combined Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={BarChart3} label="Total Requests" value={totalRequests.toLocaleString()} />
        <StatCard icon={Users} label="Extension Users" value={String(ext?.users.total ?? 0)} subtitle={`${ext?.users.sessions ?? 0} sessions`} />
        <StatCard icon={Type} label="Total Characters" value={totalChars.toLocaleString()} />
        <StatCard icon={Hash} label="TTT Requests" value={String(ttt?.totals.requests ?? 0)} subtitle={`${ttt?.totals.characters ?? 0} chars`} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Usage Trend */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color: "#4a1a45" }}>Daily Usage (Last 14 Days)</p>
            {dailyData.length > 0 ? (
              <ChartContainer config={dailyChartConfig} className="h-[220px] w-full">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(v) => new Date(v + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="extension" stroke={SOURCE_COLORS.extension} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ttt" stroke={SOURCE_COLORS.ttt} strokeWidth={2} dot={false} />
                </LineChart>
              </ChartContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-10">No daily data available</p>
            )}
          </CardContent>
        </Card>

        {/* Source Split Pie */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4" style={{ color: "#4a1a45" }}>Requests by Source</p>
            {pieData.length > 0 ? (
              <ChartContainer config={dailyChartConfig} className="h-[220px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-10">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Service Breakdown Bar Chart */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-4" style={{ color: "#4a1a45" }}>Service Breakdown by Source</p>
          {serviceData.some(d => d.extension > 0 || d.ttt > 0) ? (
            <ChartContainer config={dailyChartConfig} className="h-[220px] w-full">
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="service" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="extension" fill={SOURCE_COLORS.extension} radius={[4, 4, 0, 0]} />
                <Bar dataKey="ttt" fill={SOURCE_COLORS.ttt} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">No service data available</p>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
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
