import React from "react";
import { useTheme } from "../../context/ThemeContext";

// Define styles outside to keep the component clean
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: {
    light: "border border-black text-black hover:bg-black hover:text-white",
    dark: "border border-white text-white hover:bg-white hover:text-black",
  },
};

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseClasses = "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition focus:outline-none";
  
  // Logic to select the right variant style
  const variantClasses = variant === "outline" 
    ? (isDark ? variants.outline.dark : variants.outline.light)
    : variants.primary;

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;