import React from "react";
import { useTheme } from "../../context/ThemeContext";

const FAQ = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const itemBase = `rounded-xl border p-5 transition`;
  const itemTheme = dark
    ? "border-neutral-800 bg-neutral-900 text-white"
    : "border-gray-200 bg-white text-black";

  const summaryBase =
    "cursor-pointer text-lg font-semibold focus:outline-none";

  const textBase = dark ? "text-gray-100" : "text-gray-700";

  return (
    <section
      className={`min-h-screen pt-32 ${
        dark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-4xl px-6 pb-20">
        {/* Heading */}
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Frequently asked questions
        </h1>

        <p
          className={`mt-4 text-lg ${
            dark ? "text-gray-100" : "text-gray-700"
          }`}
        >
          Answers to common questions about using Digital Wallet System.
        </p>

        {/* FAQ Items */}
        <div className="mt-12 space-y-4">
          <details className={`${itemBase} ${itemTheme}`}>
            <summary className={summaryBase}>
              How do I add money to my wallet?
            </summary>
            <p className={`mt-3 text-sm leading-relaxed ${textBase}`}>
              After logging in, go to Deposit. You can simulate a direct deposit
              or ask an agent to perform a cash-in on your behalf.
            </p>
          </details>

          <details className={`${itemBase} ${itemTheme}`}>
            <summary className={summaryBase}>
              Can I use Digital Wallet System without a bank account?
            </summary>
            <p className={`mt-3 text-sm leading-relaxed ${textBase}`}>
              Yes. You can operate entirely with cash through approved agents
              who handle cash in and cash out.
            </p>
          </details>

          <details className={`${itemBase} ${itemTheme}`}>
            <summary className={summaryBase}>
              How are agents approved?
            </summary>
            <p className={`mt-3 text-sm leading-relaxed ${textBase}`}>
              Admins review each agent profile. Once approved, agents can start
              performing cash operations with transparent tracking.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
