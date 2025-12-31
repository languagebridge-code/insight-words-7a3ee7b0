import { Quote } from "lucide-react";

export const SuccessStories = () => {
  // Placeholder for future success stories
  const stories = [
    {
      quote: "LanguageBridge transformed how our ELL students engage with content. We saw immediate improvements in participation and confidence.",
      author: "Coming Soon",
      role: "ELL Coordinator",
      school: "Ohio Pilot School",
    },
    {
      quote: "For the first time, our preliterate students can access grade-level content independently. The impact has been remarkable.",
      author: "Coming Soon",
      role: "Elementary Principal",
      school: "Ohio Pilot School",
    },
    {
      quote: "Our teachers love the dashboard features. Being able to see what vocabulary students are translating helps us target our instruction.",
      author: "Coming Soon",
      role: "ESL Teacher",
      school: "Ohio Pilot School",
    },
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from educators using LanguageBridge to transform learning for ELL students
          </p>
          <p className="text-sm text-muted-foreground mt-4 italic">
            Stories from our Ohio Pilot schools coming in January 2026
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-card rounded-3xl p-8 shadow-lg relative fade-in-up opacity-60"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-12 h-12 text-primary/20 absolute top-6 right-6" />
              <div className="relative z-10">
                <p className="text-lg mb-6 leading-relaxed italic">
                  "{story.quote}"
                </p>
                <div className="border-t border-border pt-6">
                  <p className="font-bold text-muted-foreground">{story.author}</p>
                  <p className="text-sm text-muted-foreground">{story.role}</p>
                  <p className="text-sm text-muted-foreground">{story.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up delay-400">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">Want to be featured?</p>
            <p className="text-muted-foreground">
              Ohio Pilot schools will be among the first to share their success stories. Apply today to join this pioneering group.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
