import Nav from "@/components/Nav";

const drivers = [
  {
    name: "Maya Johnson",
    rating: "4.98",
    license: "APPROVED",
    insurance: "APPROVED",
    status: "ACTIVE"
  },
  {
    name: "Andre Lewis",
    rating: "4.91",
    license: "PENDING",
    insurance: "APPROVED",
    status: "PENDING"
  },
  {
    name: "Sam Rivera",
    rating: "4.72",
    license: "APPROVED",
    insurance: "EXPIRED",
    status: "SUSPENDED"
  }
];

export default function Admin() {

  return (
    <main className="shell">

      <Nav active="admin" />

      <div className="kicker">
        Operations center
      </div>

      <h1
        style={{
          fontSize: 44,
          marginTop: 8
        }}
      >
        RideFi Command
      </h1>

      <section className="stats">

        <div className="stat">
          <strong>
            184
          </strong>

          <span>
            active rides
          </span>
        </div>

        <div className="stat">
          <strong>
            327
          </strong>

          <span>
            online drivers
          </span>
        </div>

        <div className="stat">
          <strong>
            $42.8K
          </strong>

          <span>
            gross volume today
          </span>
        </div>

        <div className="stat">
          <strong>
            $5.1K
          </strong>

          <span>
            platform revenue
          </span>
        </div>

      </section>

      <section className="card section">

        <h2>
          Driver verification
        </h2>

        <p className="sectionText">
          License, identity,
          insurance, vehicle,
          inspection and
          background review.
        </p>

        <div className="table">

          <div
            className="
              tableRow
              tableHead
            "
          >
            <span>
              Driver
            </span>

            <span>
              Rating
            </span>

            <span>
              License
            </span>

            <span>
              Insurance
            </span>

            <span>
              Status
            </span>
          </div>

          {
            drivers.map(
              driver => (
                <div
                  className="tableRow"
                  key={driver.name}
                >

                  <strong>
                    {driver.name}
                  </strong>

                  <span>
                    {driver.rating}
                  </span>

                  <span
                    className={
                      driver.license ===
                      "APPROVED"
                        ? "badge good"
                        : "badge warn"
                    }
                  >
                    {driver.license}
                  </span>

                  <span
                    className={
                      driver.insurance ===
                      "APPROVED"
                        ? "badge good"
                        : "badge bad"
                    }
                  >
                    {driver.insurance}
                  </span>

                  <span
                    className={
                      driver.status ===
                      "ACTIVE"
                        ? "badge good"
                        : driver.status ===
                          "PENDING"
                        ? "badge warn"
                        : "badge bad"
                    }
                  >
                    {driver.status}
                  </span>

                </div>
              )
            )
          }

        </div>

      </section>

      <section className="two">

        <div className="card section">

          <h3>
            Safety queue
          </h3>

          <div className="table">

            <div className="tableRow">
              <strong>
                SOS
              </strong>

              <span>
                RF-10459
              </span>

              <span className="badge bad">
                CRITICAL
              </span>

              <span>
                Rider
              </span>

              <span>
                1 min
              </span>
            </div>

            <div className="tableRow">
              <strong>
                Route deviation
              </strong>

              <span>
                RF-10477
              </span>

              <span className="badge warn">
                HIGH
              </span>

              <span>
                Rider
              </span>

              <span>
                4 min
              </span>
            </div>

          </div>

        </div>

        <div className="card section">

          <h3>
            Revenue engine
          </h3>

          <div className="flow">

            <div className="flowBox">
              <strong>
                Ride fees
              </strong>

              <span>
                Low platform take.
              </span>
            </div>

            <div className="flowBox">
              <strong>
                Memberships
              </strong>

              <span>
                Rider Plus /
                Driver Pro.
              </span>
            </div>

            <div className="flowBox">
              <strong>
                Instant payout
              </strong>

              <span>
                Optional convenience fee.
              </span>
            </div>

            <div className="flowBox">
              <strong>
                $RIDE
              </strong>

              <span>
                Rewards and utility.
              </span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
