const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  outputDir: 'server/public',
  transpileDependencies: true,
  configureWebpack: {
    entry: './front-end/src/main.js',
  },
});
