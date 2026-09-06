import {
  z
} from "zod";

export const signupSchema =
  z.object({
    role:
      z.enum([
        "RIDER",
        "DRIVER"
      ]),

    firstName:
      z.string()
        .trim()
        .min(1)
        .max(80),

    lastName:
      z.string()
        .trim()
        .min(1)
        .max(80),

    email:
      z.string()
        .trim()
        .toLowerCase()
        .email(),

    phone:
      z.string()
        .trim()
        .min(7)
        .max(25)
        .optional(),

    password:
      z.string()
        .min(8)
        .max(200)
  });

export const loginSchema =
  z.object({
    email:
      z.string()
        .trim()
        .toLowerCase()
        .email(),

    password:
      z.string()
        .min(1)
        .max(200)
  });

export const driverOnboardingSchema =
  z.object({
    phone:
      z.string()
        .min(7)
        .max(25),

    licenseNumber:
      z.string()
        .min(2)
        .max(100),

    licenseState:
      z.string()
        .min(2)
        .max(10),

    licenseExpiration:
      z.string(),

    vehicleMake:
      z.string()
        .min(1)
        .max(80),

    vehicleModel:
      z.string()
        .min(1)
        .max(80),

    vehicleYear:
      z.coerce
        .number()
        .int()
        .min(1990)
        .max(2100),

    vehicleColor:
      z.string()
        .min(1)
        .max(40),

    plate:
      z.string()
        .min(1)
        .max(30),

    plateState:
      z.string()
        .min(2)
        .max(10),

    payoutMethod:
      z.enum([
        "BANK",
        "INSTANT_FIAT",
        "USDC",
        "PYUSD"
      ]),

    payoutDestination:
      z.string()
        .max(300)
        .optional()
  });
