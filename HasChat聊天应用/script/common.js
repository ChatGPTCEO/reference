import config from "@/script/config.js"
import store from "@/store/index.js"

module.exports = {
	/**
	 * 判断字符串是否为空
	 * @param {Object} string [判断字符]
	 */
	isEmptyString: function(string) {
		if (string == undefined ||
			typeof string == "undefined" ||
			!string ||
			string == null ||
			string == '' ||
			/^\s+$/gi.test(string)) {
			return true;
		} else {
			return false;
		}
	},
	// 发送本地消息
	sendLocal(conversition) {
		store.state.conversitionList.push(conversition);
		this.toBottom();
	},
	// 修改信息已读状态
	changeReaded(id) {
		let userConversition = store.state.conversitionList.filter(
			(x) =>
			x.SendId == id &&
			x.ReciverId == store.state.sender.Id &&
			!x.ReadFlag
		);
		if (userConversition.length > 0) {
			userConversition.map((x) => {
				x.ReadFlag = true;
			});
		}
		let query = {
			SendId: id,
			ReciverId: store.state.sender.Id,
		};
		store.state.socket.emit("changeMsgRead", query);
	},
	//回到底部
	toBottom(time) {
		setTimeout(() => {
			store.commit('setPropName', {
				propName: 'scrollTop',
				value: 999991
			})
			// this.scrollTop = 999991;
		}, time);
		setTimeout(() => {
			// this.scrollTop = 999999;
			store.commit('setPropName', {
				propName: 'scrollTop',
				value: 999999
			})
			clearTimeout();
		}, time + 100);
	},
	initSetInfo: function(data) {
		store.commit("setPropName", {
			propName: 'sender',
			value: data?.myInfo
		});
		uni.setStorageSync("token", data?.token);
		uni.setStorageSync("sender", JSON.stringify(data?.myInfo));
	},
	logout() {
		uni.removeStorageSync("token");
		uni.removeStorageSync("sender");
		store.state.socket.disconnect();
	},
	isLogin() {
		return uni.getStorageSync("token") &&  uni.getStorageSync("sender") ? true : false;
	},

	/**
	 * 判断是否为手机号
	 * @param {Object} phone [手机号]
	 */
	isPoneAvailable: function(phone) {
		var myreg = /^[1][0-9]{10}$/;
		if (!myreg.test(phone)) {
			return false;
		} else {
			return true;
		}
	},

	/**
	 * 判断是否为身份证号
	 * @param {Object} sId [身份证]
	 */
	isCardID: function(sId) {
		var iSum = 0;
		var info = "";
		if (!/^\d{17}(\d|X)$/i.test(sId)) return "你输入的身份证长度或格式错误";
		sId = sId.replace(/X$/i, "a");
		let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "您输入的身份证号非法";
		for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
		if (iSum % 11 != 1) return "您输入的身份证号非法";
		return true;
	},
	/**
	 * 判断今天是否为本月最后一天
	 */
	isLastDayOfMonth: function() {
		var flag = false;
		var date = new Date();

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var today = 31;

		var new_year = year; //取当前的年份
		var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
		if (month > 12) { //如果当前大于12月，则年份转到下一年
			new_month -= 12; //月份减
			new_year++; //年份增
		}
		var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天

		var month_last_day = (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();

		if (today == month_last_day) {
			flag = true;
		}
		return flag;
	},
	/**
	 * 截取特定url参数
	 * @param {Object} name [参数名称]
	 */
	getQueryString: function(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	},

	//提示窗
	tipMsg: function(title, icon, time, mask) {
		title = title == undefined ? "系统繁忙" : title;
		icon = icon == undefined ? "none" : icon;
		time = time == undefined ? 1300 : time;
		mask = mask == undefined ? true : mask;
		uni.showToast({
			title: title,
			icon: icon,
			mask: mask,
			duration: time
		})
	},
	/** 
	 * 1.function
	 * @param {string} url 目标页面的路由
	 * @param {Object} param 传递给目标页面的参数
	 * @description 处理目标页面的参数，转成json字符串传递给param字段，在目标页面通过JSON.parse(options.param)接收
	 */
	navigateTo(url, param = {}, flag) {
		if (store.state.isReadyLogin <= 0 && !flag) {
			this.loginTip();
		} else {
			let part = '';
			for (var item in param) {
				part += '&' + item + '=' + param[item];
			}
			url = "/pages" + url + part.replace('&', '?');
			uni.navigateTo({
				url: url,
				fail: err => {
					this.tipMsg('暂未开放该功能！');
				},
			})
		}
	},

	/** 
	 * 2.function
	 * @param {string} url 目标页面的路由
	 * @param {Object} param 传递给目标页面的参数，只有页面栈无目标页面调用navigateTo时，参数才会生效，单单返回不能设置参数
	 * @description 先取出页面栈，页面栈最多十层，判断目标页面是否在页面栈中，如果在，则通过目标页的位置，返回到目标页面，否则调用navigateTo方法跳转到目标页
	 */
	navigateBack(url, param = {}) {
		if (store.state.isReadyLogin <= 0) {
			this.loginTip();
		} else {
			let part = '';
			for (var item in param) {
				part += '&' + item + '=' + param[item];
			}
			url = "/pages" + url + part.replace('&', '?');
			uni.navigateBack({
				url: url,
				fail: err => {
					this.tipMsg('暂未开放该功能！');
				},
			})
		}
	},

	// 3.封装switchTab，switchTab不能有参数
	switchTab(url) {
		uni.switchTab({
			url: url
		})
	},
	// 4.封装redirectTo，和navigateTo没啥区别
	redirectTo(url, param = {}, flag) {
		if (store.state.isReadyLogin <= 0 && !flag) {
			this.loginTip();
		} else {
			let part = '';
			for (var item in param) {
				part += '&' + item + '=' + param[item];
			}
			url = "/pages" + url + part.replace('&', '?');
			uni.redirectTo({
				url: url,
				fail(err) {
					console.log('redirectTo跳转出错', err)
				},
			})
		}
	},
	// 5.封装reLaunch，和navigateTo没啥区别
	reLaunch(url, param = {}) {
		if (store.state.isReadyLogin <= 0) {
			this.loginTip();
		} else {
			let part = '';
			for (var item in param) {
				part += '&' + item + '=' + param[item];
			}
			url = "/pages" + url + part.replace('&', '?');
			uni.reLaunch({
				url: url,
				fail(err) {
					console.log('reLaunch跳转出错', err)
				},
			})
		}
	},
	/**
	 * 6.function 打开另一个小程序,仅供小程序
	 * @param {String} appId 目标小程序ID
	 * @param {String} path 目标小程序的页面路径
	 * @param {Object}  extraData 传给目标小程序的数据
	 * @param {String}  envVersion 目标小程序版本号
	 */
	//appId 如果为空则打开首页(path 中 ? 后面的数据可以再小程序的 App.onLaunch、App.onShow 和 Page.onLoad 的回调函数当中获取到,
	// extraData(object) 需要传递给目标小程序的数据(目标小程序可在 App.onLaunch，App.onShow 中获取到传过来的数据),
	// envVersion 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
	navigateToMiniProgram(appId, path, extraData, envVersion) {
		uni.navigateToMiniProgram({
			appId: appId,
			path: path,
			extraData: extraData,
			envVersion: envVersion,
			fail(err) {
				console.log('打开另外小程序失败', err)
			}
		})
	},
	// 7.返回打开的上个小程序
	//extraData(object) 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow 中获取到这份数据。
	navigateBackMiniProgram(extraData) {
		uni.navigateBackMiniProgram({
			extraData: extraData,
			fail(err) {
				console.log('返回上个小程序失败', err)
			}
		})
	},
	//跳转到HTML页面
	navigateToHtml(link, param = {}) {
		let part = '';
		for (var item in param) {
			part += '&' + item + '=' + param[item];
		}
		var url = "/pages/htmlShell/htmlShell?link=" + encodeURIComponent(link + part.replace('&', '?'));
		uni.navigateTo({
			url: url,
			fail: err => {
				this.tipMsg('暂未开放该功能！');
			},
		})
	},
	//获取手机信息
	getTelephoneInfo(){
		return new Promise((resolve, reject) => {
			var data = uni.getStorageSync("telephoneInfo");
			if(!data){
				// 获取右上角胶囊的位置信息
				//#ifndef H5
				let btn = wx.getMenuButtonBoundingClientRect();
				//#endif
				uni.getSystemInfo({
					success: e => {
						let info = {
							screenHeight:e.screenHeight,
							statusBarHeight:e.statusBarHeight,
							windowWidth:e.windowWidth,
							//#ifndef H5
							top:btn.top,
							//#endif
						}
						uni.setStorageSync("telephoneInfo",info);
						resolve(info);
					},
					fail: (err) => {
						reject(err);
					}
				})
				
			}else{
				resolve(data);
			}
		})
	},
}
