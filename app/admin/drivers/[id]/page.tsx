"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

import Nav
  from "@/components/Nav";

import AuthGate
  from "@/components/auth/AuthGate";

const checks = [
  [
    "identityStatus",
    "Identity"
  ],

  [
    "backgroundStatus",
    "Background"
  ],

  [
    "licenseStatus",
    "License"
  ],

  [
    "insuranceStatus",
    "Insurance"
  ],

  [
    "vehicleStatus",
    "Vehicle"
  ],

  [
    "inspectionStatus",
    "Inspection"
  ]
];

export default function AdminDriverDetail() {

  const params =
    useParams();

  const id =
    String(params.id);

  const [
    driver,
    setDriver
  ] =
    useState<any>(
      null
    );

  async function load() {
    const response =
      await fetch(
        `/api/admin/drivers/${id}`,
        {
          cache:
            "no-store"
        }
      );

    if (
      response.ok
    ) {
      const data =
        await response.json();

      setDriver(
        data.driver
      );
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  async function verify(
    field: string,
    status:
      "APPROVED" |
      "REJECTED"
  ) {
    await fetch(
      `/api/admin/drivers/${id}/verify`,
      {
        method:
          "PATCH",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify({
            field,
            status
          })
      }
    );

    await load();
  }

  const p =
    driver
      ?.driverProfile;

  return (
    <AuthGate role="ADMIN">

      <main className="shell">

        <Nav active="admin" />

        {
          !driver
            ? (
                <p>
                  Loading driver…
                </p>
              )
            : (
                <>
                  <div className="kicker">
                    Driver review
                  </div>

                  <h1>
                    {
                      driver
                        .firstName
                    }{" "}
                    {
                      driver
                        .lastName
                    }
                  </h1>

                  <p className="sectionText">
                    {
                      driver.email
                    }
                    {" · "}
                    {
                      driver.phone ||
                      "No phone"
                    }
                  </p>

                  <section className="stats">

                    <div className="stat">
                      <strong>
                        {
                          driver.status
                        }
                      </strong>

                      <span>
                        account
                      </span>
                    </div>

                    <div className="stat">
                      <strong>
                        {
                          driver.rating
                        }
                      </strong>

                      <span>
                        rating
                      </span>
                    </div>

                    <div className="stat">
                      <strong>
                        {
                          driver
                            .ridesCompleted
                        }
                      </strong>

                      <span>
                        rides
                      </span>
                    </div>

                    <div className="stat">
                      <strong>
                        {
                          p
                            ?.payoutMethod ||
                          "—"
                        }
                      </strong>

                      <span>
                        payout
                      </span>
                    </div>

                  </section>

                  <section className="card section">

                    <h2>
                      Verification controls
                    </h2>

                    <div className="table">

                      {
                        checks.map(
                          ([
                            field,
                            label
                          ]) => (
                            <div
                              className="tableRow"
                              key={field}
                            >

                              <strong>
                                {label}
                              </strong>

                              <span
                                className="badge warn"
                              >
                                {
                                  p?.[
                                    field
                                  ] ||
                                  "—"
                                }
                              </span>

                              <button
                                className="primary"

                                onClick={
                                  () =>
                                    verify(
                                      field,
                                      "APPROVED"
                                    )
                                }
                              >
                                Approve
                              </button>

                              <button
                                className="secondary"

                                onClick={
                                  () =>
                                    verify(
                                      field,
                                      "REJECTED"
                                    )
                                }
                              >
                                Reject
                              </button>

                              <span>
                                —
                              </span>

                            </div>
                          )
                        )
                      }

                    </div>

                  </section>

                  <section className="card section">

                    <h2>
                      License
                    </h2>

                    {
                      p?.license
                        ? (
                            <div className="metrics">

                              <div className="metric">
                                <span>
                                  Number
                                </span>

                                <strong>
                                  {
                                    p
                                      .license
                                      .licenseNumber
                                  }
                                </strong>
                              </div>

                              <div className="metric">
                                <span>
                                  State
                                </span>

                                <strong>
                                  {
                                    p
                                      .license
                                      .state
                                  }
                                </strong>
                              </div>

                              <div className="metric">
                                <span>
                                  Expires
                                </span>

                                <strong>
                                  {
                                    new Date(
                                      p
                                        .license
                                        .expirationDate
                                    )
                                      .toLocaleDateString()
                                  }
                                </strong>
                              </div>

                              <div className="metric">
                                <span>
                                  Status
                                </span>

                                <strong>
                                  {
                                    p
                                      .license
                                      .status
                                  }
                                </strong>
                              </div>

                            </div>
                          )
                        : (
                            <p>
                              No license submitted.
                            </p>
                          )
                    }

                  </section>

                  <section className="card section">

                    <h2>
                      Vehicle
                    </h2>

                    {
                      p
                        ?.vehicles
                        ?.map(
                          (
                            vehicle:
                            any
                          ) => (
                            <div
                              className="tableRow"
                              key={
                                vehicle.id
                              }
                            >

                              <strong>
                                {
                                  vehicle.year
                                }{" "}
                                {
                                  vehicle.make
                                }{" "}
                                {
                                  vehicle.model
                                }
                              </strong>

                              <span>
                                {
                                  vehicle.color
                                }
                              </span>

                              <span>
                                {
                                  vehicle.plate
                                }
                              </span>

                              <span>
                                {
                                  vehicle.state
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

                  </section>
                </>
              )
        }

      </main>

    </AuthGate>
  );
}
