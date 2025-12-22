import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const MobileSidebar = ({ role, open, onClose }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  if (!open) return null;

  const linksByRole = {
    user: [
      { to: "/user", label: "Overview", end: true },
      { to: "/user/deposit", label: "Deposit" },
      { to: "/user/withdraw", label: "Withdraw" },
      { to: "/user/send", label: "Send Money" },
      { to: "/user/transactions", label: "Transactions" },
      { to: "/user/profile", label: "Profile" },
    ],
    agent: [
      { to: "/agent", label: "Overview", end: true },
      { to: "/agent/cash-in", label: "Cash In" },
      { to: "/agent/cash-out", label: "Cash Out" },
      { to: "/agent/transactions", label: "Activity" },
      { to: "/agent/profile", label: "Profile" },
    ],
    admin: [
      { to: "/admin", label: "Overview", end: true },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/agents", label: "Agents" },
      { to: "/admin/transactions", label: "Transactions" },
      { to: "/admin/settings", label: "Settings" },
    ],
  };

  const items = linksByRole[role] || [];

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* DRAWER */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 transform transition-transform
          ${
            dark
              ? "bg-neutral-900 text-white"
              : "bg-white text-black"
          }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="font-extrabold">
            Digital<span className="text-blue-500">Wallet</span>
          </div>
          <button
            onClick={onClose}
            className="text-xl opacity-70"
          >
            ✕
          </button>
        </div>

        {/* USER */}
        <div className="px-5 py-3 text-sm opacity-80 capitalize">
          {role} · {user?.name}
        </div>

        {/* LINKS */}
        <nav className="px-3 py-4 space-y-1">
          {items.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 text-sm font-medium transition
                ${
                  isActive
                    ? dark
                      ? "bg-blue-500/15 text-white"
                      : "bg-blue-50 text-blue-600"
                    : dark
                    ? "text-gray-300 hover:bg-neutral-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default MobileSidebar;
