import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon, // Optional icon passed from parent
  className = ""
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`group flex flex-col w-full ${className}`}>
      {/* LABEL: High-tracking uppercase for professional feel */}
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 ml-1 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
            error 
              ? "text-red-500" 
              : isDark ? "text-gray-500 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-600"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* INPUT FIELD */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full rounded-2xl border-2 px-4 py-3 text-sm font-medium outline-none transition-all duration-300
            ${Icon ? "pl-11" : "pl-4"}
            ${
              isDark
                ? `bg-white/[0.03] placeholder-gray-600 text-white 
                   ${error ? "border-red-500/50" : "border-white/5 focus:border-blue-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/10"}`
                : `bg-slate-50 placeholder-slate-400 text-slate-900 
                   ${error ? "border-red-300" : "border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"}`
            }
          `}
        />

        {/* OPTIONAL ICON ACCENT */}
        {Icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            isDark ? "text-gray-600 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-500"
          }`}>
            <Icon size={18} />
          </div>
        )}

        {/* ERROR SHAKE ANIMATION */}
        {error && (
          <motion.div 
            initial={{ x: -4 }}
            animate={{ x: 0 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
          >
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </motion.div>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 ml-1 text-xs font-bold text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;