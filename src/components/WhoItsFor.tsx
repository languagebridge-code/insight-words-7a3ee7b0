import { Users, GraduationCap, School, Award } from "lucide-react";

export const WhoItsFor = () => {
  const audiences = [
    {
      icon: Users,
      title: "Preliterate English Language Learners",
      description: "Students who need support building literacy while learning English"
    },
    {
      icon: School,
      title: "Refugee & Newcomer Students",
      description: "Ages 8-18 transitioning into U.S. education systems"
    },
    {
      icon: GraduationCap,
      title: "ESL Teachers",
      description: "Educators seeking powerful assistive technology tools"
    },
    {
      icon: Award,
      title: "Forward-Thinking Districts",
      description: "Ohio schools leading the nation in educational equity and Title VI compliance"
    }
  ];

  return (
    <section className="py-24 bg-lavender">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Who It's For
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering students, supporting teachers, transforming schools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {audiences.map((audience, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-xl shadow-lg hover-scale fade-in-up delay-${index + 1}00`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender mb-6">
                <audience.icon className="w-8 h-8 text-deep-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{audience.title}</h3>
              <p className="text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
