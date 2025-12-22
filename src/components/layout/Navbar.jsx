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

  const dark = theme === "dark";

  const isDashboard = ["/user", "/agent", "/admin"].some((p) =>
    location.pathname.startsWith(p)
  );
  if (isDashboard) return null;

  const goDashboard = () => {
    if (!user) return navigate("/login");
    navigate(`/${user.role}`);
  };

  /* ================= MOBILE NAVBAR ================= */
  return (
    <>
      {/* MOBILE TOP BAR */}
      <header
        className={`md:hidden fixed top-0 inset-x-0 z-50 border-b ${
          dark
            ? "bg-neutral-950 border-neutral-800 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/"
            className={`text-lg font-extrabold ${
              dark ? "text-white" : "text-black"
            }`}
          >
            Digital<span className="text-blue-500">Wallet</span>
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`rounded-md p-2 ${
              dark
                ? "text-gray-200 hover:bg-neutral-800"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            ☰
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className={`md:hidden fixed inset-0 z-40 pt-14 ${
            dark ? "bg-neutral-950 text-gray-200" : "bg-white text-gray-800"
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 py-6 text-sm font-medium">
            {["features", "pricing", "about", "faq", "contact"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-3 transition ${
                  dark
                    ? "hover:bg-neutral-800"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            ))}

            <div className="my-4 h-px bg-neutral-800/40" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-between rounded-lg px-3 py-3 ${
                dark ? "bg-neutral-900" : "bg-gray-100"
              }`}
            >
              Theme
              <span>{dark ? "☀️ Light" : "🌙 Dark"}</span>
            </button>

            {user ? (
              <>
                <button
                  onClick={() => {
                    goDashboard();
                    setMenuOpen(false);
                  }}
                  className="rounded-lg bg-blue-600 px-3 py-3 text-white"
                >
                  Dashboard
                </button>
                <button
                  onClick={logout}
                  className={`rounded-lg px-3 py-3 ${
                    dark
                      ? "bg-neutral-800 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-3 ${
                    dark ? "bg-neutral-800" : "bg-gray-200"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-blue-600 px-3 py-3 text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}

      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="hidden md:block fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2">
        <div
          className={`group relative rounded-2xl border px-6 py-3 backdrop-blur-xl transition-all duration-300 ${
            dark
              ? "border-white/10 bg-neutral-950/95 shadow-[0_0_40px_rgba(0,0,0,0.9)]"
              : "border-black/10 bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`text-xl font-extrabold ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Digital<span className="text-blue-500">Wallet</span>
            </Link>

            <nav className="flex items-center gap-8">
              {["features", "pricing", "about", "faq", "contact"].map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  className={`text-sm font-medium transition ${
                    dark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
<button
  onClick={toggleTheme}
  className={`relative flex h-9 w-16 items-center rounded-full p-1 transition ${
    dark ? "bg-neutral-800" : "bg-gray-200"
  }`}
>
  <span
    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm transition-all duration-300 ${
      dark
        ? "translate-x-7 bg-black text-yellow-400"
        : "translate-x-0 bg-white text-slate-700"
    }`}
  >
    {dark ? "☀️" : "🌙"}
  </span>
</button>


              {user ? (
                <>
                  <button
                    onClick={goDashboard}
                    className="text-sm font-medium text-blue-500"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={logout}
                    className={`rounded-lg px-4 py-1.5 text-sm ${
                      dark
                        ? "bg-neutral-800 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium ${
                      dark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-black"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
