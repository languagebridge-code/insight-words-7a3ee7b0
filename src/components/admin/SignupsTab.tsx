import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { fetchSignups, type Signup } from "./adminApi";
import { toast } from "sonner";

const SignupsTab = () => {
  const [password, setPassword] = useState("");
  const [signups, setSignups] = useState<Signup[] | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchSignups(password);
      setSignups(data);
    } catch {
      toast.error("Could not load signups. Check the admin password.");
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    if (!signups) return;
    const rows = [
      ["Name", "Email", "Role", "Organization", "Signed up"],
      ...signups.map((s) => [
        s.full_name,
        s.email,
        s.role ?? "",
        s.organization,
        new Date(s.created_at).toLocaleString(),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `languagebridge-signups-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!signups) {
    return (
      <div className="max-w-sm bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-1" style={{ color: "#4a1a45" }}>
          Signups
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Enter the admin password to view the signup list.
        </p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Admin password"
          className="mb-3"
        />
        <Button onClick={load} disabled={loading || !password} className="w-full">
          {loading ? "Loading…" : "View signups"}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg" style={{ color: "#4a1a45" }}>
          Signups ({signups.length})
        </h2>
        <Button onClick={exportCsv} size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Organization</th>
              <th className="py-2">Signed up</th>
            </tr>
          </thead>
          <tbody>
            {signups.map((s, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2 pr-4">{s.full_name || "—"}</td>
                <td className="py-2 pr-4">{s.email}</td>
                <td className="py-2 pr-4">{s.role || "—"}</td>
                <td className="py-2 pr-4">{s.organization}</td>
                <td className="py-2">{new Date(s.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignupsTab;
