import { CheckCircle, Mail, BarChart, Sparkles } from "lucide-react";

export const ImplementationSupport = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              What's <span className="gradient-text">Included</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Implementation support for successful rollout
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-peach p-3 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-burnt-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Professional Development</h3>
                  <p className="text-muted-foreground text-sm">
                    3-hour teacher training session covering best practices for using LanguageBridge effectively in the classroom. Virtual or in-person options available.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-peach p-3 rounded-lg flex-shrink-0">
                  <Mail className="w-6 h-6 text-burnt-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Dedicated Email Support</h3>
                  <p className="text-muted-foreground text-sm">
                    24-hour response time for technical questions, troubleshooting, and implementation guidance. Direct access to our support team.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-peach p-3 rounded-lg flex-shrink-0">
                  <BarChart className="w-6 h-6 text-burnt-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Monthly Usage Reports</h3>
                  <p className="text-muted-foreground text-sm">
                    Detailed analytics for Title III compliance documentation. Track student engagement, translation requests, and program effectiveness.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-peach p-3 rounded-lg flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-burnt-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Free Product Updates</h3>
                  <p className="text-muted-foreground text-sm">
                    Automatic updates with new features, language support, and improvements. No additional cost, no manual updates required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-3 text-foreground">Implementation Timeline</h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
                <div className="bg-card px-6 py-3 rounded-lg border border-border">
                  <strong className="text-primary">Week 1:</strong> IT Setup (30 min)
                </div>
                <span className="text-muted-foreground hidden md:inline">→</span>
                <div className="bg-card px-6 py-3 rounded-lg border border-border">
                  <strong className="text-primary">Week 2:</strong> Teacher Training (3 hours)
                </div>
                <span className="text-muted-foreground hidden md:inline">→</span>
                <div className="bg-card px-6 py-3 rounded-lg border border-border">
                  <strong className="text-primary">Week 3:</strong> Students Start Using
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Currently piloting with Northeast Ohio school districts
            </p>
            <a href="mailto:support@languagebridge.app" className="text-primary font-semibold hover:underline">
              Questions about implementation? Contact support@languagebridge.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
