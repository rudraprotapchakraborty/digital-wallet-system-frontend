import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Zap, 
  Shield, 
  ArrowRight, 
  HelpCircle, 
  Gem,
  Store,
  User
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Pricing = () => {
  const { theme } = useTheme();
  const [isAnnual, setIsAnnual] = useState(true);
  const dark = theme === "dark";

  const plans = [
    {
      name: "Standard User",
      icon: <User className="text-blue-500" />,
      price: "Free",
      description: "Perfect for individuals and everyday peer-to-peer transfers.",
      features: [
        "Instant Wallet Setup",
        "0.25% Transaction Fee",
        "P2P Transfers",
        "QR Code Payments",
        "Standard Support"
      ],
      cta: "Open wallet",
      variant: "primary",
      popular: false
    },
    {
      name: "Partner Agent",
      icon: <Store className="text-purple-500" />,
      price: "Inquire",
      description: "Earn commission by facilitating local cash-in and cash-out.",
      features: [
        "Dedicated Agent Terminal",
        "Earn on Every Transaction",
        "High-Limit Volume",
        "Real-time Settlements",
        "Priority Partner Support"
      ],
      cta: "Apply as agent",
      variant: "outline",
      popular: true
    }
  ];

  return (
    <section className={`min-h-screen pt-32 pb-20 overflow-hidden transition-colors duration-500 ${
      dark ? "bg-neutral-950" : "bg-slate-50"
    }`}>
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10">
        <div className={`absolute inset-0 opacity-20 ${dark ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-900' : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-200'}`} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Gem size={14} /> Flexible Plans
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl font-black tracking-tight md:text-6xl ${dark ? "text-white" : "text-slate-900"}`}
          >
            Transparent <br />
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Fintech Pricing</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mt-6 text-xl ${dark ? "text-gray-400" : "text-gray-600"}`}
          >
            No hidden fees. No complex contracts. Choose the account that fits your financial goals.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative h-full"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-xl">
                  Most Lucrative
                </div>
              )}

              <Card className={`h-full flex flex-col p-8 md:p-10 border-2 transition-all duration-300 ${
                plan.popular 
                  ? (dark ? "border-blue-500/30 bg-blue-500/[0.03]" : "border-blue-500/20 bg-white")
                  : (dark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-white")
              }`}>
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dark ? "bg-neutral-900" : "bg-slate-100"}`}>
                    {React.cloneElement(plan.icon, { size: 28 })}
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-black ${dark ? "text-white" : "text-slate-900"}`}>{plan.price}</p>
                    <p className="text-xs font-medium opacity-50 uppercase tracking-widest">Entry Tier</p>
                  </div>
                </div>

                <h2 className={`text-2xl font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm mb-8 leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
                  {plan.description}
                </p>

                <div className="flex-grow space-y-4 mb-10">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className={`text-sm font-medium ${dark ? "text-gray-300" : "text-slate-700"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.variant}
                  className={`w-full h-14 rounded-xl text-lg font-bold group ${
                    plan.popular ? "shadow-lg shadow-blue-500/20" : ""
                  }`}
                  onClick={() => alert(plan.cta)}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security / FAQ micro-section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          {[
            { icon: <Shield size={20} className="text-blue-500" />, title: "SSL Secure Payments", text: "256-bit encryption standard" },
            { icon: <Zap size={20} className="text-amber-500" />, title: "Instant Activation", text: "Verified in under 24 hours" },
            { icon: <HelpCircle size={20} className="text-purple-500" />, title: "24/7 Support", text: "Access help anytime" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center ${dark ? "bg-white/5" : "bg-white shadow-sm"}`}>
                {item.icon}
              </div>
              <h4 className={`font-bold mb-1 ${dark ? "text-white" : "text-slate-900"}`}>{item.title}</h4>
              <p className="text-xs opacity-60 font-medium">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;