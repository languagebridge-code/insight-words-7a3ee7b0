import { CheckCircle } from "lucide-react";

export const FAQExpanded = () => {
  const faqs = [
    {
      question: "Why isn't Google Translate compliant for schools?",
      answer: "School districts have federal obligations under Title VI of the Civil Rights Act and the Equal Educational Opportunities Act to provide language assistance that is educationally sound, effectively implemented, and produces results. Google Translate presents several compliance challenges: No Educational Framework: Machine translation provides literal translations without educational context. There's no curriculum integration, no qualified staff trained in its educational use, and no way to document that it's helping students overcome language barriers. Inadequate for Preliterate Students: Students who can't read in ANY language cannot benefit from text-only translation. Google Translate requires literacy and doesn't provide the audio support and text simplification preliterate SLIFE students need. Data Privacy Concerns: Google Translate is a commercial service without FERPA-specific data protection agreements for schools. Student data may be used for AI training. Missing Educational Tools: Translation alone doesn't build language skills. Students need text simplification, academic vocabulary development, and teacher communication tools that support both language acquisition and content learning. LanguageBridge addresses these gaps with purpose-built tools, FERPA compliance, and documentation that helps districts demonstrate they're meeting federal requirements."
    },
    {
      question: "Why isn't 'good enough' actually good enough?",
      answer: "Educational equity requires tools purpose-built for education. Here's why LanguageBridge makes a difference: Academic Progress: Students need access to grade-level content immediately, not simplified curriculum that puts them years behind. Text simplification and audio support mean preliterate students can engage with the same material as their peers. Student Dignity: Pulling other students from class to translate is common but problematic. It violates privacy, disrupts learning for multiple students, and places inappropriate responsibility on children. Teacher-student communication tools solve this professionally. Systematic Language Development: Random vocabulary lookup isn't language acquisition. Academic glossaries build content-specific vocabulary systematically, so students learn English while learning math, science, and social studies. Compliance and Safety: Schools need documented language access that meets federal requirements. FERPA-compliant tools with usage reporting provide the documentation Title III coordinators need. Every day without proper tools is a day students fall further behind. LanguageBridge ensures preliterate SLIFE students can access education from day one, not months or years later."
    },
    {
      question: "Can we try it before we purchase it?",
      answer: "FREE access for selected Ohio schools in 2025-2026. You help us refine the product while your ELL students get powerful tools. Rolling applications, limited spots. After the pilot year, we'll work with you to create a licensing arrangement that fits your district's needs and budget."
    },
    {
      question: "How long does implementation take?",
      answer: "Complete implementation takes 3 weeks: Week 1 - IT installs via Google Admin Console (30 minutes), Week 2 - Teacher professional development (3 hours), Week 3 - Students independently accessing grade-level content with translation, simplification, and communication tools. No complex setup, no servers to configure, no ongoing maintenance required."
    },
    {
      question: "Do teachers need training?",
      answer: "We provide a 3-hour professional development session that covers best practices and effective classroom integration. However, the tool is intuitive enough that teachers can start using it immediately. Students need zero training. It just works when they highlight text or use keyboard shortcuts."
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
      answer: "Three critical differences: (1) Compliance - We're FERPA/COPPA compliant with zero data tracking; Google Translate uses student data to train AI. (2) Audio Support - We read translations aloud for preliterate students; Google Translate requires reading ability. (3) Educational Tools - We provide text simplification, teacher communication, and academic glossaries; Google Translate only translates."
    },
    {
      question: "How is this different from Read&Write or Immersive Reader?",
      answer: "Read&Write is excellent for students who can already read - it helps literate multilingual learners succeed. LanguageBridge is specifically designed for preliterate students who need to HEAR content in their language to access it. Read&Write assumes literacy in at least one language; LanguageBridge doesn't. Microsoft Immersive Reader only works within Microsoft products (not Google Classroom), while LanguageBridge works anywhere. These tools serve different student populations - they're complementary, not competitive. Many districts use both: Read&Write for their general multilingual population and LanguageBridge for their most vulnerable preliterate SLIFE students."
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
      answer: "LanguageBridge qualifies under Title III, special ed, assistive tech, or general instructional budgets. Email us at contact@languagebridge.app to discuss funding options and we'll provide budget justification letters tailored to your district."
    },
    {
      question: "What's included in the Chrome extension?",
      answer: "Everything. One simple Chrome extension includes all four tools: real-time translation with audio, text simplification, teacher-student communication, and academic vocabulary glossaries. Students access everything with one keyboard shortcut (Alt+Shift+L) or by highlighting text. No separate logins, no multiple platforms, no confusion. It just works."
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
          <a href="mailto:contact@languagebridge.app" className="text-primary font-semibold hover:underline">
            Contact our team at contact@languagebridge.app →
          </a>
        </div>
      </div>
    </section>
  );
};
