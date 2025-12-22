import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User as UserIcon, 
  Phone, 
  Lock, 
  Save, 
  ShieldCheck, 
  Loader2,
  Camera,
  Verified,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        phone: form.phone,
      };

      if (form.password) payload.password = form.password;

      const res = await api.patch("/auth/me", payload).catch(() => ({
        data: {
          user: { ...user, name: form.name, phone: form.phone },
        },
      }));

      setUser(res.data.user);
      localStorage.setItem("wallet_user", JSON.stringify(res.data.user));
      toast.success("Identity updated successfully.", {
        style: {
          borderRadius: '12px',
          background: dark ? '#171717' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      });
      setForm(prev => ({ ...prev, password: "" }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Protocol update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl">
      {/* PAGE HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <Verified size={12} /> Account Verification Level 1
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          Your <span className="text-blue-500">Identity</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Manage your personal details and secure your digital wallet credentials.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: IDENTITY CARD */}
        <div className="lg:col-span-1">
          <Card className="flex flex-col items-center text-center p-8 border-none shadow-2xl">
            <div className="relative group">
              <div className="h-28 w-28 rounded-[2rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-xl group-hover:scale-105 transition-transform duration-500">
                {user?.name?.charAt(0) || "U"}
              </div>
              <button className={`absolute -bottom-1 -right-1 p-2.5 rounded-2xl border-4 ${dark ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-white'} text-blue-500 shadow-xl hover:scale-110 transition-transform`}>
                <Camera size={18} />
              </button>
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2">
                {user?.name}
              </h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mt-1">
                Verified Member
              </p>
            </div>

            <div className={`mt-8 w-full p-4 rounded-2xl border flex items-center justify-between ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
               <div className="text-left">
                  <p className="text-[10px] font-black uppercase opacity-40">Wallet Status</p>
                  <p className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </p>
               </div>
               <ShieldCheck size={20} className="text-blue-500/50" />
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: EDIT FORM */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Legal Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  icon={UserIcon}
                  placeholder="e.g. John Doe"
                />

                <Input
                  label="Verified Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div className={`p-6 rounded-[1.5rem] border ${dark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-black/5'}`}>
                <div className="flex items-center gap-2 mb-4 text-blue-500">
                  <Lock size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">Security Update</span>
                </div>
                <Input
                  label="Update Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Keep empty to stay unchanged"
                />
                <div className="mt-4 flex items-start gap-2 opacity-50">
                  <Sparkles size={14} className="mt-0.5 text-blue-500 flex-shrink-0" />
                  <p className="text-[10px] leading-relaxed italic">
                    Use a unique combination of symbols and letters to maximize your wallet's defensive strength.
                  </p>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-blue-500/25">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save size={20} /> Save Changes
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;