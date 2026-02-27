import { API_BASE_URL } from "./config";

export type LoginResponse = {
  token: string;
  user: { name: string; role: string[]; permissions: string[] };
};

type RawLoginResponse = {
  token_type?: string;
  access_token: string;
  [key: string]: any;
};

function buildUrl(path: string) {
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function parseErrorResponse(res: Response) {
  let message = res.statusText || `HTTP ${res.status}`;
  try {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = await res.json();
      if (body?.message) message = body.message;
      else message = JSON.stringify(body);
    } else {
      message = await res.text();
    }
  } catch {
    // ignore parse errors
  }
  throw new Error(`API error ${res.status}: ${message}`);
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const loginUrl = buildUrl("auth/login");

  const res = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) await parseErrorResponse(res);

  const data = (await res.json()) as RawLoginResponse;
  const accessToken = data?.access_token;
  if (!accessToken) {
    throw new Error("Login response missing access_token");
  }

  const meUrl = buildUrl("auth/me");
  const meRes = await fetch(meUrl, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!meRes.ok) await parseErrorResponse(meRes);

  const user = await meRes.json();

  return {
    token: accessToken,
    user,
  };
}
