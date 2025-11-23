import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";

export const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-primary to-accent shadow-2xl border-t border-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 text-center md:text-left">
              <p className="text-white font-semibold text-base md:text-lg mb-1">
                Ready to help every student understand?
              </p>
              <p className="text-white/90 text-sm md:text-base">
                Join Ohio schools piloting LanguageBridge in 2025-2026
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/pilot">
                <Button 
                  className="bg-white text-primary hover:bg-white/95 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                  size="lg"
                >
                  Request Pilot Information
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              
              <button
                onClick={() => setIsDismissed(true)}
                className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 p-2 rounded-lg"
                aria-label="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
