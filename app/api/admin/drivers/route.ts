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

    const drivers =
      await db.user.findMany({
        where: {
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

              documents:
                true
            }
          }
        },

        orderBy: {
          createdAt:
            "desc"
        },

        take:
          500
      });

    return NextResponse.json({
      drivers
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
