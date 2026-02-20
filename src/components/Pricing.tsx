import { Check, Mail, Clock, Building2, Loader2, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState, useEffect, useCallback } from "react";

import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CHROME_EXTENSION_URL = "https://chromewebstore.google.com/detail/gonbfeeaeheeahmfilbeijcakfboadgp?utm_source=item-share-cb";

// Stripe product/price mapping
const PLANS = {
  individual: {
    price_id: "price_1T2tN7HyT7mdxqsHvuTu28Vk",
    product_id: "prod_U0vDUHW3cpbMGe",
  },
};

export const Pricing = () => {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<{
    subscribed: boolean;
    product_id: string | null;
    subscription_end: string | null;
  } | null>(null);
  const { toast } = useToast();

  const checkSubscription = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke("check-subscription");
      if (error) throw error;
      setSubscription(data);
    } catch {
      // Not subscribed or not logged in
      setSubscription(null);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        checkSubscription();
      }
    };
    getUser();

    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkSubscription();
      } else {
        setSubscription(null);
      }
    });

    return () => authSub.unsubscribe();
  }, [checkSubscription]);

  // Check for checkout success in URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") {
      toast({
        title: "Subscription activated! 🎉",
        description: "Opening the Chrome extension download… If blocked, email support@languagebridge.app for your link.",
        duration: 10000,
      });
      checkSubscription();
      window.history.replaceState({}, "", window.location.pathname);
      // Auto-open Chrome Web Store download link
      setTimeout(() => {
        window.open(CHROME_EXTENSION_URL, "_blank");
      }, 1500);
    } else if (params.get("checkout") === "cancelled") {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [toast, checkSubscription]);


  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId: PLANS.individual.price_id },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Unable to open billing portal", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setPortalLoading(false);
    }
  };

  const isIndividualSubscribed = subscription?.subscribed && subscription?.product_id === PLANS.individual.product_id;

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

              <Button asChild className="w-full">
                <a href="mailto:info@languagebridge.app?subject=Free%20Demo">
                  Get Free Access
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* INDIVIDUAL TIER */}
          <Card className={`border-2 shadow-lg hover-scale fade-in-up relative ${
            isIndividualSubscribed
              ? "border-accent shadow-accent/10"
              : "border-primary shadow-primary/10"
          }`} style={{ animationDelay: "0.1s" }}>
            {isIndividualSubscribed ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                Your Plan
              </Badge>
            ) : null}
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

              {isIndividualSubscribed && subscription?.subscription_end && (
                <p className="text-xs text-muted-foreground text-center mb-3">
                  Renews {new Date(subscription.subscription_end).toLocaleDateString()}
                </p>
              )}
            </CardContent>
            <CardFooter>
              {isIndividualSubscribed ? (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                >
                  {portalLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...</>
                  ) : (
                    <><Settings className="w-4 h-4 mr-2" /> Manage Subscription</>
                  )}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...</>
                  ) : (
                    "Subscribe for $9.99/mo"
                  )}
                </Button>
              )}
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
