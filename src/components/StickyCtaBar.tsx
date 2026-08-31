import { useState } from "react";
import { useLocation } from "react-router-dom";
import { X, MessageSquareHeart } from "lucide-react";
import { useLeadDialog } from "@/components/leads/LeadDialog";

const HIDDEN_PREFIXES = [
  "/teacher",
  "/admin",
  "/dashboard",
  "/teacher-dashboard",
  "/teacher-auth",
  "/teacher-signup",
  "/reset-password",
  "/demo",
  "/thank-you",
];

export const StickyCtaBar = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { pathname } = useLocation();
  const { openLeadDialog } = useLeadDialog();

  if (isDismissed) return null;
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="bg-card border-t border-border shadow-2xl">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => openLeadDialog("sticky-mobile")}
            className="flex-1 flex items-center justify-center gap-2 gradient-primary text-primary-foreground font-semibold text-sm rounded-xl py-3 shadow-lg active:opacity-90"
          >
            <MessageSquareHeart className="w-4 h-4 flex-shrink-0" />
            Get a demo — reply in 1 business day
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg flex-shrink-0"
            aria-label="Dismiss demo banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
