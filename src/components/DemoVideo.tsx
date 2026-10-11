import { useState } from "react";
import { Play } from "lucide-react";
import demoVideoAsset from "@/assets/product-demo-video.mp4.asset.json";
import demoVideoWebmAsset from "@/assets/product-demo-video.webm.asset.json";
import demoPosterAsset from "@/assets/product-demo-poster.jpg.asset.json";

export const DemoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="max-w-5xl mx-auto">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
        {isPlaying ? (
          <video
            className="h-full w-full bg-foreground"
            poster={demoPosterAsset.url}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label="LanguageBridge product demonstration video: a student uses audio translation, the tiered glossary, and Talk to Teacher on a Chromebook"
          >
            <source src={demoVideoAsset.url} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
            <source src={demoVideoWebmAsset.url} type="video/webm; codecs=vp9,opus" />
            Your browser can&apos;t play this video.
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
            aria-label="Play the LanguageBridge product demonstration video, 1 minute 50 seconds"
          >
            <img src={demoPosterAsset.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/55 to-accent/70" aria-hidden="true" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5" aria-hidden="true" />
            </span>
            <span className="relative">
              <span className="mb-1 block text-xl font-bold text-primary-foreground sm:text-2xl">Watch the 2-minute demo</span>
              <span className="block text-sm text-primary-foreground/85 sm:text-base">See a student use LanguageBridge on a Chromebook</span>
            </span>
          </button>
        )}
      </div>
      <p className="mt-4 mb-0 text-center text-sm text-muted-foreground">
        1:50 &middot; Recorded on a Chromebook. No student names or personal information appear.
      </p>
    </div>
  );
};
