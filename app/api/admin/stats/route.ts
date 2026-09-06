import {
  NextResponse
} from "next/server";

import {
  requireSession
} from "@/lib/auth";

import {
  db
} from "@/lib/db";

export async function GET() {
  try {
    await requireSession(
      "ADMIN"
    );

    const [
      riders,
      drivers,
      activeDrivers,
      pendingDrivers,
      suspendedUsers,
      activeRides,
      safetyEvents
    ] =
      await Promise.all([
        db.user.count({
          where: {
            role:
              "RIDER"
          }
        }),

        db.user.count({
          where: {
            role:
              "DRIVER"
          }
        }),

        db.user.count({
          where: {
            role:
              "DRIVER",

            status:
              "ACTIVE"
          }
        }),

        db.user.count({
          where: {
            role:
              "DRIVER",

            status:
              "PENDING"
          }
        }),

        db.user.count({
          where: {
            status:
              "SUSPENDED"
          }
        }),

        db.ride.count({
          where: {
            status: {
              in: [
                "MATCHING",
                "ACCEPTED",
                "DRIVER_ARRIVING",
                "DRIVER_WAITING",
                "IN_PROGRESS"
              ]
            }
          }
        }),

        db.safetyEvent.count({
          where: {
            resolved:
              false
          }
        })
      ]);

    return NextResponse.json({
      riders,
      drivers,
      activeDrivers,
      pendingDrivers,
      suspendedUsers,
      activeRides,
      safetyEvents
    });

  } catch {
    return NextResponse.json(
      {
        error:
          "Unauthorized"
      },
      {
        status: 401
      }
    );
  }
}
