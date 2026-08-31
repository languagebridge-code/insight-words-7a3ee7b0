import { useNavigate } from "@/lib/router-compat";
import { Navigation } from "@/components/Navigation";
import { PageMeta } from "@/components/PageMeta";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/leads/LeadForm";
import { CheckCircle2, Clock, ShieldCheck, Users } from "lucide-react";

const points = [
  {
    icon: Clock,
    title: "A personal reply within one business day",
    text: "Justin, our founder and a 15-year ESL teacher, answers every request himself.",
  },
  {
    icon: Users,
    title: "A walkthrough built around your students",
    text: "See exactly how audio translation, the tiered glossary, and Talk to Teacher fit your classrooms.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance documentation up front",
    text: "FERPA, COPPA, and Ohio SB 29 paperwork your district's legal and IT teams will ask for.",
  },
  {
    icon: CheckCircle2,
    title: "District pricing and rollout plan",
    text: "Deployment through Google Admin Console takes about 30 minutes. We'll map out the steps.",
  },
];

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Request a Demo - LanguageBridge for Schools & Districts"
        description="Get a personal walkthrough of LanguageBridge, district pricing, and full FERPA, COPPA, and Ohio SB 29 compliance documentation. Reply within one business day."
      />
      <Navigation />

      <section className="pt-32 pb-20 bg-gradient-to-b from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                See LanguageBridge <span className="gradient-text">in your classroom</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Tell us a little about your role and we'll send everything you need to bring
                audio-first language access to your students.
              </p>

              <ul className="space-y-6">
                {points.map((point) => (
                  <li key={point.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg text-foreground">{point.title}</h2>
                      <p className="text-muted-foreground">{point.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-3xl shadow-xl p-6 md:p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl font-bold mb-2">Request your walkthrough</h2>
              <p className="text-muted-foreground mb-6">
                No student data required. No obligation.
              </p>
              <LeadForm source="demo-page" onSuccess={() => navigate("/thank-you")} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
