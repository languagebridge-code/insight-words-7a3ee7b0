import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Demo() {
  const coverageTopics = [
    "Live walkthrough of all features",
    "Q&A about your specific use case",
    "Custom pricing for your school size",
    "Grant funding options discussion",
    "Implementation timeline planning",
    "Technical requirements review"
  ];


  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              See LanguageBridge in <span className="gradient-text">Action</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              15-minute live demo with our team. See exactly how LanguageBridge works in your school
            </p>
          </div>
        </div>
      </section>

      {/* Two Options */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Pre-recorded Demo */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Option 1: Watch Pre-Recorded Demo</h2>
              </div>

              <div className="bg-muted/50 rounded-xl aspect-video mb-6 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">2-minute product overview</p>
                  <p className="text-sm text-muted-foreground">(Video embed coming soon)</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">See in this video:</p>
                <ul className="space-y-2">
                  {[
                    "How students highlight and translate",
                    "The voice-to-text feature in action",
                    "Teacher dashboard walkthrough",
                    "Deployment process overview"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" size="lg" className="w-full">
                <Play className="mr-2" />
                Watch Demo Video
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Want to see more?{" "}
                <button className="text-primary font-semibold hover:underline">
                  Schedule live demo →
                </button>
              </p>
            </div>

            {/* Live Demo */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border-2 border-primary/30">
              <h2 className="text-2xl font-bold mb-6">Option 2: Schedule Live Demo</h2>
              
              <div className="bg-card rounded-xl p-6 mb-6">
                <h3 className="font-bold mb-4">What We'll Cover:</h3>
                <ul className="space-y-3">
                  {coverageTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 mb-6">
                <h3 className="font-bold mb-3">Booking Details:</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <span className="font-semibold text-foreground">Duration:</span> 15 minutes</p>
                  <p>• <span className="font-semibold text-foreground">Format:</span> Zoom video call</p>
                  <p>• <span className="font-semibold text-foreground">Who:</span> Product founder or senior team member</p>
                  <p>• <span className="font-semibold text-foreground">When:</span> Available weekdays 9am-5pm EST</p>
                </div>
              </div>

              {/* Calendly Embed Placeholder */}
              <div className="bg-muted/50 rounded-xl p-8 mb-6 text-center border-2 border-dashed border-border">
                <p className="text-muted-foreground mb-4">
                  Calendly scheduling widget will appear here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  (Integration pending - please use contact form for now)
                </p>
                <Button variant="outline">
                  Contact to Schedule
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Prefer email? Reach us at:</p>
                <a href="mailto:contact@languagebridge.app" className="text-primary font-semibold hover:underline">
                  contact@languagebridge.app
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Demo FAQ</h2>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need to bring anyone else to the demo?",
                  a: "It's helpful to have your IT director if you have technical questions, but not required. Most people attend solo and share the recording with their team afterward."
                },
                {
                  q: "Will you try to sell me during the demo?",
                  a: "No. Our demos are educational. We show you the product, answer your questions, and provide pricing information. There's no pressure to commit."
                },
                {
                  q: "Can I record the demo to share with my team?",
                  a: "Yes! We encourage it. We can also send you a recording link afterward."
                },
                {
                  q: "What if I need to reschedule?",
                  a: "No problem. Just click the reschedule link in your confirmation email or contact us directly."
                },
                {
                  q: "Can I start a pilot right after the demo?",
                  a: "Absolutely! If you're ready to move forward, we can have you set up within 48 hours."
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
            <h2 className="text-3xl font-bold mb-6">Ready to See LanguageBridge?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your 15-minute demo or watch our pre-recorded overview now
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero">
                Schedule Live Demo
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2" />
                Watch Video Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
