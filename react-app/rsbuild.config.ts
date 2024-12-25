import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3002,
  },
  dev: {
    assetPrefix: true,
  },
  tools: {
    rspack: {
      output: {
        uniqueName: "react_mfe_app", // cái này phải unique cho mỗi mfe nhé
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "react_mfe_app",
          exposes: {
            ReactAppLoader: "./src/loader.ts",
          },
          shared: {
            react: {
              singleton: true,
            },
            "react-dom/client": {
              singleton: true,
            },
          },
          filename: "remoteEntry.js",
        }),
      ],
    },
  },
});