import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/languagebridge-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Case Studies", href: "/#case-studies" },
  ];

  const grantLinks = [
    { label: "Grant Overview", href: "/grants" },
    { label: "Title III (ELL Funding)", href: "/grants/title-iii" },
    { label: "Title VI (Compliance)", href: "/grants/title-vi" },
    { label: "IDEA Part B (Special Ed)", href: "/grants/idea" },
    { label: "ESSA (Title I/II/IV)", href: "/grants/essa" },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    // Check if it's a route (starts with /) or anchor (starts with #)
    if (href.startsWith('/') && !href.includes('#')) {
      window.location.href = href;
    } else if (href.includes('/#')) {
      // Handle routes with anchors like /#case-studies
      const [path, anchor] = href.split('#');
      if (window.location.pathname !== path) {
        window.location.href = href;
      } else {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="LanguageBridge" className="w-12 h-12" />
            <span className="font-heading font-bold text-xl hidden sm:inline">
              LanguageBridge
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            {/* Grants Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary font-medium transition-colors">
                Funding <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {grantLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <a href={link.href} className="cursor-pointer">
                      {link.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => window.location.href = '/pilot'}
              className="gradient-primary text-white hover:opacity-90"
            >
              Start Free Pilot
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-foreground hover:text-primary font-medium transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Grants section in mobile */}
              <div className="border-t border-border pt-2 mt-2">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Grant Funding</p>
                {grantLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.location.href = link.href;
                    }}
                    className="text-foreground hover:text-primary font-medium transition-colors py-2 pl-4 block text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <Button
                onClick={() => window.location.href = '/pilot'}
                className="gradient-primary text-white hover:opacity-90 w-full"
              >
                Start Free Pilot
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
