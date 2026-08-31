import { useEffect } from "react";

export const WebsiteSchema = () => {
  useEffect(() => {
    const baseUrl = "https://languagebridge.app";

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

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "LanguageBridge",
      "legalName": "LanguageBridge LLC",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.png`
      },
      "description": "LanguageBridge builds award-winning audio-first language accessibility tools for preliterate English learners in K-12 classrooms.",
      "areaServed": "US",
      "foundingLocation": {
        "@type": "Place",
        "name": "Northeast Ohio, United States"
      },
      "sameAs": [baseUrl]
    };

    const existingOrg = document.getElementById("organization-schema");
    if (existingOrg) {
      existingOrg.remove();
    }

    const orgScript = document.createElement("script");
    orgScript.type = "application/ld+json";
    orgScript.id = "organization-schema";
    orgScript.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

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
      document.getElementById("website-schema")?.remove();
      document.getElementById("organization-schema")?.remove();
    };
  }, []);

  return null;
};
