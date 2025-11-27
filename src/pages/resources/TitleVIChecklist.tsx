import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Printer, Download } from "lucide-react";

export default function TitleVIChecklist() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/grants/title-vi" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Title VI Page
            </Link>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-card rounded-lg border border-border p-8 print:border-0 print:p-0">
          {/* Title */}
          <div className="text-center mb-8 pb-6 border-b-2 border-border">
            <h1 className="text-3xl font-bold mb-2">TITLE VI COMPLIANCE CHECKLIST</h1>
            <p className="text-lg text-muted-foreground">Language Access for English Language Learners</p>
            <p className="text-sm text-muted-foreground mt-2">Prepared by LanguageBridge for School Districts</p>
          </div>

          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">OVERVIEW: WHAT IS TITLE VI?</h2>
            <p className="mb-4 italic text-muted-foreground">
              Title VI of the Civil Rights Act of 1964 states:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 mb-4 italic">
              "No person in the United States shall, on the ground of race, color, or national origin, be excluded from 
              participation in, be denied the benefits of, or be subjected to discrimination under any program or activity 
              receiving Federal financial assistance."
            </blockquote>
            <p className="font-semibold">
              For schools, this means: If students can't understand English, you must provide meaningful language access 
              so they can participate in your educational programs. Failure to provide language access = discrimination = 
              Title VI violation.
            </p>
          </section>

          {/* Checklist */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">COMPLIANCE CHECKLIST</h2>
            <p className="mb-6">Use this checklist to assess your district's Title VI compliance. Check YES or NO for each item.</p>

            {/* Section 1 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 1: IDENTIFICATION & ASSESSMENT</h3>
              <div className="space-y-3">
                {[
                  "We have a process to identify students with limited English proficiency within 30 days of enrollment",
                  "We use a valid, reliable English language proficiency assessment (e.g., ACCESS for ELLs, WIDA Screener)",
                  "We notify parents within 30 days when their child is identified as an English Learner",
                  "Parent notifications are provided in a language parents can understand"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 2: LANGUAGE ACCESS IN INSTRUCTION</h3>
              <div className="space-y-3">
                {[
                  "ELL students can access grade-level curriculum (not just remedial work)",
                  "We provide ESL or bilingual instruction to ELL students",
                  "Mainstream teachers receive training on supporting ELL students",
                  "ELL students can understand teacher instructions and assignments",
                  "We provide translation/interpretation for student questions during class"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <div className="bg-destructive/10 border-l-4 border-destructive p-4 my-4">
                <p className="font-bold mb-2">⚠️ CRITICAL GAP IDENTIFIED BY OCR INVESTIGATIONS:</p>
                <p className="text-sm">
                  Many districts provide language access during teacher-led instruction but fail to provide it for 
                  independent digital learning (Google Classroom, online assessments, homework platforms). Students are 
                  expected to navigate English-only websites independently, which violates Title VI.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "ELL students can independently navigate digital learning platforms (Google Classroom, Canvas, etc.)",
                  "We provide translation tools for online assignments and homework",
                  "ELL students can access online resources (library databases, educational websites) in their language"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <div className="bg-destructive/10 border-l-4 border-destructive p-4 my-4">
                <p className="font-bold text-sm">
                  🔴 IF YOU CHECKED "NO" TO ANY OF THE LAST 3 ITEMS, YOU HAVE A TITLE VI COMPLIANCE GAP.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 3: ASSESSMENT & TESTING</h3>
              <div className="space-y-3 mb-4">
                {[
                  "We provide language accommodations on state assessments (as allowed by state)",
                  "ELL students can understand directions on standardized tests",
                  "We offer translation support during classroom assessments/quizzes",
                  "Testing accommodations don't disadvantage ELL students (e.g., locked browsers still allow language access)"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4">
                <p className="font-bold mb-2">🔴 COMMON VIOLATION:</p>
                <p className="text-sm">
                  Locked testing browsers disable Google Translate, leaving ELL students unable to understand questions. 
                  This is a Title VI violation if no alternative language access is provided.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 4: PARENT & FAMILY COMMUNICATION</h3>
              <div className="space-y-3">
                {[
                  "We translate important documents (enrollment forms, report cards, IEPs, discipline notices) into parents' home languages",
                  "We provide interpreters for parent-teacher conferences",
                  "We provide interpreters for IEP meetings",
                  "We provide interpreters for disciplinary meetings",
                  "Parents can understand phone calls/emails from school",
                  "We offer interpretation for school events (open house, back-to-school night)"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 5: STUDENT SUPPORT SERVICES</h3>
              <div className="space-y-3 mb-4">
                {[
                  "ELL students can access counseling services (with language support)",
                  "ELL students can communicate with school nurses about health concerns",
                  "ELL students can participate in extracurricular activities (with language support as needed)",
                  "We have a process to distinguish between language barriers and learning disabilities"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-destructive/10 border-l-4 border-destructive p-4">
                <p className="font-bold mb-2">🔴 COMMON VIOLATION:</p>
                <p className="text-sm">
                  Referring ELL students to special education without determining if difficulties are due to language 
                  acquisition vs. disability.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 6: STAFF TRAINING & RESOURCES</h3>
              <div className="space-y-3">
                {[
                  "Staff are trained on Title VI requirements",
                  "We have written procedures for providing language access",
                  "Staff know how to request interpreters/translators",
                  "We have sufficient interpreter/translator resources"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">SECTION 7: MONITORING & ACCOUNTABILITY</h3>
              <div className="space-y-3">
                {[
                  "We monitor ELL student achievement data",
                  "We track disciplinary referrals for ELL students (to identify potential bias)",
                  "We have a Title VI compliance coordinator",
                  "We have a complaint process for Title VI violations"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex gap-2 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ YES
                      </span>
                      <span className="inline-flex items-center gap-1 border border-border px-2 py-1 rounded text-sm">
                        □ NO
                      </span>
                    </div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Scoring */}
          <section className="mb-8 bg-secondary/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">SCORING YOUR COMPLIANCE</h2>
            <p className="mb-4 font-semibold">COUNT YOUR "NO" RESPONSES:</p>
            <div className="space-y-2 text-sm">
              <p>0-2 NO responses: ✅ STRONG COMPLIANCE - Minor gaps to address</p>
              <p>3-5 NO responses: ⚠️ MODERATE RISK - Action plan needed</p>
              <p>6-10 NO responses: 🔴 HIGH RISK - Urgent remediation required</p>
              <p>11+ NO responses: 🚨 CRITICAL RISK - OCR investigation likely if complaint filed</p>
            </div>
          </section>

          {/* Consequences */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">CONSEQUENCES OF NON-COMPLIANCE</h2>
            <p className="mb-4">If your district receives a Title VI complaint or OCR initiates an investigation:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">FINANCIAL CONSEQUENCES:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Legal fees to respond to OCR: $50,000 - $200,000+</li>
                  <li>Potential loss of ALL federal funding</li>
                  <li>Costs to implement corrective action plan</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">OPERATIONAL CONSEQUENCES:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>OCR monitoring for 3-5 years</li>
                  <li>Required reporting on compliance efforts</li>
                  <li>Mandatory staff training</li>
                  <li>Public disclosure of violations</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">REPUTATIONAL CONSEQUENCES:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>OCR findings published online</li>
                  <li>Local media coverage</li>
                  <li>Loss of community trust</li>
                  <li>Board of education scrutiny</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">LEGAL CONSEQUENCES:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Potential lawsuits from parents</li>
                  <li>Class action risk</li>
                  <li>Attorney fees (even if you win)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How LanguageBridge Helps */}
          <section className="mb-8 bg-primary/5 border-2 border-primary/20 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">HOW LANGUAGEBRIDGE ADDRESSES TITLE VI GAPS</h2>
            <p className="mb-4">LanguageBridge specifically solves the most common Title VI compliance gaps identified by OCR:</p>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-bold mb-1">✅ DIGITAL LEARNING ACCESS</p>
                <p className="text-muted-foreground">Students can translate ANY website into their native language. Works on Google Classroom, Canvas, online libraries, educational sites.</p>
              </div>
              <div>
                <p className="font-bold mb-1">✅ TESTING ACCOMMODATIONS</p>
                <p className="text-muted-foreground">Works in locked browser environments where Google Translate doesn't. Maintains test integrity while providing equal access.</p>
              </div>
              <div>
                <p className="font-bold mb-1">✅ PRELITERATE STUDENT SUPPORT</p>
                <p className="text-muted-foreground">Audio-first design means students don't need to READ to access content. Text-to-speech in native language.</p>
              </div>
              <div>
                <p className="font-bold mb-1">✅ TWO-WAY COMMUNICATION</p>
                <p className="text-muted-foreground">Students can ask questions without waiting for human interpreter. Real-time translation enables participation.</p>
              </div>
              <div>
                <p className="font-bold mb-1">✅ COST-EFFECTIVENESS</p>
                <p className="text-muted-foreground">$50-75 per student per year vs. $18-20/hour for human interpreters. 90%+ cost savings while improving access.</p>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">NEXT STEPS TO ACHIEVE COMPLIANCE</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">STEP 1: CONDUCT GAP ANALYSIS (This Week)</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Complete this checklist honestly</li>
                  <li>Identify your highest-risk gaps</li>
                  <li>Prioritize items marked "CRITICAL GAP"</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">STEP 2: DEVELOP CORRECTIVE ACTION PLAN (Next Week)</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>For each "NO" response, document the gap and solution</li>
                  <li>Set timeline for implementation</li>
                  <li>Assign responsibility</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">STEP 3: IMPLEMENT SOLUTIONS (Next 30-90 Days)</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>For digital learning gaps: Deploy LanguageBridge</li>
                  <li>For parent communication: Contract translation service</li>
                  <li>For staff training: Schedule professional development</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Resources */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b border-border pb-2">RESOURCES</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold">Office for Civil Rights (OCR) Guidance:</p>
                <p className="text-muted-foreground">Dear Colleague Letter on ELL Students and Limited English Proficient Parents (2015)</p>
              </div>
              <div>
                <p className="font-bold">LanguageBridge Resources:</p>
                <p className="text-muted-foreground">Email: contact@languagebridge.app | Phone: (216) 800-6020</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="text-center border-t border-border pt-6 text-sm text-muted-foreground">
            <p className="font-bold mb-2">PREPARED BY: LanguageBridge</p>
            <p className="mb-4">Helping Schools Achieve Title VI Compliance Through Technology</p>
            <p className="italic">This checklist is for informational purposes only and does not constitute legal advice.</p>
            <p className="italic">Last Updated: November 2025</p>
          </section>
        </div>
      </div>
    </div>
  );
}
