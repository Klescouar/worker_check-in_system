import { fetchWithCatch } from "@/utils";

export async function fetchWorkersFromServer() {
  const res = await fetchWithCatch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/workers`
  );
  return res.json();
}
