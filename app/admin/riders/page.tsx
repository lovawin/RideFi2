"use client";

import {
  useEffect,
  useState
} from "react";

import Nav
  from "@/components/Nav";

import AuthGate
  from "@/components/auth/AuthGate";

export default function AdminRiders() {

  const [
    riders,
    setRiders
  ] =
    useState<any[]>(
      []
    );

  useEffect(() => {
    fetch(
      "/api/admin/riders",
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
          setRiders(
            data.riders ||
            []
          )
      );
  }, []);

  return (
    <AuthGate role="ADMIN">

      <main className="shell">

        <Nav active="admin" />

        <div className="kicker">
          Admin
        </div>

        <h1>
          Riders
        </h1>

        <section className="card section">

          <div className="table">

            <div className="tableRow tableHead">

              <span>
                Rider
              </span>

              <span>
                Rating
              </span>

              <span>
                Rides
              </span>

              <span>
                Safety
              </span>

              <span>
                Status
              </span>

            </div>

            {
              riders.map(
                rider => (
                  <div
                    className="tableRow"
                    key={
                      rider.id
                    }
                  >

                    <span>
                      <strong>
                        {
                          rider
                            .firstName
                        }{" "}
                        {
                          rider
                            .lastName
                        }
                      </strong>

                      <br />

                      <span className="sectionText">
                        {
                          rider.email
                        }
                      </span>
                    </span>

                    <span>
                      {
                        rider.rating
                      }
                    </span>

                    <span>
                      {
                        rider
                          .ridesCompleted
                      }
                    </span>

                    <span>
                      {
                        rider
                          .safetyEvents
                          ?.length ||
                        0
                      } open
                    </span>

                    <span
                      className={
                        rider
                          .status ===
                        "ACTIVE"
                          ? "badge good"
                          : "badge warn"
                      }
                    >
                      {
                        rider.status
                      }
                    </span>

                  </div>
                )
              )
            }

          </div>

        </section>

      </main>

    </AuthGate>
  );
}
