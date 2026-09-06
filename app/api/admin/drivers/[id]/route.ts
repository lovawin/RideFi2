import {
  NextResponse
} from "next/server";

import {
  requireSession
} from "@/lib/auth";

import {
  db
} from "@/lib/db";

export async function GET(
  request: Request,
  context: {
    params:
      Promise<{
        id: string;
      }>
  }
) {
  try {
    await requireSession(
      "ADMIN"
    );

    const {
      id
    } =
      await context.params;

    const driver =
      await db.user.findFirst({
        where: {
          id,

          role:
            "DRIVER"
        },

        include: {
          driverProfile: {
            include: {
              license:
                true,

              vehicles:
                true,

              documents: {
                orderBy: {
                  createdAt:
                    "desc"
                }
              },

              payouts: {
                orderBy: {
                  createdAt:
                    "desc"
                }
              }
            }
          },

          driverRides: {
            orderBy: {
              createdAt:
                "desc"
            },

            take:
              30
          },

          safetyEvents: {
            orderBy: {
              createdAt:
                "desc"
            },

            take:
              30
          }
        }
      });

    if (!driver) {
      return NextResponse.json(
        {
          error:
            "Driver not found"
        },
        {
          status: 404
        }
      );
    }

    return NextResponse.json({
      driver
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
