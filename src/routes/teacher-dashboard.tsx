import { createFileRoute } from "@tanstack/react-router";
import TeacherDashboard from "@/pages/TeacherDashboard";

export const Route = createFileRoute("/teacher-dashboard")({
  component: TeacherDashboard,
});
