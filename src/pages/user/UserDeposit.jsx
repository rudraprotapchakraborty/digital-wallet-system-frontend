import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  IndianRupee, 
  ShieldCheck, 
  Loader2, 
  ArrowRightCircle, 
  Sparkles 
} from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const UserDeposit = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const presets = [500, 1000, 2000, 5000];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = Number(amount);
    if (!value || value <= 0) {
      return toast.error("Please enter a valid deposit amount.");
    }

    try {
      setLoading(true);
      await api.post("/wallet/add", { amount: value });
      toast.success(`Simulation successful: ₹${value} added.`, {
        icon: '💎',
        style: {
          borderRadius: '12px',
          background: dark ? '#171717' : '#fff',
          color: dark ? '#fff' : '#000',
        },
      });
      setAmount("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Deposit protocol failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <PlusCircle size={12} /> Asset Management
        </div>
        <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-slate-900"}`}>
          Deposit <span className="text-blue-500">Funds</span>
        </h1>
        <p className={`mt-2 text-lg ${dark ? "text-neutral-400" : "text-slate-500"}`}>
          Top up your wallet balance instantly. Securely simulate liquidity inflow for testing.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* DEPOSIT FORM */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Input
                  label="Amount to Deposit"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  icon={IndianRupee}
                  placeholder="Enter amount"
                />
                
                {/* PRESET AMOUNTS */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p.toString())}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                        amount === p.toString()
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 scale-95"
                          : dark 
                          ? "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                          : "bg-slate-50 border-black/5 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      +₹{p.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Confirm Deposit <ArrowRightCircle size={20} />
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* INFO & TIPS */}
        <div className="lg:col-span-2 space-y-4">
          <Card className={`border-none ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3 flex items-center gap-2">
              <ShieldCheck size={14} /> Security Protocol
            </h4>
            <p className="text-xs leading-relaxed opacity-70">
              This is a simulated environment. In production, you would be redirected to a secure payment gateway (Stripe/Razorpay) or a verified agent cash-in point.
            </p>
          </Card>

          <Card className="border-dashed border-2 opacity-50">
            <div className="flex items-center gap-3">
              <Sparkles className="text-blue-500" size={18} />
              <div>
                <p className="text-xs font-bold italic tracking-tight">Need higher limits?</p>
                <p className="text-[10px] uppercase tracking-widest mt-0.5">Contact support for KYC upgrade</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UserDeposit;