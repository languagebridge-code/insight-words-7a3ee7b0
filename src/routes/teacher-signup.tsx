import { createFileRoute } from "@tanstack/react-router";
import TeacherSignup from "@/pages/TeacherSignup";

export const Route = createFileRoute("/teacher-signup")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Teacher Account Access"
      },
      {
            "name": "description",
            "content": "LanguageBridge staff account access and onboarding."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Teacher Account Access"
      },
      {
            "property": "og:description",
            "content": "LanguageBridge staff account access and onboarding."
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
  component: TeacherSignup,
});
