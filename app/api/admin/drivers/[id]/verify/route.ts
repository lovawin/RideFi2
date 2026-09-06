import {
  NextResponse
} from "next/server";

import {
  requireSession
} from "@/lib/auth";

import {
  db
} from "@/lib/db";

const allowedFields =
  new Set([
    "identityStatus",
    "backgroundStatus",
    "licenseStatus",
    "insuranceStatus",
    "vehicleStatus",
    "inspectionStatus"
  ]);

const allowedStatuses =
  new Set([
    "PENDING",
    "APPROVED",
    "REJECTED",
    "EXPIRED"
  ]);

export async function PATCH(
  request: Request,
  context: {
    params:
      Promise<{
        id: string;
      }>
  }
) {
  try {
    const admin =
      await requireSession(
        "ADMIN"
      );

    const {
      id
    } =
      await context.params;

    const {
      field,
      status
    } =
      await request.json();

    if (
      !allowedFields.has(
        String(field)
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid verification field"
        },
        {
          status: 400
        }
      );
    }

    if (
      !allowedStatuses.has(
        String(status)
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid verification status"
        },
        {
          status: 400
        }
      );
    }

    const updated =
      await db.driverProfile.update({
        where: {
          userId:
            id
        },

        data: {
          [field]:
            status
        }
      });

    const final =
      await db.driverProfile.findUnique({
        where: {
          userId:
            id
        }
      });

    if (
      final &&
      final.identityStatus ===
        "APPROVED" &&
      final.backgroundStatus ===
        "APPROVED" &&
      final.licenseStatus ===
        "APPROVED" &&
      final.insuranceStatus ===
        "APPROVED" &&
      final.vehicleStatus ===
        "APPROVED"
    ) {
      await db.user.update({
        where: {
          id
        },

        data: {
          status:
            "ACTIVE",

          identityStatus:
            "APPROVED"
        }
      });
    }

    console.log(
      `[admin] ${admin.email} changed ${id} ${field} -> ${status}`
    );

    return NextResponse.json({
      ok: true,
      driverProfile:
        updated
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unable to verify driver"
      },
      {
        status: 500
      }
    );
  }
}
