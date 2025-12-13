import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/languagebridge-logo.png";
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

        {/* Hero Image Carousel */}
        <div className="max-w-4xl mx-auto fade-in-up delay-500">
          <Carousel 
            className="w-full" 
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent>
              {/* Amira's Story */}
              <CarouselItem>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                  <img 
                    src={heroStudent1} 
                    alt="Amira, Afghan student working confidently on Chromebook with LanguageBridge" 
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/90 to-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8">
                    <div className="text-white space-y-4 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <h3 className="text-3xl font-bold text-primary">Amira's Story</h3>
                      <p className="text-lg leading-relaxed">
                        Amira's engagement was so low that teachers questioned her inclusion in general education classes. 
                        She couldn't read in her home language because of the Taliban's takeover of Afghanistan.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Google Translate didn't work for her because it requires reading. But LanguageBridge reads aloud translated text, 
                        so she can access classroom material immediately.
                      </p>
                      <p className="text-primary font-semibold text-xl">
                        Now she's thriving in her general education classroom.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Carlos's Story */}
              <CarouselItem>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                  <img 
                    src={heroStudentCarlos} 
                    alt="Carlos, Afro Latino student engaged with learning using LanguageBridge" 
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/90 to-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8">
                    <div className="text-white space-y-4 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <h3 className="text-3xl font-bold text-primary">Carlos's Story</h3>
                      <p className="text-lg leading-relaxed">
                        Carlos arrived from Venezuela with interrupted schooling. His teachers struggled to communicate assignments 
                        and check his understanding without a Spanish interpreter available.
                      </p>
                      <p className="text-lg leading-relaxed">
                        With LanguageBridge's teacher communication tool, his teachers can now send translated messages 
                        and Carlos can respond in Spanish, creating real two-way dialogue.
                      </p>
                      <p className="text-primary font-semibold text-xl">
                        Now he's participating actively and building confidence daily.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Maya's Story */}
              <CarouselItem>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                  <img 
                    src={heroStudentMaya} 
                    alt="Maya, African American student using LanguageBridge for read aloud support" 
                    className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/90 to-foreground/70 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-8">
                    <div className="text-white space-y-4 max-w-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      <h3 className="text-3xl font-bold text-primary">Maya's Story</h3>
                      <p className="text-lg leading-relaxed">
                        Maya noticed her friend Amira using LanguageBridge and asked if she could try it too. 
                        Even though English is her first language, the read-aloud feature helps her process complex texts.
                      </p>
                      <p className="text-lg leading-relaxed">
                        The text simplification and vocabulary scaffolds have made dense academic content more accessible, 
                        helping her build confidence in subjects she once struggled with.
                      </p>
                      <p className="text-primary font-semibold text-xl">
                        LanguageBridge isn't just for English learners—it's for every student who learns differently.
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-background/80 hover:bg-background" />
            <CarouselNext className="right-4 bg-background/80 hover:bg-background" />
          </Carousel>
          <p className="text-center text-muted-foreground mt-4 text-sm">Hover over image to read their story • Swipe or use arrows to see more</p>
        </div>
      </div>
    </section>
  );
};
