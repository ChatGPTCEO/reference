import Request from '@/js_sdk/luch-request/luch-request/index.js'
const http = new Request();

import Vue from 'vue'

http.setConfig(function(config){
	config.header.Accept='application/json'
	return config;
})

const request = {
	get(routeName, form, header = {}) {
		// let headers = config['headers']?config['headers']:{};
		// config['headers'] = headers
		// if (isArray(routeName)) {
		// 	return globalRequest('GET', routeName[0], routeName[1], form, header);
		// }
		header.Authorization = 'Bearer '+ uni.getStorageSync('token')
		let url = Vue.prototype.$store.state.app.api_domain+Vue.prototype.$api(routeName, {})
		return http.get(url, {
			params: form, /* 会加在url上 */
			header:header
		}).then(res => {
			console.log('res',res.data)
			if (res.data.msg) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
			}
			if(res.data.errors){
				console.error(res.data)
			}
			
			if(res.data.redirect){
					if(res.data.close){
						if(res.data.page_type=='tab'){
							uni.switchTab({
								url: res.data.redirect
							})
						}else{
							uni.redirectTo({
								url: res.data.redirect
							});
						}
						console.log(1112323)
					}else{
						if(res.data.page_type=='tab'){
							uni.switchTab({
								url: res.data.redirect
							})
						}else{
							
							uni.navigateTo({
								url: res.data.redirect
							});
						}
					}
					
				
				
			}

			return res
		}).catch(err => {
			console.log('error',err)
			switch (err.statusCode) {
				case 401:
					uni.clearStorageSync()
					uni.reLaunch({
						url:'/pages/index/index.vue'
					})
					break
				default:
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
					break
			}
			return err
		})
		return globalRequest('GET', routeName, form, form, header);
	},
	post(routeName, form, header = {}) {
		let url = Vue.prototype.$store.state.app.api_domain+Vue.prototype.$api(routeName, {})
		header.Authorization = 'Bearer '+uni.getStorageSync('token')
		return http.post(url, form,{
			header:header
		}).then(res => {
			
			if (res.data.msg) {
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				})
			}
			if(res.data.errors){
				console.error(res.data)
			}
			
			if(res.data.redirect){
					if(res.data.close){
						if(res.data.page_type=='tab'){
							uni.switchTab({
								url: res.data.redirect
							})
						}else{
							uni.redirectTo({
								url: res.data.redirect
							});
						}
					}else{
						if(res.data.page_type=='tab'){
							uni.switchTab({
								url: res.data.redirect
							})
						}else{
							
							uni.navigateTo({
								url: res.data.redirect
							});
						}
					}
					
				
				
			}
			
			return res;
		}).catch(err => {

		})
		// if (isArray(routeName)) {
		// 	return globalRequest('POST', routeName[0], routeName[1], form, header);
		// }
		// return globalRequest('POST', routeName, {}, form, header);
	},
	upload(routeName, filePath ,form={}, header = {}) {
			let url = Vue.prototype.$store.state.app.api_domain+Vue.prototype.$api(routeName, {})
			header.Authorization = 'Bearer '+uni.getStorageSync('token')
			return http.upload(url,{
				params: form, /* 会加在url上 */
				header:header,
				filePath:filePath,
				name:'file'
			}).then(res => {
				
				if (res.data.msg) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
				if(res.data.errors){
					console.error(res.data)
				}
				
				if(res.data.redirect){
						if(res.data.close){
							if(res.data.page_type=='tab'){
								uni.switchTab({
									url: res.data.redirect
								})
							}else{
								uni.redirectTo({
									url: res.data.redirect
								});
							}
						}else{
							if(res.data.page_type=='tab'){
								uni.switchTab({
									url: res.data.redirect
								})
							}else{
								
								uni.navigateTo({
									url: res.data.redirect
								});
							}
						}
						
					
					
				}
				
				return res;
			}).catch(err => {
	
			})
			// if (isArray(routeName)) {
			// 	return globalRequest('POST', routeName[0], routeName[1], form, header);
			// }
			// return globalRequest('POST', routeName, {}, form, header);
		},
	
};

export default request