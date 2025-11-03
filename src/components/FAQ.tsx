import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Why not just use Google Translate?",
      answer: "Google Translate isn't FERPA compliant—student data is vulnerable and may train Google's AI. Districts risk Title VI violations. Plus, it gives robotic translations that confuse preliterate students. LanguageBridge is built for schools: FERPA/COPPA compliant, authentic translations with native speakers, integrated screen reader for audio. We process data securely and never store it.",
    },
    {
      question: "What's the Ohio Pilot?",
      answer: "FREE access for selected Ohio schools in 2025-2026. You help us refine the product while your ELL students get powerful tools. Rolling applications, limited spots.",
    },
    {
      question: "What do we need technically?",
      answer: "Just Chrome. Works on any Chromebook, laptop, or desktop with internet access. No extra software needed.",
    },
    {
      question: "How do we pay for it?",
      answer: "Qualifies under Title III, special ed, assistive tech, or general instructional budgets. Under 22¢ per student per day—far less than one interpreter hour per week. We provide budget justification letters.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card rounded-2xl px-6 shadow-md border-0"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12 fade-in-up">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href="#contact" className="text-primary font-semibold hover:underline">
            Contact our team →
          </a>
        </div>
      </div>
    </section>
  );
};
