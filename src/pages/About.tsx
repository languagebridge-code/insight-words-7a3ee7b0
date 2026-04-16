import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { FounderCredibility } from "@/components/FounderCredibility";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Users, Lightbulb, MapPin, GraduationCap, Trophy, ExternalLink, Mail, Phone, Twitter, Newspaper } from "lucide-react";
import { useEffect } from "react";
import accelerateWin from "@/assets/accelerate-win.png";
import accelerateLogo from "@/assets/accelerate-logo.jpg";

const articles = [
  {
    title: "Advancing great ideas: LanguageBridge wins big at Accelerate Cleveland",
    outlet: "FreshWater Cleveland",
    author: "Angelina Bair",
    date: "March 17, 2026",
    excerpt:
      "LanguageBridge, an audio-first Chrome extension designed to help preliterate English learners access classroom content, won the 2026 Accelerate grand prize at the Cleveland Leadership Center pitch contest.",
    url: "https://www.freshwatercleveland.com/features/LanguageBridge-Wins-Big-At-Accelerate-Cleveland_031726.aspx",
  },
  {
    title: "Ideas accelerate at Cleveland Leadership Center competition",
    outlet: "Cleveland Jewish News",
    author: "Staff Report",
    date: "March 2026",
    excerpt:
      "The Cleveland Leadership Center's Accelerate competition showcased innovative ideas from across Northeast Ohio, with LanguageBridge taking the top prize for its mission to support ESL and SLIFE students.",
    url: "https://www.clevelandjewishnews.com/news/local_news/ideas-accelerate-at-cleveland-leadership-center-competition/article_0a02ffe6-3323-4fcd-93b9-4880f7186714.amp.html",
  },
];

export default function About() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LanguageBridge",
      "url": "https://www.languagebridge.app",
      "logo": "https://www.languagebridge.app/favicon.png",
      "description": "Audio-first language accessibility tools for preliterate ESL/SLIFE students in K-12 classrooms.",
      "founder": {
        "@type": "Person",
        "name": "Justin Bernard",
        "jobTitle": "Founder",
        "honorificSuffix": "M.Ed."
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "25000 Euclid Ave, Suite 108",
        "addressLocality": "Euclid",
        "addressRegion": "OH",
        "postalCode": "44117",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-216-800-6020",
        "email": "contact@languagebridge.app",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://x.com/_languagebridge"
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "organization-schema";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("organization-schema")?.remove();
    };
  }, []);

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

      {/* Award Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Trophy className="w-4 h-4" />
                Awards & Press
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Award-Winning Technology
              </h2>
            </div>

            {/* Award Feature */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                <div className="flex-shrink-0 w-full md:w-72 lg:w-80">
                  <img
                    src={accelerateWin}
                    alt="LanguageBridge team receiving $5,000 grand prize check at the 2026 Accelerate pitch contest"
                    className="rounded-xl shadow-lg w-full h-auto"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                    <img src={accelerateLogo} alt="Cleveland Leadership Center Accelerate" className="h-12 w-auto" />
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                        2026 Grand Prize Winner
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    LanguageBridge took home the <strong className="text-foreground">$5,000 grand prize</strong> at the 2026 Cleveland Leadership Center Accelerate Citizens Make Change competition — recognized for our innovative approach to language accessibility in K-12 classrooms.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                    <li className="flex items-start gap-2 justify-center md:justify-start">
                      <span className="text-primary font-bold">→</span>
                      <span>Adding <strong className="text-foreground">Dari and Nepali</strong> language support</span>
                    </li>
                    <li className="flex items-start gap-2 justify-center md:justify-start">
                      <span className="text-primary font-bold">→</span>
                      <span>Building <strong className="text-foreground">LanguageBridge for iPads</strong></span>
                    </li>
                    <li className="flex items-start gap-2 justify-center md:justify-start">
                      <span className="text-primary font-bold">→</span>
                      <span>Becoming an official <strong className="text-foreground">Ohio TESOL conference sponsor</strong></span>
                    </li>
                  </ul>
                  <a
                    href="https://www.cleveleads.org/2026-accelerate-citizens-make-change-winners-announced/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Read the announcement
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Press Coverage */}
            <h3 className="text-2xl font-bold mb-2">Press Coverage</h3>
            <p className="text-muted-foreground text-sm mb-6">Articles and news features about LanguageBridge.</p>
            <div className="space-y-6 mb-12">
              {articles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card className="border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-primary mb-2">
                            {article.outlet} · {article.date}
                          </p>
                          <h4 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {article.excerpt}
                          </p>
                          <p className="text-xs text-muted-foreground mt-3">
                            By {article.author}
                          </p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            {/* Media Inquiries */}
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold mb-3">Media Inquiries</h3>
              <p className="text-muted-foreground mb-8">
                For press inquiries, interviews, or media requests, please reach out to our team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="mailto:contact@languagebridge.app" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                  <Mail className="w-5 h-5" />
                  contact@languagebridge.app
                </a>
                <a href="tel:+12168006020" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                  <Phone className="w-5 h-5" />
                  (216) 800-6020
                </a>
                <a href="https://x.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium">
                  <Twitter className="w-5 h-5" />
                  @_languagebridge
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
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
      <section className="py-20 bg-muted/30">
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
      <section className="py-20">
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
                  We're working with local school districts for the 2025-2026 school year, partnering directly with ESL teachers, compliance officers, and IT departments to refine our platform for real-world classroom needs.
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
      <section className="py-20 bg-muted/30">
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
      <section className="py-20">
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
                      <h3 className="text-xl font-bold mb-2">2025-2026: Ohio School Launch</h3>
                      <p className="text-muted-foreground">
                        Working with Ohio school districts to refine the platform with real classroom feedback.
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Help us ensure every preliterate SLIFE student has access to education from day one
          </p>
          <div className="flex gap-4 justify-center">
            <a href="mailto:contact@languagebridge.app">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
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