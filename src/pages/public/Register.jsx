import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Phone, 
  Lock, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

const Register = () => {
  const { register, loading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Full name is required";
    if (!form.phone) e.phone = "Phone number is required";
    if (!form.password || form.password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register(form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setErrors({ server: "Registration failed. Please try again." });
    }
  };

  return (
    <section className={`min-h-screen flex transition-colors duration-500 ${
      isDark ? "bg-neutral-950" : "bg-slate-50"
    }`}>
      
      {/* LEFT: FORM SIDE */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-md"
        >
          <header className="mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 group lg:hidden">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">W</div>
              <span className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Wallet.</span>
            </Link>
            <h1 className={`text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              Join the ecosystem
            </h1>
            <p className={`mt-3 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Set up your secure wallet in less than 2 minutes.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                <User className={`absolute right-4 top-[38px] size-5 opacity-30 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              {errors.name && <p className="text-xs font-bold text-red-500 ml-1">{errors.name}</p>}
            </div>

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
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <Lock className={`absolute right-4 top-[38px] size-5 opacity-30 ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
              {errors.password && <p className="text-xs font-bold text-red-500 ml-1">{errors.password}</p>}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Select
                  label="Account Type"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="user">Personal Wallet</option>
                  <option value="agent">Business Agent</option>
                </Select>
                <Briefcase className={`absolute right-10 top-[38px] size-5 opacity-30 pointer-events-none ${isDark ? 'text-white' : 'text-black'}`} />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 text-lg font-bold group mt-4 shadow-xl shadow-blue-500/20"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <>Create My Wallet <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></>
              )}
            </Button>
          </form>

          <p className={`mt-8 text-center text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 font-bold hover:underline">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>

      {/* RIGHT: FEATURE HIGHLIGHT SIDE (Desktop) */}
      <div className={`hidden lg:flex flex-1 relative items-center justify-center overflow-hidden ${
        isDark ? "bg-neutral-900" : "bg-blue-600"
      }`}>
        {/* Background Mesh */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.4)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(147,51,234,0.3)_0%,_transparent_50%)]" />
        </div>

        <div className="relative z-10 w-full max-w-lg px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-[10px] font-black uppercase tracking-widest">
              <Zap size={12} className="fill-current" /> Instant Setup
            </div>
            
            <h2 className="text-4xl font-black text-white leading-tight">
              One account for <br /> everything financial.
            </h2>

            <div className="space-y-4">
              {[
                { title: "No Bank Required", text: "Start transacting even without a traditional bank account." },
                { title: "Agent Network", text: "Cash-in and cash-out at thousands of local partner locations." },
                { title: "Zero Setup Fees", text: "It costs nothing to join our global digital wallet network." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <CheckCircle2 className="text-blue-300 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-white text-base">{item.title}</h4>
                    <p className="text-blue-100/70 text-sm mt-1 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 flex items-center gap-4 border-t border-white/10">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-400 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-blue-100">Join 12k+ users transacting today</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;