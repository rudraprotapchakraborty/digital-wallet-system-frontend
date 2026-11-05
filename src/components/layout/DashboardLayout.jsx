import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import DashboardTour from "../common/DashboardTour";

const links = {
  user: [["", "Overview"], ["send", "Send money"], ["deposit", "Add money"], ["withdraw", "Withdraw"], ["cash-out", "Cash out"], ["transactions", "History"], ["profile", "Profile"]],
  agent: [["", "Overview"], ["cash-in", "Cash in"], ["cash-out", "Incoming cash-outs"], ["transactions", "History"], ["profile", "Profile"]],
  admin: [["", "Overview"], ["users", "Members"], ["agents", "Agents"], ["transactions", "History"], ["profile", "Profile"], ["settings", "Settings"]],
};

export default function DashboardLayout({ role }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <div className="workspace"><div className="frame workspace-inner">
    <header className="workspace-bar"><strong>{user.name || "My account"} · {role === "user" ? "Personal wallet" : role + " dashboard"}</strong>
      <div><DashboardTour/><button type="button" className="text-action" onClick={logout}><LogOut size={16}/> Log out</button></div>
    </header>
    <nav data-tour-id="nav-menu" className="workspace-nav" aria-label="Dashboard navigation">{links[role].map(([slug, label]) => <NavLink end key={slug} to={`/${role}${slug ? "/" + slug : ""}`}>{label}</NavLink>)}</nav>
    <Outlet/>
  </div></div>;
}
