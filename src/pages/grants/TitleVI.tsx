import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/PageMeta";
import { Download, AlertCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TitleVI() {
  return (
    <div className="min-h-screen">
      <PageMeta title="Title VI Compliance & Funding" description="Address Title VI language access requirements with LanguageBridge. Compliance gap analysis, solution documentation, and ROI comparison." />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Title VI: <span className="gradient-text">Civil Rights Compliance</span> Funding
            </h1>
            <p className="text-2xl font-semibold mb-4">Remediate Language Access Violations</p>
            <p className="text-xl text-muted-foreground mb-8">
              If your district is facing Title VI complaints or OCR investigations for lack of language access, 
              LanguageBridge can be part of your compliance remediation plan and paid for with compliance funds.
            </p>
          </div>
        </div>
      </section>

      {/* What is Title VI */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What is Title VI?</h2>
            
            <Card className="border-2 border-destructive/20 mb-8">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                  <CardTitle className="text-2xl">Title VI Civil Rights Law</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Title VI of the Civil Rights Act prohibits discrimination based on national origin. For schools, 
                  this means you MUST provide meaningful access to education for students with limited English proficiency.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Common Title VI Violations in Schools:</h3>
                    <ul className="space-y-2">
                      {[
                        "No interpretation available during parent-teacher conferences",
                        "ELL students excluded from standardized testing",
                        "No translated materials sent home to parents",
                        "Students left out of classroom discussions due to language barriers",
                        "No language support during critical IEP meetings"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>The Cost of Non-Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• OCR investigations: $50K-$200K in legal/admin costs</li>
                    <li>• Mandatory corrective action plans</li>
                    <li>• Federal funding at risk</li>
                    <li>• Reputation damage</li>
                    <li>• Ongoing monitoring requirements</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-primary">The LanguageBridge Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Immediate 24/7 language access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Documented usage for compliance reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cost: $3,500 vs. $50K+ in violations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Demonstrates good-faith compliance effort</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Real Scenario */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Realistic Scenario: Before LanguageBridge
            </h2>
            
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Mid-sized Ohio District - 75 ELL Students</CardTitle>
                <CardDescription className="text-base">What administrators were facing:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold mb-3 text-destructive">The Problem:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>3 Dari-speaking students enrolled. No Dari interpreter available in the area. Students sat silent in class for weeks.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Parent filed OCR complaint: "My daughter cannot participate in her education. The school has done nothing."</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>District scrambled to hire remote interpreters at $45/hour. Still couldn't cover all class periods.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>OCR opened investigation. Lawyers retained. Compliance plan required. Total cost: $78,000 over 18 months.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-3 text-primary">With LanguageBridge:</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Students get instant Dari translation on day 1 of enrollment</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>24/7 access across all academic content</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Documented usage logs for compliance documentation</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Total cost: $3,500/year vs. $78,000 in violation remediation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Use Title VI Funds */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How to Use Compliance Funds for LanguageBridge
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Document the gap in language access",
                  description: "Identify students currently without adequate language support. Document complaints, parent concerns, or OCR inquiries.",
                  duration: "1-2 hours"
                },
                {
                  step: "2",
                  title: "Position LanguageBridge as remediation solution",
                  description: "Show how LanguageBridge directly addresses the compliance gaps. Use our compliance documentation template.",
                  duration: "2-3 hours"
                },
                {
                  step: "3",
                  title: "Include in corrective action plan (if applicable)",
                  description: "If you're under OCR investigation, add LanguageBridge to your remediation plan as proof of good-faith compliance effort.",
                  duration: "1 week"
                },
                {
                  step: "4",
                  title: "Use compliance/legal budget line",
                  description: "Most districts have discretionary funds for compliance remediation. Work with your superintendent to allocate these funds.",
                  duration: "2-4 weeks"
                },
                {
                  step: "5",
                  title: "Deploy and document usage",
                  description: "Once deployed, LanguageBridge provides usage analytics showing language access is being provided 24/7.",
                  duration: "2 days"
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 bg-card rounded-xl p-6 border border-border">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <p className="text-sm text-primary font-semibold">Timeline: {item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Download Title VI Compliance Templates
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Title VI Compliance Checklist",
                  format: "PDF",
                  description: "Comprehensive checklist to assess your district's Title VI compliance"
                },
                {
                  title: "Language Access Gap Analysis Template",
                  format: "Coming Soon",
                  description: "Document which students lack adequate support"
                },
                {
                  title: "Sample Corrective Action Plan Language",
                  format: "Coming Soon",
                  description: "Pre-written text for inclusion in CAPs"
                },
                {
                  title: "Budget Justification for Compliance Remediation",
                  format: "Coming Soon",
                  description: "Cost-benefit analysis for superintendent approval"
                }
              ].map((doc, i) => (
                <Card key={i} className="hover-scale">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-base">{doc.title}</CardTitle>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">{doc.format}</span>
                    </div>
                    <CardDescription>{doc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to={i === 0 ? "/resources/title-vi-checklist" : "/contact"}>
                        {i === 0 ? "View Checklist" : "Request Template"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Title VI FAQ
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Can we use LanguageBridge as proof of compliance if we're under investigation?",
                  a: "Yes. LanguageBridge demonstrates immediate action to provide language access. Include deployment in your corrective action plan with usage data as evidence."
                },
                {
                  q: "What if we're not under investigation but want to avoid one?",
                  a: "Proactive compliance is the best strategy. LanguageBridge costs $3,500/year, far less than the $50K+ cost of an OCR investigation."
                },
                {
                  q: "Does LanguageBridge replace the need for human interpreters?",
                  a: "No, but it fills critical gaps. Use human interpreters for IEP meetings and parent conferences. Use LanguageBridge for daily classroom instruction where interpreters aren't available 24/7."
                },
                {
                  q: "How do we document compliance with LanguageBridge?",
                  a: "LanguageBridge provides usage analytics showing which students used translation, when, and how often. This is powerful evidence of providing meaningful access."
                },
                {
                  q: "Can we include LanguageBridge in a settlement agreement?",
                  a: "Yes. Many OCR settlements require specific technology solutions. LanguageBridge can be explicitly named in settlement terms."
                }
              ].map((faq, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Facing Title VI Compliance Issues?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how LanguageBridge can be part of your compliance solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                <Link to="/contact">Request Compliance Templates</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Schedule Urgent Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
