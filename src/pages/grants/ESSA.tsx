import { Button } from "@/components/ui/button";
import { Download, Check, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ESSA() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ESSA: <span className="gradient-text">Evidence-Based Interventions</span>
            </h1>
            <p className="text-2xl font-semibold mb-4">Title I, Title II, and Title IV Funding</p>
            <p className="text-xl text-muted-foreground mb-8">
              The Every Student Succeeds Act (ESSA) emphasizes evidence-based interventions. 
              LanguageBridge qualifies under multiple ESSA funding streams as a research-supported 
              technology solution for improving student outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* What is ESSA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What is ESSA?</h2>
            
            <Card className="border-2 border-primary/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Every Student Succeeds Act</CardTitle>
                <CardDescription className="text-base">
                  ESSA replaced No Child Left Behind in 2015. It provides federal funding to states and 
                  districts for programs that improve student achievement, with a strong emphasis on 
                  evidence-based interventions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-bold mb-3">Title I</h3>
                    <p className="text-sm text-muted-foreground">Improving academic achievement of disadvantaged students</p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-bold mb-3">Title II</h3>
                    <p className="text-sm text-muted-foreground">Supporting effective instruction and teacher quality</p>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="font-bold mb-3">Title IV</h3>
                    <p className="text-sm text-muted-foreground">Student support and academic enrichment (technology)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence-Based Requirement:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  ESSA requires interventions to have evidence of effectiveness. LanguageBridge is built on 
                  research-backed principles:
                </p>
                <ul className="space-y-2">
                  {[
                    "Native language support during English acquisition (proven effective in bilingual education research)",
                    "Immediate feedback and comprehensible input (Second Language Acquisition theory)",
                    "Universal access to grade-level content (equity research showing ELL students benefit from challenging curriculum)",
                    "Technology-mediated language learning (extensive research on CALL - Computer-Assisted Language Learning)",
                    "Reduces misidentification for special education (research on over-representation of ELLs in special ed)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ESSA Title Alignment */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              How LanguageBridge Aligns with ESSA Titles
            </h2>
            
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-primary text-white px-3 py-1 rounded text-sm">Title I</div>
                    Improving Achievement of Disadvantaged Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    ELL students often qualify as "disadvantaged" under Title I. LanguageBridge directly 
                    supports their academic achievement by removing language barriers to grade-level content.
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Title I Use Case:</h4>
                    <p className="text-sm text-muted-foreground">
                      "Purchase LanguageBridge as a supplemental educational technology service for ELL 
                      students in our Title I schools. Cost: $3,500 for 50 students. Expected outcome: 
                      Increased engagement and comprehension of core academic content."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-primary text-white px-3 py-1 rounded text-sm">Title II</div>
                    Supporting Effective Instruction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    LanguageBridge supports teacher effectiveness by giving teachers a tool to reach ELL 
                    students they otherwise couldn't effectively teach due to language barriers.
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Title II Use Case:</h4>
                    <p className="text-sm text-muted-foreground">
                      "Provide LanguageBridge as a professional development tool for mainstream teachers 
                      serving ELL students. Allows teachers to deliver grade-level instruction while 
                      students receive native language support. Improves instructional effectiveness for 
                      diverse learners."
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="bg-primary text-white px-3 py-1 rounded text-sm">Title IV</div>
                    Technology for Student Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Title IV Part A specifically funds educational technology. LanguageBridge is a 
                    technology-based intervention that improves student outcomes.
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-bold mb-2">Title IV Use Case:</h4>
                    <p className="text-sm text-muted-foreground">
                      "Purchase LanguageBridge as an educational technology tool under Title IV-A. 
                      Supports student achievement through 24/7 access to translation and language support. 
                      Meets ESSA's technology integration goals."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Real Scenario */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Realistic Scenario: Title I School Improvement
            </h2>
            
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Title I School - 40% ELL Population, Underperforming on State Tests</CardTitle>
                <CardDescription className="text-base">What school leadership was facing:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold mb-3 text-destructive">The Problem:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>School identified for "Comprehensive Support" under ESSA due to low test scores. ELL students scoring lowest.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Principal required to implement "evidence-based interventions" to improve outcomes or face state takeover.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Teachers report: "Our ELL students can't access the curriculum. They sit in class understanding nothing. By the time they learn enough English, they're years behind."</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Tried hiring more ESL teachers but not enough qualified applicants. Can't afford 1:1 paraprofessionals for 60 ELL students.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-destructive">•</span>
                      <span>Budget: $75,000 Title I funds earmarked for "improvement strategies." Need evidence-based solution fast.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-bold mb-3 text-primary">With LanguageBridge (Funded by Title I):</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>All 60 ELL students get immediate access to grade-level content in native languages</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Teachers can deliver rigorous instruction while LanguageBridge provides scaffolding</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Cost: $4,200 for 60 students (leaves $70,800 Title I budget for other interventions)</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Qualifies as "evidence-based" under ESSA (built on bilingual education research)</span>
                    </li>
                    <li className="flex gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Usage analytics provide data for school improvement plan reporting</span>
                    </li>
                    <li className="flex gap-3">
                      <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Expected outcome: ELL students participate more, understand content, scores improve over time</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How to Use ESSA Funds for LanguageBridge
            </h2>

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Identify your ESSA funding stream",
                  description: "Determine whether Title I, Title II, or Title IV is most appropriate for your district's needs and budget availability.",
                  duration: "1 hour"
                },
                {
                  step: "2",
                  title: "Document the need and expected outcomes",
                  description: "Show current ELL student performance data and explain how LanguageBridge addresses the gap (required for evidence-based intervention justification).",
                  duration: "3-4 hours"
                },
                {
                  step: "3",
                  title: "Complete evidence-based justification",
                  description: "Use our ESSA template showing research basis (bilingual education theory, CALL research, equity outcomes). Required for ESSA compliance.",
                  duration: "2-3 hours"
                },
                {
                  step: "4",
                  title: "Submit budget amendment or allocation",
                  description: "Work with your Title I/II/IV coordinator to allocate funds. Most amendments processed within 2-4 weeks.",
                  duration: "2-4 weeks"
                },
                {
                  step: "5",
                  title: "Deploy and track outcomes",
                  description: "Implement LanguageBridge and track student progress. Report outcomes in annual ESSA accountability reporting.",
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

      {/* Download Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Download ESSA Templates
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "ESSA Evidence-Based Justification Template",
                  format: "Coming Soon",
                  description: "Shows research basis for LanguageBridge under ESSA standards"
                },
                {
                  title: "Title I Budget Narrative for LanguageBridge",
                  format: "Coming Soon",
                  description: "Pre-written justification for Title I funding"
                },
                {
                  title: "Title II Professional Development Plan",
                  format: "Coming Soon",
                  description: "How LanguageBridge supports teacher effectiveness"
                },
                {
                  title: "Title IV Well-Rounded Education Justification",
                  format: "Coming Soon",
                  description: "Educational technology and equity alignment"
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
              ESSA FAQ
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "What does 'evidence-based' mean under ESSA?",
                  a: "ESSA defines four evidence tiers. LanguageBridge qualifies under Tier 3 (Promising Evidence) based on research supporting native language instruction, computer-assisted language learning, and universal design for learning."
                },
                {
                  q: "Can we use multiple ESSA titles to fund LanguageBridge?",
                  a: "No. Avoid 'stacking' federal funds for the same purpose. Choose the most appropriate title based on your primary goal (achievement, teacher support, or technology)."
                },
                {
                  q: "Do we need state approval to use ESSA funds for LanguageBridge?",
                  a: "It depends on your state's requirements. Most states allow districts flexibility within Title I/II/IV budgets, but check with your grants coordinator."
                },
                {
                  q: "What if our school is in 'Comprehensive Support' status under ESSA?",
                  a: "Schools in CS status must implement evidence-based interventions. LanguageBridge qualifies and can be part of your improvement plan."
                },
                {
                  q: "How do we report LanguageBridge outcomes for ESSA accountability?",
                  a: "Track ELL student performance before/after implementation. Include LanguageBridge usage data in your school improvement plan reports. Show increased engagement, test participation, and/or achievement."
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
            <h2 className="text-3xl font-bold mb-6">Need Help with ESSA Funding?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We'll help you navigate Title I, II, or IV funding for LanguageBridge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
                <Link to="/contact">Request ESSA Templates</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Schedule Grant Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
