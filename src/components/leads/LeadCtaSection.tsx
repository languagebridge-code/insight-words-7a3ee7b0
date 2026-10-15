import { LeadForm } from "./LeadForm";

interface LeadCtaSectionProps {
  source: string;
  title?: string;
  subtitle?: string;
}

export const LeadCtaSection = ({
  source,
  title = "Bring LanguageBridge to your students",
  subtitle = "Tell us where to send setup details, district pricing, and compliance documentation. Justin replies personally within one business day.",
}: LeadCtaSectionProps) => (
  <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
    <div className="container mx-auto px-4">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{subtitle}</p>
        <div className="bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8">
          <LeadForm source={source} />
        </div>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground text-left sm:text-center">
          <li><strong className="text-foreground">No student data stored.</strong> Audio is processed and discarded.</li>
          <li><strong className="text-foreground">FERPA and COPPA aligned</strong>, with documentation for your IT team.</li>
          <li><strong className="text-foreground">Questions first?</strong> See our <a href="/faq" className="underline hover:text-primary">FAQ &amp; compliance answers</a>.</li>
        </ul>
      </div>
    </div>
  </section>
);
