import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import ohioMap from "@/assets/ohio-map.png";

export const OhioPilot = () => {
  const scrollToForms = () => {
    const element = document.querySelector("#forms");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ohio-pilot" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative gradient-primary rounded-3xl p-12 md:p-16 shadow-2xl text-center fade-in-up">
            <div className="absolute top-8 right-8 opacity-20">
              <img src={ohioMap} alt="Ohio" className="w-64 h-64" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-8 h-8 text-white" />
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Now Piloting Throughout Ohio
                </h2>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              
              <p className="text-2xl text-white font-semibold mb-4">
                Our Flagship State!
              </p>
              
              <p className="text-xl text-white/95 mb-6 max-w-3xl mx-auto leading-relaxed">
                We're partnering with forward-thinking Ohio schools to bring LanguageBridge to students who need it most. Be part of the first wave of schools revolutionizing language accessibility.
              </p>
              
              <p className="text-lg text-white/90 mb-8 italic">
                Limited pilot partnerships available for the 2025-2026 school year
              </p>
              
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                onClick={scrollToForms}
              >
                Partner With Us - Join Ohio's Language Revolution
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
