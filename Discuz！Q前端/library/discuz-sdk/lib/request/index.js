/**
 * Request 请求
 */
import axios from 'axios';
import defaultConfig from './defaults';

const Request = axios;

// 设置默认配置
Request.defaults = { ...Request.defaults, ...defaultConfig, validateRules: null };

// 因为 uniapp 插件编译问题注释掉这段代码
// if (process.env.DISCUZ_ENV === 'mini') {
//   // taro项目的小程序
//   const adapter = require('./adapter/taro.js');
//   Request.defaults.adapter = adapter.taroAdapter;
// }
// 需要使用uinapp自己定义的变量。要不然hbuilder插件找不到
if (process.env.UNI_PLATFORM !== 'h5') {
  // 给 uniapp 项目预留的口子，主要是因为要兼容老的项目的使用
  const adapter = require('./adapter/uniapp.js');
  Request.defaults.adapter = adapter.uniAdapter;
}

export { Request };
export default Request;
