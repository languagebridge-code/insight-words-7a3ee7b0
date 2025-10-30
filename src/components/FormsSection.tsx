import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PilotApplicationForm } from "./PilotApplicationForm";
import { GeneralInterestForm } from "./GeneralInterestForm";

export const FormsSection = () => {
  return (
    <section id="pilot-application" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get <span className="gradient-text">Started Today</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the Ohio pilot program or express your interest in LanguageBridge
          </p>
        </div>

        <div className="max-w-4xl mx-auto fade-in-up delay-200">
          <Tabs defaultValue="pilot" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="pilot" className="text-base">
                Ohio Pilot Application
              </TabsTrigger>
              <TabsTrigger value="general" className="text-base">
                General Interest
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pilot">
              <PilotApplicationForm />
            </TabsContent>
            
            <TabsContent value="general">
              <GeneralInterestForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
