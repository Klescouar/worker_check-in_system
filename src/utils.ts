import { redirect } from "next/navigation";

export async function fetchWithCatch(input: RequestInfo, init?: RequestInit) {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      redirect("/error");
    }
    return res;
  } catch {
    redirect("/error");
  }
}
