import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Privacy Policy"
      },
      {
            "name": "description",
            "content": "Read how LanguageBridge handles information and protects privacy."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Privacy Policy"
      },
      {
            "property": "og:description",
            "content": "Read how LanguageBridge handles information and protects privacy."
      },
      {
            "property": "og:type",
            "content": "website"
      },
      {
            "name": "twitter:card",
            "content": "summary_large_image"
      }
]
  }),
  component: Privacy,
});
