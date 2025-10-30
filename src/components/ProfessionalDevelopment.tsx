import { GraduationCap, Users, Video, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProfessionalDevelopment = () => {
  const offerings = [
    {
      icon: Video,
      title: "Live Training Webinars",
      description: "Interactive sessions covering implementation strategies, best practices, and advanced features.",
    },
    {
      icon: BookOpen,
      title: "Resource Library",
      description: "Access video tutorials, lesson plans, and case studies from successful implementations.",
    },
    {
      icon: Users,
      title: "Educator Community",
      description: "Connect with other teachers using LanguageBridge to share strategies and insights.",
    },
    {
      icon: GraduationCap,
      title: "Certification Program",
      description: "Earn LanguageBridge certification and become a champion for language accessibility in your school.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Professional <span className="gradient-text">Development</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive training and support to help your teachers maximize LanguageBridge's impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-lg hover-scale fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 mx-auto">
                <offering.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{offering.title}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                {offering.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-xl fade-in-up delay-400">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Enhanced Support for Ohio Pilot Schools</h3>
            <p className="text-lg text-muted-foreground">
              Pilot participants receive premium professional development including:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">On-Site Kickoff Session</h4>
                <p className="text-muted-foreground text-sm">
                  We come to your school to launch the program with your entire staff
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Monthly Coaching Calls</h4>
                <p className="text-muted-foreground text-sm">
                  Regular check-ins with our education specialists to optimize implementation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Priority Support Channel</h4>
                <p className="text-muted-foreground text-sm">
                  Direct access to our team for quick answers and personalized guidance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Quarterly Impact Reports</h4>
                <p className="text-muted-foreground text-sm">
                  Data-driven insights showing student engagement and language growth
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="gradient-primary text-white hover:opacity-90">
              Learn More About Training
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
