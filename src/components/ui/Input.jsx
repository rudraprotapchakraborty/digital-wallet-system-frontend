import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div>
      <label
        htmlFor={name}
        className={`block text-sm font-medium ${
          dark ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          dark
            ? "border-neutral-700 bg-neutral-900 text-white placeholder-gray-400"
            : "border-gray-300 bg-white text-black placeholder-gray-500"
        }`}
      />
    </div>
  );
};

export default Input;
