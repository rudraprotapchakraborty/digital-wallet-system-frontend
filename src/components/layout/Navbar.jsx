import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isDashboard = ["/user", "/agent", "/admin"].some((p) =>
    location.pathname.startsWith(p)
  );
  if (isDashboard) return null;

  const goDashboard = () => {
    if (!user) return navigate("/login");
    navigate(`/${user.role}`);
  };

  const dark = theme === "dark";

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2">
      <div
        className={`relative rounded-2xl border px-6 py-3 backdrop-blur-xl transition-all duration-300
          ${
            dark
              ? "border-white/10 bg-neutral-950/80 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
              : "border-black/10 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          }`}
      >
        {/* Glow */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
            group-hover:opacity-100 ${
              dark
                ? "shadow-[0_0_60px_rgba(59,130,246,0.15)]"
                : "shadow-[0_0_60px_rgba(59,130,246,0.25)]"
            }`}
        />

        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-black dark:text-white"
          >
            Digital<span className="text-blue-500">Wallet</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {["features", "pricing", "about", "faq", "contact"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className={`relative text-sm font-medium transition
                  ${
                    dark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }
                `}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}

                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative flex h-9 w-16 items-center rounded-full p-1 transition
                ${
                  dark
                    ? "bg-neutral-800"
                    : "bg-gray-200"
                }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm transition-all duration-300
                  ${
                    dark
                      ? "translate-x-7 bg-black text-white"
                      : "translate-x-0 bg-white text-black"
                  }`}
              >
                {dark ? "☀️" : "🌙"}
              </span>
            </button>

            {user ? (
              <>
                <button
                  onClick={goDashboard}
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className={`rounded-lg px-4 py-1.5 text-sm transition
                    ${
                      dark
                        ? "bg-neutral-800 text-gray-200 hover:bg-neutral-700"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium transition ${
                    dark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden rounded-lg p-2 transition ${
                dark
                  ? "hover:bg-neutral-800 text-gray-200"
                  : "hover:bg-gray-200 text-gray-800"
              }`}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className={`mt-4 rounded-xl p-4 transition
              ${
                dark
                  ? "bg-neutral-900 text-gray-200"
                  : "bg-gray-50 text-gray-800"
              }`}
          >
            {["features", "pricing", "about", "faq", "contact"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-blue-500/10 transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
