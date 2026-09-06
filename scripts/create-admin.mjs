import {
  PrismaClient
} from "@prisma/client";

import bcrypt
  from "bcryptjs";

const db =
  new PrismaClient();

const [
  ,
  ,
  email,
  password,
  firstName = "RideFi",
  lastName = "Admin"
] =
  process.argv;

if (
  !email ||
  !password
) {
  console.error(
    "Usage: npm run admin:create -- email password [firstName] [lastName]"
  );

  process.exit(1);
}

if (
  password.length < 8
) {
  console.error(
    "Password must be at least 8 characters"
  );

  process.exit(1);
}

const normalizedEmail =
  email
    .trim()
    .toLowerCase();

const passwordHash =
  await bcrypt.hash(
    password,
    12
  );

const existing =
  await db.user.findUnique({
    where: {
      email:
        normalizedEmail
    }
  });

let user;

if (existing) {
  user =
    await db.user.update({
      where: {
        id:
          existing.id
      },

      data: {
        role:
          "ADMIN",

        status:
          "ACTIVE",

        passwordHash,

        firstName,
        lastName,

        identityStatus:
          "APPROVED"
      }
    });

} else {
  user =
    await db.user.create({
      data: {
        role:
          "ADMIN",

        status:
          "ACTIVE",

        firstName,
        lastName,

        email:
          normalizedEmail,

        passwordHash,

        identityStatus:
          "APPROVED",

        wallet: {
          create: {}
        }
      }
    });
}

console.log(
  `RideFi admin ready: ${user.email}`
);

await db.$disconnect();
