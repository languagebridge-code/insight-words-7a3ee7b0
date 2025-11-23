import { Shield, Users, ShoppingCart } from "lucide-react";

export const WhoWeServe = () => {
  const audiences = [
    {
      icon: Shield,
      title: "Compliance Officers",
      subtitle: "Your Top Priority",
      concerns: [
        "Zero data tracking or storage",
        "FERPA and COPPA compliant",
        "No Title VI violations",
        "District-level controls and reporting"
      ],
      description: "Your ELL program meets federal requirements. Sleep better at night."
    },
    {
      icon: Users,
      title: "ESL Teachers & Students",
      subtitle: "Who Use It Daily",
      concerns: [
        "Four integrated tools: translation, simplification, communication, glossary",
        "Audio support for preliterate students in 8 languages",
        "Works in Google Classroom, Canvas, and any website",
        "One keyboard shortcut (Alt+Shift+L) for instant access"
      ],
      description: "Teachers love how simple it is. Students finally understand their assignments."
    },
    {
      icon: ShoppingCart,
      title: "Curriculum Coordinators",
      subtitle: "Who Purchase It",
      concerns: [
        "Title III fundable",
        "District licensing model designed for K-12 budgets",
        "Contact us to discuss pilot program details",
        "ROI positive in first year"
      ],
      description: "ROI is immediate. Implementation is painless. Budget justification writes itself."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Built For The People Who Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Different roles, same goal: help every student succeed
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className={`bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover-scale fade-in-up delay-${index + 2}00 group`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender mb-6 group-hover:scale-110 transition-transform duration-300">
                <audience.icon className="w-8 h-8 text-deep-purple transition-transform duration-300 group-hover:rotate-6" />
              </div>
              
              <div className="text-sm font-semibold text-primary mb-2">{audience.subtitle}</div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">{audience.title}</h3>
              
              <ul className="space-y-3 mb-6">
                {audience.concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start group/item">
                    <span className="text-primary mr-2 mt-0.5 group-hover/item:scale-125 transition-transform duration-200">✓</span>
                    <span className="text-muted-foreground text-sm leading-relaxed">{concern}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-muted-foreground italic border-t border-border pt-6 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};