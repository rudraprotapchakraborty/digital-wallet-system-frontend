import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Card = ({ children }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`rounded-xl border p-6 transition ${
        dark
          ? "bg-neutral-900 border-neutral-800"
          : "bg-white border-gray-200"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
