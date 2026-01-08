import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

export const StickyCtaBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Status message configuration - update this for different announcements
  const statusMessage = {
    type: "update" as "maintenance" | "update" | "info",
    message: "✓ Chrome Extension is now live! Install from the Chrome Web Store to get started.",
  };

  if (isDismissed) return null;

  const bgColor = statusMessage.type === "maintenance" 
    ? "bg-amber-500" 
    : statusMessage.type === "update" 
      ? "bg-primary" 
      : "bg-blue-500";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className={`${bgColor} shadow-2xl border-t border-white/20`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-white font-medium text-sm md:text-base text-center">
              {statusMessage.message}
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
