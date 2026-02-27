"use client";

import { useState } from "react";
import { login } from "@/lib/api/auth.api";
import { saveAuth } from "@/lib/auth/auth-storage";
import { useRouter } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

// TODO: save login info

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    try {
      const data = await login(email, password);
      saveAuth(data.token, data.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      alert("Login inválido");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="self-end text-right justify-end">
          {loading ? (
            <Button disabled type="submit">
              Entrar <Spinner />
            </Button>
          ) : (
            <Button type="submit">
              Entrar <ArrowRight />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
