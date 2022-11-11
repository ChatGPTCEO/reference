import errorCode from "@/constants/errorCode";
import config from 'config/env';
export const myRequest = (options) => { //暴露一个function：myRequest，使用options接收页面传过来的参数
	return new Promise((resolve, reject) => { //异步封装接口，使用Promise处理异步请求

		if (options.showLoading) {
			uni.showLoading({
				title: '加载中'
			});
		}
		let url = options.url;
		//#ifndef H5
		url = config.basePath + options.url
		//#endif
		uni.request({ //发送请求
			url: url, //接收请求的API
			method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
			header: {
				'hx-token': uni.getStorageSync('hxtoken') ? uni.getStorageSync('hxtoken') :
				null, // 请求token
				'timestamp': new Date().getTime(),
				//#ifdef MP-WEIXIN
				'client-type': 'WX-MA', //客户端微信小程序
				'app-id': uni.getAccountInfoSync().miniProgram.appId, //小程序appId
				//#endif
				//#ifdef APP-PLUS
				'client-type': 'APP', //客户端类型APP
				//#endif
				//#ifdef H5
				'client-type': 'H5', //客户端H5
				//#endif
			},
			data: options.data || {}, //接收请求的data,不传默认为空
			//接口请求成功
			success: (res) => {
				if (res.statusCode != 200) {
					uni.$emit('z-paging-error-emit');
					return uni.showModal({
						title: '提示',
						content: errorCode[res.statusCode] || res.data.msg || "未知错误",
						success(res) {}
					});
					reject();
				}
				if (res.data.code != 0) {
					uni.$emit('z-paging-error-emit');

					if (res.data.code === 40001) { // token 过期
						if (!getApp().globalData.isLoadding) {
							getApp().globalData.isLoadding = true;
							// #ifdef MP-WEIXIN
							getApp().loginWxMa().then(res => {
								var pages = getCurrentPages(); // 获取页面栈
								var currPage = pages[pages.length - 1]; // 当前页面
								currPage.onLoad(currPage.options)
							});
							// #endif
							// #ifndef MP-WEIXIN
							getApp().userAppAuth().then(res => {
								var pages = getCurrentPages(); // 获取页面栈
								var currPage = pages[pages.length - 1]; // 当前页面
								currPage.onLoad(currPage.options)
							});
							// #endif
						}

						reject("hx-token过期")
					} else if (res.data.code === 40002 || res.data.code === 40003) {
						var pages = getCurrentPages(); // 获取页面栈
						var currPage = pages[pages.length - 1]; // 当前页面
						if (currPage) {
							let curParam = currPage.options
							// 拼接参数
							let redirectUrl = '/' + currPage.route
							console.log("页面地址==========" + currPage.route);
							if (curParam != null) {
								// 拼接参数
								let param = ''
								for (let key in curParam) {
									param += '&' + key + '=' + curParam[key]
								}
								param = param.substr(1)
								redirectUrl = redirectUrl + '?' + param
								redirectUrl = encodeURIComponent(redirectUrl)
							}
							uni.reLaunch({
								url: '/pages/login/index?redirectUrl=' + redirectUrl
							});
						}
						reject("请登录");
					} else {
						uni.showToast({
							icon: 'error',
							title: res.data.msg || "未知错误"
						})

						reject();
					}
				}
				resolve(res.data) //成功,将数据返回
			},
			fail: (err) => { //失败操作
				uni.$emit('z-paging-error-emit');
				uni.showModal({
					title: '提示',
					content: '接口请求出错：' + err.errMsg,
					success(res) {}
				});
				reject(err)
			},
			complete(res) {
				if (options.showLoading) {
					uni.hideLoading();
				}
			}
		})
	})
}

module.exports = {
	myRequest,
	/**
	 * 获取商城主题
	 */
	mobileTheme: data => {
		return myRequest({
			url: '/mallapi/mobiletheme',
			method: 'get',
			showLoading: false
		});
	},
	userAppAuth: data => {
		return myRequest({
			url: '/mallapi/app/user/auth',
			method: 'post',
			data,
			showLoading: false
		});
	},
	maPhoneLogin: data => {
		return myRequest({
			url: '/mallapi/userinfo/ma/login/phone',
			method: 'post',
			data,
			showLoading: false
		});
	},
	maUpdateInfo: data => {
		return myRequest({
			url: '/mallapi/userinfo/ma/update/info',
			method: 'post',
			data,
			showLoading: false
		});
	},
	smsLogin: data => {
		return myRequest({
			url: '/mallapi/userinfo/login/sms',
			method: 'post',
			data,
			showLoading: false
		});
	},
	logout: data => {
		return myRequest({
			url: '/mallapi/userinfo/logout',
			method: 'post',
			data,
			showLoading: true
		});
	},
	goodsCategoryList: data => {
		return myRequest({
			url: '/mallapi/goodscategory/tree',
			method: 'get',
			data,
			showLoading: false
		});
	},
	goodsSpuById: id => {
		return myRequest({
			url: '/mallapi/goodsspu/' + id,
			method: 'get',
			showLoading: false
		});
	},
	freightTemplateById: id => {
		return myRequest({
			url: '/mallapi/freighttemplate/' + id,
			method: 'get',
			showLoading: false
		});
	},
	goodsSpuPage: data => {
		return myRequest({
			url: '/mallapi/goodsspu/page',
			method: 'get',
			data,
			showLoading: true
		});
	},
	
	/**
	 * 商品spu规格列表
	 */
	goodsSpuSpecsList: data => {
		return myRequest({
			url: '/mallapi/goodsspuspecs/list',
			method: 'get',
			data,
			showLoading: false
		});
	},
	userInfo: data => {
		return myRequest({
			url: '/mallapi/userinfo',
			method: 'get',
			showLoading: true
		});
	},
	smsCode: data => {
		return myRequest({
			url: '/mallapi/sms/code',
			method: 'post',
			data,
			showLoading: false
		});
	},
	/**
	 * 修改用户信息
	 */
	updateInfo: data => {
		return myRequest({
			url: '/mallapi/userinfo/update/info',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 * 修改手机号
	 */
	updatePhone: data => {
		return myRequest({
			url: '/mallapi/userinfo/update/phone',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 * 查询用户默认收货地址
	 */
	defaultAddress: data => {
		return myRequest({
			url: '/mallapi/useraddress/default/address',
			method: 'get',
			showLoading: false
		});
	},
	/**
	 * 收货地址列表
	 */
	addressPage: data => {
		return myRequest({
			url: '/mallapi/useraddress/page',
			method: 'get',
			data,
			showLoading: true
		});
	},
	/**
	 * 删除收货地址
	 */
	delUserAddress: id => {
		return myRequest({
			url: '/mallapi/useraddress/' + id,
			method: 'delete',
			showLoading: false
		});
	},

	/**
	 * 新增/编辑用户收货地址
	 */
	saveOrUpdateAddress: data => {
		return myRequest({
			url: '/mallapi/useraddress',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 * 订单结算
	 */
	preOrder: data => {
		return myRequest({
			url: '/mallapi/orderinfo/pre',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 * 创建订单
	 */
	createOrder: data => {
		return myRequest({
			url: '/mallapi/orderinfo/create',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 * 通过订单Id查询
	 */
	orderById: id => {
		return myRequest({
			url: '/mallapi/orderinfo/' + id,
			method: 'get',
			showLoading: false
		});
	},
	/**
	 * 订单列表
	 */
	orderPage: data => {
		return myRequest({
			url: '/mallapi/orderinfo/page',
			method: 'get',
			data,
			showLoading: true
		});
	},
	/**
	 * （预支付）统一下单接口
	 */
	unifiedOrder: data => {
		return myRequest({
			url: '/mallapi/orderinfo/unified',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 *订单数量查询
	 */
	orderCount: data => {
		return myRequest({
			url: '/mallapi/orderinfo/count',
			method: 'get',
			data,
			showLoading: false
		});
	},
	/**
	 *订单取消
	 */
	orderCancel: id => {
		return myRequest({
			url: '/mallapi/orderinfo/cancel/' + id,
			method: 'get',
			showLoading: false
		});
	},
	/**
	 *订单删除
	 */
	orderDel: id => {
		return myRequest({
			url: '/mallapi/orderinfo/del/' + id,
			method: 'get',
			showLoading: false
		});
	},
	/**
	 *订单确认收货
	 */
	orderReceiver: id => {
		return myRequest({
			url: '/mallapi/orderinfo/receiver/' + id,
			method: 'get',
			showLoading: false
		});
	},
	/**
	 * 商品评价列表
	 */
	goodsAppraisePage: data => {
		return myRequest({
			url: '/mallapi/goodsappraise/page',
			method: 'get',
			data,
			showLoading: true
		});
	},
	/**
	 * 购物车列表
	 */
	shoppingCartPage: data => {
		return myRequest({
			url: '/mallapi/shoppingcart/page',
			method: 'get',
			data,
			showLoading: true
		});
	},
	/**
	 * 购物车添加/编辑
	 */
	saveOrUpdateCart: data => {
		return myRequest({
			url: '/mallapi/shoppingcart',
			method: 'post',
			data,
			showLoading: true
		});
	},
	/**
	 * 用户足迹列表
	 */
	userFootprintPage: data => {
		return myRequest({
			url: '/mallapi/userfootprint/page',
			method: 'get',
			data,
			showLoading: true
		});
	},
	/**
	 * 用户足迹删除
	 */
	userFootprintDel: id => {
		return myRequest({
			url: '/mallapi/userfootprint/' + id,
			method: 'delete',
			showLoading: true
		});
	},
	getLootInfoPage: data => {
		return myRequest({
			url: '/mallapi/lootinfo/page',
			method: 'get',
			data,
			showLoading: true
		});
	},

	/**
	 * 通过夺宝Id查询
	 */
	getLootById: id => {
		return myRequest({
			url: '/mallapi/lootinfo/' + id,
			method: 'get',
			data: null,
			showLoading: true
		});
	},
	/**
	 * 保存夺宝参与记录
	 */
	addLootUser: data => {
		return myRequest({
			url: '/mallapi/lootuser',
			method: 'post',
			data,
			showLoading: true
		});
	},
	lootUserPage: data => {
		return myRequest({
			url: '/mallapi/lootuser/page',
			method: 'get',
			data: data,
			showLoading: true
		});
	},

}
