import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { HomeCrisisSection } from "@/components/HomeCrisisSection";
import { UseCases } from "@/components/UseCases";
import { MeasurableImpactCarlos } from "@/components/MeasurableImpactCarlos";
import { MeasurableImpactAmira } from "@/components/MeasurableImpactAmira";
import { ValueProposition } from "@/components/ValueProposition";
import { ComplianceWarning } from "@/components/ComplianceWarning";
import { HowItWorks } from "@/components/HowItWorks";
import { OhioPilot } from "@/components/OhioPilot";
import { FAQ } from "@/components/FAQ";
import { FormsSection } from "@/components/FormsSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <InteractiveDemo />
      <HomeCrisisSection />
      <UseCases />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 py-8">
          <MeasurableImpactCarlos />
          <MeasurableImpactAmira />
        </div>
      </div>
      <ValueProposition />
      <ComplianceWarning />
      <HowItWorks />
      <OhioPilot />
      <FAQ />
      <FormsSection />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
