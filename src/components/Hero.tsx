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
        <div className="text-center mb-16">
          <img 
            src={logo} 
            alt="LanguageBridge Logo" 
            className="w-48 h-48 mx-auto mb-8 fade-in-down hover:scale-110 transition-all duration-500 drop-shadow-2xl"
          />
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight fade-in-up delay-100">
            <span className="gradient-text">Learning Unlocked</span>
            <br />
            <span className="fade-in-up delay-200 inline-block">with LanguageBridge™</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-light max-w-4xl mx-auto leading-relaxed fade-in-up delay-300">
            Audio-first translation for students who can't read yet. Real-time support with text simplification, teacher communication, and academic glossaries. Built for preliterate SLIFE students who need to hear content, not just see it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-400">
            <Button
              variant="hero"
              size="xl"
              className="group hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection("#contact")}
            >
              Schedule Your District's Pilot
              <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="hover-lift transition-all duration-300"
              onClick={() => scrollToSection("#demo")}
            >
              See Demo
            </Button>
          </div>
        </div>

        {/* Hero Image - Single Focus */}
        <div className="max-w-4xl mx-auto fade-in-up delay-500">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer hover-scale">
            <img 
              src={heroStudent1} 
              alt="Amira, Afghan student working confidently on Chromebook with LanguageBridge" 
              className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
            />
            {/* Hover Overlay with Amira's Story */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/90 to-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8">
              <div className="text-white space-y-4 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <h3 className="text-3xl font-bold text-primary">Amira's Story</h3>
                <p className="text-lg leading-relaxed">
                  Amira's engagement was so low that teachers questioned her inclusion in general education classes. 
                  She couldn't read in her home language because of the Taliban's takeover of Afghanistan. She never learned to read her own language.
                </p>
                <p className="text-lg leading-relaxed">
                  Google Translate didn't work for her because it requires reading. But LanguageBridge reads aloud translated text, 
                  so she can access classroom material immediately and participate in class for the first time.
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
