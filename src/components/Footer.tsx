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
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    } catch (error: any) {
      setNewsletterStatus("idle");
      alert(error.message === "This email is already subscribed" ? "Already subscribed!" : "Failed to subscribe.");
    }
  };

  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-6 text-lg">Get Ohio pilot updates and ELL best practices monthly</p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50" disabled={newsletterStatus !== "idle"} />
                <Button type="submit" className="bg-gradient-to-r from-primary to-accent hover:opacity-90" disabled={newsletterStatus !== "idle"}>
                  {newsletterStatus === "submitting" ? "Sending..." : newsletterStatus === "success" ? "Subscribed!" : <><Send className="w-4 h-4 mr-2" />Subscribe</>}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white">Home</Link></li>
              <li><Link to="/demo" className="text-white/80 hover:text-white">Demo</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-white/80"><Mail className="w-5 h-5 mt-0.5" /><a href="mailto:languagebridge.contact@gmail.com" className="hover:text-white">languagebridge.contact@gmail.com</a></li>
              <li className="flex gap-2 text-white/80"><Phone className="w-5 h-5 mt-0.5" /><a href="tel:+12168006020" className="hover:text-white">(216) 800-6020</a></li>
              <li className="flex gap-2 text-white/80"><Twitter className="w-5 h-5 mt-0.5" /><a href="https://twitter.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="hover:text-white">@_languagebridge</a></li>
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="LanguageBridge" className="w-10 h-10" />
              <h3 className="font-bold text-lg">LanguageBridge</h3>
            </div>
            <p className="text-white/80 text-sm">Breaking language barriers. Built for SLIFE students. Compliant by design.</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <p className="text-center text-white/60 text-sm">© {new Date().getFullYear()} LanguageBridge. Every student deserves to be heard.</p>
        </div>
      </div>
    </footer>
  );
};
