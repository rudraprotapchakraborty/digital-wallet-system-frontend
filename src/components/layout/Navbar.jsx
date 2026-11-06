import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Brand from "./Brand";
import Avatar from "../common/Avatar";

const links = [["/", "Overview"], ["/features", "Features"], ["/pricing", "Pricing"], ["/faq", "FAQ"]];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuAt, setMenuAt] = useState(null);
  const headerRef = useRef(null);
  // The menu closes on navigation because it remembers the page it was opened on
  const open = menuAt === pathname;
  const inDashboard = /^\/(user|agent|admin)(\/|$)/.test(pathname);
  const home = user ? "/" + user.role : "/register";
  const homeLabel = user ? (user.role === "admin" ? "Dashboard" : "My wallet") : "Get started";

  // Escape or a tap outside the header closes the mobile menu
  useEffect(() => {
    if (!open) return;
    const close = () => setMenuAt(null);
    const onKey = event => event.key === "Escape" && close();
    const onPointer = event => headerRef.current && !headerRef.current.contains(event.target) && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [open]);

  return <header ref={headerRef} className={inDashboard ? "site-header" : "site-header sticky-header"}><div className="frame header-inner">
    <Brand />
    <nav id="site-nav" className={open ? "site-nav open" : "site-nav"} aria-label="Main navigation">
      {links.map(([path, label]) =>
        <NavLink key={path} to={path} end onClick={() => setMenuAt(null)}>{label}</NavLink>)}
      {/* Phone menu: the actions that sit in the header on larger screens */}
      <div className="mobile-cta">
        {user ? <>
          <Link className="pill" to={home} onClick={() => setMenuAt(null)}>{homeLabel} <ArrowUpRight size={15}/></Link>
          <button type="button" className="ghost-btn" onClick={() => { setMenuAt(null); logout(); }}><LogOut size={15}/> Log out</button>
        </> : <>
          <Link className="ghost-btn" to="/login" onClick={() => setMenuAt(null)}>Log in</Link>
          <Link className="pill" to="/register" onClick={() => setMenuAt(null)}>Get started</Link>
        </>}
      </div>
    </nav>
    <div className="header-actions">
      <button className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}>{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
      {user && <Link to={`/${user.role}/profile`} aria-label="Account settings" title="Account settings"><Avatar user={user} size={32}/></Link>}
      {!user && <Link className="login-link" to="/login">Log in</Link>}
      <Link className="pill compact" to={home}>{homeLabel} <ArrowUpRight size={15}/></Link>
      <button className="icon-btn menu-toggle" aria-expanded={open} aria-controls="site-nav" aria-label="Toggle menu" onClick={() => setMenuAt(open ? null : pathname)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </div></header>;
}
