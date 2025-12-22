import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Pagination = ({ page, totalPages, onChange }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  if (!totalPages || totalPages <= 1) return null;

  const btnBase =
    "rounded-lg px-4 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed";

  const btnTheme = dark
    ? "border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40"
    : "border border-gray-300 bg-white text-black hover:bg-gray-100 disabled:opacity-40";

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${btnBase} ${btnTheme}`}
      >
        Prev
      </button>

      {/* Info */}
      <span
        className={`text-sm ${
          dark ? "text-gray-200" : "text-gray-600"
        }`}
      >
        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
      </span>

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className={`${btnBase} ${btnTheme}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
