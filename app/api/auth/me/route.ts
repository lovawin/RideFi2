import {
  NextResponse
} from "next/server";

import {
  getSession
} from "@/lib/auth";

import {
  db
} from "@/lib/db";

export async function GET() {
  const session =
    await getSession();

  if (!session) {
    return NextResponse.json(
      {
        authenticated:
          false
      }
    );
  }

  const user =
    await db.user.findUnique({
      where: {
        id:
          session.id
      },

      include: {
        riderProfile:
          true,

        driverProfile: {
          include: {
            license:
              true,

            vehicles:
              true,

            documents:
              true
          }
        },

        wallet:
          true
      }
    });

  if (!user) {
    return NextResponse.json(
      {
        authenticated:
          false
      }
    );
  }

  return NextResponse.json({
    authenticated:
      true,

    user: {
      id:
        user.id,

      role:
        user.role,

      status:
        user.status,

      firstName:
        user.firstName,

      lastName:
        user.lastName,

      email:
        user.email,

      phone:
        user.phone,

      rating:
        user.rating,

      ratingCount:
        user.ratingCount,

      identityStatus:
        user.identityStatus,

      riderProfile:
        user.riderProfile,

      driverProfile:
        user.driverProfile,

      wallet:
        user.wallet
    }
  });
}
