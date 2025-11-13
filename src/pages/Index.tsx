import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HomeCrisisSection } from "@/components/HomeCrisisSection";
import { ValueProposition } from "@/components/ValueProposition";
import { SimpleHowItWorks } from "@/components/SimpleHowItWorks";
import { UseCases } from "@/components/UseCases";
import { FounderStory } from "@/components/FounderStory";
import { SimplePricing } from "@/components/SimplePricing";
import { Statistics } from "@/components/Statistics";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollToTop />
      
      {/* Hero Section */}
      <Hero />
      
      {/* The Crisis - Why This Matters */}
      <HomeCrisisSection />
      
      {/* What We Do */}
      <ValueProposition />
      
      {/* How It Works */}
      <SimpleHowItWorks />
      
      {/* Real Impact - Use Cases */}
      <UseCases />
      
      {/* Statistics & Trust */}
      <Statistics />
      
      {/* Founder Story - Why We're Different */}
      <FounderStory />
      
      {/* Pricing */}
      <SimplePricing />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Contact - CTA */}
      <Contact />
      
      <Footer />
    </div>
  );
};

export default Index;
