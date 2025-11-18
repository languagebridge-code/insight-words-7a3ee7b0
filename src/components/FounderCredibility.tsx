import { GraduationCap, Heart, Users } from "lucide-react";

export const FounderCredibility = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Built by <span className="gradient-text">Educators</span>, For Educators
            </h2>
          </div>
          
          <div className="bg-card border-2 border-border rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Justin Bernard, M.Ed.</h3>
                    <p className="text-muted-foreground">Founder & ESL Educator</p>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Founded by an ESL educator with <strong className="text-foreground">15+ years of experience</strong> serving <strong className="text-foreground">500+ English Language Learners</strong>, holding a Master's degree in Educational Technology (M.Ed.) from Ashland University, with international teaching experience training educators across 5 facilities in Beijing, China.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-secondary/50 rounded-lg p-4">
                    <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Real Classroom Experience</p>
                      <p className="text-sm text-muted-foreground">Built from daily challenges working with SLIFE students</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-secondary/50 rounded-lg p-4">
                    <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">Deep Understanding</p>
                      <p className="text-sm text-muted-foreground">Knows the compliance, budget, and implementation realities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground italic">
                "I built LanguageBridge because I saw firsthand how students like Amira were being left behind. Google Translate doesn't work for preliterate students, and schools deserve a compliant solution that actually helps kids learn."
              </p>
              <p className="text-sm text-foreground font-semibold mt-2">
                — Justin Bernard, M.Ed., Founder
              </p>
              <a href="mailto:justin@languagebridge.app" className="text-primary hover:underline text-sm mt-2 inline-block">
                justin@languagebridge.app
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
