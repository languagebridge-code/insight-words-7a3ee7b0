import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Printer } from "lucide-react";

export default function TitleIIIApplication() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="print:hidden sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/grants/title-iii" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Title III Page
            </Link>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Document */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card rounded-lg border border-border p-8 print:border-0 print:p-0">
          {/* Title */}
          <div className="text-center mb-8 pb-6 border-b-2 border-border">
            <h1 className="text-3xl font-bold mb-2">TITLE III GRANT APPLICATION</h1>
            <p className="text-lg text-muted-foreground">English Language Acquisition Program</p>
            <p className="text-sm text-muted-foreground mt-4">[Your District Name]</p>
            <p className="text-sm text-muted-foreground">Fiscal Year [2025-2026]</p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 1: PROGRAM OVERVIEW</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-bold">Program Name:</span> Digital Language Access Initiative with LanguageBridge
              </div>
              <div>
                <span className="font-bold">Funding Source:</span> Title III - English Language Acquisition, Language Enhancement, 
                and Academic Achievement Act
              </div>
              <div>
                <span className="font-bold">Grant Amount Requested:</span> $[insert amount]
              </div>
              <div>
                <span className="font-bold">Program Duration:</span> 12 months (July 1, 2025 - June 30, 2026)
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 2: NEEDS ASSESSMENT</h2>
            
            <div className="mb-6">
              <h3 className="font-bold mb-2">Student Population:</h3>
              <p className="text-sm text-muted-foreground mb-4">
                [Your District Name] serves [XXX] English Language Learners across [X] school buildings, representing [X]% 
                of our total student population. Our ELL students speak [X] home languages, with the primary languages being:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
                <li>Dari: [XX] students</li>
                <li>Pashto: [XX] students</li>
                <li>Spanish: [XX] students</li>
                <li>Arabic: [XX] students</li>
                <li>Ukrainian: [XX] students</li>
                <li>Other languages: [XX] students</li>
              </ul>
            </div>

            <div className="mb-6 bg-primary/5 border-l-4 border-primary p-4">
              <h3 className="font-bold mb-2">Critical Challenge - Preliterate Student Population:</h3>
              <p className="text-sm">
                Of our ELL population, approximately [XX] students (XX%) are preliterate in their native language. 
                These students face a unique barrier: they cannot read their home language OR English. Traditional 
                translation tools require literacy and are therefore inaccessible to this vulnerable population.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Current State Analysis:</h3>
              <p className="text-sm mb-2">Our district currently relies on:</p>
              <ol className="text-sm text-muted-foreground space-y-2 ml-4">
                <li>1. Human interpreters: [X] part-time interpreters at $[XX]/hour, serving [XXX] hours/week
                  <br />Annual cost: $[XX,XXX]</li>
                <li>2. Google Translate: Used informally by teachers, but:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Not FERPA compliant for educational settings</li>
                    <li>Requires student literacy (ineffective for preliterate students)</li>
                    <li>Does not work in locked testing environments</li>
                    <li>No audio support for navigation</li>
                  </ul>
                </li>
                <li>3. Pull-out ESL instruction: [X] ESL teachers serving [XXX] students</li>
              </ol>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Impact of Current Gaps:</h3>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
                <li>Assignment completion rates for preliterate ELL students: [XX]%</li>
                <li>Disciplinary referrals for ELL students: [XX]% higher than district average</li>
                <li>Special education referrals: [XX] students referred annually</li>
                <li>Teacher time spent on translation: Average [XX] hours/week</li>
                <li>Parent communication challenges: [XX]% report difficulty</li>
              </ul>
            </div>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4">
              <h3 className="font-bold mb-2">Title VI Compliance Concern:</h3>
              <p className="text-sm">
                Under Title VI of the Civil Rights Act of 1964, we are legally required to provide meaningful language 
                access to ELL students. Our current patchwork of solutions creates gaps in access, particularly for 
                independent digital learning, after-school support, and standardized testing.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 3: PROPOSED SOLUTION</h2>
            
            <p className="text-sm mb-4">
              We propose to implement LanguageBridge, a Chrome extension specifically designed for preliterate English 
              Language Learners. This technology-based solution provides:
            </p>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">1. Universal Web Translation</h3>
                <p className="text-muted-foreground">
                  Students can translate any text on any website by highlighting it. Works on Google Classroom, Canvas, 
                  state assessments, and all educational websites.
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">2. Audio-First Design for Preliterate Students</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Text-to-speech reads translations aloud in native language</li>
                  <li>Adjustable reading speed (0.5x to 2.0x)</li>
                  <li>Screen reader mode for full page navigation</li>
                  <li>No reading required</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">3. Two-Way Communication Bridge</h3>
                <p className="text-muted-foreground">
                  Students can speak questions in native language → Extension translates to English → Teacher responds 
                  → Student hears response in native language
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">4. Supported Languages</h3>
                <p className="text-muted-foreground">
                  Currently: Dari, Pashto, Arabic, Spanish, Urdu, Uzbek, Ukrainian, English<br />
                  Expanding: Additional languages based on district needs
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-2">5. FERPA/COPPA Compliance</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Purpose-built for K-12 educational settings</li>
                  <li>No student data stored or retained</li>
                  <li>All processing happens in real-time</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-primary/5 border-2 border-primary/20 p-4 rounded">
              <h3 className="font-bold mb-2">Alignment with Title III Priorities:</h3>
              <div className="text-sm space-y-2">
                <p>✓ "To help ensure that English learners attain English proficiency"</p>
                <p>✓ "To develop high levels of academic achievement in English"</p>
                <p>✓ "To assist all English learners to meet challenging State standards"</p>
                <p>✓ "To promote parental, family, and community engagement"</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 4: IMPLEMENTATION PLAN</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">Month 1 (July 2025): Preparation & Training</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Week 1: Execute contract with LanguageBridge</li>
                  <li>Week 2: IT deploys extension via Google Admin Console</li>
                  <li>Week 3: Teacher professional development</li>
                  <li>Week 4: Create parent communication materials</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Month 2 (August 2025): Launch & Support</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Week 1: Student orientation</li>
                  <li>Weeks 2-4: Intensive support with daily check-ins</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Months 3-9: Full Implementation</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Ongoing student usage across all digital learning</li>
                  <li>Monthly usage reports and data collection</li>
                  <li>Quarterly strategy meetings</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Months 10-12: Evaluation & Planning</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Data analysis of student outcomes</li>
                  <li>Teacher and student surveys</li>
                  <li>Year 2 sustainability planning</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 5: BUDGET JUSTIFICATION</h2>
            
            <div className="mb-4">
              <p className="font-bold text-lg mb-2">Total Program Cost: $[insert total]</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-secondary/30 p-4 rounded">
                <h3 className="font-bold mb-2">Line Item 1: LanguageBridge Subscription License</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>Cost: $[XX] per student per year</li>
                  <li>Number of students: [XXX] ELL students</li>
                  <li>Total: $[X,XXX]</li>
                  <li className="italic">Provides 12 months of unlimited translation access</li>
                </ul>
              </div>

              <div className="bg-secondary/30 p-4 rounded">
                <h3 className="font-bold mb-2">Line Item 2: Professional Development</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>Cost: $[XXX] (substitute coverage)</li>
                  <li>Number of teachers: [XX] ESL teachers</li>
                  <li>Total: $[XXX]</li>
                </ul>
              </div>

              <div className="bg-secondary/30 p-4 rounded">
                <h3 className="font-bold mb-2">Line Item 3: Family Engagement Materials</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>Cost: $[XXX] (printing in [X] languages)</li>
                  <li>Total: $[XXX]</li>
                </ul>
              </div>

              <div className="bg-secondary/30 p-4 rounded">
                <h3 className="font-bold mb-2">Line Item 4: Program Evaluation</h3>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>Cost: $[XXX] (data analysis and reporting)</li>
                  <li>Total: $[XXX]</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-primary/5 border-2 border-primary/20 p-4 rounded">
              <h3 className="font-bold mb-2">Cost-Benefit Analysis:</h3>
              <div className="text-sm space-y-1">
                <p>Current interpreter costs: $[XX,XXX]/year</p>
                <p>LanguageBridge cost: $[X,XXX]/year</p>
                <p className="font-bold text-primary">Annual savings: $[XX,XXX]</p>
                <p className="text-xs mt-2 text-muted-foreground">Cost per student per day: Less than a cup of coffee</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 6: EVALUATION PLAN</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">Goal 1: Increase ELL Student Independence</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>80% of ELL students independently complete online assignments by Month 6</li>
                  <li>Average time to complete assignments decreases by 30% by Month 9</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Goal 2: Improve Academic Achievement</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Assignment completion rates increase from [XX]% to [XX]%</li>
                  <li>State assessment participation rate reaches 100%</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Goal 3: Reduce Inequitable Referrals</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Disciplinary referrals decrease by 50%</li>
                  <li>Special education referrals decrease by 30%</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Goal 4: Increase Service Efficiency</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                  <li>Human interpreter hours decrease by 40%</li>
                  <li>Teacher translation time decreases by 50%</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 text-sm">
              <h3 className="font-bold mb-2">Data Collection Methods:</h3>
              <ul className="text-muted-foreground list-disc list-inside ml-4 space-y-1">
                <li>Monthly usage reports from LanguageBridge</li>
                <li>Quarterly teacher and student surveys</li>
                <li>Pre/post achievement data</li>
                <li>Behavior and referral tracking</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 7: SUSTAINABILITY PLAN</h2>
            
            <div className="space-y-3 text-sm">
              <div>
                <h3 className="font-bold mb-2">Year 2 Funding Strategy:</h3>
                <ul className="text-muted-foreground list-disc list-inside ml-4">
                  <li>Continue Title III funding</li>
                  <li>Explore IDEA Part B for students with IEPs</li>
                  <li>Seek local foundation grants</li>
                  <li>District general fund allocation if needed</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Program Sustainability:</h3>
                <p className="text-muted-foreground">
                  Low ongoing costs ($[XX] per student/year), existing infrastructure, built teacher capacity, 
                  and integration into standard ELL practices ensure long-term viability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">SECTION 8: ASSURANCES & COMPLIANCE</h2>
            
            <div className="space-y-2 text-sm">
              <p>✓ This program supplements, not supplants, state and local funds</p>
              <p>✓ Title III funds used only for allowable activities</p>
              <p>✓ All students identified through approved screener (ACCESS)</p>
              <p>✓ Annual evaluation for effectiveness</p>
              <p>✓ Civil rights requirements met (Title VI, Title IX, Section 504, ADA)</p>
              <p>✓ FERPA privacy requirements maintained</p>
              <p>✓ Parental notification within 30 days</p>
              <p>✓ Compliance with all Title III reporting requirements</p>
            </div>
          </section>

          {/* Signature Block */}
          <section className="mt-12 space-y-8 text-sm">
            <div className="border-t pt-4">
              <p className="mb-1">Submitted by: ____________________________</p>
              <p className="ml-20 text-muted-foreground">[Title III Coordinator Name]</p>
              <p className="ml-20 text-muted-foreground">Title III Coordinator</p>
              <p className="ml-20 text-muted-foreground">[District Name]</p>
            </div>
            
            <div className="border-t pt-4">
              <p className="mb-1">Approved by: _____________________________</p>
              <p className="ml-20 text-muted-foreground">[Superintendent Name]</p>
              <p className="ml-20 text-muted-foreground">Superintendent</p>
              <p className="ml-20 text-muted-foreground">[District Name]</p>
            </div>

            <div className="border-t pt-4">
              <p>Date: _______________</p>
            </div>
          </section>

          {/* Footer */}
          <section className="mt-12 text-center border-t border-border pt-6 text-sm text-muted-foreground">
            <p className="font-bold mb-2">Template provided by LanguageBridge</p>
            <p>Email: info@languagebridge.app | Phone: (216) 800-6020</p>
          </section>
        </div>
      </div>
    </div>
  );
}
