const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // listOnSave:false,
  //跨域配置
  devServer: {
    host:'127.0.0.1',
    port: 8081,
    https: false,
    open: true,
    proxy: {
      '/api': {
        //请求的接口
        target: 'http://127.0.0.1:2500',
        // 如果是https加上secure:true
        //允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  //出口地址配置
  publicPath:'./'
})
