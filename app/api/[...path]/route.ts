const API_BASE = "https://backpejota.naviatech.me/api";

const ROUTE_MAP: Record<string, string> = {
  session: "auth/login",
  auth: "auth",
};

async function handler(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  const first = path[0];
  const rest = path.slice(1);

  const mapped = ROUTE_MAP[first] ?? first;

  const url = `${API_BASE}/${mapped}${rest.length ? "/" + rest.join("/") : ""}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    headers.set(key, value);
  });

  const res = await fetch(url, {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
  });

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
