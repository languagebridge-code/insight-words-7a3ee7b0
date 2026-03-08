import { useEffect, useState, useMemo } from "react";
import { fetchFlags } from "./adminApi";
import type { FlagsResponse, FlagItem } from "./types";
import { FLAG_STATUS_CONFIG, LANGUAGE_MAP } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FlagsTabProps {
  onAuthError: () => void;
}

const statusFilters = ["all", "high_priority", "bounty", "elevated", "logged"] as const;

const FlagsTab = ({ onAuthError }: FlagsTabProps) => {
  const [data, setData] = useState<FlagsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const f = await fetchFlags();
      setData(f);
    } catch (e: any) {
      if (e.message === "NOT_AUTHENTICATED") { onAuthError(); return; }
      setError("Failed to load flags.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    let items = data.flags;
    if (statusFilter !== "all") items = items.filter((f) => f.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((f) => f.text.toLowerCase().includes(q));
    }
    return [...items].sort((a, b) => b.flagCount - a.flagCount);
  }, [data, statusFilter, search]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
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
      {/* Summary pills */}
      <div className="flex flex-wrap gap-3">
        {(["high_priority", "bounty", "elevated", "logged"] as const).map((s) => {
          const cfg = FLAG_STATUS_CONFIG[s];
          return (
            <span
              key={s}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.bgLight} ${cfg.textColor}`}
            >
              <span className={`h-2 w-2 rounded-full ${cfg.color}`} />
              {cfg.label}: {data.summary[s]}
            </span>
          );
        })}
      </div>

      {/* Filter bar */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-wrap">
            {statusFilters.map((s) => {
              const label = s === "all" ? "All" : FLAG_STATUS_CONFIG[s as keyof typeof FLAG_STATUS_CONFIG].label;
              const count = s === "all" ? data.summary.total : data.summary[s as keyof typeof data.summary];
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    statusFilter === s ? "bg-white shadow-sm text-[#4a1a45]" : "text-gray-600 hover:bg-white/50"
                  }`}
                >
                  {label} <span className="ml-1 opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search flagged text…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      {filtered.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-12 text-center">
            <Flag className="h-10 w-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No flags yet</p>
            <p className="text-sm text-gray-400 mt-1">Students will flag confusing translations as they use the extension.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">Status</TableHead>
                  <TableHead>Text / Phrase</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-center">Tier</TableHead>
                  <TableHead className="text-right">Flags</TableHead>
                  <TableHead>First Flagged</TableHead>
                  <TableHead>Last Flagged</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((flag, i) => {
                  const cfg = FLAG_STATUS_CONFIG[flag.status];
                  return (
                    <TableRow
                      key={i}
                      className={`cursor-pointer border-l-4 ${cfg.border}`}
                      onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    >
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.bgLight} ${cfg.textColor}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${cfg.color}`} />
                          {cfg.label}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px]">
                        <span className={expandedRow === i ? "" : "truncate block"}>{flag.text}</span>
                      </TableCell>
                      <TableCell className="text-sm">{LANGUAGE_MAP[flag.language] || flag.language}</TableCell>
                      <TableCell className="text-sm">{flag.source === "glossary" ? "Glossary Word" : "Full Translation"}</TableCell>
                      <TableCell className="text-center">{flag.tier ?? "—"}</TableCell>
                      <TableCell className={`text-right ${flag.flagCount >= 6 ? "font-bold" : ""}`}>{flag.flagCount}</TableCell>
                      <TableCell className="text-xs text-gray-500">{formatDistanceToNow(new Date(flag.firstFlagged), { addSuffix: true })}</TableCell>
                      <TableCell className="text-xs text-gray-500">{formatDistanceToNow(new Date(flag.lastFlagged), { addSuffix: true })}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FlagsTab;
