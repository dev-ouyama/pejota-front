"use client";

import { createContext, useContext, useState } from "react";
import { login as loginApi } from "@/lib/api/auth.api";
import { getToken, getUser, saveAuth, clearAuth } from "./auth-storage";
import { hasPermission, Permission } from "./permissions";

type User = {
  name: string;
  role: string[];
  permissions: Permission[];
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // allow undefined so callers can pass optional permission without casting
  can: (permission?: Permission | Permission[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);



export function AuthProvider({ children }: { children: React.ReactNode }) {
  // lazy initialize from localStorage to avoid setting state inside an effect
  const [token, setToken] = useState<string | null>(() => {
    try {
      return getToken();
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      return getUser<User>();
    } catch {
      return null;
    }
  });

  async function login(email: string, password: string) {
    const data = await loginApi(email, password);
    saveAuth(data.token, data.user);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    clearAuth();
    setToken(null);
    setUser(null);
  }

  function can(permission?: Permission | Permission[]) {
    return hasPermission(user?.permissions, permission);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token && user),
        login,
        logout,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
