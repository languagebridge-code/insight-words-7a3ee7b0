import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhoWeServe } from "@/components/WhoWeServe";
import { ComplianceWarning } from "@/components/ComplianceWarning";
import { FounderCredibility } from "@/components/FounderCredibility";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TrustBadgeBar } from "@/components/TrustBadgeBar";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustBadgeBar />
      <WhoWeServe />
      
      {/* Feature Overview CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Four Tools That Work Together
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time translation, text simplification, teacher communication, and academic glossaries—all in one Chrome extension
          </p>
          <Link to="/features">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Explore All Features
            </Button>
          </Link>
        </div>
      </section>

      <ComplianceWarning />
      <FounderCredibility />
      
      {/* Questions Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Check our comprehensive FAQ page or reach out directly—we're here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/faq">
                <Button size="lg" variant="outline">
                  View FAQ
                </Button>
              </Link>
              <a href="mailto:info@languagebridge.app">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Questions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <ScrollToTop />
      <StickyCtaBar />
    </div>
  );
};

export default Index;
