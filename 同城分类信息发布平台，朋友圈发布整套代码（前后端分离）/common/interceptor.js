
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://api.xidicom.cn',
		// baseUrl: 'http://xidiba.cn',
		loadingText: '加载中...', // 请求loading中的文字提示
		originalData: true, // 是否在拦截器中返回服务端的原始数据		
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.token = vm.vuex_token;
		return config;
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {		
		const {statusCode,data} = res
		if (statusCode < 400) {
			return data;
		} else if (statusCode == 401) {
			if(vm.$u.vuex_token){
			vm.$u.vuex('vuex_token', null)
			vm.$u.vuex('vuex_user', {})
			}
			return vm.utils.isLogin()
		} else if (statusCode == 403) {
			return vm.$u.toast(data);
		}else {
			return false;
		}
	}
}

export default {
	install
}
