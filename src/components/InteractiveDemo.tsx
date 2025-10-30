import { useState } from "react";
import { MousePointer2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InteractiveDemo = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string>("");

  const demoText = "The mitochondria is the powerhouse of the cell.";
  const words = demoText.split(" ");

  const translations: Record<string, { spanish: string; arabic: string }> = {
    mitochondria: { spanish: "mitocondrias", arabic: "الميتوكوندريا" },
    powerhouse: { spanish: "central eléctrica", arabic: "محطة الطاقة" },
    cell: { spanish: "célula", arabic: "خلية" },
  };

  const handleWordClick = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[.,]/g, "");
    if (translations[cleanWord]) {
      setSelectedWord(cleanWord);
      setTranslation(translations[cleanWord].spanish);
    }
  };

  return (
    <section id="demo" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try it yourself! Click any highlighted word to see instant translation
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-16 shadow-2xl fade-in-up delay-100">
            {/* Demo Browser Frame */}
            <div className="bg-secondary/50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-background rounded-lg px-4 py-2 text-sm text-muted-foreground ml-4">
                  classroom.google.com/science-lesson
                </div>
              </div>

              {/* Demo Content */}
              <div className="bg-background rounded-xl p-8 relative">
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    LanguageBridge Active
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-6">Cell Biology Lesson</h3>
                <p className="text-lg leading-relaxed mb-4">
                  {words.map((word, index) => {
                    const cleanWord = word.toLowerCase().replace(/[.,]/g, "");
                    const isClickable = translations[cleanWord];
                    return (
                      <span key={index}>
                        <span
                          className={`${
                            isClickable
                              ? "bg-primary/20 px-1 cursor-pointer hover:bg-primary/30 transition-colors rounded"
                              : ""
                          } ${
                            selectedWord === cleanWord ? "bg-primary/40" : ""
                          }`}
                          onClick={() => isClickable && handleWordClick(word)}
                        >
                          {word}
                        </span>
                        {index < words.length - 1 && " "}
                      </span>
                    );
                  })}
                </p>

                {/* Translation Tooltip */}
                {selectedWord && (
                  <div className="mt-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 animate-fade-in border-2 border-primary/30">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                        <MousePointer2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-muted-foreground mb-2">
                          Translation (Spanish):
                        </p>
                        <p className="text-2xl font-bold gradient-text mb-4">
                          {translation}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          English: <span className="font-semibold">{selectedWord}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                <MousePointer2 className="w-5 h-5 inline mr-2" />
                Click on <span className="bg-primary/20 px-2 py-1 rounded">
                  highlighted words
                </span>{" "}
                above to see translations
              </p>
              <Button
                size="lg"
                onClick={() => {
                  const element = document.querySelector("#forms");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="gradient-primary text-white hover:opacity-90"
              >
                Schedule a Full Demo
              </Button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 fade-in-up delay-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Instant Translation</h4>
              <p className="text-sm text-muted-foreground">
                No copying, pasting, or leaving the page
              </p>
            </div>
            <div className="text-center p-6 fade-in-up delay-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MousePointer2 className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Simple Highlight</h4>
              <p className="text-sm text-muted-foreground">
                Just click or highlight any word
              </p>
            </div>
            <div className="text-center p-6 fade-in-up delay-400">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="font-bold mb-2">100+ Languages</h4>
              <p className="text-sm text-muted-foreground">
                Support for every student's home language
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
