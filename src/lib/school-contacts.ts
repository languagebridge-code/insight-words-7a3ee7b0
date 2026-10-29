import { supabase } from "@/integrations/supabase/client";
import { schoolContactsSchema, type SchoolContact } from "@/lib/school-registry";

// Contacts live in public.school_contacts (operations account only via RLS)
// because the Azure registry contract does not define a contacts field yet.
export async function listSchoolContacts(): Promise<Record<string, SchoolContact[]>> {
  const { data, error } = await supabase.from("school_contacts").select("school_code,email,role,name,invited_at").order("created_at");
  if (error) throw new Error("Could not load school contacts");
  const out: Record<string, SchoolContact[]> = {};
  for (const r of data ?? []) (out[r.school_code] ??= []).push({ email: r.email, role: r.role as SchoolContact["role"], name: r.name, invitedAt: r.invited_at });
  return out;
}

export async function saveSchoolContacts(code: string, contacts: SchoolContact[]) {
  const parsed = schoolContactsSchema.parse(contacts.map(({ email, role, name }) => ({ email, role, name: name || null })));
  const { data: existing, error: readErr } = await supabase.from("school_contacts").select("email,invited_at").eq("school_code", code);
  if (readErr) throw new Error("Could not save school contacts");
  const invited = new Map((existing ?? []).map(r => [r.email, r.invited_at]));
  const { error: delErr } = await supabase.from("school_contacts").delete().eq("school_code", code);
  if (delErr) throw new Error("Could not save school contacts");
  if (parsed.length === 0) return;
  const { error } = await supabase.from("school_contacts").insert(parsed.map(c => ({ school_code: code, email: c.email, role: c.role, name: c.name ?? null, invited_at: invited.get(c.email) ?? null })));
  if (error) throw new Error("Could not save school contacts");
}

export async function markContactInvited(code: string, email: string) {
  await supabase.from("school_contacts").update({ invited_at: new Date().toISOString() }).eq("school_code", code).eq("email", email.toLowerCase());
}
