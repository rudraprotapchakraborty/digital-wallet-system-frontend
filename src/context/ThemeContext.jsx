import { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("wallet_theme") || "light"
  );

  // Layout effect: the theme is applied before the first paint, so there is no light flash
  useLayoutEffect(() => {
    const body = document.body;

    body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("wallet_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 450);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
