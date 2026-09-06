"use client";

import {
  useState
} from "react";

import Nav from "@/components/Nav";

export default function Driver() {

  const [online, setOnline] =
    useState(false);

  const [payout, setPayout] =
    useState("USDC");

  return (
    <main className="shell">

      <Nav active="driver" />

      <section className="two">

        <div className="card panel">

          <div className="kicker">
            Driver console
          </div>

          <h1
            style={{
              fontSize: 46,
              marginBottom: 5
            }}
          >
            {
              online
                ? "ONLINE"
                : "OFFLINE"
            }
          </h1>

          <p className="sectionText">
            Verified drivers receive
            nearby ride requests.
          </p>

          <button
            className="primary"
            style={{
              width: "100%"
            }}
            onClick={
              () =>
                setOnline(
                  previous =>
                    !previous
                )
            }
          >
            {
              online
                ? "GO OFFLINE"
                : "GO ONLINE"
            }
          </button>

          <div className="stats">

            <div className="stat">
              <strong>
                88%
              </strong>

              <span>
                fare share
              </span>
            </div>

            <div className="stat">
              <strong>
                4.98
              </strong>

              <span>
                driver rating
              </span>
            </div>

            <div className="stat">
              <strong>
                12
              </strong>

              <span>
                rides today
              </span>
            </div>

            <div className="stat">
              <strong>
                $128
              </strong>

              <span>
                today
              </span>
            </div>

          </div>

          <div
            className="field"
            style={{
              marginTop: 15
            }}
          >

            <label>
              Payout preference
            </label>

            <select
              value={payout}
              onChange={
                event =>
                  setPayout(
                    event.target.value
                  )
              }
            >
              <option>
                USDC
              </option>

              <option>
                PYUSD
              </option>

              <option>
                Bank
              </option>

              <option>
                Instant Fiat
              </option>
            </select>

          </div>

        </div>

        <div className="card panel">

          <div className="kicker">
            Incoming ride
          </div>

          <h2>
            Downtown → Airport
          </h2>

          <div className="metrics">

            <div className="metric">
              <span>
                Pickup
              </span>

              <strong>
                1.2 mi
              </strong>
            </div>

            <div className="metric">
              <span>
                Trip
              </span>

              <strong>
                8.4 mi
              </strong>
            </div>

            <div className="metric">
              <span>
                Time
              </span>

              <strong>
                18 min
              </strong>
            </div>

            <div className="metric">
              <span>
                You earn
              </span>

              <strong className="green">
                $16.19
              </strong>
            </div>

          </div>

          <div className="actions">

            <button className="primary">
              Accept ride
            </button>

            <button className="secondary">
              Decline
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}
