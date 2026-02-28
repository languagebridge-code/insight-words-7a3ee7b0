import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Newspaper, Clock, Mail, Phone, Twitter } from "lucide-react";

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

          {/* Coming Soon */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="rounded-2xl border border-border/50 bg-card p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're compiling our press coverage and articles. Check back soon for links to media features about LanguageBridge.
              </p>
            </div>
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
