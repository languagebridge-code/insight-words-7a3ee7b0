import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REGIONS, STATUSES, generatedSchoolCode, schoolCodePattern, schoolFormSchema, type Region, type School, type SchoolData } from "@/lib/school-registry";

export function SchoolSelect({ value, onChange, label, options, disabled = false }: { value: string; onChange: (value: string) => void; label: string; options: { value: string; label: string }[]; disabled?: boolean }) {
  return <Select value={value} onValueChange={onChange} disabled={disabled}><SelectTrigger aria-label={label} className="w-full min-w-0"><SelectValue /></SelectTrigger><SelectContent>{options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select>;
}

function SchoolDate({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const selected = value ? parseISO(value) : undefined;
  return <div className="space-y-1.5"><Label>{label}</Label><Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button type="button" variant="outline" className="w-full justify-start border-border text-foreground hover:bg-muted hover:text-foreground" aria-label={label}><CalendarIcon />{selected ? format(selected, "MMM d, yyyy") : "Select date"}</Button></PopoverTrigger><PopoverContent align="start" className="w-auto p-0 pointer-events-auto"><Calendar mode="single" selected={selected} defaultMonth={selected} onSelect={date => { onChange(date ? format(date, "yyyy-MM-dd") : ""); setOpen(false); }} className="pointer-events-auto p-3" />{value && <Button type="button" variant="ghost" size="sm" className="m-2" onClick={() => { onChange(""); setOpen(false); }}>Clear date</Button>}</PopoverContent></Popover></div>;
}

export default function SchoolForm({ school, onClose, onSave }: { school: School | null; onClose: () => void; onSave: (code: string, data: SchoolData) => Promise<void> }) {
  const [abbreviation, setAbbreviation] = useState("");
  const [region, setRegion] = useState<Region>("NEO");
  const [building, setBuilding] = useState("01");
  const [districtName, setDistrictName] = useState(school?.districtName ?? "");
  const [buildingName, setBuildingName] = useState(school?.buildingName ?? "");
  const [status, setStatus] = useState(school?.status ?? "pilot");
  const [start, setStart] = useState(school?.licenseStart ?? "");
  const [end, setEnd] = useState(school?.licenseEnd ?? "");
  const [term, setTerm] = useState(school?.licenseTerm ?? "none");
  const [seats, setSeats] = useState(school?.seatCap == null ? "" : String(school.seatCap));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const code = school?.code ?? generatedSchoolCode(abbreviation, region, building);
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setError("");
    if (!schoolCodePattern.test(code)) { setError("Use 3 to 5 district letters and a two-digit building number"); return; }
    const parsed = schoolFormSchema.safeParse({ districtName, buildingName: buildingName || null, status, licenseStart: start || null, licenseEnd: end || null, licenseTerm: term === "none" ? null : term, seatCap: seats === "" ? null : Number(seats) });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Check the school details"); return; }
    setSaving(true);
    try { await onSave(code, parsed.data); onClose(); } catch (e) { setError(e instanceof Error ? e.message : "Unable to save school"); } finally { setSaving(false); }
  };
  return <Dialog open onOpenChange={open => { if (!open && !saving) onClose(); }}><DialogContent className="max-w-xl max-h-[90dvh] overflow-y-auto rounded-lg"><DialogHeader><DialogTitle>{school ? "Edit school" : "Add school"}</DialogTitle><DialogDescription>{school ? school.code : "School access-code registry"}</DialogDescription></DialogHeader><form onSubmit={save} className="space-y-5">
    {school ? <div className="space-y-1.5"><Label htmlFor="school-code">Code</Label><Input id="school-code" value={code} readOnly className="font-mono bg-muted" /></div> : <><div className="grid grid-cols-1 sm:grid-cols-3 gap-3"><div className="space-y-1.5"><Label htmlFor="district-abbreviation">District abbreviation</Label><Input id="district-abbreviation" value={abbreviation} onChange={e => setAbbreviation(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))} minLength={3} maxLength={5} placeholder="OLEN" required /></div><div className="space-y-1.5"><Label>Region</Label><SchoolSelect label="School region" value={region} onChange={v => setRegion(v as Region)} options={Object.entries(REGIONS).map(([value, name]) => ({ value, label: `${value} ${name}` }))} /></div><div className="space-y-1.5"><Label htmlFor="building-number">Building number</Label><Input id="building-number" value={building} onChange={e => setBuilding(e.target.value.replace(/\D/g, "").slice(0, 2))} inputMode="numeric" pattern="[0-9]{2}" maxLength={2} required /></div></div><output className="block rounded-md bg-muted px-4 py-3 text-lg font-mono text-primary" aria-live="polite">{code}</output></>}
    <div className="space-y-1.5"><Label htmlFor="district-name">District name</Label><Input id="district-name" value={districtName} onChange={e => setDistrictName(e.target.value)} required maxLength={200} /></div>
    <div className="space-y-1.5"><Label htmlFor="building-name">Building name <span className="text-muted-foreground font-normal">(optional)</span></Label><Input id="building-name" value={buildingName} onChange={e => setBuildingName(e.target.value)} maxLength={200} /></div>
    <div className="grid grid-cols-2 gap-3"><div className="space-y-1.5"><Label>Status</Label><SchoolSelect label="School status" value={status} onChange={v => setStatus(v as typeof status)} options={STATUSES.map(value => ({ value, label: value }))} /></div><div className="space-y-1.5"><Label>Term</Label><SchoolSelect label="License term" value={term} onChange={v => setTerm(v as typeof term)} options={[{ value: "none", label: "Not set" }, { value: "10mo", label: "10mo" }, { value: "12mo", label: "12mo" }]} /></div></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><SchoolDate label="License start" value={start} onChange={setStart} /><SchoolDate label="License end" value={end} onChange={setEnd} /></div>
    <div className="space-y-1.5"><Label htmlFor="seat-cap">Seat cap</Label><Input id="seat-cap" type="number" min="0" step="1" value={seats} onChange={e => setSeats(e.target.value)} /></div>
    {error && <p className="m-0 text-sm text-destructive" role="alert">{error}</p>}
    <div className="flex justify-end gap-2"><Button type="button" variant="ghost" disabled={saving} onClick={onClose}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? "Saving..." : school ? "Save changes" : "Add school"}</Button></div>
  </form></DialogContent></Dialog>;
}