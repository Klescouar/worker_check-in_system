import { updatePresence } from "@/app/actions/presence";
import { Presence } from "@/types";

export default function CheckOut({ siteId }: Readonly<{ siteId: string }>) {
  return (
    <form
      action={async () => {
        "use server";
        await updatePresence(siteId, Presence.CHECKED_OUT);
      }}
      className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4"
    >
      <button
        type="submit"
        className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition duration-150"
      >
        Check-out from <b>{siteId}</b> site
      </button>
    </form>
  );
}
