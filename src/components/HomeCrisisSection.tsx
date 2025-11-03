export const HomeCrisisSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              8.2M ELL Students. 1M Preliterate. <span className="gradient-text">Zero Adequate Solutions</span>—Until Now.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Title VI Violations */}
            <div className="bg-card rounded-xl p-8 border-2 border-destructive/30 hover-scale">
              <div className="text-5xl mb-4">🚨</div>
              <h3 className="text-2xl font-bold mb-4">Title VI Violations</h3>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground italic">
                  "We were cited by OCR for inadequate language access. The investigation costs alone were $50K in legal fees. We needed a solution fast."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Superintendent, Urban District</p>
              </div>
              <p className="text-muted-foreground">
                Schools face federal investigations when they fail to provide meaningful language access to ELL families and students.
              </p>
            </div>

            {/* Interpreter Costs */}
            <div className="bg-card rounded-xl p-8 border-2 border-accent/30 hover-scale">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4">Interpreter Costs Exploding</h3>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground italic">
                  "We're spending $80K per year on part-time interpreters, and they're still not available when students need them most—during instruction."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— ESL Coordinator, Ohio District</p>
              </div>
              <p className="text-muted-foreground">
                Human interpreters are expensive, limited in availability, and can't provide real-time support during lessons.
              </p>
            </div>

            {/* Achievement Gap */}
            <div className="bg-card rounded-xl p-8 border-2 border-primary/30 hover-scale">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-4">Achievement Gap Widening</h3>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground italic">
                  "Our ELL students are 2-3 grade levels behind in reading. But it's not because they can't learn—it's because they can't access the content."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Principal, Title I School</p>
              </div>
              <p className="text-muted-foreground">
                Preliterate ELL students fall further behind each day they can't access grade-level instruction in their native language.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
