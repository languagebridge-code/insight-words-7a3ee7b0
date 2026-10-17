import { createFileRoute } from "@tanstack/react-router";
import FAQ from "@/pages/FAQ";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge FAQ | Privacy and Compliance"
      },
      {
            "name": "description",
            "content": "Answers for educators and district teams about LanguageBridge, classroom use, privacy, and compliance."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge FAQ | Privacy and Compliance"
      },
      {
            "property": "og:description",
            "content": "Answers for educators and district teams about LanguageBridge, classroom use, privacy, and compliance."
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
  component: FAQ,
});
