import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Card = ({ children, className = "", noPadding = false, hover = true }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`
        relative rounded-[2rem] border transition-all duration-500 overflow-hidden
        ${noPadding ? "p-0" : "p-8"}
        ${
          isDark
            ? "bg-neutral-900/40 border-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 text-white"
            : "bg-white border-black/[0.03] shadow-xl shadow-black/[0.02] text-slate-900"
        }
        ${hover ? "hover:shadow-2xl" : ""}
        ${className}
      `}
    >
      {/* INTERNAL LIGHTING EFFECTS */}
      {isDark && (
        <>
          {/* Subtle top-light rim to define shape in dark environments */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          {/* Faint inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        </>
      )}

      {/* LIGHT MODE DEPTH */}
      {!isDark && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.02] to-transparent pointer-events-none" />
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;