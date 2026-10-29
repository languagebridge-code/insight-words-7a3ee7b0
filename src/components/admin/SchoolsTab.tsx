import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import { Building2, Copy, Pencil, Plus, RefreshCw, Search, LogOut } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { schoolAdmin } from "@/lib/school-admin.functions";
import { REGIONS, STATUSES, visibleSchools, itPolicy, type School, type SchoolRequest } from "@/lib/school-registry";
import SchoolForm, { SchoolSelect } from "./SchoolForm";

const statusClasses = {
  pilot: "bg-school-pilot-bg text-school-pilot",
  active: "bg-school-active-bg text-school-active",
  expired: "bg-school-expired-bg text-school-expired",
  suspended: "bg-school-suspended-bg text-school-suspended",
};
class RegistryError extends Error { constructor(message: string, public status: number) { super(message); } }

export default function SchoolsTab() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState("");
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, current) => { setSession(current); setChecking(false); });
    return () => subscription.unsubscribe();
  }, []);
  const signIn = async (event: React.FormEvent) => {
    event.preventDefault(); setSigningIn(true); setSignInError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setSignInError(error.message); return; }
      setPassword("");
    } catch { setSignInError("Unable to sign in. Please try again."); } finally { setSigningIn(false); }
  };
  if (checking) return <div className="py-12 text-center text-muted-foreground">Checking sign-in...</div>;
  if (!session) return <section className="max-w-sm mx-auto mt-8 border border-border rounded-lg bg-card p-6"><Building2 className="h-6 w-6 text-primary mb-3" /><h2 className="text-xl tracking-normal">Schools</h2><p className="text-sm text-muted-foreground mt-2 mb-5">Sign in to manage school access.</p><form onSubmit={signIn} className="space-y-4"><div className="space-y-1.5"><Label htmlFor="schools-email">Email</Label><Input id="schools-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></div><div className="space-y-1.5"><Label htmlFor="schools-password">Password</Label><Input id="schools-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></div>{signInError && <p role="alert" className="text-sm text-destructive m-0">{signInError}</p>}<Button type="submit" className="w-full" disabled={signingIn}>{signingIn ? "Signing in..." : "Sign in"}</Button></form></section>;
  return <SchoolRegistry key={session.user.id} userId={session.user.id} />;
}

function SchoolRegistry({ userId }: { userId: string }) {
  const invoke = useServerFn(schoolAdmin);
  const queryClient = useQueryClient();
  const queryKey = ["school-registry", userId];
  const request = async (input: SchoolRequest): Promise<unknown> => {
    const result = await invoke({ data: input });
    const body: unknown = JSON.parse(result.body);
    if (result.status >= 400) {
      const message = body && typeof body === "object" && "error" in body && typeof body.error === "string" ? body.error : "Unable to complete school request";
      throw new RegistryError(message, result.status);
    }
    return body;
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
  const signOut = async () => { await supabase.auth.signOut(); queryClient.removeQueries({ queryKey }); };
  const changeStatus = async (school: School, value: string) => {
    setPending(school.code);
    try { await mutate({ action: "update", code: school.code, data: { status: value as School["status"] } }); } catch { /* Toast presents the error, no optimistic change. */ } finally { setPending(null); }
  };
  const copy = async (code: string) => { try { await navigator.clipboard.writeText(itPolicy(code)); toast.success("Copied"); } catch { toast.error("Could not copy IT policy"); } };
  const error = schoolsQuery.error;
  const blocked = error instanceof RegistryError && (error.status === 403 || error.status === 401);
  return <section className="space-y-6 text-foreground">
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Building2 className="h-6 w-6 text-primary" /><h2 className="text-2xl tracking-normal">Schools</h2></div><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={signOut}><LogOut />Sign out</Button><Button variant="outline" size="icon" title="Refresh schools" aria-label="Refresh schools" disabled={schoolsQuery.isFetching} onClick={() => schoolsQuery.refetch()}><RefreshCw className={schoolsQuery.isFetching ? "animate-spin" : ""} /></Button><Button size="sm" disabled={!schoolsQuery.isSuccess} onClick={() => setForm({ school: null })}><Plus />Add school</Button></div></div>
    {error ? <div role="alert" className="border-l-4 border-primary bg-card px-5 py-4"><p className="m-0 font-medium">{blocked ? "Not authorized" : error.message}</p></div> : schoolsQuery.isPending ? <div className="py-12 text-center text-muted-foreground">Loading schools...</div> : <>
      <div className="border-y border-border bg-card py-4 space-y-4"><div className="grid grid-cols-3 sm:grid-cols-6 gap-4 px-4">{Object.keys(REGIONS).map(r => <div key={r}><div className="text-xs text-muted-foreground">{r}</div><div className="text-2xl font-semibold tabular-nums">{schools.filter(s => s.region === r).length}</div></div>)}</div><div className="flex flex-wrap gap-x-6 gap-y-2 px-4 border-t border-border pt-3">{STATUSES.map(s => <div key={s} className="flex items-center gap-2"><span className={`rounded px-2 py-0.5 text-xs font-medium capitalize ${statusClasses[s]}`}>{s}</span><span className="text-sm font-semibold tabular-nums">{schools.filter(school => school.status === s).length}</span></div>)}</div></div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px_180px] gap-3"><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input aria-label="Search schools" placeholder="Search code or district" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" /></div><SchoolSelect label="Filter region" value={region} onChange={setRegion} options={[{ value: "all", label: "All regions" }, ...Object.entries(REGIONS).map(([value, name]) => ({ value, label: `${value} ${name}` }))]} /><SchoolSelect label="Filter status" value={status} onChange={setStatus} options={[{ value: "all", label: "All statuses" }, ...STATUSES.map(value => ({ value, label: value }))]} /></div>
      <div className="bg-card border-y border-border"><Table><TableHeader><TableRow>{["Code", "District", "Building", "Region", "Status", "License start", "License end", "Term", "Seat cap", "Actions"].map(h => <TableHead key={h} className="whitespace-nowrap text-xs">{h}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map(s => <TableRow key={s.code}><TableCell className="font-mono font-medium whitespace-nowrap text-xs">{s.code}</TableCell><TableCell className="min-w-36">{s.districtName}</TableCell><TableCell className="min-w-28">{s.buildingName || "Not set"}</TableCell><TableCell>{s.region}</TableCell><TableCell><span className={`inline-block rounded px-2 py-0.5 text-xs capitalize font-medium mb-1 ${statusClasses[s.status]}`}>{s.status}</span><SchoolSelect label={`Status for ${s.code}`} value={s.status} disabled={pending !== null} onChange={value => changeStatus(s, value)} options={STATUSES.map(value => ({ value, label: value }))} /></TableCell><TableCell className="whitespace-nowrap">{s.licenseStart?.slice(0, 10) || "Not set"}</TableCell><TableCell className="whitespace-nowrap">{s.licenseEnd?.slice(0, 10) || "Not set"}</TableCell><TableCell>{s.licenseTerm || "Not set"}</TableCell><TableCell>{s.seatCap ?? "Not set"}</TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" title="Edit school" aria-label={`Edit ${s.code}`} disabled={pending !== null} onClick={() => setForm({ school: s })}><Pencil /></Button><Button variant="ghost" size="icon" title="Copy IT policy" aria-label={`Copy IT policy for ${s.code}`} onClick={() => copy(s.code)}><Copy /></Button></div></TableCell></TableRow>)}{rows.length === 0 && <TableRow><TableCell colSpan={10} className="text-center py-12 text-muted-foreground">{schools.length === 0 ? "No schools yet" : "No matching schools"}</TableCell></TableRow>}</TableBody></Table></div><div className="text-xs text-muted-foreground">{rows.length} of {schools.length} schools</div>
    </>}
    {form && <SchoolForm school={form.school} onClose={() => setForm(null)} onSave={(code, data) => mutate(form.school ? { action: "update", code, data } : { action: "create", data: { ...data, code } })} />}
  </section>;
}