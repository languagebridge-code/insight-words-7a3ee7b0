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
      description: "Sleep better knowing your ELL program meets federal requirements without compromise."
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
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
              className={`bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all fade-in-up delay-${index + 1}00`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender mb-4">
                <audience.icon className="w-8 h-8 text-deep-purple" />
              </div>
              
              <div className="text-sm font-semibold text-primary mb-1">{audience.subtitle}</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{audience.title}</h3>
              
              <ul className="space-y-2 mb-4">
                {audience.concerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-muted-foreground text-sm">{concern}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-muted-foreground italic border-t border-border pt-4">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};