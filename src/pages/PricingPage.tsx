import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";
import { useEffect } from "react";

export default function PricingPage() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "LanguageBridge",
      "description": "Audio-first language accessibility Chrome extension for K-12 ESL/SLIFE students.",
      "url": "https://www.languagebridge.app/pricing",
      "brand": {
        "@type": "Brand",
        "name": "LanguageBridge"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Ohio Pilot Program",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free for selected Ohio schools 2025-2026",
          "availability": "https://schema.org/LimitedAvailability"
        },
        {
          "@type": "Offer",
          "name": "Per-Student License",
          "price": "3",
          "priceCurrency": "USD",
          "unitText": "per student/month",
          "description": "Full access to all three tools with unlimited translations",
          "availability": "https://schema.org/PreOrder"
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "pricing-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("pricing-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <PageMeta title="Pricing - Affordable Plans for Every School" description="LanguageBridge pricing starts free for Ohio pilot schools. Flexible plans for classrooms, schools, and districts with grant-fundable options." />
      <Navigation />
      <div className="pt-24">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
