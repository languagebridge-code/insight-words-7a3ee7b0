import { createFileRoute } from "@tanstack/react-router";
import TalkToTeacher from "@/pages/TalkToTeacher";

export const Route = createFileRoute("/teacher")({
  component: TalkToTeacher,
});
