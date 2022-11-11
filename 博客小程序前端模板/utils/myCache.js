function myCache(key, value, seconds) {
	let nowTime = Date.parse(new Date()) / 1000;
	if (key && value) {
		let expire = seconds;
		uni.setStorageSync(key, JSON.stringify(value) + '|' + expire)
		console.log('已经把' + key + '存入缓存,过期时间为' + expire)
	} else if (key && !value) {
		let val = uni.getStorageSync(key);
		if (val) {
			// 缓存存在，判断是否过期
			let temp = val.split('|')
			if (!temp[1] || temp[1] <= nowTime) {
				uni.removeStorageSync(key)
				console.log(key + '缓存已失效')
				return '';
			} else {
				return JSON.parse(temp[0]);
			}
		}
	}

}

// 缓存,默认有效期7天
function cache(key, value, seconds) {
	var timestamp = Date.parse(new Date()) / 1000
	if (key && value === null) {
		//删除缓存
		uni.removeStorageSync(key);
	} else if (key && value) {
		//设置缓存
		if (!seconds) {
			var expire = timestamp + (3600 * 24 * 7)
		} else {
			var expire = timestamp + seconds
		}
		value = value + "|" + expire
		uni.setStorageSync(key, value);
	} else if (key) {
		//获取缓存
		var val = uni.getStorageSync(key);
		var tmp = val.split("|")
		if (!tmp[1] || timestamp >= tmp[1]) {
			uni.removeStorageSync(key)
			return false
		} else {
			return tmp[0]
		}
	} else {
		return ''
	}
}

module.exports = {
	myCache: myCache,
	cache: cache
}
