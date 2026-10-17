import { createFileRoute } from "@tanstack/react-router";
import TeacherDashboard from "@/pages/TeacherDashboard";

export const Route = createFileRoute("/teacher-dashboard")({
  head: () => ({
    meta: [
      {
            "title": "LanguageBridge Teacher Dashboard"
      },
      {
            "name": "description",
            "content": "Classroom insights for authorized LanguageBridge educators."
      },
      {
            "property": "og:title",
            "content": "LanguageBridge Teacher Dashboard"
      },
      {
            "property": "og:description",
            "content": "Classroom insights for authorized LanguageBridge educators."
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
  component: TeacherDashboard,
});
