import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { WebsiteSchema } from "@/components/WebsiteSchema";
import { LeadDialogProvider } from "@/components/leads/LeadDialog";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { CookieBanner } from "@/components/CookieBanner";
import NotFound from "@/pages/NotFound";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { configureApi } from "@/features/talk-to-teacher/lib/api";
import appCss from "../styles.css?url";

// ported from App.tsx — Talk to Teacher calls the lb-proxy edge function, which is
// the only place the LanguageBridge API key exists. No key ever reaches the browser.
configureApi(`${import.meta.env['VITE_SUPABASE_URL']}/functions/v1/lb-proxy`);

const SITE_TITLE =
  "LanguageBridge - An Audio-First Language Accessibility Screen Reader for ESL Students";
const SITE_DESCRIPTION =
  "LanguageBridge is an audio-first Language Accessibility Screen Reader for preliterate ESL students. Three integrated tools: Audio Translation, Tiered Language Glossary, and Talk to Teacher. Free pilot for Ohio schools.";

const SOFTWARE_APPLICATION_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LanguageBridge",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Chrome",
  description:
    "An audio-first Language Accessibility Screen Reader empowering preliterate English language learners with real-time translation tools.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free pilot program for Ohio schools",
  },
  featureList: [
    "Audio Translation - Real-time audio translation for preliterate students who cannot read traditional translations",
    "Tiered Language Glossary - Word-to-word vocabulary support with tiered language levels",
    "Talk to Teacher - Direct communication bridge between ESL students and teachers",
  ],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "English Language Learners, SLIFE Students, Preliterate Students",
  },
  provider: {
    "@type": "Organization",
    name: "LanguageBridge",
    url: "https://languagebridge.app",
  },
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "LanguageBridge" },
      {
        name: "keywords",
        content:
          "ESL tools, English language learners, Chrome extension, Audio Translation, Tiered Language Glossary, Talk to Teacher, text-to-speech, assistive technology, Ohio schools, language accessibility, screen reader, preliterate students, SLIFE students",
      },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "LanguageBridge" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:url", content: "https://languagebridge.app" },
      { property: "og:image", content: "https://languagebridge.app/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@_languagebridge" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: "https://languagebridge.app/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg?v=20260228", type: "image/svg+xml" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/android-chrome-192x192.png?v=20260304",
      },
      { rel: "manifest", href: "/manifest.json?v=20260304" },
      { rel: "canonical", href: "https://languagebridge.app" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: SOFTWARE_APPLICATION_JSONLD },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    void import("@/lib/register-sw").then((m) => m.registerAppServiceWorker());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LeadDialogProvider>
          <BreadcrumbSchema />
          <WebsiteSchema />
          <Outlet />
          <StickyCtaBar />
          <CookieBanner />
        </LeadDialogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function RootErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  console.error(error);

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-3xl font-bold text-foreground">This page didn't load</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Something went wrong while loading this page. You can try again, or head back to
        the homepage.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-md border border-border px-5 py-2.5 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
