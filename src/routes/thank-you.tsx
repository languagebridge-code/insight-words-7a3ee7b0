import { createFileRoute } from "@tanstack/react-router";
import ThankYou from "@/pages/ThankYou";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      {
            "title": "Thank You | LanguageBridge"
      },
      {
            "name": "description",
            "content": "Your LanguageBridge request has been received."
      },
      {
            "property": "og:title",
            "content": "Thank You | LanguageBridge"
      },
      {
            "property": "og:description",
            "content": "Your LanguageBridge request has been received."
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
  component: ThankYou,
});
