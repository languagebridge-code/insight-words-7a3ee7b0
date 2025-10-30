import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { Statistics } from "@/components/Statistics";
import { OhioPilot } from "@/components/OhioPilot";
import { Pricing } from "@/components/Pricing";
import { WhoItsFor } from "@/components/WhoItsFor";
import { ProfessionalDevelopment } from "@/components/ProfessionalDevelopment";
import { SuccessStories } from "@/components/SuccessStories";
import { FAQ } from "@/components/FAQ";
import { Roadmap } from "@/components/Roadmap";
import { TrustBadges } from "@/components/TrustBadges";
import { FormsSection } from "@/components/FormsSection";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <InteractiveDemo />
      <Statistics />
      <OhioPilot />
      <Pricing />
      <WhoItsFor />
      <ProfessionalDevelopment />
      <SuccessStories />
      <FAQ />
      <Roadmap />
      <TrustBadges />
      <FormsSection />
      <About />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
