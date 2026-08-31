import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://languagebridge.app";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
}

export const PageMeta = ({ title, description, canonical }: PageMetaProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title.includes("LanguageBridge")
      ? title
      : `${title} | LanguageBridge`;

    document.title = fullTitle;

    const canonicalUrl =
      canonical ??
      `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

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
    setMeta("og:url", canonicalUrl, "property");
    setMeta("twitter:title", fullTitle, "name");
    setMeta("twitter:description", description, "name");

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    return () => {
      document.title = "LanguageBridge - The First Language Accessibility Screen Reader for ESL Students";
    };
  }, [title, description, canonical, pathname]);

  return null;
};
