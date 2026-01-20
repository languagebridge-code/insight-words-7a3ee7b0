import { useEffect } from "react";

export const WebsiteSchema = () => {
  useEffect(() => {
    const baseUrl = "https://insight-words.lovable.app";

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "LanguageBridge",
      "alternateName": "LanguageBridge Screen Reader",
      "url": baseUrl,
      "description": "Audio-first language accessibility for preliterate ESL students. Three integrated tools: Audio Translation, Tiered Language Glossary, and Talk to Teacher.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US",
      "publisher": {
        "@type": "Organization",
        "name": "LanguageBridge",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon.png`
        }
      }
    };

    const existingScript = document.getElementById("website-schema");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "website-schema";
    script.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("website-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};
