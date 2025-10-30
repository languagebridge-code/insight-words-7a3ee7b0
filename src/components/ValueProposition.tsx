import { Globe, Volume2, Target } from "lucide-react";

export const ValueProposition = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Real-time Translation",
      description: "Support for 4+ languages: Dari, Pashto, Arabic, Spanish - with more coming soon"
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
    <section className="py-24 bg-secondary">
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

        {/* Google Translate Privacy Alert */}
        <div className="max-w-4xl mx-auto mt-16 fade-in-up delay-400">
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  Why Schools Can't Rely on Google Translate
                </h3>
                <p className="text-muted-foreground mb-4">
                  Even with Google Workspace for Education, Google Translate (the consumer service) is NOT FERPA compliant.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="font-bold text-lg mb-3 text-destructive">❌ Google Translate Risks:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>Student data may be stored and used to train AI models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>No data processing agreements protect student information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>Schools risk Title VI compliance violations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive mt-1">✗</span>
                    <span>IT departments cannot control or monitor usage</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3 text-primary">✓ LanguageBridge is Different:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Full FERPA & COPPA compliance built-in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Student data processed securely, never stored</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>District-level controls and monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Purpose-built for educational environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Authentic translations, not robotic word-for-word</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <a 
                href="#trust" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Learn More About Compliance
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
