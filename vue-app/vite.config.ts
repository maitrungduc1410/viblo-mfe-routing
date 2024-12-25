import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
  },
  preview: {
    port: 3003,
  },
  base: "./",
  plugins: [
    vue(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        VueAppLoader: "./src/loader.ts",
      },
      shared: {
        vue: {
          singleton: true,
        }
      },
    }),
  ],
});
