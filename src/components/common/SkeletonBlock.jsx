import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const SkeletonBlock = ({ height = 80, className = "" }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl transition-colors duration-500 ${
        dark ? "bg-neutral-900" : "bg-slate-200"
      } ${className}`}
      style={{ height }}
    >
      {/* SHIMMER EFFECT: Custom linear-gradient animation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className={`absolute inset-0 z-10 w-full h-full ${
          dark
            ? "bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            : "bg-gradient-to-r from-transparent via-white/40 to-transparent"
        }`}
      />

      {/* SUBTLE INNER PULSE: Adds depth to the shimmer */}
      <div
        className={`absolute inset-0 animate-pulse ${
          dark ? "bg-white/[0.01]" : "bg-black/[0.01]"
        }`}
      />
    </div>
  );
};

export default SkeletonBlock;