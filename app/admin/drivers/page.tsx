"use client";

import {
  useEffect,
  useState
} from "react";

import Link
  from "next/link";

import Nav
  from "@/components/Nav";

import AuthGate
  from "@/components/auth/AuthGate";

export default function AdminDrivers() {

  const [
    drivers,
    setDrivers
  ] =
    useState<any[]>(
      []
    );

  const [
    search,
    setSearch
  ] =
    useState("");

  useEffect(() => {
    fetch(
      "/api/admin/drivers",
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
          setDrivers(
            data.drivers ||
            []
          )
      );
  }, []);

  const visible =
    drivers.filter(
      driver =>
        `${driver.firstName} ${driver.lastName} ${driver.email}`
          .toLowerCase()
          .includes(
            search
              .toLowerCase()
          )
    );

  return (
    <AuthGate role="ADMIN">

      <main className="shell">

        <Nav active="admin" />

        <div className="kicker">
          Admin
        </div>

        <h1>
          Drivers
        </h1>

        <div className="field">
          <input
            value={search}

            onChange={
              event =>
                setSearch(
                  event
                    .target
                    .value
                )
            }

            placeholder="Search drivers…"
          />
        </div>

        <section className="card section">

          <div className="table">

            <div className="tableRow tableHead">

              <span>
                Driver
              </span>

              <span>
                License
              </span>

              <span>
                Insurance
              </span>

              <span>
                Background
              </span>

              <span>
                Status
              </span>

            </div>

            {
              visible.map(
                driver => {

                  const p =
                    driver
                      .driverProfile;

                  return (
                    <Link
                      href={
                        `/admin/drivers/${driver.id}`
                      }

                      key={
                        driver.id
                      }

                      className="tableRow"
                    >

                      <span>
                        <strong>
                          {
                            driver
                              .firstName
                          }{" "}
                          {
                            driver
                              .lastName
                          }
                        </strong>

                        <br />

                        <span className="sectionText">
                          {
                            driver
                              .email
                          }
                        </span>
                      </span>

                      <span
                        className="badge"
                      >
                        {
                          p
                            ?.licenseStatus ||
                          "—"
                        }
                      </span>

                      <span
                        className="badge"
                      >
                        {
                          p
                            ?.insuranceStatus ||
                          "—"
                        }
                      </span>

                      <span
                        className="badge"
                      >
                        {
                          p
                            ?.backgroundStatus ||
                          "—"
                        }
                      </span>

                      <span
                        className={
                          driver
                            .status ===
                          "ACTIVE"
                            ? "badge good"
                            : driver
                                .status ===
                              "SUSPENDED"
                            ? "badge bad"
                            : "badge warn"
                        }
                      >
                        {
                          driver
                            .status
                        }
                      </span>

                    </Link>
                  );
                }
              )
            }

          </div>

        </section>

      </main>

    </AuthGate>
  );
}
