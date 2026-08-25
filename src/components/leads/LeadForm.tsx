import { useState } from "react";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

const leadSchema = z.object({
  name: z.string().trim().min(1, { message: "Please enter your name" }).max(200),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Please enter a valid email address" })
    .max(255),
  role: z.string().trim().min(1, { message: "Please choose your role" }).max(120),
  message: z.string().trim().max(2000).optional(),
});

export const ROLE_OPTIONS = [
  "ESL / EL Teacher",
  "Classroom Teacher",
  "EL Coordinator / Director",
  "Building Administrator",
  "District Administrator",
  "Technology Director",
  "Parent / Guardian",
  "Other",
];

interface LeadFormProps {
  /** Where the submission came from, e.g. "hero", "features-cta" */
  source: string;
  /** Show the optional message field */
  showMessage?: boolean;
  submitLabel?: string;
  onSuccess?: () => void;
}

export const LeadForm = ({
  source,
  showMessage = true,
  submitLabel = "Send Me the Details",
  onSuccess,
}: LeadFormProps) => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = leadSchema.safeParse({ name, email, role, message });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-lead", {
        body: { ...parsed.data, source, pagePath: location.pathname },
      });
      if (error || (data && (data as { error?: string }).error)) {
        setErrors({
          form: "We couldn't send that just now. Please email contact@languagebridge.app and we'll take care of it.",
        });
        return;
      }
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setErrors({
        form: "We couldn't send that just now. Please email contact@languagebridge.app and we'll take care of it.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4">
        <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-bold mb-3 text-foreground">You're on the list</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Check your inbox for a confirmation. Justin will follow up personally within one
          business day with next steps for your classroom or district.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="space-y-2">
        <Label htmlFor={`lead-name-${source}`}>Name</Label>
        <Input
          id={`lead-name-${source}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          maxLength={200}
          autoComplete="name"
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`lead-email-${source}`}>Work email</Label>
        <Input
          id={`lead-email-${source}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@district.org"
          maxLength={255}
          autoComplete="email"
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`lead-role-${source}`}>Your role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger id={`lead-role-${source}`}>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {ROLE_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
      </div>

      {showMessage && (
        <div className="space-y-2">
          <Label htmlFor={`lead-message-${source}`}>
            Anything we should know? <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id={`lead-message-${source}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Number of EL students, languages, timeline..."
            maxLength={2000}
            rows={3}
          />
        </div>
      )}

      {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full gradient-primary text-primary-foreground shadow-lg hover:opacity-90"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          submitLabel
        )}
      </Button>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        No student data, no spam. We only use this to answer your questions.
      </p>
    </form>
  );
};
