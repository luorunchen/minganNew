// var path = require('path');
module.exports = {

  devServer: {
    proxy: 'http://fire.zhihuiwulian.net.cn'
    // proxy: 'http://psy119.cn'
    // port: 8080, // 端口号配置
    // host: '127.0.0.1',
    // proxy: {
    //   '/api': {
    //     target: 'http://edog-online.com/earlyWarn',// 要跨域的域名
    //     changeOrigin: true, // 是否开启跨域
    //     pathRewrite: {
    //       '^/api': '' // 在请求的时候 凡是/api开头的地址都可以跨域
    //     }
    //   },
    // }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    }
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-vw-loader')
      .loader('style-vw-loader')
      .options({
        viewportWidth: 1920,//传参
      })
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192//列如设计稿尺寸为320
          })
        ],

      }
    }
  },
  lintOnSave: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false

}