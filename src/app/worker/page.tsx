import CheckIn from "@/components/check-in";
import CheckOut from "@/components/check-out";
import { Presence } from "@/types";
import { fetchWithCatch } from "@/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WorkerPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    redirect("/");
  }

  const userInfo = JSON.parse(decodeURIComponent(userCookie.value));

  const res = await fetchWithCatch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
    {
      headers: {
        Cookie: `user=${encodeURIComponent(JSON.stringify(userInfo))}`,
      },
    }
  );
  const user = await res.json();

  const isCheckedIn = user?.status === Presence.CHECKED_IN;

  return (
    <div className="min-h-screen flex gap-10 flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Hello {user?.firstName}
      </h1>
      {isCheckedIn && (
        <p className="text-gray-600 text-center">
          You are currently checked in at site{" "}
          <span className="font-semibold">{user?.siteId}</span>
        </p>
      )}
      {isCheckedIn ? <CheckOut siteId={user.siteId} /> : <CheckIn />}
    </div>
  );
}
