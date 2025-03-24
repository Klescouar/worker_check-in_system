import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    return NextResponse.json(
      { error: "User not found in cookies" },
      { status: 404 }
    );
  }

  try {
    const parsedUser = JSON.parse(decodeURIComponent(userCookie.value));

    const user = await prisma.user.findFirst({
      where: {
        id: parsedUser.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    const checkIn = await prisma.checkIn.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      ...user,
      status: checkIn?.status ?? null,
      chekinTimestamp: checkIn?.timestamp ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid user cookie format" },
      { status: 400 }
    );
  }
}
