import { Languages, MessageSquare, BookOpen } from "lucide-react";

export const ThreeTools = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Three Tools That Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              LanguageBridge isn't just translation. It's a complete language accessibility platform designed specifically for preliterate SLIFE students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-lavender p-4 rounded-full">
                  <Languages className="w-8 h-8 text-deep-purple" />
                </div>
                <div>
                  <div className="text-primary font-semibold text-sm mb-1">Tool #1</div>
                  <h3 className="text-2xl font-bold text-foreground">Audio Translation</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Translates any text on any website with authentic, contextualized translations. Audio playback ensures preliterate students can access content even when they cannot read in any language yet. Works instantly on Google Classroom, Canvas, and any website.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-peach p-4 rounded-full">
                  <BookOpen className="w-8 h-8 text-burnt-orange" />
                </div>
                <div>
                  <div className="text-primary font-semibold text-sm mb-1">Tool #2</div>
                  <h3 className="text-2xl font-bold text-foreground">Tiered Language Glossary</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Subject-specific terminology with definitions and audio in students' home languages. Builds academic vocabulary systematically across content areas (math, science, social studies). Students learn content AND language simultaneously.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-lavender p-4 rounded-full">
                  <MessageSquare className="w-8 h-8 text-deep-purple" />
                </div>
                <div>
                  <div className="text-primary font-semibold text-sm mb-1">Tool #3</div>
                  <h3 className="text-2xl font-bold text-foreground">Talk to Teacher</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Two-way translation for quick check-ins, assignment clarifications, and personalized feedback without pulling other students from class to interpret. Maintains student privacy and dignity while ensuring clear communication. Eliminates the compliance risk of using untrained student interpreters.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20 text-center">
            <p className="text-lg text-foreground font-medium italic">
              All three tools work seamlessly together in one Chrome extension. Students use what they need, when they need it, with one keyboard shortcut (Alt+Shift+L).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Keep backward compatibility
export const FourTools = ThreeTools;
