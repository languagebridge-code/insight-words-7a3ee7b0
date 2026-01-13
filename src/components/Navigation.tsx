import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/languagebridge-logo.svg";

interface NavDropdownProps {
  label: string;
  items: { label: string; href: string; description?: string }[];
}

const NavDropdown = ({ label, items }: NavDropdownProps) => {
  const location = useLocation();
  
  return (
    <div className="relative nav-dropdown-trigger">
      <button className="nav-link flex items-center gap-1 text-foreground py-2">
        {label}
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      
      <div className="nav-dropdown z-50">
        <div className="bg-background/98 backdrop-blur-xl rounded-xl border border-border/50 shadow-xl overflow-hidden min-w-[220px]">
          {/* Gradient accent line at top */}
          <div className="h-0.5 w-full bg-gradient-to-r from-primary to-accent" />
          
          <div className="p-2">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-2.5 rounded-lg transition-all duration-200 hover:bg-muted group ${
                  location.pathname === item.href ? 'bg-muted text-primary' : 'text-foreground'
                }`}
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {item.label}
                </span>
                {item.description && (
                  <span className="block text-sm text-muted-foreground mt-0.5">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  }, [location]);

  const productLinks = [
    { label: "Features", href: "/features", description: "Explore all capabilities" },
    { label: "Demo", href: "/demo", description: "See it in action" },
    { label: "Pilot Program", href: "/pilot", description: "Join our pilot schools" },
  ];

  const resourceLinks = [
    { label: "FAQ", href: "/faq", description: "Common questions" },
    { label: "Support", href: "/support", description: "Get help" },
    { label: "Compliance", href: "/compliance", description: "FERPA, Title III & more" },
  ];

  const scrollToSection = (href: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      {/* Gradient accent line when scrolled */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary transition-opacity duration-500 ${
          isScrolled ? 'opacity-30' : 'opacity-0'
        }`}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="LanguageBridge" 
                className="w-12 h-12 logo-glow transition-transform duration-300 group-hover:scale-105" 
              />
              {/* Ambient glow behind logo */}
              <div className="absolute inset-0 -z-10 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full scale-150" />
            </div>
            <span className="font-heading font-bold text-xl hidden sm:inline logo-text">
              LanguageBridge™
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Product Dropdown */}
            <NavDropdown label="Product" items={productLinks} />
            
            {/* Resources Dropdown */}
            <NavDropdown label="Resources" items={resourceLinks} />
            
            {/* Direct Links */}
            <Link
              to="/about"
              className={`nav-link text-foreground py-2 ${
                location.pathname === '/about' ? 'text-primary' : ''
              }`}
            >
              About
            </Link>
            
            <Link
              to="/dashboard"
              className={`nav-link text-foreground py-2 ${
                location.pathname === '/dashboard' ? 'text-primary' : ''
              }`}
            >
              Dashboard
            </Link>
            
            <Link to="/pilot">
              <Button
                variant="hero"
                size="default"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Request Pilot Info</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-6 pt-2 bg-background/98 backdrop-blur-xl rounded-b-2xl border-x border-b border-border/30">
            {/* Gradient accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />
            
            <div className="flex flex-col gap-1 px-2">
              {/* Product Section */}
              <button
                onClick={() => setMobileDropdownOpen(mobileDropdownOpen === 'product' ? null : 'product')}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium">Product</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen === 'product' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${mobileDropdownOpen === 'product' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="pl-4 space-y-1">
                  {productLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === link.href ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <button
                onClick={() => setMobileDropdownOpen(mobileDropdownOpen === 'resources' ? null : 'resources')}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="font-medium">Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${mobileDropdownOpen === 'resources' ? 'max-h-40' : 'max-h-0'}`}>
                <div className="pl-4 space-y-1">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`block px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === link.href ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Direct Links */}
              <Link
                to="/about"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/about' ? 'bg-muted text-primary' : 'hover:bg-muted'
                }`}
              >
                About
              </Link>
              
              <Link
                to="/dashboard"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/dashboard' ? 'bg-muted text-primary' : 'hover:bg-muted'
                }`}
              >
                Dashboard
              </Link>
              
              {/* CTA Button */}
              <div className="px-2 pt-4">
                <Link to="/pilot">
                  <Button variant="hero" className="w-full">
                    Request Pilot Info
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
