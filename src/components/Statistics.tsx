export const Statistics = () => {
  const stats = [
    {
      number: "5.5 Million",
      label: "English language learners in U.S. schools need support"
    },
    {
      number: "600,000+",
      label: "ELL students in the Midwest alone"
    },
    {
      number: "Coming Soon",
      label: "Student independence rates from pilot data"
    },
    {
      number: "Your School",
      label: "Could be part of the data that proves language accessibility works"
    }
  ];

  return (
    <section className="py-24 bg-lavender">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center fade-in-up delay-${index + 1}00`}
              >
                <div className="gradient-primary rounded-2xl p-8 shadow-xl">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-3">
                    {stat.number}
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
