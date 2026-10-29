import { useCallback, useEffect, useState } from "react";
import {
  lbApi, errorMessage,
  type HealthResponse, type OverviewResponse, type DistrictsResponse, type PricingResponse,
  type FlagRow, type SchoolLicense,
} from "@/lib/lb-dashboard-api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronRight, RefreshCw } from "lucide-react";
import OverviewTab from "@/components/admin/OverviewTab";
import ActivityTab from "@/components/admin/ActivityTab";
import SignupsTab from "@/components/admin/SignupsTab";
import SchoolsTab from "@/components/admin/SchoolsTab";

// LB Operations: super-admins only. Tabs: Health, Business, Districts &
// schools, Invite staff, Pricing, Flag queue. Costs and margins appear ONLY
// here: never in district or teacher views.

type Tab = "health" | "business" | "districts" | "invite" | "pricing" | "flags" | "activity" | "signups" | "schools";

const money = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const dash = (v: number | null | undefined, suffix = "") => (v === null || v === undefined ? "Not available" : `${v.toLocaleString()}${suffix}`);

// ---------- Health ----------

function Gauge({ label, used, limit, resetsOn, source }: { label: string; used: number; limit: number; resetsOn?: string; source?: string }) {
  const pct = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">{label}</CardTitle>
        <CardDescription>{source === "azure_monitor" ? "from Azure" : "from our metering"}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {used.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ {limit.toLocaleString()} ({pct}%)</span>
        </p>
        <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden" role="img" aria-label={`${label}: ${pct}% used`}>
          <div className={`h-full ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${pct}%` }} />
        </div>
        {resetsOn && <p className="text-xs text-muted-foreground mt-2">Resets on {resetsOn}</p>}
      </CardContent>
    </Card>
  );
}

const BUCKET_LABELS: [string, string][] = [
  ["lt250", "<250 ms"], ["lt500", "<500 ms"], ["lt1000", "<1 s"], ["lt2000", "<2 s"], ["lt5000", "<5 s"], ["gte5000", "5 s+"],
];

function HealthTab() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setHealth(await lbApi.health());
      setError(null);
    } catch (err) {
      setError(errorMessage(err));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, [load]);

  if (loading && !health) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="space-y-6">
      {error && <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      {health && !health.monitoringAvailable && (
        <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">Azure monitoring not connected: some fields show "Not available".</div>
      )}
      {health && (
        <>
          <section>
            <h3 className="text-sm font-semibold mb-3">Free tiers this month</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Gauge label="Translator characters" used={health.freeTier.translatorChars.used} limit={health.freeTier.translatorChars.limit} resetsOn={health.freeTier.resetsOn} source={health.freeTier.translatorChars.source} />
              <Gauge label="Text-to-speech characters" used={health.freeTier.ttsChars.used} limit={health.freeTier.ttsChars.limit} resetsOn={health.freeTier.resetsOn} source={health.freeTier.ttsChars.source} />
              <Gauge label="Speech-recognition hours" used={Math.round(health.freeTier.sttSeconds.used / 3600 * 100) / 100} limit={Math.round(health.freeTier.sttSeconds.limit / 3600)} resetsOn={health.freeTier.resetsOn} source={health.freeTier.sttSeconds.source} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-3">Azure responsiveness today</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(health.dependencies ?? {}).map(([svc, d]) => {
                const failPct = d.callsToday ? Math.round((d.failuresToday / d.callsToday) * 1000) / 10 : 0;
                const maxBucket = Math.max(1, ...Object.values(d.latencyBucketsToday ?? {}));
                return (
                  <Card key={svc} className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm capitalize">{svc}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>{d.callsToday} calls · {d.failuresToday} failures ({failPct}%) · {d.blocked24h} blocked (24 h)</p>
                      <div className="flex items-end gap-1 h-16 pt-2" role="img" aria-label={`Latency histogram for ${svc}`}>
                        {BUCKET_LABELS.map(([key, label]) => {
                          const v = d.latencyBucketsToday?.[key] ?? 0;
                          return (
                            <div key={key} className="flex-1 flex flex-col items-center gap-1">
                              <span className="text-[10px] text-muted-foreground">{v}</span>
                              <div className="w-full bg-primary/70 rounded-t" style={{ height: `${(v / maxBucket) * 40}px` }} />
                              <span className="text-[9px] text-muted-foreground whitespace-nowrap">{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Database</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>Peak load (last hour): {dash(health.cosmos.maxNormalizedRuPct, "%")}</p>
                <p>Throttled requests (last hour): {dash(health.cosmos.throttled1h)}</p>
                <p>Storage: {dash(health.cosmos.storageGb, " GB")} of 25 GB free</p>
                <p>Provisioned: {dash(health.cosmos.provisionedRu, " RU/s")} of 1,000 free</p>
                <p>Availability: {dash(health.cosmos.availabilityPct, "%")}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-2"><CardTitle className="text-sm">API</CardTitle></CardHeader>
              <CardContent className="text-sm space-y-1">
                <p>Requests (24 h): {dash(health.api.requests24h)} · Failures: {dash(health.api.failed24h)}</p>
                <p>Executions this month: {dash(health.api.executionsMonthToDate)} of 1,000,000 free</p>
                <p className="pt-2">Tiers: Translator {health.tiers.translator} · Speech {health.tiers.speech}</p>
              </CardContent>
            </Card>
          </section>
        </>
      )}
      <section className="border-t border-border pt-6"><h3 className="text-lg font-semibold mb-4">Usage overview</h3><OverviewTab /></section>
    </div>
  );
}

// ---------- Business ----------

function BusinessTab() {
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const to = new Date();
      const from = new Date(Date.UTC(to.getFullYear(), to.getMonth(), 1));
      const iso = (d: Date) => d.toISOString().slice(0, 10);
      try {
        setData(await lbApi.overview(iso(from), iso(to)));
      } catch (err) {
        setError(errorMessage(err));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Skeleton className="h-64 w-full" />;
  if (error) return <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>;
  if (!data) return null;

  const maxRev = Math.max(1, ...data.districts.filter((d) => !d.isDemo).map((d) => d.revenueUsd));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Revenue", money(data.totals.revenueUsd)],
          ["Metered Azure cost (estimate)", money(data.totals.meteredAzureCostUsd)],
          ["Actual Azure bill", money(data.totals.actualAzureBillUsd)],
          ["Margin", money(data.totals.revenueUsd - data.totals.meteredAzureCostUsd)],
        ].map(([label, value]) => (
          <Card key={label} className="border-border/50">
            <CardHeader className="pb-1"><CardTitle className="text-xs text-muted-foreground">{label}</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{value}</p></CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-lg">Districts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {data.districts.map((d) => (
            <div key={d.pilotId} className={d.isDemo ? "opacity-50" : ""}>
              <button
                className="w-full flex items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-muted/40"
                onClick={() => setExpanded(expanded === d.pilotId ? null : d.pilotId)}
                aria-expanded={expanded === d.pilotId}
              >
                {expanded === d.pilotId ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">
                    {d.name} {d.isDemo && <Badge variant="outline" className="ml-2">demo: excluded from totals</Badge>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {d.activeStudents} active students · seats {d.seatsUsed}/{d.seatsPurchased} · Azure dependency {d.azureDependencyPct}%
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium">{money(d.revenueUsd)}</p>
                  <p className="text-xs text-muted-foreground">Azure {money(d.azureCostUsd)} · margin {d.marginPct}%</p>
                </div>
              </button>
              <div className="mt-1 px-3">
                <div className="h-2 rounded-full bg-muted overflow-hidden" role="img" aria-label={`Revenue ${money(d.revenueUsd)} vs Azure cost ${money(d.azureCostUsd)}`}>
                  <div className="h-full bg-primary" style={{ width: `${(d.revenueUsd / maxRev) * 100}%` }} />
                </div>
              </div>
              {expanded === d.pilotId && (
                <div className="mt-2 ml-7 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-1.5 pr-4">School</th><th className="py-1.5 pr-4">Tier</th><th className="py-1.5 pr-4">Seats</th>
                        <th className="py-1.5 pr-4">Active</th><th className="py-1.5 pr-4">Revenue</th><th className="py-1.5 pr-4">Azure cost</th><th className="py-1.5">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.schools.map((s) => (
                        <tr key={s.schoolCode} className="border-b border-border/50">
                          <td className="py-1.5 pr-4">{s.schoolName}</td>
                          <td className="py-1.5 pr-4">{s.tier}</td>
                          <td className="py-1.5 pr-4">
                            {s.seatsUsed}/{s.seatsPurchased}
                            {s.overSeat && <Badge variant="outline" className="ml-1 text-amber-600 border-amber-500">over</Badge>}
                          </td>
                          <td className="py-1.5 pr-4">{s.activeStudents}</td>
                          <td className="py-1.5 pr-4">{money(s.revenueUsd)}</td>
                          <td className="py-1.5 pr-4">{money(s.azureCostUsd)}</td>
                          <td className="py-1.5">{s.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-sm">Notes</CardTitle></CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
            {data.notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------- Districts & schools ----------

const TIERS = ["Starter", "Growth", "District", "Enterprise", "Building", "Pilot", "Custom"];
const PRICING_MODELS = ["free_pilot", "per_seat", "building", "custom"];
const STATUSES = ["trial", "active", "expired", "suspended"];
const LIST_PRICE: Record<string, number> = { Starter: 12, Growth: 9, District: 6 };

const emptySchool = (): SchoolLicense => ({
  schoolCode: "", schoolName: "", gradeBands: [], seats: 0, tier: "Starter",
  pricingModel: "per_seat", annualPriceUsd: null, termStart: "", termEnd: "", status: "trial", dpaRef: "",
});

function DistrictsTab() {
  const [data, setData] = useState<DistrictsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ pilotId: "", name: "", state: "", contractAnnualUsd: "", isDemo: false });
  const [schools, setSchools] = useState<SchoolLicense[]>([emptySchool()]);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await lbApi.districts());
      setError(null);
    } catch (err) {
      setError(errorMessage(err));
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateSchool = (i: number, patch: Partial<SchoolLicense>) => {
    setSchools((prev) => prev.map((s, k) => {
      if (k !== i) return s;
      const next = { ...s, ...patch };
      // Suggest list price when tier/seats change and price untouched
      if ((patch.tier || patch.seats !== undefined) && next.pricingModel === "per_seat") {
        const per = LIST_PRICE[next.tier];
        if (per && next.seats) next.annualPriceUsd = per * next.seats;
        if (next.tier === "Building") next.annualPriceUsd = 3000;
      }
      return next;
    }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await lbApi.saveDistricts({
        district: {
          pilotId: form.pilotId,
          name: form.name,
          state: form.state || undefined,
          contractAnnualUsd: form.contractAnnualUsd ? Number(form.contractAnnualUsd) : null,
          isDemo: form.isDemo,
        },
        schools,
      });
      toast({ title: "Saved", description: `${form.name} was saved.` });
      setForm({ pilotId: "", name: "", state: "", contractAnnualUsd: "", isDemo: false });
      setSchools([emptySchool()]);
      load();
    } catch (err) {
      toast({ title: "Couldn't save", description: errorMessage(err), variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      {error && <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Districts & schools</CardTitle>
          <CardDescription>Existing districts, their schools and staff.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? <Skeleton className="h-32 w-full" /> : (data?.districts ?? []).map((d) => (
            <div key={d.pilotId} className="rounded-lg border border-border p-4">
              <p className="font-medium">{d.district?.name ?? d.pilotId} <span className="text-xs text-muted-foreground">({d.pilotId})</span></p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Schools</p>
                  <ul className="text-sm space-y-0.5">
                    {d.schools.map((s) => (
                      <li key={s.schoolCode}>{s.schoolName}: {s.tier}, {s.seats} seats, {s.status}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Staff</p>
                  <ul className="text-sm space-y-0.5">
                    {d.staff.map((s) => (
                      <li key={s.email}>{s.displayName ? `${s.displayName}: ` : ""}{s.email} ({s.role}){s.invitedAt ? ` · invited ${new Date(s.invitedAt).toLocaleDateString()}` : ""}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Add / edit a district</CardTitle>
          <CardDescription>List prices: Starter $12, Growth $9, District $6 per EL student per year; Building license $3,000 per year. A district-level contract amount replaces the sum of school prices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="d-pilot">District ID</Label>
              <Input id="d-pilot" placeholder="PCSD-2026" value={form.pilotId} onChange={(e) => setForm({ ...form, pilotId: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="d-name">District name</Label>
              <Input id="d-name" placeholder="Pickerington City Schools" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="d-state">State</Label>
              <Input id="d-state" placeholder="OH" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="d-contract">Contract amount (USD/year, optional)</Label>
              <Input id="d-contract" type="number" value={form.contractAnnualUsd} onChange={(e) => setForm({ ...form, contractAnnualUsd: e.target.value })} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.isDemo} onChange={(e) => setForm({ ...form, isDemo: e.target.checked })} />
            Demo district (excluded from business totals)
          </label>

          {schools.map((s, i) => (
            <div key={i} className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">School {i + 1}</p>
                {schools.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => setSchools(schools.filter((_, k) => k !== i))}>Remove</Button>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="space-y-1">
                  <Label>School code</Label>
                  <Input placeholder="greenbriar" value={s.schoolCode} onChange={(e) => updateSchool(i, { schoolCode: e.target.value })} />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <Label>School name</Label>
                  <Input placeholder="Greenbriar Middle School" value={s.schoolName} onChange={(e) => updateSchool(i, { schoolName: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Grade bands (comma-separated)</Label>
                  <Input placeholder="6-8" value={s.gradeBands.join(", ")} onChange={(e) => updateSchool(i, { gradeBands: e.target.value.split(",").map((g) => g.trim()).filter(Boolean) })} />
                </div>
                <div className="space-y-1">
                  <Label>Seats</Label>
                  <Input type="number" value={s.seats || ""} onChange={(e) => updateSchool(i, { seats: Number(e.target.value) })} />
                </div>
                <div className="space-y-1">
                  <Label>Tier</Label>
                  <select className="w-full rounded-md border border-border bg-background px-2 py-2 text-sm" value={s.tier} onChange={(e) => updateSchool(i, { tier: e.target.value })}>
                    {TIERS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Pricing model</Label>
                  <select className="w-full rounded-md border border-border bg-background px-2 py-2 text-sm" value={s.pricingModel} onChange={(e) => updateSchool(i, { pricingModel: e.target.value })}>
                    {PRICING_MODELS.map((m) => <option key={m} value={m}>{m.replace("_", " ")}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Annual price (USD)</Label>
                  <Input type="number" value={s.annualPriceUsd ?? ""} onChange={(e) => updateSchool(i, { annualPriceUsd: e.target.value ? Number(e.target.value) : null })} />
                </div>
                <div className="space-y-1">
                  <Label>Status</Label>
                  <select className="w-full rounded-md border border-border bg-background px-2 py-2 text-sm" value={s.status} onChange={(e) => updateSchool(i, { status: e.target.value })}>
                    {STATUSES.map((st) => <option key={st}>{st}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label>Term start</Label>
                  <Input type="date" value={s.termStart} onChange={(e) => updateSchool(i, { termStart: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>Term end</Label>
                  <Input type="date" value={s.termEnd} onChange={(e) => updateSchool(i, { termEnd: e.target.value })} />
                </div>
                <div className="space-y-1">
                  <Label>DPA reference</Label>
                  <Input placeholder="DPA-2026-014" value={s.dpaRef ?? ""} onChange={(e) => updateSchool(i, { dpaRef: e.target.value })} />
                </div>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSchools([...schools, emptySchool()])}>+ Add another school</Button>
            <Button onClick={save} disabled={saving || !form.pilotId || !form.name}>
              {saving ? "Saving…" : "Save district"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------- Invite staff ----------

function InviteTab() {
  const [form, setForm] = useState({ email: "", role: "champion", schoolIds: "", districtId: "", displayName: "" });
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await lbApi.invite({
        email: form.email,
        role: form.role,
        ...(form.displayName ? { displayName: form.displayName } : {}),
        ...(form.role === "champion"
          ? { schoolIds: form.schoolIds.split(",").map((s) => s.trim()).filter(Boolean) }
          : {}),
        ...(form.role === "district_admin" ? { districtId: form.districtId } : {}),
      });
      toast({
        title: res.alreadyHadAccount ? "Access updated" : "Invite sent",
        description: res.alreadyHadAccount ? `${form.email} already had an account; their access was updated.` : `${form.email} will get an email invite to set their password.`,
      });
      setForm({ email: "", role: "champion", schoolIds: "", districtId: "", displayName: "" });
    } catch (err) {
      toast({ title: "Couldn't invite", description: errorMessage(err), variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <Card className="border-border/50 max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg">Invite staff</CardTitle>
        <CardDescription>Champions see only their schools; district admins see every school in the district, including schools added later.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={send} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="inv-email">Email</Label>
            <Input id="inv-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="teacher@district.org" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="inv-name">Display name (optional)</Label>
            <Input id="inv-name" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="Ms. Rivera" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="inv-role">Role</Label>
            <select id="inv-role" className="w-full rounded-md border border-border bg-background px-2 py-2 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="champion">Champion teacher</option>
              <option value="district_admin">District admin</option>
            </select>
          </div>
          {form.role === "champion" ? (
            <div className="space-y-1">
              <Label htmlFor="inv-schools">School codes (comma-separated)</Label>
              <Input id="inv-schools" value={form.schoolIds} onChange={(e) => setForm({ ...form, schoolIds: e.target.value })} placeholder="greenbriar" />
            </div>
          ) : (
            <div className="space-y-1">
              <Label htmlFor="inv-district">District ID</Label>
              <Input id="inv-district" value={form.districtId} onChange={(e) => setForm({ ...form, districtId: e.target.value })} placeholder="PCSD-2026" />
            </div>
          )}
          <Button type="submit" disabled={sending}>{sending ? "Sending…" : "Send invite"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ---------- Pricing ----------

const PRICE_FIELDS: { key: string; label: string }[] = [
  { key: "translatorPerMillionChars", label: "Translator per million characters (USD)" },
  { key: "ttsPerMillionChars", label: "Text-to-speech per million characters (USD)" },
  { key: "sttPerAudioHour", label: "Speech recognition per audio hour (USD)" },
  { key: "cosmosPer100RuHour", label: "Database per 100 RU/hour (USD)" },
  { key: "cosmosPerGbMonth", label: "Database per GB/month (USD)" },
  { key: "interpreterUsdPerHour", label: "Interpreter hourly rate (USD)" },
];

function PricingTab() {
  const [data, setData] = useState<PricingResponse | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await lbApi.pricing();
        setData(res);
        const v: Record<string, string> = {};
        for (const f of PRICE_FIELDS) v[f.key] = String((res.prices as unknown as Record<string, number>)[f.key] ?? "");
        setValues(v);
      } catch (err) {
        toast({ title: "Couldn't load pricing", description: errorMessage(err), variant: "destructive" });
      }
    })();
  }, [toast]);

  const save = async () => {
    setSaving(true);
    try {
      const body: Record<string, number> = {};
      for (const f of PRICE_FIELDS) {
        const n = Number(values[f.key]);
        if (!Number.isNaN(n) && values[f.key] !== "") body[f.key] = Math.min(1000, Math.max(0, n));
      }
      await lbApi.savePricing(body);
      toast({ title: "Pricing saved" });
    } catch (err) {
      toast({ title: "Couldn't save", description: errorMessage(err), variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <Card className="border-border/50 max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg">Pricing settings</CardTitle>
        <CardDescription>
          Unit prices used for cost estimates. The interpreter rate drives the districts' "estimated interpreter value" widget.
          {data && <span className="block mt-1 text-xs">Source: {data.prices.source} · updated {new Date(data.prices.updatedAt).toLocaleDateString()}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {PRICE_FIELDS.map((f) => (
          <div key={f.key} className="space-y-1">
            <Label>{f.label}</Label>
            <Input type="number" min={0} max={1000} step="any" value={values[f.key] ?? ""} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} />
          </div>
        ))}
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save pricing"}</Button>
      </CardContent>
    </Card>
  );
}

// ---------- Flag queue ----------

function FlagsTab() {
  const [flags, setFlags] = useState<FlagRow[]>([]);
  const [filters, setFilters] = useState({ language: "", status: "", flagType: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await lbApi.flagQueue({ ...filters, limit: 100 });
      setFlags(res.flags ?? []);
      setError(null);
    } catch (err) {
      setError(errorMessage(err));
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const act = async (flag: FlagRow, action: string) => {
    try {
      await lbApi.flagAction(flag.id, { language: flag.language, action });
      toast({ title: `Marked ${action.replace("_", " ")}` });
      load();
    } catch (err) {
      toast({ title: "Couldn't update", description: errorMessage(err), variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Language" className="w-36" value={filters.language} onChange={(e) => setFilters({ ...filters, language: e.target.value })} />
        <Input placeholder="Status" className="w-36" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} />
        <Input placeholder="Flag type" className="w-36" value={filters.flagType} onChange={(e) => setFilters({ ...filters, flagType: e.target.value })} />
        <Button variant="ghost" size="sm" onClick={load} aria-label="Refresh"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></Button>
      </div>
      {error && <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      <Card className="border-border/50">
        <CardContent className="pt-4">
          {loading ? <Skeleton className="h-40 w-full" /> : flags.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No flags match these filters.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4">Language</th><th className="py-2 pr-4">Type</th><th className="py-2 pr-4">Word / entry</th>
                    <th className="py-2 pr-4">Status</th><th className="py-2 pr-4">Schools</th><th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flags.map((f) => (
                    <tr key={f.id} className="border-b border-border/50">
                      <td className="py-2 pr-4 capitalize">{f.language}</td>
                      <td className="py-2 pr-4">{f.flagType}</td>
                      <td className="py-2 pr-4">{f.word ?? "Not available"}</td>
                      <td className="py-2 pr-4"><Badge variant="secondary">{f.status}</Badge></td>
                      <td className="py-2 pr-4">{typeof f["schoolCount"] === "number" ? f["schoolCount"] : "Not available"}</td>
                      <td className="py-2">
                        <div className="flex gap-1">
                          {["in_review", "resolved", "dismissed", "reopen"].map((a) => (
                            <Button key={a} variant="ghost" size="sm" className="text-xs" onClick={() => act(f, a)}>
                              {a.replace("_", " ")}
                            </Button>
                          ))}
                        </div>
                      </td>
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
}

// ---------- Shell ----------

const LbOperations = ({ initialTab = "health" }: { initialTab?: Tab }) => {
  const [tab, setTab] = useState<Tab>(initialTab);
  const tabs: [Tab, string][] = [
    ["health", "Health & usage"],
    ["business", "Business overview"],
    ["districts", "Districts & schools"],
    ["invite", "Invite staff"],
    ["pricing", "Pricing"],
    ["activity", "Activity"],
    ["signups", "Signups"],
    ["schools", "Schools"],
    ["flags", "Flags"],
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-1 rounded-lg border border-border p-1 w-fit" role="tablist">
        {tabs.map(([id, label]) => (
          <Button
            variant="ghost"
            key={id}
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              tab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
      {tab === "health" && <HealthTab />}
      {tab === "business" && <BusinessTab />}
      {tab === "districts" && <DistrictsTab />}
      {tab === "invite" && <InviteTab />}
      {tab === "pricing" && <PricingTab />}
      {tab === "flags" && <FlagsTab />}
      {tab === "activity" && <ActivityTab />}
      {tab === "signups" && <SignupsTab />}
      {tab === "schools" && <SchoolsTab />}
    </div>
  );
};

export default LbOperations;
