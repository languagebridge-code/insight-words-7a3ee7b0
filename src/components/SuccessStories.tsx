import { School, Quote } from "lucide-react";

export const SuccessStories = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Transforming Classrooms <span className="gradient-text">Across Ohio</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div 
                key={index}
                className={`bg-background rounded-xl p-8 shadow-lg text-center fade-in-up delay-${index}00`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender mb-6">
                  <School className="w-8 h-8 text-deep-purple" />
                </div>
                
                <Quote className="w-8 h-8 text-burnt-orange mx-auto mb-4 opacity-50" />
                
                <p className="text-muted-foreground mb-6 italic">
                  Pilot program launching - your school's success story could be featured here!
                </p>
                
                <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4"></div>
                
                <p className="text-sm text-muted-foreground">
                  Ohio Educator
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 fade-in-up">
            <div className="inline-block gradient-primary rounded-2xl p-8 text-white">
              <p className="text-2xl font-bold mb-2">
                Join us in creating the first generation of LanguageBridge success stories
              </p>
              <p className="text-lg text-white/90">
                Your school could be one of the pioneers featured here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
