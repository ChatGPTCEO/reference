import store from '@/store/index'
export default {
	baseUrl() {
		return 'https://demo.chunfengbuy.com/api' //这里是我们的域名API接口
	},
	common() {
		return {
			//baseUrl: '/api',
			header: {
				// 把缓存里面的token加到请求头里面
				// api_token_cbadbb1cd7cb11eb89998b5480a0e2cb
				token: uni.getStorageSync('token'),
				'content-type': 'application/json;charset=UTF-8'
			},
			data: {},
			method: 'GET',
			dataType: 'json'
		}
	},
	//请求 返回promise
	request(options = {}) {
		//参数
		const common = this.common();
		options.url = this.baseUrl() + options.url
		options.header = options.header || common.header
		options.data = options.data || common.data
		options.method = options.method || common.method
		options.dataType = options.dataType || common.dataType
		//请求
		return new Promise((res, rej) => {
			//请求前
			uni.request({
				...options,
				success: (result) => {
					let data = result.data
					// 统一拦截请求，如果返回状态码不等于200，直接return
					if (data.code != 200 && data.code != 44001 && data.code != 45001) {
						console.log(data)
						return uni.showToast({
							title: '错误：' + data.msg,
							icon: 'none'
						})
					}
					res(data)
				},
				// ,
				fail: (error) => {
					uni.showToast({
						title: error.msg || '请求失败',
						icon: 'none'
					})
					return rej()
				}

			})
		})
	},
	// get请求
	get(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	// post请求
	post(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data = {}, options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
}
