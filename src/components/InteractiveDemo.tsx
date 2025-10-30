import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Settings, Mic, Play, Pause, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const translations = {
  dari: {
    "Read Chapter 3": "فصل ۳ را بخوانید",
    "answer questions 1-5": "به سوالات ۱ تا ۵ پاسخ دهید",
    "water cycle": "چرخه آب",
    "The water cycle describes how water moves through Earth's atmosphere": "چرخه آب توضیح می‌دهد که چگونه آب در جو زمین حرکت می‌کند"
  },
  spanish: {
    "Read Chapter 3": "Leer Capítulo 3",
    "answer questions 1-5": "responder preguntas 1-5",
    "water cycle": "ciclo del agua",
    "The water cycle describes how water moves through Earth's atmosphere": "El ciclo del agua describe cómo el agua se mueve a través de la atmósfera de la Tierra"
  },
  arabic: {
    "Read Chapter 3": "اقرأ الفصل 3",
    "answer questions 1-5": "أجب عن الأسئلة 1-5",
    "water cycle": "دورة المياه",
    "The water cycle describes how water moves through Earth's atmosphere": "تصف دورة المياه كيفية تحرك المياه عبر الغلاف الجوي للأرض"
  },
  pashto: {
    "Read Chapter 3": "دریم فصل ولولئ",
    "answer questions 1-5": "پوښتنو ته ځواب ووایئ 1-5",
    "water cycle": "د اوبو دوره",
    "The water cycle describes how water moves through Earth's atmosphere": "د اوبو دوره بیانوي چې اوبه څنګه د ځمکې په فضا کې حرکت کوي"
  }
};

export const InteractiveDemo = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof translations>("dari");
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const demoContentRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
  };

  const activateExtension = () => {
    setToolbarVisible(true);
  };

  const startReading = () => {
    setIsReading(true);
    // Simulate reading sequence
    setTimeout(() => setIsReading(false), 5000);
  };

  const toggleVoiceInput = () => {
    setShowVoiceInput(!showVoiceInput);
  };

  return (
    <section className="py-24 bg-lavender">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Try It Right Now - <span className="gradient-text">No Installation Required!</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Experience LanguageBridge in action with our interactive demo
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Demo Window */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden fade-in-up delay-200">
            {/* Browser Chrome */}
            <div className="bg-secondary border-b border-border p-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 bg-background rounded px-4 py-1 text-sm text-muted-foreground">
                classroom.google.com/assignment/123
              </div>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-white text-xs font-bold">LB</span>
              </div>
            </div>

            {/* Demo Content */}
            <div ref={demoContentRef} className="p-8 relative min-h-[500px]">
              {/* Welcome Tooltip */}
              {!toolbarVisible && !selectedText && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-peach border-2 border-burnt-orange rounded-lg p-4 shadow-lg z-10 animate-pulse">
                  <p className="text-sm font-medium text-foreground">
                    👋 Click "Activate LanguageBridge" below or select any text to translate
                  </p>
                </div>
              )}

              {/* Google Classroom-style Content */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Science Assignment: The Water Cycle</h3>
                
                <div className="space-y-4 text-lg">
                  <p 
                    className="cursor-pointer hover:bg-lavender/30 p-2 rounded transition-colors"
                    onClick={() => handleTextSelection("Read Chapter 3")}
                  >
                    <span className={selectedText === "Read Chapter 3" ? "bg-gradient-primary/20 border-2 border-primary rounded px-1" : ""}>
                      Read Chapter 3
                    </span> and answer questions 1-5
                  </p>

                  <p 
                    className="cursor-pointer hover:bg-lavender/30 p-2 rounded transition-colors"
                    onClick={() => handleTextSelection("The water cycle describes how water moves through Earth's atmosphere")}
                  >
                    <span className={selectedText === "The water cycle describes how water moves through Earth's atmosphere" ? "bg-gradient-primary/20 border-2 border-primary rounded px-1" : ""}>
                      The water cycle describes how water moves through Earth's atmosphere
                    </span>, evaporating from oceans and lakes, forming clouds, and returning as precipitation.
                  </p>
                </div>

                {/* Translation Tooltip */}
                {selectedText && (
                  <div className="bg-white border-2 gradient-primary rounded-lg p-4 shadow-2xl mt-4 animate-in fade-in-up">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Original:</p>
                        <p className="font-medium text-foreground mb-3">{selectedText}</p>
                        <p className="text-sm text-muted-foreground mb-1">Translation ({selectedLanguage}):</p>
                        <p className="text-xl font-bold text-deep-purple">
                          {translations[selectedLanguage][selectedText as keyof typeof translations['dari']] || "[Translation]"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Volume2 className="w-4 h-4" />
                        Hear in {selectedLanguage}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setSelectedText(null)}>
                        Close
                      </Button>
                    </div>
                  </div>
                )}

                {/* Voice Input Demo */}
                {showVoiceInput && (
                  <div className="bg-peach border-2 border-burnt-orange rounded-lg p-6 mt-6 animate-in fade-in-up">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burnt-orange mb-3 animate-pulse">
                        <Mic className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">Listening...</p>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">Student (Dari):</p>
                        <p className="text-lg font-medium">آیا می توانید به من کمک کنید؟</p>
                      </div>
                      <div className="text-center text-burnt-orange">↓ translates to ↓</div>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-1">English:</p>
                        <p className="text-lg font-medium">"Can you help me?"</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* LanguageBridge Toolbar */}
              {toolbarVisible && (
                <div className="absolute bottom-8 right-8 gradient-primary rounded-xl p-4 shadow-2xl backdrop-blur-lg w-72 animate-in slide-in-from-right">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-bold flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        LanguageBridge
                      </h4>
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>

                    <div>
                      <label className="text-white text-sm mb-2 block">Language:</label>
                      <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as keyof typeof translations)}>
                        <SelectTrigger className="bg-white/20 border-white/30 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dari">🇦🇫 Dari</SelectItem>
                          <SelectItem value="pashto">🇦🇫 Pashto</SelectItem>
                          <SelectItem value="arabic">🇸🇦 Arabic</SelectItem>
                          <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant={isReading ? "secondary" : "ghost"} 
                        className="text-white hover:bg-white/20"
                        onClick={startReading}
                      >
                        {isReading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isReading ? "Pause" : "Read Page"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant={showVoiceInput ? "secondary" : "ghost"}
                        className="text-white hover:bg-white/20"
                        onClick={toggleVoiceInput}
                      >
                        <Mic className="w-4 h-4" />
                        Voice
                      </Button>
                    </div>

                    <p className="text-white/80 text-xs text-center">
                      Keyboard: Alt+Shift+L
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activation Button */}
          {!toolbarVisible && (
            <div className="text-center mt-8">
              <Button 
                variant="hero" 
                size="lg"
                onClick={activateExtension}
                className="animate-pulse"
              >
                Press Alt+Shift+L to Activate LanguageBridge
              </Button>
            </div>
          )}

          {/* Demo Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-deep-purple mb-2">Try It</p>
              <p className="text-muted-foreground">Click any text to see translations</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-deep-purple mb-2">Switch Languages</p>
              <p className="text-muted-foreground">4+ languages supported</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-deep-purple mb-2">Hear It</p>
              <p className="text-muted-foreground">Text-to-speech in any language</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-xl font-bold text-foreground mb-4">
              Imagine this in every classroom
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <a href="#pilot-application">Become a Pilot School</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Schedule Live Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
