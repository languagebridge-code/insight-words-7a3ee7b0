export const ComplianceWarning = () => {
  return (
    <section id="compliance" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">
            Why Schools Are Moving Beyond Google Translate
          </h2>
          <div className="bg-card rounded-xl p-8 shadow-lg mb-6">
            <p className="text-lg text-muted-foreground mb-6">
              Google Translate wasn't designed for K-12 education, and districts are discovering critical gaps:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-bold text-foreground mb-2">Limited Compliance Documentation</h3>
                <p className="text-sm text-muted-foreground">No data protection agreements for schools. Student data may be used for AI training without FERPA safeguards.</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-bold text-foreground mb-2">Inadequate Language Access</h3>
                <p className="text-sm text-muted-foreground">Literal translations don't provide meaningful access. Preliterate students who can't read in any language get zero benefit.</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-bold text-foreground mb-2">No Educational Features</h3>
                <p className="text-sm text-muted-foreground">Missing text simplification, academic glossaries, and teacher communication tools that students actually need to learn.</p>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-bold text-foreground mb-2">Ongoing Liability Questions</h3>
                <p className="text-sm text-muted-foreground">Districts face questions about whether translation-only tools provide adequate language access under Title VI and EEOA requirements.</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-muted-foreground">
                <strong className="text-foreground">LanguageBridge is different:</strong> Purpose-built for education with FERPA/COPPA compliance, zero data storage, and four integrated tools designed specifically for preliterate SLIFE students who need to hear—not just read—content.
              </p>
              <a href="/compliance" className="text-primary hover:underline font-semibold mt-3 inline-block">
                Learn more about legal compliance requirements →
              </a>
            </div>
          </div>
          <div className="bg-primary/10 rounded-xl p-8 border-2 border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">What Makes LanguageBridge Different</h3>
            <p className="text-lg text-muted-foreground mb-6 text-center">
              LanguageBridge is a complete language accessibility platform designed specifically for preliterate SLIFE students—not a general translation tool adapted for education.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="p-3 font-bold text-foreground">Feature</th>
                    <th className="p-3 font-bold text-foreground text-center">LanguageBridge</th>
                    <th className="p-3 font-bold text-foreground text-center">Google Translate</th>
                    <th className="p-3 font-bold text-foreground text-center">Read&Write</th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Real-time Translation</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-muted-foreground">Limited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Audio for Preliterate Students</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-destructive">✗ (Requires Reading)</td>
                    <td className="p-3 text-center text-destructive">✗ (Requires Reading)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Text Simplification</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Teacher-Student Communication</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Academic Vocabulary Glossary</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">Works in Google Classroom</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-muted-foreground">Limited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-muted-foreground">FERPA Compliant</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                    <td className="p-3 text-center text-primary">✓</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-muted-foreground">Zero Data Storage</td>
                    <td className="p-3 text-center text-primary">✓</td>
                    <td className="p-3 text-center text-destructive">✗</td>
                    <td className="p-3 text-center text-primary">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-bold text-foreground mb-3">Different Tools for Different Students:</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Read&Write is excellent for students who can already read—it helps literate multilingual learners succeed in English. LanguageBridge is specifically designed for preliterate students who need to HEAR content in their language to access it.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Many districts use BOTH:</strong> Read&Write for their general multilingual population + LanguageBridge for their most vulnerable preliterate SLIFE students who cannot yet read in any language.
              </p>
              <a href="/compliance" className="text-primary hover:underline font-semibold text-sm mt-3 inline-block">
                View detailed compliance information →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};