import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ role }) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";

  const linksByRole = {
    user: [
      { to: "/user", label: "Overview" },
      { to: "/user/deposit", label: "Deposit" },
      { to: "/user/withdraw", label: "Withdraw" },
      { to: "/user/send", label: "Send Money" },
      { to: "/user/transactions", label: "Transactions" },
      { to: "/user/profile", label: "Profile" },
    ],
    agent: [
      { to: "/agent", label: "Overview" },
      { to: "/agent/cash-in", label: "Cash In" },
      { to: "/agent/cash-out", label: "Cash Out" },
      { to: "/agent/transactions", label: "Activity" },
      { to: "/agent/profile", label: "Profile" },
    ],
    admin: [
      { to: "/admin", label: "Overview" },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/agents", label: "Agents" },
      { to: "/admin/transactions", label: "Transactions" },
      { to: "/admin/settings", label: "Settings" },
    ],
  };

  const items = linksByRole[role] || [];

  return (
    <aside
      className={`hidden md:flex w-64 flex-col border-r
        ${
          dark
            ? "border-neutral-800 bg-neutral-900 text-white"
            : "border-gray-200 bg-white text-black"
        }`}
      data-tour-id="nav-menu"
    >
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-inherit">
        <div className="text-lg font-extrabold tracking-tight">
          Digital<span className="text-blue-500">Wallet</span>
        </div>
        <div className="mt-1 text-sm capitalize opacity-80">
          {role} · {user?.name}
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-4 py-2 text-sm font-medium transition
              ${
                isActive
                  ? dark
                    ? "bg-blue-500/15 text-white"
                    : "bg-blue-50 text-blue-600"
                  : dark
                  ? "text-gray-300 hover:bg-neutral-800 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
