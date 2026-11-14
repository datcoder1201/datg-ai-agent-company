import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5180,
    proxy: {
      "/api": {
        target: process.env.MSC_HUB_URL ?? "https://office.raumaduongtau.online",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5180,
    proxy: {
      "/api": {
        target: process.env.MSC_HUB_URL ?? "https://office.raumaduongtau.online",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
