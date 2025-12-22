import React from "react";
import { 
  Search, 
  Filter, 
  Calendar, 
  XCircle, 
  ChevronDown,
  Activity
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FiltersBar = ({ filters, onChange }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    onChange({ search: "", type: "", status: "", from: "", to: "" });
  };

  const inputStyles = `
    w-full rounded-xl border px-10 py-2.5 text-sm font-medium transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500
    ${dark 
      ? "border-white/10 bg-neutral-900 text-white placeholder-gray-500" 
      : "border-black/5 bg-white text-slate-900 placeholder-slate-400 shadow-sm"}
  `;

  const selectStyles = `
    appearance-none w-full rounded-xl border pl-10 pr-10 py-2.5 text-sm font-bold transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer
    ${dark 
      ? "border-white/10 bg-neutral-900 text-white" 
      : "border-black/5 bg-white text-slate-700 shadow-sm"}
  `;

  return (
    <div 
      className="flex flex-col gap-4 mb-8"
      data-tour-id="table-filters"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* PRIMARY SEARCH */}
        <div className="relative flex-1 min-w-[280px] group">
          <Search 
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              dark ? "text-gray-500 group-focus-within:text-blue-500" : "text-slate-400 group-focus-within:text-blue-600"
            }`} 
            size={18} 
          />
          <input
            name="search"
            placeholder="Search by phone, email, or reference..."
            value={filters.search || ""}
            onChange={handleChange}
            className={inputStyles}
          />
          {filters.search && (
            <button 
              onClick={() => onChange({ ...filters, search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>

        {/* TYPE FILTER */}
        <div className="relative min-w-[160px] group">
          <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500/50" size={16} />
          <select
            name="type"
            value={filters.type || ""}
            onChange={handleChange}
            className={selectStyles}
          >
            <option value="">All Types</option>
            <option value="add_money">Add Money</option>
            <option value="withdraw">Withdraw</option>
            <option value="send">Send Money</option>
            <option value="cash_in">Cash In</option>
            <option value="cash_out">Cash Out</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" size={14} />
        </div>

        {/* STATUS FILTER */}
        <div className="relative min-w-[160px] group">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-500/50" size={16} />
          <select
            name="status"
            value={filters.status || ""}
            onChange={handleChange}
            className={selectStyles}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="reversed">Reversed</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" size={14} />
        </div>
      </div>

      {/* SECONDARY ROW: DATE RANGE & CLEAR */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 p-1 px-2 rounded-2xl bg-blue-500/5 border border-blue-500/10">
          <div className="relative min-w-[150px]">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="date"
              name="from"
              value={filters.from || ""}
              onChange={handleChange}
              className={`pl-9 pr-3 py-1.5 text-xs bg-transparent border-none outline-none font-bold ${dark ? 'text-white' : 'text-slate-700'}`}
            />
          </div>
          <span className="text-xs opacity-30 font-black">TO</span>
          <div className="relative min-w-[150px]">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="date"
              name="to"
              value={filters.to || ""}
              onChange={handleChange}
              className={`pl-9 pr-3 py-1.5 text-xs bg-transparent border-none outline-none font-bold ${dark ? 'text-white' : 'text-slate-700'}`}
            />
          </div>
        </div>

        <button
          onClick={clearFilters}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-xl border ${
            dark 
              ? "border-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-gray-500" 
              : "border-black/5 hover:bg-slate-100 text-slate-400"
          }`}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;