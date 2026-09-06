import Link from "next/link";

import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="shell">

      <Nav active="home" />

      <section className="hero">

        <div className="card heroCopy">

          <div className="kicker">
            Driver-first rideshare
          </div>

          <h1 className="heroTitle">
            Cheaper rides.
            Bigger payouts.
            Crypto underneath.
          </h1>

          <p className="heroText">
            Riders can pay with card,
            debit, PayPal or crypto.

            RideFi handles $RIDE behind
            the scenes while drivers choose
            fiat, USDC or PYUSD payouts.
          </p>

          <div className="actions">

            <Link
              className="primary"
              href="/rider"
            >
              Book a ride
            </Link>

            <Link
              className="secondary"
              href="/driver"
            >
              Drive with RideFi
            </Link>

            <Link
              className="secondary"
              href="/admin"
            >
              Admin console
            </Link>

          </div>

          <div className="stats">

            <div className="stat">
              <strong>88%</strong>
              <span>
                example driver share
              </span>
            </div>

            <div className="stat">
              <strong>$RIDE</strong>
              <span>
                backend payment rail
              </span>
            </div>

            <div className="stat">
              <strong>USDC</strong>
              <span>
                driver payout option
              </span>
            </div>

            <div className="stat">
              <strong>24/7</strong>
              <span>
                safety operations
              </span>
            </div>

          </div>

        </div>

        <div className="card map">

          <div className="road r1" />
          <div className="road r2" />
          <div className="road r3" />

          <div className="car c1">
            🚙
          </div>

          <div className="car c2">
            🚗
          </div>

          <div className="car c3">
            🚕
          </div>

          <div className="mapBottom">

            <div className="sectionText">
              Downtown → Airport
            </div>

            <div className="bigPrice">
              $18.40
            </div>

            <div
              className="green"
              style={{
                fontWeight: 850
              }}
            >
              Driver receives $16.19
            </div>

          </div>

        </div>

      </section>

      <section className="card section">

        <h2>
          RideFi money flow
        </h2>

        <p className="sectionText">
          Riders do not need to understand
          crypto unless they want to.
        </p>

        <div className="flow">

          <div className="flowBox">
            <strong>
              1. Rider pays
            </strong>

            <span>
              Card, debit, PayPal or crypto.
            </span>
          </div>

          <div className="flowBox">
            <strong>
              2. Acquire $RIDE
            </strong>

            <span>
              Treasury execution happens
              behind checkout.
            </span>
          </div>

          <div className="flowBox">
            <strong>
              3. Ride settles
            </strong>

            <span>
              Driver and platform amounts
              are recorded separately.
            </span>
          </div>

          <div className="flowBox">
            <strong>
              4. Driver chooses
            </strong>

            <span>
              Bank, instant fiat,
              USDC or PYUSD.
            </span>
          </div>

        </div>

      </section>

    </main>
  );
}
