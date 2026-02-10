import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/PageMeta";
import { Download, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function IDEA() {
  return (
    <div className="min-h-screen">
      <PageMeta title="IDEA Part B Funding for Language Access" description="Fund LanguageBridge through IDEA Part B for SLIFE students with IEPs. Assistive technology justification and budget templates included." />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              IDEA Part B: <span className="gradient-text">Assistive Technology</span> Funding
            </h1>
            <p className="text-2xl font-semibold mb-4">For ELL Students with IEPs</p>
            <p className="text-xl text-muted-foreground mb-8">
              When ELL students also have IEPs, LanguageBridge qualifies as assistive technology 
              under IDEA Part B funding, helping students access their education despite dual barriers.
            </p>
          </div>
        </div>
      </section>

      {/* What is IDEA Part B */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What is IDEA Part B?</h2>
            
            <Card className="border-2 border-primary/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Individuals with Disabilities Education Act</CardTitle>
                <CardDescription className="text-base">
                  IDEA Part B provides federal funding for special education services, including assistive 
                  technology that helps students with disabilities access their education.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-bold mb-3">Assistive Technology Definition</h3>
                    <p className="text-sm text-muted-foreground">
                      "Any item, piece of equipment, or product system that is used to increase, 
                      maintain, or improve the functional capabilities of a child with a disability."
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-bold mb-3">How LanguageBridge Qualifies</h3>
                    <p className="text-sm text-muted-foreground">
                      For ELL students with IEPs, language is a functional barrier to accessing education. 
                      LanguageBridge removes that barrier, qualifying as assistive technology.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who This Applies To:</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "ELL students with learning disabilities (LD)",
                    "ELL students with speech/language impairments",
                    "ELL students with autism spectrum disorder (ASD)",
                    "ELL students with any IEP designation where language is a barrier",
                    "Students who were misidentified for special ed due to language (now being corrected)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Scenario */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Realistic Scenario: Dual-Barrier Students
            </h2>
            
            <Card className="border-2">
              <CardHeader>
                <CardTitle>3rd Grade Spanish-Speaking Student with Learning Disability</CardTitle>
                <CardDescription className="text-base">What the IEP team was facing:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold mb-3 text-destructive">The Problem:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Student has diagnosed reading disability (dyslexia). Also an English learner from Venezuela.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>IEP requires text-to-speech accommodation but district's assistive tech only works in English.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Student cannot access grade-level content because: 1) Can't read English due to dyslexia, 2) Can't understand spoken English yet.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Parents filed complaint: "The accommodations in the IEP don't work for our daughter. She's falling further behind every day."</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>District researched specialized AT solutions. Most expensive option: $400/student for single-language support.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-3 text-primary">With LanguageBridge as AT Accommodation:</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Text-to-speech in Spanish built-in, meets IEP accommodation requirement</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Student can access all grade-level materials in her native language while receiving reading disability support</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Works across all websites, not limited to specific platforms</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cost: $85/student vs. $400/student for specialized single-language AT</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Explicitly named in IEP as assistive technology accommodation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Including in IEPs */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How to Include LanguageBridge in IEPs
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Identify ELL students with IEPs",
                  description: "Pull a list of students who are both English learners AND have active IEPs. These are your dual-barrier students who qualify.",
                  duration: "30 minutes"
                },
                {
                  step: "2",
                  title: "Document the language barrier in present levels",
                  description: "In the IEP's 'Present Levels of Performance,' note that language is a functional barrier preventing access to accommodations.",
                  duration: "Per IEP"
                },
                {
                  step: "3",
                  title: "Add LanguageBridge as assistive technology accommodation",
                  description: "In the Accommodations section, write: 'Student will have access to LanguageBridge translation software to access grade-level content in [native language].'",
                  duration: "5 minutes per IEP"
                },
                {
                  step: "4",
                  title: "Use IDEA Part B funds to purchase",
                  description: "Work with your special education director to allocate IDEA Part B funds for this assistive technology purchase.",
                  duration: "1-2 weeks"
                },
                {
                  step: "5",
                  title: "Deploy and document progress",
                  description: "Track student progress with LanguageBridge. Include usage data in IEP progress reports to show AT is being utilized.",
                  duration: "Ongoing"
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

      {/* Sample IEP Language */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Sample IEP Accommodation Language
            </h2>

            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Copy-and-Paste for Your IEPs</CardTitle>
                <CardDescription>
                  Use this exact language in the Accommodations section of IEPs for ELL students with disabilities:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-card rounded-lg p-6 border border-border">
                  <p className="font-mono text-sm mb-4 italic">
                    "Student will have access to LanguageBridge, a language accessibility tool, as assistive 
                    technology to support access to grade-level content. LanguageBridge provides real-time 
                    translation and text-to-speech in [STUDENT'S NATIVE LANGUAGE], enabling the student to 
                    access curriculum materials, assignments, and assessments while accommodations for 
                    [DISABILITY] are implemented."
                  </p>
                </div>

                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="font-bold mb-3">Why This Language Works:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Explicitly identifies LanguageBridge as assistive technology</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Shows functional purpose (access to curriculum)</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Connects to disability accommodations</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Meets IDEA requirements for AT justification</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Download IDEA Part B Templates
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "IEP Accommodation Language Templates",
                  format: "Coming Soon",
                  description: "Ready-to-use text for including LanguageBridge in IEPs"
                },
                {
                  title: "IDEA Part B Budget Justification",
                  format: "Coming Soon",
                  description: "Show how LanguageBridge qualifies as assistive technology"
                },
                {
                  title: "Documentation for AT Evaluation",
                  format: "Coming Soon",
                  description: "Prove LanguageBridge meets AT requirements"
                },
                {
                  title: "Parent Consent & Notification Templates",
                  format: "Coming Soon",
                  description: "FERPA-compliant forms for dual-identified students"
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
                      <Link to="/contact">Request Template</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              IDEA Part B FAQ
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Can we use IDEA funds for students who are ONLY ELL (no IEP)?",
                  a: "No. IDEA Part B is specifically for students with disabilities. However, students who are both ELL and have IEPs definitely qualify."
                },
                {
                  q: "What if parents request LanguageBridge as an IEP accommodation?",
                  a: "Parents have the right to request accommodations. If language is a barrier to accessing other IEP services, the IEP team should seriously consider it."
                },
                {
                  q: "Does including LanguageBridge in an IEP require a full evaluation?",
                  a: "Not necessarily. If the student already has an IEP and language is an obvious barrier, it can be added as an accommodation during annual review or amendment."
                },
                {
                  q: "Can we purchase one license and share it across multiple ELL students with IEPs?",
                  a: "No. Each student needs their own license for individualized support as required by IDEA."
                },
                {
                  q: "How do we track and report LanguageBridge usage for IDEA compliance?",
                  a: "LanguageBridge provides usage analytics for each student. Include this data in IEP progress reports to show the accommodation is being implemented."
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
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Have ELL Students with IEPs?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how to fund LanguageBridge through IDEA Part B
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                <Link to="/contact">Request IDEA Templates</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Schedule Special Ed Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
