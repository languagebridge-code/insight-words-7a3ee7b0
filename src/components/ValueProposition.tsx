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

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
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
      </div>
    </section>
  );
};
