import {
  NextResponse
} from "next/server";

import {
  requireSession
} from "@/lib/auth";

import {
  db
} from "@/lib/db";

const allowedTypes =
  new Set([
    "LICENSE_FRONT",
    "LICENSE_BACK",
    "INSURANCE",
    "REGISTRATION",
    "INSPECTION",
    "SELFIE",
    "IDENTITY"
  ]);

export async function POST(
  request: Request
) {
  try {
    const session =
      await requireSession(
        "DRIVER"
      );

    const {
      type,
      fileUrl,
      expiresAt
    } =
      await request.json();

    if (
      !allowedTypes.has(
        String(type)
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid document type"
        },
        {
          status: 400
        }
      );
    }

    if (
      !fileUrl ||
      typeof fileUrl !==
      "string"
    ) {
      return NextResponse.json(
        {
          error:
            "fileUrl required"
        },
        {
          status: 400
        }
      );
    }

    const document =
      await db.driverDocument.create({
        data: {
          driverId:
            session.id,

          type:
            String(type),

          fileUrl,

          expiresAt:
            expiresAt
              ? new Date(
                  expiresAt
                )
              : null,

          status:
            "PENDING"
        }
      });

    return NextResponse.json({
      ok: true,
      document
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
