import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Why isn't Google Translate compliant for schools?",
      answer: "Google Translate has serious compliance issues that put schools at risk. First, it's not FERPA compliant. When students use Google Translate, their data can be used to train Google's AI models. There's no data protection agreement for schools. Second, districts face Title VI violations because Google Translate doesn't provide meaningful language access. It gives robotic, confusing translations that don't actually help students understand. For preliterate students who can't read in any language yet, Google Translate is completely useless. LanguageBridge is different. We're FERPA and COPPA compliant, we never store student data, and we provide authentic translations with audio support so students can actually access their education.",
    },
    {
      question: "Why isn't 'good enough' actually good enough?",
      answer: "When it comes to education, 'good enough' means students fall behind, get misdiagnosed with learning disabilities, and never catch up. 'Good enough' means pulling other students out of class to translate, which violates privacy and disrupts learning for everyone. 'Good enough' means schools face federal investigations and lawsuits. Every day a student can't access grade-level content is a day they fall further behind. We're not talking about convenience. We're talking about whether kids graduate, go to college, and have opportunities. That's why LanguageBridge isn't just better than Google Translate. It's built specifically for education, with compliance, audio support, and authentic translations that actually work for preliterate students.",
    },
    {
      question: "Can we try it before we purchase it?",
      answer: "FREE access for selected Ohio schools in 2025-2026. You help us refine the product while your ELL students get powerful tools. Rolling applications, limited spots.",
    },
    {
      question: "What do we need technically?",
      answer: "Just Chrome. Works on any Chromebook, laptop, or desktop with internet access. No extra software needed.",
    },
    {
      question: "How do we pay for it?",
      answer: "Qualifies under Title III, special ed, assistive tech, or general instructional budgets. Under 22 cents per student per day, far less than one interpreter hour per week. We provide budget justification letters.",
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
