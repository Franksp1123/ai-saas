import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { userId } = auth();
  const currentDate = new Date();
  let subscriptionPeriodEnd = new Date(currentDate);
  subscriptionPeriodEnd.setDate(currentDate.getDate() + 30);
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    await prismadb.userSubscription.create({
      data: {
        userId,
        subscriptionID: id,
        subscriptionPeriodEnd,
      },
    });
  } catch (error: any) {
    return new NextResponse(`Network Error: ${error.message}`, { status: 400 });
  }

  return new NextResponse("ok", { status: 200 });
}
