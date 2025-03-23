import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { Presence } from "@/types";

const prisma = new PrismaClient();

const checkOutSchema = z.object({
  siteId: z.string().min(1),
  presence: z.nativeEnum(Presence),
});

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userSession = JSON.parse(decodeURIComponent(userCookie.value));
  const body = await req.json();
  const parsed = checkOutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

  const { siteId, presence } = parsed.data;

  const user = await prisma.user.findFirst({
    where: {
      id: userSession.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const timestamp = new Date();

  await prisma.$transaction([
    prisma.checkIn.upsert({
      where: { userId: user.id },
      update: {
        status: presence,
        timestamp,
      },
      create: {
        userId: user.id,
        status: presence,
        timestamp,
      },
    }),

    prisma.user.update({
      where: { id: user.id },
      data: { siteId },
    }),

    prisma.history.create({
      data: {
        userId: user.id,
        siteId,
        status: presence,
      },
    }),
  ]);

  await supabase.channel("realtime:worker").send({
    type: "broadcast",
    event: "worker:update",
    payload: {
      action: presence,
      user: { ...user, siteId },
    },
  });

  return NextResponse.json({ message: "Status updated successfully" });
}
