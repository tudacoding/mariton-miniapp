import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: "/",
  server: {
    port: 3004,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      services: `${path.resolve(__dirname, "./src/modules/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
    },
  },
});
