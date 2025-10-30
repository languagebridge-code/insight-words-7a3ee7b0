import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const technicalFaqs = [
    {
      question: "How is this better than Google Translate?",
      answer: "Critical difference: Google Translate is NOT FERPA compliant. Even with Google Workspace for Education, when students use the consumer Google Translate service, their data is vulnerable and may be used to train Google's AI models. LanguageBridge is purpose-built for education with full FERPA/COPPA compliance - we process student data securely, store nothing permanently, and never use student information for any purpose beyond translation. Beyond compliance, Google Translate provides robotic, literal word-for-word translations that confuse students. LanguageBridge delivers authentic, conversational Dari, Pashto, and Arabic translations developed with native speakers. We also integrate as a screen reader with two-way teacher-student communication - critical features Google simply doesn't offer.",
    },
    {
      question: "Why should we pay when Google Translate is free?",
      answer: "Free comes with hidden costs: data vulnerability, compliance risk, and inadequate translations. Google Translate isn't designed for preliterate students or educational environments. LanguageBridge costs less than 22 cents per student per day - far less than one interpreter hour per week - and you maintain legal compliance while providing superior translations. Districts that rely on 'free' tools often face Title VI violations and poor student outcomes.",
    },
    {
      question: "What technical requirements are needed to use LanguageBridge?",
      answer: "LanguageBridge runs as a Chrome extension on any device with Google Chrome. Students need a Chromebook, laptop, or desktop with Chrome installed and internet access. No additional software or apps are required.",
    },
    {
      question: "How many languages does LanguageBridge support?",
      answer: "We support over 100 languages including Spanish, Arabic, Chinese (Mandarin and Cantonese), Vietnamese, Somali, Farsi, Pashto, Russian, and many more. We're constantly adding languages based on school needs.",
    },
    {
      question: "Can LanguageBridge be used on iPads or tablets?",
      answer: "Currently, LanguageBridge works best on devices that support Chrome extensions (Chromebooks and desktops). We're exploring mobile solutions and will announce tablet support as it becomes available.",
    },
    {
      question: "Can teachers see what students are translating?",
      answer: "Yes! Teachers have access to a dashboard showing usage patterns and most-translated terms. This helps educators identify areas where students need additional support and adjust instruction accordingly.",
    },
    {
      question: "What subjects and grade levels does LanguageBridge support?",
      answer: "LanguageBridge works across all subjects and grade levels K-12. It's especially powerful for content areas like science, social studies, and math where academic vocabulary can be a barrier.",
    },
    {
      question: "What support is available if we encounter technical issues?",
      answer: "We offer email support for all schools with typical response times under 24 hours. Pilot schools and district licensees receive priority support with dedicated channels and faster response times.",
    },
  ];

  const programFaqs = [
    {
      question: "What is the Ohio Pilot Program?",
      answer: "The Ohio Pilot is a FREE program for the 2025-2026 school year where selected Ohio schools get full access to LanguageBridge. Pilot schools help us refine the product while giving their ELL students powerful tools for success. Applications are reviewed on a rolling basis with limited spots available.",
    },
    {
      question: "How does LanguageBridge handle student data and privacy?",
      answer: "We take data privacy seriously. LanguageBridge is fully compliant with FERPA, COPPA, and Title VI regulations. We never sell student data, and all translations are processed securely. Parents can access their student's usage data at any time.",
    },
    {
      question: "What kind of professional development is included?",
      answer: "All schools receive comprehensive teacher training including live webinars, video tutorials, and ongoing support. Ohio Pilot schools get enhanced PD with on-site sessions, monthly coaching calls, and access to our educator community.",
    },
  ];

  const pricingFaqs = [
    {
      question: "What's the difference between flat-rate and per-student pricing?",
      answer: "Flat-rate packages ($1,200-$3,500/year) are simpler for budgeting and cover a set number of students. Per-student pricing ($50-75/student/year) offers more flexibility for schools with varying enrollment. Choose what works best for your budget process.",
    },
    {
      question: "Can we try it before committing?",
      answer: "Yes! Our Ohio pilot program has no long-term contracts. Try LanguageBridge for one school year. Most schools expand after seeing the results.",
    },
    {
      question: "How do we budget for this?",
      answer: "LanguageBridge qualifies under Title III funding (English Language Acquisition), special education budgets, assistive technology funds, and general instructional technology budgets. We can provide a budget justification letter.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about LanguageBridge
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Technical Questions */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Technical Questions</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {technicalFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`tech-${index}`}
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

          {/* Program Questions */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Program Questions</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {programFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`program-${index}`}
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

          {/* Pricing & Value Questions */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Pricing & Value Questions</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {pricingFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`pricing-${index}`}
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
