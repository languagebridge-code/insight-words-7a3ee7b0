import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Shield, CheckCircle, Lock, FileText } from "lucide-react";

export default function Compliance() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Built for Education. <span className="gradient-text">Secured for Students.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete FERPA, COPPA, and Title VI compliance—because student safety isn't optional
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-8 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
            <Badge className="bg-primary text-white text-lg px-6 py-3">✓ FERPA Compliant</Badge>
            <Badge className="bg-primary text-white text-lg px-6 py-3">✓ COPPA Certified</Badge>
            <Badge className="bg-primary text-white text-lg px-6 py-3">✓ Title VI Aligned</Badge>
            <Badge className="bg-primary text-white text-lg px-6 py-3">✓ SOC 2 Ready</Badge>
          </div>
        </div>
      </section>

      {/* FERPA Compliance */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/10 p-4 rounded-xl">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">FERPA Compliance</h2>
                <p className="text-muted-foreground">Family Educational Rights and Privacy Act</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h3 className="text-xl font-bold mb-4">What FERPA Requires</h3>
              <p className="text-muted-foreground mb-6">
                FERPA protects the privacy of student education records. Schools must ensure that any technology used with students complies with strict data protection standards.
              </p>

              <div className="bg-secondary/30 rounded-xl p-6">
                <h4 className="font-bold mb-4">How LanguageBridge Complies:</h4>
                <div className="space-y-3">
                  {[
                    {
                      title: "Zero Data Collection",
                      description: "We don't collect, store, or transmit any student names, IDs, or personally identifiable information"
                    },
                    {
                      title: "No Persistent Storage",
                      description: "Translations happen in real-time and are not stored on our servers"
                    },
                    {
                      title: "School Control",
                      description: "Districts maintain complete control over deployment and can remove access at any time"
                    },
                    {
                      title: "Direct FERPA Agreement",
                      description: "We sign School Official agreements establishing LanguageBridge as an agent of the school"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <h4 className="font-bold mb-3">What Data We DON'T Collect:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  {[
                    "Student names",
                    "Student IDs or numbers",
                    "Email addresses",
                    "Grade levels"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-destructive">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2">
                  {[
                    "Academic records",
                    "Behavioral data",
                    "Location information",
                    "Browsing history"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-destructive">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" size="lg">
                <Download className="mr-2" />
                Download FERPA Compliance Documentation (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COPPA Compliance */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-accent/10 p-4 rounded-xl">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">COPPA Compliance</h2>
                <p className="text-muted-foreground">Children's Online Privacy Protection Act</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h3 className="text-xl font-bold mb-4">What COPPA Requires for Students Under 13</h3>
              <p className="text-muted-foreground mb-6">
                COPPA requires parental consent before collecting personal information from children under 13 and mandates specific data protection practices.
              </p>

              <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                <h4 className="font-bold mb-4">How LanguageBridge Complies:</h4>
                <div className="space-y-3">
                  {[
                    {
                      title: "School-Based Consent",
                      description: "We operate under the school's authority—schools act as parent agents for educational technology"
                    },
                    {
                      title: "Minimal Data Policy",
                      description: "We collect zero personal information, exceeding COPPA's minimum requirements"
                    },
                    {
                      title: "No Third-Party Sharing",
                      description: "Student translations are never shared with advertisers or third parties"
                    },
                    {
                      title: "Secure Transmission",
                      description: "All data transmitted is encrypted using industry-standard TLS protocols"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4">
                <h4 className="font-bold mb-2">Parental Consent Process</h4>
                <p className="text-sm text-muted-foreground">
                  Schools send home our parent notification letter explaining LanguageBridge. Parents can opt out at any time by contacting the school. We provide sample letter templates in all supported languages.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" size="lg">
                <Download className="mr-2" />
                Download COPPA Certification (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Title VI Compliance */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary/10 p-4 rounded-xl">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Title VI Compliance</h2>
                <p className="text-muted-foreground">Civil Rights Act - Language Access</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h3 className="text-xl font-bold mb-4">What Title VI Requires</h3>
              <p className="text-muted-foreground mb-6">
                Title VI of the Civil Rights Act requires schools to provide "meaningful access" to education for English language learners. This includes ensuring students can access instruction, materials, and communication in a language they understand.
              </p>

              <div className="bg-secondary/30 rounded-xl p-6 mb-6">
                <h4 className="font-bold mb-4">How LanguageBridge Helps Schools Meet Title VI:</h4>
                <div className="space-y-3">
                  {[
                    {
                      title: "Immediate Language Access",
                      description: "Students can access grade-level content in their native language instantly, no interpreter scheduling needed"
                    },
                    {
                      title: "Comprehensive Coverage",
                      description: "Works across all subjects, websites, and digital materials—not just translated worksheets"
                    },
                    {
                      title: "Documented Compliance",
                      description: "Usage reports show you're providing meaningful language access as required by OCR"
                    },
                    {
                      title: "Prevents Common Violations",
                      description: "Eliminates reliance on student translators and Google Translate—both cited in OCR investigations"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
                <h4 className="font-bold mb-3 text-destructive">Common Title VI Violations LanguageBridge Prevents:</h4>
                <ul className="space-y-2">
                  {[
                    "Using student translators for official communication",
                    "Relying solely on Google Translate for instruction",
                    "Denying ELL students access to grade-level content",
                    "Inadequate communication with non-English speaking parents"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-destructive mt-1">⚠️</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" size="lg">
                <Download className="mr-2" />
                Download Title VI Compliance Checklist (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Data Security & Architecture
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Data Encryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• All data transmitted via TLS 1.3</li>
                  <li>• End-to-end encryption for translations</li>
                  <li>• No plaintext storage of student data</li>
                  <li>• Encrypted communication with Azure APIs</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Data Retention
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Zero student data retention</li>
                  <li>• Translations processed in real-time</li>
                  <li>• No logging of student content</li>
                  <li>• Anonymous usage analytics only</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Security Audits
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Regular penetration testing</li>
                  <li>• Third-party security reviews</li>
                  <li>• Vulnerability scanning</li>
                  <li>• SOC 2 Type II in progress</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Access Control
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Role-based access controls</li>
                  <li>• Multi-factor authentication</li>
                  <li>• Audit logs for all admin actions</li>
                  <li>• District-level management tools</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/20 text-center">
              <p className="font-bold mb-2">Want a deep dive?</p>
              <p className="text-sm text-muted-foreground mb-4">Download our complete security whitepaper for IT directors</p>
              <Button variant="outline">
                <Download className="mr-2" />
                Download Security Whitepaper (PDF)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For IT Directors */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              For IT Directors
            </h2>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-6">Technical Architecture Overview</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">Deployment Model</h4>
                  <p className="text-sm text-muted-foreground">
                    Chrome extension deployed via Google Admin Console. No local servers, no VPN requirements, no additional infrastructure needed.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Network Requirements</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Standard HTTPS (port 443) to Azure cognitive services. Typical whitelist domains:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li>• *.cognitiveservices.azure.com</li>
                    <li>• *.microsoft.com</li>
                    <li>• Chrome Web Store APIs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Integration Points</h4>
                  <p className="text-sm text-muted-foreground">
                    Works with existing Google Workspace, no SSO integration required. Optional: Clever rostering for usage analytics.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Support & Maintenance</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic updates via Chrome Web Store. No manual patching required. Backward compatible with Chrome OS versions from 2020+.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <Button variant="outline" size="lg">
                  <Download className="mr-2" />
                  Download Technical Documentation (PDF)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About Compliance?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our team is happy to walk through any security or compliance concerns
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero">
                Schedule Security Review Call
              </Button>
              <Button size="lg" variant="outline">
                <Download className="mr-2" />
                Download All Compliance Docs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
