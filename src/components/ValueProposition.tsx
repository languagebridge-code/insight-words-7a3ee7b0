import { Globe, Volume2, Target } from "lucide-react";

export const ValueProposition = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Real-time Translation",
      description: "Support for 8 languages including Dari, Pashto, Arabic, Spanish, Urdu, Uzbek, and Ukrainian - with more coming soon"
    },
    {
      icon: Volume2,
      title: "Text-to-Speech & Speech-to-Text",
      description: "Full audio support for students who need to hear or speak their translations"
    },
    {
      icon: Target,
      title: "Works Everywhere",
      description: "Seamlessly integrates with Google Classroom, Canvas, and all web content"
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Break Down Language Barriers <span className="gradient-text">Instantly</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`text-center fade-in-up delay-${index + 1}00`}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-lavender mb-6">
                <benefit.icon className="w-10 h-10 text-deep-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground text-lg">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Compliance Comparison */}
        <div className="max-w-4xl mx-auto mt-12 fade-in-up delay-400">
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Why Schools Can't Use Google Translate
            </h3>
            <p className="text-center text-muted-foreground mb-6">
              Google Translate is NOT FERPA compliant, even with Google Workspace for Education.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3 text-destructive">❌ Google Translate:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✗ Student data trains AI models</li>
                  <li>✗ No data protection agreements</li>
                  <li>✗ Title VI violations risk</li>
                  <li>✗ Robotic, confusing translations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-3 text-primary">✓ LanguageBridge:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ FERPA & COPPA compliant</li>
                  <li>✓ Data never stored</li>
                  <li>✓ District-level controls</li>
                  <li>✓ Authentic, conversational translations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
