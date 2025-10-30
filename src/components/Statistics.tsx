import { TrendingUp, Users, Globe, School } from "lucide-react";

export const Statistics = () => {
  const stats = [
    {
      icon: Users,
      number: "5.5M",
      label: "ELL Students in the U.S.",
      description: "Every one deserves equal access to education",
    },
    {
      icon: TrendingUp,
      number: "350+",
      label: "Languages Spoken",
      description: "In U.S. public schools nationwide",
    },
    {
      icon: School,
      number: "10%",
      label: "of All Students",
      description: "Are English language learners",
    },
    {
      icon: Globe,
      number: "100+",
      label: "Languages Supported",
      description: "By LanguageBridge platform",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-primary opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="gradient-text">Impact</span> We're Making
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Language should never be a barrier to learning. Here's why LanguageBridge matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-3xl p-8 shadow-xl hover-scale">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 mx-auto">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="text-5xl font-bold gradient-text block">
                    {stat.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 bg-card rounded-3xl p-8 md:p-12 shadow-xl fade-in-up delay-400">
          <h3 className="text-3xl font-bold text-center mb-6">
            Why <span className="gradient-text">Now</span> Matters
          </h3>
          <p className="text-lg text-muted-foreground text-center leading-relaxed mb-4">
            The number of ELL students in U.S. schools continues to grow, yet many still struggle with grade-level content 
            due to language barriers. LanguageBridge isn't just a tool—it's an equity solution that ensures every student can 
            access the same high-quality education, regardless of their English proficiency.
          </p>
          <p className="text-center text-muted-foreground italic">
            Together, we can close the language accessibility gap.
          </p>
        </div>
      </div>
    </section>
  );
};
