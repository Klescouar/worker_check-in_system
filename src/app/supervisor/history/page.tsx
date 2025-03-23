import { format } from "date-fns";
import { History, User } from "@prisma/client";
import { fetchWithCatch } from "@/utils";

type UserHistory = History & { user: User };

export default async function HistoryPage() {
  const res = await fetchWithCatch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/history`
  );
  const history = await res.json();

  if (!history.length)
    return (
      <div className="p-6 max-w-4xl mx-auto text-center text-gray-500 text-lg">
        No attendance events found.
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Attendance History
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Site</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry: UserHistory) => (
              <tr
                key={entry.id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="px-4 py-2">{entry.user?.lastName || "-"}</td>
                <td className="px-4 py-2">{entry.user?.firstName || "-"}</td>
                <td className="px-4 py-2">{entry.siteId}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      entry.status === "CHECKED_IN"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.status === "CHECKED_IN"
                      ? "Checked In"
                      : entry.status === "CHECKED_OUT"
                      ? "Checked Out"
                      : entry.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {format(new Date(entry.timestamp), "dd/MM/yyyy HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
