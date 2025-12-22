import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  ChevronRight, 
  Wallet 
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
      isDark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Dynamic Background Blob Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${isDark ? 'bg-blue-600' : 'bg-blue-400'}`} />
        <div className={`absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-10 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* LEFT CONTENT */}
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v2.0 Now Live
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-black leading-[1.1] tracking-tight md:text-7xl"
            >
              Instant digital <br />
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                wallet ecosystem
              </span>.
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className={`mt-8 max-w-xl text-lg md:text-xl leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              The unified standard for modern payments. Send money, manage assets, and scale your financial reach with enterprise-grade security and zero friction.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/register")}
                className="group h-14 px-8 text-lg shadow-lg shadow-blue-500/20 transition-transform active:scale-95"
              >
                Create free wallet 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/features")}
                className="h-14 px-8 text-lg backdrop-blur-sm border-gray-500/20"
              >
                Explore Features
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className={`mt-10 flex items-center gap-6 text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              <div className="flex items-center gap-2"><ShieldCheck size={18} /> Bank-level security</div>
              <div className="flex items-center gap-2"><Zap size={18} /> Instant Settlement</div>
            </motion.div>
          </motion.div>

          {/* RIGHT - INTERACTIVE MOCKUP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className={`relative z-10 p-1 rounded-[2.5rem] border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'} backdrop-blur-xl`}>
              <Card className="rounded-[2.2rem] border-none p-8">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <p className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Current Balance</p>
                    <h2 className="text-4xl font-bold mt-1">₹5,420.00</h2>
                  </div>
                  <div className="h-12 w-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
                    <Wallet size={24} />
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Today’s transfers", val: "7", color: "text-emerald-500" },
                    { label: "Processing Speed", val: "3.2s", color: "text-blue-500" },
                    { label: "Active Nodes", val: "Online", color: "text-emerald-500" }
                  ].map((stat, i) => (
                    <div key={i} className={`flex justify-between items-center p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                      <span className="font-medium opacity-70">{stat.label}</span>
                      <span className={`font-bold ${stat.color}`}>{stat.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-500/10">
                   <div className="flex -space-x-3 mb-4">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                      ))}
                      <div className="h-10 w-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">+12k</div>
                   </div>
                   <p className="text-sm font-medium opacity-60">Joined by 12,000+ users this month</p>
                </div>
              </Card>
            </div>
            {/* Background Accent for Card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div className={`relative border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Engineered for the <br />
                <span className="text-blue-500">future of finance.</span>
              </h2>
            </div>
            <p className={`max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Our platform combines consumer simplicity with industrial-grade tools for agents and administrators.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Users className="text-blue-500" />,
                title: "Agent-assisted Cash In",
                text: "Top up your wallet at any partner agent with cash. Funds appear instantly upon verification.",
              },
              {
                icon: <Zap className="text-amber-500" />,
                title: "Real-time Transfers",
                text: "Send money via phone or email. Our ledger updates in milliseconds with total transparency.",
              },
              {
                icon: <ShieldCheck className="text-emerald-500" />,
                title: "Admin-grade Control",
                text: "Powerful dashboards to manage fee rules, approve agents, and monitor ecosystem health.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full group hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 border-white/10 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-2xl mb-6 flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-blue-50'}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {item.text}
                  </p>
                  <div className="mt-6 flex items-center text-blue-500 font-semibold text-sm cursor-pointer group-hover:gap-2 transition-all">
                    Learn more <ChevronRight size={16} />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;