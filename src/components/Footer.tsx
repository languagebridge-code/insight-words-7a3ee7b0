import { Mail, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/languagebridge-logo-new.svg";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Get in Touch Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 text-center border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Get in Touch</span>
            </h2>
            <p className="text-white/80 mb-6 text-lg">
              Have questions about LanguageBridge? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="mailto:contact@languagebridge.app" className="flex items-center gap-2 text-white hover:text-primary transition-colors text-lg font-medium">
                <Mail className="w-5 h-5" />
                contact@languagebridge.app
              </a>
              <a href="tel:+12168006020" className="flex items-center gap-2 text-white hover:text-primary transition-colors text-lg font-medium">
                <Phone className="w-5 h-5" />
                (216) 800-6020
              </a>
              <a href="https://x.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-primary transition-colors text-lg font-medium">
                <Twitter className="w-5 h-5" />
                @_languagebridge
              </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 - Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-white/80 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-white/80 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/compliance" className="text-white/80 hover:text-white transition-colors">Compliance</Link></li>
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
                <a href="mailto:contact@languagebridge.app" className="text-white/80 hover:text-white transition-colors">
                  contact@languagebridge.app
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
                <a href="https://x.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  @_languagebridge
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Our Mission */}
          <div>
            <img src={logo} alt="LanguageBridge Logo" className="w-16 h-16 mb-4" />
            <h3 className="font-bold text-lg mb-4 text-white">Our Mission</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Help every student understand, even those who can't read yet. LanguageBridge is the first Language Accessibility Screen Reader, breaking down barriers for preliterate English language learners.
            </p>
            <div className="text-white/60 text-sm">
              <p>Northeast Ohio</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="text-center mb-4">
            <p className="text-white/80 text-sm mb-2">
              Part of the <span className="gradient-text font-semibold">ESL Suite of Innovative Software</span> - More tools coming soon!
            </p>
          </div>
          <div className="text-center text-white/60 text-sm">
            <p>© 2026 LanguageBridge, LLC. All content, including text, images, and software, is protected by copyright law.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
