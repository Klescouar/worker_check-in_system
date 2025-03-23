import { fetchWithCatch } from "../utils";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("fetchWithCatch", () => {
  it("returns the response if fetch is successful", async () => {
    const mockResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const res = await fetchWithCatch("/api/test");
    expect(res.ok).toBe(true);
  });

  it("redirects on fetch error", async () => {
    const { redirect } = await import("next/navigation");

    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    await fetchWithCatch("/api/test");
    expect(redirect).toHaveBeenCalledWith("/error");
  });

  it("redirects on non-ok response", async () => {
    const { redirect } = await import("next/navigation");

    const badResponse = new Response(null, { status: 500 });
    global.fetch = vi.fn().mockResolvedValue(badResponse);

    await fetchWithCatch("/api/test");
    expect(redirect).toHaveBeenCalledWith("/error");
  });
});
