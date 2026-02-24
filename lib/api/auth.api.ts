import { apiFetch } from "./client";

export type LoginResponse = {
  token: string;
  user: { name: string; role: string[]; permissions: string[] };
};

export function login(email: string, password: string) {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
