"use client";

import {
  useState
} from "react";

import {
  CarFront,
  ChevronRight,
  Clock3,
  LocateFixed,
  MapPin,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

import Nav from "@/components/Nav";
import BottomNav from "@/components/ui/BottomNav";
import VisualMap from "@/components/ui/VisualMap";

type Quote = {
  miles: number;
  minutes: number;
  fareUsd: number;
  driverEarningsUsd: number;
  platformFeeUsd: number;
  rideTokens: number;
};

export default function Rider() {

  const [
    pickup,
    setPickup
  ] =
    useState(
      "East Avenue"
    );

  const [
    destination,
    setDestination
  ] =
    useState(
      "ROC Airport"
    );

  const [
    quote,
    setQuote
  ] =
    useState<Quote | null>(
      null
    );

  const [
    selectedRide,
    setSelectedRide
  ] =
    useState(
      "standard"
    );

  async function getQuote() {

    const response =
      await fetch(
        "/api/quote",
        {
          method:
            "POST",

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

    if (
      response.ok
    ) {
      setQuote(
        await response.json()
      );
    }
  }

  const basePrice =
    quote?.fareUsd ||
    18.40;

  return (
    <main className="siteShell riderShell">

      <Nav active="rider" />

      <section className="riderExperience">

        <div className="riderMap">

          <VisualMap />

          <div className="riderMapTitle">
            <span>
              Rochester
            </span>

            <strong>
              18 drivers nearby
            </strong>
          </div>

        </div>

        <aside className="bookingSheet">

          <div className="bookingHeader">

            <div className="eyebrow">
              <Sparkles size={12} />

              RIDEFI
            </div>

            <h1>
              Where to?
            </h1>

          </div>

          <div className="locationInputs">

            <div className="locationConnector" />

            <div className="locationInput">

              <div className="inputIcon startIcon">
                <LocateFixed size={17} />
              </div>

              <div>
                <small>
                  PICKUP
                </small>

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

            </div>

            <div className="locationInput">

              <div className="inputIcon destinationIcon">
                <MapPin size={17} />
              </div>

              <div>
                <small>
                  DESTINATION
                </small>

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

            </div>

          </div>

          <button
            className="quoteButton"
            onClick={
              getQuote
            }
          >
            Calculate trip
          </button>

          <div className="rideChoices">

            <button
              className={
                selectedRide ===
                "standard"
                  ? "rideChoice selected"
                  : "rideChoice"
              }
              onClick={
                () =>
                  setSelectedRide(
                    "standard"
                  )
              }
            >

              <div className="rideVehicle">
                <CarFront />
              </div>

              <div className="rideChoiceInfo">

                <strong>
                  RideFi
                </strong>

                <span>
                  3 min · 4 seats
                </span>

              </div>

              <div className="rideChoicePrice">

                <strong>
                  $
                  {
                    basePrice
                      .toFixed(2)
                  }
                </strong>

                <span>
                  best value
                </span>

              </div>

            </button>

            <button
              className={
                selectedRide ===
                "comfort"
                  ? "rideChoice selected"
                  : "rideChoice"
              }
              onClick={
                () =>
                  setSelectedRide(
                    "comfort"
                  )
              }
            >

              <div className="rideVehicle comfortVehicle">
                <CarFront />
              </div>

              <div className="rideChoiceInfo">

                <strong>
                  RideFi Comfort
                </strong>

                <span>
                  6 min · newer cars
                </span>

              </div>

              <div className="rideChoicePrice">

                <strong>
                  $
                  {
                    (
                      basePrice *
                      1.24
                    ).toFixed(2)
                  }
                </strong>

              </div>

            </button>

          </div>

          <div className="paymentBar">

            <div>
              <WalletCards size={17} />

              <span>
                Visa •••• 4242
              </span>
            </div>

            <ChevronRight size={17} />

          </div>

          <button className="requestRideButton">

            <div>
              <strong>
                Request RideFi
              </strong>

              <span>
                Driver keeps most
                of the fare
              </span>
            </div>

            <ChevronRight />

          </button>

          <div className="riderSafety">

            <ShieldCheck />

            <div>
              <strong>
                Ride protected
              </strong>

              <span>
                PIN verification,
                route monitoring
                and trip sharing
              </span>
            </div>

          </div>

          <div className="tripFacts">

            <div>
              <Clock3 />

              <span>
                {
                  quote?.minutes ||
                  18
                } min
              </span>
            </div>

            <div>
              <MapPin />

              <span>
                {
                  quote?.miles ||
                  8.4
                } mi
              </span>
            </div>

          </div>

        </aside>

      </section>

      <BottomNav active="rider" />

    </main>
  );
}
