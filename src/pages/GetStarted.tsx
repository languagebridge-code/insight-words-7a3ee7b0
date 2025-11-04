import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Calendar, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function GetStarted() {
  const [hasBudget, setHasBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [recommendedPath, setRecommendedPath] = useState<number | null>(null);

  const handleDecisionHelper = () => {
    // Simple logic for recommendations
    if (hasBudget === "yes" && timeline === "this-month") {
      setRecommendedPath(1); // Free Pilot
    } else if (hasBudget === "no" || hasBudget === "not-sure") {
      setRecommendedPath(3); // Download Grants
    } else if (hasBudget === "yes") {
      setRecommendedPath(2); // Schedule Demo
    } else {
      setRecommendedPath(1); // Default to pilot
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get LanguageBridge in <span className="gradient-text">Your School</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Three simple ways to start today—choose the path that works best for you
            </p>
          </div>
        </div>
      </section>

      {/* Three Clear Paths */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Path 1: Free Pilot */}
            <div className={`bg-card rounded-2xl p-8 border-2 ${recommendedPath === 1 ? 'border-primary shadow-lg' : 'border-border'} hover-scale relative`}>
              {recommendedPath === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ Recommended for You
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Path 1: Start Free Pilot</h2>
                <p className="text-sm text-primary font-semibold mb-4">RECOMMENDED</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-bold mb-2">Perfect if you want to:</h3>
                  <p className="text-sm text-muted-foreground">Try before committing with real students and real results</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">What you get:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30 days free access</li>
                    <li>• Up to 50 students</li>
                    <li>• Full implementation support</li>
                    <li>• Usage analytics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Timeline:</h3>
                  <p className="text-sm text-primary font-semibold">Live in 48 hours</p>
                </div>
              </div>

              <Button asChild variant="hero" size="lg" className="w-full">
                <Link to="/pilot">
                  Apply for Free Pilot
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>

            {/* Path 2: Schedule Demo */}
            <div className={`bg-card rounded-2xl p-8 border-2 ${recommendedPath === 2 ? 'border-primary shadow-lg' : 'border-border'} hover-scale relative`}>
              {recommendedPath === 2 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ Recommended for You
                </div>
              )}

              <div className="text-center mb-6">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Path 2: Schedule Live Demo</h2>
                <p className="text-sm text-muted-foreground mb-4">See it first</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-bold mb-2">Perfect if you want to:</h3>
                  <p className="text-sm text-muted-foreground">See the product before starting a pilot</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">What you get:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 15-minute product tour</li>
                    <li>• Q&A with founder</li>
                    <li>• Custom pricing quote</li>
                    <li>• Grant funding guidance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Timeline:</h3>
                  <p className="text-sm text-primary font-semibold">Book any day this week</p>
                </div>
              </div>

              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/demo">
                  Book Demo
                  <Calendar className="ml-2" />
                </Link>
              </Button>
            </div>

            {/* Path 3: Download Grants */}
            <div className={`bg-card rounded-2xl p-8 border-2 ${recommendedPath === 3 ? 'border-primary shadow-lg' : 'border-border'} hover-scale relative`}>
              {recommendedPath === 3 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  ⭐ Recommended for You
                </div>
              )}

              <div className="text-center mb-6">
                <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Path 3: Download Grant Templates</h2>
                <p className="text-sm text-muted-foreground mb-4">Secure funding first</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-bold mb-2">Perfect if you need to:</h3>
                  <p className="text-sm text-muted-foreground">Get budget approval before starting</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2">What you get:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pre-written grant applications</li>
                    <li>• Budget justifications</li>
                    <li>• ROI calculators</li>
                    <li>• Letter templates</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Timeline:</h3>
                  <p className="text-sm text-primary font-semibold">Download in 2 minutes</p>
                </div>
              </div>

              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/grants">
                  Get Templates
                  <Download className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Helper */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <h2 className="text-3xl font-bold mb-6 text-center">Not sure which path is right?</h2>
              <p className="text-center text-muted-foreground mb-8">Answer 2 quick questions:</p>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Question 1: Do you have budget approved?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['yes', 'no', 'not-sure'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setHasBudget(option)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          hasBudget === option
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                      >
                        {option === 'yes' ? 'Yes' : option === 'no' ? 'No' : 'Not Sure'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Question 2: How soon do you need this?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'this-month', label: 'This Month' },
                      { value: 'this-semester', label: 'This Semester' },
                      { value: 'next-year', label: 'Next Year' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTimeline(option.value)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          timeline === option.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDecisionHelper}
                disabled={!hasBudget || !timeline}
                size="lg"
                className="w-full gradient-primary text-white"
              >
                Show Me My Best Path
                <ArrowRight className="ml-2" />
              </Button>

              {recommendedPath && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Based on your answers, we recommend:{" "}
                    <span className="font-bold text-primary">
                      Path {recommendedPath} -{" "}
                      {recommendedPath === 1 ? "Free Pilot" : recommendedPath === 2 ? "Schedule Demo" : "Grant Templates"}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Scroll up to see your recommended path highlighted
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Compare Your Options</h2>
            
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left p-4 font-bold">Feature</th>
                      <th className="text-center p-4 font-bold">Free Pilot</th>
                      <th className="text-center p-4 font-bold">Demo</th>
                      <th className="text-center p-4 font-bold">Grant Templates</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="p-4">Time to Start</td>
                      <td className="text-center p-4 text-primary font-bold">48 hours</td>
                      <td className="text-center p-4">Same week</td>
                      <td className="text-center p-4">2 minutes</td>
                    </tr>
                    <tr className="border-t border-border bg-secondary/30">
                      <td className="p-4">See Product Live</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">-</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">Test with Students</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">-</td>
                      <td className="text-center p-4">-</td>
                    </tr>
                    <tr className="border-t border-border bg-secondary/30">
                      <td className="p-4">Get Pricing</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">-</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-4">Grant Support</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                      <td className="text-center p-4">✓</td>
                    </tr>
                    <tr className="border-t border-border bg-secondary/30">
                      <td className="p-4">Best For</td>
                      <td className="text-center p-4 text-sm">Ready to try</td>
                      <td className="text-center p-4 text-sm">Want to see first</td>
                      <td className="text-center p-4 text-sm">Need funding</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "Can I do more than one of these paths?",
                  a: "Absolutely! Many schools start with a demo, then do a pilot, then apply for grants to fund the full deployment."
                },
                {
                  q: "Do I need IT approval before starting?",
                  a: "For a pilot, we recommend checking with your IT director since they'll need to deploy the Chrome extension. For a demo or downloading templates, no IT approval needed."
                },
                {
                  q: "How long does each path take?",
                  a: "Free Pilot: Live in 48 hours. Demo: Book within the week. Grant Templates: Instant download. Full funding approval: 30-90 days depending on grant type."
                },
                {
                  q: "What happens after the free pilot?",
                  a: "Nothing automatic! We'll check in near the end. If you want to continue, we'll send pricing options. If not, the extension simply stops working."
                },
                {
                  q: "Can I start a pilot while applying for grants?",
                  a: "Yes! This is actually our recommended approach. Pilot data strengthens your grant application significantly."
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

      {/* Final CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Choose your path and bring LanguageBridge to your students today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/pilot">Start Free Pilot</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/demo">Schedule Demo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/grants">Get Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
