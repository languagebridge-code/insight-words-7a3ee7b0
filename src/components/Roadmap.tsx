import { Rocket, Sparkles, BookOpen, Network } from "lucide-react";

export const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      title: "Ohio Pilot Launch",
      status: "Current",
      icon: Rocket,
      description: "Rolling out LanguageBridge to select Ohio schools for the 2025-2026 school year",
      features: [
        "Chrome extension for instant translations",
        "9 languages (Somali, Urdu, Ukrainian, Persian, Dari, Pashto, Arabic, Spanish, English)",
        "Teacher dashboard and analytics",
        "Professional development program",
      ],
    },
    {
      phase: "Phase 2",
      title: "Enhanced Features",
      status: "Fall 2026",
      icon: Sparkles,
      description: "Expanding capabilities based on pilot school feedback",
      features: [
        "Mobile app for tablets and smartphones",
        "Audio pronunciation for all translations",
        "Offline mode for limited connectivity",
        "Parent portal for home engagement",
      ],
    },
    {
      phase: "Phase 3",
      title: "National Expansion",
      status: "2027",
      icon: Network,
      description: "Bringing LanguageBridge to schools across the United States",
      features: [
        "LMS integrations (Canvas, Google Classroom)",
        "SIS integrations for seamless rostering",
        "Advanced analytics and growth tracking",
        "Multi-district management tools",
      ],
    },
    {
      phase: "Phase 4",
      title: "Word-to-Word Dictionary",
      status: "Future",
      icon: BookOpen,
      description: "Revolutionary discovery tool powered by Steinhart NYC",
      features: [
        "Context-aware term suggestions",
        "Academic vocabulary discovery",
        "Cross-language concept mapping",
        "Student-driven vocabulary building",
      ],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're just getting started. Here's what's on the horizon for LanguageBridge.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {phases.map((phase, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-8 md:p-12 shadow-xl fade-in-up hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                    <phase.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    phase.status === "Current" 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {phase.status}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">{phase.phase}</p>
                    <h3 className="text-3xl font-bold mb-3">{phase.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {phase.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center fade-in-up delay-400">
          <h3 className="text-3xl font-bold mb-4">
            The Future is <span className="gradient-text">Word-to-Word</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            In partnership with <span className="font-semibold">Steinhart NYC</span>, we're developing a revolutionary 
            word-to-word dictionary that will allow students to discover terms contextually. Instead of just translating, 
            students will build connections between languages, fostering deeper understanding and vocabulary growth.
          </p>
          <p className="text-muted-foreground italic">
            Imagine a student learning not just what a word means, but discovering related terms, synonyms, and concepts 
            across languages, all in context as they read.
          </p>
        </div>
      </div>
    </section>
  );
};
