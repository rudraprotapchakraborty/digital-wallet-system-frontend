import React from "react";
import { motion } from "framer-motion";
import { 
  Layout, 
  Users, 
  Filter, 
  ShieldCheck, 
  Zap, 
  PieChart, 
  ArrowUpRight,
  Fingerprint,
  RefreshCcw
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";

const Features = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const featureData = [
    {
      title: "Wallet Dashboard",
      description: "See your balance, recent transfers, and activity timeline in one place with real-time updates and interactive charts.",
      icon: <Layout className="text-blue-500" />,
      tag: "Real-time"
    },
    {
      title: "User & Agent Roles",
      description: "Tailored dashboards for users, agents, and admins. Every role has a custom suite of tools and permissions.",
      icon: <Users className="text-purple-500" />,
      tag: "Scalable"
    },
    {
      title: "Advanced Filters",
      description: "Find any transaction by type, amount, status, or date range using powerful search and nested filtering logic.",
      icon: <Filter className="text-amber-500" />,
      tag: "Efficient"
    },
    {
      title: "Security by Design",
      description: "JWT authentication, AES encryption, and multi-factor security protocols built into the foundation of the app.",
      icon: <ShieldCheck className="text-emerald-500" />,
      tag: "Enterprise"
    },
    {
      title: "Instant Settlement",
      description: "No more waiting for clearing houses. Transactions between wallets happen in sub-second intervals.",
      icon: <Zap className="text-cyan-500" />,
      tag: "Lightning"
    },
    {
      title: "Biometric Integration",
      description: "Secure your mobile experience with FaceID and Fingerprint authentication for high-value transfers.",
      icon: <Fingerprint className="text-rose-500" />,
      tag: "Secure"
    }
  ];

  return (
    <section className={`relative min-h-screen pt-32 pb-20 overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-neutral-950" : "bg-slate-50"
    }`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 bg-blue-500" />
            <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Capabilities</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl font-black tracking-tight md:text-6xl ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Powering the <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Modern Economy</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mt-6 text-xl leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Everything you need to manage digital payments securely, efficiently, 
            and at scale. Built with a developer-first mindset and user-centric design.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureData.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className={`h-full relative overflow-hidden transition-all duration-300 border-white/5 hover:border-blue-500/30 ${
                isDark ? "bg-white/[0.03] hover:bg-white/[0.05]" : "bg-white hover:shadow-xl"
              }`}>
                {/* Accent Glow */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="relative z-10 p-2">
                  <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 ${
                    isDark ? "bg-neutral-900" : "bg-slate-50"
                  }`}>
                    {React.cloneElement(feature.icon, { size: 28 })}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {feature.title}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      isDark ? "bg-white/5 text-gray-400" : "bg-blue-50 text-blue-600"
                    }`}>
                      {feature.tag}
                    </span>
                  </div>

                  <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {feature.description}
                  </p>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer">
                    View Technical Docs <ArrowUpRight size={14} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA / Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`mt-20 p-8 rounded-3xl border border-dashed flex flex-col md:flex-row items-center justify-between gap-8 ${
            isDark ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-blue-50/30"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <RefreshCcw size={24} className="animate-spin-slow" />
            </div>
            <div>
              <h4 className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>99.9% Uptime SLA</h4>
              <p className="text-sm opacity-60">Engineered for high availability and fault tolerance.</p>
            </div>
          </div>
          <button className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/25">
            Get Technical Whitepaper
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;