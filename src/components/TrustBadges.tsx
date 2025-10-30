import { Shield, Chrome, Award, Users, Lock, FileCheck } from "lucide-react";

export const TrustBadges = () => {
  const badges = [
    {
      icon: Chrome,
      title: "Chromebook Compatible",
      description: "Built for Chrome OS"
    },
    {
      icon: Shield,
      title: "FERPA Compliant",
      description: "Student data protected"
    },
    {
      icon: Lock,
      title: "COPPA Compliant",
      description: "Child privacy assured"
    },
    {
      icon: FileCheck,
      title: "Title VI",
      description: "Civil Rights Act"
    },
    {
      icon: Users,
      title: "ADA Accessible",
      description: "Accessibility focused"
    },
    {
      icon: Award,
      title: "Ohio Partner",
      description: "State-approved pilot"
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {badges.map((badge, index) => (
              <div 
                key={index}
                className={`text-center fade-in-up delay-${index}00`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background mb-3 shadow-md">
                  <badge.icon className="w-8 h-8 text-deep-purple" />
                </div>
                <p className="font-bold text-sm text-foreground">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
