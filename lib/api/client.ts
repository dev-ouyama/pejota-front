import { getToken } from "../auth/auth-storage";

const url = `https://backpejota.naviatech.me`;

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const token = getToken();

  const isAbsolute = /^https?:\/\//i.test(path);
  const fetchUrl = path.startsWith("/")
    ? path
    : isAbsolute
      ? path
      : `${url?.replace(/\/$/, "") ?? ""}/${path.replace(/^\/+/, "")}`;

  const res = await fetch(fetchUrl, {
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
