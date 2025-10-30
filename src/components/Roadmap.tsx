import { Check, Clock, Rocket } from "lucide-react";

export const Roadmap = () => {
  const phases = [
    {
      phase: "Phase 1",
      timing: "Now",
      icon: Check,
      status: "current",
      title: "Ohio Pilot Launch",
      features: ["Chromebook optimization", "Dari language support", "Google Classroom integration"]
    },
    {
      phase: "Phase 2",
      timing: "3-6 months",
      icon: Clock,
      status: "upcoming",
      title: "Multi-Language Expansion",
      features: ["Pashto, Arabic, Spanish", "Two-way communication", "Enhanced voice features"]
    },
    {
      phase: "Phase 3",
      timing: "6-9 months",
      icon: Clock,
      status: "upcoming",
      title: "Teacher Dashboard & Analytics",
      features: ["Student progress tracking", "Usage analytics", "District management tools"]
    },
    {
      phase: "Phase 4",
      timing: "9-12 months",
      icon: Rocket,
      status: "future",
      title: "Platform Expansion",
      features: ["Multi-platform support", "Offline mode", "Advanced LMS integrations"]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            The Future of LanguageBridge: <span className="gradient-text">Your ESL Suite</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, index) => (
            <div 
              key={index}
              className={`relative fade-in-up delay-${index + 1}00`}
            >
              <div className={`rounded-xl p-6 h-full ${
                phase.status === 'current' ? 'gradient-primary text-white shadow-2xl' :
                phase.status === 'upcoming' ? 'bg-lavender' :
                'bg-secondary'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-bold ${
                    phase.status === 'current' ? 'text-white' : 'text-deep-purple'
                  }`}>
                    {phase.phase}
                  </span>
                  <phase.icon className={`w-6 h-6 ${
                    phase.status === 'current' ? 'text-white' : 'text-burnt-orange'
                  }`} />
                </div>
                
                <p className={`text-sm mb-2 ${
                  phase.status === 'current' ? 'text-white/90' : 'text-muted-foreground'
                }`}>
                  {phase.timing}
                </p>
                
                <h3 className={`text-lg font-bold mb-4 ${
                  phase.status === 'current' ? 'text-white' : 'text-foreground'
                }`}>
                  {phase.title}
                </h3>
                
                <ul className="space-y-2">
                  {phase.features.map((feature, idx) => (
                    <li 
                      key={idx}
                      className={`text-sm flex items-start gap-2 ${
                        phase.status === 'current' ? 'text-white/90' : 'text-muted-foreground'
                      }`}
                    >
                      <span className="text-xs mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up">
          <p className="text-xl font-bold text-foreground mb-2">Coming Soon</p>
          <p className="text-lg text-muted-foreground">
            LanguageBridge will become the cornerstone of a complete <span className="gradient-text font-semibold">ESL Suite of innovative software</span> - comprehensive tools for every stage of language learning.
          </p>
        </div>
      </div>
    </section>
  );
};
