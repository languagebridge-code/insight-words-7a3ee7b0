import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { OhioPilot } from "@/components/OhioPilot";
import { WhoItsFor } from "@/components/WhoItsFor";
import { About } from "@/components/About";
import { SuccessStories } from "@/components/SuccessStories";
import { Pricing } from "@/components/Pricing";
import { ProfessionalDevelopment } from "@/components/ProfessionalDevelopment";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQ } from "@/components/FAQ";
import { Roadmap } from "@/components/Roadmap";
import { Statistics } from "@/components/Statistics";
import { WhyPartner } from "@/components/WhyPartner";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <InteractiveDemo />
      <TrustBadges />
      <OhioPilot />
      <WhoItsFor />
      <About />
      <SuccessStories />
      <Pricing />
      <ProfessionalDevelopment />
      <FAQ />
      <Roadmap />
      <Statistics />
      <WhyPartner />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
