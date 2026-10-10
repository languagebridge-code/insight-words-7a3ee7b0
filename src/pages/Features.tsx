import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { ThreeTools } from "@/components/ThreeTools";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/components/leads/LeadCtaSection";
import { Link } from "@/lib/router-compat";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import demoVideoAsset from "@/assets/product-demo-video.mp4.asset.json";
import demoPosterAsset from "@/assets/product-demo-poster.jpg.asset.json";

const SITE_ORIGIN = "https://languagebridge.app";

export default function Features() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "LanguageBridge Chrome Extension",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Chrome OS, Windows, macOS",
          "description": "LanguageBridge is an audio-first Language Accessibility Screen Reader with three integrated tools: Audio Translation for preliterate students, Tiered Language Glossary for academic vocabulary, and Talk to Teacher for classroom communication.",
          "url": "https://www.languagebridge.app/features",
          "featureList": [
            "Audio Translation with 16 language support",
            "Tiered Language Glossary (Tier 1, 2, 3 vocabulary)",
            "Talk to Teacher real-time communication",
            "Alt+Shift+L keyboard shortcut activation",
            "Works on any webpage in Chrome",
            "30-minute Google Admin Console deployment"
          ]
        },
        {
          "@type": "VideoObject",
          "name": "LanguageBridge product demonstration",
          "description": "Watch a student use LanguageBridge on a Chromebook: highlight text on any webpage, hear it read aloud in her language, open the tiered glossary for academic vocabulary, and talk to her teacher through audio translation.",
          "thumbnailUrl": [`${SITE_ORIGIN}${demoPosterAsset.url}`],
          "uploadDate": "2026-10-10",
          "duration": "PT1M50S",
          "contentUrl": `${SITE_ORIGIN}${demoVideoAsset.url}`,
          "embedUrl": `${SITE_ORIGIN}${demoVideoAsset.url}`,
          "inLanguage": "en",
          "publisher": {
            "@type": "Organization",
            "name": "LanguageBridge LLC",
            "url": SITE_ORIGIN
          }
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "features-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("features-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <PageMeta title="Features - Audio Translation, Glossary & Talk to Teacher" description="Explore the three core tools of our audio-first Language Accessibility Screen Reader: Audio Translation for preliterate students, Tiered Language Glossary, and Talk to Teacher communication bridge." />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              LanguageBridge: Complete Language Accessibility Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Help every student understand, even those who can't read yet
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Three integrated tools designed specifically for preliterate SLIFE students who need to hear, not just read, content in their language
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/demo">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Get a Demo
                </Button>
              </Link>
              <Link to="/faq">
                <Button size="lg" variant="outline">
                  View Compliance Info
                </Button>
              </Link>
            </div>

            {/* Product demo video */}
            <div className="mt-12 max-w-5xl mx-auto">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
                {isPlaying ? (
                  <video
                    className="h-full w-full bg-black"
                    src={demoVideoAsset.url}
                    poster={demoPosterAsset.url}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-label="LanguageBridge product demonstration video: a student uses audio translation, the tiered glossary, and Talk to Teacher on a Chromebook"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="group absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
                    aria-label="Play the LanguageBridge product demonstration video, 1 minute 50 seconds"
                  >
                    <img
                      src={demoPosterAsset.url}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/55 to-accent/70"
                      aria-hidden="true"
                    />
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
                    </span>
                    <span className="relative">
                      <span className="mb-1 block text-xl font-bold text-primary-foreground sm:text-2xl">
                        Product Demo Video
                      </span>
                      <span className="mb-0 block text-sm text-primary-foreground/85 sm:text-base">
                        See a student use LanguageBridge on a Chromebook
                      </span>
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-4 mb-0 text-sm text-muted-foreground">
                1:50 &middot; Recorded on a Chromebook. No student names or personal information appear.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ThreeTools />
      <HowItWorks />
      <TechnicalSpecs />

      <LeadCtaSection
        source="features-cta"
        title="Ready to See It in Action?"
        subtitle="Tell us where to send setup details, district pricing, and compliance documentation. Justin replies personally within one business day."
      />

      <Footer />
    </div>
  );
}
