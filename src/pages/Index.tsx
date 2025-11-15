import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { AmiraStory } from "@/components/AmiraStory";
import { WhoWeServe } from "@/components/WhoWeServe";
import { ComplianceWarning } from "@/components/ComplianceWarning";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <InteractiveDemo />
      <AmiraStory />
      <WhoWeServe />
      <ComplianceWarning />
      <HowItWorks />
      <FAQ />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
