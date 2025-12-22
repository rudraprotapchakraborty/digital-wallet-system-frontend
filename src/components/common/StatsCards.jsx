import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../ui/Card";

const StatsCards = ({ items }) => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8"
      data-tour-id="stats-cards"
    >
      {items.map((stat, index) => {
        // Mock trend logic - in a real app, this would come from your API
        const isPositive = stat.trend === "up";
        const isNegative = stat.trend === "down";

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className={`relative overflow-hidden group transition-all duration-300 border-none ${
              dark 
                ? "bg-neutral-900/40 backdrop-blur-md hover:bg-neutral-800/60 shadow-2xl" 
                : "bg-white shadow-xl shadow-black/[0.03] hover:shadow-2xl"
            }`}>
              {/* Subtle accent line */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-opacity opacity-0 group-hover:opacity-100 ${
                stat.color || "from-blue-500 to-cyan-400"
              }`} />

              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-xs font-black uppercase tracking-[0.15em] ${
                    dark ? "text-gray-500" : "text-slate-400"
                  }`}>
                    {stat.label}
                  </p>

                  <h3 className={`mt-3 text-3xl font-black tracking-tight ${
                    dark ? "text-white" : "text-slate-900"
                  }`}>
                    {stat.value}
                  </h3>
                </div>

                {/* Status Icon / Graphic */}
                <div className={`p-3 rounded-2xl ${
                  dark ? "bg-white/5" : "bg-slate-50"
                }`}>
                  {stat.icon ? (
                    React.cloneElement(stat.icon, { 
                      size: 20, 
                      className: dark ? "text-blue-400" : "text-blue-600" 
                    })
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Subtext & Trend Indicator */}
              <div className="mt-6 flex items-center justify-between">
                {stat.sub && (
                  <p className={`text-xs font-bold ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {stat.sub}
                  </p>
                )}

                {stat.change && (
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                    isPositive ? "text-emerald-500 bg-emerald-500/10" :
                    isNegative ? "text-rose-500 bg-rose-500/10" :
                    "text-gray-400 bg-gray-500/10"
                  }`}>
                    {isPositive && <TrendingUp size={12} />}
                    {isNegative && <TrendingDown size={12} />}
                    {!isPositive && !isNegative && <Minus size={12} />}
                    {stat.change}
                  </div>
                )}
              </div>
              
              {/* Background Decoration */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-10 rounded-full transition-colors ${
                 stat.trend === 'up' ? 'bg-emerald-500' : 'bg-blue-500'
              }`} />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;