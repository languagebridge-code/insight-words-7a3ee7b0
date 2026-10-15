import { createFileRoute, redirect } from "@tanstack/react-router";

// Conference page retired. Old flyer QR codes and links still land somewhere
// useful instead of a 404.
export const Route = createFileRoute("/conference")({
  beforeLoad: () => {
    throw redirect({ to: "/demo", replace: true });
  },
});
