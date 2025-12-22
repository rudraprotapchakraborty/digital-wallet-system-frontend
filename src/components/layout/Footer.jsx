import React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ShieldCheck, 
  Globe, 
  ArrowRight 
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const footerLinks = {
    Product: [
      { name: "Features", path: "/features" },
      { name: "Agent Network", path: "/agents" },
      { name: "Pricing", path: "/pricing" },
      { name: "Security", path: "/security" },
    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "FAQ", path: "/faq" },
      { name: "Careers", path: "/careers" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
    ],
  };

  return (
    <footer
      className={`relative border-t overflow-hidden transition-colors duration-500 ${
        isDark
          ? "border-white/5 bg-neutral-950 text-gray-400"
          : "border-black/5 bg-slate-50 text-gray-600"
      }`}
    >
      {/* Decorative Gradient Flare */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">W</div>
              <span className={`text-xl font-bold tracking-tighter ${isDark ? "text-white" : "text-slate-900"}`}>
                Wallet<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed mb-8">
              The next generation of digital finance. Secure, lightning-fast, 
              and designed for the way you live today.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-2 rounded-lg border transition-all hover:scale-110 ${
                    isDark 
                      ? "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20" 
                      : "border-black/5 bg-white text-gray-500 hover:text-blue-600 hover:shadow-md"
                  }`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* DYNAMIC LINKS COLUMNS */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-sm transition-colors hover:text-blue-500"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="lg:col-span-3">
            <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
              Stay Updated
            </h3>
            <p className="text-sm mb-4">Get the latest feature updates and fintech news.</p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="email@example.com"
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border ${
                  isDark 
                    ? "bg-white/5 border-white/10 focus:border-blue-500 text-white" 
                    : "bg-white border-black/10 focus:border-blue-500 text-slate-900"
                }`}
              />
              <button className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-blue-600 text-white transition-transform active:scale-90">
                <ArrowRight size={18} />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-3 text-[11px] font-medium opacity-60 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-blue-500" />
              Fully Encrypted
              <span className="opacity-20">|</span>
              <Globe size={14} className="text-blue-500" />
              Global Reach
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className={`mt-20 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium ${
          isDark ? "border-white/5 text-gray-500" : "border-black/5 text-gray-400"
        }`}>
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Digital Wallet System</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-current opacity-30" />
            <span className="hover:text-blue-500 cursor-pointer transition-colors">System Status</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full bg-emerald-500 animate-pulse`} />
            All systems operational
          </div>

          <div className="flex items-center gap-1 group cursor-default">
            Built for 
            <span className="text-blue-500 font-bold group-hover:animate-bounce">Financial Freedom</span>
            ✨
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;