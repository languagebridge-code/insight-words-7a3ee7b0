import { Navigation } from "@/components/Navigation";
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
import { FormsSection } from "@/components/FormsSection";
import { TrustBadges } from "@/components/TrustBadges";
import { FAQ } from "@/components/FAQ";
import { Roadmap } from "@/components/Roadmap";
import { Statistics } from "@/components/Statistics";
import { WhyPartner } from "@/components/WhyPartner";
import { Newsletter } from "@/components/Newsletter";
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
      <TrustBadges />
      <OhioPilot />
      <WhoItsFor />
      <About />
      <SuccessStories />
      <Pricing />
      <ProfessionalDevelopment />
      <FormsSection />
      <FAQ />
      <Roadmap />
      <Statistics />
      <WhyPartner />
      <Newsletter />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
