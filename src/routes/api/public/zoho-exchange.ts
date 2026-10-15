// Temporary one-time helper: exchange a Zoho grant code for a refresh token.
// Delete after use.
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/zoho-exchange")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { code } = await request.json();
        if (!code || typeof code !== "string") {
          return Response.json({ error: "missing code" }, { status: 400 });
        }
        const clientId = process.env.ZOHO_CLIENT_ID;
        const clientSecret = process.env.ZOHO_CLIENT_SECRET;
        if (!clientId || !clientSecret) {
          return Response.json({ error: "server not configured" }, { status: 500 });
        }
        const params = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
        });
        const res = await fetch(`https://accounts.zoho.com/oauth/v2/token?${params}`, {
          method: "POST",
        });
        const body = await res.json();
        return Response.json(body, { status: res.status });
      },
    },
  },
});
