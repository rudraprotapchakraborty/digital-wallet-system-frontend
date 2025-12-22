import React from "react";
import { useTheme } from "../../context/ThemeContext";

const FiltersBar = ({ filters, onChange }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const inputBase = `
    w-full rounded-lg border px-3 py-2 text-sm transition
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `;

  const inputTheme = dark
    ? "border-neutral-700 bg-neutral-900 text-white placeholder-gray-400"
    : "border-gray-300 bg-white text-black placeholder-gray-400";

  return (
    <div
      className="flex flex-wrap gap-3"
      data-tour-id="table-filters"
    >
      {/* Search */}
      <input
        name="search"
        placeholder="Search by phone, email, or reference"
        value={filters.search || ""}
        onChange={handleChange}
        className={`${inputBase} ${inputTheme} flex-1 min-w-[220px]`}
      />

      {/* Type */}
      <select
        name="type"
        value={filters.type || ""}
        onChange={handleChange}
        className={`${inputBase} ${inputTheme} min-w-[160px]`}
      >
        <option value="">All types</option>
        <option value="add_money">Add money</option>
        <option value="withdraw">Withdraw</option>
        <option value="send">Send money</option>
        <option value="cash_in">Cash in</option>
        <option value="cash_out">Cash out</option>
      </select>

      {/* Status */}
      <select
        name="status"
        value={filters.status || ""}
        onChange={handleChange}
        className={`${inputBase} ${inputTheme} min-w-[160px]`}
      >
        <option value="">All status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="reversed">Reversed</option>
      </select>

      {/* From date */}
      <input
        type="date"
        name="from"
        value={filters.from || ""}
        onChange={handleChange}
        className={`${inputBase} ${inputTheme} min-w-[160px]`}
      />

      {/* To date */}
      <input
        type="date"
        name="to"
        value={filters.to || ""}
        onChange={handleChange}
        className={`${inputBase} ${inputTheme} min-w-[160px]`}
      />
    </div>
  );
};

export default FiltersBar;
