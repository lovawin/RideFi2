"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function AuthGate({
  role,
  children
}: {
  role?:
    "RIDER" |
    "DRIVER" |
    "ADMIN";

  children:
    React.ReactNode;
}) {
  const router =
    useRouter();

  const [
    ready,
    setReady
  ] =
    useState(false);

  useEffect(() => {
    fetch(
      "/api/auth/me",
      {
        cache:
          "no-store"
      }
    )
      .then(
        response =>
          response.json()
      )
      .then(data => {
        if (
          !data.authenticated
        ) {
          router.replace(
            "/auth/login"
          );

          return;
        }

        if (
          role &&
          data.user.role !==
          role
        ) {
          router.replace("/");

          return;
        }

        setReady(true);
      })
      .catch(() => {
        router.replace(
          "/auth/login"
        );
      });

  }, [
    router,
    role
  ]);

  if (!ready) {
    return (
      <div
        className="shell"
        style={{
          paddingTop:
            80
        }}
      >
        Loading RideFi…
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
}
