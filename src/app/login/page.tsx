"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, MapPinned } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [email, setEmail] = useState("demo@salesflow.app");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  if (user) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await login(email.trim(), password);
      if (res.success) router.push("/");
      else setError(res.message || "Could not sign in");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <MapPinned className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">SalesFlow</h1>
          <p className="text-sm text-slate-500 mt-2">Field sales, made visible.</p>
          <span className="inline-flex mt-3 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">INTERACTIVE PORTFOLIO DEMO</span>
        </div>

        <Card className="card-shadow-md border border-slate-100 rounded-2xl">
          <CardHeader className="pb-3">
            <p className="text-sm text-slate-600 text-center">Explore the sales workspace</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-medium text-slate-600">Demo email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl" autoComplete="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-medium text-slate-600">Demo password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl" autoComplete="current-password" />
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Demo access</span><br />
                demo@salesflow.app <span className="text-slate-400">/</span> demo123
              </div>
              {error && <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">{error}</div>}
              <Button className="w-full h-11 rounded-xl gradient-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity" type="submit" disabled={submitting}>
                {submitting ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Opening demo...</span> : "Explore demo"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-[11px] text-slate-400 mt-6">Independent portfolio project · All sample data is fictional</p>
      </div>
    </div>
  );
}
