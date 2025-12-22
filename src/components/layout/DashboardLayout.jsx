import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";
import DashboardTour from "../common/DashboardTour";

const DashboardLayout = ({ role }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex ${
        dark ? "bg-neutral-950 text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* SIDEBAR */}
      <Sidebar role={role} />

      {/* MAIN */}
      <div className="flex flex-1 flex-col">
        {/* TOPBAR */}
        <header
          className={`sticky top-0 z-40 flex h-14 items-center justify-between border-b px-6
            ${
              dark
                ? "border-neutral-800 bg-neutral-900"
                : "border-gray-200 bg-white"
            }`}
        >
          {/* LEFT */}
          <div className="font-semibold capitalize">
            {role} dashboard
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`relative flex h-8 w-14 items-center rounded-full p-1 transition
                ${dark ? "bg-neutral-700" : "bg-gray-200"}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-all duration-300
                  ${
                    dark
                      ? "translate-x-6 bg-black text-white"
                      : "translate-x-0 bg-white text-black"
                  }`}
              >
                {dark ? "☀️" : "🌙"}
              </span>
            </button>

            <DashboardTour />

            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
