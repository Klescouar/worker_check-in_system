"use server";

import { Presence } from "@/types";
import { redirect } from "next/navigation";
import { fetchWithCatch } from "@/utils";
import { getUserFromCookies } from "./user";

export async function updatePresence(siteId: string, presence: Presence) {
  const userInfo = await getUserFromCookies();

  await fetchWithCatch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/presence`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `user=${encodeURIComponent(JSON.stringify(userInfo))}`,
    },
    body: JSON.stringify({
      siteId,
      presence,
    }),
  });

  redirect("/worker");
}
