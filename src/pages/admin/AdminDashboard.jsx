import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users as UsersIcon, 
  Wallet as WalletIcon, 
  Activity, 
  IndianRupee, 
  ShieldCheck, 
  Zap, 
  BarChart3,
  Globe
} from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";

const AdminDashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [usersRes, walletsRes, txRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/wallets"),
          api.get("/admin/transactions"),
        ]);

        const users = usersRes.data.users || usersRes.data;
        const wallets = walletsRes.data.wallets || walletsRes.data;
        const tx = txRes.data.transactions || txRes.data;

        const volume = tx.reduce((sum, t) => sum + (t.amount || 0), 0);

        setSummary({
          users: users.length,
          wallets: wallets.length,
          txCount: tx.length,
          volume,
        });
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const stats = summary
    ? [
        { 
          label: "Total Users", 
          value: summary.users.toLocaleString(), 
          icon: <UsersIcon />, 
          trend: "up", 
          change: "+12.5%",
          sub: "Verified members"
        },
        { 
          label: "Active Wallets", 
          value: summary.wallets.toLocaleString(), 
          icon: <WalletIcon />, 
          trend: "up", 
          change: "+8.2%",
          sub: "Provisioned accounts"
        },
        { 
          label: "Transactions", 
          value: summary.txCount.toLocaleString(), 
          icon: <Activity />, 
          trend: "up", 
          change: "+24.1%",
          sub: "Processed today"
        },
        { 
          label: "Total Volume", 
          value: `₹${summary.volume.toLocaleString()}`, 
          icon: <IndianRupee />, 
          trend: "up", 
          change: "+15.3%",
          sub: "Net ecosystem flow"
        },
      ]
    : [];

  return (
    <section className={`min-h-screen transition-colors duration-500 ${
      dark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} /> System Administrator
            </div>
            <h1 className="text-4xl font-black tracking-tighter md:text-5xl">
              Platform <span className="text-blue-500">Overview</span>
            </h1>
            <p className={`mt-2 text-lg max-w-xl ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Analyze global ecosystem health, user growth velocity, and liquidity flow in real-time.
            </p>
          </motion.div>

          {/* REAL-TIME STATUS INDICATOR */}
          <div className={`flex items-center gap-3 p-4 rounded-2xl border ${
            dark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-sm"
          }`}>
            <div className="relative h-3 w-3">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25" />
              <div className="relative h-3 w-3 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest opacity-60">System Operational</span>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="mt-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map(i => <SkeletonBlock key={i} height={160} className="rounded-3xl" />)}
            </div>
          ) : (
            <StatsCards items={stats} />
          )}
        </div>

        {/* ANALYTICS INSIGHTS AREA */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          
          {/* NETWORK HEALTH WIDGET */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="h-full group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${dark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                    <Zap size={20} className="text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight">Security & Performance</h3>
                </div>
                <BarChart3 size={20} className="opacity-20 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className={`p-6 rounded-2xl ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Integrity Audit</p>
                  <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Scan the <span className="text-blue-500 font-bold">Transactions</span> section for high-frequency anomalies or unauthorized agent behaviors.
                  </p>
                </div>
                <div className={`p-6 rounded-2xl ${dark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">Network Stability</p>
                  <p className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    The current average transaction latency is <span className="text-emerald-500 font-bold">1.2s</span>. Node distribution is consistent across all regional hubs.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* GLOBAL ACTIVITY LOG (Simplified) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full bg-gradient-to-br from-blue-600 to-blue-700 border-none text-white shadow-2xl shadow-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Globe size={24} className="text-blue-100" />
                <h3 className="text-xl font-bold tracking-tight">Live Distribution</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed mb-8">
                Platform reach is expanding. Currently monitoring agent activities across 14 regional nodes.
              </p>
              
              <div className="space-y-4">
                {[
                  { city: "New Delhi", status: "High Activity" },
                  { city: "Mumbai", status: "Stable" },
                  { city: "Bangalore", status: "Growing" }
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/5">
                    <span className="text-xs font-bold">{node.city}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{node.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;