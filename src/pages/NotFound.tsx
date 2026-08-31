import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { useLeadDialog } from "@/components/leads/LeadDialog";
import { Home, Sparkles, HelpCircle, Users } from "lucide-react";

const links = [
  { to: "/", label: "Homepage", desc: "Start here", icon: Home },
  { to: "/features", label: "Features", desc: "The three tools", icon: Sparkles },
  { to: "/faq", label: "FAQ & Compliance", desc: "FERPA, COPPA, SB 29", icon: HelpCircle },
  { to: "/about", label: "About & Media", desc: "Our story and press", icon: Users },
];

const NotFound = () => {
  const location = useLocation();
  const { openLeadDialog } = useLeadDialog();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Page Not Found"
        description="That page doesn't exist. Explore LanguageBridge features, compliance documentation, or request a demo for your district."
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-20 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-7xl md:text-8xl font-bold gradient-text mb-4">404</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              We couldn't find that page
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              The link may be out of date, or the page may have moved. Here's where most people
              are headed.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{link.label}</p>
                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => openLeadDialog("404-page")}
              className="gradient-primary text-primary-foreground shadow-lg hover:opacity-90"
            >
              Get a Demo
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
