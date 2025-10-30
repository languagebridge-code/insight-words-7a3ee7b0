import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks";
import { OhioPilot } from "@/components/OhioPilot";
import { WhoItsFor } from "@/components/WhoItsFor";
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
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
