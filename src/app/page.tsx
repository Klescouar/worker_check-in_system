"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { loginAction } from "./actions/login";
import { Role } from "@/types";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["worker", "supervisor"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      role: "",
    },
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      const user = await loginAction(value);
      router.push(user.role === "worker" ? "/worker" : "/supervisor");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
        <form action={form.handleSubmit} className="space-y-4">
          <form.Field name="firstName">
            {(field) => (
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="lastName">
            {(field) => (
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select a role --</option>
                  <option value={Role.Worker}>Worker</option>
                  <option value={Role.Supervisor}>Supervisor</option>
                </select>
                {field.state.meta.errors?.[0] && (
                  <p className="text-red-500 text-sm mt-1">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
