"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarBreadcrumb } from "@/components/sidebar-breadcrumb";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // ready flag for client-only auth check to avoid hydration mismatch
  // and flicker of protected content on initial load
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  /* Auth guard */
  /* If not authenticated, redirect to home */
  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/");
    }
  }, [isReady, isAuthenticated, router]);

  /* Flicker guard */
  if (!isReady || !isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <SidebarBreadcrumb />
          </div>
        </header>

        <Separator />
        <main className="flex-1">{isReady ? children : null}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
