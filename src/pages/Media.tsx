import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Newspaper, Mail, Phone, Twitter, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

const Media = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Media | LanguageBridge"
        description="Press coverage, articles, and media inquiries for LanguageBridge — the first Language Accessibility Screen Reader for ESL students."
      />
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4" />
              Press & Media
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Media</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Articles, press coverage, and news about LanguageBridge and our mission to support preliterate English language learners.
            </p>
          </div>

          {/* Articles */}
          <div className="max-w-3xl mx-auto mb-20 space-y-6">
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
                        <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>
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

          {/* Media Inquiry */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border/50 p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold mb-3">Media Inquiries</h2>
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
      </main>

      <Footer />
    </div>
  );
};

export default Media;
