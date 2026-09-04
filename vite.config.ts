// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";
import { sitemapPlugin } from "./scripts/vite-sitemap-plugin";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      sitemapPlugin(),
      VitePWA({
        registerType: "autoUpdate",
        // Registration happens only from src/lib/register-sw.ts (guarded wrapper).
        injectRegister: null,
        // Static manifest lives at public/manifest.json (start_url /teacher, brand icons).
        manifest: false,
        filename: "sw.js",
        devOptions: { enabled: false },
        workbox: {
          cleanupOutdatedCaches: true,
          // HTML navigations: network-first so content is never stale.
          navigateFallback: "/",
          navigateFallbackDenylist: [/^\/~oauth/],
          runtimeCaching: [
            {
              urlPattern: ({ request, url }) =>
                request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
              handler: "NetworkFirst",
              options: {
                cacheName: "lb-html",
                networkTimeoutSeconds: 4,
                expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
            {
              // Same-origin hashed build assets only.
              urlPattern: ({ url }) =>
                url.origin === self.location.origin && /^\/assets\/.+[-_][\w-]{6,}\.(js|css|woff2?|png|jpg|webp|svg)$/.test(url.pathname),
              handler: "CacheFirst",
              options: {
                cacheName: "lb-assets",
                expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        },
      }),
    ],
  },
});
