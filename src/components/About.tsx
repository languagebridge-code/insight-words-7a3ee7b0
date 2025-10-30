import { Heart, Lightbulb, Users } from "lucide-react";

export const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About <span className="gradient-text">LanguageBridge</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-center mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              LanguageBridge is an assistive technology platform that empowers preliterate and emerging English language learners to independently navigate digital learning environments. Unlike standard translation tools, LanguageBridge functions as a bilingual screen reader and real-time interpreter, bridging both comprehension and communication barriers.
            </p>
            <p className="text-xl text-foreground font-semibold mb-8">
              We're not just a translation tool - we're an accessibility revolution for language. <span className="gradient-text">Starting in Ohio and expanding nationwide</span>, we're committed to ensuring every student has an independent voice in the classroom.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-peach mb-4">
                <Heart className="w-8 h-8 text-burnt-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Empowerment</h3>
              <p className="text-muted-foreground">Every student deserves independence</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender mb-4">
                <Lightbulb className="w-8 h-8 text-deep-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Innovation</h3>
              <p className="text-muted-foreground">Pioneering language accessibility</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-peach mb-4">
                <Users className="w-8 h-8 text-burnt-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Partnership</h3>
              <p className="text-muted-foreground">Growing together with educators</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
