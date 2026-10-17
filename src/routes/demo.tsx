import { createFileRoute } from "@tanstack/react-router";
import Demo from "@/pages/Demo";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      {
            "title": "Request a LanguageBridge Demo"
      },
      {
            "name": "description",
            "content": "Request a LanguageBridge walkthrough for your school or district team."
      },
      {
            "property": "og:title",
            "content": "Request a LanguageBridge Demo"
      },
      {
            "property": "og:description",
            "content": "Request a LanguageBridge walkthrough for your school or district team."
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
  component: Demo,
});
