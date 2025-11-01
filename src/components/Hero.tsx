import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/languagebridge-logo.png";
import heroStudent1 from "@/assets/hero-student-1.jpg";
import heroStudent2 from "@/assets/hero-student-2.jpg";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-16 fade-in-up">
          <img 
            src={logo} 
            alt="LanguageBridge Logo" 
            className="w-48 h-48 mx-auto mb-6 hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Every Student Deserves to Be{" "}
            <span className="gradient-text">Heard</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Translations wherever you need them - highlight any text and LanguageBridge translates it!
          </p>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            The first Language Accessibility Screen Reader for preliterate English language learners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-200">
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => scrollToSection("#forms")}
            >
              Become an Ohio Pilot School
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => scrollToSection("#contact")}
            >
              Schedule a Demo
            </Button>
          </div>
        </div>

        {/* Split Hero Images */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto fade-in-up delay-300">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-scale">
            <img 
              src={heroStudent2} 
              alt="Happy student engaged with Chromebook in classroom" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl hover-scale">
            <img 
              src={heroStudent1} 
              alt="Happy Afghan student working confidently on Chromebook" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
