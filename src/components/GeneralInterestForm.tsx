import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  interest: z.string().min(10, "Please tell us about your interest"),
  partnershipInterest: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const GeneralInterestForm = () => {
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
          type: "general",
          ...data,
        },
      });

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: "We've received your information and will be in touch soon.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-4 gradient-text">Stay Connected</h3>
        <p className="text-muted-foreground">
          Interested in LanguageBridge but not in Ohio? Let us know and we'll keep you updated on expansion plans.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="mt-2"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="organization">School / Organization</Label>
          <Input
            id="organization"
            {...register("organization")}
            className="mt-2"
            placeholder="Optional"
          />
        </div>

        <div>
          <Label htmlFor="interest">What interests you about LanguageBridge? *</Label>
          <Textarea
            id="interest"
            {...register("interest")}
            className="mt-2 min-h-32"
            placeholder="Tell us about your role, your students, or what drew you to LanguageBridge..."
          />
          {errors.interest && (
            <p className="text-destructive text-sm mt-1">{errors.interest.message}</p>
          )}
        </div>

        <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <Checkbox
            id="partnershipInterest"
            {...register("partnershipInterest")}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="partnershipInterest" className="text-base font-semibold cursor-pointer">
              I'm interested in a partnership for free access to LanguageBridge for 1 year
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Schools selected for our partnership program will receive full access to LanguageBridge at no cost for one year.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full gradient-primary hover:opacity-90 text-white font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Join Our Mailing List"}
          <Mail className="ml-2" />
        </Button>
      </form>
    </div>
  );
};
