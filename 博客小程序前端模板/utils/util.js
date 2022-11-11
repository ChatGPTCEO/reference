function matchPhoneType() {
	switch (uni.getSystemInfoSync().platform) {
		case 'android':
			console.log('运行Android上')
			return 1;
			break;
		case 'ios':
			console.log('运行iOS上')
			return 2;
			break;
		default:
			console.log('运行在开发者工具上')
			return 1;
			break;
	}
}

//统一获取系统信息
function uniqueGetSystemInfo() {
	var info = getApp().globalData.systemInfo
	if (info == null) {
		var res = uni.getSystemInfoSync() //同步获取
		getApp().globalData.systemInfo = res //App全局临时赋值
		return res
	} else {
		return info
	}
}


function getTopBarHeight(){
	let res = uniqueGetSystemInfo()
	let navbarHeight = (res.navigationBarHeight || res.titleBarHeight || 44)
	return res.statusBarHeight + navbarHeight
}


//校验手机是否合法
function isPhoneNumber(mobile) {
	var reg = /^[1][0-9]{10}$/
	if (mobile.length == 11 && reg.test(mobile)) {
		return true
	} else {
		return false
	}
}

function stringIsEmpty(data) {
	return data == undefined || data == null || data == ''
}
//字符串不为空
function stringNoEmpty(data) {
	let defaultData = arguments[1] || '';
	if (data == null || data == "" || data == "undefined") {
		return defaultData
	} else {
		return data
	}
}
//数字不为空
function numberNoEmpty(data) {
	let defaultData = 0
	if (data == null) {
		return defaultData
	} else {
		return data
	}
}
// 判断一个值是数字
function myIsNaN(value) {
	return typeof value === 'number' && !isNaN(value);
}

// 判断一个值是数字
function isNumbder(value) {
	if (value === "" || value == null) {
		return false;
	}
	if (!isNaN(value)) {
		//对于空数组和只有一个数值成员的数组或全是数字组成的字符串，isNaN返回false，例如：'123'、[]、[2]、['123'],isNaN返回false,
		//所以如果不需要value包含这些特殊情况，则这个判断改写为if(!isNaN(value) && typeof value === 'number' )
		return true;
	} else {
		return false;
	}
}

function showMyToast(content) {
	uni.showToast({
		title: content,
		icon: 'none',
		duration: 1000
	})
}

module.exports = {
	matchPhoneType: matchPhoneType,
	numberNoEmpty: numberNoEmpty,
	isNumbder: isNumbder,
	stringIsEmpty: stringIsEmpty,
	stringNoEmpty: stringNoEmpty,
	numberNoEmpty: numberNoEmpty,
	myIsNaN: myIsNaN,
	showMyToast: showMyToast,
	isPhoneNumber: isPhoneNumber,
	uniqueGetSystemInfo: uniqueGetSystemInfo,
	getTopBarHeight:getTopBarHeight
}
