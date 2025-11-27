import { Monitor, Globe, Shield, Zap } from "lucide-react";

export const TechnicalSpecs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Technical Specifications</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              For your IT department
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-lavender p-3 rounded-lg">
                  <Monitor className="w-6 h-6 text-deep-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-foreground">System Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Chrome 90+ or any Chromebook</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Internet connection (standard school bandwidth)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Supports translation, text simplification, two-way communication, and academic glossaries, all in one extension</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-lavender p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-deep-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Network Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>HTTPS access to Azure Cognitive Services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>No firewall configuration needed (standard SSL)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Works on school networks with content filters</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-lavender p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-deep-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Installation</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Mass deployment via Google Admin Console</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>30-minute setup for entire district</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Automatic updates, no manual maintenance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-lavender p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-deep-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-foreground">Data & Security</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>No student data stored on servers or in cloud</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Powered by Azure Cognitive Services for enterprise-grade reliability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>99.9% uptime guarantee for uninterrupted student access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Real-time processing with translations never stored or cached</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>FERPA & COPPA compliant by design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Zero data mining or AI training on student content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-secondary/30 rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-2">
              Need technical documentation or have implementation questions?
            </p>
            <a href="mailto:support@languagebridge.app" className="text-primary font-semibold hover:underline">
              Contact Technical Support →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
