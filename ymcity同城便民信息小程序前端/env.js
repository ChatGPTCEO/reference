const ENV_BASE_URL = {
	development: 'https://demo.ybym.top/', //开发环境
	production: 'https://demo.ybym.top/', //生产环境
}
export const API_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development'];
export const APP_NAME = 'ymCity'; //应用名
export const APP_MOBILE = '15378271942'; //客服电话