import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock } from "lucide-react";
import lbIcon from "@/assets/languagebridge-icon-256.png";

interface AdminLoginProps {
  onAuthenticated: () => void;
}

const AdminLogin = ({ onAuthenticated }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-proxy`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "auth",
          password: password.trim(),
        }),
      });

      if (res.ok) {
        sessionStorage.setItem("lb_admin", password.trim());
        onAuthenticated();
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#f5eaf4" }}>
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center pb-2 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={lbIcon} alt="LanguageBridge" className="h-12 w-12 rounded-lg" />
            <span className="text-2xl font-bold" style={{ color: "#4a1a45" }}>
              Language<span style={{ background: "linear-gradient(90deg, #f37030, #ffc755)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Bridge</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: "#4a1a45" }}>Admin Dashboard</p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: "#4a1a45" }}>Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#742a69" }} />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoFocus
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full text-white"
              style={{ background: "#742a69" }}
            >
              {loading ? "Verifying…" : "Access Dashboard"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
