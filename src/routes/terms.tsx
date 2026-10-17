import { createFileRoute } from "@tanstack/react-router";
import TermsOfService from "@/pages/TermsOfService";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Terms of Service"
      },
      {
            "name": "description",
            "content": "Read the terms governing use of LanguageBridge classroom tools and services."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Terms of Service"
      },
      {
            "property": "og:description",
            "content": "Read the terms governing use of LanguageBridge classroom tools and services."
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
  component: TermsOfService,
});
