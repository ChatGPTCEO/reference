// pages/index/dituzhaofang
// pages/zixunshi/zixunshi
// components/comscrollView
var host = "http://member.ilabe.com/";
var api = host + "api/"
var login_page = 'user/login'

function updateMember(call) {
	let token = uni.getStorageSync('token')
	if (!token) {
		console.log('token不存在，无法更新')
		return
	}
	uni.request({
		url: api + "member/view",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': token
		},
		dataType: 'json',
		success(res) {
			if (res.data.status == 200) {
				// console.log(res.data)
				// uni.setStorageSync('userinfo', res.data.data)
				// uni.setStorageSync('token', res.token)
				console.log('更新用户状态')
				call && call(res.data)
			}
		}

	})
}

function request(params) {
	var url = params.url
	var method = params.method || 'get'
	var has_token = params.has_token
	var data = params.data || {}
	var success = params.success
	console.log(url)
	if ((has_token || data.member_id) && !uni.getStorageSync('userinfo')) {
		uni.redirectTo({
			url: login_page
		})
	}
	if (url) {
		var request = {
			url: api + url,
			method: method,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			dataType: 'json',
			data: data,
			success: (res) => {
				console.log(url,res,'--------------')
				// success(res)
				
				if (res.data.status) {
					if (res.data.status == 200) {
						if (success) {
							success(res.data)
						}
					} else if (res.data.status == 101) {
						console.log('token过期')
						uni.clearStorage()
						uni.showToast({
							title: '登录失效，请重新登录!',
							duration: 1000,
							mask: true,
							icon: 'none'
						})
						setTimeout(function() {
							uni.redirectTo({
								url: login_page
							})
						}, 1001)
					} else if(res.data.status == 207){
						console.log(res)
						uni.showToast({
							title:'请先进行注册',
							icon:'none'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						console.log(url,res,'showToast')
					}
				} else if(res.statusCode == 200){
					success(res)
				}else{
					// console.log(res.data)
				}
			},
			fail: (err) => {
				console.log('请求失败' + url)
				console.log(err)
			}
		}
		// console.log(request)
		if (has_token) {
			request.header['Authorization'] = uni.getStorageSync('token')
		}

		uni.request(request)

		if (has_token) {
			updateMember();
		}
		//else
		// if (request.data.member_id) {
		// 	updateMemberById()
		// }

	}

}

module.exports = {
	host: host,
	api: api,
	request: request,
	updateMember: updateMember
}


/* 
this.api.request({
	url: '',
	method: 'get',
	data: {
	},
	success: (res) => {
	}
}) 
*/
