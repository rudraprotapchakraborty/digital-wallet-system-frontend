import React from "react";
import { useTheme } from "../../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      className={`min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-4xl px-6 pb-20">
        {/* Title */}
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          About Digital Wallet System
        </h1>

        {/* Intro */}
        <p
          className={`mt-6 text-lg leading-relaxed ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Digital Wallet System is built for cash-first markets that are rapidly
          moving to digital. We connect local agents, users, and admins into one
          unified wallet platform so everyone can see what’s happening in real
          time.
        </p>

        {/* Mission */}
        <h2
          className={`mt-14 text-2xl font-bold ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Our mission
        </h2>

        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Make digital payments accessible, understandable, and trustworthy for
          everyone, regardless of device or banking status.
        </p>

        {/* Team */}
        <h2
          className={`mt-14 text-2xl font-bold ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Team
        </h2>

        <ul
          className={`mt-6 space-y-3 text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          <li>
            <span className="font-semibold">Product:</span> Focused on a clean,
            responsive interface.
          </li>
          <li>
            <span className="font-semibold">Engineering:</span> API-first
            architecture with role-based access.
          </li>
          <li>
            <span className="font-semibold">Operations:</span> Onboard and
            support local agents and admins.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
