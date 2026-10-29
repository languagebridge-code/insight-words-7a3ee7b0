import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | LanguageBridge" },
      {
        name: "description",
        content:
          "LanguageBridge dashboard: district insights, operations, seats, and student activity by LanguageBridge code only. No student names.",
      },
      { property: "og:title", content: "Dashboard | LanguageBridge" },
      {
        property: "og:description",
        content: "Usage insights and student activity for LanguageBridge districts. Zero student PII.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Dashboard,
});
