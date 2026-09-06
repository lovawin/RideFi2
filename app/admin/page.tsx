"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {
  Activity,
  ArrowRight,
  CarFront,
  CircleAlert,
  CircleCheckBig,
  DollarSign,
  Map,
  ShieldAlert,
  ShieldCheck,
  Users,
  UserRoundCheck
} from "lucide-react";

import Nav from "@/components/Nav";
import BottomNav from "@/components/ui/BottomNav";
import AuthGate from "@/components/auth/AuthGate";

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
      )
      .catch(
        () => {}
      );

  }, []);

  return (
    <AuthGate role="ADMIN">

      <main className="siteShell adminShell">

        <Nav active="admin" />

        <section className="adminHeadline">

          <div>

            <div className="eyebrow">
              RIDEFI COMMAND
            </div>

            <h1>
              Operations
              <br />
              at a glance.
            </h1>

          </div>

          <div className="systemStatus">

            <div className="statusPulse" />

            <div>
              <small>
                PLATFORM STATUS
              </small>

              <strong>
                All systems operational
              </strong>
            </div>

          </div>

        </section>

        <section className="adminStats">

          <div className="adminStat">

            <div className="adminStatIcon">
              <CarFront />
            </div>

            <small>
              ACTIVE RIDES
            </small>

            <strong>
              {
                stats
                  ?.activeRides ??
                184
              }
            </strong>

            <span className="positive">
              +12.4%
            </span>

          </div>

          <div className="adminStat">

            <div className="adminStatIcon">
              <UserRoundCheck />
            </div>

            <small>
              ACTIVE DRIVERS
            </small>

            <strong>
              {
                stats
                  ?.activeDrivers ??
                327
              }
            </strong>

            <span className="positive">
              +8.1%
            </span>

          </div>

          <div className="adminStat">

            <div className="adminStatIcon">
              <Users />
            </div>

            <small>
              RIDERS
            </small>

            <strong>
              {
                stats
                  ?.riders ??
                "2.8K"
              }
            </strong>

            <span>
              total
            </span>

          </div>

          <div className="adminStat revenueStat">

            <div className="adminStatIcon">
              <DollarSign />
            </div>

            <small>
              TODAY'S VOLUME
            </small>

            <strong>
              $42.8K
            </strong>

            <span className="positive">
              +21.2%
            </span>

          </div>

        </section>

        <section className="adminMainGrid">

          <div className="opsMapPanel">

            <div className="panelHeading">

              <div>

                <small>
                  LIVE NETWORK
                </small>

                <h2>
                  Rochester
                </h2>

              </div>

              <div className="mapLegend">

                <span>
                  <i className="yellowDot" />
                  rides
                </span>

                <span>
                  <i className="greenDot" />
                  drivers
                </span>

              </div>

            </div>

            <div className="opsMap">

              <div className="opsGrid" />

              <div className="heat heat1" />
              <div className="heat heat2" />
              <div className="heat heat3" />

              <div className="opsCar op1">
                R
              </div>

              <div className="opsCar op2">
                R
              </div>

              <div className="opsCar op3">
                R
              </div>

              <div className="opsCar op4">
                R
              </div>

              <div className="opsRide ride1" />
              <div className="opsRide ride2" />
              <div className="opsRide ride3" />

            </div>

          </div>

          <div className="safetyPanel">

            <div className="panelHeading">

              <div>
                <small>
                  SAFETY CENTER
                </small>

                <h2>
                  Live incidents
                </h2>
              </div>

              <ShieldAlert />
            </div>

            <div className="incident criticalIncident">

              <div className="incidentIcon">
                <CircleAlert />
              </div>

              <div>
                <strong>
                  SOS triggered
                </strong>

                <span>
                  Ride RF-10582
                  · 38 sec ago
                </span>
              </div>

              <div className="criticalTag">
                CRITICAL
              </div>

            </div>

            <div className="incident">

              <div className="incidentIcon">
                <Map />
              </div>

              <div>
                <strong>
                  Route deviation
                </strong>

                <span>
                  Ride RF-10577
                  · 3 min ago
                </span>
              </div>

              <div className="warningTag">
                REVIEW
              </div>

            </div>

            <div className="incident">

              <div className="incidentIcon">
                <ShieldCheck />
              </div>

              <div>
                <strong>
                  Safety check resolved
                </strong>

                <span>
                  Ride RF-10563
                  · 12 min ago
                </span>
              </div>

              <CircleCheckBig
                className="resolvedIcon"
              />

            </div>

            <Link
              href="/admin/drivers"
              className="opsAction"
            >
              Open operations queue

              <ArrowRight />
            </Link>

          </div>

        </section>

        <section className="adminBottomGrid">

          <Link
            href="/admin/drivers"
            className="commandCard"
          >

            <UserRoundCheck />

            <div>
              <small>
                DRIVER OPERATIONS
              </small>

              <h3>
                {
                  stats
                    ?.pendingDrivers ??
                  12
                } awaiting review
              </h3>

              <span>
                Identity, background,
                license and vehicle
              </span>
            </div>

            <ArrowRight />

          </Link>

          <Link
            href="/admin/riders"
            className="commandCard"
          >

            <Users />

            <div>
              <small>
                RIDER NETWORK
              </small>

              <h3>
                Rider intelligence
              </h3>

              <span>
                Ratings, safety,
                history and support
              </span>
            </div>

            <ArrowRight />

          </Link>

          <div className="commandCard">

            <Activity />

            <div>
              <small>
                SYSTEM HEALTH
              </small>

              <h3>
                99.99% available
              </h3>

              <span>
                API, payments,
                maps and dispatch
              </span>
            </div>

            <CircleCheckBig />

          </div>

        </section>

        <BottomNav active="admin" />

      </main>

    </AuthGate>
  );
}
