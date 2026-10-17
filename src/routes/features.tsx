import { createFileRoute } from "@tanstack/react-router";
import Features from "@/pages/Features";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Features | Three Classroom Tools"
      },
      {
            "name": "description",
            "content": "Explore LanguageBridge audio translation, tiered vocabulary support, and Talk to Teacher for English learners."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Features | Three Classroom Tools"
      },
      {
            "property": "og:description",
            "content": "Explore LanguageBridge audio translation, tiered vocabulary support, and Talk to Teacher for English learners."
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
  component: Features,
});
