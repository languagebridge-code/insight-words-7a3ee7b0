import { Button } from "@/components/ui/button";
import { Presentation, Users, Calendar, Headphones } from "lucide-react";

export const ProfessionalDevelopment = () => {
  const features = [
    {
      icon: Presentation,
      title: "Live Walkthrough",
      description: "Comprehensive demo of all features and functionality"
    },
    {
      icon: Users,
      title: "Hands-On Practice",
      description: "Teachers get to use LanguageBridge themselves"
    },
    {
      icon: Calendar,
      title: "Implementation Roadmap",
      description: "Step-by-step plan for successful deployment"
    },
    {
      icon: Headphones,
      title: "Ongoing Support",
      description: "Q&A with our team and continued assistance"
    }
  ];

  return (
    <section id="professional-development" className="py-24 bg-peach">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Bring LanguageBridge to <span className="gradient-text">Your Team</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Schedule a demonstration at your next professional development session
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-lg fade-in-up delay-${index + 1}00`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-burnt-orange/10 mb-4">
                  <feature.icon className="w-6 h-6 text-burnt-orange" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender mb-6">
              <svg className="w-8 h-8 text-deep-purple" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-deep-purple mb-4">Special for Ohio Schools</h3>
            <p className="text-xl text-muted-foreground mb-8">
              We'll come to you! In-person PD sessions available for Ohio districts.
            </p>
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">Schedule Your Ohio PD Demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
