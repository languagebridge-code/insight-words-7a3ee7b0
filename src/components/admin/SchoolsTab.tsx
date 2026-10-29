import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, Copy, Pencil, Plus, RefreshCw, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { requestSchoolAdmin, OperationsDataError } from './adminApi';
import { REGIONS, STATUSES, visibleSchools, itPolicy, type School, type SchoolRequest } from "@/lib/school-registry";
import SchoolForm, { SchoolSelect } from "./SchoolForm";

const statusClasses = {
  pilot: "bg-school-pilot-bg text-school-pilot",
  active: "bg-school-active-bg text-school-active",
  expired: "bg-school-expired-bg text-school-expired",
  suspended: "bg-school-suspended-bg text-school-suspended",
};

export default function SchoolsTab() {
  const queryClient = useQueryClient();
  const queryKey = ["school-registry"];
  const request = async (input: SchoolRequest): Promise<unknown> => {
    return requestSchoolAdmin(input);
  };
  const schoolsQuery = useQuery({ queryKey, queryFn: async () => {
    const result = await request({ action: "list" });
    if (!Array.isArray(result)) throw new Error("Azure admin API returned an invalid school list");
    return result as School[];
  }, retry: false, staleTime: 30000 });
  useEffect(() => { if (schoolsQuery.error) toast.error(schoolsQuery.error.message); }, [schoolsQuery.error]);
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<{ school: School | null } | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const schools = schoolsQuery.data ?? [];
  const rows = visibleSchools(schools, region, status, search);
  const mutate = async (input: SchoolRequest) => {
    try { await request(input); await queryClient.invalidateQueries({ queryKey }); toast.success(input.action === "create" ? "School added" : "School updated"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Unable to save school"); throw e; }
  };
  const changeStatus = async (school: School, value: string) => {
    setPending(school.code);
    try { await mutate({ action: "update", code: school.code, data: { status: value as School["status"] } }); } catch { /* Toast presents the error, no optimistic change. */ } finally { setPending(null); }
  };
  const copy = async (code: string) => { try { await navigator.clipboard.writeText(itPolicy(code)); toast.success("Copied"); } catch { toast.error("Could not copy IT policy"); } };
  const error = schoolsQuery.error;
  const blocked = error instanceof OperationsDataError && (error.status === 403 || error.status === 401);
  return <section className="space-y-6 text-foreground">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Building2 className="h-6 w-6 text-primary" /><h2 className="text-2xl tracking-normal">Schools</h2></div><div className="flex gap-2"><Button variant="outline" size="icon" title="Refresh schools" aria-label="Refresh schools" disabled={schoolsQuery.isFetching} onClick={() => schoolsQuery.refetch()}><RefreshCw className={schoolsQuery.isFetching ? "animate-spin" : ""} /></Button><Button size="sm" disabled={!schoolsQuery.isSuccess} onClick={() => setForm({ school: null })}><Plus />Add school</Button></div></div>
    {error ? <div role="alert" className="border-l-4 border-primary bg-card px-5 py-4"><p className="m-0 font-medium">{blocked ? "Not authorized" : error.message}</p></div> : schoolsQuery.isPending ? <div className="py-12 text-center text-muted-foreground">Loading schools...</div> : <>
      <div className="border-y border-border bg-card py-4 space-y-4"><div className="grid grid-cols-3 sm:grid-cols-6 gap-4 px-4">{Object.keys(REGIONS).map(r => <div key={r}><div className="text-xs text-muted-foreground">{r}</div><div className="text-2xl font-semibold tabular-nums">{schools.filter(s => s.region === r).length}</div></div>)}</div><div className="flex flex-wrap gap-x-6 gap-y-2 px-4 border-t border-border pt-3">{STATUSES.map(s => <div key={s} className="flex items-center gap-2"><span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusClasses[s]}`}>{s}</span><span className="text-sm font-semibold tabular-nums">{schools.filter(school => school.status === s).length}</span></div>)}</div></div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px_180px] gap-3"><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Search schools" placeholder="Search code or district" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div><SchoolSelect label="Filter region" value={region} onChange={setRegion} options={[{ value: "all", label: "All regions" }, ...Object.entries(REGIONS).map(([value, name]) => ({ value, label: `${value} ${name}` }))]} /><SchoolSelect label="Filter status" value={status} onChange={setStatus} options={[{ value: "all", label: "All statuses" }, ...STATUSES.map(value => ({ value, label: value }))]} /></div>
      <div className="bg-card border-y border-border"><Table><TableHeader><TableRow>{["Code", "District", "Building", "Region", "Status", "License start", "License end", "Term", "Seat cap", "Actions"].map(h => <TableHead key={h} className="whitespace-nowrap text-xs">{h}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map(s => <TableRow key={s.code}><TableCell className="font-mono font-medium whitespace-nowrap text-xs">{s.code}</TableCell><TableCell className="min-w-36">{s.districtName}</TableCell><TableCell className="min-w-28">{s.buildingName || "Not set"}</TableCell><TableCell>{s.region}</TableCell><TableCell><span className={`inline-block rounded px-2 py-0.5 text-xs capitalize font-medium mb-1 ${statusClasses[s.status]}`}>{s.status}</span><SchoolSelect label={`Status for ${s.code}`} value={s.status} disabled={pending !== null} onChange={value => changeStatus(s, value)} options={STATUSES.map(value => ({ value, label: value }))} /></TableCell><TableCell className="whitespace-nowrap">{s.licenseStart?.slice(0, 10) || "Not set"}</TableCell><TableCell className="whitespace-nowrap">{s.licenseEnd?.slice(0, 10) || "Not set"}</TableCell><TableCell>{s.licenseTerm || "Not set"}</TableCell><TableCell>{s.seatCap ?? "Not set"}</TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" title="Edit school" aria-label={`Edit ${s.code}`} disabled={pending !== null} onClick={() => setForm({ school: s })}><Pencil /></Button><Button variant="ghost" size="icon" title="Copy IT policy" aria-label={`Copy IT policy for ${s.code}`} onClick={() => copy(s.code)}><Copy /></Button></div></TableCell></TableRow>)}{rows.length === 0 && <TableRow><TableCell colSpan={10} className="text-center py-12 text-muted-foreground">{schools.length === 0 ? "No schools yet" : "No matching schools"}</TableCell></TableRow>}</TableBody></Table></div><div className="text-xs text-muted-foreground">{rows.length} of {schools.length} schools</div>
    </>}
    {form && <SchoolForm school={form.school} onClose={() => setForm(null)} onSave={(code, data) => mutate(form.school ? { action: "update", code, data } : { action: "create", data: { ...data, code } })} />}
  </section>;
}