import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/languagebridge-logo.png";

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
    { label: "Features", href: "/features" },
    { label: "Compliance", href: "/compliance" },
    { label: "Pilot Program", href: "/pilot" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Handle hash links (scroll on same page)
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // For page links, React Router handles navigation
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
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="LanguageBridge" className="w-12 h-12" />
            <span className="font-heading font-bold text-xl hidden sm:inline">
              LanguageBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => 
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(link.href, e)}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            
            <Link to="/pilot">
              <Button
                variant="hero"
                size="default"
              >
                Request Pilot Information
              </Button>
            </Link>
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
              {navLinks.map((link) => 
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(link.href, e)}
                    className="text-foreground hover:text-primary font-medium transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary font-medium transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                )
              )}
              
              <Link to="/pilot" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="hero"
                  className="w-full"
                >
                  Get Pilot Info
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};