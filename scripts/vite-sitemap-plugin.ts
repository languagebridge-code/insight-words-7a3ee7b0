import type { Plugin } from "vite";
import { generateSitemap } from "./generate-sitemap";
import fs from "fs";
import path from "path";

export function sitemapPlugin(): Plugin {
  return {
    name: "vite-plugin-sitemap",
    closeBundle() {
      const sitemap = generateSitemap();
      const outPath = path.resolve(__dirname, "../dist/sitemap.xml");
      fs.writeFileSync(outPath, sitemap, "utf-8");
      console.log("✅ sitemap.xml generated with today's date");
    },
  };
}
