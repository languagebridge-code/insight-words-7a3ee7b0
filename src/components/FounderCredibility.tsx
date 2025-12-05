import { GraduationCap, MessageCircle } from "lucide-react";

export const FounderCredibility = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              A Message from <span className="gradient-text">Our Founder</span>
            </h2>
          </div>
          
          <div className="bg-card border-2 border-border rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Justin Bernard, M.Ed.</h3>
                  <p className="text-muted-foreground">Founder & ESL Educator • 15+ Years Experience</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MessageCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I created LanguageBridge because I was tired of watching my students wait <strong className="text-foreground">3 to 5 years</strong> to master English before they could access grade-level content. That's not fair to them, and it's not sustainable for schools.
                  </p>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed pl-10">
                  The reality is simple: when students can't access curriculum, <strong className="text-foreground">school scores suffer</strong>. Teachers are stretched thin trying to translate materials or waiting on interpreters. Meanwhile, bright, capable students sit in classrooms unable to participate.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed pl-10">
                  LanguageBridge gives students access to curriculum content <strong className="text-foreground">on day one</strong>. It's real accommodations provided exactly when students need them, without adding work to already overwhelmed teachers.
                </p>
                
                <p className="text-lg text-foreground leading-relaxed pl-10 font-medium">
                  Your students deserve to learn today, not in 3 years. Let me show you how we can make that happen.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-foreground font-semibold">
                Justin Bernard, M.Ed., Founder
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
