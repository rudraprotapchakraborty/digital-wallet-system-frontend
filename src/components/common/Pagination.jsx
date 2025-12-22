import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Pagination = ({ page, totalPages, onChange }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  if (!totalPages || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...");
      } else if (page >= totalPages - 2) {
        pages.push("...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push("...", page - 1, page, page + 1, "...");
      }
    }
    return pages;
  };

  const buttonBase = `
    flex items-center justify-center rounded-xl transition-all duration-300 font-bold text-sm
    disabled:cursor-not-allowed disabled:opacity-20
  `;

  const themeClasses = dark
    ? "bg-neutral-900 border border-white/5 text-white hover:bg-white/5"
    : "bg-white border border-black/5 text-slate-700 hover:bg-slate-50 shadow-sm";

  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        {/* PREV BUTTON */}
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className={`${buttonBase} ${themeClasses} w-10 h-10`}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* DYNAMIC PAGE BUBBLES */}
        <div className="flex items-center gap-1.5 px-2">
          {getPageNumbers().map((p, idx) => (
            <React.Fragment key={idx}>
              {p === "..." ? (
                <span className="px-2 opacity-30">
                  <MoreHorizontal size={14} />
                </span>
              ) : (
                <button
                  onClick={() => onChange(p)}
                  className={`relative w-10 h-10 rounded-xl text-sm font-black transition-all duration-300 ${
                    page === p
                      ? "text-white"
                      : dark
                      ? "text-gray-500 hover:text-white hover:bg-white/5"
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {page === p && (
                    <motion.div
                      layoutId="activePagination"
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{p}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* NEXT BUTTON */}
        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className={`${buttonBase} ${themeClasses} w-10 h-10`}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* FOOTER LABEL */}
      <div className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${dark ? 'text-white' : 'text-slate-900'}`}>
        Displaying page <span className="text-blue-500">{page}</span> of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;