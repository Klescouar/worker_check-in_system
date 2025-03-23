"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IWorker, Presence } from "@/types";

export default function ClientDashboard({
  initialWorkers,
}: Readonly<{
  initialWorkers: IWorker[];
}>) {
  const [workers, setWorkers] = useState(initialWorkers);

  useEffect(() => {
    const channel = supabase
      .channel("realtime:worker")
      .on("broadcast", { event: "worker:update" }, ({ payload }) => {
        if (payload.action === Presence.CHECKED_IN) {
          setWorkers((prev) => [
            ...prev,
            {
              id: payload.user.id,
              firstName: payload.user.firstName,
              lastName: payload.user.lastName,
              siteId: payload.user.siteId,
            },
          ]);
        } else {
          setWorkers((prev) =>
            prev.filter((worker) => worker.id !== payload.user.id)
          );
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Currently Checked-In Workers
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left text-xs uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-4 py-3">Last Name</th>
              <th className="px-4 py-3">First Name</th>
              <th className="px-4 py-3">Site</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {workers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-gray-500 italic"
                >
                  No workers currently checked in.
                </td>
              </tr>
            ) : (
              workers.map((worker) => (
                <tr
                  key={worker.id}
                  className="border-t border-gray-200 hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-2">{worker.lastName}</td>
                  <td className="px-4 py-2">{worker.firstName}</td>
                  <td className="px-4 py-2">{worker.siteId}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      On site
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
