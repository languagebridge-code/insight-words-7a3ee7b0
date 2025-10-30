import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  schoolDistrict: z.string().trim().min(1, "School/District is required").max(200),
  state: z.string().min(1, "State is required"),
  role: z.string().min(1, "Role is required"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
});

export const GeneralInterestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolDistrict: "",
    state: "Ohio",
    role: "",
    interests: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    handleChange("interests", newInterests);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      formSchema.parse(formData);

      // Here you would send to your backend/email service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Thank you for your interest!",
        description: "We'll be in touch soon with more information about LanguageBridge.",
      });

      setFormData({
        name: "",
        email: "",
        schoolDistrict: "",
        state: "Ohio",
        role: "",
        interests: [],
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(newErrors);
      }
      toast({
        title: "Please check the form",
        description: "Some fields need your attention.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="schoolDistrict">School/District *</Label>
          <Input
            id="schoolDistrict"
            value={formData.schoolDistrict}
            onChange={(e) => handleChange("schoolDistrict", e.target.value)}
            className={errors.schoolDistrict ? "border-destructive" : ""}
          />
          {errors.schoolDistrict && <p className="text-sm text-destructive mt-1">{errors.schoolDistrict}</p>}
        </div>

        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className={errors.state ? "border-destructive" : ""}
          />
          {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
        </div>

        <div>
          <Label htmlFor="role">Role *</Label>
          <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger className={errors.role ? "border-destructive" : ""}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="esl-coordinator">ESL Coordinator</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-destructive mt-1">{errors.role}</p>}
        </div>

        <div>
          <Label className="mb-3 block">Interest Level *</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="schedule-demo"
                checked={formData.interests.includes("schedule-demo")}
                onCheckedChange={() => handleInterestToggle("schedule-demo")}
              />
              <Label htmlFor="schedule-demo" className="font-normal cursor-pointer">
                Schedule Demo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="learn-more"
                checked={formData.interests.includes("learn-more")}
                onCheckedChange={() => handleInterestToggle("learn-more")}
              />
              <Label htmlFor="learn-more" className="font-normal cursor-pointer">
                Learn More
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ohio-pilot"
                checked={formData.interests.includes("ohio-pilot")}
                onCheckedChange={() => handleInterestToggle("ohio-pilot")}
              />
              <Label htmlFor="ohio-pilot" className="font-normal cursor-pointer">
                Join Ohio Pilot
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="waitlist"
                checked={formData.interests.includes("waitlist")}
                onCheckedChange={() => handleInterestToggle("waitlist")}
              />
              <Label htmlFor="waitlist" className="font-normal cursor-pointer">
                Future Expansion Waitlist
              </Label>
            </div>
          </div>
          {errors.interests && <p className="text-sm text-destructive mt-1">{errors.interests}</p>}
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Interest"}
      </Button>
    </form>
  );
};
