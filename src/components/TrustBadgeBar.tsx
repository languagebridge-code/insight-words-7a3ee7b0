import { Shield, DollarSign, Lock, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export const TrustBadgeBar = () => {
  const badges = [
    {
      icon: Trophy,
      text: "Award-Winning Tech",
      description: "2026 Accelerate Grand Prize",
      link: "/about"
    },
    {
      icon: Shield,
      text: "FERPA Compliant",
      description: "School data protection certified"
    },
    {
      icon: DollarSign,
      text: "Title III Eligible",
      description: "Qualifies for federal funding"
    },
    {
      icon: Lock,
      text: "Azure Security",
      description: "Enterprise-grade protection"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-border/50 fade-in-up delay-600">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => {
            const content = (
              <div
                key={index}
                className="flex flex-col items-center text-center group hover-lift fade-in-up"
                style={{ animationDelay: `${(index + 7) * 0.1}s` }}
              >
                <div className="bg-primary/10 rounded-full p-4 mb-3 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <badge.icon className="w-6 h-6 text-primary group-hover:rotate-6 transition-transform duration-300" />
                </div>
                <p className="font-semibold text-sm text-foreground mb-1">{badge.text}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
              </div>
            );

            if (badge.link) {
              return (
                <Link key={index} to={badge.link} className="no-underline">
                  {content}
                </Link>
              );
            }

            return content;
          })}
        </div>
      </div>
    </div>
  );
};
