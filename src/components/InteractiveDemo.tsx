import React, { useState, useRef, useEffect } from 'react';
import { Play, Languages, Volume2, Settings, HelpCircle, Copy, Check, ChevronDown, MessageCircle, X, BookOpen, FileText, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import languageBridgeIcon from '@/assets/languagebridge-icon.png';

const LANGUAGES = {
  urdu: { name: 'Urdu', code: 'ur' },
  dari: { name: 'Dari', code: 'fa-AF' },
  persian: { name: 'Persian', code: 'fa' },
  pashto: { name: 'Pashto', code: 'ps' },
  arabic: { name: 'Arabic', code: 'ar' },
  spanish: { name: 'Spanish', code: 'es' },
  ukrainian: { name: 'Ukrainian', code: 'uk' },
  uzbek: { name: 'Uzbek', code: 'uz' },
};

const TRANSLATIONS = {
  urdu: 'فوٹوسنتھیسز وہ عمل ہے جس میں پودے سورج کی روشنی کو شکر میں تبدیل کرتے ہیں۔',
  dari: 'فتوسنتز فرایندی است که در آن گیاهان نور خورشید را به شکر تبدیل می کنند.',
  persian: 'فتوسنتز فرایندی است که در آن گیاهان نور خورشید را به شکر تبدیل می کنند.',
  pashto: 'فوتوسنتیز هغه بهیر دی چې په کې نباتات د لمر رڼا د شکر په ډول بدل کوي.',
  arabic: 'البناء الضوئي هو العملية التي تحول فيها النباتات ضوء الشمس إلى سكر.',
  spanish: 'La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en azúcar.',
  ukrainian: 'Фотосинтез — це процес, при якому рослини перетворюють сонячне світло на цукор.',
  uzbek: 'Fotosintez - bu o\'simliklar quyosh nurini shakar o\'zgartiradigan jarayon.',
};

const SIMPLIFIED_LEVELS = {
  minimal: 'Plants use sun. Make food. Need energy.',
  balanced: 'Plants use sunlight to make food. The sun gives energy. Plants need energy to grow.',
  full: 'Photosynthesis is how plants use sunlight to make their own food for growth and energy.',
};

const VOCABULARY = [
  {
    word: 'Photosynthesis',
    translations: {
      urdu: 'فوٹوسنتیسز',
      dari: 'فتوسنتز',
      persian: 'فتوسنتز',
      pashto: 'فوتوسنتیز',
      arabic: 'البناء الضوئي',
      spanish: 'Fotosíntesis',
      ukrainian: 'Фотосинтез',
      uzbek: 'Fotosintez',
    },
    definition: 'Process where plants make food from sunlight',
  },
  {
    word: 'Chloroplast',
    translations: {
      urdu: 'کلوروپلاسٹ',
      dari: 'کلروپلاست',
      persian: 'کلروپلاست',
      pashto: 'کلوروپلاست',
      arabic: 'البلاستيدة الخضراء',
      spanish: 'Cloroplasto',
      ukrainian: 'Хлоропласт',
      uzbek: 'Xloroplast',
    },
    definition: 'Part of plant cell that contains green pigment',
  },
  {
    word: 'Glucose',
    translations: {
      urdu: 'گلوکوز',
      dari: 'گلوکوز',
      persian: 'گلوکز',
      pashto: 'ګلوکوز',
      arabic: 'الجلوكوز',
      spanish: 'Glucosa',
      ukrainian: 'Глюкоза',
      uzbek: 'Glyukoza',
    },
    definition: 'Type of sugar that plants make',
  },
  {
    word: 'Thylakoid',
    translations: {
      urdu: 'تھیلاکوائڈ',
      dari: 'تیلاکوئید',
      persian: 'تیلاکوئید',
      pashto: 'تیلاکوئید',
      arabic: 'الثايلاكويد',
      spanish: 'Tilacoide',
      ukrainian: 'Тилакоїд',
      uzbek: 'Tilakoid',
    },
    definition: 'Membrane in chloroplast where light reactions happen',
  },
];

const CONVERSATION = {
  student: {
    urdu: 'میں فوٹوسنتیز کو سمجھ نہیں رہا ہوں',
    dari: 'من فتوسنتز را نمی فهمم',
    persian: 'من فتوسنتز را نمی فهمم',
    pashto: 'زه فوتوسنتیز نه پوهیږم',
    arabic: 'لا أفهم عملية البناء الضوئي',
    spanish: 'No entiendo la fotosíntesis',
    ukrainian: 'Я не розумію фотосинтез',
    uzbek: 'Men fotosintezni tushunmayapman',
  },
  english: "I don't understand photosynthesis",
  teacher: "Let me explain it differently. Think of it like cooking - plants use sunlight as their heat source, water and carbon dioxide as ingredients, and they make glucose (sugar) as their food. The chloroplasts are like tiny kitchens inside the plant cells!",
  teacherTranslation: {
    urdu: 'آئیے اسے مختلف طریقے سے سمجھتے ہیں۔',
    dari: 'بیایید آن را متفاوت توضیح دهیم.',
    persian: 'بیایید آن را متفاوت توضیح دهیم.',
    pashto: 'راځئ چې دا په بل ډول تشریح کړو.',
    arabic: 'دعني أشرحها بطريقة مختلفة.',
    spanish: 'Déjame explicarlo de manera diferente.',
    ukrainian: 'Дозвольте пояснити по-іншому.',
    uzbek: 'Keling, boshqacha tushuntirib beray.',
  },
};

export const InteractiveDemo = () => {
  const [selectedText, setSelectedText] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('urdu');
  const [activeTab, setActiveTab] = useState('translate');
  const [readingSpeed, setReadingSpeed] = useState([1.0]);
  const [verbosity, setVerbosity] = useState<'minimal' | 'balanced' | 'full'>('balanced');
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [helpStep, setHelpStep] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  const article = {
    title: 'Understanding Photosynthesis',
    content: `Photosynthesis is the process by which plants convert sunlight into chemical energy. During photosynthesis, plants use sunlight, water, and carbon dioxide to create glucose (a type of sugar) and oxygen. This process takes place primarily in the chloroplasts of plant cells, specifically in structures called thylakoids. The green pigment chlorophyll captures the light energy, which is then used to power the chemical reactions. Photosynthesis is essential for life on Earth because it produces the oxygen we breathe and forms the base of most food chains.`,
  };

  const quickExamples = [
    { label: 'Science: Photosynthesis', text: 'Photosynthesis is the process by which plants convert sunlight into chemical energy.' },
    { label: 'Biology: Chloroplasts', text: 'This process takes place primarily in the chloroplasts of plant cells, specifically in structures called thylakoids.' },
    { label: 'Environmental: Oxygen Production', text: 'Photosynthesis is essential for life on Earth because it produces the oxygen we breathe.' },
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 0) {
      setSelectedText(text);
      setShowToolbar(true);
    }
  };

  const handleQuickExample = (text: string) => {
    setSelectedText(text);
    setShowToolbar(true);
    setActiveTab('translate');
  };

  const simulateAudio = (id: string) => {
    setPlayingAudio(id);
    setAudioProgress(0);

    const interval = setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPlayingAudio(null);
            setAudioProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(TRANSLATIONS[selectedLanguage as keyof typeof TRANSLATIONS]);
    setCopied(true);
    toast.success('Translation copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const helpSteps = [
    { title: 'Select Text', description: 'Highlight any text in the article or click a Quick Example button' },
    { title: 'Choose Language', description: 'Select your preferred language from the dropdown' },
    { title: 'View Translation', description: 'See the translation and play audio with natural pronunciation' },
    { title: 'Simplify Text', description: 'Make complex text easier to understand with three verbosity levels' },
    { title: 'Learn Vocabulary', description: 'Explore key academic terms with definitions and translations' },
    { title: 'Talk to Teacher', description: 'See two-way translation for student-teacher communication' },
  ];

  return (
    <section id="demo" className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try It <span className="gradient-text">Yourself</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Experience LanguageBridge in action. Select text, choose your language, and see instant translation with audio support.
          </p>
          <Button onClick={() => setShowHelp(true)} variant="outline" className="gap-2">
            <HelpCircle className="w-4 h-4" />
            Show Tutorial
          </Button>
        </div>

        {/* Article Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-xl border-2 border-primary/10">
            <CardContent className="p-8">
              <div
                ref={articleRef}
                onMouseUp={handleTextSelection}
                className="prose prose-lg max-w-none"
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">{article.title}</h3>
                <p className="text-foreground/90 leading-relaxed select-text">{article.content}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Examples */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <span className="text-sm text-muted-foreground self-center font-medium">Quick Examples:</span>
            {quickExamples.map((example, idx) => (
              <Button
                key={idx}
                onClick={() => handleQuickExample(example.text)}
                variant="outline"
                size="sm"
                className="hover-scale"
              >
                {example.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        {showToolbar && (
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
            <Card className="shadow-2xl border-2 border-primary">
              <div className="bg-gradient-to-r from-primary to-secondary p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img src={languageBridgeIcon} alt="LanguageBridge" className="w-6 h-6" />
                    <span className="font-bold text-white">LanguageBridge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-40 bg-white/20 text-white border-white/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(LANGUAGES).map(([key, lang]) => (
                          <SelectItem key={key} value={key}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={() => setShowSettings(true)}
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setShowToolbar(false)}
                      size="sm"
                      variant="ghost"
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-white/90 text-sm bg-white/10 rounded p-2 mb-2">
                  <strong>Selected:</strong> {selectedText.substring(0, 80)}
                  {selectedText.length > 80 && '...'}
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="translate" className="gap-2">
                    <Languages className="w-4 h-4" />
                    <span className="hidden sm:inline">Translate</span>
                  </TabsTrigger>
                  <TabsTrigger value="simplify" className="gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Simplify</span>
                  </TabsTrigger>
                  <TabsTrigger value="vocabulary" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Vocabulary</span>
                  </TabsTrigger>
                  <TabsTrigger value="talk" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Talk</span>
                  </TabsTrigger>
                </TabsList>

                {/* Translation Tab */}
                <TabsContent value="translate" className="space-y-4">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <div className="text-2xl mb-4 font-medium" dir="rtl">
                      {TRANSLATIONS[selectedLanguage as keyof typeof TRANSLATIONS]}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Button
                        onClick={() => simulateAudio('translation')}
                        disabled={playingAudio === 'translation'}
                        className="gap-2"
                      >
                        <Volume2 className="w-4 h-4" />
                        {playingAudio === 'translation' ? 'Playing...' : audioProgress === 100 ? '✓ Finished' : 'Play Audio'}
                      </Button>
                      <Button onClick={handleCopy} variant="outline" className="gap-2">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    {playingAudio === 'translation' && (
                      <Progress value={audioProgress} className="mb-2" />
                    )}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">Speed:</span>
                      <Slider
                        value={readingSpeed}
                        onValueChange={setReadingSpeed}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        className="w-32"
                      />
                      <span className="text-sm font-medium">{readingSpeed[0].toFixed(1)}x</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Simplified Tab */}
                <TabsContent value="simplify" className="space-y-4">
                  <div className="bg-muted/50 p-3 rounded text-sm text-muted-foreground">
                    <strong>Original:</strong> {selectedText}
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Verbosity Level:</span>
                      <div className="flex gap-2">
                        {(['minimal', 'balanced', 'full'] as const).map((level) => (
                          <Button
                            key={level}
                            onClick={() => setVerbosity(level)}
                            variant={verbosity === level ? 'default' : 'outline'}
                            size="sm"
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg mb-3">
                      {SIMPLIFIED_LEVELS[verbosity]}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground">
                        📊 80% simplified
                      </span>
                      <span className="text-muted-foreground">
                        📖 Grade 3 readability
                      </span>
                    </div>
                  </div>
                </TabsContent>

                {/* Vocabulary Tab */}
                <TabsContent value="vocabulary">
                  <div className="grid md:grid-cols-2 gap-4">
                    {VOCABULARY.map((item, idx) => (
                      <Card key={idx} className="hover-lift">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-lg">{item.word}</h4>
                              <div className="text-xl mb-2" dir="rtl">
                                {item.translations[selectedLanguage as keyof typeof item.translations]}
                              </div>
                            </div>
                            <Button
                              onClick={() => simulateAudio(`vocab-${idx}`)}
                              size="sm"
                              variant="ghost"
                            >
                              <Volume2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {playingAudio === `vocab-${idx}` && (
                            <Progress value={audioProgress} className="mb-2" />
                          )}
                          <p className="text-sm text-muted-foreground">{item.definition}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Talk Tab */}
                <TabsContent value="talk" className="space-y-4">
                  <Card className="bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                            Student says:
                          </div>
                          <div className="text-lg mb-2" dir="rtl">
                            {CONVERSATION.student[selectedLanguage as keyof typeof CONVERSATION.student]}
                          </div>
                          <div className="text-sm text-muted-foreground italic">
                            "{CONVERSATION.english}"
                          </div>
                        </div>
                        <Button onClick={() => simulateAudio('student')} size="sm" variant="ghost">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {playingAudio === 'student' && <Progress value={audioProgress} />}
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 dark:bg-green-950/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                            Teacher responds:
                          </div>
                          <div className="text-lg mb-2">
                            {CONVERSATION.teacher}
                          </div>
                          <div className="text-sm text-muted-foreground italic" dir="rtl">
                            {CONVERSATION.teacherTranslation[selectedLanguage as keyof typeof CONVERSATION.teacherTranslation]}
                          </div>
                        </div>
                        <Button onClick={() => simulateAudio('teacher')} size="sm" variant="ghost">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {playingAudio === 'teacher' && <Progress value={audioProgress} />}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {/* Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Language Preference</label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(LANGUAGES).map(([key, lang]) => (
                      <SelectItem key={key} value={key}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Reading Speed: {readingSpeed[0].toFixed(1)}x</label>
                <Slider
                  value={readingSpeed}
                  onValueChange={setReadingSpeed}
                  min={0.5}
                  max={2.0}
                  step={0.1}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Verbosity Level</label>
                <div className="flex gap-2">
                  {(['minimal', 'balanced', 'full'] as const).map((level) => (
                    <Button
                      key={level}
                      onClick={() => setVerbosity(level)}
                      variant={verbosity === level ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={() => setShowSettings(false)} className="w-full">
                Save & Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Help Tutorial */}
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to Use LanguageBridge</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {helpStep + 1}
                  </div>
                  <h4 className="font-bold">{helpSteps[helpStep].title}</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-11">
                  {helpSteps[helpStep].description}
                </p>
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => setHelpStep(Math.max(0, helpStep - 1))}
                  disabled={helpStep === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                {helpStep < helpSteps.length - 1 ? (
                  <Button onClick={() => setHelpStep(Math.min(helpSteps.length - 1, helpStep + 1))}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={() => { setShowHelp(false); setHelpStep(0); }}>
                    Get Started
                  </Button>
                )}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Step {helpStep + 1} of {helpSteps.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* CTA */}
        <div className="text-center mt-12 fade-in-up delay-200">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                🎓 Ready to help your students learn?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join Northeast Ohio school districts already piloting LanguageBridge
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" className="gap-2">
                  Request Pilot Program
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/features">Learn More</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};