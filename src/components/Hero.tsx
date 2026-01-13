import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import logo from "@/assets/languagebridge-logo.svg";
import heroStudent1 from "@/assets/hero-student-1.jpg";
import heroStudentCarlos from "@/assets/hero-student-carlos.jpg";
import heroStudentMaya from "@/assets/hero-student-maya.jpg";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    "Audio-first translation for preliterate learners",
    "FERPA-compliant & school-approved",
    "Works on any Chromebook instantly"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-24 pb-16">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Shooting stars */}
      <div className="shooting-star" />
      <div className="shooting-star" />
      <div className="shooting-star" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Launch Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span>Now Piloting in Ohio Schools</span>
            </div>

            {/* Logo - smaller on desktop, prominent on mobile */}
            <img 
              src={logo} 
              alt="LanguageBridge Logo" 
              className="w-24 h-24 lg:w-28 lg:h-28 mx-auto lg:mx-0 mb-6 fade-in-down hover:scale-105 transition-all duration-500 drop-shadow-xl"
            />
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.05] tracking-tight fade-in-up delay-100">
              <span className="gradient-text">Every Student</span>
              <br />
              <span className="text-foreground">Deserves to</span>
              <br />
              <span className="gradient-text">Understand</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 fade-in-up delay-200">
              The audio-first Chrome extension that helps preliterate English learners access classroom content—instantly.
            </p>

            {/* Benefits List */}
            <ul className="space-y-3 mb-10 fade-in-up delay-300">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground/80 justify-center lg:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-base sm:text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-in-up delay-400">
              <Button
                size="xl"
                className="group gradient-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-lg px-8 py-6"
                onClick={() => scrollToSection("#contact")}
              >
                Start Your Free Pilot
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="group border-2 hover:bg-muted/50 transition-all duration-300 text-lg px-8 py-6"
                onClick={() => scrollToSection("#demo")}
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="fade-in-up delay-300 lg:pl-8">
            <Carousel 
              className="w-full" 
              opts={{ loop: true }}
              plugins={[
                Autoplay({
                  delay: 6000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]}
            >
              <CarouselContent>
                {/* Amira's Story */}
                <CarouselItem>
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer aspect-[4/3]">
                    <img 
                      src={heroStudent1} 
                      alt="Amira, Afghan student working confidently on Chromebook with LanguageBridge" 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6 lg:p-8">
                      <div className="text-white space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-sm font-medium">Student Story</span>
                        <h3 className="text-2xl lg:text-3xl font-bold">Amira's Journey</h3>
                        <p className="text-base lg:text-lg leading-relaxed opacity-90 line-clamp-3">
                          From unable to participate to thriving in general education. LanguageBridge reads translated text aloud for students who can't read yet.
                        </p>
                      </div>
                    </div>
                    {/* Always visible caption */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 lg:p-6 group-hover:opacity-0 transition-opacity duration-500">
                      <p className="text-white font-medium text-lg">Hover to read Amira's story →</p>
                    </div>
                  </div>
                </CarouselItem>

                {/* Carlos's Story */}
                <CarouselItem>
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer aspect-[4/3]">
                    <img 
                      src={heroStudentCarlos} 
                      alt="Carlos, Afro Latino student engaged with learning using LanguageBridge" 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6 lg:p-8">
                      <div className="text-white space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-sm font-medium">Student Story</span>
                        <h3 className="text-2xl lg:text-3xl font-bold">Carlos's Progress</h3>
                        <p className="text-base lg:text-lg leading-relaxed opacity-90 line-clamp-3">
                          Two-way teacher communication broke down barriers. Now Carlos participates actively and builds confidence daily.
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 lg:p-6 group-hover:opacity-0 transition-opacity duration-500">
                      <p className="text-white font-medium text-lg">Hover to read Carlos's story →</p>
                    </div>
                  </div>
                </CarouselItem>

                {/* Maya's Story */}
                <CarouselItem>
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer aspect-[4/3]">
                    <img 
                      src={heroStudentMaya} 
                      alt="Maya, African American student using LanguageBridge for read aloud support" 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6 lg:p-8">
                      <div className="text-white space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-primary/90 rounded-full text-sm font-medium">Student Story</span>
                        <h3 className="text-2xl lg:text-3xl font-bold">Maya's Discovery</h3>
                        <p className="text-base lg:text-lg leading-relaxed opacity-90 line-clamp-3">
                          Not just for ELLs—Maya uses read-aloud and audio translation to access complex academic content.
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 lg:p-6 group-hover:opacity-0 transition-opacity duration-500">
                      <p className="text-white font-medium text-lg">Hover to read Maya's story →</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-3 bg-background/90 hover:bg-background shadow-lg border-0" />
              <CarouselNext className="right-3 bg-background/90 hover:bg-background shadow-lg border-0" />
            </Carousel>
            
            {/* Carousel dots indicator text */}
            <p className="text-center text-muted-foreground mt-4 text-sm">
              Real students. Real impact. Swipe to explore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
