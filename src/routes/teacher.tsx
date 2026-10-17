import { createFileRoute } from "@tanstack/react-router";
import TalkToTeacher from "@/pages/TalkToTeacher";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      {
            "title": "Talk to Teacher | LanguageBridge"
      },
      {
            "name": "description",
            "content": "Audio-first communication between teachers and English learners with LanguageBridge Talk to Teacher."
      },
      {
            "property": "og:title",
            "content": "Talk to Teacher | LanguageBridge"
      },
      {
            "property": "og:description",
            "content": "Audio-first communication between teachers and English learners with LanguageBridge Talk to Teacher."
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
  component: TalkToTeacher,
});
