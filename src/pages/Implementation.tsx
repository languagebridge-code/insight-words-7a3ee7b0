import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Clock, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export default function Implementation() {
  const timeline = [
    {
      day: "Day 1",
      title: "Setup",
      duration: "2 hours total",
      tasks: [
        {
          who: "IT Director",
          what: "Install extension via Google Admin Console",
          time: "30 minutes",
          details: "Push extension to student Chromebooks using our deployment guide"
        },
        {
          who: "LanguageBridge Team",
          what: "Configure language preferences",
          time: "30 minutes",
          details: "We set up your supported languages based on your student population"
        },
        {
          who: "Teachers",
          what: "Complete onboarding video",
          time: "30 minutes",
          details: "Watch training on how to support students using LanguageBridge"
        }
      ]
    },
    {
      day: "Day 2",
      title: "Launch",
      duration: "1 hour",
      tasks: [
        {
          who: "Students",
          what: "Watch 5-minute tutorial",
          time: "5 minutes",
          details: "Tutorial available in their native language showing how to use the tool"
        },
        {
          who: "Teachers",
          what: "Demo in first-period class",
          time: "15 minutes",
          details: "Show students how to highlight and translate, answer questions"
        },
        {
          who: "Students",
          what: "Start using independently",
          time: "Ongoing",
          details: "Students can now use LanguageBridge across all their classes"
        }
      ]
    },
    {
      day: "Week 1",
      title: "Support",
      duration: "Ongoing",
      tasks: [
        {
          who: "Success Manager",
          what: "Daily check-ins",
          time: "15 min/day",
          details: "Quick troubleshooting and support during first week"
        },
        {
          who: "Teachers",
          what: "Monitor usage",
          time: "Ongoing",
          details: "Check that students are successfully using the tool"
        },
        {
          who: "LanguageBridge Team",
          what: "Collect initial feedback",
          time: "30 minutes",
          details: "End-of-week survey to ensure smooth rollout"
        }
      ]
    },
    {
      day: "Ongoing",
      title: "Monitor & Optimize",
      duration: "Monthly",
      tasks: [
        {
          who: "Success Manager",
          what: "Monthly usage reports",
          time: "Automated",
          details: "Dashboard showing translations, active users, and engagement"
        },
        {
          who: "Admin",
          what: "Quarterly strategy calls",
          time: "30 minutes",
          details: "Review data, discuss expansion, optimize implementation"
        },
        {
          who: "Product Team",
          what: "Direct feedback line",
          time: "As needed",
          details: "Direct access to our product team for feature requests"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              From Purchase to Impact in <span className="gradient-text">48 Hours</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Unlike typical EdTech that takes months, LanguageBridge is working in 2 days
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">2 hrs</p>
              <p className="text-sm text-muted-foreground">IT Setup Time</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">5 min</p>
              <p className="text-sm text-muted-foreground">Student Training</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">48 hrs</p>
              <p className="text-sm text-muted-foreground">Total Timeline</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">0</p>
              <p className="text-sm text-muted-foreground">Special Hardware</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Complete Implementation Timeline
            </h2>

            <div className="space-y-12">
              {timeline.map((phase, index) => (
                <div key={index} className="relative">
                  {/* Timeline connector */}
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-20 bottom-0 w-0.5 bg-primary/20" />
                  )}

                  <div className="flex gap-6">
                    {/* Day indicator */}
                    <div className="flex-shrink-0">
                      <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center font-bold relative z-10">
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{phase.day}: {phase.title}</h3>
                            <p className="text-sm text-primary font-semibold flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {phase.duration}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {phase.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="bg-secondary/30 rounded-xl p-4 flex gap-4">
                              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <p className="font-bold">{task.what}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                      <Users className="w-3 h-3" />
                                      {task.who}
                                    </p>
                                  </div>
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                    {task.time}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{task.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IT Requirements */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              IT Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold">Required</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Chromebooks running Chrome OS",
                    "Google Admin Console access",
                    "Internet connection",
                    "Chrome Web Store access"
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-secondary p-2 rounded-lg">
                    <Settings className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-bold">NOT Required</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "No special network configuration",
                    "No additional hardware",
                    "No server setup",
                    "No firewall changes (in most cases)"
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground text-sm">✗</span>
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Training */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Teacher Training
            </h2>

            <div className="bg-card rounded-2xl p-8 border border-border mb-8">
              <h3 className="text-xl font-bold mb-4">30-Minute Onboarding Video</h3>
              <p className="text-muted-foreground mb-6">
                Teachers watch a comprehensive training video covering everything they need to know to support students using LanguageBridge.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-3">Topics Covered:</h4>
                  <ul className="space-y-2">
                    {[
                      "How LanguageBridge works",
                      "Student use cases and scenarios",
                      "Troubleshooting common issues",
                      "Best practices for classroom integration"
                    ].map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3">Additional Resources:</h4>
                  <ul className="space-y-2">
                    {[
                      "Quick reference guide (PDF)",
                      "FAQ document",
                      "Email support access",
                      "Weekly office hours (optional)"
                    ].map((resource, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Onboarding */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Student Onboarding
            </h2>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-xl font-bold mb-4">5-Minute Tutorial Video</h3>
              <p className="text-muted-foreground mb-6">
                Students watch a short, engaging tutorial showing them exactly how to use LanguageBridge. The video is available in all supported languages.
              </p>

              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 mb-6">
                <h4 className="font-bold mb-3">Tutorial Shows Students:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    {[
                      "How to highlight text for translation",
                      "How to use voice-to-text feature",
                      "How to change languages"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {[
                      "When to use LanguageBridge",
                      "How to ask for help",
                      "Tips for best results"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>No prerequisite knowledge needed.</strong> Students can start using LanguageBridge immediately after the 5-minute tutorial, even if they're not comfortable with technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support During Implementation */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Support During Implementation
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-2">Response time: &lt;4 hours</p>
                <p className="text-xs text-muted-foreground">During school hours (8am-5pm EST)</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-2">Available during school hours</p>
                <p className="text-xs text-muted-foreground">(216) 800-6020</p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Screen-Share</h3>
                <p className="text-sm text-muted-foreground mb-2">Troubleshooting available</p>
                <p className="text-xs text-muted-foreground">Schedule as needed</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border-2 border-primary/20 mt-8 text-center">
              <p className="text-lg font-semibold mb-2">Enterprise Tier Bonus:</p>
              <p className="text-muted-foreground">Dedicated success manager for personalized support throughout implementation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Download Complete Implementation Guide
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get our detailed PDF playbook with checklists, timelines, and best practices
            </p>
            <Button size="lg" variant="hero">
              <Download className="mr-2" />
              Download Implementation Playbook (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your free pilot and see how fast implementation really is
            </p>
            <Button asChild size="lg" variant="hero">
              <Link to="/pilot">Start Free 30-Day Pilot</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
