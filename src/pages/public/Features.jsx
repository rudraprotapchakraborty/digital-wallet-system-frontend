import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";

const Features = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      className={`min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Page Heading */}
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Features
        </h1>

        <p
          className={`mt-4 max-w-2xl text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Everything you need to manage digital payments securely, efficiently,
          and at scale.
        </p>

        {/* Features Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <h3
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Wallet dashboard
            </h3>
            <p
              className={`mt-3 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              See your balance, recent transfers, and activity timeline in one
              place with real-time updates and charts.
            </p>
          </Card>

          <Card>
            <h3
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              User & agent roles
            </h3>
            <p
              className={`mt-3 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Separate dashboards for users, agents, and admins with tailored
              actions, permissions, and navigation.
            </p>
          </Card>

          <Card>
            <h3
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Advanced filters
            </h3>
            <p
              className={`mt-3 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Find any transaction by type, amount, status, or date range using
              powerful and flexible filters.
            </p>
          </Card>

          <Card>
            <h3
              className={`text-lg font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Security by design
            </h3>
            <p
              className={`mt-3 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              JWT authentication, secure password storage, and strict role-based
              permissions built into the system.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
