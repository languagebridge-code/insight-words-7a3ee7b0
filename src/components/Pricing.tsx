import { Check, Mail, Clock, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const CHROME_EXTENSION_URL = "https://chromewebstore.google.com/detail/gonbfeeaeheeahmfilbeijcakfboadgp?utm_source=item-share-cb";

export const Pricing = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFreeTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    setLoading(true);
    // Simulate submission — in future this will save to backend
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
    toast({ title: "Success! Your download link is ready." });
  };

  return (
    <section id="pricing" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free or unlock more with a subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

              {!submitted ? (
                <form onSubmit={handleFreeTier} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Get Free Access"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-sm text-primary font-semibold">✅ Thank you!</p>
                  <Button asChild className="w-full">
                    <a href={CHROME_EXTENSION_URL} target="_blank" rel="noopener noreferrer">
                      Download Extension
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* INDIVIDUAL TIER */}
          <Card className="border-2 border-primary shadow-lg shadow-primary/10 hover-scale fade-in-up relative" style={{ animationDelay: "0.1s" }}>
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white">
              Coming Soon
            </Badge>
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Individual</CardTitle>
              <CardDescription>
                <span className="text-3xl font-bold text-primary block my-2">$9.99</span>
                <span className="text-sm">/month, billed monthly</span>
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
                  <span>Extended usage limits</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>All supported languages</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Renewable monthly subscription</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" disabled>
                Coming Soon
              </Button>
            </CardFooter>
          </Card>

          {/* DISTRICT TIER */}
          <Card className="border-2 border-border hover-scale fade-in-up relative" style={{ animationDelay: "0.2s" }}>
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
                  <span>Everything in Individual</span>
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

        <div className="text-center mt-12 fade-in-up" style={{ animationDelay: "0.3s" }}>
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
