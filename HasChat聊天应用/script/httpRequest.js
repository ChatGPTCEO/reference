module.exports = {
	//确认服务器后拼接url地址
	/**
	 * post请求
	 * @param {Object} url [地址]
	 * @param {Object} data [参数]
	 * @param {Object} header [请求头]
	 */
	post: function(url, data, header,isLoad) {
		header = header || "application/x-www-form-urlencoded";
		isLoad = isLoad==false?isLoad:true;
		if(isLoad){
			uni.showLoading({title:"",mask:true});
		}
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header
				},
				success: function(result) {
					if(isLoad)
						uni.hideLoading();
					succ.call(self, result.data)
				},
				fail: function(e) {
					if(isLoad)
						uni.hideLoading();
					error.call(self, e)
				}
			})
		})
	},
	/**
	 * post请求
	 * @param {Object} url [地址]
	 * @param {Object} data [参数]
	 * @param {Object} header [请求头]
	 */
	get: function(url, data, header) {
		header = header || "application/x-www-form-urlencoded";
		uni.showLoading({title:"",mask:true});
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header
				},
				success: function(result) {
					uni.hideLoading();
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.hideLoading();
					error.call(self, e)
				}
			})
		})
	}
}