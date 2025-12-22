import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  LayoutDashboard, 
  LogOut, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dark = theme === "dark";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDashboard = ["/user", "/agent", "/admin"].some((p) =>
    location.pathname.startsWith(p)
  );
  
  if (isDashboard) return null;

  const goDashboard = () => {
    if (!user) return navigate("/login");
    navigate(`/${user.role}`);
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header
        className={`md:hidden fixed top-0 inset-x-0 z-[60] transition-all duration-300 border-b ${
          scrolled || menuOpen
            ? (dark ? "bg-neutral-950/90 border-neutral-800 backdrop-blur-md" : "bg-white/90 border-gray-100 backdrop-blur-md")
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30">W</div>
            <span className={`text-xl font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
              Wallet<span className="text-blue-500">.</span>
            </span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-xl transition-colors ${
              dark ? "bg-neutral-900 text-white" : "bg-gray-100 text-slate-900"
            }`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden fixed inset-0 z-50 pt-24 px-6 ${
              dark ? "bg-neutral-950" : "bg-slate-50"
            }`}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-lg font-semibold border ${
                    dark ? "bg-neutral-900 border-white/5 text-white" : "bg-white border-black/5 text-slate-900"
                  }`}
                >
                  {link.name}
                  <ChevronRight size={18} className="text-blue-500" />
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  onClick={toggleTheme}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${
                    dark ? "bg-neutral-900 border-white/5 text-white" : "bg-white border-black/5 text-slate-900"
                  }`}
                >
                  {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
                  <span className="text-xs font-bold uppercase tracking-widest">Theme</span>
                </button>
                
                {user ? (
                   <button
                   onClick={logout}
                   className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${
                     dark ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-red-50 border-red-100 text-red-600"
                   }`}
                 >
                   <LogOut size={24} />
                   <span className="text-xs font-bold uppercase tracking-widest">Logout</span>
                 </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${
                      dark ? "bg-neutral-900 border-white/5 text-white" : "bg-white border-black/5 text-slate-900"
                    }`}
                  >
                    <Sparkles size={24} className="text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-widest">Login</span>
                  </Link>
                )}
              </div>

              {user ? (
                <button
                  onClick={goDashboard}
                  className="w-full mt-2 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <LayoutDashboard size={20} /> Go to Dashboard
                </button>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full mt-2 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-500/30 text-center"
                >
                  Get Started
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP NAVBAR */}
      <header className="hidden md:block fixed top-6 left-1/2 z-50 w-[90%] max-w-6xl -translate-x-1/2">
        <nav
          className={`relative flex items-center justify-between rounded-2xl border px-6 py-2 transition-all duration-500 ${
            scrolled 
              ? (dark ? "bg-neutral-950/80 border-white/10 shadow-2xl py-3" : "bg-white/80 border-black/5 shadow-xl py-3")
              : (dark ? "bg-transparent border-transparent" : "bg-transparent border-transparent")
          } backdrop-blur-xl`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/40">
              W
            </div>
            <span className={`text-xl font-black tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
              Wallet<span className="text-blue-500">.</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className={`flex items-center gap-1 p-1 rounded-xl ${dark ? "bg-white/5" : "bg-black/5"}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 ${
                  dark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all hover:rotate-12 ${
                dark ? "border-white/10 bg-neutral-900 text-yellow-400 hover:bg-neutral-800" : "border-black/5 bg-slate-100 text-blue-600 hover:bg-slate-200"
              }`}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className={`h-8 w-px ${dark ? "bg-white/10" : "bg-black/10"}`} />

            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={goDashboard}
                  className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 px-2"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className={`p-2.5 rounded-xl transition-all ${
                    dark ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-5 py-2.5 text-sm font-bold transition-colors ${
                    dark ? "text-gray-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-500 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;