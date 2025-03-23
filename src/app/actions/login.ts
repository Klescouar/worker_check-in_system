"use server";
import { fetchWithCatch } from "@/utils";
import { cookies } from "next/headers";

export async function loginAction(formData: {
  firstName: string;
  lastName: string;
  role: string;
}) {
  const res = await fetchWithCatch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  );

  if (res.ok) {
    const { user } = await res.json();
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(user));

    return user;
  }
}
