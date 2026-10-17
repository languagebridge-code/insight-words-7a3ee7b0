import { useCallback, useEffect, useMemo, useState } from "react";
import { lbApi, errorMessage, type StudentsResponse, type AuthLayer } from "@/lib/lb-dashboard-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, Download, RefreshCw } from "lucide-react";

// My students — champion teachers only. Students exist only as LanguageBridge
// codes. Nicknames are stored ONLY in this browser's localStorage, keyed by
// code; they are never sent anywhere. CSV export contains codes only.

const NICK_KEY = "lb-student-nicknames";

type SortKey = "studentCode" | "nickname" | "gradeBand" | "language" | "lastActive" | "wordLookups" | "audioPlays" | "glossaryViews" | "problemsReported";

function loadNicknames(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(NICK_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const MyStudents = ({ auth }: { auth: AuthLayer }) => {
  const [schoolCode, setSchoolCode] = useState(auth.accessibleSchoolCodes[0] ?? "");
  const [data, setData] = useState<StudentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nicknames, setNicknames] = useState<Record<string, string>>(loadNicknames);
  const [sortKey, setSortKey] = useState<SortKey>("lastActive");
  const [sortAsc, setSortAsc] = useState(false);
  const [gradeFilter, setGradeFilter] = useState("");
  const [langFilter, setLangFilter] = useState("");

  const load = useCallback(async () => {
    if (!schoolCode) return;
    setLoading(true);
    setError(null);
    const to = new Date();
    const from = new Date(to);
    from.setDate(from.getDate() - 30);
    try {
      setData(await lbApi.students({ schoolCode, startDate: from.toISOString(), endDate: to.toISOString() }));
    } catch (err) {
      setError(errorMessage(err));
    }
    setLoading(false);
  }, [schoolCode]);

  useEffect(() => {
    load();
  }, [load]);

  const setNickname = (code: string, name: string) => {
    const next = { ...nicknames };
    if (name.trim()) next[code] = name.trim();
    else delete next[code];
    setNicknames(next);
    localStorage.setItem(NICK_KEY, JSON.stringify(next)); // device only — never sent anywhere
  };

  const grades = useMemo(() => [...new Set((data?.students ?? []).map((s) => s.gradeBand))], [data]);
  const languages = useMemo(() => [...new Set((data?.students ?? []).map((s) => s.language))], [data]);

  const rows = useMemo(() => {
    let list = (data?.students ?? []).map((s) => ({ ...s, nickname: nicknames[s.studentCode] ?? "" }));
    if (gradeFilter) list = list.filter((s) => s.gradeBand === gradeFilter);
    if (langFilter) list = list.filter((s) => s.language === langFilter);
    list.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [data, nicknames, gradeFilter, langFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setSortAsc((a) => !a);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const exportCsv = () => {
    // Codes only — never nicknames, never anything beyond what's on screen.
    const csv = ["Student code", ...rows.map((r) => r.studentCode)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "student-codes.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const SortHeader = ({ label, k }: { label: string; k: SortKey }) => (
    <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 hover:text-foreground" aria-label={`Sort by ${label}`}>
      {label} <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {auth.accessibleSchoolCodes.length > 1 && (
          <select
            value={schoolCode}
            onChange={(e) => setSchoolCode(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
            aria-label="School"
          >
            {auth.accessibleSchoolCodes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          aria-label="Filter by grade"
        >
          <option value="">All grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          aria-label="Filter by language"
        >
          <option value="">All languages</option>
          {languages.map((l) => (
            <option key={l} value={l} className="capitalize">
              {l}
            </option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!rows.length}>
            <Download className="h-4 w-4 mr-1" /> Export codes (CSV)
          </Button>
          <Button variant="ghost" size="sm" onClick={load} aria-label="Refresh">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Students are identified only by their LanguageBridge code. Nicknames are saved only on this device.
      </p>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      )}

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">My students</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-48 w-full" />
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              <Badge variant="secondary">No activity in this range</Badge>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4"><SortHeader label="Code" k="studentCode" /></th>
                    <th className="py-2 pr-4">Nickname (this device only)</th>
                    <th className="py-2 pr-4"><SortHeader label="Grade" k="gradeBand" /></th>
                    <th className="py-2 pr-4"><SortHeader label="Language" k="language" /></th>
                    <th className="py-2 pr-4"><SortHeader label="Last active" k="lastActive" /></th>
                    <th className="py-2 pr-4"><SortHeader label="Lookups" k="wordLookups" /></th>
                    <th className="py-2 pr-4"><SortHeader label="Listens" k="audioPlays" /></th>
                    <th className="py-2 pr-4"><SortHeader label="Glossary" k="glossaryViews" /></th>
                    <th className="py-2"><SortHeader label="Reports" k="problemsReported" /></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((s) => (
                    <tr key={s.studentCode} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">{s.studentCode}</td>
                      <td className="py-2 pr-4">
                        <input
                          value={s.nickname}
                          onChange={(e) => setNickname(s.studentCode, e.target.value)}
                          placeholder="—"
                          className="w-28 rounded border border-transparent hover:border-border focus:border-primary bg-transparent px-1 py-0.5 text-sm outline-none"
                          aria-label={`Nickname for ${s.studentCode}`}
                        />
                      </td>
                      <td className="py-2 pr-4">{s.gradeBand}</td>
                      <td className="py-2 pr-4 capitalize">{s.language}{s.variant ? ` (${s.variant})` : ""}</td>
                      <td className="py-2 pr-4">{s.lastActive ? new Date(s.lastActive).toLocaleDateString() : "—"}</td>
                      <td className="py-2 pr-4">{s.wordLookups}</td>
                      <td className="py-2 pr-4">{s.audioPlays}</td>
                      <td className="py-2 pr-4">{s.glossaryViews}</td>
                      <td className="py-2">{s.problemsReported}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyStudents;
