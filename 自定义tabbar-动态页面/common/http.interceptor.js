const  noTokenApis=["accountapi/passport/ssoLogin","accountapi/passport/passwdlogin"];

const  checkApi =function(url){
let flag=true;
for (var i = 0; i < noTokenApis.length; i++) {
	 let whiteApi= noTokenApis[i];
	 if(url.indexOf(whiteApi)!==-1){
		// console.log("当前请求不需要带token",url); 
		flag=false;
		break;
	 }
}
return flag;
}

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
const  install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		//method: 'POST',
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		 originalData: true, 
		// 设置自定义头部content-type
		header: {
			//'content-type': 'application/json;charset=UTF-8'
		}
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		let flag= checkApi(config.url);
		if(flag){
			//console.log("token",vm.vuex_token)
			config.header.Authorization = vm.vuex_token;
		}
		if(config.header.type=='form'){
			//console.log("提交表单")
			config.header['content-type']='application/x-www-form-urlencoded;charset=UTF-8';
		}else{
			//console.log("提交json")
			config.header['content-type']='application/json;charset=UTF-8';
		}
		//console.log("config",config);
		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
		// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
		//console.log("响应体response",res);
		let responseCode=res.statusCode;
		if(responseCode == 200) {
			return res.data;
		}
		else if(responseCode==401){
			vm.$u.toast('身份验证失败，请重新登录');
			setTimeout(() => {
				console.log("===============此处应该跳转登录===========");
			}, 1500)
			return false;
		} 
		else{
			 console.log("响应失败response:",res);
			 return false;
		} 
	}
}

export default {
	install
}