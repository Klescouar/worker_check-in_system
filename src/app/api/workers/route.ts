import { Presence } from "@/types";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workers = await prisma.user.findMany({
    where: {
      role: "worker",
      checkIn: {
        status: Presence.CHECKED_IN,
      },
    },
  });

  return NextResponse.json(workers);
}
