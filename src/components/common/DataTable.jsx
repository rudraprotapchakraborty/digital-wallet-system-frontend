import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, ChevronRight } from "lucide-react";
import SkeletonBlock from "./SkeletonBlock";
import { useTheme } from "../../context/ThemeContext";

const DataTable = ({ columns, data, loading }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  // Refined Loading State with Staggered Skeletons
  if (loading) {
    return (
      <div className={`rounded-2xl border p-4 space-y-4 ${dark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-white"}`}>
        <SkeletonBlock height={48} className="rounded-xl" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBlock key={i} height={56} className="rounded-lg opacity-50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
        dark 
          ? "border-white/5 bg-neutral-900/50 backdrop-blur-sm shadow-2xl shadow-black/20" 
          : "border-black/5 bg-white shadow-xl shadow-black/[0.02]"
      }`}
      data-tour-id="table-section"
    >
      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse text-left">
          {/* HEADER */}
          <thead>
            <tr className={`border-b transition-colors ${
              dark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-slate-50/50"
            }`}>
              {columns.map((col, index) => (
                <th
                  key={col.key || col.accessor}
                  className={`px-6 py-4 text-xs font-black uppercase tracking-[0.15em] ${
                    dark ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {index === 0 && <div className="h-1 w-1 rounded-full bg-blue-500" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-transparent">
            <AnimatePresence mode="popLayout">
              {(!data || data.length === 0) ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={columns.length} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className={`p-4 rounded-full ${dark ? "bg-white/5" : "bg-slate-50"}`}>
                        <Inbox size={32} className="opacity-20" />
                      </div>
                      <p className={`text-sm font-bold tracking-tight ${dark ? "text-neutral-500" : "text-gray-400"}`}>
                        No transactions or records found
                      </p>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                data.map((row, rowIndex) => (
                  <motion.tr
                    key={row._id || row.id || rowIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rowIndex * 0.03 }}
                    className={`group transition-all duration-200 ${
                      dark 
                        ? "hover:bg-white/[0.03] text-gray-300" 
                        : "hover:bg-blue-50/50 text-slate-700"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key || col.accessor}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium tracking-tight relative overflow-hidden"
                      >
                        <div className="relative z-10 flex items-center gap-2">
                          {col.render ? col.render(row) : row[col.accessor]}
                        </div>
                        
                        {/* Interactive cell highlight */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                    ))}
                    
                    {/* Optional: Right-side action hint */}
                    <td className="w-10 pr-4 opacity-0 group-hover:opacity-40 transition-opacity">
                       <ChevronRight size={16} />
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* FOOTER STRIP (Pagination Placeholder) */}
      <div className={`px-6 py-3 border-t flex items-center justify-between text-[10px] font-black uppercase tracking-widest ${
        dark ? "border-white/5 bg-white/[0.01] text-gray-500" : "border-black/5 bg-slate-50/30 text-slate-400"
      }`}>
        <div className="flex items-center gap-2">
           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
           Live Data Sync
        </div>
        <span>{data?.length || 0} Records Displayed</span>
      </div>
    </div>
  );
};

export default DataTable;