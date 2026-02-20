import { useState } from "react";
import { X, Rocket } from "lucide-react";

export const StickyCtaBar = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 translate-y-0 opacity-100">
      <div className="bg-emerald-600 shadow-2xl border-t border-white/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <Rocket className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-white font-medium text-sm md:text-base text-center">
              🎤 Pitching at{" "}
              <a
                href="https://www.cleveleads.org/clc-events/accelerate/event-night-hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:text-emerald-100 transition-colors"
              >
                Cleveland Leadership Center Accelerate
              </a>{" "}
              — Feb 26th!
            </p>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 p-1.5 rounded-lg flex-shrink-0 ml-2"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
