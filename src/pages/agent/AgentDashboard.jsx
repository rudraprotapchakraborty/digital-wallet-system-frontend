import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ArrowUpRight, 
  ArrowDownLeft, 
  IndianRupee, 
  Trophy, 
  Activity,
  History,
  Target
} from "lucide-react";
import api from "../../services/api";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";
import { useTheme } from "../../context/ThemeContext";

const AgentDashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Fetching transactions and commissions concurrently for performance
        const [txRes, comRes] = await Promise.all([
          api.get("/wallet/transactions", { params: { page: 1 } }),
          api.get("/agent/commission"),
        ]);

        const tx = txRes.data.transactions || txRes.data;

        setSummary({
          totalTx: tx.length,
          cashIn: tx.filter((t) => t.type === "cash_in").length,
          cashOut: tx.filter((t) => t.type === "cash_out").length,
          commission: comRes.data.total || 0,
        });
      } catch (e) {
        console.error("Dashboard Sync Error:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = summary
    ? [
        { 
          label: "Operations", 
          value: summary.totalTx, 
          icon: <Activity />, 
          sub: "Handled transactions" 
        },
        { 
          label: "Cash In", 
          value: summary.cashIn, 
          icon: <ArrowDownLeft />, 
          trend: "up", 
          color: "from-emerald-500 to-teal-400" 
        },
        { 
          label: "Cash Out", 
          value: summary.cashOut, 
          icon: <ArrowUpRight />, 
          trend: "down", 
          color: "from-amber-500 to-orange-400" 
        },
        { 
          label: "Earnings", 
          value: `₹${summary.commission.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 
          icon: <IndianRupee />, 
          sub: "Total commission",
          color: "from-blue-600 to-cyan-500"
        },
      ]
    : [];

  return (
    <section className="space-y-10">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
            <Target size={12} /> Live Performance
          </div>
          <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
            Agent <span className="text-blue-500">Insights</span>
          </h1>
          <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
            Track your liquidity flow and daily commission growth.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
          dark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-sm"
        }`}>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">System Status</p>
            <p className="text-sm font-bold">Operational & Syncing</p>
          </div>
        </div>
      </motion.div>

      {/* STATS GRID */}
      <div data-tour-id="stats-cards">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => <SkeletonBlock key={i} height={140} className="rounded-3xl" />)}
          </div>
        ) : (
          <StatsCards items={stats} />
        )}
      </div>

      {/* OPERATIONAL GUIDANCE */}
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full group relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl ${dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Today’s Focus</h3>
            </div>
            
            <p className={`text-base leading-relaxed mb-8 ${dark ? "text-neutral-400" : "text-slate-600"}`}>
              Your priority is maintaining service velocity. Facilitate user deposits and withdrawals with precision. 
              Ensure physical cash matches digital ledger entries before final confirmation.
            </p>

            <div className="flex flex-wrap gap-4">
               <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <History size={14} className="text-blue-500" /> Check Activity
               </div>
               <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <Target size={14} className="text-emerald-500" /> Review Commissions
               </div>
            </div>
          </Card>
        </motion.div>

        {/* QUICK TIP / SECURITY CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-gradient-to-br from-indigo-600 to-blue-700 border-none text-white">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-4 opacity-70">Agent Safety</h4>
            <p className="text-blue-50 text-sm leading-relaxed mb-6">
              Never share your Agent PIN or sensitive credentials with anyone claiming to be system support.
            </p>
            <div className="pt-6 border-t border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Help Center</p>
              <p className="text-sm font-bold underline cursor-pointer mt-1">Contact Support Node</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentDashboard;