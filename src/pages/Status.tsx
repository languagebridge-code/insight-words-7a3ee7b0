import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useEffect } from "react";

const Status = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Status & Updates
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-10">
            Follow <a href="https://x.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@_languagebridge</a> on X for real-time status updates, announcements, and release notes.
          </p>
          <div className="flex justify-center">
            <a
              className="twitter-timeline"
              data-height="800"
              data-theme="light"
              href="https://twitter.com/_languagebridge?ref_src=twsrc%5Etfw"
            >
              Loading updates from @_languagebridge…
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Status;
