import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { WhoWeServe } from "@/components/WhoWeServe";
import { FourTools } from "@/components/FourTools";
import { ComplianceWarning } from "@/components/ComplianceWarning";
import { HowItWorks } from "@/components/HowItWorks";
import { FounderCredibility } from "@/components/FounderCredibility";
import { TechnicalSpecs } from "@/components/TechnicalSpecs";
import { ImplementationSupport } from "@/components/ImplementationSupport";
import { FAQExpanded } from "@/components/FAQExpanded";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <InteractiveDemo />
      <WhoWeServe />
      <FourTools />
      <HowItWorks />
      <ComplianceWarning />
      <FounderCredibility />
      <TechnicalSpecs />
      <ImplementationSupport />
      <FAQExpanded />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
