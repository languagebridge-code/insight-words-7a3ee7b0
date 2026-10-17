import { createFileRoute } from "@tanstack/react-router";
import ResetPassword from "@/pages/ResetPassword";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Your Password | LanguageBridge" },
      { name: "description", content: "Reset your LanguageBridge staff account password securely." },
      { property: "og:title", content: "Reset Your Password | LanguageBridge" },
      { property: "og:description", content: "Reset your LanguageBridge staff account password securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ResetPassword,
});
