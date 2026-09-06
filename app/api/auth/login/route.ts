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
  loginSchema
} from "@/lib/validators";

export async function POST(
  request: Request
) {
  const parsed =
    loginSchema.safeParse(
      await request.json()
    );

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          "Invalid login"
      },
      {
        status: 400
      }
    );
  }

  const user =
    await db.user.findUnique({
      where: {
        email:
          parsed.data.email
      }
    });

  if (!user) {
    return NextResponse.json(
      {
        error:
          "Invalid email or password"
      },
      {
        status: 401
      }
    );
  }

  const valid =
    await bcrypt.compare(
      parsed.data.password,
      user.passwordHash
    );

  if (!valid) {
    return NextResponse.json(
      {
        error:
          "Invalid email or password"
      },
      {
        status: 401
      }
    );
  }

  if (
    user.status ===
    "BANNED"
  ) {
    return NextResponse.json(
      {
        error:
          "Account unavailable"
      },
      {
        status: 403
      }
    );
  }

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
}
