import { Check, Mail, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";

export const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started free or contact us for district-wide deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* FREE TIER */}
          <Card className="border-2 border-border hover-scale fade-in-up relative">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-primary block my-2">$0</span>
                <span className="text-sm">Get started instantly</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Chrome extension access</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Audio Translation tool</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tiered Language Glossary</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Talk to Teacher</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Basic language support</span>
                </li>
              </ul>

              <Button asChild className="w-full">
                <a href="mailto:info@languagebridge.app?subject=Free%20Demo">
                  Get Free Access
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* DISTRICT TIER */}
          <Card className="border-2 border-primary shadow-lg shadow-primary/10 hover-scale fade-in-up relative" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">District</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-primary block my-2">Custom</span>
                <span className="text-sm">Tailored for your district</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Volume licensing</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Teacher dashboard &amp; analytics</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Dedicated success manager</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Custom onboarding &amp; training</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>SB 29 / FERPA / COPPA compliant</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="default">
                <a href="mailto:info@languagebridge.app?subject=District%20Pricing%20Inquiry">
                  Contact Sales
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            All plans include FERPA &amp; COPPA compliance, automatic updates, and privacy-first architecture.
            Need help choosing? Contact us at{" "}
            <a href="mailto:info@languagebridge.app" className="text-primary underline">
              info@languagebridge.app
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
