import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  define: {
    "import.meta.env.GOOGLE_CLIENT_ID": JSON.stringify(loadEnv(mode, process.cwd(), "GOOGLE_CLIENT_ID").GOOGLE_CLIENT_ID || ""),
  },
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: { "/api": "http://127.0.0.1:5000" },
  },
}));
