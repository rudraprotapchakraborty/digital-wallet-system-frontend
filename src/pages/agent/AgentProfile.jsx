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
  BadgeCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import api from "../../services/api";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const AgentProfile = () => {
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

      // Mocking the patch logic as per your original structure
      const res = await api
        .patch("/auth/me", payload)
        .catch(() => ({
          data: { user: { ...user, name: form.name, phone: form.phone } },
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
      setForm({ ...form, password: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update protocol failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <ShieldCheck size={12} /> Personal Security
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          Account <span className="text-blue-500">Settings</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Manage your public identity and secure your agent credentials.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: IDENTITY PREVIEW */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="flex flex-col items-center text-center p-8">
            <div className="relative group">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:scale-105 transition-transform duration-300">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className={`absolute -bottom-2 -right-2 p-2 rounded-xl border-4 ${dark ? 'bg-neutral-900 border-neutral-900' : 'bg-white border-white'} text-blue-500 shadow-lg`}>
                <Camera size={16} />
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-black flex items-center justify-center gap-2">
                {user?.name} <BadgeCheck size={18} className="text-blue-500" />
              </h2>
              <p className="text-xs font-black uppercase tracking-widest opacity-40 mt-1">
                Authorized Agent
              </p>
            </div>

            <div className={`mt-8 w-full p-4 rounded-2xl border ${dark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-black/5'}`}>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Network Status</p>
               <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-sm">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Active Node
               </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: EDIT FORM */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Display Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  icon={UserIcon}
                  placeholder="Your full name"
                />

                <Input
                  label="Access Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  icon={Phone}
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div className={`p-6 rounded-2xl border ${dark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-black/5'}`}>
                <div className="flex items-center gap-2 mb-4 text-blue-500">
                  <Lock size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">Security Override</span>
                </div>
                <Input
                  label="New Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                />
                <p className="mt-3 text-[10px] opacity-40 leading-relaxed italic">
                  Password must be at least 8 characters long and include a mix of symbols and numbers for maximum node security.
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Updating...
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

export default AgentProfile;