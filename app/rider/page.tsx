"use client";

import {
  useState
} from "react";

import Nav from "@/components/Nav";

type Quote = {
  miles: number;
  minutes: number;
  fareUsd: number;
  driverEarningsUsd: number;
  platformFeeUsd: number;
  rideTokens: number;
};

export default function Rider() {

  const [pickup, setPickup] =
    useState(
      "Downtown Rochester"
    );

  const [
    destination,
    setDestination
  ] =
    useState(
      "ROC Airport"
    );

  const [quote, setQuote] =
    useState<Quote | null>(
      null
    );

  async function getQuote() {

    const response =
      await fetch(
        "/api/quote",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              pickup,
              destination
            })
        }
      );

    const data =
      await response.json();

    setQuote(data);
  }

  return (
    <main className="shell">

      <Nav active="rider" />

      <section className="two">

        <div className="card panel">

          <div className="kicker">
            Rider
          </div>

          <h1>
            Where to?
          </h1>

          <div className="form">

            <div className="field">
              <label>
                Pickup
              </label>

              <input
                value={pickup}
                onChange={
                  event =>
                    setPickup(
                      event.target.value
                    )
                }
              />
            </div>

            <div className="field">
              <label>
                Destination
              </label>

              <input
                value={destination}
                onChange={
                  event =>
                    setDestination(
                      event.target.value
                    )
                }
              />
            </div>

            <div className="field">
              <label>
                Payment
              </label>

              <select
                defaultValue="CARD"
              >
                <option value="CARD">
                  Debit / Credit
                </option>

                <option value="PAYPAL">
                  PayPal
                </option>

                <option value="CRYPTO">
                  Crypto
                </option>

                <option value="RIDE">
                  $RIDE Balance
                </option>
              </select>
            </div>

            <button
              className="primary"
              onClick={getQuote}
            >
              Get ride price
            </button>

          </div>

          {
            quote &&
            (
              <>
                <div className="metrics">

                  <div className="metric">
                    <span>
                      Fare
                    </span>

                    <strong>
                      $
                      {
                        quote
                          .fareUsd
                          .toFixed(2)
                      }
                    </strong>
                  </div>

                  <div className="metric">
                    <span>
                      Distance
                    </span>

                    <strong>
                      {quote.miles} mi
                    </strong>
                  </div>

                  <div className="metric">
                    <span>
                      ETA
                    </span>

                    <strong>
                      {quote.minutes} min
                    </strong>
                  </div>

                  <div className="metric">
                    <span>
                      Driver gets
                    </span>

                    <strong className="green">
                      $
                      {
                        quote
                          .driverEarningsUsd
                          .toFixed(2)
                      }
                    </strong>
                  </div>

                </div>

                <div className="actions">

                  <button
                    className="primary"
                  >
                    Request RideFi
                  </button>

                  <button
                    className="secondary"
                  >
                    Schedule
                  </button>

                </div>
              </>
            )
          }

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

          <div className="mapBottom">
            <strong>
              3D map engine
            </strong>

            <div className="sectionText">
              Real Mapbox routing,
              traffic and moving cars
              plug into this surface.
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}
