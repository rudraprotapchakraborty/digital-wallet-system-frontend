import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Users, 
  Cpu, 
  Globe, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const About = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section className={`min-h-screen pt-32 pb-20 transition-colors duration-500 overflow-hidden ${
      dark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none -z-10">
        <div className={`absolute inset-0 opacity-10 ${dark ? 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500' : 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-200'}`} />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {/* HERO SECTION */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Bridging the gap to <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Digital Freedom</span>.
          </h1>
          <p className={`mx-auto max-w-3xl text-xl leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Digital Wallet System was born from a simple observation: while the world moves toward cashless economies, millions are left behind. We build the infrastructure that connects traditional cash-first markets to the global digital grid.
          </p>
        </motion.div>

        {/* CORE VALUES / MISSION GRID */}
        <div className="grid gap-8 md:grid-cols-2 mb-32">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className={`h-full p-8 border-none ${dark ? 'bg-white/[0.03]' : 'bg-white shadow-xl shadow-black/5'}`}>
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white mb-6">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className={`text-lg leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
                To make digital payments accessible, understandable, and trustworthy for everyone—regardless of their device, location, or banking status. We believe financial access is a fundamental right.
              </p>
            </Card>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Card className={`h-full p-8 border-none ${dark ? 'bg-white/[0.03]' : 'bg-white shadow-xl shadow-black/5'}`}>
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white mb-6">
                <Globe size={24} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className={`text-lg leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
                Connecting local agents, individual users, and administrators into one unified ecosystem. We are building the operating system for the next billion digital wallet users.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* TEAM / DEPARTMENTS SECTION */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Meet the Engines</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-500/20 to-transparent" />
          </div>

          <div className="space-y-6">
            {[
              {
                role: "Product & Experience",
                desc: "Obsessed with clean, responsive interfaces that remove friction from every transaction.",
                icon: <Sparkles className="text-blue-500" />
              },
              {
                role: "Engineering Core",
                desc: "Building a hardened, API-first architecture with enterprise-grade role-based access controls.",
                icon: <Cpu className="text-emerald-500" />
              },
              {
                role: "Global Operations",
                desc: "The boots on the ground onboarding local agents and providing 24/7 network support.",
                icon: <Users className="text-purple-500" />
              }
            ].map((dept, i) => (
              <motion.div
                key={dept.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`group flex items-start gap-6 p-6 rounded-2xl transition-all ${
                  dark ? "hover:bg-white/[0.03]" : "hover:bg-white hover:shadow-lg"
                }`}
              >
                <div className={`mt-1 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  dark ? "bg-neutral-900" : "bg-slate-200"
                }`}>
                  {dept.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-blue-500 transition-colors">
                    {dept.role}
                  </h3>
                  <p className={`${dark ? "text-gray-400" : "text-gray-600"} text-lg leading-relaxed`}>
                    {dept.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CALLOUT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className={`p-10 rounded-[2.5rem] text-center border ${
            dark ? "bg-blue-600/5 border-blue-500/20" : "bg-blue-600 text-white shadow-2xl shadow-blue-500/40"
          }`}
        >
          <div className="flex justify-center mb-6">
            <ShieldCheck size={48} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Safe. Secure. Transparent.</h2>
          <p className={`max-w-2xl mx-auto mb-8 text-lg ${dark ? "text-gray-400" : "text-blue-100"}`}>
            We don't just move money; we move trust. Join thousands of users who have already upgraded their financial life.
          </p>
          <button className={`px-8 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 mx-auto ${
            dark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-white text-blue-600 hover:bg-blue-50"
          }`}>
            Join the movement <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;