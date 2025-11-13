export const HomeCrisisSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              8.2M ELL Students. 1M Preliterate. <span className="gradient-text">Zero Adequate Solutions</span> Until Now.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Title VI Violations */}
            <div className="bg-card rounded-xl p-8 border-2 border-destructive/30 hover-scale">
              <div className="text-5xl mb-4">🚨</div>
              <h3 className="text-2xl font-bold mb-4">Title VI Violations</h3>
              <p className="text-muted-foreground mb-3">
                Federal investigations cost $50K+ in legal fees alone. Schools must provide meaningful language access or face consequences.
              </p>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm italic">
                  "We were cited by OCR. We needed a solution fast."
                </p>
                <p className="text-xs text-muted-foreground mt-1">- Superintendent</p>
              </div>
            </div>

            {/* Interpreter Costs */}
            <div className="bg-card rounded-xl p-8 border-2 border-accent/30 hover-scale">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4">Interpreter Costs Exploding</h3>
              <p className="text-muted-foreground mb-3">
                Districts spend $80K+ yearly on interpreters who still can't be there during instruction. Real-time support is impossible.
              </p>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm italic">
                  "Interpreters cost us $80K/year and they're never there when students need them."
                </p>
                <p className="text-xs text-muted-foreground mt-1">- ESL Coordinator</p>
              </div>
            </div>

            {/* Achievement Gap */}
            <div className="bg-card rounded-xl p-8 border-2 border-primary/30 hover-scale">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-4">Achievement Gap Widening</h3>
              <p className="text-muted-foreground mb-3">
                ELL students fall 2-3 grade levels behind, not because they can't learn, but because they can't access the content.
              </p>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm italic">
                  "It's not that they can't learn. They just can't access the content."
                </p>
                <p className="text-xs text-muted-foreground mt-1">- Principal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
