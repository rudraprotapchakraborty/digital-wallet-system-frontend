import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Pricing = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      className={`min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Heading */}
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Simple pricing
        </h1>

        <p
          className={`mt-4 max-w-2xl text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Transparent, affordable pricing designed for individuals and
          partners.
        </p>

        {/* Pricing Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Standard User */}
          <Card>
            <h2
              className={`text-xl font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Standard user
            </h2>

            <p
              className={`mt-2 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              Perfect for everyday transfers.
            </p>

            <ul
              className={`mt-6 space-y-2 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              <li>• Wallet account: free</li>
              <li>• Transfers: from 0.25% per transaction</li>
              <li>• Cash in/out: local agent fees</li>
            </ul>

            <div className="mt-6">
              <Button onClick={() => alert("Open wallet")}>
                Open wallet
              </Button>
            </div>
          </Card>

          {/* Agent */}
          <Card>
            <h2
              className={`text-xl font-semibold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Agent
            </h2>

            <p
              className={`mt-2 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              For cash-in & cash-out partners.
            </p>

            <ul
              className={`mt-6 space-y-2 text-sm ${
                dark ? "text-gray-100" : "text-gray-700"
              }`}
            >
              <li>• Commission on each operation</li>
              <li>• Dedicated agent dashboard</li>
              <li>• Admin review & approval</li>
            </ul>

            <div className="mt-6">
              <Button variant="outline" onClick={() => alert("Apply as agent")}>
                Apply as agent
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
