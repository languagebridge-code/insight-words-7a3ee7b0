import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge | Audio-First Language Access"
      },
      {
            "name": "description",
            "content": "Audio translation, vocabulary support, and Talk to Teacher for preliterate English learners. Request a walkthrough for your district."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge | Audio-First Language Access"
      },
      {
            "property": "og:description",
            "content": "Audio translation, vocabulary support, and Talk to Teacher for preliterate English learners. Request a walkthrough for your district."
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
  component: Index,
});
