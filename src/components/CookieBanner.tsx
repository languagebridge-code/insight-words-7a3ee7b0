import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "lb-cookie-consent";

export type ConsentValue = "accepted" | "declined";

export const getCookieConsent = (): ConsentValue | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
};

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const decide = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable, respect the choice for this session only */
    }
    setVisible(false);
    window.dispatchEvent(new CustomEvent("lb-cookie-consent", { detail: value }));
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]"
    >
      <div className="container mx-auto max-w-3xl bg-card border border-border rounded-2xl shadow-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              We keep this simple: no tracking cookies, no student data. We'd like to measure
              anonymous, cookieless page visits so we can improve the site. Read our{" "}
              <Link to="/privacy" className="text-primary underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" size="sm" onClick={() => decide("declined")}>
              Decline
            </Button>
            <Button
              size="sm"
              onClick={() => decide("accepted")}
              className="gradient-primary text-primary-foreground"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
