import { useTheme } from "../../context/ThemeContext";

export default function AdminSettings() {
  const { theme, toggleTheme } = useTheme();
  return <section><h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
    <div className="workspace-panel"><h2 className="text-xl font-semibold">Appearance</h2>
      <p className="my-3">Current theme: {theme}</p><button className="chip" onClick={toggleTheme}>Switch to {theme === "dark" ? "light" : "dark"} theme</button>
    </div></section>;
}
