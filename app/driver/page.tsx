"use client";

import {
  useState
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  BadgeDollarSign,
  Banknote,
  CarFront,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  Gauge,
  MapPin,
  ShieldCheck,
  Star,
  Wallet
} from "lucide-react";

import Nav from "@/components/Nav";
import BottomNav from "@/components/ui/BottomNav";
import VisualMap from "@/components/ui/VisualMap";

export default function Driver() {

  const [
    online,
    setOnline
  ] =
    useState(false);

  return (
    <main className="siteShell driverShell">

      <Nav active="driver" />

      <section className="driverHero">

        <div className="driverDashboard">

          <div className="driverTopRow">

            <div>

              <div className="eyebrow">
                DRIVER MODE
              </div>

              <h1>
                Good morning,
                <br />
                Chris.
              </h1>

            </div>

            <button
              className={
                online
                  ? "onlineSwitch online"
                  : "onlineSwitch"
              }
              onClick={
                () =>
                  setOnline(
                    !online
                  )
              }
            >
              <span />

              {
                online
                  ? "ONLINE"
                  : "GO ONLINE"
              }
            </button>

          </div>

          <div className="earningsHero">

            <div>

              <small>
                TODAY'S EARNINGS
              </small>

              <strong>
                $284.72
              </strong>

              <span>
                +18.4% vs yesterday
              </span>

            </div>

            <div className="miniChart">

              <i style={{ height: "30%" }} />
              <i style={{ height: "48%" }} />
              <i style={{ height: "41%" }} />
              <i style={{ height: "63%" }} />
              <i style={{ height: "57%" }} />
              <i style={{ height: "84%" }} />
              <i style={{ height: "95%" }} />

            </div>

          </div>

          <div className="driverMetrics">

            <div className="driverMetric">

              <div className="metricIcon">
                <Gauge />
              </div>

              <span>
                Online
              </span>

              <strong>
                6h 42m
              </strong>

            </div>

            <div className="driverMetric">

              <div className="metricIcon">
                <CarFront />
              </div>

              <span>
                Trips
              </span>

              <strong>
                17
              </strong>

            </div>

            <div className="driverMetric">

              <div className="metricIcon">
                <Star />
              </div>

              <span>
                Rating
              </span>

              <strong>
                4.98
              </strong>

            </div>

            <div className="driverMetric">

              <div className="metricIcon">
                <BadgeDollarSign />
              </div>

              <span>
                Avg/hr
              </span>

              <strong>
                $42.49
              </strong>

            </div>

          </div>

        </div>

        <div className="driverMapCard">

          <VisualMap compact />

          <div className="demandPill">
            HIGH DEMAND
          </div>

          <div className="driverOffer">

            <div className="offerTop">

              <div>
                <small>
                  NEW REQUEST
                </small>

                <strong>
                  $22.84
                </strong>
              </div>

              <div className="offerTimer">
                14
              </div>

            </div>

            <div className="offerRoute">

              <div>
                <MapPin size={16} />

                <span>
                  East Ave
                </span>
              </div>

              <div>
                <ArrowRight size={14} />
              </div>

              <div>
                <MapPin size={16} />

                <span>
                  ROC Airport
                </span>
              </div>

            </div>

            <div className="offerFacts">

              <span>
                <Clock3 size={14} />
                21 min
              </span>

              <span>
                9.1 mi
              </span>

              <strong>
                you keep ~$20.10
              </strong>

            </div>

            <button>
              Accept trip
            </button>

          </div>

        </div>

      </section>

      <section className="driverLowerGrid">

        <div className="premiumPanel">

          <div className="panelTitle">

            <div>
              <small>
                PAYOUT
              </small>

              <h3>
                Your money,
                your choice.
              </h3>
            </div>

            <Wallet />
          </div>

          <div className="payoutOptions">

            <div className="payoutOption active">

              <CircleCheckBig />

              <div>
                <strong>
                  USDC
                </strong>

                <span>
                  instant
                </span>
              </div>

            </div>

            <div className="payoutOption">

              <Banknote />

              <div>
                <strong>
                  Bank
                </strong>

                <span>
                  1–2 days
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="premiumPanel">

          <div className="panelTitle">

            <div>
              <small>
                VERIFICATION
              </small>

              <h3>
                Driver status
              </h3>
            </div>

            <ShieldCheck />
          </div>

          <div className="verificationList">

            <div>
              <CircleCheckBig />

              <span>
                Identity
              </span>

              <strong>
                Verified
              </strong>
            </div>

            <div>
              <CircleCheckBig />

              <span>
                License
              </span>

              <strong>
                Verified
              </strong>
            </div>

            <div>
              <CircleCheckBig />

              <span>
                Insurance
              </span>

              <strong>
                Verified
              </strong>
            </div>

          </div>

          <Link
            href="/driver/profile"
            className="panelLink"
          >
            View driver profile

            <ChevronRight />
          </Link>

        </div>

      </section>

      <BottomNav active="driver" />

    </main>
  );
}
