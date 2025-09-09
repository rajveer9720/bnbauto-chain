import { defineConfig } from "vite";
export default defineConfig({
  define: {
    "process.env": {}, // Fix for "process is not defined"
  },
});
