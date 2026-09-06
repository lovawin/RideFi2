"use client";

import {
  useEffect,
  useState
} from "react";

import Nav
  from "@/components/Nav";

import AuthGate
  from "@/components/auth/AuthGate";

export default function DriverProfile() {

  const [
    data,
    setData
  ] =
    useState<any>(
      null
    );

  useEffect(() => {
    fetch(
      "/api/driver/profile",
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
        setData
      );
  }, []);

  const profile =
    data?.user
      ?.driverProfile;

  return (
    <AuthGate role="DRIVER">

      <main className="shell">

        <Nav active="driver" />

        <section className="card section">

          <div className="kicker">
            Driver account
          </div>

          <h1>
            Driver profile
          </h1>

          {
            !profile
              ? (
                  <p>
                    Loading…
                  </p>
                )
              : (
                  <>
                    <div className="stats">

                      <div className="stat">
                        <strong>
                          {
                            profile
                              .licenseStatus
                          }
                        </strong>

                        <span>
                          license
                        </span>
                      </div>

                      <div className="stat">
                        <strong>
                          {
                            profile
                              .insuranceStatus
                          }
                        </strong>

                        <span>
                          insurance
                        </span>
                      </div>

                      <div className="stat">
                        <strong>
                          {
                            profile
                              .backgroundStatus
                          }
                        </strong>

                        <span>
                          background
                        </span>
                      </div>

                      <div className="stat">
                        <strong>
                          {
                            profile
                              .payoutMethod
                          }
                        </strong>

                        <span>
                          payout
                        </span>
                      </div>

                    </div>

                    <div
                      className="card section"
                    >
                      <h3>
                        Vehicle
                      </h3>

                      {
                        profile
                          .vehicles
                          ?.map(
                            (
                              vehicle:
                              any
                            ) => (
                              <div
                                key={
                                  vehicle.id
                                }
                                className="tableRow"
                              >
                                <strong>
                                  {
                                    vehicle
                                      .year
                                  }{" "}
                                  {
                                    vehicle
                                      .make
                                  }{" "}
                                  {
                                    vehicle
                                      .model
                                  }
                                </strong>

                                <span>
                                  {
                                    vehicle
                                      .color
                                  }
                                </span>

                                <span>
                                  {
                                    vehicle
                                      .plate
                                  }
                                </span>

                                <span>
                                  {
                                    vehicle
                                      .state
                                  }
                                </span>

                                <span
                                  className="badge warn"
                                >
                                  {
                                    vehicle
                                      .registrationStatus
                                  }
                                </span>
                              </div>
                            )
                          )
                      }
                    </div>
                  </>
                )
          }

        </section>

      </main>

    </AuthGate>
  );
}
