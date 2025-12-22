import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  LogOut, 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  LayoutGrid,
  UserCircle
} from "lucide-react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";
import DashboardTour from "../common/DashboardTour";

const DashboardLayout = ({ role }) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${
      dark ? "bg-neutral-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* DESKTOP SIDEBAR - Elevated with specialized border */}
      <div className="hidden md:block">
        <Sidebar role={role} />
      </div>

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        role={role}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* MAIN WRAPPER */}
      <div className="flex flex-1 flex-col min-w-0">
        
        {/* TOPBAR: Glassmorphism Design */}
        <header className={`sticky top-0 z-40 flex h-16 items-center justify-between px-4 sm:px-8 border-b transition-all duration-300 backdrop-blur-md ${
          dark 
            ? "border-white/5 bg-neutral-950/80" 
            : "border-black/5 bg-white/80"
        }`}>
          
          {/* LEFT: Menu & Context */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 rounded-xl transition-colors ${
                dark ? "bg-white/5 text-white" : "bg-black/5 text-slate-900"
              }`}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className={`hidden sm:flex h-8 w-8 rounded-lg items-center justify-center ${dark ? "bg-blue-500/20 text-blue-400" : "bg-blue-600 text-white"}`}>
                <LayoutGrid size={18} />
              </div>
              <h1 className="text-sm font-bold uppercase tracking-widest opacity-80">
                {role} <span className="text-blue-500">Workspace</span>
              </h1>
            </div>
          </div>

          {/* CENTER: Quick Search (Desktop) */}
          <div className="hidden lg:flex relative w-64 group">
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:text-blue-500 transition-colors" />
             <input 
              type="text" 
              placeholder="Quick search..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border outline-none transition-all ${
                dark ? "bg-white/5 border-white/10 focus:border-blue-500/50" : "bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20"
              }`}
             />
          </div>

          {/* RIGHT: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <button className={`p-2 rounded-xl transition-all relative ${dark ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
              <Bell size={20} className="opacity-70" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-current" />
            </button>

            <DashboardTour />

            {/* THEME TOGGLE: Modern Pill */}
            <button
              onClick={toggleTheme}
              className={`relative flex h-9 w-16 items-center rounded-full p-1 transition-all ${
                dark ? "bg-neutral-800" : "bg-slate-200"
              }`}
            >
              <motion.div
                animate={{ x: dark ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`flex h-7 w-7 items-center justify-center rounded-full shadow-md ${
                  dark ? "bg-black text-yellow-400" : "bg-white text-blue-600"
                }`}
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </motion.div>
            </button>

            <div className={`h-8 w-px mx-1 ${dark ? "bg-white/10" : "bg-black/10"}`} />

            {/* Profile/Logout Dropdown Mockup */}
            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-bold leading-none">{user?.name || "Member"}</span>
                <span className="text-[10px] opacity-50 uppercase tracking-tighter font-black text-blue-500">{role}</span>
              </div>
              <button 
                onClick={logout}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all border ${
                  dark 
                    ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" 
                    : "bg-white border-black/5 text-slate-400 hover:text-red-600 hover:shadow-lg"
                }`}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* CONTENT AREA: Transitioning Wrapper */}
        <main className="flex-1 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={role} // Re-animate if role changes
            transition={{ duration: 0.4 }}
            className="p-4 sm:p-8 max-w-[1600px] mx-auto"
          >
            {/* Content Header (Optional dynamic breadcrumb) */}
            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                Overview
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              </h2>
              <p className="text-sm opacity-50">Manage your transactions and account status.</p>
            </div>

            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;