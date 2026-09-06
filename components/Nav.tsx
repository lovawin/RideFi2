import Link from "next/link";

import {
  ArrowUpRight
} from "lucide-react";

export default function Nav({
  active = "home"
}: {
  active?: string;
}) {
  return (
    <header className="topNav">

      <Link
        href="/"
        className="ridefiBrand"
      >
        <img
          src="/ridefi/ridefi-mark.svg"
          alt="RideFi"
        />

        <div>
          <strong>
            RideFi
          </strong>

          <span>
            MOVE DIFFERENT
          </span>
        </div>
      </Link>

      <nav className="desktopNavLinks">

        <Link
          href="/rider"
          className={
            active === "rider"
              ? "active"
              : ""
          }
        >
          Ride
        </Link>

        <Link
          href="/driver"
          className={
            active === "driver"
              ? "active"
              : ""
          }
        >
          Drive
        </Link>

        <Link
          href="/admin"
          className={
            active === "admin"
              ? "active"
              : ""
          }
        >
          Operations
        </Link>

      </nav>

      <div className="navActions">

        <Link
          href="/auth/login"
          className="navTextLink"
        >
          Sign in
        </Link>

        <Link
          href="/auth/signup"
          className="navJoin"
        >
          Join RideFi

          <ArrowUpRight size={15} />
        </Link>

      </div>

    </header>
  );
}
