import React from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Send, 
  History, 
  User, 
  Wallet, 
  Users, 
  Settings, 
  ShieldCheck,
  Zap,
  Banknote
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ role }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const linksByRole = {
    user: [
      { to: "/user", label: "Overview", icon: <LayoutDashboard size={18} />, end: true },
      { to: "/user/deposit", label: "Deposit", icon: <ArrowDownCircle size={18} /> },
      { to: "/user/withdraw", label: "Withdraw", icon: <ArrowUpCircle size={18} /> },
      { to: "/user/send", label: "Send Money", icon: <Send size={18} /> },
      { to: "/user/transactions", label: "History", icon: <History size={18} /> },
      { to: "/user/profile", label: "My Profile", icon: <User size={18} /> },
    ],
    agent: [
      { to: "/agent", label: "Dashboard", icon: <LayoutDashboard size={18} />, end: true },
      { to: "/agent/cash-in", label: "Cash In", icon: <Zap size={18} /> },
      { to: "/agent/cash-out", label: "Cash Out", icon: <Banknote size={18} /> },
      { to: "/agent/transactions", label: "Recent Activity", icon: <History size={18} /> },
      { to: "/agent/profile", label: "Profile", icon: <User size={18} /> },
    ],
    admin: [
      { to: "/admin", label: "Overview", icon: <ShieldCheck size={18} />, end: true },
      { to: "/admin/users", label: "Manage Users", icon: <Users size={18} /> },
      { to: "/admin/agents", label: "Agent Approvals", icon: <Zap size={18} /> },
      { to: "/admin/transactions", label: "Network Logs", icon: <History size={18} /> },
      { to: "/admin/settings", label: "System Config", icon: <Settings size={18} /> },
    ],
  };

  const items = linksByRole[role] || [];

  return (
    <aside
      className={`hidden md:flex w-72 flex-col border-r transition-colors duration-500 sticky top-0 h-screen
        ${
          dark
            ? "border-white/5 bg-neutral-950 text-white"
            : "border-black/5 bg-white text-slate-900"
        }`}
      data-tour-id="nav-menu"
    >
      {/* BRANDING */}
      <div className="px-8 py-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
            W
          </div>
          <span className="text-xl font-black tracking-tight">
            Wallet<span className="text-blue-500">.</span>
          </span>
        </Link>
      </div>

      {/* NAV LIST */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            Main Menu
          </p>
        </div>

        {items.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300
              ${
                isActive
                  ? dark
                    ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)]"
                    : "bg-blue-50 text-blue-600 shadow-sm"
                  : dark
                  ? "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeBar"
                    className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {link.icon}
                </span>
                
                {link.label}

                {/* Subtle Hover Glow */}
                {!isActive && (
                   <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER / USER CARD */}
      <div className="p-4 mt-auto">
        <div className={`p-4 rounded-2xl border transition-all ${
          dark ? "bg-white/[0.03] border-white/5" : "bg-slate-50 border-black/5 shadow-sm"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black truncate">{user?.name || "Member"}</p>
              <p className="text-[10px] font-bold uppercase tracking-tighter text-blue-500">
                {role} Mode
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
             <div className="h-1.5 flex-1 bg-gray-500/10 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-blue-500 rounded-full" />
             </div>
             <span className="text-[9px] font-bold opacity-40 italic">v2.0.4</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;