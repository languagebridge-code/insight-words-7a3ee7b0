import { CheckCircle } from "lucide-react";

export const FAQExpanded = () => {
  const faqs = [
    {
      question: "Why isn't Google Translate compliant for schools?",
      answer: "Google Translate has serious compliance issues that put schools at risk. First, it's not FERPA compliant. When students use Google Translate, their data can be used to train Google's AI models. There's no data protection agreement for schools. Second, districts face Title VI violations because Google Translate doesn't provide meaningful language access. It gives robotic, confusing translations that don't actually help students understand. For preliterate students who can't read in any language yet, Google Translate is completely useless. LanguageBridge is different. We're FERPA and COPPA compliant, we never store student data, and we provide authentic translations with audio support so students can actually access their education."
    },
    {
      question: "Why isn't 'good enough' actually good enough?",
      answer: "When it comes to education, 'good enough' means students fall behind, get misdiagnosed with learning disabilities, and never catch up. 'Good enough' means pulling other students out of class to translate, which violates privacy and disrupts learning for everyone. 'Good enough' means schools face federal investigations and lawsuits. Every day a student can't access grade-level content is a day they fall further behind. We're not talking about convenience. We're talking about whether kids graduate, go to college, and have opportunities. That's why LanguageBridge isn't just better than Google Translate. It's built specifically for education, with compliance, audio support, and authentic translations that actually work for preliterate students."
    },
    {
      question: "Can we try it before we purchase it?",
      answer: "FREE access for selected Ohio schools in 2025-2026. You help us refine the product while your ELL students get powerful tools. Rolling applications, limited spots."
    },
    {
      question: "How long does implementation take?",
      answer: "Complete implementation takes 3 weeks: Week 1 - IT installs via Google Admin Console (30 minutes), Week 2 - Teacher professional development (3 hours), Week 3 - Students start using it. No complex setup, no servers to configure, no ongoing maintenance required."
    },
    {
      question: "Do teachers need training?",
      answer: "We provide a 3-hour professional development session that covers best practices and effective classroom integration. However, the tool is intuitive enough that teachers can start using it immediately. Students need zero training—it just works when they highlight text or use keyboard shortcuts."
    },
    {
      question: "Is this Title III fundable?",
      answer: "Yes, 100%. LanguageBridge qualifies under Title III as an instructional tool for English Language Learners. It also qualifies under special education budgets (for SLIFE students with IEPs), assistive technology budgets, and general instructional materials. We provide budget justification letters and compliance documentation to make the funding process straightforward."
    },
    {
      question: "What languages are supported?",
      answer: "Currently 8 languages with authentic translations: Spanish, Arabic, Dari, Pashto, Somali, French, Portuguese, and Mandarin. We prioritize languages based on refugee resettlement patterns and district requests. Audio support is available for all languages to support preliterate students."
    },
    {
      question: "How is this different from Google Translate?",
      answer: "Three critical differences: (1) Compliance - We're FERPA/COPPA compliant with zero data tracking; Google Translate uses student data to train AI. (2) Audio Support - We read translations aloud for preliterate students; Google Translate requires reading ability. (3) Quality - We provide authentic, contextualized translations built for education; Google Translate gives literal, often confusing translations. Additionally, Microsoft Immersive Reader only works in Microsoft products (not Google Classroom), and Read&Write costs $150/student without translation features."
    },
    {
      question: "What data is collected?",
      answer: "None. Zero. We do not store, track, or collect any student data. Translations happen in real-time and are never saved. We don't track what students translate, when they use the tool, or any personally identifiable information. This is by design to ensure FERPA and COPPA compliance. Your IT department can verify this through our technical documentation."
    },
    {
      question: "What do we need technically?",
      answer: "Just Chrome 90+ or any Chromebook with internet access. IT installs via Google Admin Console in 30 minutes. No extra software, no servers, no configuration needed. Works on standard school networks with content filters. Requires HTTPS access to Azure Cognitive Services (standard SSL, no firewall changes)."
    },
    {
      question: "How do we pay for it?",
      answer: "LanguageBridge qualifies under Title III, special ed, assistive tech, or general instructional budgets. Cost replaces $40K/year interpreters with 24/7 access and delivers ROI in the first year. We provide budget justification letters and work with your finance team to ensure smooth procurement."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about LanguageBridge
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-md border-2 border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 fade-in-up">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href="mailto:info@languagebridge.app" className="text-primary font-semibold hover:underline">
            Contact our team at info@languagebridge.app →
          </a>
        </div>
      </div>
    </section>
  );
};
