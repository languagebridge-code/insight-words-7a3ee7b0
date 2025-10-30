import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const ohioCounties = [
  "Adams", "Allen", "Ashland", "Ashtabula", "Athens", "Auglaize", "Belmont", "Brown", "Butler", "Carroll",
  "Champaign", "Clark", "Clermont", "Clinton", "Columbiana", "Coshocton", "Crawford", "Cuyahoga", "Darke", "Defiance",
  "Delaware", "Erie", "Fairfield", "Fayette", "Franklin", "Fulton", "Gallia", "Geauga", "Greene", "Guernsey",
  "Hamilton", "Hancock", "Hardin", "Harrison", "Henry", "Highland", "Hocking", "Holmes", "Huron", "Jackson",
  "Jefferson", "Knox", "Lake", "Lawrence", "Licking", "Logan", "Lorain", "Lucas", "Madison", "Mahoning",
  "Marion", "Medina", "Meigs", "Mercer", "Miami", "Monroe", "Montgomery", "Morgan", "Morrow", "Muskingum",
  "Noble", "Ottawa", "Paulding", "Perry", "Pickaway", "Pike", "Portage", "Preble", "Putnam", "Richland",
  "Ross", "Sandusky", "Scioto", "Seneca", "Shelby", "Stark", "Summit", "Trumbull", "Tuscarawas", "Union",
  "Van Wert", "Vinton", "Warren", "Washington", "Wayne", "Williams", "Wood", "Wyandot"
];

const formSchema = z.object({
  schoolName: z.string().trim().min(1, "School name is required").max(200),
  county: z.string().min(1, "County is required"),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  title: z.string().trim().min(1, "Title is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20),
  ellStudents: z.string().trim().min(1, "Number of ELL students is required").max(10),
  languages: z.string().trim().min(1, "Primary languages are required").max(500),
  currentTools: z.string().trim().max(1000),
  demoDate: z.string().trim().max(100),
  schedulePD: z.boolean(),
  updates: z.boolean(),
});

export const PilotApplicationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    county: "",
    contactName: "",
    title: "",
    email: "",
    phone: "",
    ellStudents: "",
    languages: "",
    currentTools: "",
    demoDate: "",
    schedulePD: false,
    updates: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      formSchema.parse(formData);

      // Here you would send to your backend/email service
      // For now, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Application Submitted!",
        description: "We'll contact you within 2 business days to discuss your Ohio pilot partnership.",
      });

      setFormData({
        schoolName: "",
        county: "",
        contactName: "",
        title: "",
        email: "",
        phone: "",
        ellStudents: "",
        languages: "",
        currentTools: "",
        demoDate: "",
        schedulePD: false,
        updates: false,
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="schoolName">School/District Name *</Label>
          <Input
            id="schoolName"
            value={formData.schoolName}
            onChange={(e) => handleChange("schoolName", e.target.value)}
            className={errors.schoolName ? "border-destructive" : ""}
          />
          {errors.schoolName && <p className="text-sm text-destructive mt-1">{errors.schoolName}</p>}
        </div>

        <div>
          <Label htmlFor="county">County *</Label>
          <Select value={formData.county} onValueChange={(value) => handleChange("county", value)}>
            <SelectTrigger className={errors.county ? "border-destructive" : ""}>
              <SelectValue placeholder="Select your county" />
            </SelectTrigger>
            <SelectContent>
              {ohioCounties.map((county) => (
                <SelectItem key={county} value={county}>
                  {county}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.county && <p className="text-sm text-destructive mt-1">{errors.county}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Contact Person *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)}
              className={errors.contactName ? "border-destructive" : ""}
            />
            {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName}</p>}
          </div>
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="ellStudents">Number of ELL Students *</Label>
          <Input
            id="ellStudents"
            type="number"
            value={formData.ellStudents}
            onChange={(e) => handleChange("ellStudents", e.target.value)}
            className={errors.ellStudents ? "border-destructive" : ""}
          />
          {errors.ellStudents && <p className="text-sm text-destructive mt-1">{errors.ellStudents}</p>}
        </div>

        <div>
          <Label htmlFor="languages">Primary Languages Spoken by Students *</Label>
          <Input
            id="languages"
            placeholder="e.g., Dari, Pashto, Arabic, Spanish"
            value={formData.languages}
            onChange={(e) => handleChange("languages", e.target.value)}
            className={errors.languages ? "border-destructive" : ""}
          />
          {errors.languages && <p className="text-sm text-destructive mt-1">{errors.languages}</p>}
        </div>

        <div>
          <Label htmlFor="currentTools">Current Assistive Tech Tools Used (if any)</Label>
          <Textarea
            id="currentTools"
            value={formData.currentTools}
            onChange={(e) => handleChange("currentTools", e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="demoDate">Preferred Demo Date for PD Session</Label>
          <Input
            id="demoDate"
            type="text"
            placeholder="e.g., Week of March 15th"
            value={formData.demoDate}
            onChange={(e) => handleChange("demoDate", e.target.value)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="schedulePD"
              checked={formData.schedulePD}
              onCheckedChange={(checked) => handleChange("schedulePD", checked as boolean)}
            />
            <Label htmlFor="schedulePD" className="font-normal cursor-pointer">
              Yes, I'd like to schedule a professional development demonstration
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="updates"
              checked={formData.updates}
              onCheckedChange={(checked) => handleChange("updates", checked as boolean)}
            />
            <Label htmlFor="updates" className="font-normal cursor-pointer">
              Yes, send me updates about the Ohio pilot program
            </Label>
          </div>
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};
