import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { OhioPilot } from "@/components/OhioPilot";
import { WhoItsFor } from "@/components/WhoItsFor";
import { Pricing } from "@/components/Pricing";
import { ProfessionalDevelopment } from "@/components/ProfessionalDevelopment";
import { FAQ } from "@/components/FAQ";
import { FormsSection } from "@/components/FormsSection";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <OhioPilot />
      <WhoItsFor />
      <Pricing />
      <ProfessionalDevelopment />
      <FAQ />
      <FormsSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
