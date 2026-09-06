import {
  SignJWT,
  jwtVerify
} from "jose";

import {
  cookies
} from "next/headers";

export type SessionUser = {
  id: string;
  role: "RIDER" | "DRIVER" | "ADMIN";
  email: string;
};

const secret =
  new TextEncoder().encode(
    process.env.JWT_SECRET ||
    "ridefi-dev-secret-change-this"
  );

const cookieName =
  process.env.COOKIE_NAME ||
  "ridefi_session";

export async function
createSession(
  user: SessionUser
) {
  const token =
    await new SignJWT({
      id: user.id,
      role: user.role,
      email: user.email
    })
      .setProtectedHeader({
        alg: "HS256"
      })
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(secret);

  const cookieStore =
    await cookies();

  cookieStore.set(
    cookieName,
    token,
    {
      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",

      maxAge:
        60 *
        60 *
        24 *
        30
    }
  );
}

export async function
clearSession() {
  const cookieStore =
    await cookies();

  cookieStore.set(
    cookieName,
    "",
    {
      httpOnly: true,
      expires: new Date(0),
      path: "/"
    }
  );
}

export async function
getSession():
Promise<SessionUser | null> {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      cookieName
    )?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } =
      await jwtVerify(
        token,
        secret
      );

    return {
      id:
        String(payload.id),

      role:
        payload.role as
        SessionUser["role"],

      email:
        String(payload.email)
    };

  } catch {
    return null;
  }
}

export async function
requireSession(
  role?: SessionUser["role"]
) {
  const session =
    await getSession();

  if (!session) {
    throw new Error(
      "UNAUTHORIZED"
    );
  }

  if (
    role &&
    session.role !== role
  ) {
    throw new Error(
      "FORBIDDEN"
    );
  }

  return session;
}
