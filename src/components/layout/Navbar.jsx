import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = ["/user", "/agent", "/admin"].some((p) =>
    location.pathname.startsWith(p)
  );
  if (isDashboard) return null;

  const handleDashboardClick = () => {
    if (!user) return navigate("/login");
    if (user.role === "admin") return navigate("/admin");
    if (user.role === "agent") return navigate("/agent");
    return navigate("/user");
  };

  return (
    <header className="navbar sticky" data-tour-id="nav-menu">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          digital<span>wallet</span>
        </Link>
        <nav className="nav-links">
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            data-tour-id="theme-toggle"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <>
              <Button variant="ghost" onClick={handleDashboardClick}>
                Dashboard
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
