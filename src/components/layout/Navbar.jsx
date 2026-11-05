import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Brand from "./Brand";
import Avatar from "../common/Avatar";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuAt, setMenuAt] = useState(null);
  const open = menuAt === pathname;
  return <header className="site-header"><div className="frame header-inner">
    <Brand />
    <nav id="site-nav" className={open ? "site-nav open" : "site-nav"} aria-label="Main navigation">
      {[["/", "Overview"], ["/features", "Features"], ["/pricing", "Pricing"], ["/faq", "FAQ"]].map(([path, label]) =>
        <NavLink key={path} to={path} end onClick={() => setMenuAt(null)}>{label}</NavLink>)}
    </nav>
    <div className="header-actions">
      <button className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}>{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
      {user && <Link to={`/${user.role}/profile`} aria-label="Account settings" title="Account settings"><Avatar user={user} size={32}/></Link>}
      {!user && <Link className="login-link" to="/login">Log in</Link>}
      <Link className="pill compact" to={user ? "/" + user.role : "/register"}>{user ? "My wallet" : "Get started"} <ArrowUpRight size={15}/></Link>
      <button className="icon-btn menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label="Toggle menu" onClick={() => setMenuAt(open ? null : pathname)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>;
}
