import { createFileRoute } from "@tanstack/react-router";
import TeacherAuth from "@/pages/TeacherAuth";

export const Route = createFileRoute("/teacher-auth")({
  component: TeacherAuth,
});
