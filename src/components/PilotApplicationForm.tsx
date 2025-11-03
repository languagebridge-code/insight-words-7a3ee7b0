import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const formSchema = z.object({
  schoolName: z.string().min(2, "School name is required"),
  district: z.string().min(2, "District is required"),
  contactName: z.string().min(2, "Contact name is required"),
  role: z.string().min(2, "Role is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  studentCount: z.string().min(1, "Number of ELL students is required"),
  grades: z.string().min(1, "Grade levels are required"),
  message: z.string().min(10, "Please tell us more about your needs"),
});

type FormData = z.infer<typeof formSchema>;

export const PilotApplicationForm = () => {
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
      
      const { error } = await supabase.functions.invoke("submit-pilot-application", {
        body: {
          name: data.contactName,
          email: data.email,
          schoolName: data.schoolName,
          role: data.role,
          numStudents: parseInt(data.studentCount),
          languages: data.grades, // Using grades field for now
          timeline: data.message,
          phone: data.phone,
        },
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 1-2 business days to discuss your pilot program.",
      });
      reset();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-4 gradient-text">Ohio Pilot Application</h3>
        <p className="text-muted-foreground">
          Join Ohio schools revolutionizing language accessibility for the 2025-2026 school year
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="schoolName">School Name *</Label>
            <Input
              id="schoolName"
              {...register("schoolName")}
              className="mt-2"
              placeholder="Your School Name"
            />
            {errors.schoolName && (
              <p className="text-destructive text-sm mt-1">{errors.schoolName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="district">School District *</Label>
            <Input
              id="district"
              {...register("district")}
              className="mt-2"
              placeholder="Your District"
            />
            {errors.district && (
              <p className="text-destructive text-sm mt-1">{errors.district.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contactName">Your Name *</Label>
            <Input
              id="contactName"
              {...register("contactName")}
              className="mt-2"
              placeholder="Full Name"
            />
            {errors.contactName && (
              <p className="text-destructive text-sm mt-1">{errors.contactName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Your Role *</Label>
            <Input
              id="role"
              {...register("role")}
              className="mt-2"
              placeholder="e.g., Principal, ELL Coordinator"
            />
            {errors.role && (
              <p className="text-destructive text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email">Email Address *</Label>
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
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...register("phone")}
              className="mt-2"
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="studentCount">Number of ELL Students *</Label>
            <Input
              id="studentCount"
              {...register("studentCount")}
              className="mt-2"
              placeholder="Approximate number"
            />
            {errors.studentCount && (
              <p className="text-destructive text-sm mt-1">{errors.studentCount.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="grades">Grade Levels Served *</Label>
            <Input
              id="grades"
              {...register("grades")}
              className="mt-2"
              placeholder="e.g., K-5, 6-8"
            />
            {errors.grades && (
              <p className="text-destructive text-sm mt-1">{errors.grades.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="message">Tell Us About Your School's Needs *</Label>
          <Textarea
            id="message"
            {...register("message")}
            className="mt-2 min-h-32"
            placeholder="Share your goals, challenges, and what you hope to achieve with LanguageBridge..."
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full gradient-primary hover:opacity-90 text-white font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Submit Pilot Application"}
          <Send className="ml-2" />
        </Button>
      </form>
    </div>
  );
};
