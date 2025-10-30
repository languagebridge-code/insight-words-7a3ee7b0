import { PilotApplicationForm } from "./PilotApplicationForm";
import { GeneralInterestForm } from "./GeneralInterestForm";

export const FormsSection = () => {
  return (
    <section id="forms" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get <span className="gradient-text">Started</span> Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're an Ohio school ready to pilot or just want to stay connected, we'd love to hear from you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="fade-in-up delay-100">
            <PilotApplicationForm />
          </div>
          <div className="fade-in-up delay-200">
            <GeneralInterestForm />
          </div>
        </div>
      </div>
    </section>
  );
};
