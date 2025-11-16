import { Download, MousePointer, Volume2 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Download,
      number: "01",
      title: "Simple Setup",
      description: "IT installs via Google Admin Console in 30 minutes. Mass deployment to all student devices."
    },
    {
      icon: MousePointer,
      number: "02",
      title: "Immediate Access",
      description: "Students start using same day, no training needed. Works in Google Classroom, Canvas, and any website."
    },
    {
      icon: Volume2,
      number: "03",
      title: "Zero Maintenance",
      description: "Auto-updates, no servers, no support burden. It just works, 24/7."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            How It Works (For Your District)
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple setup. Immediate impact. Zero maintenance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative fade-in-up delay-${index + 1}00`}
            >
              <div className="text-6xl font-bold gradient-text mb-4">
                {step.number}
              </div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-peach mb-6">
                <step.icon className="w-8 h-8 text-burnt-orange" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
