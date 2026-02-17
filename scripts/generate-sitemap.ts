// Auto-generates sitemap.xml at build time from route definitions
// Add/remove routes here — the sitemap updates on every deploy

const SITE_URL = "https://www.languagebridge.app";

interface SitemapRoute {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

const routes: SitemapRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/features", changefreq: "monthly", priority: 0.9 },
  { path: "/pricing", changefreq: "monthly", priority: 0.9 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/pilot", changefreq: "monthly", priority: 0.8 },
  { path: "/demo", changefreq: "monthly", priority: 0.8 },
  { path: "/get-started", changefreq: "monthly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.7 },
  { path: "/faq", changefreq: "monthly", priority: 0.7 },
  { path: "/grants", changefreq: "monthly", priority: 0.7 },
  { path: "/compliance", changefreq: "monthly", priority: 0.6 },
  { path: "/implementation", changefreq: "monthly", priority: 0.6 },
  { path: "/privacy", changefreq: "yearly", priority: 0.4 },
  { path: "/terms", changefreq: "yearly", priority: 0.4 },
];

export function generateSitemap(): string {
  const today = new Date().toISOString().split("T")[0];

  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
