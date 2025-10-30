import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const ohioFAQs = [
    {
      question: "Why Ohio?",
      answer: "Ohio is home to diverse, innovative school districts committed to educational equity. We're starting here to perfect our platform with real educators and students before expanding nationwide."
    },
    {
      question: "How many pilot schools are you accepting?",
      answer: "We're accepting a limited number of Ohio schools for our flagship pilot program to ensure personalized support and implementation success."
    }
  ];

  const technicalFAQs = [
    {
      question: "Does this work on our Chromebooks?",
      answer: "Yes! LanguageBridge is built specifically for Chrome OS and Chromebooks. It works on every Chromebook model in your district, from budget devices to premium models."
    },
    {
      question: "Is internet required?",
      answer: "LanguageBridge works best with internet connection. Offline mode is coming in Phase 4 of our roadmap."
    },
    {
      question: "What languages are currently supported?",
      answer: "Phase 1 supports Dari, with Pashto, Arabic, and Spanish launching in Phase 2 (3-6 months)."
    },
    {
      question: "What devices work with LanguageBridge?",
      answer: "Currently optimized for Chromebooks and Chrome OS. Windows, macOS, and iOS support coming in Phase 4."
    },
    {
      question: "Will this slow down our Chromebooks?",
      answer: "No! LanguageBridge is lightweight and optimized for Chromebook performance. It runs efficiently even on older Chromebook models."
    },
    {
      question: "How do students install it?",
      answer: "Simple! IT admins can push the extension to all student Chromebooks through the Google Admin Console, or students can install it themselves from the Chrome Web Store with one click."
    },
    {
      question: "How long does implementation take?",
      answer: "Most schools are up and running within 1-2 weeks, including teacher training. Installation on Chromebooks takes minutes."
    }
  ];

  const supportFAQs = [
    {
      question: "Is training provided?",
      answer: "Yes! Every pilot school receives comprehensive PD sessions and ongoing support."
    },
    {
      question: "What kind of support do we get?",
      answer: "Pilot schools receive priority support via email, phone, and scheduled check-ins."
    },
    {
      question: "How does billing work?",
      answer: "Annual licensing per student. Invoicing available for districts. Flexible payment terms for public schools."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* About the Ohio Pilot */}
          <div className="fade-in-up">
            <h3 className="text-2xl font-bold mb-6 text-deep-purple">About the Ohio Pilot</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {ohioFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`ohio-${index}`} className="bg-lavender rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-deep-purple">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Technical Questions */}
          <div className="fade-in-up delay-200">
            <h3 className="text-2xl font-bold mb-6 text-deep-purple">Technical Questions</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {technicalFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`tech-${index}`} className="bg-peach rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-burnt-orange">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Support & Training */}
          <div className="fade-in-up delay-300">
            <h3 className="text-2xl font-bold mb-6 text-deep-purple">Support & Training</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {supportFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`support-${index}`} className="bg-lavender rounded-lg px-6">
                  <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-deep-purple">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
