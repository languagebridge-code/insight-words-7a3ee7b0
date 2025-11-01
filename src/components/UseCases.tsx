import { AlertCircle, CheckCircle } from "lucide-react";

export const UseCases = () => {
  const cases = [
    {
      name: "Amira",
      problem: "A bright 4th grader who teachers say 'doesn't do any work' because she cannot read English yet. She shuts down in class, unable to access grade-level content. Teachers flag her for special education services, when what she really needs is language support.",
      solution: "With LanguageBridge, Amira gains the confidence to ask questions directly in her own language and relay them to the teacher. She can read along with the class, accessing the same content as her peers and demonstrating her true academic abilities.",
      impact: "No more misdiagnosis. No more isolation. Just access."
    },
    {
      name: "Carlos",
      problem: "Due to his lack of understanding, Carlos misbehaves in class and gets referred to the principal. During the meeting, he can't fully grasp the issue because he doesn't know enough English, and the administrator doesn't speak his native language. Google Translate fails because Carlos cannot read his native language yet. They pull another student in to translate—violating Carlos's privacy.",
      solution: "With LanguageBridge, Carlos can hear the administrator's concerns in his own language and respond appropriately. The conversation stays private, professional, and effective—no student translators needed.",
      impact: "Dignity preserved. Privacy protected. Understanding achieved."
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Real Students. Real Challenges. Real Solutions.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how LanguageBridge transforms the classroom experience for English language learners
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cases.map((useCase, index) => (
            <div 
              key={index}
              className={`bg-card rounded-xl shadow-lg p-8 border border-border hover-scale fade-in-up delay-${index + 1}00`}
            >
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Meet {useCase.name}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">The Challenge</h4>
                  </div>
                  <p className="text-muted-foreground ml-8">
                    {useCase.problem}
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <h4 className="font-semibold text-foreground">The LanguageBridge Solution</h4>
                  </div>
                  <p className="text-muted-foreground ml-8">
                    {useCase.solution}
                  </p>
                </div>

                <div className="ml-8 pt-4 border-t border-border">
                  <p className="text-sm font-semibold gradient-text">
                    {useCase.impact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
