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

    const riders =
      await db.user.findMany({
        where: {
          role:
            "RIDER"
        },

        include: {
          riderProfile:
            true,

          wallet:
            true,

          safetyEvents: {
            where: {
              resolved:
                false
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
      riders
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
