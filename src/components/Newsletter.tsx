import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(255),
});

type FormValues = z.infer<typeof formSchema>;

export const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Newsletter signup:", values);
    
    toast({
      title: "Subscribed!",
      description: "You're now on our mailing list. Welcome!",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-lavender">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-peach">
                <Mail className="w-8 h-8 text-burnt-orange" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-center text-foreground mb-4">
              Stay Updated on the Ohio Pilot Program
            </h3>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Join 100+ educators already on our list
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your.email@school.edu"
                  className="h-12 text-base"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-2">{errors.email.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
