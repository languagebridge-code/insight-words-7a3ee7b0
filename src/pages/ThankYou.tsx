import { Link } from "@/lib/router-compat";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageMeta } from "@/components/PageMeta";
import { CheckCircle2, Mail, CalendarClock, FileText } from "lucide-react";

const steps = [
  {
    icon: Mail,
    title: "A confirmation is on its way",
    text: "Check your inbox for a note from justin@languagebridge.app. If you don't see it, look in spam and mark it safe.",
  },
  {
    icon: CalendarClock,
    title: "A personal reply within one business day",
    text: "Justin, our founder and a 15-year ESL teacher, answers every request himself. No sales team, no call center.",
  },
  {
    icon: FileText,
    title: "Documentation your district will ask for",
    text: "FERPA, COPPA, and Ohio SB 29 paperwork, plus a rollout plan for Google Admin Console deployment.",
  },
];

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageMeta
        title="Thank You - We'll Be In Touch"
        description="Thanks for reaching out to LanguageBridge. Justin replies personally within one business day with setup details, district pricing, and compliance documentation."
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-20 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thank you. We got it.
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Your request is in, and a real person is reading it.
            </p>

            <ul className="space-y-6 text-left mb-12">
              {steps.map((step) => (
                <li
                  key={step.title}
                  className="flex gap-4 p-5 rounded-2xl border border-border bg-card"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-foreground">{step.title}</h2>
                    <p className="text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground">
              While you wait, read about{" "}
              <Link to="/features" className="text-primary underline underline-offset-4">
                the three tools
              </Link>{" "}
              or our{" "}
              <Link to="/faq" className="text-primary underline underline-offset-4">
                privacy and compliance stance
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
