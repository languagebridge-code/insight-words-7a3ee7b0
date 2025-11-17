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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="gradient-text">Help Every Student Understand—</span>
            <br />
            Even Those Who Can't Read Yet
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-light">
            Complete language accessibility platform with real-time translation, audio support, text simplification, and teacher communication tools for preliterate Students with Limited or Interrupted Formal Education (SLIFE).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-200">
            <Button
              variant="hero"
              size="xl"
              className="group"
              onClick={() => scrollToSection("#contact")}
            >
              Schedule Your District's Pilot
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => scrollToSection("#demo")}
            >
              See Demo
            </Button>
          </div>
        </div>

        {/* Hero Image - Single Focus */}
        <div className="max-w-4xl mx-auto fade-in-up delay-300">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img 
              src={heroStudent1} 
              alt="Amira, Afghan student working confidently on Chromebook with LanguageBridge" 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover Overlay with Amira's Story */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/90 to-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8">
              <div className="text-white space-y-4 max-w-2xl">
                <h3 className="text-3xl font-bold text-primary">Amira's Story</h3>
                <p className="text-lg leading-relaxed">
                  Amira's engagement was so low that teachers questioned her inclusion in general education classes. 
                  She wasn't literate in her home language because of the Taliban's takeover of Afghanistan, meaning she never learned to read her own language.
                </p>
                <p className="text-lg leading-relaxed">
                  Google Translate didn't work for her because it requires reading. But LanguageBridge reads aloud translated text, 
                  which allows her to access classroom material immediately and participate in class for the first time.
                </p>
                <p className="text-primary font-semibold text-xl">
                  Now she's thriving in her general education classroom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
