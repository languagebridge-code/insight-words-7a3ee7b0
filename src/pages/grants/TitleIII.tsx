import { Button } from "@/components/ui/button";
import { Download, Calculator, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TitleIII() {
  const [ellStudents, setEllStudents] = useState(50);
  const estimatedAllocation = ellStudents * 100; // Simple estimation
  const languageBridgeCost = 2000;
  const percentageOfBudget = ((languageBridgeCost / estimatedAllocation) * 100).toFixed(1);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Title III: <span className="gradient-text">English Language Acquisition</span> Grants
            </h1>
            <p className="text-2xl font-semibold mb-4">The Easiest Way to Fund LanguageBridge</p>
            <p className="text-xl text-muted-foreground mb-8">
              Your district already receives Title III funding annually. LanguageBridge is a perfect fit for these federal dollars designated for language acquisition services.
            </p>
          </div>
        </div>
      </section>

      {/* What is Title III */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What is Title III?</h2>
            
            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <p className="text-lg text-muted-foreground mb-6">
                Title III is federal funding that districts automatically receive based on their ELL student count. This money must be used specifically for programs and services that support English language acquisition.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-bold mb-3">Typical Amounts</h3>
                  <p className="text-muted-foreground">$50K - $500K per district per year, depending on ELL population</p>
                </div>
                
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                  <h3 className="font-bold mb-3">How It's Calculated</h3>
                  <p className="text-muted-foreground">Based on number of English learners and district size</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">Title III Funds Can Be Used For:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Language instruction programs",
                  "Professional development for teachers",
                  "Supplemental services for ELL students",
                  "Technology for language learning",
                  "Materials and resources",
                  "Assessment and evaluation tools"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why LanguageBridge Qualifies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why LanguageBridge Qualifies for Title III
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Directly supports English language acquisition",
                  description: "Provides scaffolding for ELL students to access grade-level content while learning English"
                },
                {
                  title: "Provides native language support during transition",
                  description: "Research-backed approach that maintains academic progress while developing English proficiency"
                },
                {
                  title: "Technology-based language instruction",
                  description: "Explicitly allowed under Title III as supplemental educational technology"
                },
                {
                  title: "Meets 'supplemental services' requirement",
                  description: "Adds to, not replaces, core ELL instruction—perfect for Title III compliance"
                },
                {
                  title: "FERPA compliant for federal fund usage",
                  description: "All privacy and security requirements met for using federal education dollars"
                }
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border flex gap-4">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">How Much Does Your District Get?</h2>
              </div>

              <div className="bg-card rounded-xl p-6 mb-6">
                <label className="block text-sm font-semibold mb-3">
                  Number of ELL students in your district
                </label>
                <input
                  type="number"
                  value={ellStudents}
                  onChange={(e) => setEllStudents(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-lg"
                  min="1"
                />
              </div>

              <div className="bg-card rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Your estimated Title III allocation:</p>
                <p className="text-5xl font-bold text-primary mb-4">
                  ${estimatedAllocation.toLocaleString()}
                </p>
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-muted-foreground mb-2">
                    LanguageBridge would be just <span className="font-bold text-primary text-xl">{percentageOfBudget}%</span> of your Title III budget
                  </p>
                  <p className="text-sm text-muted-foreground">
                    (Based on ${languageBridgeCost.toLocaleString()} Medium Package)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Step-by-Step Application Guide
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Contact your district's Title III coordinator",
                  description: "This person manages all Title III spending. If you don't know who it is, ask your superintendent's office.",
                  duration: "10 minutes"
                },
                {
                  step: "2",
                  title: "Download our budget justification template",
                  description: "We've pre-written the narrative explaining how LanguageBridge aligns with Title III priorities. Just customize with your student data.",
                  duration: "30 minutes"
                },
                {
                  step: "3",
                  title: "Submit request to use Title III funds for LanguageBridge",
                  description: "Your coordinator will add LanguageBridge to the Title III spending plan and submit for state approval.",
                  duration: "1 week"
                },
                {
                  step: "4",
                  title: "Typical approval timeline",
                  description: "Most Title III amendments are approved quickly since you're using existing allocation.",
                  duration: "2-4 weeks"
                },
                {
                  step: "5",
                  title: "Purchase and deploy",
                  description: "Once approved, purchase LanguageBridge and we'll have you live in 48 hours.",
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Download Title III Templates
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Title III Budget Justification Template",
                  format: "DOCX",
                  description: "Pre-written narrative aligned with federal requirements"
                },
                {
                  title: "Title III Narrative Template",
                  format: "DOCX",
                  description: "Explains how LanguageBridge supports your ELL program"
                },
                {
                  title: "Letters of Support from Ohio Schools",
                  format: "PDF",
                  description: "Sample letters you can reference or adapt"
                },
                {
                  title: "Alignment with Title III Priorities",
                  format: "PDF",
                  description: "Shows how LanguageBridge meets all federal priorities"
                }
              ].map((doc, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold">{doc.title}</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{doc.format}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>

            {/* Email Capture */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-center">Download All Templates at Once</h3>
              <form className="space-y-4 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
                <input
                  type="text"
                  placeholder="School/District"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
                <Button size="lg" className="w-full gradient-primary text-white">
                  <Download className="mr-2" />
                  Download All Title III Templates
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Success Story</h2>
            
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Parma City Schools</h3>
                <p className="text-primary font-semibold">Used Title III Funds • $5,100 • Approved in 14 Days</p>
              </div>
              
              <p className="text-lg text-muted-foreground italic mb-6">
                "We used Title III funds to cover the entire cost of LanguageBridge for our 85 ELL students. The application took me less than 3 hours to customize using their templates, and we were approved in just 14 days. Now our students have instant translation support across all their devices."
              </p>
              
              <div className="border-t border-border pt-6">
                <p className="font-bold">Sarah Martinez</p>
                <p className="text-sm text-muted-foreground">Director of ELL Services, Parma City Schools</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Title III FAQ
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Do we need state approval to use Title III funds for LanguageBridge?",
                  a: "Most states allow districts to amend their Title III plans without re-approval, especially for supplemental technology purchases. Your Title III coordinator will know your state's specific process."
                },
                {
                  q: "Can we use Title III funds if we're already using them for other programs?",
                  a: "Yes! Title III is meant to fund multiple programs and services. LanguageBridge would be an additional supplemental service, not a replacement for existing programs."
                },
                {
                  q: "What if our Title III allocation is already fully budgeted?",
                  a: "Many districts reallocate funds mid-year, especially if other planned expenses came in under budget. Your coordinator can help identify flexible funding within your allocation."
                },
                {
                  q: "Is there a deadline for submitting Title III amendments?",
                  a: "It varies by state, but most allow amendments throughout the school year. Contact your coordinator to understand your state's timeline."
                },
                {
                  q: "Can we pilot LanguageBridge before committing Title III funds?",
                  a: "Absolutely! Start with our free 30-day pilot, gather data on student outcomes, then use that evidence to justify your Title III request."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Fund with Title III?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero">
                <Download className="mr-2" />
                Download Templates
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/grants/consultation">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
