import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { FounderCredibility } from "@/components/FounderCredibility";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Heart, Users, Lightbulb, MapPin, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <PageMeta
        title="About Us - Our Mission to Support ELL Students"
        description="Learn about LanguageBridge's mission to break language barriers for preliterate ESL students with audio-first accessibility tools built for K-12 classrooms."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Built by Educators, For Educators
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Help every student understand, even those who can't read yet
            </p>
            <p className="text-lg text-muted-foreground">
              LanguageBridge™ is breaking down language barriers for the most vulnerable learners across Ohio and beyond
            </p>
          </div>
        </div>
      </section>

      <FounderCredibility />

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Target className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To ensure every preliterate SLIFE student can access grade-level education from day one, not months or years later. We're building the tools that help the most vulnerable English Language Learners succeed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Lightbulb className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    A future where language barriers never prevent students from reaching their full potential. Where preliterate refugee students have the same access to learning as their English-speaking peers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why LanguageBridge Exists */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why LanguageBridge Exists
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                In classrooms across America, preliterate Students with Limited or Interrupted Formal Education (SLIFE) sit silently, not because they lack curiosity or intelligence, but because they cannot access the content being taught.
              </p>
              
              <p>
                These students, often refugees and newcomers who have experienced trauma and disrupted schooling, face a unique challenge: <strong className="text-foreground">they cannot read in any language yet</strong>, including their home language.
              </p>
              
              <p>
                Existing translation tools assume literacy. Google Translate, Read&Write, and similar platforms require students to read the translated text. For preliterate SLIFE students, these tools provide zero benefit.
              </p>
              
              <p>
                Schools respond with workarounds: pulling other students from class to interpret (violating privacy), simplifying curriculum (lowering expectations), or waiting months for students to develop basic English literacy (falling further behind).
              </p>
              
              <p className="text-foreground font-semibold">
                LanguageBridge was built to solve this specific problem.
              </p>
              
              <p>
                By combining real-time translation with audio playback, teacher communication tools, and tiered academic vocabulary support, LanguageBridge gives preliterate SLIFE students immediate access to grade-level content on day one, not months later.
              </p>
            </div>

            <div className="mt-12 p-8 bg-primary/10 rounded-2xl border border-primary/20">
              <Heart className="w-12 h-12 text-primary mb-4 mx-auto" />
              <p className="text-center text-lg">
                <strong className="text-foreground">"I built LanguageBridge because I saw students like Amira being left behind every single day. I knew there had to be a better way."</strong>
              </p>
              <p className="text-center text-muted-foreground mt-2">
                Justin Bernard, M.Ed., Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We're Based */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Based in Northeast Ohio
              </h2>
              <p className="text-xl text-muted-foreground">
                Serving school districts across the state and beyond
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <p className="text-lg text-muted-foreground mb-4">
                  LanguageBridge was founded in Northeast Ohio, where communities have welcomed thousands of refugee students in recent years, including significant populations of Afghan refugees following the 2021 withdrawal.
                </p>
                
                <p className="text-lg text-muted-foreground mb-4">
                  We're piloting with local school districts for the 2025-2026 school year, working directly with ESL teachers, compliance officers, and IT departments to refine our platform for real-world classroom needs.
                </p>
                
                <p className="text-lg text-muted-foreground">
                  While we started in Ohio, our mission extends nationwide. Every school district with preliterate SLIFE students can benefit from purpose-built language accessibility tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Core Values
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Education First</h3>
                  <p className="text-muted-foreground">
                    Every decision is guided by what helps students learn. Not what's easy to build or profitable to sell. What actually works in classrooms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Student Dignity</h3>
                  <p className="text-muted-foreground">
                    No more pulling students from class to interpret. No more simplified worksheets. Students deserve tools that respect their intelligence and privacy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Educator Partnership</h3>
                  <p className="text-muted-foreground">
                    We build WITH teachers, not FOR them. Every feature is tested in real classrooms with real feedback from ESL educators.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              What's Next
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">2025-2026: Ohio Pilot Program</h3>
                      <p className="text-muted-foreground">
                        Working with selected Ohio school districts to refine the platform with real classroom feedback. Free access in exchange for helping us improve.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">2026-2027: Nationwide Expansion</h3>
                      <p className="text-muted-foreground">
                        Opening LanguageBridge to districts across the United States. Every school with preliterate SLIFE students deserves access to these tools.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Future: Additional Languages & Features</h3>
                      <p className="text-muted-foreground">
                        Expanding language support based on district needs. Adding offline capabilities for rural schools. Building tools that make language accessibility seamless and universal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help us ensure every preliterate SLIFE student has access to education from day one
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/pilot">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Apply for 2025-2026 Pilot
              </Button>
            </Link>
            <a href="mailto:contact@languagebridge.app">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
