const { defineConfig } = require("@vue/cli-service");
const { VuetifyPlugin } = require('webpack-plugin-vuetify');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
    plugins: [new VuetifyPlugin({ styles: { configFile: 'src/scss/settings.scss' } }),]
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
});
