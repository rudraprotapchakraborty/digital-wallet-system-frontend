import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Fingerprint, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
  const { login, loading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({ phone: "", password: "" });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.phone) e.phone = "Phone number is required";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    if (!validate()) return;

    try {
      const user = await login(form.phone, form.password);
      const redirect = location.state?.from?.pathname || 
        (user.role === "admin" ? "/admin" : user.role === "agent" ? "/agent" : "/user");
      navigate(redirect, { replace: true });
    } catch (err) {
      setAuthError("Invalid credentials. Please try again.");
    }
  };

  return (
    <section className={`min-h-screen flex transition-colors duration-500 ${
      isDark ? "bg-neutral-950" : "bg-slate-50"
    }`}>
      
      {/* LEFT SIDE: AUTH FORM */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-sm"
        >
          {/* Logo/Brand for Mobile */}
          <Link to="/" className="inline-flex items-center gap-2 mb-12 lg:hidden">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">W</div>
            <span className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Wallet.</span>
          </Link>

          <h1 className={`text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Welcome back
          </h1>
          <p className={`mt-3 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Log in to manage your digital assets.
          </p>

          <AnimatePresence>
            {authError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3"
              >
                <AlertCircle size={18} /> {authError}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <Input
                  label="Phone Number"
                  name="phone"
                  placeholder="e.g. 01700000000"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                <Phone className={`absolute right-4 top-[38px] size-5 opacity-30 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              {errors.phone && <p className="text-xs font-bold text-red-500 ml-1">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <Lock className={`absolute right-4 top-[38px] size-5 opacity-30 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              {errors.password && <p className="text-xs font-bold text-red-500 ml-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>Remember me</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-blue-500 font-bold hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-lg font-bold group shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <>Sign In <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></>
              )}
            </Button>
          </form>

          <p className={`mt-8 text-center text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Don't have a wallet?{" "}
            <Link to="/register" className="text-blue-500 font-bold hover:underline">
              Create one for free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: VISUAL PROOF (Desktop Only) */}
      <div className={`hidden lg:flex flex-1 relative items-center justify-center overflow-hidden ${
        isDark ? "bg-neutral-900" : "bg-blue-600"
      }`}>
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-md text-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl">
              <Fingerprint size={64} className="text-blue-200" />
            </div>
            <h2 className="text-3xl font-black mb-6">Enterprise-Grade <br />Security as Standard</h2>
            
            <div className="space-y-4 text-left">
              {[
                { icon: <ShieldCheck size={20} />, text: "End-to-end encrypted transactions" },
                { icon: <ShieldCheck size={20} />, text: "Multi-factor authentication ready" },
                { icon: <ShieldCheck size={20} />, text: "Real-time fraud monitoring" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-blue-300">{item.icon}</span>
                  <span className="text-sm font-medium text-blue-50">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;