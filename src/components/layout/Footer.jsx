import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <footer
      className={`border-t ${
        dark
          ? "border-neutral-800 bg-neutral-950 text-gray-200"
          : "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <h2
              className={`text-lg font-extrabold tracking-tight ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Digital<span className="text-blue-500">Wallet</span>
            </h2>

            <p
              className={`mt-2 max-w-sm text-sm ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Secure. Fast. Future-ready payments.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            {["privacy", "terms", "contact", "faq"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className={`transition ${
                  dark
                    ? "text-gray-200 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-8 flex flex-col items-center gap-2 border-t pt-6 text-xs md:flex-row md:justify-between ${
            dark
              ? "border-neutral-800 text-gray-400"
              : "border-gray-200 text-gray-500"
          }`}
        >
          <span>
            © {new Date().getFullYear()} Digital Wallet System. All rights reserved.
          </span>
          <span>Crafted for modern fintech experiences ✨</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
