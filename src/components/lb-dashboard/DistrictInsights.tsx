import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lbApi, errorMessage, type SummaryResponse, type AuthLayer } from "@/lib/lb-dashboard-api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import { ArrowDown, ArrowUp, Download, RefreshCw, Settings2, X } from "lucide-react";

// District insights — one POST insights/summary call drives every widget.
// Users customize which widgets appear, their order and width; the layout and
// last-used filters are saved per user in the dashboard_layouts table.

type DatePreset = "month" | "30d" | "year" | "custom";

interface LayoutItem {
  widget: string;
  w: 1 | 2;
}

const WIDGET_CATALOG: { id: string; title: string }[] = [
  { id: "activeStudents", title: "Active students" },
  { id: "seats", title: "Seats" },
  { id: "weeklyActive", title: "Weekly active students" },
  { id: "wordLookups", title: "Words looked up" },
  { id: "talkToTeacher", title: "Talk to Teacher" },
  { id: "interpreterValue", title: "Estimated interpreter value" },
  { id: "audioPlays", title: "Audio listens" },
  { id: "languages", title: "Languages" },
  { id: "topWords", title: "Top words" },
  { id: "problems", title: "Problems reported & fixed" },
  { id: "schools", title: "Schools" },
  { id: "simpleEnglish", title: "Simple-English help used" },
];

const DEFAULT_LAYOUT: LayoutItem[] = WIDGET_CATALOG.slice(0, 6).map((w) => ({
  widget: w.id,
  w: w.id === "weeklyActive" ? 2 : 1,
}));

function rangeFor(preset: DatePreset, customFrom: string, customTo: string): { from: Date; to: Date } {
  const to = new Date();
  if (preset === "custom" && customFrom && customTo) {
    return { from: new Date(customFrom), to: new Date(customTo + "T23:59:59Z") };
  }
  if (preset === "30d") {
    const from = new Date(to);
    from.setDate(from.getDate() - 30);
    return { from, to };
  }
  if (preset === "year") {
    // School year: Aug 1 → Jul 31
    const y = to.getMonth() >= 7 ? to.getFullYear() : to.getFullYear() - 1;
    return { from: new Date(Date.UTC(y, 7, 1)), to };
  }
  // This month
  return { from: new Date(Date.UTC(to.getFullYear(), to.getMonth(), 1)), to };
}

function csvDownload(filename: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

const fmt = (n: number) => n.toLocaleString();

const DistrictInsights = ({ auth }: { auth: AuthLayer }) => {
  const [preset, setPreset] = useState<DatePreset>("month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [schoolCodes, setSchoolCodes] = useState<string[]>(auth.accessibleSchoolCodes);
  const [layout, setLayout] = useState<LayoutItem[]>(DEFAULT_LAYOUT);
  const [customizing, setCustomizing] = useState(false);
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [layoutLoaded, setLayoutLoaded] = useState(false);

  // Load saved layout + filters
  useEffect(() => {
    (async () => {
      const { data: row } = await supabase
        .from("dashboard_layouts")
        .select("layout, filters")
        .eq("user_id", auth.userId)
        .maybeSingle();
      if (row?.layout && Array.isArray(row.layout)) setLayout(row.layout as LayoutItem[]);
      const f = row?.filters as { preset?: DatePreset; schoolCodes?: string[] } | null;
      if (f?.preset) setPreset(f.preset);
      if (f?.schoolCodes?.length) setSchoolCodes(f.schoolCodes);
      setLayoutLoaded(true);
    })();
  }, [auth.userId]);

  const saveLayout = useCallback(
    async (nextLayout: LayoutItem[], nextPreset: DatePreset, nextSchools: string[]) => {
      await supabase.from("dashboard_layouts").upsert({
        user_id: auth.userId,
        layout: nextLayout,
        filters: { preset: nextPreset, schoolCodes: nextSchools },
        updated_at: new Date().toISOString(),
      });
    },
    [auth.userId],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { from, to } = rangeFor(preset, customFrom, customTo);
    try {
      const res = await lbApi.summary({
        startDate: from.toISOString(),
        endDate: to.toISOString(),
        ...(schoolCodes.length ? { schoolCodes } : {}),
      });
      setData(res);
      setUpdatedAt(new Date());
    } catch (err) {
      setError(errorMessage(err)); // keep last good data on screen
    }
    setLoading(false);
  }, [preset, customFrom, customTo, schoolCodes]);

  useEffect(() => {
    if (layoutLoaded) load();
  }, [load, layoutLoaded]);

  const applyFilters = (nextPreset: DatePreset, nextSchools: string[]) => {
    setPreset(nextPreset);
    setSchoolCodes(nextSchools);
    saveLayout(layout, nextPreset, nextSchools);
  };

  const updateLayout = (next: LayoutItem[]) => {
    setLayout(next);
    saveLayout(next, preset, schoolCodes);
  };

  const move = (i: number, dir: -1 | 1) => {
    const next = [...layout];
    const j = i + dir;
    const a = next[i];
    const b = next[j];
    if (!a || !b) return;
    next[i] = b;
    next[j] = a;
    updateLayout(next);
  };

  const toggleWidth = (i: number) => {
    const next = layout.map((item, k): LayoutItem =>
      k === i ? { ...item, w: item.w === 1 ? 2 : 1 } : item,
    );
    updateLayout(next);
  };

  const removeWidget = (id: string) => updateLayout(layout.filter((l) => l.widget !== id));
  const addWidget = (id: string) => updateLayout([...layout, { widget: id, w: 1 }]);

  const exportCsv = () => {
    if (!data) return;
    csvDownload("schools.csv", [
      ["School", "Code", "Seats used", "Seats purchased", "Term end", "Status"],
      ...data.schools.map((s) => [s.schoolName, s.schoolCode, s.seatsUsed, s.seatsPurchased, s.termEnd, s.status]),
    ]);
    csvDownload("weekly-active.csv", [
      ["Week of", "Active students"],
      ...data.weeklyActive.map((w) => [w.weekOf, w.students]),
    ]);
    csvDownload("languages.csv", [
      ["Language", "Students"],
      ...data.languages.map((l) => [l.language, l.suppressed ? "Fewer than 10 students" : (l.students ?? "")]),
    ]);
    csvDownload("top-words.csv", [
      ["Word", "Students"],
      ...data.topWords.map((w) => [w.word, w.students]),
    ]);
  };

  const availableToAdd = WIDGET_CATALOG.filter((w) => !layout.some((l) => l.widget === w.id));

  const widgetBody = (id: string): { title: string; node: React.ReactNode } => {
    if (!data) return { title: "", node: null };
    const u = data.usage;
    switch (id) {
      case "activeStudents":
        return {
          title: "Active students",
          node: (
            <>
              <p className="text-3xl font-bold">{fmt(data.students.active)}</p>
              <p className="text-sm text-muted-foreground">of {fmt(data.students.enrolled)} enrolled</p>
            </>
          ),
        };
      case "seats": {
        const pct = data.seats.purchased ? Math.round((data.seats.used / data.seats.purchased) * 100) : 0;
        return {
          title: "Seats",
          node: (
            <>
              <p className="text-3xl font-bold">
                {fmt(data.seats.used)} <span className="text-base font-normal text-muted-foreground">/ {fmt(data.seats.purchased)}</span>
              </p>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden" role="img" aria-label={`${pct}% of seats used`}>
                <div className={`h-full ${data.seats.overSeat ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              {data.seats.overSeat && (
                <p className="text-xs text-amber-600 mt-2">
                  Over seat count — we'll sort it out at renewal; no student is locked out.
                </p>
              )}
            </>
          ),
        };
      }
      case "weeklyActive":
        return {
          title: "Weekly active students",
          node: (
            <div className="h-[220px]" role="img" aria-label={`Line chart of weekly active students. Latest week: ${data.weeklyActive.at(-1)?.students ?? 0} students.`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.weeklyActive}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="weekOf" className="text-xs" />
                  <YAxis className="text-xs" allowDecimals={false} />
                  <ChartTooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} name="Active students" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ),
        };
      case "wordLookups":
        return { title: "Words looked up", node: <p className="text-3xl font-bold">{fmt(u.wordLookups)}</p> };
      case "talkToTeacher":
        return {
          title: "Talk to Teacher",
          node: (
            <>
              <p className="text-3xl font-bold">{fmt(u.talkToTeacherMinutes)} min</p>
              <p className="text-sm text-muted-foreground">{fmt(u.talkToTeacherTurns)} conversations</p>
            </>
          ),
        };
      case "interpreterValue":
        return {
          title: "Estimated interpreter value",
          node: (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-3xl font-bold cursor-help">${data.value.estimatedInterpreterValueUsd.toFixed(2)}</p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">{data.value.note}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ),
        };
      case "audioPlays":
        return { title: "Audio listens", node: <p className="text-3xl font-bold">{fmt(u.audioPlays)}</p> };
      case "languages":
        return {
          title: "Languages",
          node: (
            <div className="space-y-2" role="img" aria-label="Bar chart of students per language">
              {data.languages.map((l) =>
                l.suppressed ? (
                  <div key={l.language} className="flex items-center justify-between text-sm">
                    <span className="capitalize">{l.language}</span>
                    <span className="text-muted-foreground italic">Fewer than 10 students</span>
                  </div>
                ) : (
                  <div key={l.language} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{l.language}</span>
                      <span>{l.students}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${Math.min(100, ((l.students ?? 0) / Math.max(1, ...data.languages.map((x) => x.students ?? 0))) * 100)}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          ),
        };
      case "topWords":
        return {
          title: "Top words",
          node: (
            <ol className="space-y-1 text-sm">
              {data.topWords.map((w, i) => (
                <li key={w.word} className="flex justify-between">
                  <span>
                    {i + 1}. {w.word}
                  </span>
                  <span className="text-muted-foreground">{w.students} students</span>
                </li>
              ))}
            </ol>
          ),
        };
      case "problems":
        return {
          title: "Problems reported & fixed",
          node: (
            <p className="text-lg font-medium">
              {fmt(u.problemsReported)} reported · {fmt(u.problemsFixed)} fixed by our linguists
            </p>
          ),
        };
      case "schools":
        return {
          title: "Schools",
          node: (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4">School</th>
                    <th className="py-2 pr-4">Seats</th>
                    <th className="py-2 pr-4">Term end</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.schools.map((s) => (
                    <tr key={s.schoolCode} className="border-b border-border/50">
                      <td className="py-2 pr-4">{s.schoolName}</td>
                      <td className="py-2 pr-4">
                        {s.seatsUsed}/{s.seatsPurchased}
                      </td>
                      <td className="py-2 pr-4">{s.termEnd}</td>
                      <td className="py-2">
                        <Badge variant="secondary">{s.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        };
      case "simpleEnglish":
        return {
          title: "Simple-English help used",
          node: (
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold">{fmt(u.simpleEnglishViews)}</p>
                <p className="text-sm text-muted-foreground">Simple English</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{fmt(u.glossaryViews)}</p>
                <p className="text-sm text-muted-foreground">Glossary views</p>
              </div>
            </div>
          ),
        };
      default:
        return { title: id, node: null };
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border border-border p-1" role="group" aria-label="Date range">
          {(
            [
              ["month", "This month"],
              ["30d", "Last 30 days"],
              ["year", "This school year"],
              ["custom", "Custom"],
            ] as [DatePreset, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => applyFilters(value, schoolCodes)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                preset === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {preset === "custom" && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
              aria-label="Start date"
            />
            <span className="text-muted-foreground text-sm">to</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
              aria-label="End date"
            />
            <Button size="sm" onClick={() => load()} disabled={!customFrom || !customTo}>
              Apply
            </Button>
          </div>
        )}
        {auth.accessibleSchoolCodes.length > 1 && (
          <div className="flex flex-wrap gap-1" role="group" aria-label="School filter">
            {auth.accessibleSchoolCodes.map((code) => {
              const on = schoolCodes.includes(code);
              return (
                <button
                  key={code}
                  onClick={() => applyFilters(preset, on ? schoolCodes.filter((c) => c !== code) : [...schoolCodes, code])}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                    on ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground"
                  }`}
                  aria-pressed={on}
                >
                  {code}
                </button>
              );
            })}
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCustomizing((c) => !c)}>
            <Settings2 className="h-4 w-4 mr-1" /> {customizing ? "Done" : "Customize"}
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!data}>
            <Download className="h-4 w-4 mr-1" /> Export CSV
          </Button>
          <span className="text-xs text-muted-foreground">
            {updatedAt ? `Updated ${updatedAt.toLocaleTimeString()}` : ""}
          </span>
          <Button variant="ghost" size="sm" onClick={load} aria-label="Refresh">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      {customizing && availableToAdd.length > 0 && (
        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Add a widget</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {availableToAdd.map((w) => (
              <Button key={w.id} variant="outline" size="sm" onClick={() => addWidget(w.id)}>
                + {w.title}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Widget grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {loading && !data
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)
          : layout.map((item, i) => {
              const { title, node } = widgetBody(item.widget);
              return (
                <Card key={item.widget} className={`border-border/50 ${item.w === 2 ? "md:col-span-2" : ""}`}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    {customizing && (
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, -1)} aria-label={`Move ${title} up`}>
                          <ArrowUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => move(i, 1)} aria-label={`Move ${title} down`}>
                          <ArrowDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => toggleWidth(i)}>
                          {item.w === 1 ? "Wide" : "Narrow"}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeWidget(item.widget)} aria-label={`Remove ${title}`}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {data ? (
                      node
                    ) : (
                      <p className="text-sm text-muted-foreground">No activity in this range yet.</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
      </div>

      {data && (
        <p className="text-xs text-muted-foreground">
          {data.privacy.studentIdentity}. Groups smaller than {data.privacy.minGroupSize} students are never shown.
        </p>
      )}
    </div>
  );
};

export default DistrictInsights;
