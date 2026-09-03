import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { ThreeTools } from "@/components/ThreeTools";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { Button } from "@/components/ui/button";
import { LeadCtaSection } from "@/components/leads/LeadCtaSection";
import { Link } from "@/lib/router-compat";
import { useEffect } from "react";
import extensionScreenshot from "@/assets/languagebridge-screenshot.jpg";

export default function Features() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
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

            {/* Product Screenshot */}
            <div className="mt-12 max-w-5xl mx-auto">
              <img loading="lazy" decoding="async" 
                src={extensionScreenshot} 
                alt="LanguageBridge Chrome extension showing audio-first translation, 3-tiered glossary, and Talk to Teacher features" 
                className="w-full rounded-2xl shadow-2xl border border-border"
              />
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