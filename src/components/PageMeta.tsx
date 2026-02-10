import { useEffect } from "react";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
}

export const PageMeta = ({ title, description, canonical }: PageMetaProps) => {
  useEffect(() => {
    const fullTitle = title.includes("LanguageBridge")
      ? title
      : `${title} | LanguageBridge`;

    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (el) {
        el.setAttribute("content", content);
      } else {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
      }
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (link) {
        link.href = canonical;
      }
    }

    return () => {
      document.title = "LanguageBridge - The First Language Accessibility Screen Reader for ESL Students";
    };
  }, [title, description, canonical]);

  return null;
};
