const { ModuleFederationPlugin } = require("webpack").container;

/** @type {import('webpack').Configuration} */
module.exports = {
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    publicPath: "auto",
    uniqueName: "angular_app",
    scriptType: "text/javascript",
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  optimization: {
    runtimeChunk: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "angular_mfe_app",
      filename: "remoteEntry.js",
      exposes: {
        AngularAppLoader: "./src/app/loader.ts",
      },
      shared: {
        "@angular/core": { singleton: true },
        "@angular/common": { singleton: true },
        "@angular/router": { singleton: true },
      },
      // set library to esm  module
      // library: { type: "module" },
    }),
  ],
  devServer: {
    // this is to remove the error "ws://localhost:4200/ws failed" in the console when we disable live reload
    // also this solve websocket proxy issue in local
    webSocketServer: false,
  },
};
