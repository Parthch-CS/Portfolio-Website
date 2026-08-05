import { NextRequest } from "next/server";

export const runtime = "edge"; // Vercel Edge — fast, globally distributed

export async function GET(request) {
  // Read real visitor IP from Vercel/proxy headers
  const xff = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = xff ? xff.split(",")[0].trim() : realIp ?? "unknown";

  // If running locally the IP will be ::1 or 127.0.0.1 — return a dev placeholder
  if (ip === "::1" || ip === "127.0.0.1" || ip === "unknown") {
    return Response.json({
      ip: "127.0.0.1",
      city: "Localhost",
      country: "Dev Environment",
      isp: "Local Network",
      ok: true,
    });
  }

  // Server-side fetch — no CORS, no CSP restrictions
  const apis = [
    async () => {
      const res = await fetch(`https://ipwho.is/${ip}`, { next: { revalidate: 0 } });
      if (!res.ok) throw new Error("ipwho");
      const d = await res.json();
      if (!d.success) throw new Error("ipwho-fail");
      return {
        ip: d.ip,
        city: d.city ?? "—",
        country: d.country ?? "—",
        isp: d.connection?.isp ?? d.org ?? "—",
      };
    },
    async () => {
      const res = await fetch(`https://freeipapi.com/api/json/${ip}`, { next: { revalidate: 0 } });
      if (!res.ok) throw new Error("freeipapi");
      const d = await res.json();
      return {
        ip: d.ipAddress ?? ip,
        city: d.cityName ?? "—",
        country: d.countryName ?? "—",
        isp: d.isp ?? "—",
      };
    },
    async () => {
      const res = await fetch(`https://ipapi.co/${ip}/json/`, { next: { revalidate: 0 } });
      if (!res.ok) throw new Error("ipapi");
      const d = await res.json();
      if (d.error) throw new Error("ipapi-fail");
      return {
        ip: d.ip ?? ip,
        city: d.city ?? "—",
        country: d.country_name ?? "—",
        isp: d.org ?? "—",
      };
    },
  ];

  for (const api of apis) {
    try {
      const data = await api();
      return Response.json({ ...data, ok: true });
    } catch {
      // try next
    }
  }

  // All APIs failed — return the IP we know at minimum
  return Response.json({
    ip,
    city: "—",
    country: "—",
    isp: "—",
    ok: false,
  });
}
