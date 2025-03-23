import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions/logout";
import "../globals.css";

export default async function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  if (!userCookie) {
    redirect("/");
  }
  const userInfo = JSON.parse(decodeURIComponent(userCookie.value));

  return (
    <html lang="en">
      <body className="flex bg-gray-50 text-gray-800">
        <aside className="w-80 bg-white shadow-md p-6 border-r border-gray-200 flex flex-col justify-between">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl text-gray-600 mb-4">
              👤
            </div>

            <h2 className="text-xl font-bold">
              {userInfo.firstName} {userInfo.lastName}
            </h2>
          </div>

          <form action={logoutAction} method="POST" className="mt-6">
            <button
              type="submit"
              className="w-full cursor-pointer bg-red-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </form>
        </aside>

        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
