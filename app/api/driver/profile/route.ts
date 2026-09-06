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
    const session =
      await requireSession(
        "DRIVER"
      );

    const user =
      await db.user.findUnique({
        where: {
          id:
            session.id
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
                },

                take:
                  25
              }
            }
          }
        }
      });

    return NextResponse.json({
      user
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
