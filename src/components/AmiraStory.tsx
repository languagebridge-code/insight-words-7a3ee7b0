import { TrendingUp } from "lucide-react";
import amiraImage from "@/assets/hero-student-1.jpg";

export const AmiraStory = () => {
  const metrics = [
    "Disciplinary referrals dropped to zero",
    "Participates in conversations",
    "Volunteers in class",
    "Saved 12 hours interpreter time"
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real Impact: <span className="gradient-text">Amira's Story</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How LanguageBridge transformed a frustrated student into an engaged learner
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src={amiraImage} 
                alt="Amira, an English language learner succeeding in school"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Amira, a 2nd grader from Somalia, was acting out in class because she couldn't understand instructions. 
                  With only 1 interpreter for 47 students, she was falling behind and getting in trouble daily.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-2xl font-bold mb-4">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  With LanguageBridge, Amira can now hear every instruction in Somali instantly. 
                  She understands what to do, participates actively, and her behavior transformed completely.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Measurable Impact</h3>
                </div>
                
                <ul className="space-y-3">
                  {metrics.map((metric, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold text-lg">✓</span>
                      <span className="text-foreground font-medium">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
