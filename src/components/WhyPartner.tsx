import { Sparkles, Star, TrendingUp, Users, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhyPartner = () => {
  const benefits = [
    {
      icon: Sparkles,
      text: "Shape the future of assistive technology"
    },
    {
      icon: Star,
      text: "Priority access to new features"
    },
    {
      icon: TrendingUp,
      text: "Discounted pilot pricing"
    },
    {
      icon: Users,
      text: "Direct line to our development team"
    },
    {
      icon: Award,
      text: "Featured in our success stories and case studies"
    },
    {
      icon: Zap,
      text: "Ohio schools are leading the nation in educational equity"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Be a Pioneer in <span className="gradient-text">Language Accessibility</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`flex items-start gap-4 fade-in-up delay-${index + 1}00`}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-peach flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-burnt-orange" />
                </div>
                <p className="text-lg text-muted-foreground pt-1">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center fade-in-up">
            <Button variant="hero" size="xl" asChild>
              <a href="#pilot-application">Become a Pioneer Today</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
