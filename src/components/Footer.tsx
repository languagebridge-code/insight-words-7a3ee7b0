import { Mail, Phone, Twitter, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import logo from "@/assets/languagebridge-logo.png";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setNewsletterStatus("submitting");
    
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: { email },
      });

      if (error) throw error;

      setNewsletterStatus("success");
      setEmail("");
      
      // Reset status after 3 seconds
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      setNewsletterStatus("idle");
      alert(error.message === "This email is already subscribed" 
        ? "This email is already subscribed!" 
        : "Failed to subscribe. Please try again.");
    }
  };

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter CTA Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated on <span className="gradient-text">Language Access</span>
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Get grant templates, compliance updates, and ELL best practices delivered monthly
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  disabled={newsletterStatus !== "idle"}
                />
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={newsletterStatus !== "idle"}
                >
                  {newsletterStatus === "submitting" ? (
                    "Sending..."
                  ) : newsletterStatus === "success" ? (
                    "Subscribed!"
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
              {newsletterStatus === "success" && (
                <p className="text-sm text-primary mt-2">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-white/80 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/compliance" className="text-white/80 hover:text-white transition-colors">Compliance</Link></li>
              <li><Link to="/pilot" className="text-white/80 hover:text-white transition-colors">Pilot Program</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 2 - Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@languagebridge.app" className="text-white/80 hover:text-white transition-colors">
                  info@languagebridge.app
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@languagebridge.app" className="text-white/80 hover:text-white transition-colors">
                  support@languagebridge.app
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+12168006020" className="text-white/80 hover:text-white transition-colors">
                  (216) 800-6020
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                <a href="https://twitter.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  @_languagebridge
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Our Mission */}
          <div>
            <img src={logo} alt="LanguageBridge Logo" className="w-16 h-16 mb-4" />
            <h3 className="font-bold text-lg mb-4 text-white">Our Mission</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Help every student understand—even those who can't read yet. LanguageBridge is the first Language Accessibility Screen Reader, breaking down barriers for preliterate English language learners.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="text-center mb-4">
            <p className="text-white/80 text-sm mb-2">
              Part of the <span className="gradient-text font-semibold">ESL Suite of Innovative Software</span> - More tools coming soon!
            </p>
          </div>
          <div className="text-center text-white/60 text-sm">
            <p>© 2025 LanguageBridge. Pioneering language accessibility from Ohio to the nation.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
