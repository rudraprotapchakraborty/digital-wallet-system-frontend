import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  User, 
  IndianRupee, 
  ShieldCheck, 
  Loader2, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2 
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const UserSendMoney = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({
    receiver: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = Number(form.amount);

    if (!form.receiver) return toast.error("Please identify the recipient.");
    if (!value || value <= 0) return toast.error("Enter a valid amount.");

    try {
      setLoading(true);

      await api.post("/wallet/send", {
        receiver: form.receiver,
        amount: value,
      });

      toast.success(`₹${value} sent to ${form.receiver}`, {
        icon: '🚀',
        style: {
          borderRadius: '12px',
          background: dark ? '#171717' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      });
      setForm({ receiver: "", amount: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Transfer failed");
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
          <Send size={12} /> P2P Transfer
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          Send <span className="text-blue-500">Money</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Transfer funds instantly to any verified wallet user in the network.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* TRANSFER FORM */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <Input
                  label="Recipient Identifier"
                  name="receiver"
                  value={form.receiver}
                  onChange={handleChange}
                  placeholder="Phone or email address"
                  icon={User}
                />

                <Input
                  label="Amount to Transfer"
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  icon={IndianRupee}
                />
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} /> Relaying Funds...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Send Money <ArrowRight size={20} />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* SIDEBAR: TRANSFER SAFETY */}
        <div className="lg:col-span-2 space-y-4">
          <Card className={`border-none ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2">
              <ShieldCheck size={14} /> Transfer Protocol
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={10} className="text-blue-500" />
                </div>
                <p className="text-xs leading-relaxed opacity-70">
                  Verify the recipient's phone or email carefully. Transfers are <strong>irreversible</strong>.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 h-4 w-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={10} className="text-blue-500" />
                </div>
                <p className="text-xs leading-relaxed opacity-70">
                  Zero transaction fees on P2P transfers between users.
                </p>
              </li>
            </ul>
          </Card>

          <Card className={`border-dashed border-2 ${dark ? 'border-white/10' : 'border-black/5'} opacity-60`}>
            <div className="flex items-center gap-3">
              <AlertCircle className="text-amber-500" size={18} />
              <div>
                <p className="text-xs font-bold tracking-tight">Daily Limit Remaining</p>
                <p className="text-[10px] uppercase tracking-widest mt-0.5">₹25,000.00 / ₹25,000.00</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserSendMoney;