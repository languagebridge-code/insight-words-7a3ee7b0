import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileCheck, Users, Database, AlertTriangle, CheckCircle2, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Compliance() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Legal Compliance & Data Privacy
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Help every student understand—even those who can't read yet
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Purpose-built for K-12 education with comprehensive federal compliance, zero data storage, and enterprise-grade security
            </p>
            <div className="flex gap-4 justify-center">
              <a href="mailto:privacy@languagebridge.app">
                <Button size="lg">
                  Contact Compliance Team
                </Button>
              </a>
              <Link to="/pilot">
                <Button size="lg" variant="outline">
                  Request Pilot
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FERPA Compliance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl">FERPA Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  LanguageBridge is designed from the ground up to comply with the Family Educational Rights and Privacy Act (FERPA), protecting student education records and personally identifiable information.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Zero Data Storage:</strong> No student text, translations, or browsing activity is stored on our servers or in any database. Text is processed in real-time and immediately discarded.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Student Identifiers:</strong> LanguageBridge does not collect, process, or store student names, email addresses, student IDs, IP addresses, or any other personally identifiable information.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Third-Party Data Sharing:</strong> Student data is never sold, shared, or transferred to third parties for marketing, advertising, or any other purpose.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>District Control:</strong> Schools maintain full control over deployment, access, and usage monitoring through standard Chromebook management tools.
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>For Compliance Officers:</strong> LanguageBridge operates as a client-side browser extension that processes text locally and transmits only anonymized text strings to Microsoft Azure Cognitive Services for translation. No education records as defined under FERPA 34 CFR § 99.3 are created, maintained, or transmitted.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COPPA Compliance */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl">COPPA Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  The Children's Online Privacy Protection Act (COPPA) requires operators of websites and online services to obtain verifiable parental consent before collecting personal information from children under 13. LanguageBridge exceeds COPPA requirements by collecting NO personal information from students of any age.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Personal Information Collection:</strong> LanguageBridge does not collect names, addresses, email addresses, phone numbers, social security numbers, or any other personal identifiers from students.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Persistent Identifiers:</strong> We do not use cookies, device IDs, IP addresses, or other persistent identifiers to track students across websites or over time.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Behavioral Advertising:</strong> Student usage data is never used for targeted advertising or marketing purposes.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>School-Authorized Use:</strong> LanguageBridge operates under school authorization for educational purposes, with districts maintaining full control over student access.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Title VI & EEOA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileCheck className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl">Title VI & EEOA Compliance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Title VI of the Civil Rights Act of 1964</h3>
                  <p className="mb-4">
                    School districts receiving federal funding must provide meaningful access to educational programs for English Language Learners. The Department of Justice and Department of Education require that language assistance be:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Educationally sound:</strong> Based on research and best practices for language acquisition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Effectively implemented:</strong> Adequately resourced with qualified staff and proper tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span><strong>Producing results:</strong> Demonstrably helping students overcome language barriers</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <p className="font-semibold mb-2">How LanguageBridge Supports Title VI Compliance:</p>
                    <ul className="space-y-2 text-sm">
                      <li>✓ Provides immediate, meaningful access to grade-level content for preliterate students</li>
                      <li>✓ Includes audio support specifically designed for Students with Limited or Interrupted Formal Education (SLIFE)</li>
                      <li>✓ Offers text simplification, teacher communication, and academic vocabulary tools beyond basic translation</li>
                      <li>✓ Generates usage reports that document language access provision for compliance reviews</li>
                      <li>✓ Reduces reliance on student interpreters, protecting student privacy and dignity</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Equal Educational Opportunities Act (EEOA)</h3>
                  <p className="mb-4">
                    The EEOA requires states and school districts to "take appropriate action to overcome language barriers that impede equal participation by its students in its instructional programs."
                  </p>
                  
                  <p className="mb-4">
                    LanguageBridge directly addresses EEOA requirements by ensuring preliterate SLIFE students can access the same instructional content as their English-proficient peers—from day one, not months or years later.
                  </p>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>For District Legal Counsel:</strong> Courts have consistently held that providing language assistance requires more than translation services alone. Districts must ensure ELL students receive comprehensible instruction and can participate meaningfully in educational programs. LanguageBridge's integrated platform—combining translation, audio, simplification, and communication tools—provides the comprehensive language support courts have deemed necessary for EEOA compliance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Privacy & Security */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl">Data Privacy & Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What Data Is NOT Collected</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-destructive">✗ Student Names</h4>
                      <p className="text-sm text-muted-foreground">No collection or storage</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-destructive">✗ Email Addresses</h4>
                      <p className="text-sm text-muted-foreground">No collection or storage</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-destructive">✗ Student IDs</h4>
                      <p className="text-sm text-muted-foreground">No collection or storage</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-destructive">✗ IP Addresses</h4>
                      <p className="text-sm text-muted-foreground">No collection or storage</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-destructive">✗ Browsing History</h4>
                      <p className="text-sm text-muted-foreground">No tracking or logging</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg border border-border">
                      <h4 className="font-semibold mb-2 text-destructive">✗ Translated Text</h4>
                      <p className="text-sm text-muted-foreground">Processed in real-time, never stored</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Azure Cognitive Services Security</h3>
                  <p className="mb-4">
                    LanguageBridge uses Microsoft Azure Cognitive Services for translation processing, benefiting from enterprise-grade security and compliance certifications:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>SOC 2 Type II Certified</strong>
                        <p className="text-sm text-muted-foreground">Independently audited security controls</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>ISO 27001 Certified</strong>
                        <p className="text-sm text-muted-foreground">International information security standard</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>HIPAA Compliant</strong>
                        <p className="text-sm text-muted-foreground">Healthcare-grade data protection</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <strong>99.9% Uptime SLA</strong>
                        <p className="text-sm text-muted-foreground">Enterprise reliability guarantee</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Data Processing:</strong> Text selected for translation is transmitted over encrypted HTTPS connections to Azure Cognitive Services, processed in real-time, and immediately discarded. Microsoft does not use this data for AI training or any other purpose. Azure operates under a Data Processing Agreement that meets GDPR and other international privacy standards.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Processing Architecture</h3>
                  <p className="mb-4">
                    Unlike cloud-based educational platforms that store student work and track activity over time, LanguageBridge uses a stateless, real-time processing model:
                  </p>
                  
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">1.</span>
                      <span>Student highlights text on any webpage</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">2.</span>
                      <span>Browser extension sends anonymous text string to Azure Cognitive Services</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">3.</span>
                      <span>Translation is returned immediately to the student's browser</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">4.</span>
                      <span>Original text and translation are immediately discarded—nothing is cached or stored</span>
                    </li>
                  </ol>
                  
                  <p className="mt-4 text-sm text-muted-foreground">
                    This architecture ensures that even in the unlikely event of a data breach, there would be no student information to compromise.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* District Control & Reporting */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-8 h-8 text-primary" />
                  <CardTitle className="text-3xl">District Control & Reporting</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  Districts maintain complete control over LanguageBridge deployment, access, and monitoring through existing Chromebook management infrastructure.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Centralized Deployment:</strong> IT administrators deploy LanguageBridge via Google Admin Console to specific users, organizational units, or the entire district with granular control.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Usage Analytics:</strong> Monthly reports show aggregated translation requests by language and building—NO individual student tracking or identification.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Compliance Documentation:</strong> Reports provide documentation for Title III coordinators demonstrating language access provision for federal compliance reviews.
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <strong>Revocation Control:</strong> Districts can disable LanguageBridge access instantly through Google Admin Console if needed.
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>Monthly Reports Include:</strong> Total translation requests by language, text simplification usage, teacher-student communication volume, and academic glossary access—all aggregated at the building or district level with zero individual student identification.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Google Translate Isn't Compliant */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-destructive/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  <CardTitle className="text-3xl">Why Google Translate Isn't FERPA Compliant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  Google Translate is a powerful consumer tool, but it was not designed for K-12 education and presents several compliance challenges for school districts:
                </p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-background rounded-lg border border-destructive/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-destructive">⚠</span> No Education-Specific Data Protection Agreement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Google Translate's standard Terms of Service do not include FERPA-specific protections for student data. The service may use submitted text for quality improvement and AI training without explicit educational data safeguards.
                    </p>
                  </div>

                  <div className="p-4 bg-background rounded-lg border border-destructive/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-destructive">⚠</span> Translation History and Data Retention
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Google Translate stores translation history for users who are logged in. For students using school Google accounts, this creates education records that must be managed under FERPA—but districts lack control over this data storage.
                    </p>
                  </div>

                  <div className="p-4 bg-background rounded-lg border border-destructive/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-destructive">⚠</span> Inadequate for Preliterate Students
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Google Translate provides text-only translation requiring students to read in both languages. Preliterate SLIFE students who cannot read in ANY language receive zero educational benefit—failing the "meaningful access" standard under Title VI and EEOA.
                    </p>
                  </div>

                  <div className="p-4 bg-background rounded-lg border border-destructive/30">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-destructive">⚠</span> No Educational Features or Compliance Documentation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Google Translate lacks text simplification, academic glossaries, teacher communication tools, and usage reporting—making it difficult for districts to document they're providing adequate language assistance as required by federal law.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="font-semibold mb-2">LanguageBridge Was Built for Education:</p>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Zero data storage—no translation history, no student information retained</li>
                    <li>✓ FERPA/COPPA compliant by design with education-specific protections</li>
                    <li>✓ Audio support for preliterate students who cannot read in any language</li>
                    <li>✓ Comprehensive tools beyond translation (simplification, communication, glossaries)</li>
                    <li>✓ Usage reporting for Title III compliance documentation</li>
                    <li>✓ District control through existing Chromebook management infrastructure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Questions About Compliance?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our privacy and compliance team is here to answer questions from district legal counsel, compliance officers, and IT security teams.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="mailto:privacy@languagebridge.app">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  <Mail className="w-4 h-4 mr-2" />
                  privacy@languagebridge.app
                </Button>
              </a>
              <a href="mailto:support@languagebridge.app">
                <Button size="lg" variant="outline">
                  support@languagebridge.app
                </Button>
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Additional compliance documentation, Data Processing Agreements, and security questionnaires available upon request
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
