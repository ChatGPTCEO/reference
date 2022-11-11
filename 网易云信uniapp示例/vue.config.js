// import config from './config.js'
const path = require("path");


function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "front-influencer";

// const packageName = 'jianzhike';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  // 路径别名
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve(""),
        "@s": resolve(`static/jianzhike`),
        "@a": resolve("api"),
        "@co": resolve("common"),
        "@cps": resolve("components"),
        "@cp": resolve("pages/component"),
      },
    },
    // plugins: [
    //   new BundleAnalyzerPlugin({ //依赖分析插件
    //     analyzerMode: 'server',
    //     analyzerHost: '127.0.0.1',
    //     analyzerPort: 8889,
    //     reportFilename: 'report.html',
    //     defaultSizes: 'parsed',
    //     openAnalyzer: true,
    //     generateStatsFile: false,
    //     statsFilename: 'stats.json',
    //     statsOptions: null,
    //     logLevel: 'info'
    //   })
    // ]
  }
  // devServer: {
  // 	proxy: {
  // 		'/daihuo': {
  // 			// target: 'http://influencer-dev-server.zhairenwu.com',
  // 			target:'http://influencer-dev-server.zhairenwu.com',
  // 			// target: 'http://influencer-test-server.zhairenwu.com/',
  // 			// target:'http://pre-api.jianke.cc',//模拟
  // 			cookieDomainRewrite: {
  // 				'*': 'localhost'
  // 			},
  // 			changeOrigin: true,
  // 			secure: false,
  // 			pathRewrite: {
  // 				'^/m': ''
  // 			}
  // 		}
  // 	}
  // },
};