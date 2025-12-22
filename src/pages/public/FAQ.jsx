import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  MessageCircle, 
  ArrowRight,
  PlusCircle,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const FAQItem = ({ question, answer, isOpen, onClick, dark }) => {
  return (
    <div 
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen 
          ? (dark ? "border-blue-500/50 bg-blue-500/5 shadow-2xl shadow-blue-500/10" : "border-blue-500/30 bg-blue-50/50 shadow-lg shadow-blue-500/5")
          : (dark ? "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]" : "border-black/5 bg-white hover:border-black/10")
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className={`text-lg font-bold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 ml-4 ${dark ? "text-gray-500" : "text-gray-400"}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={`px-6 pb-6 text-base leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>
              <div className={`h-px w-full mb-6 ${dark ? "bg-white/5" : "bg-black/5"}`} />
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I add money to my wallet?",
      answer: "After logging in, navigate to the 'Deposit' section on your dashboard. You can choose to simulate a direct bank deposit for testing or locate an approved partner agent to perform a secure cash-in on your behalf. Funds reflect instantly once the agent confirms.",
      category: "Wallet"
    },
    {
      question: "Can I use Digital Wallet without a bank account?",
      answer: "Absolutely. Our platform is built for financial inclusion. You can operate entirely with cash through our global network of approved agents. They act as your physical bridge to the digital economy, handling cash-in and cash-out operations with zero bank requirements.",
      category: "Security"
    },
    {
      question: "How are agents approved?",
      answer: "Trust is our core currency. Admins perform a multi-step review of each agent profile, including verification of business credentials and location. Once approved, agents gain access to a specialized terminal with real-time audit logs and transparent fee tracking.",
      category: "Agents"
    }
  ];

  return (
    <section className={`min-h-screen pt-32 pb-24 transition-colors duration-500 overflow-hidden ${
      dark ? "bg-neutral-950" : "bg-slate-50"
    }`}>
      {/* Visual Background Flourish */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <HelpCircle size={14} /> Knowledge Base
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-5xl font-black tracking-tight md:text-6xl ${dark ? "text-white" : "text-slate-900"}`}
          >
            Common <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mt-6 text-xl ${dark ? "text-gray-400" : "text-gray-600"}`}
          >
            Everything you need to know about the platform. Can't find an answer? 
            Reach out to our 24/7 support team.
          </motion.p>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", "Wallet", "Security", "Agents", "Technical"].map((cat) => (
            <button 
              key={cat}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 ${
                cat === "All" 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" 
                : (dark ? "bg-white/5 text-gray-400 border border-white/10" : "bg-white text-gray-500 border border-black/5 shadow-sm")
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              dark={dark}
            />
          ))}
        </div>

        {/* CTA Support Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-20 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 border ${
            dark ? "bg-white/[0.02] border-white/5" : "bg-white border-black/5 shadow-xl shadow-black/[0.02]"
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <MessageCircle size={28} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>Still have questions?</h3>
              <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>We're here to help you 24 hours a day, 7 days a week.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all active:scale-95 group">
            Contact Support <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;