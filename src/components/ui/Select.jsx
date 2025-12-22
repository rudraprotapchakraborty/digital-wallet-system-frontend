import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Select = ({ label, error, children, ...rest }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div>
      {label && (
        <label
          className={`block text-sm font-medium ${
            dark ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}

      <select
        {...rest}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm transition
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            dark
              ? "border-neutral-700 bg-neutral-900 text-white"
              : "border-gray-300 bg-white text-black"
          }`}
      >
        {children}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
