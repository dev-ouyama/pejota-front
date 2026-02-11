import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendBase =
    (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "") || "";
  const backendUrl = `${backendBase}/api/login`;

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  // forward response body and status
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  return NextResponse.json(data, { status: res.status });
}
