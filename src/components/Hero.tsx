import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import logo from "@/assets/languagebridge-logo.png";
import heroStudent1 from "@/assets/hero-student-1.jpg";
import heroStudent2 from "@/assets/hero-student-2.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" />
      
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-16 fade-in-up">
          <img 
            src={logo} 
            alt="LanguageBridge Logo" 
            className="w-32 h-32 mx-auto mb-8 hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Every Student Deserves to Be{" "}
            <span className="gradient-text">Heard</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Translations wherever you need them - highlight any text and LanguageBridge translates it!
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            The first Language Accessibility Screen Reader for preliterate English language learners on Chromebooks
          </p>
          
          {/* Chromebook Badge */}
          <div className="inline-flex items-center gap-2 bg-lavender px-4 py-2 rounded-full mb-12">
            <Chrome className="w-5 h-5 text-deep-purple" />
            <span className="text-deep-purple font-semibold">Built for Chromebooks</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-200">
            <Button variant="hero" size="xl" asChild>
              <a href="#pilot-application">Become an Ohio Pilot School</a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#demo">Schedule a Demo</a>
            </Button>
          </div>
        </div>

        {/* Split Hero Images */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto fade-in-up delay-300">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-scale">
            <img 
              src={heroStudent1} 
              alt="Happy Afghan student working confidently on Chromebook" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-scale">
            <img 
              src={heroStudent2} 
              alt="Happy student engaged with Chromebook in classroom" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
