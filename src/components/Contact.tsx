import { useState } from "react";
import { Mail, Phone, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Connect to Mailchimp API
      // For now, just show success message
      toast.success("Thank you! We'll be in touch soon with pricing information.");
      setEmail("");
      setName("");
      setRole("");
    } catch (error) {
      toast.error("Something went wrong. Please email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Contact Form Section */}
          <div className="mb-12 fade-in-up">
            <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  Request Pricing & Pilot Info
                </h2>
                <p className="text-lg text-muted-foreground">
                  Get custom pricing for your district and learn about our pilot program
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your.email@school.edu"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Your Role</Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compliance">Compliance Officer</SelectItem>
                      <SelectItem value="esl">ESL Teacher</SelectItem>
                      <SelectItem value="curriculum">Curriculum Coordinator</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Request Pricing Information"}
                  <Send className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  We'll respond within 24 hours with pricing tailored to your district size
                </p>
              </form>
            </div>
          </div>

          {/* Direct Contact Section */}
          <div className="gradient-primary rounded-3xl p-8 md:p-12 text-center shadow-2xl fade-in-up delay-100">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Prefer to Talk?
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <Mail className="w-5 h-5" />
                <a href="mailto:languagebridge.contact@gmail.com" className="hover:underline font-medium">
                  languagebridge.contact@gmail.com
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <Phone className="w-5 h-5" />
                <a href="tel:+12168006020" className="hover:underline font-medium">
                  (216) 800-6020
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-white text-lg">
                <Twitter className="w-5 h-5" />
                <a href="https://twitter.com/_languagebridge" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                  @_languagebridge
                </a>
              </div>
            </div>
            
            <p className="text-lg text-white/90 font-semibold">
              Office Hours: Monday-Friday, 8am-5pm EST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};