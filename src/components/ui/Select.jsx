import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, AlertCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Select = ({ label, error, children, className = "", ...rest }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`group flex flex-col w-full ${className}`}>
      {/* LABEL: Consistent with Input component typography */}
      {label && (
        <label
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
        {/* SELECT FIELD: Custom appearance-none for total control */}
        <select
          {...rest}
          className={`
            appearance-none w-full rounded-2xl border-2 px-4 py-3 text-sm font-bold transition-all duration-300 outline-none cursor-pointer
            ${
              isDark
                ? `bg-white/[0.03] text-white 
                   ${error ? "border-red-500/50" : "border-white/5 focus:border-blue-500/50 focus:bg-white/[0.05] focus:ring-4 focus:ring-blue-500/10"}`
                : `bg-slate-50 text-slate-700 
                   ${error ? "border-red-300" : "border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-sm"}`
            }
          `}
        >
          {children}
        </select>

        {/* CUSTOM CHEVRON: Rotates slightly on group hover or focus */}
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ${
          isDark ? "text-gray-500 group-focus-within:text-blue-400" : "text-slate-400 group-focus-within:text-blue-500"
        }`}>
          <ChevronDown size={18} className="group-focus-within:rotate-180 transition-transform" />
        </div>

        {/* ERROR PULSE DOT */}
        {error && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          </div>
        )}
      </div>

      {/* ERROR MESSAGE: Slide down animation */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 ml-1 text-xs font-bold text-red-500 flex items-center gap-1"
        >
          <AlertCircle size={12} />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Select;