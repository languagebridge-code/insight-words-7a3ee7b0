import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  school: z.string().min(2, "School/District name is required"),
  role: z.string().min(1, "Please select your role"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
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
          type: "contact",
          ...data,
        },
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    }
  };

  const quickLinks = [
    {
      title: "Want to start a pilot?",
      description: "Apply for 30 days free with up to 50 students",
      link: "/pilot",
      linkText: "Apply for Pilot"
    },
    {
      title: "Need grant templates?",
      description: "Download pre-written applications for Title III, Title VI, and more",
      link: "/grants",
      linkText: "Get Templates"
    },
    {
      title: "Schedule a demo?",
      description: "See LanguageBridge in action with a live walkthrough",
      link: "/demo",
      linkText: "Book Demo"
    },
    {
      title: "Technical issue?",
      description: "Get help with deployment or troubleshooting",
      link: "mailto:support@languagebridge.app",
      linkText: "Email Support"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're here to help you bring LanguageBridge to your students
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:languagebridge.contact@gmail.com" className="text-primary hover:underline">
                      languagebridge.contact@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>
                    <a href="tel:+12168006020" className="text-primary hover:underline">
                      (216) 800-6020
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Office Hours</h3>
                    <p className="text-muted-foreground">Monday-Friday</p>
                    <p className="text-muted-foreground">8am-5pm EST</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-bold mb-2">Location</h3>
                <p className="text-muted-foreground mb-1">Highland Heights, Ohio</p>
                <p className="text-sm text-muted-foreground">Serving Ohio schools (expanding nationwide)</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="mt-2"
                      placeholder="Your name"
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

                  <div>
                    <Label htmlFor="school">School/District *</Label>
                    <Input
                      id="school"
                      {...register("school")}
                      className="mt-2"
                      placeholder="Your school or district"
                    />
                    {errors.school && (
                      <p className="text-destructive text-sm mt-1">{errors.school.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <select
                      id="role"
                      {...register("role")}
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select your role...</option>
                      <option value="teacher">ESL Teacher</option>
                      <option value="admin">Administrator</option>
                      <option value="it">IT Director</option>
                      <option value="grant">Grant Writer</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.role && (
                      <p className="text-destructive text-sm mt-1">{errors.role.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <select
                      id="subject"
                      {...register("subject")}
                      className="w-full mt-2 px-4 py-2 rounded-lg border border-border bg-background"
                    >
                      <option value="">Select a subject...</option>
                      <option value="general">General Question</option>
                      <option value="demo">Demo Request</option>
                      <option value="pilot">Pilot Application</option>
                      <option value="grant">Grant Help</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Press/Media</option>
                    </select>
                    {errors.subject && (
                      <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      className="mt-2 min-h-32"
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gradient-primary text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Looking for something specific?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {quickLinks.map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border hover-scale">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  {item.link.startsWith('mailto:') ? (
                    <a href={item.link} className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                      {item.linkText}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link to={item.link} className="text-primary font-semibold hover:underline inline-flex items-center gap-2">
                      {item.linkText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
