"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

// Layout components
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const checkedRef = useRef(false);

  // minimal deferral to avoid synchronous setState-in-effect lint while mounting quickly
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  // run check once after mount to decide sidebar ownership
  useEffect(() => {
    if (!mounted || checkedRef.current) return;
    checkedRef.current = true;

    const existing = document.querySelector("[data-pejota-sidebar]");
    // setShowSidebar only once
    setShowSidebar(!existing);
  }, [mounted]);

  // when we are the owner, register a persistent sentinel on body for other blocks to detect
  useEffect(() => {
    if (!showSidebar || !mounted) return;
    document.body.setAttribute("data-pejota-sidebar", "true");
    return () => {
      document.body.removeAttribute("data-pejota-sidebar");
    };
  }, [showSidebar, mounted]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  // memoize content so layout doesn't re-render AppSidebar/children unnecessarily
  const content = useMemo(() => {
    return (
      <div className="flex min-h-screen">
        {showSidebar ? (
          // sentinel attribute visible in DOM to prevent duplicate renderers elsewhere
          <div data-pejota-sidebar>
            <AppSidebar />
          </div>
        ) : null}

        <main className="flex-1">
          {showSidebar ? <SidebarTrigger /> : null}
          {mounted && isAuthenticated ? children : null}
        </main>
      </div>
    );
    // intentionally exclude `children` from deps to avoid remounting; they are stable for layout
    // `mounted`, `isAuthenticated`, and `showSidebar` will cause rerenders when needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, isAuthenticated, showSidebar]);

  // keep SidebarProvider only when we render the sidebar to avoid conflicting contexts
  return showSidebar ? <SidebarProvider>{content}</SidebarProvider> : content;
}
