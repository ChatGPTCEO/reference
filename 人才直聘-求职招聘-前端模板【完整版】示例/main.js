import Vue from 'vue'
import App from './App'
import store from './store'
import * as Db from './common/db.js'
import $AppEntryController from './AppEntryController.js'
import * as $apis from './apis/index.js'
import $mRouter from './common/router.js'
import $mUtils from './common/utils.js'
import $mConfig from "./config/index.config.js"
import $mAssetsPath from './config/assets.config.js'
import $mRoutesConfig from './config/routes.config.js'
import $mConstDataConfig from './config/constData.config.js'
import $modalHelper from './common/modalHelper.js'
import mPageView from "./components/m-page-view/m-page-view.vue"

Vue.component("yzb-page", mPageView)

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
    // #ifdef H5
    return prePage;
    // #endif
	return prePage.$vm;
}
Vue.prototype.$mPage ={prePage};

Vue.config.productionTip = false;

Vue.prototype.$AppEntryController = $AppEntryController;

Vue.prototype.$store =store;

Vue.prototype.$apis = $apis;

Vue.prototype.$mRouter = $mRouter;

Vue.prototype.$mUtils = $mUtils;

Vue.prototype.$mConfig = $mConfig;

Vue.prototype.$mAssetsPath = $mAssetsPath;

Vue.prototype.$mRoutesConfig = $mRoutesConfig;

Vue.prototype.$mConstDataConfig = $mConstDataConfig;

Vue.prototype.$modalHelper = $modalHelper;

Vue.prototype.$db = Db;

import GoEasy from "./lib/goeasy-2.4.7.min.js";
const goEasy = GoEasy.getInstance({
	host:"hangzhou.goeasy.io",//应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
	appkey:"BC-88a9b720d97c4de88eefd2d64daf3fd0",	// common key,
    modules:["im"],
	// true表示支持通知栏提醒，false则表示不需要通知栏提醒
    allowNotification:true //仅有效于app,小程序和H5将会被自动忽略
});
Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasy = goEasy;

$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) throw ("路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to));

	if (to.route.path === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.redirectTo({
			url: $mUtils.objParseUrlAndParam($mRoutesConfig.main.path, to.query)
		})
		return;
	}

	// 过滤需要权限的页面
	if (to.route.requiresAuth) {

		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
			})
		} else {
			// 登录成功后的重定向地址和参数
			let query = {
				redirectUrl: to.route.path,
				...to.query
			}
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				//#ifdef MP-WEIXIN
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
				// #endif
				//#ifdef H5
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.loginPwd.path, query)
				})
				// #endif
			} else {
				//#ifdef MP-WEIXIN
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.login.path, query)
				})
				// #endif
				//#ifdef H5
				uni.redirectTo({
					url: $mUtils.objParseUrlAndParam($mRoutesConfig.loginPwd.path, query)
				})
				// #endif
			}
		}
	} else {
		uni[navType]({
			url: $mUtils.objParseUrlAndParam(to.route.path, to.query)
		})
	}
})

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()


Vue.prototype.formatDate = function (t) {
    t = t || Date.now();
    let time = new Date(t);
    let str = time.getMonth() < 9 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1);
    str += '-';
    str += time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate();
    str += ' ';
    str += time.getHours();
    str += ':';
    str += time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes();
    return str;
}

// 控制全局日志开关
// console.log = (function (oriLogFunc) {
//   return function () {
//     //判断配置文件是否开启日志调试
//     if (!true) {
//       try{
//         oriLogFunc.call(console, ...arguments);
//       }catch(e){
//         console.error('console.log error', e);
//       }
//     }
//   }
// })(console.log);
