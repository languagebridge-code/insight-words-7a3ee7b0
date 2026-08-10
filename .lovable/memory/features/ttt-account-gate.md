---
name: Talk to Teacher Account Gate
description: Required signup/login plus controlled pilot organization selection before the /teacher PWA
type: feature
---
The /teacher PWA is gated: no anonymous access, no "skip for now".

Flow: Screen 1 signup/login (full name, email, role dropdown: Teacher, EL Mentor, School/District Administrator, Other Educator, Just Exploring; email+password auth, auto-confirm enabled so signup continues immediately) → Screen 2 organization selection (shown once, saved to profile) → the app.

Organization list comes from the `pilot_organizations` table (active contracted pilots only). No free text entry ever. A permanent bottom option "I'm not part of a school pilot, just exploring LanguageBridge" maps to the single reserved pilot_id `INDIVIDUAL-PREVIEW`. pilot_id is never blank or null once selected, and the raw pilot_id is never displayed to users.

Explicitly NOT part of this: any payment, pricing, or activation-fee UI. Access stays free.

Signup list (name, email, role, organization) is exportable as CSV from the Signups tab of /admin, protected by the ADMIN_DASHBOARD_PASSWORD via the admin-proxy `/signups` endpoint.
