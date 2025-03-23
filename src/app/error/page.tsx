import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white px-6 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full border border-red-100">
        <div className="text-5xl mb-4 text-red-500">❌</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          An error occurred
        </h1>
        <p className="text-gray-600 mb-6">
          We’re sorry. An unexpected error occurred. Please try again later or
          contact the technical team if the issue persists.
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg shadow transition duration-150"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
