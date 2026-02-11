import { apiFetch } from "./client";

export type LoginResponse = {
  token: string;
  user: { name: string; role: string[]; permissions: string[] };
};

export function login(email: string, password: string) {
  // call our same-origin proxy to avoid cross-site CSRF/CORS issues
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
