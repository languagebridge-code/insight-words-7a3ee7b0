import { Pricing } from "@/components/Pricing";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Funding Options Section - Before Pricing */}
      <section className="pt-32 pb-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/20">
              <h2 className="text-3xl font-bold mb-4 text-center">
                🎓 Funding Options Available
              </h2>
              <p className="text-center text-muted-foreground mb-8 text-lg">
                Most schools don't pay out-of-pocket. Here's how schools typically fund LanguageBridge:
              </p>

              <div className="grid md:grid-cols-5 gap-4 mb-6">
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <div className="text-3xl mb-2">💵</div>
                  <h3 className="font-bold text-sm mb-1">Title III Funds</h3>
                  <p className="text-xs text-muted-foreground">English Language Acquisition allocation</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <div className="text-3xl mb-2">💵</div>
                  <h3 className="font-bold text-sm mb-1">IDEA Part B</h3>
                  <p className="text-xs text-muted-foreground">Assistive Technology budget line</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <div className="text-3xl mb-2">💵</div>
                  <h3 className="font-bold text-sm mb-1">General Fund</h3>
                  <p className="text-xs text-muted-foreground">Instructional Materials budget</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <div className="text-3xl mb-2">💵</div>
                  <h3 className="font-bold text-sm mb-1">Technology Levies</h3>
                  <p className="text-xs text-muted-foreground">Educational Software category</p>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border text-center">
                  <div className="text-3xl mb-2">💵</div>
                  <h3 className="font-bold text-sm mb-1">Community Grants</h3>
                  <p className="text-xs text-muted-foreground">Local foundations</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Need help identifying funding sources?
                </p>
                <Button asChild variant="outline" size="lg">
                  <Link to="/grants">View Grant Options & Download Templates</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Pricing Component */}
      <Pricing />

      {/* Extended ROI Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                📊 Total ROI for <span className="gradient-text">Administrators</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Beyond interpreter savings, LanguageBridge delivers:
              </p>
            </div>

            {/* ROI Benefit Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              <div className="bg-card rounded-xl p-6 border border-border text-center hover-scale">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="font-bold mb-2">Reduced Special Ed Referrals</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Avg. $8K saved per misdiagnosis avoided
                </p>
                <p className="text-2xl font-bold text-primary">$8K+</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center hover-scale">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="font-bold mb-2">Higher State Test Participation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  More students = more state funding allocation
                </p>
                <p className="text-2xl font-bold text-primary">$15K+</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center hover-scale">
                <div className="text-4xl mb-3">😊</div>
                <h3 className="font-bold mb-2">Improved Parent Satisfaction</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Fewer complaints to school board
                </p>
                <p className="text-2xl font-bold text-primary">Priceless</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center hover-scale">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-bold mb-2">Faster Title VI Compliance</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Avoid costly investigations
                </p>
                <p className="text-2xl font-bold text-primary">$50K+</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center hover-scale">
                <div className="text-4xl mb-3">⏰</div>
                <h3 className="font-bold mb-2">More Instructional Time</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Teachers teach instead of translate
                </p>
                <p className="text-2xl font-bold text-primary">12 hrs/wk</p>
              </div>
            </div>

            {/* Total Value Calculation */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-2xl p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-6">Complete Value Analysis</h3>
                
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <p className="text-sm text-muted-foreground mb-2">TOTAL ANNUAL VALUE</p>
                    <p className="text-4xl font-bold text-primary mb-2">$50K-100K</p>
                    <p className="text-sm text-muted-foreground">per building</p>
                  </div>
                  
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <p className="text-sm text-muted-foreground mb-2">YOUR COST</p>
                    <p className="text-4xl font-bold text-foreground mb-2">$2K-3.5K</p>
                    <p className="text-sm text-muted-foreground">per building</p>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-xl p-6 mb-6">
                  <p className="text-xl font-bold mb-2">
                    This isn't an expense. It's a <span className="text-primary">10-20x return on investment.</span>
                  </p>
                </div>

                <Button asChild size="lg" variant="hero">
                  <Link to="/roi-calculator">
                    Calculate Your School's ROI
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
