import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpCircle, 
  IndianRupee, 
  ShieldAlert, 
  Loader2, 
  ArrowRightCircle, 
  AlertTriangle,
  Info
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const UserWithdraw = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Constants for better UX
  const presets = [500, 1000, 5000, 10000];
  const withdrawalFee = Number(amount) * 0.015; // Simulated 1.5% fee

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = Number(amount);

    if (!value || value <= 0) {
      return toast.error("Please enter a valid amount.");
    }

    try {
      setLoading(true);
      await api.post("/wallet/withdraw", { amount: value });
      toast.success(`Withdrawal of ₹${value} initiated.`, {
        icon: '🏦',
        style: {
          borderRadius: '12px',
          background: dark ? '#171717' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      });
      setAmount("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <ArrowUpCircle size={12} /> Asset Liquidation
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          Withdraw <span className="text-amber-500">Funds</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Request a digital-to-cash conversion or a secure payout to your linked bank account.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* WITHDRAWAL FORM */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-2xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Amount to Withdraw"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  icon={IndianRupee}
                  placeholder="0.00"
                />

                {/* QUICK PRESETS */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p.toString())}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                        amount === p.toString()
                          ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-500/20 scale-95"
                          : dark 
                          ? "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                          : "bg-slate-50 border-black/5 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      ₹{p.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* FEE BREAKDOWN */}
              {amount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`p-4 rounded-2xl border ${dark ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-black/5'}`}
                >
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="opacity-40 uppercase tracking-widest">Network Fee (1.5%)</span>
                    <span className="text-rose-500">₹{withdrawalFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black border-t border-inherit pt-2">
                    <span className="opacity-40 uppercase tracking-widest text-[10px]">Total Deduction</span>
                    <span className={dark ? "text-white" : "text-slate-900"}>
                      ₹{(Number(amount) + withdrawalFee).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={loading} 
                className={`w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg ${
                  dark ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'
                } shadow-amber-500/20`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Relaying Request...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    Confirm Withdrawal <ArrowRightCircle size={20} />
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* SIDEBAR: PROTOCOL & INFO */}
        <div className="lg:col-span-2 space-y-4">
          <Card className={`border-none ${dark ? 'bg-amber-500/5' : 'bg-amber-50'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-4 flex items-center gap-2">
              <ShieldAlert size={14} /> Security Protocol
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
                <p className="text-xs leading-relaxed opacity-70">
                  Withdrawal requests are processed within <strong>2-4 business hours</strong>.
                </p>
              </li>
              <li className="flex gap-3">
                <Info size={16} className="text-amber-600 flex-shrink-0" />
                <p className="text-xs leading-relaxed opacity-70">
                  Verify your bank details or agent location before confirming.
                </p>
              </li>
            </ul>
          </Card>

          <Card className={`border-dashed border-2 ${dark ? 'border-white/10' : 'border-black/5'} opacity-60 text-center py-8`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Max Daily Withdrawal</p>
            <p className="text-xl font-black">₹50,000.00</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserWithdraw;