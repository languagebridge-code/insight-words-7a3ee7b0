import { createFileRoute } from "@tanstack/react-router";
import TeacherSignup from "@/pages/TeacherSignup";

export const Route = createFileRoute("/teacher-signup")({
  component: TeacherSignup,
});
