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
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-gradient-to-r from-primary to-accent shadow-2xl border-t border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm md:text-base">
                Ready to help every student understand?
              </p>
              <p className="text-white/80 text-xs md:text-sm">
                Join Ohio schools piloting LanguageBridge in 2025-2026
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Link to="/pilot">
                <Button 
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
                  size="lg"
                >
                  Request Pilot Information
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              
              <button
                onClick={() => setIsDismissed(true)}
                className="text-white/60 hover:text-white transition-colors p-2"
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
