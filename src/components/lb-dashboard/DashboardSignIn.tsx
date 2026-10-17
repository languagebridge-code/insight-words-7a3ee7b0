import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import languageBridgeLogo from "@/assets/languagebridge-logo-new.svg";

// Sign-in for the LanguageBridge dashboard. No public sign-up: accounts are
// created by LanguageBridge super-admins through LB Operations → Invite staff.
// Also handles invite (type=invite) and password-reset (type=recovery) links,
// where the user sets their password.

interface Props {
  mode: "signin" | "set-password";
  onPasswordSet?: () => void;
}

const DashboardSignIn = ({ mode, onPasswordSet }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({
        title: "Sign in failed",
        description:
          error.message === "Invalid login credentials"
            ? "Invalid email or password. Please try again."
            : error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords don't match", description: "Type the same password twice.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Couldn't set password", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password set", description: "You're signed in." });
      onPasswordSet?.();
    }
  };

  const handleForgot = async () => {
    if (!email) {
      toast({ title: "Enter your email first", description: "We'll send a reset link there.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Couldn't send reset email", description: error.message, variant: "destructive" });
    } else {
      setForgotSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4">
            <img src={languageBridgeLogo} alt="LanguageBridge" className="h-12 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {mode === "set-password" ? "Set your password" : "LanguageBridge Dashboard"}
          </CardTitle>
          <CardDescription>
            {mode === "set-password"
              ? "Choose a password to finish setting up your account."
              : "Sign in with the account LanguageBridge invited."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === "set-password" ? (
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving…" : "Set password and sign in"}
              </Button>
            </form>
          ) : forgotSent ? (
            <div className="text-center space-y-4 py-4">
              <p className="text-sm text-foreground">
                If an account exists for <strong>{email}</strong>, a reset link is on its way.
              </p>
              <Button variant="outline" onClick={() => setForgotSent(false)}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dash-email">Email</Label>
                <Input
                  id="dash-email"
                  type="email"
                  placeholder="you@district.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dash-password">Password</Label>
                <Input
                  id="dash-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
              <button
                type="button"
                onClick={handleForgot}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot your password?
              </button>
            </form>
          )}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Accounts are created by invitation. Ask your district's LanguageBridge contact if you need access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSignIn;
