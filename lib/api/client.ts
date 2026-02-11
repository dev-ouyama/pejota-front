import { API_BASE_URL } from "./config";
import { getToken } from "../auth/auth-storage";

const normalizedBaseUrl = API_BASE_URL.endsWith("/")
  ? `${API_BASE_URL}api`
  : `${API_BASE_URL}/api`;

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = getToken();

  // If path is an absolute URL (http...) or a root-relative path (/...) use it as-is,
  // otherwise prepend normalizedBaseUrl.
  const url =
    path.startsWith("http") || path.startsWith("/")
      ? path
      : `${normalizedBaseUrl}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}
