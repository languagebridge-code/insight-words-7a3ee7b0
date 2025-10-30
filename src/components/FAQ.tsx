import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Isn't Google Translate good enough?",
      answer: "No - and here's why it's dangerous for schools: Google Translate is NOT FERPA compliant. When students use the consumer Google Translate service, their data is vulnerable and may be used to train Google's AI models. Districts using it risk Title VI violations and lawsuits. Beyond compliance, Google Translate provides robotic, literal translations that confuse preliterate students. LanguageBridge is purpose-built for education with full FERPA/COPPA compliance, authentic conversational translations developed with native speakers, and integrated screen reader functionality. We process student data securely, store nothing permanently, and never use student information for any purpose beyond translation.",
    },
    {
      question: "What is the Ohio Pilot Program?",
      answer: "The Ohio Pilot is a FREE program for the 2025-2026 school year where selected Ohio schools get full access to LanguageBridge. Pilot schools help us refine the product while giving their ELL students powerful tools for success. Applications are reviewed on a rolling basis with limited spots available.",
    },
    {
      question: "What technical requirements are needed?",
      answer: "LanguageBridge runs as a Chrome extension on any device with Google Chrome. Students need a Chromebook, laptop, or desktop with Chrome installed and internet access. No additional software or apps are required.",
    },
    {
      question: "How do we budget for this?",
      answer: "LanguageBridge qualifies under Title III funding (English Language Acquisition), special education budgets, assistive technology funds, and general instructional technology budgets. We can provide a budget justification letter. At less than 22 cents per student per day, it costs far less than one interpreter hour per week.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Common <span className="gradient-text">Questions</span>
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
