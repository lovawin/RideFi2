"use client";

import {
  useState
} from "react";

import Nav
  from "@/components/Nav";

import AuthGate
  from "@/components/auth/AuthGate";

export default function DriverOnboarding() {

  const [
    form,
    setForm
  ] =
    useState({
      phone:
        "",

      licenseNumber:
        "",

      licenseState:
        "NY",

      licenseExpiration:
        "",

      vehicleMake:
        "",

      vehicleModel:
        "",

      vehicleYear:
        new Date()
          .getFullYear(),

      vehicleColor:
        "",

      plate:
        "",

      plateState:
        "NY",

      payoutMethod:
        "BANK",

      payoutDestination:
        ""
    });

  const [
    message,
    setMessage
  ] =
    useState("");

  function update(
    key: string,
    value: any
  ) {
    setForm(
      previous => ({
        ...previous,
        [key]:
          value
      })
    );
  }

  async function submit() {
    setMessage(
      "Submitting…"
    );

    const response =
      await fetch(
        "/api/driver/onboarding",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(
              form
            )
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      setMessage(
        data.error ||
        "Unable to submit"
      );

      return;
    }

    setMessage(
      "Application submitted. Your account is now pending admin review."
    );
  }

  return (
    <AuthGate role="DRIVER">

      <main className="shell">

        <Nav active="driver" />

        <section
          className="card panel"
          style={{
            maxWidth:
              860,

            margin:
              "20px auto"
          }}
        >

          <div className="kicker">
            Driver verification
          </div>

          <h1>
            Driver application
          </h1>

          <p className="sectionText">
            Complete your license,
            vehicle and payout
            information.
          </p>

          <div className="form">

            <div className="field">
              <label>
                Phone
              </label>

              <input
                value={
                  form.phone
                }

                onChange={
                  event =>
                    update(
                      "phone",
                      event
                        .target
                        .value
                    )
                }
              />
            </div>

            <h3>
              Driver license
            </h3>

            <div className="two">

              <div className="field">
                <label>
                  License number
                </label>

                <input
                  value={
                    form
                      .licenseNumber
                  }

                  onChange={
                    event =>
                      update(
                        "licenseNumber",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

              <div className="field">
                <label>
                  State
                </label>

                <input
                  value={
                    form
                      .licenseState
                  }

                  onChange={
                    event =>
                      update(
                        "licenseState",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

            </div>

            <div className="field">
              <label>
                License expiration
              </label>

              <input
                type="date"

                value={
                  form
                    .licenseExpiration
                }

                onChange={
                  event =>
                    update(
                      "licenseExpiration",
                      event
                        .target
                        .value
                    )
                }
              />
            </div>

            <h3>
              Vehicle
            </h3>

            <div className="two">

              <div className="field">
                <label>
                  Make
                </label>

                <input
                  value={
                    form
                      .vehicleMake
                  }

                  onChange={
                    event =>
                      update(
                        "vehicleMake",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

              <div className="field">
                <label>
                  Model
                </label>

                <input
                  value={
                    form
                      .vehicleModel
                  }

                  onChange={
                    event =>
                      update(
                        "vehicleModel",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

            </div>

            <div className="two">

              <div className="field">
                <label>
                  Year
                </label>

                <input
                  type="number"

                  value={
                    form
                      .vehicleYear
                  }

                  onChange={
                    event =>
                      update(
                        "vehicleYear",
                        Number(
                          event
                            .target
                            .value
                        )
                      )
                  }
                />
              </div>

              <div className="field">
                <label>
                  Color
                </label>

                <input
                  value={
                    form
                      .vehicleColor
                  }

                  onChange={
                    event =>
                      update(
                        "vehicleColor",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

            </div>

            <div className="two">

              <div className="field">
                <label>
                  License plate
                </label>

                <input
                  value={
                    form.plate
                  }

                  onChange={
                    event =>
                      update(
                        "plate",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

              <div className="field">
                <label>
                  Plate state
                </label>

                <input
                  value={
                    form
                      .plateState
                  }

                  onChange={
                    event =>
                      update(
                        "plateState",
                        event
                          .target
                          .value
                      )
                  }
                />
              </div>

            </div>

            <h3>
              Driver payout
            </h3>

            <div className="field">
              <label>
                Payout method
              </label>

              <select
                value={
                  form
                    .payoutMethod
                }

                onChange={
                  event =>
                    update(
                      "payoutMethod",
                      event
                        .target
                        .value
                    )
                }
              >
                <option value="BANK">
                  Bank
                </option>

                <option value="INSTANT_FIAT">
                  Instant fiat
                </option>

                <option value="USDC">
                  USDC
                </option>

                <option value="PYUSD">
                  PYUSD
                </option>
              </select>
            </div>

            <div className="field">
              <label>
                Bank/wallet destination
              </label>

              <input
                value={
                  form
                    .payoutDestination
                }

                onChange={
                  event =>
                    update(
                      "payoutDestination",
                      event
                        .target
                        .value
                    )
                }

                placeholder="Optional for initial application"
              />
            </div>

            <button
              className="primary"
              onClick={
                submit
              }
            >
              Submit driver application
            </button>

            {
              message &&
              (
                <div
                  className="sectionText"
                >
                  {message}
                </div>
              )
            }

          </div>

        </section>

      </main>

    </AuthGate>
  );
}
