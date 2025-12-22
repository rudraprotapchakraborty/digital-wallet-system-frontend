import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Button = ({ children, variant = "primary", onClick }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // BASE
  let classes =
    "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition focus:outline-none";

  // VARIANTS
  if (variant === "outline") {
    classes += dark
      ? " border border-white text-white hover:bg-white hover:text-black"
      : " border border-black text-black hover:bg-black hover:text-white";
  } else {
    classes += dark
      ? " bg-blue-600 text-white hover:bg-blue-700"
      : " bg-blue-600 text-white hover:bg-blue-700";
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
