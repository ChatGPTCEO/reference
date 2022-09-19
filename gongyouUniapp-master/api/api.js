<<<<<<< HEAD
const baseUrl = "http://127.0.0.1:9001/forum"//本机开发测试地址
//const baseUrl = "http://103.46.128.45:58494/forum"//本机开发测试地址
//const baseUrl = "https://www.buyaoyuan.xyz/forum"//服务器接口地址
=======

const baseUrl = "http://127.0.0.1:9001/forum"// 本机开发测试地址
//const baseUrl = "http://103.46.128.45:58494/forum"// 本机开发测试地址
//const baseUrl = "https://www.buyaoyuan.xyz/forum"// 服务器接口地址
>>>>>>> 909b9fdde7decd24baa2527bcb72026a0e9b7239
//带Token请求 
export const request = (opts) => {
	//此token是登录成功后后台返回保存在storage中的
	const token = uni.getStorageSync('token');    //获取token
	//const token = userInfo.token  //获取token
	
/* 	let token = "";
	uni.getStorage({
		key: 'token',
		success: function(ress) {
			token = ress.data
		}
	}); */
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		method: opts.method,
		data:opts.data,
		header: {
			'Token': token,
			},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
				
				//console.log("res1==="+res[1].statusCode);
				let code = res[1].statusCode;
				console.log("状态码"+code)
				
				if(code == 401){
					uni.showModal({
					    title: '提示',
					    content: '你尚未登录,登录体验更佳哦',
						cancelColor: '#fe5353',
						confirmColor:'#008a00', 
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.reLaunch({
									url: '/pages/login/login'
								})
								return;
					        } else if (res.cancel) {
					            console.log('用户点击取消');
								uni.navigateBack();
								return;
					        }
					    }
					});
					
				/* 	uni.showModal({
						title: '提示',
						content: "授权过期,请重新登录",
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '../login/login'
								})
							}
						}
					}) */
					//return
				}
			}
		).catch(
			(response) => { 
				//console.log("response===="+response.statusCode);
				reject(response)
			}
		)
	})
	return promise
};