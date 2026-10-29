import { z } from "zod";

export const REGIONS = { NEO: "Northeast Ohio", NWO: "Northwest Ohio", CO: "Central Ohio", SEO: "Southeast Ohio", SWO: "Southwest Ohio", INT: "Internal" } as const;
export const STATUSES = ["pilot", "active", "expired", "suspended"] as const;
export type Region = keyof typeof REGIONS;
export type SchoolStatus = typeof STATUSES[number];
export const schoolCodePattern = /^[A-Z]{3,5}-(NEO|NWO|CO|SEO|SWO|INT)-[0-9]{2}$/;
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date").refine(v => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v, "Choose a valid date").nullable().optional();
export const schoolFields = z.object({
  districtName: z.string().trim().min(1, "District name is required").max(200),
  buildingName: z.string().trim().max(200).nullable().optional(),
  status: z.enum(STATUSES), licenseStart: date, licenseEnd: date,
  licenseTerm: z.enum(["10mo", "12mo"]).nullable().optional(),
  seatCap: z.number().int("Seat cap must be a whole number").nonnegative("Seat cap cannot be negative").nullable().optional(),
});
function validDates(data: { licenseStart?: string | null | undefined; licenseEnd?: string | null | undefined }) {
  return !data.licenseStart || !data.licenseEnd || data.licenseEnd > data.licenseStart;
}
export const schoolFormSchema = schoolFields.refine(validDates, { message: "License end must be after start", path: ["licenseEnd"] });
const codeSchema = z.string().regex(schoolCodePattern, "Use a valid school code");
export const schoolRequestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("list") }),
  z.object({ action: z.literal("create"), data: schoolFields.extend({ code: codeSchema }).refine(validDates, { message: "License end must be after start" }) }),
  z.object({ action: z.literal("update"), code: codeSchema, data: schoolFields.partial().refine(validDates, { message: "License end must be after start" }) }),
]);
export type SchoolRequest = z.infer<typeof schoolRequestSchema>;
export type SchoolData = z.infer<typeof schoolFields>;
export interface School extends SchoolData { code: string; region: Region; updatedAt?: string | null }
export function generatedSchoolCode(abbreviation: string, region: Region, building: string) { return `${abbreviation.toUpperCase()}-${region}-${building}`; }
export function itPolicy(code: string) { return JSON.stringify({ schoolCode: { Value: code } }, null, 2); }
export function visibleSchools(schools: School[], region: string, status: string, search: string) {
  const query = search.trim().toLowerCase();
  return schools.filter(s => (region === "all" || s.region === region) && (status === "all" || s.status === status) && `${s.code} ${s.districtName}`.toLowerCase().includes(query)).sort((a, b) => a.region.localeCompare(b.region) || a.code.localeCompare(b.code));
}
export const CONTACT_ROLES = { district_admin: "District admin", champion: "Champion teacher" } as const;
export type ContactRole = keyof typeof CONTACT_ROLES;
export const schoolContactSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Contact email is required").max(255).email("Enter a valid contact email"),
  role: z.enum(["district_admin", "champion"]),
  name: z.string().trim().max(120).nullable().optional(),
});
export type SchoolContact = z.infer<typeof schoolContactSchema> & { invitedAt?: string | null };
export const schoolContactsSchema = z.array(schoolContactSchema).refine(list => new Set(list.map(c => c.email)).size === list.length, "Each contact email can only appear once");
export function primaryContactSummary(contacts: { email: string }[] | undefined) {
  if (!contacts || contacts.length === 0) return null;
  return { email: contacts[0]!.email, more: contacts.length - 1 };
}
export type InviteStatus = "not invited" | "invited" | "active";
export function contactInviteStatus(contact: { email: string; invitedAt?: string | null }, staff: { email: string; invitedAt?: string; active?: boolean }[]): InviteStatus {
  const match = staff.find(s => s.email.toLowerCase() === contact.email.toLowerCase());
  if (match?.active) return "active";
  if (match || contact.invitedAt) return "invited";
  return "not invited";
}
