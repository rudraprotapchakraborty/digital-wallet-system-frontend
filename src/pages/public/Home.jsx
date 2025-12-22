import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      className={`relative min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* HERO */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* LEFT */}
          <div>
            <h1
              className={`text-4xl font-extrabold leading-tight tracking-tight md:text-5xl ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Instant digital wallet for{" "}
              <span className="text-blue-500">everyday payments</span>.
            </h1>

            <p
              className={`mt-6 max-w-xl text-lg ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Digital Wallet System lets you send, receive, and manage money in
              seconds. Cash in via local agents, pay friends, and track every
              transaction from a clean, real-time dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={() => navigate("/register")}>
                Create free wallet
              </Button>
              <Button variant="outline" onClick={() => navigate("/features")}>
                View features
              </Button>
            </div>

            <p
              className={`mt-4 text-sm ${
                dark ? "text-gray-200" : "text-gray-600"
              }`}
            >
              No card required · Works on any device · Secure and compliant
            </p>
          </div>

          {/* RIGHT */}
          <div>
            <Card>
              <h3
                className={`text-lg font-semibold ${
                  dark ? "text-white" : "text-black"
                }`}
              >
                Live wallet snapshot
              </h3>

              <ul
                className={`mt-4 space-y-3 text-sm ${
                  dark ? "text-gray-100" : "text-gray-700"
                }`}
              >
                <li className="flex justify-between">
                  <span>Balance</span>
                  <span className="font-medium">₹5,420.00</span>
                </li>
                <li className="flex justify-between">
                  <span>Today’s transfers</span>
                  <span className="font-medium">7</span>
                </li>
                <li className="flex justify-between">
                  <span>Avg. processing time</span>
                  <span className="font-medium">3.2 sec</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div
        className={`border-t ${
          dark ? "border-neutral-800" : "border-gray-200"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2
            className={`text-3xl font-bold tracking-tight ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Why Digital Wallet System?
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Agent-assisted cash in",
                text:
                  "Top up your wallet at any partner agent with cash. Funds appear in your account as soon as the agent confirms the transaction.",
              },
              {
                title: "Real-time transfers",
                text:
                  "Send money to any verified Digital Wallet System user using phone number or email. Track status and fees instantly.",
              },
              {
                title: "Admin-grade controls",
                text:
                  "Built-in tools for admins to approve agents, manage fee rules, and monitor network-wide activity.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3
                  className={`text-lg font-semibold ${
                    dark ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-sm ${
                    dark ? "text-gray-100" : "text-gray-700"
                  }`}
                >
                  {item.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
