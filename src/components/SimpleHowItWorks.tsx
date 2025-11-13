export const SimpleHowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Install Extension",
      description: "One-click Chrome installation. Works on any Chromebook, laptop, or desktop."
    },
    {
      number: "2",
      title: "Highlight Text",
      description: "Students highlight any text on any website. Google Classroom, Khan Academy, anywhere."
    },
    {
      number: "3",
      title: "Hear & Learn",
      description: "LanguageBridge reads the text in their language. Students access content from day one."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Three steps. Zero complexity.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-8 text-center hover-scale"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-card rounded-xl p-6 max-w-2xl">
            <p className="text-lg font-semibold mb-2">
              Adapts to What Students Are Actually Doing
            </p>
            <p className="text-muted-foreground">
              No special curriculum. No separate materials. Students engage with the same content as their peers, getting support exactly when and where they need it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
