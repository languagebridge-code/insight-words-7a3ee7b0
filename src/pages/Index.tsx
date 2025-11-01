import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { UseCases } from "@/components/UseCases";
import { ValueProposition } from "@/components/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { OhioPilot } from "@/components/OhioPilot";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FormsSection } from "@/components/FormsSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <UseCases />
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <InteractiveDemo />
      <OhioPilot />
      <Pricing />
      <FAQ />
      <FormsSection />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
