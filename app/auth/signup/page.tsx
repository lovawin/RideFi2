"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import Nav
  from "@/components/Nav";

export default function Signup() {
  const router =
    useRouter();

  const [
    role,
    setRole
  ] =
    useState<
      "RIDER" |
      "DRIVER"
    >(
      "RIDER"
    );

  const [
    firstName,
    setFirstName
  ] =
    useState("");

  const [
    lastName,
    setLastName
  ] =
    useState("");

  const [
    email,
    setEmail
  ] =
    useState("");

  const [
    phone,
    setPhone
  ] =
    useState("");

  const [
    password,
    setPassword
  ] =
    useState("");

  const [
    error,
    setError
  ] =
    useState("");

  const [
    loading,
    setLoading
  ] =
    useState(false);

  async function submit() {
    setError("");
    setLoading(true);

    const response =
      await fetch(
        "/api/auth/signup",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              role,
              firstName,
              lastName,
              email,
              phone:
                phone ||
                undefined,
              password
            })
        }
      );

    const data =
      await response.json();

    setLoading(false);

    if (!response.ok) {
      setError(
        data.error ||
        "Signup failed"
      );

      return;
    }

    if (
      role ===
      "DRIVER"
    ) {
      router.push(
        "/driver/onboarding"
      );

    } else {
      router.push(
        "/rider"
      );
    }
  }

  return (
    <main className="shell">

      <Nav />

      <section
        className="card panel"
        style={{
          maxWidth:
            620,

          margin:
            "40px auto"
        }}
      >

        <div className="kicker">
          Create account
        </div>

        <h1>
          Join RideFi
        </h1>

        <div className="form">

          <div className="field">
            <label>
              Account type
            </label>

            <select
              value={role}
              onChange={
                event =>
                  setRole(
                    event
                      .target
                      .value as
                    "RIDER" |
                    "DRIVER"
                  )
              }
            >
              <option value="RIDER">
                Rider
              </option>

              <option value="DRIVER">
                Driver
              </option>
            </select>
          </div>

          <div className="two">

            <div className="field">
              <label>
                First name
              </label>

              <input
                value={
                  firstName
                }

                onChange={
                  event =>
                    setFirstName(
                      event
                        .target
                        .value
                    )
                }
              />
            </div>

            <div className="field">
              <label>
                Last name
              </label>

              <input
                value={
                  lastName
                }

                onChange={
                  event =>
                    setLastName(
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
              Email
            </label>

            <input
              type="email"

              value={email}

              onChange={
                event =>
                  setEmail(
                    event
                      .target
                      .value
                  )
              }
            />
          </div>

          <div className="field">
            <label>
              Phone
            </label>

            <input
              type="tel"

              value={phone}

              onChange={
                event =>
                  setPhone(
                    event
                      .target
                      .value
                  )
              }
            />
          </div>

          <div className="field">
            <label>
              Password
            </label>

            <input
              type="password"

              value={
                password
              }

              onChange={
                event =>
                  setPassword(
                    event
                      .target
                      .value
                  )
              }
            />
          </div>

          {
            error &&
            (
              <div
                className="badge bad"
              >
                {error}
              </div>
            )
          }

          <button
            className="primary"

            disabled={
              loading
            }

            onClick={
              submit
            }
          >
            {
              loading
                ? "Creating…"
                : role ===
                  "DRIVER"
                ? "Start driver application"
                : "Create rider account"
            }
          </button>

        </div>

      </section>

    </main>
  );
}
