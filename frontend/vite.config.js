import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/paintings": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/api/facts": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/api/colors": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/api/quotes": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
