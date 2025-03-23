import { Presence } from "@/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
