import Link from "next/link";

import {
  ArrowRight,
  BadgeDollarSign,
  CircleDollarSign,
  MapPin,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

import Nav from "@/components/Nav";
import BottomNav from "@/components/ui/BottomNav";
import VisualMap from "@/components/ui/VisualMap";

export default function Home() {
  return (
    <main className="siteShell">

      <Nav active="home" />

      <section className="heroV2">

        <div className="heroCopyV2">

          <div className="eyebrow">
            <Sparkles size={13} />

            RIDESHARE, REBUILT
          </div>

          <h1>
            KEEP MORE.
            <br />

            <span>
              PAY LESS.
            </span>
          </h1>

          <p>
            A driver-first rideshare network
            where normal payments meet
            programmable money underneath.
          </p>

          <div className="heroActions">

            <Link
              href="/rider"
              className="megaButton"
            >
              Get a ride

              <ArrowRight size={19} />
            </Link>

            <Link
              href="/driver"
              className="ghostButton"
            >
              Start earning
            </Link>

          </div>

          <div className="heroTrust">

            <div>
              <ShieldCheck />

              <span>
                Verified drivers
              </span>
            </div>

            <div>
              <MapPin />

              <span>
                Live trip safety
              </span>
            </div>

            <div>
              <WalletCards />

              <span>
                Fiat + crypto
              </span>
            </div>

          </div>

        </div>

        <div className="heroMapWrap">

          <VisualMap />

          <div className="floatingRideCard">

            <div className="floatingHeader">

              <div>
                <small>
                  YOUR RIDE
                </small>

                <h3>
                  RideFi Standard
                </h3>
              </div>

              <span className="liveBadge">
                3 MIN
              </span>

            </div>

            <div className="rideRouteMini">

              <div className="routeDot startDot" />

              <span>
                East Avenue
              </span>

              <div className="routeLineMini" />

              <div className="routeDot endDot" />

              <span>
                ROC Airport
              </span>

            </div>

            <div className="priceRow">

              <div>
                <small>
                  YOUR PRICE
                </small>

                <strong>
                  $18.40
                </strong>
              </div>

              <div>
                <small>
                  DRIVER EARNS
                </small>

                <strong className="earnColor">
                  $16.19
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="impactStrip">

        <div>
          <strong>
            88%
          </strong>

          <span>
            of example fare
            goes to driver
          </span>
        </div>

        <div>
          <strong>
            4.9★
          </strong>

          <span>
            verified network
            target
          </span>
        </div>

        <div>
          <strong>
            $RIDE
          </strong>

          <span>
            invisible payment
            rail
          </span>
        </div>

        <div>
          <strong>
            24/7
          </strong>

          <span>
            trip safety
            infrastructure
          </span>
        </div>

      </section>

      <section className="sectionBlock">

        <div className="sectionIntro">

          <div className="eyebrow">
            THE MONEY
          </div>

          <h2>
            Cash in.
            <br />

            Crypto underneath.
          </h2>

          <p>
            Riders don't need a wallet,
            seed phrase or crypto knowledge.
            RideFi handles the infrastructure.
          </p>

        </div>

        <div className="moneyFlow">

          <div className="moneyCard">

            <div className="moneyIcon">
              <WalletCards />
            </div>

            <span>
              01
            </span>

            <h3>
              Rider pays normally
            </h3>

            <p>
              Card, debit,
              PayPal, $RIDE
              or supported crypto.
            </p>

          </div>

          <div className="flowArrow">
            →
          </div>

          <div className="moneyCard featuredMoney">

            <div className="moneyIcon">
              <CircleDollarSign />
            </div>

            <span>
              02
            </span>

            <h3>
              RideFi routes value
            </h3>

            <p>
              The backend handles
              $RIDE acquisition,
              accounting and settlement.
            </p>

          </div>

          <div className="flowArrow">
            →
          </div>

          <div className="moneyCard">

            <div className="moneyIcon">
              <BadgeDollarSign />
            </div>

            <span>
              03
            </span>

            <h3>
              Driver chooses payout
            </h3>

            <p>
              Bank, instant fiat,
              USDC or PYUSD.
            </p>

          </div>

        </div>

      </section>

      <section className="driverCallout">

        <div>

          <div className="eyebrow darkEyebrow">
            BUILT FOR DRIVERS
          </div>

          <h2>
            Your car.
            <br />
            Your time.
            <br />
            More of your money.
          </h2>

        </div>

        <div className="driverCalloutRight">

          <div className="earningsDemo">

            <small>
              TODAY
            </small>

            <strong>
              $284.72
            </strong>

            <div className="earningsBars">

              <span style={{ height: "42%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "48%" }} />
              <span style={{ height: "72%" }} />
              <span style={{ height: "67%" }} />
              <span style={{ height: "90%" }} />
              <span style={{ height: "78%" }} />

            </div>

          </div>

          <Link
            href="/driver"
            className="darkButton"
          >
            Drive with RideFi

            <ArrowRight />
          </Link>

        </div>

      </section>

      <BottomNav active="home" />

    </main>
  );
}
