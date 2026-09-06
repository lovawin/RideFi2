import {
  NextResponse
} from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "RideFi",
    version: "0.6.0"
  });
}
