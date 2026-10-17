# AGENTS.md

- Dashboard→Azure proxy lives at `src/routes/api/lb-dashboard/$.ts` (TanStack server route), NOT a Supabase Edge Function — new edge functions are blocked in this project. It whitelists routes and forwards the user's Supabase bearer token to `LB_API_BASE`; it holds no API key. Secrets: `LB_API_BASE`, `LB_DASHBOARD_ORIGIN`.
- The real dashboard (`src/pages/Dashboard.tsx` + `src/components/lb-dashboard/`) replaced the old demo-mode dashboard. Sign-in is invite-only; invite/recovery links (`type=invite|recovery` in URL hash) show a set-password screen.
- Per-user dashboard layouts persist in `public.dashboard_layouts` (user_id is a plain UUID, no FK to auth.users, per platform rules).
- Privacy invariants enforced in UI: students are codes only; teacher nicknames live in localStorage only (`lb-student-nicknames`); suppressed groups render "Fewer than 10 students"; costs/margins only in LB Operations (super-admin).
