import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Hero } from "@/components/Hero";
import { WhoWeServe } from "@/components/WhoWeServe";
import { DemoVideo } from "@/components/DemoVideo";
import { ThreeTools } from "@/components/ThreeTools";
import { HowItWorks } from "@/components/HowItWorks";


import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TrustBadgeBar } from "@/components/TrustBadgeBar";
import { LeadCtaSection } from "@/components/leads/LeadCtaSection";

import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-compat";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "LanguageBridge",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Chrome OS, Windows, macOS",
      "description": "LanguageBridge is an audio-first Language Accessibility Screen Reader for preliterate ESL/SLIFE students. Includes Audio Translation, Tiered Language Glossary, and Talk to Teacher tools.",
      "url": "https://languagebridge.app",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Contact us for district licensing",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Real-time audio translation in 16 languages",
        "Tiered academic language glossary",
        "Talk to Teacher communication bridge",
        "FERPA & COPPA compliant",
        "Zero student data collection",
        "Google Admin Console deployment"
      ],
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "K-12 ESL/SLIFE students"
      },
      "publisher": {
        "@type": "Organization",
        "name": "LanguageBridge",
        "url": "https://languagebridge.app"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "software-app-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("software-app-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <PageMeta
        title="LanguageBridge - An Audio-First Language Accessibility Screen Reader for ESL Students"
        description="LanguageBridge is an audio-first Language Accessibility Screen Reader for preliterate ESL students. Audio Translation, Tiered Language Glossary, and Talk to Teacher tools for K-12 classrooms."
      />
      <Navigation />
      <Hero />
      <TrustBadgeBar />
      <section id="demo" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">See it work in under two minutes</h2>
            <p className="text-lg md:text-xl text-muted-foreground">A student highlights text, hears it in her language, checks a hard word, and talks to her teacher.</p>
          </div>
          <DemoVideo />
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo"><Button size="lg" className="gradient-primary text-primary-foreground w-full sm:w-auto">Request a Demo</Button></Link>
            <Link to="/teacher"><Button size="lg" variant="outline" className="border-2 w-full sm:w-auto">Try it now</Button></Link>
          </div>
        </div>
      </section>
      <ThreeTools />
      <WhoWeServe />
      <HowItWorks />


      <LeadCtaSection source="home-cta" />
      

      
      <Footer />
      <ScrollToTop />
      
    </div>
  );
};

export default Index;
