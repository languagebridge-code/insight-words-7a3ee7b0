import { createFileRoute, redirect } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { homepageAuthDestination } from "@/lib/homepage-auth-redirect";

export const Route = createFileRoute("/")({
  beforeLoad: ({ location }) => {
    const destination = homepageAuthDestination(location.href);
    if (destination) throw redirect({ href: destination, replace: true, reloadDocument: true });
  },
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
