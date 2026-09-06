import {
  NextResponse
} from "next/server";

import bcrypt
  from "bcryptjs";

import {
  db
} from "@/lib/db";

import {
  createSession
} from "@/lib/auth";

import {
  signupSchema
} from "@/lib/validators";

export async function POST(
  request: Request
) {
  try {
    const parsed =
      signupSchema.safeParse(
        await request.json()
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            "Invalid signup data",

          details:
            parsed.error.flatten()
        },
        {
          status: 400
        }
      );
    }

    const data =
      parsed.data;

    const existing =
      await db.user.findFirst({
        where: {
          OR: [
            {
              email:
                data.email
            },

            ...(data.phone
              ? [
                  {
                    phone:
                      data.phone
                  }
                ]
              : [])
          ]
        }
      });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An account already exists"
        },
        {
          status: 409
        }
      );
    }

    const passwordHash =
      await bcrypt.hash(
        data.password,
        12
      );

    const user =
      await db.user.create({
        data: {
          role:
            data.role,

          status:
            data.role ===
            "RIDER"
              ? "ACTIVE"
              : "PENDING",

          firstName:
            data.firstName,

          lastName:
            data.lastName,

          email:
            data.email,

          phone:
            data.phone,

          passwordHash,

          riderProfile:
            data.role ===
            "RIDER"
              ? {
                  create: {}
                }
              : undefined,

          driverProfile:
            data.role ===
            "DRIVER"
              ? {
                  create: {}
                }
              : undefined,

          wallet: {
            create: {
              custodial:
                true
            }
          }
        }
      });

    await createSession({
      id:
        user.id,

      role:
        user.role,

      email:
        user.email
    });

    return NextResponse.json({
      ok: true,

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
          user.email
      }
    });

  } catch (error) {
    console.error(
      "signup:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to create account"
      },
      {
        status: 500
      }
    );
  }
}
