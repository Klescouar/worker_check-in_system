"use client";

import { updatePresence } from "@/app/actions/presence";
import { Presence } from "@/types";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const schema = z.object({
  siteId: z.string().min(1, "Site ID is required"),
});

export default function CheckIn() {
  const form = useForm({
    defaultValues: {
      siteId: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) =>
      updatePresence(value.siteId, Presence.CHECKED_IN),
  });

  return (
    <div className="flex items-center justify-center from-blue-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200 min-w-96">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-green-600 text-xl">✅</span>{" "}
          <h1 className="text-xl font-semibold text-gray-800">Check-In</h1>
        </div>
        <form className="space-y-6" action={form.handleSubmit}>
          <form.Field name="siteId">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor="siteId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Site Identifier
                </label>
                <input
                  id="siteId"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  type="text"
                  placeholder="Ex: site-123"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-150"
            >
              Confirm Check-In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
