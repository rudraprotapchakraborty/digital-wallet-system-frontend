import React from "react";
import { useTheme } from "../../context/ThemeContext";

const SkeletonBlock = ({ height = 80 }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg
        ${
          dark
            ? "bg-neutral-800"
            : "bg-gray-200"
        }`}
      style={{ height }}
    >
      {/* Shimmer */}
      <div
        className={`absolute inset-0 animate-pulse
          ${
            dark
              ? "bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800"
              : "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          }`}
      />
    </div>
  );
};

export default SkeletonBlock;
