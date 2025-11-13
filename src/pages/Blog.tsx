import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Why Ohio Needs LanguageBridge: A Call for EdTech That Actually Serves Students
          </h1>
          <div className="text-muted-foreground">
            <p className="text-lg mb-2">By the LanguageBridge Team</p>
            <p>Masters in Educational Technology | Ohio Educator</p>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            I've spent years in Ohio classrooms watching students who desperately want to learn sit in silence, unable to access the education they deserve. Not because they can't learn. Because we haven't given them the tools they need.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The SLIFE Crisis Nobody's Talking About</h2>
          
          <p className="mb-6 leading-relaxed">
            Students with Limited or Interrupted Formal Education (SLIFE) are the invisible students in our schools. They're refugees, immigrants, students who spent years in camps or moving between countries. They arrive in our classrooms with brilliant minds but they can't read in ANY language yet.
          </p>

          <p className="mb-6 leading-relaxed">
            Think about that. A 15-year-old who can't read. Not because they have a learning disability. Because they never had the chance to go to school. And we hand them a Chromebook with Google Translate and expect them to catch up to their peers.
          </p>

          <p className="mb-6 leading-relaxed">
            It doesn't work. Google Translate requires literacy. It requires you to read the translation. For SLIFE students, it's completely useless. So what happens? They sit in class, falling further behind every single day. Teachers feel helpless. Administrators scramble for solutions. And the student gives up.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why EdTech Has Failed These Students</h2>

          <p className="mb-6 leading-relaxed">
            During my Masters in Educational Technology, I studied dozens of language learning tools. They all focus on the same thing: teaching English. Language acquisition. Vocabulary apps. Grammar drills.
          </p>

          <p className="mb-6 leading-relaxed">
            But that's not the problem. The problem is that while a student is learning English (which takes 5-7 years to reach academic proficiency), they're missing EVERYTHING else. They're missing math. Science. History. Social studies. Literature. They're losing years of education while they learn a language.
          </p>

          <p className="mb-6 leading-relaxed">
            EdTech has been obsessed with the wrong problem. We don't need another English learning app. We need students to access grade-level content IN THEIR LANGUAGE while they're learning English.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">The Compliance Nightmare Schools Face</h2>

          <p className="mb-6 leading-relaxed">
            And then there's the compliance issue that nobody wants to talk about. Schools are legally required under Title VI to provide meaningful language access. Not "good enough" access. Not "eventually" access. Meaningful access. Right now.
          </p>

          <p className="mb-6 leading-relaxed">
            But Google Translate isn't FERPA compliant. Schools can't legally use it for student education because there's no data protection. Student information goes into Google's AI training models. Districts face federal investigations. Legal fees run $50,000 or more.
          </p>

          <p className="mb-6 leading-relaxed">
            So schools hire interpreters. $80,000 per year. And the interpreter is never there during instruction. They're at IEP meetings. Parent conferences. Crisis situations. Students still sit in class with no support.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why LanguageBridge Is Different</h2>

          <p className="mb-6 leading-relaxed">
            LanguageBridge was built for SLIFE students first. Not language learners. Not proficient readers. Preliterate students who need audio support to access any content.
          </p>

          <p className="mb-6 leading-relaxed">
            It's a Chrome extension that works everywhere. Google Classroom. Canvas. Khan Academy. Wikipedia. Any website. Students highlight text and hear it in their language. Instantly. With authentic, natural translations that actually make sense.
          </p>

          <p className="mb-6 leading-relaxed">
            We're FERPA and COPPA compliant because we built compliance into the foundation. We don't store data. We don't train AI models on student information. We operate under the school's authority as required by law.
          </p>

          <p className="mb-6 leading-relaxed">
            And critically, we adapt to what students are actually doing in the classroom. Whatever content the teacher assigns. Whatever website they're on. LanguageBridge is there. Day one. No special curriculum required. No separate translated materials. Students engage with the same content as their peers.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">Why Ohio? Why Now?</h2>

          <p className="mb-6 leading-relaxed">
            Ohio has seen a massive influx of refugee students in recent years. Afghan refugees. Ukrainian families. Students from Somalia, Burma, Congo. Our schools are doing their best, but they're overwhelmed.
          </p>

          <p className="mb-6 leading-relaxed">
            Districts are facing Title VI investigations. They're desperate for compliant solutions. They're watching students fall further behind and they know something has to change.
          </p>

          <p className="mb-6 leading-relaxed">
            That's why we're launching our pilot program in Ohio. We want to partner with districts who are willing to test this with us. To give us real feedback. To help us refine the product. And in exchange, we're offering pilot pricing with unlimited translations per month. No usage caps. Because students shouldn't have to ration their access to education.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">EdTech Needs a Disruptor</h2>

          <p className="mb-6 leading-relaxed">
            The EdTech industry has become consumer-focused. Pretty apps. Gamification. Engagement metrics. Venture capital pouring into tools that make learning "fun."
          </p>

          <p className="mb-6 leading-relaxed">
            But some students don't need fun. They need access. They need equity. They need tools that actually work when you can't read yet.
          </p>

          <p className="mb-6 leading-relaxed">
            LanguageBridge isn't trying to disrupt with flashy features or viral growth. We're disrupting by solving a real problem that's been ignored for decades. We're disrupting by putting compliance first instead of treating it as an afterthought. We're disrupting by focusing on the most underserved students instead of the easiest market.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-6">What Happens Next</h2>

          <p className="mb-6 leading-relaxed">
            We're looking for Ohio districts who want to be part of this. Schools that are tired of watching students struggle. Administrators who are ready to try something different. Teachers who believe these students can succeed if we just give them the right tools.
          </p>

          <p className="mb-6 leading-relaxed">
            If that's you, reach out. Let's pilot this together. Let's collect real data on what works. Let's prove that when you give preliterate students access to content from day one, they don't just survive. They thrive.
          </p>

          <p className="mb-6 leading-relaxed">
            Because every student deserves to be heard. Every student deserves to learn. And it's time EdTech actually delivered on that promise.
          </p>

          <div className="mt-12 p-8 bg-card rounded-xl border-2 border-primary/20">
            <p className="text-lg font-semibold mb-4">Ready to bring LanguageBridge to your district?</p>
            <Link to="/#contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
              Contact Us About the Ohio Pilot
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
