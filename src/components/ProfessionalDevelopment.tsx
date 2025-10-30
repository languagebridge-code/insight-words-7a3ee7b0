import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Lightbulb, HeadphonesIcon } from "lucide-react";

export const ProfessionalDevelopment = () => {
  return (
    <section id="professional-development" className="py-24 px-4 bg-peach/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Bring LanguageBridge to <span className="gradient-text">Your Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a demonstration at your next professional development session
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 fade-in-up delay-200">
          <Card className="p-6 text-center hover-scale">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Live Walkthrough</h3>
            <p className="text-sm text-muted-foreground">
              See all features in action with real examples
            </p>
          </Card>

          <Card className="p-6 text-center hover-scale">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Hands-On Practice</h3>
            <p className="text-sm text-muted-foreground">
              Teachers get time to explore and practice themselves
            </p>
          </Card>

          <Card className="p-6 text-center hover-scale">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Implementation Roadmap</h3>
            <p className="text-sm text-muted-foreground">
              Clear plan for rolling out to your students
            </p>
          </Card>

          <Card className="p-6 text-center hover-scale">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <HeadphonesIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Ongoing Support</h3>
            <p className="text-sm text-muted-foreground">
              Q&A with our team and continued assistance
            </p>
          </Card>
        </div>

        <Card className="p-8 md:p-12 gradient-primary text-white text-center fade-in-up delay-300">
          <h3 className="text-3xl font-bold mb-4">Special for Ohio Schools</h3>
          <p className="text-xl mb-8 opacity-95">
            We'll come to you! In-person PD sessions available for Ohio districts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-white text-deep-purple hover:bg-white/90 border-0">
              Schedule Your Ohio PD Demo
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white border-2 border-white hover:bg-white/10"
            >
              Download PD Overview
            </Button>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-2">
            Most PD sessions are 60-90 minutes and can be scheduled during your existing in-service days
          </p>
          <p className="text-sm text-muted-foreground">
            Available Monday-Friday, 8am-5pm EST | Contact us for evening or weekend sessions
          </p>
        </div>
      </div>
    </section>
  );
};
