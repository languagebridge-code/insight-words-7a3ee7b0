export const ComplianceWarning = () => {
  return (
    <section id="compliance" className="py-16 bg-destructive/10 border-y-4 border-destructive">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Using Google Translate? You're At Risk.
          </h2>
          <div className="bg-card rounded-xl p-8 shadow-lg mb-6">
            <p className="text-lg text-muted-foreground mb-4">
              Google Translate is NOT FERPA compliant. Student data trains their AI. Schools using it face:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-destructive/10 p-4 rounded-lg">
                <h3 className="font-bold text-destructive mb-2">Federal Investigations</h3>
                <p className="text-sm text-muted-foreground">Title VI violations for inadequate language access</p>
              </div>
              <div className="bg-destructive/10 p-4 rounded-lg">
                <h3 className="font-bold text-destructive mb-2">Data Privacy Lawsuits</h3>
                <p className="text-sm text-muted-foreground">Student information exposed without consent</p>
              </div>
              <div className="bg-destructive/10 p-4 rounded-lg">
                <h3 className="font-bold text-destructive mb-2">OCR Complaints</h3>
                <p className="text-sm text-muted-foreground">Failure to provide meaningful language assistance</p>
              </div>
              <div className="bg-destructive/10 p-4 rounded-lg">
                <h3 className="font-bold text-destructive mb-2">Lost Funding</h3>
                <p className="text-sm text-muted-foreground">Non-compliance can jeopardize federal grants</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/10 rounded-xl p-6 border-2 border-primary">
            <h3 className="text-2xl font-bold text-foreground mb-4">What Makes LanguageBridge Different</h3>
            <p className="text-lg text-muted-foreground mb-4">
              LanguageBridge is designed specifically for preliterate SLIFE students - those who cannot yet read in any language, including their home language. This is a fundamentally different audience than general translation tools.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-foreground mb-2">Read&Write and other tools:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Designed for students who can read</li>
                  <li>• Support literate multilingual learners</li>
                  <li>• Assume basic literacy skills</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-2">LanguageBridge is for:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Students who cannot read in ANY language yet</li>
                  <li>• Preliterate newcomers and refugees</li>
                  <li>• Students with interrupted education (SLIFE)</li>
                  <li>• Languages like Dari, Pashto, Persian</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Many districts use BOTH:</strong> Read&Write for general multilingual population + LanguageBridge for their most vulnerable preliterate SLIFE students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};