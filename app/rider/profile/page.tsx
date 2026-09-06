"use client";

import {
  useEffect,
  useState
} from "react";

import Nav
  from "@/components/Nav";

import AuthGate
  from "@/components/auth/AuthGate";

export default function RiderProfile() {

  const [
    user,
    setUser
  ] =
    useState<any>(
      null
    );

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
      .then(
        data =>
          setUser(
            data.user ||
            null
          )
      );
  }, []);

  return (
    <AuthGate role="RIDER">

      <main className="shell">

        <Nav active="rider" />

        <section className="card section">

          <div className="kicker">
            Rider account
          </div>

          <h1>
            Profile
          </h1>

          {
            user &&
            (
              <>
                <h2>
                  {
                    user.firstName
                  }{" "}
                  {
                    user.lastName
                  }
                </h2>

                <p className="sectionText">
                  {user.email}
                </p>

                <div className="stats">

                  <div className="stat">
                    <strong>
                      {
                        user.rating
                      }
                    </strong>

                    <span>
                      rating
                    </span>
                  </div>

                  <div className="stat">
                    <strong>
                      {
                        user
                          .ratingCount
                      }
                    </strong>

                    <span>
                      ratings
                    </span>
                  </div>

                  <div className="stat">
                    <strong>
                      {
                        user
                          .identityStatus
                      }
                    </strong>

                    <span>
                      identity
                    </span>
                  </div>

                  <div className="stat">
                    <strong>
                      $
                      {
                        Number(
                          user
                            .wallet
                            ?.rideBalance ||
                          0
                        )
                          .toFixed(2)
                      }
                    </strong>

                    <span>
                      $RIDE balance
                    </span>
                  </div>

                </div>
              </>
            )
          }

        </section>

      </main>

    </AuthGate>
  );
}
