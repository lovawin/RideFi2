"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import Nav
  from "@/components/Nav";

export default function Login() {
  const router =
    useRouter();

  const [
    email,
    setEmail
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

  async function login() {
    setError("");
    setLoading(true);

    const response =
      await fetch(
        "/api/auth/login",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              email,
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
        "Login failed"
      );

      return;
    }

    if (
      data.user.role ===
      "ADMIN"
    ) {
      router.push(
        "/admin"
      );

    } else if (
      data.user.role ===
      "DRIVER"
    ) {
      router.push(
        "/driver"
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
            520,

          margin:
            "50px auto"
        }}
      >

        <div className="kicker">
          Welcome back
        </div>

        <h1>
          Sign in
        </h1>

        <div className="form">

          <div className="field">
            <label>
              Email
            </label>

            <input
              type="email"

              value={
                email
              }

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
              login
            }
          >
            {
              loading
                ? "Signing in…"
                : "Sign in"
            }
          </button>

        </div>

      </section>

    </main>
  );
}
