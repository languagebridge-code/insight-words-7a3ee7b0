import { Download, MousePointer, Volume2 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Download,
      number: "01",
      title: "Install the Chrome Extension",
      description: "Quick and easy setup - get started in under a minute"
    },
    {
      icon: MousePointer,
      number: "02",
      title: "Highlight Any Text",
      description: "Select text on any webpage, in any learning platform"
    },
    {
      icon: Volume2,
      number: "03",
      title: "Translate & Listen",
      description: "LanguageBridge translates and reads aloud instantly (Alt+Shift+L)"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to language accessibility
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative fade-in-up delay-${index + 1}00`}
            >
              <div className="text-6xl font-bold text-deep-purple mb-4 opacity-20">
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
