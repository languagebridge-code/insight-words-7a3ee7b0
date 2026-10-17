import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
            "title": "About LanguageBridge | Our Story and Media"
      },
      {
            "name": "description",
            "content": "Meet the educator behind LanguageBridge and explore our mission, awards, and press coverage."
      },
      {
            "property": "og:title",
            "content": "About LanguageBridge | Our Story and Media"
      },
      {
            "property": "og:description",
            "content": "Meet the educator behind LanguageBridge and explore our mission, awards, and press coverage."
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
  component: About,
});
