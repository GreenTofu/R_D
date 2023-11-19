import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      {
        find: "api",
        replacement: path.resolve(__dirname, "src/api"),
      },
      {
        find: "assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "modules",
        replacement: path.resolve(__dirname, "src/modules"),
      },
      {
        find: "pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "routes",
        replacement: path.resolve(__dirname, "src/routes"),
      },
      {
        find: "utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
      {
        find: "store",
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: "hooks",
        replacement: path.resolve(__dirname, "src/hooks"),
      },
      {
        find: "mocks",
        replacement: path.resolve(__dirname, "src/mocks"),
      },
    ],
  },
});
