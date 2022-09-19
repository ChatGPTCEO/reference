import baseurl from './http.js' //公共接口地址

const userInfo = uni.getStorageSync('token');    //获取token
const token = userInfo.token  //获取token

// 请求封装
export const request = (obj) =>{
	let url = baseurl + obj.url;  //地址
	let data = obj.data || {};
	let success = obj.success;
	let method = obj.method || 'POST';
	uni.request({
		url: url,
		data:data,
		header:{
			'token':token,
		},
		method: method,
		success: function(res) {
			// 判断token是否过期
			if (res.data.status == 601) {
				uni.showModal({
					title: '提示',
					content: res.data.statusMsg,
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.redirectTo({
								url: '../login/login'
							})
						}
					}
				})
				return
			}
			
				success(res)
				
	
		
		},
		fail: function(res) {},
		complete: function(res) {
			console.log("请求成功")
		},
	})
}
// 上传图片封装
function uploadFile(obj) {
	let url = baseurl + 'file-list/uploadImage';  //服务器地址
	let filePath = obj.filePath;   //要上传文件资源的路径。
	let formData = obj.formData || {'user': 'test'};
	let success = obj.success;
	let name = obj.name || 'filePath';  //文件对应的 key 
	let method = obj.method || 'POST';  //默认post请求
	uni.uploadFile({
		url: url,
		filePath: filePath,
		name: name,
		formData: formData,
		header: {
			'token':token,
		},
		success: function(res) {
			success(res)
		},
		fail: function(res) {
		},
		complete: function(res) {
		},
	})
}
/* export default {
	request: request,
	uploadFile: uploadFile
}; */





