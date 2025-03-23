import Link from "next/link";
import "../globals.css";
import { logoutAction } from "../actions/logout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50 text-gray-800">
        <aside className="flex flex-col justify-between w-64 bg-white shadow-md p-6 border-r border-gray-200 fixed h-full">
          <div>
            <h2 className="text-xl font-bold mb-6">Menu</h2>
            <nav className="space-y-4">
              <Link
                href="/supervisor/"
                className="block px-3 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/supervisor/history"
                className="block px-3 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                History
              </Link>
            </nav>
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

        <main className="flex-1 p-6 pl-64">{children}</main>
      </body>
    </html>
  );
}
