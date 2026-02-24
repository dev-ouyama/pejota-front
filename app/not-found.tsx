"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // mark mounted so initial client render matches server (both show "...")
  useEffect(() => {
    setMounted(true);
  }, []);

  // initialize timer only after mount to avoid hydration mismatch
  useEffect(() => {
    if (!mounted) return;

    setTimeLeft(5);
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return 5;
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [mounted]);

  // redirect when timer finishes
  // TODO: implement auth check here to redirect to dashboard if logged in, or root if not
  useEffect(() => {
    const target = "/dashboard";
    if (timeLeft !== null && timeLeft <= 0 && pathname !== target) {
      if (typeof window !== "undefined") {
        window.location.replace(target);
      } else {
        router.replace(target);
      }
    }
  }, [timeLeft, router, pathname]);

  return (
    <div className="flex flex-col min-h-screen gap-8 items-center justify-center p-8">
      <div className="flex items-center gap-4 mt-auto">
        <h1 className="text-9xl font-bold">404</h1>
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-32"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Página não encontrada.</h1>
          <p className="text-sm text-muted-foreground">
            Essa rota não existe ou foi movida.
          </p>
        </div>
      </div>

      <div className="w-xl justify-between items-center flex flex-col">
        <Button asChild className="self-end">
          <Link href="/">
            <ChevronLeftIcon className="h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      <h2 className="text-sm text-muted-foreground mt-auto">
        Redirecionando em {timeLeft === null ? "..." : timeLeft} segundos...
      </h2>
    </div>
  );
}
