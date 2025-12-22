import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Banknote, 
  Phone, 
  IndianRupee, 
  ShieldAlert, 
  Loader2, 
  ArrowDownCircle, 
  CheckCircle2,
  AlertTriangle 
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const AgentCashOut = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [form, setForm] = useState({ phone: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (isSuccess) setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = Number(form.amount);
    if (!form.phone) return toast.error("User identification required.");
    if (!value || value <= 0) return toast.error("Please enter a valid amount.");

    try {
      setLoading(true);
      await api.post("/agent/cash-out", {
        phone: form.phone,
        amount: value,
      });

      setIsSuccess(true);
      toast.success(`₹${value} withdrawal successful.`, {
        icon: '✅',
        style: { 
          borderRadius: '12px', 
          background: dark ? '#171717' : '#fff', 
          color: dark ? '#fff' : '#000' 
        }
      });
      setForm({ phone: "", amount: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl">
      {/* TERMINAL HEADER */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <Banknote size={12} /> Cash Out Point
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          Withdrawal <span className="text-amber-500">Terminal</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Process physical cash withdrawals for users by debiting their digital wallets.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-6">
        {/* MAIN WITHDRAWAL CARD */}
        <Card className="md:col-span-3 overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                label="User Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                icon={Phone}
              />
              {form.phone.length >= 11 && (
                <div className="absolute right-4 top-10 text-emerald-500">
                  <CheckCircle2 size={18} />
                </div>
              )}
            </div>

            <Input
              label="Withdrawal Amount"
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              icon={IndianRupee}
            />

            <Button 
              type="submit" 
              disabled={loading} 
              className={`w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg ${
                dark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'
              } shadow-amber-500/20`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2 text-white">
                  Confirm Cash Out <ArrowDownCircle size={20} />
                </div>
              )}
            </Button>
          </form>
        </Card>

        {/* SIDEBAR: PROTOCOL & SUCCESS */}
        <div className="md:col-span-2 space-y-4">
          <Card className={`border-none ${dark ? 'bg-amber-500/5' : 'bg-amber-50'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-3 flex items-center gap-2">
              <ShieldAlert size={14} /> Critical Protocol
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-2 text-xs leading-relaxed opacity-80">
                <AlertTriangle size={14} className="flex-shrink-0 text-amber-600" />
                <span>Verify user's identity before handing over physical cash.</span>
              </li>
              <li className="flex gap-2 text-xs leading-relaxed opacity-80">
                <AlertTriangle size={14} className="flex-shrink-0 text-amber-600" />
                <span>Wait for the "Withdrawal Successful" screen before payment.</span>
              </li>
            </ul>
          </Card>

          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-center gap-3 text-emerald-500">
                    <CheckCircle2 size={20} />
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest block">Ledger Updated</span>
                      <span className="text-[10px] opacity-70">Payment cleared for user</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AgentCashOut;