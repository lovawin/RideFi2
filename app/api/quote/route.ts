import {
  NextResponse
} from "next/server";

import {
  calculateRidePrice
} from "@/lib/pricing";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const destination =
    String(
      body.destination || ""
    ).toLowerCase();

  const miles =
    destination.includes(
      "airport"
    )
      ? 8.4
      : 5.6;

  const minutes =
    Math.max(
      6,
      Math.round(
        miles * 2.15
      )
    );

  return NextResponse.json({
    pickup:
      body.pickup || "",

    destination:
      body.destination || "",

    miles,
    minutes,

    ...calculateRidePrice({
      miles,
      minutes
    })
  });
}
