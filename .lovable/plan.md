# Conversion & SEO Checklist: audit + fixes

## Already in place (no work needed)

| # | Item | Status |
|---|------|--------|
| 2 | CTA above the fold | Hero has "Get a Demo" lead-dialog CTA |
| 3 | Meta title per page | `PageMeta` used on all public pages |
| 4 | Meta description per page | Same |
| 5 | Open Graph image | `public/og-image.png` (1200x630) wired in `index.html` |
| 6 | Favicon set | svg, ico, png, apple-touch, android chrome, manifest |
| 7 | robots.txt | Present with per-bot rules + sitemap line |
| 8 | sitemap.xml | Static file + build-time generator |
| 9 | Alt text | Every `<img>` checked has descriptive alt |
| 10 | Mobile breakpoints | Tailwind responsive classes throughout |
| 12 | Loading states | Lead form shows spinner + disabled submit |
| 13 | Form error states | Zod field errors + friendly network-failure message |
| 15 | Privacy policy | `/privacy` |
| 16 | Terms | `/terms` |

## Gaps to fix

**1. Custom 404 page**
Current `NotFound.tsx` is the unstyled default (gray box, blue link). Rebuild it on brand: Navigation + Footer, plum/orange styling, helpful links (Features, FAQ, About, Demo) and a demo CTA so lost traffic still converts.

**8. Sitemap correction**
`public/sitemap.xml` still lists the removed `/pricing` and `/compliance` pages and is missing `/demo`. Regenerate it to match the live routes.

**11. Sticky mobile CTA**
`StickyCtaBar.tsx` exists but is an old Accelerate event banner and isn't rendered anywhere. Replace it with a mobile-only (`md:hidden`) sticky bottom bar: "Get a demo — reply in 1 business day" opening the lead dialog, dismissible, hidden on `/teacher`, `/admin`, and dashboard routes so it never covers the PWA.

**14. Thank you page**
Add `/thank-you` with its own meta, a confirmation message, what happens next, and links back into Features / FAQ. The lead form keeps its inline success state but also gets an option to route here from the full `/demo` page submission (better for conversion tracking).

**17. Cookie banner**
Add a lightweight, brand-styled consent banner stored in `localStorage`. Because the site sets no tracking cookies today, it will be a short notice with Accept / Decline; declining blocks analytics from loading. Links to `/privacy`.

**18. Analytics**
No analytics installed. Recommend a privacy-friendly, cookieless script (Plausible) loaded only after consent, which keeps the FERPA/COPPA posture clean. Needs your domain/account — alternatively I can wire Google Analytics 4 if you give me the measurement ID.

**20. Compressed images**
Hero photos are 1.0–1.4 MB each and `og-image.png` is 940 KB. Re-encode all hero JPGs to ~150–250 KB at the same display size, shrink the OG PNG, and add `loading="lazy"` + `decoding="async"` to below-the-fold images.

## Technical notes
- New files: `src/pages/ThankYou.tsx`, `src/components/CookieBanner.tsx`; rewritten `src/components/StickyCtaBar.tsx` and `src/pages/NotFound.tsx`.
- Routes added in `src/App.tsx`; sitemap generator entries updated to match.
- Image compression done in-place via ffmpeg/sharp, no layout changes.
- Analytics stays out of the build until you confirm the provider.
