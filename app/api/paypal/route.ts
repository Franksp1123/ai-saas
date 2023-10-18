import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { userId } = auth();
  let subscriptionPeriodEnd = new Date();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  try {
    const response = await axios.get(
      `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.data)
      subscriptionPeriodEnd = response.data.billing_info.next_billing_time;
  } catch (error: any) {
    return new NextResponse(`Network Error: ${error.message}`, { status: 400 });
  }
  await prismadb.userSubscription.create({
    data: {
      userId,
      subscriptionID: id,
      subscriptionPeriodEnd,
    },
  });

  return new NextResponse("ok", { status: 200 });
}
