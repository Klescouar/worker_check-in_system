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
        console.log(payload);
        if (payload.action === Presence.CHECKED_IN) {
          console.log("IN");
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
          console.log("OUT");
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
    <div className="p-6 max-w-xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Checked-In Workers
        </h2>

        {workers.length === 0 ? (
          <p className="text-gray-500 italic">
            No workers currently checked in.
          </p>
        ) : (
          <ul className="space-y-3">
            {workers.map((worker: IWorker) => (
              <li
                key={worker.id}
                className="bg-white shadow-sm border border-gray-200 rounded-md p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {worker.firstName} {worker.lastName}
                  </p>
                  <p className="text-sm text-gray-500">Site: {worker.siteId}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
