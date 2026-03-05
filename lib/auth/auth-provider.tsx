"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getToken, removeToken } from "./token";

type AuthContextType = {
  user: boolean;
  loading: boolean;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    const token = getToken();
    setUser(!!token);
    setLoading(false);
  };

  useEffect(() => {
    // initial check
    refresh();

    // listen for token changes in other tabs/windows
    function onStorage(e: StorageEvent) {
      if (e.key === "token") refresh();
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function logout() {
    removeToken();
    setUser(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider missing");
  return ctx;
}
