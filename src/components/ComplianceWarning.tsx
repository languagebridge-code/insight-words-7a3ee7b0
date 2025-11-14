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
            <p className="text-lg font-semibold text-foreground">
              LanguageBridge is the ONLY Chrome extension built specifically for K-12 compliance requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};