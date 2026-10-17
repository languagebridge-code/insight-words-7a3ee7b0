# AGENTS.md

- Dashboard→Azure proxy lives at `src/routes/api/lb-dashboard/$.ts` (TanStack server route), NOT a Supabase Edge Function — new edge functions are blocked in this project. It whitelists routes, revalidates bearer identity with Auth, and forwards that bearer to `LB_API_BASE`; it holds no Azure API key. Secrets: `LB_API_BASE`, `LB_DASHBOARD_ORIGIN`.
- Dashboard Operations routes (including legacy dashboard and flags) require both the verified designated administrator identity and Azure's trusted super-admin dashboard role; `src/lib/lb-dashboard-access.ts` centralizes these restrictions so an email match never grants privileges by itself.
- The real dashboard (`src/pages/Dashboard.tsx` + `src/components/lb-dashboard/`) replaced the old demo-mode dashboard. Sign-in is invite-only; invite/recovery links (`type=invite|recovery` in URL hash) show a set-password screen.
- Legacy `/teacher-auth` redirects to `/dashboard` preserving recovery hashes; `/reset-password` remains public and returns users to `/dashboard` so staff share one sign-in.
- Per-user dashboard layouts persist in `public.dashboard_layouts` (user_id is a plain UUID, no FK to auth.users, per platform rules).
- Privacy invariants enforced in UI: students are codes only; teacher nicknames live in localStorage only (`lb-student-nicknames`); suppressed groups render "Fewer than 10 students"; costs/margins only in LB Operations (super-admin).
- Brand image references must use the same approved artwork as the main navigation, including dashboard and interactive demo views, to prevent legacy marks from resurfacing.
