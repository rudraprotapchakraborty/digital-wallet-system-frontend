import React from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Send, 
  History, 
  User, 
  ShieldCheck, 
  Zap, 
  Banknote,
  Settings,
  Users,
  LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const MobileSidebar = ({ role, open, onClose }) => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const linksByRole = {
    user: [
      { to: "/user", label: "Overview", icon: <LayoutDashboard size={20} />, end: true },
      { to: "/user/deposit", label: "Deposit", icon: <ArrowDownCircle size={20} /> },
      { to: "/user/withdraw", label: "Withdraw", icon: <ArrowUpCircle size={20} /> },
      { to: "/user/send", label: "Send Money", icon: <Send size={20} /> },
      { to: "/user/transactions", label: "History", icon: <History size={20} /> },
      { to: "/user/profile", label: "My Profile", icon: <User size={20} /> },
    ],
    agent: [
      { to: "/agent", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
      { to: "/agent/cash-in", label: "Cash In", icon: <Zap size={20} /> },
      { to: "/agent/cash-out", label: "Cash Out", icon: <Banknote size={20} /> },
      { to: "/agent/transactions", label: "Activity", icon: <History size={20} /> },
      { to: "/agent/profile", label: "Profile", icon: <User size={20} /> },
    ],
    admin: [
      { to: "/admin", label: "Overview", icon: <ShieldCheck size={20} />, end: true },
      { to: "/admin/users", label: "Manage Users", icon: <Users size={20} /> },
      { to: "/admin/agents", label: "Agent Approvals", icon: <Zap size={20} /> },
      { to: "/admin/transactions", label: "Network Logs", icon: <History size={20} /> },
      { to: "/admin/settings", label: "System Config", icon: <Settings size={20} /> },
    ],
  };

  const items = linksByRole[role] || [];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP: Blurred and Animated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-neutral-950/60 backdrop-blur-sm md:hidden"
          />

          {/* DRAWER: Slide-in with Spring Physics */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed left-0 top-0 z-[70] h-full w-[85%] max-w-[320px] flex flex-col shadow-2xl md:hidden transition-colors duration-500 ${
              dark ? "bg-neutral-950 text-white" : "bg-white text-slate-900"
            }`}
          >
            {/* HEADER: Brand and Close */}
            <div className={`flex items-center justify-between px-6 py-6 border-b ${
              dark ? "border-white/5" : "border-black/5"
            }`}>
              <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30">
                  W
                </div>
                <span className="text-xl font-black tracking-tight">
                  Wallet<span className="text-blue-500">.</span>
                </span>
              </Link>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-colors ${
                  dark ? "bg-white/5 text-gray-400" : "bg-slate-100 text-slate-500"
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* NAV LINKS: Scrollable with Staggered Visuals */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">
                Navigation
              </p>
              
              {items.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3.5 text-base font-bold transition-all
                    ${
                      isActive
                        ? dark
                          ? "bg-blue-600/10 text-blue-400"
                          : "bg-blue-50 text-blue-600"
                        : dark
                        ? "text-gray-400 hover:bg-white/5 hover:text-white"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  <span className="opacity-70">{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* FOOTER: Enhanced User Profile and Logout */}
            <div className={`p-4 mt-auto border-t ${
              dark ? "border-white/5" : "border-black/5 bg-slate-50/50"
            }`}>
              <div className={`p-4 rounded-2xl flex items-center justify-between ${
                dark ? "bg-white/5" : "bg-white border border-black/5 shadow-sm"
              }`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black truncate">{user?.name || "Member"}</p>
                    <p className="text-[10px] font-bold uppercase tracking-tighter text-blue-500">
                      {role}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className={`p-2.5 rounded-xl transition-all ${
                    dark ? "bg-red-500/10 text-red-400" : "bg-red-50 text-red-600"
                  }`}
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;