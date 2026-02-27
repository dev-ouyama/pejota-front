import { getToken } from "../auth/auth-storage";
import { API_BASE_URL } from "./config";

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = getToken();

  const isAbsolute = /^https?:\/\//i.test(path);

  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Please define NEXT_PUBLIC_API_URL in your environment.",
    );
  }

  // Always post to the configured backend. If an absolute URL is provided use
  // it as-is, otherwise append the path to API_BASE_URL.
  const fetchUrl = isAbsolute
    ? path
    : `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body !== undefined
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(fetchUrl, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = res.statusText;
    try {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const body = await res.json();
        if (body?.message) errorMessage = body.message;
        else errorMessage = JSON.stringify(body);
      } else {
        errorMessage = await res.text();
      }
    } catch {
      // ignore parsing errors
    }
    throw new Error(`API error ${res.status}: ${errorMessage}`);
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    return text as unknown as T;
  }

  return res.json() as Promise<T>;
}
