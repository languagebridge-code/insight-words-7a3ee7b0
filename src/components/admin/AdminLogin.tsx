import { useState } from "react";
import { setApiKey } from "./adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock } from "lucide-react";
import lbIcon from "@/assets/languagebridge-icon-256.png";

interface AdminLoginProps {
  onAuthenticated: () => void;
}

const AdminLogin = ({ onAuthenticated }: AdminLoginProps) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://exquisite-croissant-4288dd.netlify.app/.netlify/functions/admin-stats?limit=1",
        { headers: { "X-API-Key": key.trim() } }
      );

      if (res.status === 401 || res.status === 403) {
        setError("Invalid API key. Please try again.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError("Unable to connect. Please try again.");
        setLoading(false);
        return;
      }

      setApiKey(key.trim());
      onAuthenticated();
    } catch {
      setError("Network error. Please check your connection.");
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
              <label className="text-sm font-medium" style={{ color: "#4a1a45" }}>Admin API Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#742a69" }} />
                <Input
                  type="password"
                  placeholder="Enter your API key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
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
              disabled={loading || !key.trim()}
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
