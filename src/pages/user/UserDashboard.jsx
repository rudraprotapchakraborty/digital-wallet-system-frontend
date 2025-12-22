import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Activity, 
  CheckCircle2, 
  Zap, 
  PieChart as PieIcon,
  BarChart3
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import StatsCards from "../../components/common/StatsCards";
import Card from "../../components/ui/Card";
import SkeletonBlock from "../../components/common/SkeletonBlock";

const UserDashboard = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [wallet, setWallet] = useState(null);
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [wRes, tRes] = await Promise.all([
          api.get("/wallet/me"),
          api.get("/wallet/transactions", { params: { page: 1 } }),
        ]);
        setWallet(wRes.data);
        setTx(tRes.data.transactions || tRes.data);
      } catch (e) {
        console.error("Dashboard Sync Error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    {
      label: "Available Balance",
      value: wallet ? `₹${wallet.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : "—",
      icon: <WalletIcon />,
      sub: "Current liquidity",
      color: "from-blue-600 to-cyan-500"
    },
    {
      label: "Handled Activity",
      value: tx.length,
      icon: <Activity />,
      sub: "Loaded operations",
      color: "from-indigo-500 to-purple-500"
    },
    {
      label: "Success Rate",
      value: `${tx.length ? Math.round((tx.filter(t => t.status === 'completed').length / tx.length) * 100) : 0}%`,
      icon: <CheckCircle2 />,
      sub: "Successful transfers",
      color: "from-emerald-500 to-teal-400"
    },
  ];

  const byType = ["add_money", "withdraw", "send"].map((type) => ({
    name: type.replace("_", " ").toUpperCase(),
    total: tx
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + (t.amount || 0), 0),
  }));

  const pieData = [
    { name: "Completed", value: tx.filter(t => t.status === "completed").length, color: "#10b981" },
    { name: "Pending/Other", value: tx.filter(t => t.status !== "completed").length, color: dark ? "#3f3f46" : "#e2e8f0" },
  ];

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <Zap size={12} className="fill-current" /> Real-time Sync
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          User <span className="text-blue-500">Overview</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Monitor your asset distribution and recent transaction velocity.
        </p>
      </motion.div>

      {/* STATS */}
      <div data-tour-id="stats-cards">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map(i => <SkeletonBlock key={i} height={140} className="rounded-3xl" />)}
          </div>
        ) : (
          <StatsCards items={stats} />
        )}
      </div>

      {/* CHARTS */}
      <div className="grid gap-8 lg:grid-cols-5" data-tour-id="chart-section">
        
        {/* VOLUME BAR CHART */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card className="h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${dark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <BarChart3 size={18} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight opacity-80">Volume by Type</h3>
              </div>
            </div>

            {loading ? <SkeletonBlock height={240} /> : (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byType} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={dark ? "#ffffff10" : "#00000005"} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: dark ? "#71717a" : "#94a3b8" }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 900, fill: dark ? "#71717a" : "#94a3b8" }} 
                    />
                    <Tooltip
                      cursor={{ fill: dark ? '#ffffff05' : '#00000005' }}
                      contentStyle={{
                        backgroundColor: dark ? "#171717" : "#ffffff",
                        border: "1px solid " + (dark ? "#ffffff10" : "#00000005"),
                        borderRadius: "12px",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    />
                    <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </motion.div>

        {/* STATUS PIE CHART */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className={`p-2 rounded-xl ${dark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                <PieIcon size={18} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight opacity-80">Transaction Status</h3>
            </div>

            {loading ? <SkeletonBlock height={240} /> : (
              <div className="flex-1 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: dark ? "#171717" : "#ffffff",
                        borderRadius: "12px",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Custom Legend */}
                <div className="mt-4 flex gap-6">
                  {pieData.map((entry, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default UserDashboard;