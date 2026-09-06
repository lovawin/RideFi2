import {
  NextResponse
} from "next/server";

import {
  requireSession
} from "@/lib/auth";

import {
  db
} from "@/lib/db";

import {
  driverOnboardingSchema
} from "@/lib/validators";

export async function POST(
  request: Request
) {
  try {
    const session =
      await requireSession(
        "DRIVER"
      );

    const parsed =
      driverOnboardingSchema
        .safeParse(
          await request.json()
        );

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            "Invalid driver application",

          details:
            parsed.error.flatten()
        },
        {
          status: 400
        }
      );
    }

    const d =
      parsed.data;

    const expiration =
      new Date(
        d.licenseExpiration
      );

    if (
      Number.isNaN(
        expiration.getTime()
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid license expiration"
        },
        {
          status: 400
        }
      );
    }

    await db.$transaction(
      async tx => {

        await tx.user.update({
          where: {
            id:
              session.id
          },

          data: {
            phone:
              d.phone,

            status:
              "PENDING",

            identityStatus:
              "PENDING"
          }
        });

        await tx.driverProfile.update({
          where: {
            userId:
              session.id
          },

          data: {
            onboardingComplete:
              true,

            identityStatus:
              "PENDING",

            backgroundStatus:
              "PENDING",

            licenseStatus:
              "PENDING",

            insuranceStatus:
              "PENDING",

            vehicleStatus:
              "PENDING",

            inspectionStatus:
              "PENDING",

            payoutMethod:
              d.payoutMethod,

            payoutDestination:
              d.payoutDestination ||
              null
          }
        });

        await tx.driverLicense.upsert({
          where: {
            driverId:
              session.id
          },

          update: {
            licenseNumber:
              d.licenseNumber,

            state:
              d.licenseState,

            expirationDate:
              expiration,

            status:
              "PENDING",

            verifiedAt:
              null,

            rejectionNote:
              null
          },

          create: {
            driverId:
              session.id,

            licenseNumber:
              d.licenseNumber,

            state:
              d.licenseState,

            expirationDate:
              expiration,

            status:
              "PENDING"
          }
        });

        const existingVehicle =
          await tx.vehicle.findFirst({
            where: {
              driverId:
                session.id,

              active:
                true
            }
          });

        if (existingVehicle) {
          await tx.vehicle.update({
            where: {
              id:
                existingVehicle.id
            },

            data: {
              make:
                d.vehicleMake,

              model:
                d.vehicleModel,

              year:
                d.vehicleYear,

              color:
                d.vehicleColor,

              plate:
                d.plate,

              state:
                d.plateState,

              registrationStatus:
                "PENDING",

              insuranceStatus:
                "PENDING",

              inspectionStatus:
                "PENDING"
            }
          });

        } else {
          await tx.vehicle.create({
            data: {
              driverId:
                session.id,

              make:
                d.vehicleMake,

              model:
                d.vehicleModel,

              year:
                d.vehicleYear,

              color:
                d.vehicleColor,

              plate:
                d.plate,

              state:
                d.plateState,

              active:
                true,

              registrationStatus:
                "PENDING",

              insuranceStatus:
                "PENDING",

              inspectionStatus:
                "PENDING"
            }
          });
        }
      }
    );

    return NextResponse.json({
      ok: true,

      status:
        "PENDING_REVIEW"
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message ===
          "UNAUTHORIZED"
            ? "Unauthorized"
            : "Unable to submit driver application"
      },
      {
        status:
          error?.message ===
          "UNAUTHORIZED"
            ? 401
            : 500
      }
    );
  }
}
