import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Administration"
      },
      {
            "name": "description",
            "content": "Authorized LanguageBridge account administration."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Administration"
      },
      {
            "property": "og:description",
            "content": "Authorized LanguageBridge account administration."
      },
      {
            "property": "og:type",
            "content": "website"
      },
      {
            "name": "twitter:card",
            "content": "summary_large_image"
      },
      {
            "name": "robots",
            "content": "noindex, nofollow"
      }
]
  }),
  component: Admin,
});
