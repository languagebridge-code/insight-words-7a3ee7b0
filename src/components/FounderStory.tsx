import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const FounderStory = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why We Built <span className="gradient-text">LanguageBridge</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              A Message from Our Founder
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg">
            <blockquote className="text-lg md:text-xl leading-relaxed mb-6">
              "I've spent years in Ohio classrooms watching SLIFE students (Students with Limited or Interrupted Formal Education) sit in silence, unable to access education. Not because they can't learn. Because EdTech has failed them."
            </blockquote>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              During my Masters in Educational Technology, I studied dozens of language tools. They all focused on teaching English. But that's not the problem. While students spend 5-7 years learning English, they're missing everything else: math, science, history, literature.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              EdTech has been consumer-focused. Pretty apps. Gamification. Venture capital chasing viral growth. But preliterate refugee students don't need fun. They need access. They need equity. They need tools that work when you can't read yet.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              <strong>LanguageBridge was built for SLIFE students first.</strong> We're disrupting EdTech by solving the problem everyone ignored. By putting compliance first. By adapting to what students are actually doing in classrooms. Getting them involved with content knowledge from day one.
            </p>

            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
            >
              Read the Full Story <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
