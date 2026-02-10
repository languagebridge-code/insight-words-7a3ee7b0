import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";

export default function CaseStudies() {

  return (
    <div className="min-h-screen">
      <PageMeta title="Case Studies - ELL Student Success Stories" description="See how LanguageBridge helps English language learners succeed in the classroom. Real stories from Ohio pilot schools and measurable outcomes." />
      <Navigation />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Case Studies <span className="gradient-text">Coming Soon</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real results from our Ohio pilot schools will be shared here starting January 2026
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Placeholder */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl p-12 border border-border shadow-lg">
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-2xl font-bold mb-4">Case Studies Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                We're launching our Ohio pilot program in January 2026. Real case studies with measurable outcomes will be published here as we gather data from participating schools.
              </p>
              <Button asChild variant="hero">
                <Link to="/pilot">Join the Pilot Program</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Pilot CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-accent text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
                🔬 SEEKING PILOT DISTRICTS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Help Us Build the Research Base
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We're looking for school districts to participate in formal effectiveness studies. In exchange for participating in our research, you'll receive:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card rounded-xl p-6 border-2 border-primary/30">
                <h3 className="text-xl font-bold mb-4 text-primary">✓ Special Pilot Pricing</h3>
                <p className="text-muted-foreground">Discounted rates for the duration of the research study (minimum 1 academic year)</p>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-primary/30">
                <h3 className="text-xl font-bold mb-4 text-primary">✓ Unlimited Translations</h3>
                <p className="text-muted-foreground">No caps on usage. Students can translate as much as they need, every day</p>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-primary/30">
                <h3 className="text-xl font-bold mb-4 text-primary">✓ Priority Support</h3>
                <p className="text-muted-foreground">Direct access to our research and product teams throughout the study</p>
              </div>

              <div className="bg-card rounded-xl p-6 border-2 border-primary/30">
                <h3 className="text-xl font-bold mb-4 text-primary">✓ Detailed Analytics</h3>
                <p className="text-muted-foreground">Comprehensive data reports showing impact on your specific student population</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h3 className="text-xl font-bold mb-4">What We're Measuring:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Academic achievement gains (grades, test scores, assignment completion)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Student engagement and classroom participation rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Reduction in special education referrals for ELL students</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Teacher time savings and satisfaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Cost savings vs. traditional interpreter services</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold mb-4">
                Ideal districts have 25+ ELL students and can commit to data collection for one school year
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="hero">
                  <Link to="/pilot">Apply for Research Pilot</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Contact Us for Details</Link>
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
