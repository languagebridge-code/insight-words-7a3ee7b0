# AGENTS.md
- All dashboard users share DashboardSignIn at /dashboard; /admin is a redirect. Operations-only idle expiry uses per-user activity timestamps solely for sign-out timing, never authorization.

- School registry calls use supabase.functions.invoke on the existing admin-proxy /school-admin dispatcher because new Edge Functions are blocked. Shared registry forwarding validates the API contract and keeps Azure credentials server-only.

- Dashboard→Azure proxy lives at `src/routes/api/lb-dashboard/$.ts` (TanStack server route), NOT a Supabase Edge Function — new edge functions are blocked in this project. It whitelists routes, revalidates bearer identity with Auth, and forwards that bearer to `LB_API_BASE`; it holds no Azure API key. Secrets: `LB_API_BASE`, `LB_DASHBOARD_ORIGIN`.
- Every operations handler, including admin-proxy usage/signups/registry and the dashboard-to-Azure proxy, uses supabase/functions/_shared/operations-access.ts for live JWT identity, confirmed designated email, matching Azure identity and trusted dashboard-role verification. src/lib/lb-dashboard-access.ts reexports the shared pure policy so an email match never grants privileges by itself.
- The real dashboard (`src/pages/Dashboard.tsx` + `src/components/lb-dashboard/`) replaced the old demo-mode dashboard. Sign-in is invite-only; invite/recovery links (`type=invite|recovery` in URL hash) show a set-password screen.
- Legacy `/teacher-auth` redirects to `/dashboard` preserving recovery hashes; `/reset-password` remains public and returns users to `/dashboard` so staff share one sign-in.
- Staff invitation and active password-reset redirect options are centralized independently of the proxy CORS origin and browser origin so preview requests cannot redirect staff to a different sign-in.
- Homepage auth callbacks redirect through an early head script using the browser's raw query and hash, before hydration can consume tokens or normalize query encoding.
- Per-user dashboard layouts persist in `public.dashboard_layouts` (user_id is a plain UUID, no FK to auth.users, per platform rules).
- Privacy invariants enforced in UI: students are codes only; teacher nicknames live in localStorage only (`lb-student-nicknames`); suppressed groups render "Fewer than 10 students"; costs/margins only in LB Operations (super-admin).
- Brand image references must use the same approved artwork as the main navigation, including dashboard and interactive demo views, to prevent legacy marks from resurfacing.
- School contacts live in public.school_contacts (operations account only via RLS), keyed by school code, because the Azure registry contract has no contacts field; Invite reuses the LB Operations Invite staff tab pre-filled.
