import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { WhoWeServe } from "@/components/WhoWeServe";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TrustBadgeBar } from "@/components/TrustBadgeBar";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, Mail, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustBadgeBar />
      <WhoWeServe />
      
      {/* Feature Invitation */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 fade-in-up delay-700">
        <div className="container mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-primary fade-in delay-100" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-up delay-100">
            Discover What LanguageBridge Can Do
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed fade-in-up delay-200">
            Audio translation, tiered language glossary, and teacher communication. See how our three tools work together to support your students.
          </p>
          <Link to="/features">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 fade-in-up delay-300">
              Explore All Features
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Questions Section */}
      <section className="py-24 bg-muted/30 fade-in-up">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-8 text-primary fade-in delay-100 hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in-up delay-200">
              Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed fade-in-up delay-300">
              Check our comprehensive FAQ page or reach out directly. We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-400">
              <Link to="/faq">
                <Button size="lg" variant="outline" className="hover-lift transition-all duration-300 w-full sm:w-auto">
                  View FAQ
                </Button>
              </Link>
              <a href="mailto:contact@languagebridge.app">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg hover:shadow-xl hover-lift transition-all duration-300 w-full sm:w-auto group">
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
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
