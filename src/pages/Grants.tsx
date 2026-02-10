import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";

export default function Grants() {
  const [selectedStudents, setSelectedStudents] = useState("");
  const [selectedNeed, setSelectedNeed] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleQuizSubmit = () => {
    setShowRecommendations(true);
    document.getElementById('grants-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const grants = [
    {
      title: "Title III",
      badge: "EASIEST",
      badgeColor: "bg-green-500",
      funding: "Use your existing allocation",
      timeline: "Approved within 30 days",
      eligibility: "Any school with ELL students",
      bestFor: "Language access tools & services",
      provides: [
        "Pre-written budget justification",
        "Alignment with Title III priorities",
        "Sample language",
        "Letters of support"
      ],
      link: "/grants/title-iii"
    },
    {
      title: "Title VI",
      badge: "EASY",
      badgeColor: "bg-green-500",
      funding: "$5K-50K per application",
      timeline: "60-90 days",
      eligibility: "Schools facing compliance issues",
      bestFor: "Solving language access violations",
      provides: [
        "Compliance gap analysis template",
        "Title VI solution documentation",
        "ROI showing cost vs legal fees",
        "Implementation timeline"
      ],
      link: "/grants/title-vi"
    },
    {
      title: "IDEA Part B",
      badge: "MODERATE",
      badgeColor: "bg-yellow-500",
      funding: "Use your existing allocation",
      timeline: "IEP meeting approval",
      eligibility: "Students with IEPs",
      bestFor: "ELL students also in special ed",
      provides: [
        "IEP accommodation language template",
        "Assistive tech justification",
        "Multi-modal learning support docs",
        "Training plan for IEP teams"
      ],
      link: "/grants/idea"
    },
    {
      title: "ESSA",
      badge: "MODERATE",
      badgeColor: "bg-yellow-500",
      funding: "$10K-100K",
      timeline: "90-120 days",
      eligibility: "Title I schools",
      bestFor: "Interventions with proven results",
      provides: [
        "Research evidence from pilots",
        "ESSA evidence tier qualification",
        "Logic model template",
        "Evaluation plan"
      ],
      link: "/grants/essa"
    },
    {
      title: "State Innovation Grants",
      badge: "VARIES BY STATE",
      badgeColor: "bg-blue-500",
      funding: "$5K-50K",
      timeline: "60-90 days",
      eligibility: "Public schools in participating states",
      bestFor: "Innovative EdTech pilots",
      provides: [
        "Innovation narrative template",
        "Scalability plan",
        "Sustainability strategy",
        "Partnership letters"
      ],
      link: "#"
    },
    {
      title: "Local Foundation Grants",
      badge: "EASY",
      badgeColor: "bg-green-500",
      funding: "$2K-25K",
      timeline: "30-60 days",
      eligibility: "Schools in foundation's service area",
      bestFor: "Quick funding, community impact",
      provides: [
        "Community impact narrative",
        "Student success stories",
        "Local data on refugee populations",
        "Foundation-specific tips"
      ],
      link: "#"
    }
  ];

  const processSteps = [
    {
      number: "1",
      title: "Download Templates",
      subtitle: "(Today)",
      duration: "5 minutes"
    },
    {
      number: "2",
      title: "Customize for Your District",
      subtitle: "(This Week)",
      duration: "2-4 hours"
    },
    {
      number: "3",
      title: "Submit Application",
      subtitle: "(Next Week)",
      duration: "30 minutes"
    },
    {
      number: "4",
      title: "Wait for Approval",
      subtitle: "(30-90 Days)",
      duration: ""
    },
    {
      number: "5",
      title: "Receive Funding & Purchase",
      subtitle: "(Same Day)",
      duration: "48 hours to deploy"
    }
  ];

  // Success stories will be added after pilot program launches in January 2026
  const successStories: any[] = [];

  const faqs = [
    {
      q: "Can I apply for multiple grants at once?",
      a: "Yes! Many schools layer funding from multiple sources. For example, you might use Title III for the base subscription and IDEA Part B for specific special education students. Our templates help you coordinate multiple applications without duplication."
    },
    {
      q: "What if our grant application gets rejected?",
      a: "We'll help you revise and reapply. Grant rejections are often due to minor technical issues, not the merit of the project. We provide feedback review services and help strengthen your resubmission at no additional cost."
    },
    {
      q: "Do you help us write the actual application?",
      a: "Yes! We provide pre-written templates for all major grant types. You simply customize them with your school's specific data. For districts needing more support, we offer grant consultation services where our team walks you through the entire process."
    },
    {
      q: "How much of our grant can we use for LanguageBridge?",
      a: "Title III: 100% eligible as supplemental language services. IDEA Part B: 100% eligible as assistive technology. Title VI: 100% eligible as compliance solution. ESSA: Typically 50-70% for the tool, 30-50% for evaluation. Local/State: Varies by grant, typically 80-100%."
    },
    {
      q: "What if we don't have time to write a grant right now?",
      a: "Start with a free 30-day pilot using your general fund or technology budget. Once you see results with your students, you'll have compelling data to include in your grant application. Many schools fund the first year out-of-pocket, then use grants for renewal."
    },
    {
      q: "Can we hire someone to write the grant for us?",
      a: "Yes, grant writing consultants typically charge $1,000-5,000 depending on the grant size. We maintain a list of grant writers who specialize in education technology and are familiar with LanguageBridge. Contact us for referrals."
    }
  ];

  return (
    <div className="min-h-screen">
      <PageMeta title="Grant Funding Guide for ELL Tools" description="Fund LanguageBridge with Title III, Title VI, IDEA, or ESSA grants. Free templates, budget justification letters, and step-by-step application guides." />
      <Navigation />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              💰 Fund LanguageBridge with <span className="gradient-text">Federal & State Grants</span>
            </h1>
            <p className="text-2xl font-semibold mb-4 text-foreground">
              We've Already Written the Applications for You
            </p>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              LanguageBridge qualifies for 8+ education grants. Download our pre-written templates, customize for your district, and submit. Most schools fund 100% of their LanguageBridge subscription through grants.
            </p>
            
            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-4xl font-bold text-primary mb-2">$3,500</p>
                <p className="text-muted-foreground">estimated annual cost per school</p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <p className="text-4xl font-bold text-primary mb-2">30-60 days</p>
                <p className="text-muted-foreground">typical grant timeline</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                Download All Grant Templates (Free)
                <Download className="ml-2 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/grants/consultation">
                  Schedule Grant Consultation
                  <Calendar className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Finder Quiz */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🔍 Which Grant is Right for Your School?
              </h2>
              <p className="text-muted-foreground">Answer 3 quick questions to find out:</p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">How many ELL students do you have?</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                  value={selectedStudents}
                  onChange={(e) => setSelectedStudents(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="10-50">10-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">What's your primary need?</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                  value={selectedNeed}
                  onChange={(e) => setSelectedNeed(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="language">Language access</option>
                  <option value="compliance">Title VI compliance</option>
                  <option value="assistive">Assistive technology</option>
                  <option value="intervention">Evidence-based intervention</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">When do you need funding?</label>
                <select 
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                  value={selectedTiming}
                  onChange={(e) => setSelectedTiming(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="next-year">Next fiscal year</option>
                  <option value="this-year">This school year</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleQuizSubmit}
                disabled={!selectedStudents || !selectedNeed || !selectedTiming}
              >
                Show Me My Best Grants
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Grants Grid */}
      <section id="grants-grid" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Available Grant Programs
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {grants.map((grant, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-lg border border-border hover-scale">
                <div className="mb-4">
                  <Badge className={`${grant.badgeColor} text-white mb-2`}>{grant.badge}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{grant.title}</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Funding Amount</p>
                    <p className="font-semibold">{grant.funding}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{grant.timeline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Eligibility</p>
                    <p className="font-semibold">{grant.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best For</p>
                    <p className="font-semibold">{grant.bestFor}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">What We Provide:</p>
                  <ul className="space-y-1">
                    {grant.provides.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {grant.link !== "#" ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link to={grant.link}>
                      Learn More & Download Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            🚀 How the Grant Process Works
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-primary/20" style={{ top: '3rem' }}></div>
              
              <div className="grid md:grid-cols-5 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative text-center">
                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 relative z-10 border-4 border-background">
                      {step.number}
                    </div>
                    <h3 className="font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{step.subtitle}</p>
                    {step.duration && <p className="text-xs text-primary font-semibold">{step.duration}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ✅ Success Stories Coming January 2026
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            We're launching our Ohio pilot program in January 2026. Success stories from schools that fund LanguageBridge through grants will be shared here.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Download Templates */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4">📥 Download All Templates</h3>
              <form className="space-y-4">
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
                <select className="w-full px-4 py-3 rounded-lg border border-border bg-background">
                  <option value="">Which grant interests you?</option>
                  <option value="title-iii">Title III</option>
                  <option value="title-vi">Title VI</option>
                  <option value="idea">IDEA Part B</option>
                  <option value="essa">ESSA</option>
                  <option value="all">All of them</option>
                </select>
                <Button className="w-full" size="lg">
                  Download Templates
                  <Download className="ml-2" />
                </Button>
              </form>
            </div>

            {/* Schedule Consultation */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold mb-4">📞 Schedule Grant Consultation</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>30-minute call with grant specialist</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Identify best grants for your situation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Review your draft application</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Get timeline and next steps</span>
                </li>
              </ul>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/grants/consultation">
                  Book Free Consultation
                  <Calendar className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Alternate Funding Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">💡 Not Ready for Grants Yet?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">Start Free Pilot</h3>
                <p className="text-sm text-muted-foreground mb-4">Try for 30 days, then apply for grants with real data</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pilot">Apply for Pilot</Link>
                </Button>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">Use General Fund</h3>
                <p className="text-sm text-muted-foreground mb-4">Start now with your technology or instructional budget</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">Partner with Us</h3>
                <p className="text-sm text-muted-foreground mb-4">Join our partnership program for free access</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
