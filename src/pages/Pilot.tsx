import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  school: z.string().min(2, "School/District name is required"),
  role: z.string().min(1, "Please select your role"),
  studentCount: z.string().min(1, "Please select student count"),
  languages: z.string().min(1, "Please select at least one language"),
  hearAbout: z.string().optional(),
  additionalInfo: z.string().optional(),
  grantInterest: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Pilot() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { error } = await supabase.functions.invoke("send-form-submission", {
        body: {
          type: "pilot",
          ...data,
        },
      });

      if (error) throw error;

      toast({
        title: "Application Received!",
        description: "We'll email you within 24 hours with next steps.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const benefits = [
    "Full feature access for 30 days",
    "Up to 50 students",
    "Implementation support",
    "Weekly check-ins",
    "Usage analytics dashboard",
    "After 30 days, decide if you want to continue"
  ];

  const timeline = [
    {
      step: "1",
      title: "We'll email you within 24 hours with next steps",
      duration: "1 day"
    },
    {
      step: "2",
      title: "Schedule 15-minute kickoff call",
      duration: "Same week"
    },
    {
      step: "3",
      title: "Receive setup instructions (IT takes 30 minutes)",
      duration: "After kickoff"
    },
    {
      step: "4",
      title: "Launch with your students (we provide training materials)",
      duration: "Next day"
    },
    {
      step: "5",
      title: "Weekly check-ins during your pilot",
      duration: "Throughout pilot"
    }
  ];

  const faqs = [
    {
      q: "What happens after 30 days?",
      a: "Nothing automatic! We'll check in with you near the end of the pilot. If you want to continue, we'll send you pricing options. If not, the extension simply stops working - no strings attached."
    },
    {
      q: "Do I need approval from my district to start a pilot?",
      a: "It depends on your district's policies. We recommend checking with your principal or IT director. Many teachers start with informal classroom pilots before seeking district-wide adoption."
    },
    {
      q: "Can we extend the pilot beyond 30 days?",
      a: "Yes! If you need more time to see results or gather data for a grant application, we can extend your pilot. Just let us know."
    },
    {
      q: "What data will we get during the pilot?",
      a: "You'll have access to a dashboard showing: number of translations per student, most translated subjects/websites, languages used, time saved, and student engagement metrics."
    },
    {
      q: "What IT setup is required?",
      a: "You need Chromebooks with Google Admin Console access. Our team will send you a simple deployment guide. Most IT directors complete the setup in under 30 minutes."
    },
    {
      q: "Can we pilot with more than 50 students?",
      a: "Yes! If you have more students, let us know in the application. We can accommodate larger pilots."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Start Your <span className="gradient-text">Free 30-Day Pilot</span>
            </h1>
            <p className="text-2xl text-muted-foreground mb-8">
              No Credit Card. No Commitment. See Results in Week 1.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What You Get in Your Pilot
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border">
              <h2 className="text-3xl font-bold mb-8 text-center">Apply for Your Free Pilot</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="mt-2"
                      placeholder="Full Name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-2"
                      placeholder="your.email@school.edu"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="mt-2"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="school">School/District Name *</Label>
                  <Input
                    id="school"
                    {...register("school")}
                    className="mt-2"
                    placeholder="Your School or District"
                  />
                  {errors.school && (
                    <p className="text-destructive text-sm mt-1">{errors.school.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="role">Your Role *</Label>
                  <select
                    id="role"
                    {...register("role")}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select your role...</option>
                    <option value="esl-teacher">ESL Teacher</option>
                    <option value="administrator">Administrator</option>
                    <option value="it-director">IT Director</option>
                    <option value="grant-writer">Grant Writer</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.role && (
                    <p className="text-destructive text-sm mt-1">{errors.role.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="studentCount">Number of ELL Students *</Label>
                  <select
                    id="studentCount"
                    {...register("studentCount")}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select range...</option>
                    <option value="1-20">1-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                  {errors.studentCount && (
                    <p className="text-destructive text-sm mt-1">{errors.studentCount.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="languages">Primary Languages Needed *</Label>
                  <Input
                    id="languages"
                    {...register("languages")}
                    className="mt-2"
                    placeholder="e.g., Dari, Pashto, Spanish, Arabic"
                  />
                  {errors.languages && (
                    <p className="text-destructive text-sm mt-1">{errors.languages.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="hearAbout">How did you hear about us?</Label>
                  <select
                    id="hearAbout"
                    {...register("hearAbout")}
                    className="w-full mt-2 px-4 py-2 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select...</option>
                    <option value="ohio-tesol">Ohio TESOL</option>
                    <option value="colleague">Colleague Referral</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Anything else we should know?</Label>
                  <Textarea
                    id="additionalInfo"
                    {...register("additionalInfo")}
                    className="mt-2 min-h-24"
                    placeholder="Tell us about your students, timeline, or any specific needs..."
                  />
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <Checkbox
                    id="grantInterest"
                    {...register("grantInterest")}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="grantInterest" className="text-base font-semibold cursor-pointer">
                      I'm interested in grant funding after the pilot
                    </Label>
                     <p className="text-sm text-muted-foreground mt-1">
                       We'll send you grant templates and guidance during your pilot
                     </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gradient-primary hover:opacity-90 text-white font-semibold"
                >
                  {isSubmitting ? "Submitting..." : "Apply for Free Pilot"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Happens Next
            </h2>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 items-start bg-card rounded-xl p-6 border border-border">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-primary font-semibold">{item.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Pilot Program FAQ
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
