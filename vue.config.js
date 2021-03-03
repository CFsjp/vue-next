/**
 * @author chengfeng
 * @version 1.0.0
 */
const argv = process.argv.splice(2)

// 打包体积分析插件
const BundleAnalyzerPlugin = argv.includes('--analyzer')
  ? [new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()]
  : []

const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/ts/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',

  productionSourceMap: false, // 去掉.map文件

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 添加别名
    config.resolve.alias.set('@', resolve('src'))

    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true
        })
      )
    }
  },

  devServer: {
    port: 8080,
    open: true, // 自动打开网页
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
      // '/api': {
      //   target: `http://localhost:3000`,
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    }
  },

  // webpack config
  configureWebpack: {
    plugins: [...BundleAnalyzerPlugin],
    externals: {
      AMap: 'AMap' // 高德地图配置
    }
  }
}
