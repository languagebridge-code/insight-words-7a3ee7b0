import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PilotApplicationForm } from "./PilotApplicationForm";
import { GeneralInterestForm } from "./GeneralInterestForm";

export const FormsSection = () => {
  return (
    <section id="forms" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get Started with <span className="gradient-text">LanguageBridge</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform language accessibility in your school? Choose the option that fits your needs.
          </p>
        </div>

        <Tabs defaultValue="pilot" className="fade-in-up delay-200">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="pilot" className="text-base">
              Ohio Pilot Application
            </TabsTrigger>
            <TabsTrigger value="interest" className="text-base">
              General Interest
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pilot">
            <div className="mb-6 p-6 bg-lavender/20 rounded-lg border border-primary/20">
              <h3 className="text-xl font-semibold mb-2 text-deep-purple">
                Join Ohio's Language Accessibility Revolution
              </h3>
              <p className="text-muted-foreground">
                Apply now for special pilot pricing and be part of shaping the future of LanguageBridge.
                Limited partnerships available for the 2025-2026 school year.
              </p>
            </div>
            <PilotApplicationForm />
          </TabsContent>

          <TabsContent value="interest">
            <div className="mb-6 p-6 bg-peach/20 rounded-lg border border-burnt-orange/20">
              <h3 className="text-xl font-semibold mb-2 text-deep-purple">Stay Connected</h3>
              <p className="text-muted-foreground">
                Not in Ohio or not ready to commit? Let us know you're interested and we'll keep you updated
                on expansion plans, demos, and future opportunities.
              </p>
            </div>
            <GeneralInterestForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
