import React from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  Sparkles, 
  ShieldAlert, 
  Percent, 
  RefreshCcw, 
  ChevronRight,
  Database,
  BellRing
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const restartTour = () => {
    localStorage.removeItem("wallet_tour_done");
    toast.success("Guided tour has been reset for your next visit.", {
      icon: '✨',
      style: {
        borderRadius: '12px',
        background: dark ? '#262626' : '#fff',
        color: dark ? '#fff' : '#000',
      },
    });
  };

  const settingsGroups = [
    {
      title: "Onboarding & Experience",
      icon: <Sparkles className="text-blue-500" size={20} />,
      items: [
        {
          label: "Guided Tour",
          desc: "Reset the interactive onboarding experience for all dashboard roles.",
          action: (
            <Button variant="outline" onClick={restartTour} className="h-9 px-4 text-xs font-black uppercase tracking-widest">
              <RefreshCcw size={14} className="mr-2" /> Restart Tour
            </Button>
          ),
        },
      ],
    },
    {
      title: "System Parameters",
      icon: <Percent className="text-purple-500" size={20} />,
      items: [
        {
          label: "Transaction Fee Rules",
          desc: "Configure standard percentage fees for P2P and Cash-In operations.",
          action: <span className="text-xs font-bold text-blue-500 cursor-pointer flex items-center">Configure <ChevronRight size={14} /></span>,
        },
        {
          label: "Agent Commission",
          desc: "Define the default commission split for approved agent network partners.",
          action: <span className="text-xs font-bold text-blue-500 cursor-pointer flex items-center">Manage <ChevronRight size={14} /></span>,
        },
      ],
    },
    {
      title: "Security & Governance",
      icon: <ShieldAlert className="text-rose-500" size={20} />,
      items: [
        {
          label: "Maintenance Mode",
          desc: "Temporarily disable all wallet transactions for scheduled system upgrades.",
          action: <div className={`w-10 h-5 rounded-full relative ${dark ? 'bg-white/10' : 'bg-slate-200'}`}><div className="absolute left-1 top-1 h-3 w-3 bg-gray-400 rounded-full" /></div>,
        },
      ],
    },
  ];

  return (
    <section className={`min-h-screen transition-colors duration-500 ${
      dark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <SettingsIcon size={12} /> System Preferences
            </div>
            <h1 className="text-4xl font-black tracking-tighter">
              Control <span className="text-blue-500">Center</span>
            </h1>
            <p className={`mt-2 text-lg max-w-xl ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Fine-tune the wallet ecosystem, manage revenue rules, and oversee platform security tools.
            </p>
          </motion.div>

          <div className="flex items-center gap-4 text-xs font-bold opacity-40 uppercase tracking-widest">
            <Database size={16} /> Last Backup: 2h ago
          </div>
        </div>

        {/* SETTINGS GRID */}
        <div className="space-y-8">
          {settingsGroups.map((group, gIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gIdx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4 px-2">
                {group.icon}
                <h2 className="text-sm font-black uppercase tracking-[0.2em] opacity-80">{group.title}</h2>
              </div>

              <Card className="divide-y divide-transparent border-none overflow-hidden">
                {group.items.map((item, iIdx) => (
                  <div 
                    key={item.label}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 transition-colors ${
                      dark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'
                    } ${iIdx !== group.items.length - 1 ? (dark ? 'border-b border-white/5' : 'border-b border-black/5') : ''}`}
                  >
                    <div className="max-w-md">
                      <h4 className="font-bold tracking-tight mb-1">{item.label}</h4>
                      <p className={`text-xs leading-relaxed ${dark ? 'text-gray-500' : 'text-slate-500'}`}>
                        {item.desc}
                      </p>
                    </div>
                    <div>
                      {item.action}
                    </div>
                  </div>
                ))}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* DANGER ZONE FOOTER */}
        <div className="mt-16 pt-8 border-t border-red-500/10 flex flex-col items-center">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/50 mb-4 flex items-center gap-2">
             <BellRing size={12} /> Security Protocol v2.4
           </p>
           <p className="text-xs text-center opacity-40 max-w-xs">
             Administrative actions are logged and audited in real-time to ensure platform integrity.
           </p>
        </div>
      </div>
    </section>
  );
};

export default AdminSettings;