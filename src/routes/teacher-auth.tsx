import { createFileRoute, redirect } from "@tanstack/react-router";

export function redirectToStaffDashboard(hash: string) {
  throw redirect({ to: "/dashboard", hash, replace: true });
}

export const Route = createFileRoute("/teacher-auth")({
  beforeLoad: ({ location }) => redirectToStaffDashboard(location.hash),
});
