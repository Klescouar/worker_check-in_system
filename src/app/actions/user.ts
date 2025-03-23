"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserFromCookies = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    redirect("/");
  }
  return JSON.parse(decodeURIComponent(userCookie.value));
};
