const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_REMOTES === 'local' ?
   // DEVELOPMENT
    'http://localhost:9998/' :
    // PRODUCTION
    '',
  devServer: { port: 9998 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      uniqueName: 'mfetwo',
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeTwo',
        filename: 'remoteEntry.js',
        remotes: process.env.VUE_APP_REMOTES === 'local' ?
          // DEVELOPMENT
          {
            Shell: 'Shell@http://localhost:8080/remoteEntry.js',
            MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js'
          } :
          // PRODUCTION
          {
            Shell: 'Shell@http://localhost:8080/remoteEntry.js',
            MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js'
          },
        exposes: {
          './MfeTwo': './src/bootstrap.ts',
        },
        shared: {
          ...require('./package.json').dependencies,
          vue: {
            singleton: true,
          }
        },
      })
    ]
  }
})