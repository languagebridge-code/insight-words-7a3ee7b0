import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  path: string;
}

const routeNames: Record<string, string> = {
  "/": "Home",
  "/features": "Features",
  "/compliance": "Compliance",
  "/pilot": "Pilot Program",
  "/about": "About",
  "/faq": "FAQ",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/contact": "Contact",
  "/pricing": "Pricing",
  "/demo": "Demo",
  "/resources": "Resources",
  "/grants": "Grants",
  "/implementation": "Implementation",
  "/case-studies": "Case Studies",
  "/support": "Support",
  "/get-started": "Get Started",
  "/roi-calculator": "ROI Calculator",
  "/teacher-auth": "Teacher Login",
  "/teacher-signup": "Teacher Signup",
  "/teacher-dashboard": "Teacher Dashboard",
  "/grants/title-iii": "Title III",
  "/grants/title-vi": "Title VI",
  "/grants/essa": "ESSA",
  "/grants/idea": "IDEA",
  "/resources/title-iii-application": "Title III Application",
  "/resources/title-vi-checklist": "Title VI Checklist",
};

export const BreadcrumbSchema = () => {
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ name: "Home", path: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      breadcrumbs.push({ name, path: currentPath });
    });

    const baseUrl = "https://insight-words.lovable.app";

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${baseUrl}${item.path}`
      }))
    };

    const existingScript = document.getElementById("breadcrumb-schema");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-schema";
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("breadcrumb-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location.pathname]);

  return null;
};
