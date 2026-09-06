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

export default function Admin() {

  const [
    stats,
    setStats
  ] =
    useState<any>(
      null
    );

  useEffect(() => {
    fetch(
      "/api/admin/stats",
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
        setStats
      );
  }, []);

  return (
    <AuthGate role="ADMIN">

      <main className="shell">

        <Nav active="admin" />

        <div className="kicker">
          Operations center
        </div>

        <h1
          style={{
            fontSize:
              44
          }}
        >
          RideFi Command
        </h1>

        <section className="stats">

          <div className="stat">
            <strong>
              {
                stats
                  ?.activeRides ??
                "—"
              }
            </strong>

            <span>
              active rides
            </span>
          </div>

          <div className="stat">
            <strong>
              {
                stats
                  ?.drivers ??
                "—"
              }
            </strong>

            <span>
              drivers
            </span>
          </div>

          <div className="stat">
            <strong>
              {
                stats
                  ?.riders ??
                "—"
              }
            </strong>

            <span>
              riders
            </span>
          </div>

          <div className="stat">
            <strong>
              {
                stats
                  ?.pendingDrivers ??
                "—"
              }
            </strong>

            <span>
              pending drivers
            </span>
          </div>

        </section>

        <section className="two">

          <Link
            href="/admin/drivers"
            className="card section"
          >
            <div className="kicker">
              Verification
            </div>

            <h2>
              Drivers
            </h2>

            <p className="sectionText">
              Review identity,
              license, background,
              vehicle, insurance
              and inspection.
            </p>
          </Link>

          <Link
            href="/admin/riders"
            className="card section"
          >
            <div className="kicker">
              Community
            </div>

            <h2>
              Riders
            </h2>

            <p className="sectionText">
              Ratings, ride counts,
              safety flags and
              account status.
            </p>
          </Link>

        </section>

        <section className="card section">

          <h2>
            Safety operations
          </h2>

          <div className="metrics">

            <div className="metric">
              <span>
                Open events
              </span>

              <strong>
                {
                  stats
                    ?.safetyEvents ??
                  "—"
                }
              </strong>
            </div>

            <div className="metric">
              <span>
                Suspended users
              </span>

              <strong>
                {
                  stats
                    ?.suspendedUsers ??
                  "—"
                }
              </strong>
            </div>

            <div className="metric">
              <span>
                Active drivers
              </span>

              <strong>
                {
                  stats
                    ?.activeDrivers ??
                  "—"
                }
              </strong>
            </div>

            <div className="metric">
              <span>
                System
              </span>

              <strong className="green">
                LIVE
              </strong>
            </div>

          </div>

        </section>

      </main>

    </AuthGate>
  );
}
