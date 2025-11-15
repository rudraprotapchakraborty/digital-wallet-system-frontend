import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ role }) => {
  const { user } = useAuth();

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
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-brand">digiPay {role}</span>
        <span className="sidebar-user">{user?.name}</span>
      </div>
      <nav className="sidebar-nav">
        {items.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
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
