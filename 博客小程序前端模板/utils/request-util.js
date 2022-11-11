// 这里引用es6的promise模块
var promise = require("utils/es6-promise.js");
import myCache from '@/utils/myCache.js'
/**
 * @author azhou
 * @params fn 所需调用的方法
 * @return 返回一个promise对象
 * @备注 详情了解es6下的promise模块
 * @参考链接  http://es6.ruanyifeng.com/?spm=a2c4e.11153940.blogcont325262.8.573c367b8BG2hG#docs/promise#%E5%BA%94%E7%94%A8
 */
function myPromise(fn) {
	return function(obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function(res) {
				console.log(res)
				//此处需要在后端统一返回状态码，若为0则请求成功，失败则返回其他错误信息
				//在方法调用时在请求方法后添加catch代码
				if (res.code == 404) {
					console.log("后端接口找不到了！！！")
					return reject();
				}
				if (res.data.data == null) {
					res.data.data = {}
				}
				if (res.data.code > 10000) {
					return reject();
				}
				if (res.data.code != 200) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					return reject();
				}
				return resolve(res.data);
			};
			obj.fail = function(err) {
				//调用失败
				if (err.msg == null || err.msg == '' || err.msg == 'SUCCES') {
					err.msg = '服务器开小差了~'
				}
				uni.redirectTo({
					url: '/packageA/pages/notFound/notFound'
				})
				console.log("requestUtil=====err======");
				console.log(err);
				reject(err);
			};
			fn(obj);
		})
	}
}
/**
 * @author azhou
 * @params fn 所需调用的方法
 * @return 返回一个promise对象
 * @备注 详情了解es6下的promise模块
 * @参考链接  http://es6.ruanyifeng.com/?spm=a2c4e.11153940.blogcont325262.8.573c367b8BG2hG#docs/promise#%E5%BA%94%E7%94%A8
 * 不需要做404处理的正常处理
 */
function myPromiseNormal(fn) {
	return function(obj = {}) {
		return new Promise((resolve, reject) => {
			obj.success = function(res) {
				//此处需要在后端统一返回状态码，若为0则请求成功，失败则返回其他错误信息
				//在方法调用时在请求方法后添加catch代码
				console.log('请求成功', res.data)
				if (res.data.data == null) {
					res.data.data = {}
				}
				return resolve(res.data);
			};
			obj.fail = function(err) {
				//调用失败
				if (err.msg == null || err.msg == '' || err.msg == 'SUCCES') {
					err.msg = '服务器开小差了~'
				}
				console.log("requestUtil=====err======");
				console.log(err);
				reject(err);
			};
			fn(obj);
		})
	}
}

/**
 * 无论promise对象的最后状态如何都会执行
 */
Promise.prototype.finally = function(callback) {
	let p = this.constructor;
	return this.then(
		value => p.resolve(callback()).then(() => value),
		reason => p.resolve(callback()).then(() => {
			throw reason
		})
	)
}

/**
 * 这里封装微信的request下的get请求
 * @author azhou
 * @params url 请求的地址
 * @params data 请求的参数
 * @return promise对象
 */
function myGetRequest(url, data) {
	var myGetRequest = myPromise(uni.request);
	return myGetRequest({
		url: url,
		data: data,
		method: 'GET',
		header: {
			'Content-Type': 'application/json',
			"token": myCache.cache("userToken")
		}
	});
}

function myPostRequestWithJSON(url, data) {
	var myPostRequest = myPromise(uni.request);
	//数据请求 基类 mapi_key
	// data['mapi_key'] = getApp().globalData.mapi_key
	var link = url + '?' + paramsStringWithParams(data)
	console.log('请求地址', link)
	return myPostRequest({
		url: url,
		data: data,
		method: 'POST',
		header: {
			"content-type": "application/json",
			"token": myCache.cache("userToken")
		}
	});
}

function myPostRequest(url, data) {
	var myPostRequest = myPromise(uni.request);
	var link = url + '?' + paramsStringWithParams(data)
	console.log('请求地址', link)
	console.log('参数--------', data)
	return myPostRequest({
		url: url,
		data: data,
		method: 'POST',
		header: {
			"content-type": "application/x-www-form-urlencoded"
		}
	});
}
//不需要404的接口处理
function myPostRequestNormal(url, data) {
	var myPostRequest = myPromiseNormal(uni.request);
	//数据请求 基类 mapi_key
	// data['mapi_key'] = getApp().globalData.mapi_key
	var link = url + '?' + paramsStringWithParams(data)
	console.log('请求地址', link)
	console.log('参数--------', data)
	return myPostRequest({
		url: url,
		data: data,
		method: 'POST',
		header: {
			"content-type": "application/x-www-form-urlencoded"
		}
	});
}

function paramsStringWithParams(params) {
	var paramsString = ''
	for (var key in params) {
		paramsString += '&' + key + '=' + params[key]
	}
	if (paramsString.length != 0) {
		paramsString = paramsString.substring(1, paramsString.length)
	}
	return paramsString
}


async function myGetRequestAsync(url, data) {
	var myGetRequest = myPromise(uni.request);
	var link = url + '?' + paramsStringWithParams(data)
	console.log('请求地址', link)
	var res = await myGetRequest({
		url: url,
		data: data,
		method: 'GET',
		header: {
			'Content-Type': 'application/json',
			"token": myCache.cache("userToken")
		}
	});
	return dealResult(res)
}

async function myPostRequestAsync(url, data) {
	var myPostRequest = myPromise(uni.request);
	//数据请求 基类 mapi_key
	// data['mapi_key'] = getApp().globalData.mapi_key
	var link = url + '?' + paramsStringWithParams(data)
	console.log('请求地址', link)
	console.log('参数--------', data)
	var res = await myPostRequest({
		url: url,
		data: data,
		method: 'POST',
		header: {
			"content-type": "application/json"
		}
	});
	return dealResult(res)
}




async function myPostRequest3W(url, data) {
	var myPostRequest = myPromise(uni.request);
	//数据请求 基类 mapi_key
	var link = url + '?' + paramsStringWithParams(data)
	console.log('请求地址', link)
	console.log('参数--------', data)
	var res = await myPostRequest({
		url: url,
		data: data,
		method: 'POST',
		header: {
			"content-type": "application/x-www-form-urlencoded "
		}
	});
	return dealResult(res)
}

function dealResult(result) {
	if (result != null || result != undefined) {
		if (result.code == 0 || result.code == 200) {
			return result
		} else {
			return null
		}
	} else {
		return null
	}
}

//这里导出js对象
module.exports = {
	myPostRequest: myPostRequest,
	myPostRequestWithJSON: myPostRequestWithJSON,
	myGetRequest: myGetRequest,
	paramsStringWithParams: paramsStringWithParams,
	myPostRequestNormal: myPostRequestNormal,
	myPostRequest3W: myPostRequest3W,
	myPostRequestAsync: myPostRequestAsync,
	myGetRequestAsync: myGetRequestAsync,
}
