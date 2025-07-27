const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all' // 모든 호스트 허용 (disableHostCheck: true와 동일)
  }
})
