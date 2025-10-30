import { Shield, Lock, Award, Users } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "FERPA Compliant",
      description: "Full compliance with Family Educational Rights and Privacy Act",
    },
    {
      icon: Lock,
      title: "COPPA Certified",
      description: "Children's Online Privacy Protection Act certified",
    },
    {
      icon: Award,
      title: "Title VI Aligned",
      description: "Supporting equal access to education for all students",
    },
    {
      icon: Users,
      title: "Student Data Privacy",
      description: "We never sell or share student data with third parties",
    },
  ];

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trust & <span className="gradient-text">Compliance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your students' safety and privacy are our top priority
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-lg text-center hover-scale fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{badge.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up delay-400">
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            LanguageBridge is built with security and compliance at its core. All data is encrypted in transit and at rest, 
            and we undergo regular third-party security audits. Parents and administrators can access detailed privacy documentation at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
