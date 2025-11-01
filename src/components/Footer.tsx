import { Mail, Phone, Twitter } from "lucide-react";
import logo from "@/assets/languagebridge-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 - Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Navigate</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#demo" className="text-white/80 hover:text-white transition-colors">Demo</a></li>
              <li><a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 2 - For Schools */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">For Schools</h3>
            <ul className="space-y-2">
              <li><a href="#forms" className="text-white/80 hover:text-white transition-colors">Become a Pilot School</a></li>
              <li><a href="#demo" className="text-white/80 hover:text-white transition-colors">Schedule a Demo</a></li>
              <li><span className="text-white/40 cursor-not-allowed">Professional Development</span></li>
              <li><span className="text-white/40 cursor-not-allowed">Implementation Support</span></li>
            </ul>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:languagebridge.contact@gmail.com" className="text-white/80 hover:text-white transition-colors">
                  languagebridge.contact@gmail.com
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
              Every student deserves to be heard. LanguageBridge is the first Language Accessibility Screen Reader, breaking down barriers for preliterate English language learners across Ohio and beyond.
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
