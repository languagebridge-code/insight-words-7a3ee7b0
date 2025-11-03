import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CaseStudies() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGrant, setSelectedGrant] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");

  const caseStudies = [
    {
      id: "carlos",
      title: "Carlos: From Shutdown to Success",
      type: "preliterate",
      grant: "title-iii",
      size: "small",
      student: "Carlos",
      grade: "4th Grade",
      language: "Pashto",
      challenge: "Carlos, a bright 4th grader, was flagged for special education because he couldn't read English yet. Teachers thought he 'didn't do any work' when he actually couldn't access grade-level content. He shut down in class, isolated and misunderstood.",
      solution: "With LanguageBridge, Carlos could hear instructions in Pashto and access the same content as his peers. He gained confidence to ask questions and demonstrate his true academic abilities.",
      outcomes: [
        { metric: "Assignment Completion", value: "+67%" },
        { metric: "Reading Level", value: "Grade-appropriate" },
        { metric: "Class Participation", value: "First time smiling" },
        { metric: "Parent Calls", value: "Zero complaints" }
      ],
      testimonial: {
        quote: "LanguageBridge revealed that Carlos wasn't struggling academically—he was struggling with English. Once we gave him access in his language, he thrived.",
        name: "Maria Rodriguez",
        title: "ESL Teacher"
      }
    },
    {
      id: "amira",
      title: "Amira: Behavioral Transformation",
      type: "refugee",
      grant: "idea",
      size: "small",
      student: "Amira",
      grade: "3rd Grade",
      language: "Dari",
      challenge: "Amira misbehaved due to lack of understanding and got referred to the principal. During meetings, she couldn't grasp the issues in English, and administrators couldn't speak Dari. They violated her privacy by pulling in another student to translate.",
      solution: "With LanguageBridge, Amira could hear the administrator's concerns in Dari and respond appropriately. Conversations stayed private and professional—no student translators needed.",
      outcomes: [
        { metric: "Disciplinary Referrals", value: "Dropped to zero" },
        { metric: "Class Participation", value: "Now volunteers" },
        { metric: "Interpreter Time Saved", value: "12 hours/week" },
        { metric: "Privacy Violations", value: "Eliminated" }
      ],
      testimonial: {
        quote: "Amira wasn't a 'problem student.' She was a confused student. LanguageBridge gave her the tools to understand expectations and succeed.",
        name: "Dr. James Peterson",
        title: "Principal"
      }
    },
    {
      id: "parma",
      title: "Parma City Schools: District-Wide Success",
      type: "all",
      grant: "title-iii",
      size: "medium",
      district: "Parma City School District",
      students: "85 ELL students",
      languages: "8 languages (Dari, Pashto, Spanish, Arabic, Ukrainian, Urdu, Uzbek, Somali)",
      challenge: "With 85 ELL students speaking 8 different languages, Parma struggled to provide adequate interpreter support. Costs were escalating, availability was limited, and Title VI compliance was at risk.",
      solution: "Deployed LanguageBridge district-wide using Title III funds. All Chromebooks were configured in under 2 hours, and students started using it immediately.",
      outcomes: [
        { metric: "Assignment Completion", value: "+67%" },
        { metric: "Disciplinary Referrals", value: "-89%" },
        { metric: "Annual Interpreter Savings", value: "$37,000" },
        { metric: "Teacher Time Reclaimed", value: "12 hrs/week" },
        { metric: "Parent Satisfaction", value: "94%" }
      ],
      testimonial: {
        quote: "The ROI was immediate. Within one month, we saw dramatic improvements in student engagement and a massive reduction in interpreter costs.",
        name: "Sarah Martinez",
        title: "Director of ELL Services, Parma City Schools"
      },
      grantUsed: "Title III",
      timeline: "14 days from application to approval",
      contact: "Available for reference calls"
    },
    {
      id: "cleveland",
      title: "Cleveland Metro: Rapid Testing Deployment",
      type: "all",
      grant: "self-funded",
      size: "large",
      district: "Cleveland Metropolitan School District",
      students: "500 students",
      languages: "12 languages",
      challenge: "With state testing approaching, Cleveland needed a fast solution to ensure ELL students could access test materials. They had only 2 weeks to deploy before testing window opened.",
      solution: "Implemented LanguageBridge across 500 Chromebooks in 2 hours via Google Admin Console. Students received 5-minute training videos in their native languages.",
      outcomes: [
        { metric: "Deployment Time", value: "2 hours" },
        { metric: "Test Participation", value: "+95%" },
        { metric: "Student Confidence", value: "Significantly improved" },
        { metric: "IT Staff Time", value: "Minimal" }
      ],
      testimonial: {
        quote: "I've never seen an EdTech tool deploy this fast. Two hours from receiving credentials to live on 500 devices. It saved our testing season.",
        name: "Marcus Johnson",
        title: "Technology Director"
      }
    },
    {
      id: "urban-compliance",
      title: "Urban District: Title VI Compliance Solution",
      type: "all",
      grant: "title-vi",
      size: "large",
      district: "Anonymous Urban District",
      students: "200+ ELL students",
      languages: "15+ languages",
      challenge: "District was cited by OCR for Title VI violations due to inadequate language access for families. Facing potential loss of federal funding and $50K+ in legal fees.",
      solution: "Applied for and received Title VI compliance grant to fund LanguageBridge. Used the tool to remediate language access gaps and demonstrate compliance to OCR.",
      outcomes: [
        { metric: "Title VI Compliance", value: "Achieved" },
        { metric: "Legal Fees Avoided", value: "$50,000+" },
        { metric: "Federal Funding", value: "Protected" },
        { metric: "Family Communication", value: "Transformed" }
      ],
      testimonial: {
        quote: "LanguageBridge didn't just solve our compliance problem—it fundamentally changed how we serve ELL families. The grant paid for itself many times over.",
        name: "Dr. Lisa Chen",
        title: "Assistant Superintendent"
      },
      grantUsed: "Title VI Civil Rights Compliance",
      amount: "$35,000"
    }
  ];

  const filteredStudies = caseStudies.filter(study => {
    if (selectedType !== "all" && study.type !== selectedType && study.type !== "all") return false;
    if (selectedGrant !== "all" && study.grant !== selectedGrant) return false;
    if (selectedSize !== "all" && study.size !== selectedSize) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Real Schools. <span className="gradient-text">Real Results.</span> Real Data.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              See how LanguageBridge transforms outcomes for ELL students across Ohio and beyond
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Student Type</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="preliterate">Preliterate</option>
                  <option value="refugee">Refugee</option>
                  <option value="special-ed">Special Ed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Grant Used</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  value={selectedGrant}
                  onChange={(e) => setSelectedGrant(e.target.value)}
                >
                  <option value="all">All Grants</option>
                  <option value="title-iii">Title III</option>
                  <option value="title-vi">Title VI</option>
                  <option value="idea">IDEA</option>
                  <option value="self-funded">Self-Funded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">School Size</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="all">All Sizes</option>
                  <option value="small">Small (&lt;500)</option>
                  <option value="medium">Medium (500-2000)</option>
                  <option value="large">Large (2000+)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-background" id="case-studies">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {filteredStudies.map((study, index) => (
              <div key={study.id} className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden hover-scale">
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h2 className="text-3xl md:text-4xl font-bold">{study.title}</h2>
                      {study.grantUsed && (
                        <Badge className="bg-primary text-white shrink-0">{study.grantUsed}</Badge>
                      )}
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {study.student && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{study.grade} • {study.language}</span>
                        </div>
                      )}
                      {study.district && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{study.district}</span>
                        </div>
                      )}
                      {study.students && <span>• {study.students}</span>}
                      {study.languages && <span>• {study.languages}</span>}
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-destructive">🚨</span>
                      The Challenge
                    </h3>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      The LanguageBridge Solution
                    </h3>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>

                  {/* Outcomes */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Measurable Outcomes
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {study.outcomes.map((outcome, i) => (
                        <div key={i} className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                          <p className="text-sm text-muted-foreground mb-1">{outcome.metric}</p>
                          <p className="text-2xl font-bold text-primary">{outcome.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                    <p className="text-muted-foreground italic mb-4">"{study.testimonial.quote}"</p>
                    <div>
                      <p className="font-bold">{study.testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{study.testimonial.title}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(study.timeline || study.amount || study.contact) && (
                    <div className="flex flex-wrap gap-4 text-sm mb-6">
                      {study.timeline && (
                        <div className="bg-card rounded-lg px-4 py-2 border border-border">
                          <span className="text-muted-foreground">Timeline: </span>
                          <span className="font-semibold">{study.timeline}</span>
                        </div>
                      )}
                      {study.amount && (
                        <div className="bg-card rounded-lg px-4 py-2 border border-border">
                          <span className="text-muted-foreground">Grant Amount: </span>
                          <span className="font-semibold text-primary">{study.amount}</span>
                        </div>
                      )}
                      {study.contact && (
                        <div className="bg-card rounded-lg px-4 py-2 border border-border">
                          <span className="font-semibold text-primary">{study.contact}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Download Button */}
                  <Button variant="outline" className="w-full md:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Case Study PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to be our next case study?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start a free pilot and see similar results with your students
            </p>
            <Button asChild size="lg" variant="hero">
              <Link to="/pilot">
                Start Your Free 30-Day Pilot
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
