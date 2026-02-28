import { useState } from "react";
import { X, Trophy, ExternalLink } from "lucide-react";
import accelerateWin from "@/assets/accelerate-win.png";

export const AccelerateWinBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Dismiss announcement"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-5xl mx-auto">
          {/* Photo */}
          <div className="flex-shrink-0 w-full md:w-64 lg:w-80">
            <img
              src={accelerateWin}
              alt="LanguageBridge team receiving $5,000 grand prize check at the 2026 Accelerate pitch contest"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                2026 Grand Prize Winner
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              We won the Accelerate Pitch Contest!
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              LanguageBridge took home the <strong className="text-foreground">$5,000 grand prize</strong> at the 2026 Cleveland Leadership Center Accelerate Citizens Make Change competition. Here's how we're putting it to work:
            </p>

            <ul className="space-y-1.5 text-sm text-muted-foreground mb-4">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <span className="text-primary font-bold">→</span>
                <span>Adding <strong className="text-foreground">Hmong and Nepali</strong> language support</span>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <span className="text-primary font-bold">→</span>
                <span>Building <strong className="text-foreground">LanguageBridge for iPads</strong></span>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <span className="text-primary font-bold">→</span>
                <span>Becoming an official <strong className="text-foreground">Ohio TESOL conference sponsor</strong></span>
              </li>
            </ul>

            <a
              href="https://www.cleveleads.org/2026-accelerate-citizens-make-change-winners-announced/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Read the announcement
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
