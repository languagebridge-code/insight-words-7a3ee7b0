import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { ThreeTools } from "@/components/ThreeTools";
import { HowItWorks } from "@/components/HowItWorks";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Features() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "LanguageBridge Chrome Extension",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Chrome OS, Windows, macOS",
      "description": "Three integrated tools: Audio Translation for preliterate students, Tiered Language Glossary for academic vocabulary, and Talk to Teacher for classroom communication.",
      "url": "https://www.languagebridge.app/features",
      "featureList": [
        "Audio Translation with 9+ language support",
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
      <PageMeta title="Features - Audio Translation, Glossary & Talk to Teacher" description="Explore LanguageBridge's three core tools: Audio Translation for preliterate students, Tiered Language Glossary, and Talk to Teacher communication bridge." />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              LanguageBridge™: Complete Language Accessibility Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Help every student understand, even those who can't read yet
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Three integrated tools designed specifically for preliterate SLIFE students who need to hear, not just read, content in their language
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/pilot">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Request Pilot Program
                </Button>
              </Link>
              <Link to="/compliance">
                <Button size="lg" variant="outline">
                  View Compliance Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ThreeTools />
      <InteractiveDemo />
      <HowItWorks />
      <TechnicalSpecs />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See It in Action?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join Ohio schools participating in the 2025-2026 pilot program
          </p>
          <Link to="/pilot">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Apply for Pilot Program
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
