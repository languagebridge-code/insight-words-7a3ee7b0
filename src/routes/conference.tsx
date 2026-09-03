import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conference")({
  head: () => ({
    meta: [
      { title: "LanguageBridge Conference Sign-Up" },
      {
        name: "description",
        content:
          "Sign up to learn more about LanguageBridge — the award-winning audio-first Chrome extension for preliterate English learners.",
      },
      { property: "og:title", content: "LanguageBridge Conference Sign-Up" },
      {
        property: "og:description",
        content:
          "Sign up to learn more about LanguageBridge — the award-winning audio-first Chrome extension for preliterate English learners.",
      },
    ],
  }),
  component: ConferencePage,
});

function ConferencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/[0.04] to-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Branded header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm font-medium text-primary">
              Conference Offer
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Let's connect at the conference
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Leave your details and we'll follow up with a free pilot for your
            school or district — no obligation, no data stored.
          </p>

          {/* QR code — clean block for flyer reuse */}
          <div className="mt-6 flex flex-col items-center">
            <img
              src="/conference-qr.png"
              alt="QR code linking to LanguageBridge conference sign-up at languagebridge.app/conference"
              width={220}
              height={220}
              className="block bg-white rounded-xl p-2 shadow-[var(--shadow-elegant)]"
            />
            <span className="mt-2 text-xs font-medium text-muted-foreground">
              Scan to sign up — languagebridge.app/conference
            </span>
          </div>
        </div>

        {/* Google Form embed */}
        <div className="rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)] overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="p-2 sm:p-4">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScs16FiLQlwjFt8tluXqLVX6zWY2ED0Lm4evUX6EUYQ8x13GA/viewform?embedded=true"
              width="100%"
              height="1595"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="LanguageBridge Conference Sign-Up Form"
              className="w-full"
            >
              Loading…
            </iframe>
          </div>
        </div>

        {/* Trust line */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          LanguageBridge is 100% FERPA and COPPA compliant. We never store
          student data.
        </p>
      </div>
    </div>
  );
}
