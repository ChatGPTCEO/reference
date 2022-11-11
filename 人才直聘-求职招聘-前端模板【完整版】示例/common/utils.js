var innerAudioContext = uni.createInnerAudioContext();
export default {
	
	/**
	 * 获取两个经纬度之间的距离
	 * @param lat1 第一点的纬度
	 * @param lng1 第一点的经度
	 * @param lat2 第二点的纬度
	 * @param lng2 第二点的经度
	 * @returns {Number}
	 */
	getDistance(lat11, lng11, lat22, lng22) {
		//格式转换，避免输入的string字符
		var lat1 = parseFloat(lat11);
		var lng1 = parseFloat(lng11);
		var lat2 = parseFloat(lat22);
		var lng2 = parseFloat(lng22);
		//相等的直接返回
		if(lat1==lat2 && lng1==lng2){
			return 0;
		}
		var f = this.getRad((lat1 + lat2) / 2);
		var g = this.getRad((lat1 - lat2) / 2);
		var l = this.getRad((lng1 - lng2) / 2);
		var sg = Math.sin(g);
		var sl = Math.sin(l);
		var sf = Math.sin(f);
		var s, c, w, r, d, h1, h2;
		var a = 6378137.0; //The Radius of eath in meter.   
		var fl = 1 / 298.257;
		sg = sg * sg;
		sl = sl * sl;
		sf = sf * sf;
		s = sg * (1 - sl) + (1 - sf) * sl;
		c = (1 - sg) * (1 - sl) + sf * sl;
		w = Math.atan(Math.sqrt(s / c));
		r = Math.sqrt(s * c) / w;
		d = 2 * w * a;
		h1 = (3 * r - 1) / 2 / c;
		h2 = (3 * r + 1) / 2 / s;
		s = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
		s = s / 1000;
		s = s.toFixed(2); //指定小数点后的位数。   
		return s;
	},
	
	getRad(d) {
		var PI = Math.PI;
		return d * PI / 180.0;
	},
	
	/**
	 * 当前位置与指定位置的距离
	 * @param lat1 第一点的纬度
	 * @param lng1 第一点的经度
	 * @returns {Number}
	 */
	getCurrentDistance(lat, lng) {
		let location=getApp().globalData.currentLocation;
		if (location) {
			return this.getDistance(lat, lng, location.latitude, location.longitude)
		}
		return 0;
	},
	
	/**
	 * 当前位置与指定位置的距离
	 * @param lat1 第一点的纬度
	 * @param lng1 第一点的经度
	 * @returns {Number}
	 */
	getCurrentDistanceStr(lat, lng) {
		var distance = this.getCurrentDistance(lat, lng);
		var strDistance = '';
		if (distance < 1) { //一公里以内的
			strDistance = distance * 1000 +"m";
		} else {
			strDistance = distance+"km";
		}
		return strDistance;
	},
	
	
	phoneHiden(cellValue) {
		if (Number(cellValue) && String(cellValue).length === 11) {
			var mobile = String(cellValue)
			var reg = /^(\d{3})\d{4}(\d{4})$/
			return mobile.replace(reg, '$1****$2')
		} else {
			return cellValue
		}
	},

	playAudio(src) {
		if (innerAudioContext) {
			innerAudioContext.stop();
		}
		// 为了防止苹果手机静音无法播放
		wx.setInnerAudioOption({
			obeyMuteSwitch: false
		});
		innerAudioContext.src = encodeURI(src);
		console.log("开始播放");
		innerAudioContext.play();
		innerAudioContext.onEnded((res) => {
			console.log("自然播放结束")
			// callback("onEnded");
		});
		innerAudioContext.onStop((res) => {
			console.log("播放停止")
			// callback("onStop");
		});
		innerAudioContext.onError((res) => {
			console.log("播放错误", res)
			// callback("onError");
		})
	},

	stopAudioPlay() {
		console.log("stopAudioPlay", innerAudioContext);
		if (innerAudioContext) {
			console.log("stopAudioPlay");
			innerAudioContext.stop();
		}
	},


	/* 
	 * 将cityNo 转 cityName
	 * cityData:原数据
	 * cityNo：二级地区编码
	 */
	getCityName(cityData, cityNo) {
		if (!cityNo) return;
		if (!(cityData instanceof Array)) return;
		// 9112
		cityNo += "";
		for (let i = 0; i < cityData.length; i++) {
			let sheng = cityData[i];
			for (let j = 0; j < sheng.children.length; j++) {
				let shi = sheng.children[j];
				if (shi.value == cityNo) {
					// 使用return 终止循环
					return `${sheng.label}-${shi.label}`;
				}
			}
		}
	},

	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},

	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},

	/* 
	 * 银行卡每四位空格
	 */
	formatCardNo(cardNo) {
		cardNo += "";
		return cardNo.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
	},

	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},
}
