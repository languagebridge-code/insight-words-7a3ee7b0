import type { Plugin } from "vite";
import { generateSitemap } from "./generate-sitemap";
import fs from "fs";
import path from "path";

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    closeBundle() {
      try {
        const sitemap = generateSitemap();
        // Always refresh the static copy served from public/.
        fs.writeFileSync(path.resolve(__dirname, "../public/sitemap.xml"), sitemap, "utf-8");
        // Also write into dist/ when a classic client build output exists.
        const distDir = path.resolve(__dirname, "../dist");
        if (fs.existsSync(distDir)) {
          fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf-8");
        }
        console.log("✅ sitemap.xml generated with today's date");
      } catch (err) {
        console.warn("⚠️ sitemap generation skipped:", err);
      }
    },
  };
}
