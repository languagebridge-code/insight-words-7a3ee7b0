import type { OperationsVerification } from './operations-access.ts';

const codePattern = /^[A-Z]{3,5}-(NEO|NWO|CO|SEO|SWO|INT)-[0-9]{2}$/;
function validDate(value: unknown) {
  return value == null || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value);
}
export function validateSchoolRequest(input: unknown): string | null {
  if (!input || typeof input !== 'object') return 'Invalid request';
  const request = input as Record<string, unknown>;
  if (request['action'] === 'list') return null;
  const create = request['action'] === 'create';
  if (!create && request['action'] !== 'update') return 'Invalid request';
  const data = request['data'];
  if (!data || typeof data !== 'object' || Array.isArray(data)) return 'Invalid request';
  const fields = data as Record<string, unknown>;
  const code = create ? fields['code'] : request['code'];
  if (typeof code !== 'string' || !codePattern.test(code)) return 'Use a valid school code';
  if ((create || fields['districtName'] !== undefined) && (typeof fields['districtName'] !== 'string' || !fields['districtName'].trim() || fields['districtName'].length > 200)) return 'District name is required';
  if (fields['buildingName'] != null && (typeof fields['buildingName'] !== 'string' || fields['buildingName'].length > 200)) return 'Invalid building name';
  if ((create || fields['status'] !== undefined) && !['pilot', 'active', 'expired', 'suspended'].includes(String(fields['status']))) return 'Invalid status';
  if (!validDate(fields['licenseStart']) || !validDate(fields['licenseEnd'])) return 'Choose a valid date';
  if (fields['licenseStart'] && fields['licenseEnd'] && String(fields['licenseEnd']) <= String(fields['licenseStart'])) return 'License end must be after start';
  if (fields['licenseTerm'] != null && fields['licenseTerm'] !== '10mo' && fields['licenseTerm'] !== '12mo') return 'Invalid license term';
  if (fields['seatCap'] != null && (typeof fields['seatCap'] !== 'number' || !Number.isInteger(fields['seatCap']) || fields['seatCap'] < 0)) return 'Seat cap must be a nonnegative whole number';
  return null;
}
export async function forwardSchoolAdmin(input: unknown, access: OperationsVerification, config: { base?: string | undefined; key?: string | undefined }, send: typeof fetch = fetch) {
  const fail = (error: string, status: number) => ({ status, body: { error } as unknown });
  if (!access.ok) return fail(access.error, access.status);
  if (!config.base || !config.key) return fail('Azure admin API not connected yet', 503);
  const issue = validateSchoolRequest(input);
  if (issue) return fail(issue, 400);
  const request = input as { action: string; code?: string; data?: Record<string, unknown> };
  let base: URL;
  try { base = new URL(config.base); } catch { return fail('Azure admin API not connected yet', 503); }
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash) return fail('Azure admin API not connected yet', 503);
  const url = `${base.href.replace(/\/$/, '')}/schools${request.action === 'update' ? `/${encodeURIComponent(request.code ?? '')}` : ''}`;
  // Whitelist fields, never forward caller-controlled unknown properties.
  const allowed = ['districtName', 'buildingName', 'status', 'licenseStart', 'licenseEnd', 'licenseTerm', 'seatCap', ...(request.action === 'create' ? ['code'] : [])];
  const fields = Object.fromEntries(Object.entries(request.data ?? {}).filter(([key]) => allowed.includes(key)));
  try {
    const res = await send(url, { method: request.action === 'list' ? 'GET' : request.action === 'create' ? 'POST' : 'PATCH', headers: { 'x-functions-key': config.key, 'Content-Type': 'application/json' }, ...(request.action === 'list' ? {} : { body: JSON.stringify(fields) }), signal: AbortSignal.timeout(15000), redirect: 'error' });
    const text = await res.text();
    let body: unknown;
    try { body = text ? JSON.parse(text) : {}; } catch { return fail('Azure admin API returned an invalid response', 502); }
    return { status: res.status, body };
  } catch { return fail('Unable to reach Azure admin API', 502); }
}