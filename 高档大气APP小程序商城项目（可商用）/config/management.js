export default {

	//全局无图默认
	nopictures: "https://www.chunfengbuy.com/image/no-photo.png",
	navigationList: [{
			name: "热销排行榜",
			cover: "https://www.chunfengbuy.com/image/hot_list.png",
			url: "/pages/promotion/hotproducts-list"
		},
		{
			name: "精品推荐",
			cover: "https://www.chunfengbuy.com/image/sign_up.png",
			url: "/pages/promotion/selected-list"
		},
		{
			name: "天天上新",
			cover: "https://www.chunfengbuy.com/image/user_collection.png",
			url: "/pages/promotion/newproducts"
		},
		{
			name: "品牌街",
			cover: "https://www.chunfengbuy.com/image/bargain.png",
			url: "/pages/brand/brand-list"
		},
		{
			name: "领券中心",
			cover: "https://www.chunfengbuy.com/image/coupon_center.png",
			url: "/pages/marketing/coupon/receive-coupon"
		}
		/* {
			name: "拼团活动",
			cover: "https://www.chunfengbuy.com/image/coupon_center.png",
			url: "/pages/group-buying/group-list"
		} */
	],
	modularList:[
		{
			modularName:"清仓好物",
			modularPropaganda:"清仓最低1折起",
			img:"https://newtest.chunfengbuy.com/uploads/20220102/4ba2fa98e6f1d4148c4de79ac367e7c3.png",
			url:""
		},
		{
			modularName:"清仓好物",
			modularPropaganda:"清仓最低1折起",
			img:"https://newtest.chunfengbuy.com/uploads/20220102/173907de5f7c34b2ff8b887e23a5d10f.png",
			url:""
		}
	],
	//会员设置配置
	setList: [{
			title: "个人资料",
			url: "/pages/user/configure/userInfo"
		},
		{
			title: "修改密码",
			url: ""
		},
		{
			title: "收货地址",
			url: "/pages/user/configure/address"
		},
		{
			title: "关于商城",
			url: "/pages/user/configure/about"
		},
		{
			title: "使用帮助",
			url: ""
		},
		{
			title: "意见反馈",
			url: ""
		}
	],
	orderState: [{
			ordername: "全部",
			id: 0
		},
		{
			ordername: "待付款",
			id: 1
		},
		{
			ordername: "待发货",
			id: 2
		},
		{
			ordername: "待收货",
			id: 3
		},
		{
			ordername: "待评价",
			id: 4
		}
	],
	paymenTmethod: [{
			payname: "微信支付",
			icon: "icon-weixinzhifu2 text-success",
			iconcolor: "text-main-color"
		},
		{
			payname: "支付宝支付",
			icon: "icon-zhifubaozhifu1 text-primary",
			iconcolor: "text-main-color"
		},
		{
			payname: "银联支付",
			icon: "icon-yinlian1193427easyiconnet text-danger",
			iconcolor: "text-main-color"
		}
	],
	mallServices: [{
			servicename: "收货地址",
			icon: "icon-shouhuodizhi",
			url: "/pages/user/configure/address",
			color: "#FC9F37"
		},

		{
			servicename: "我的优惠券",
			icon: "icon-youhuiquan01",
			url: "/pages/marketing/coupon/my-coupon",
			color: "#F22258"
		},
		{
			servicename: "领券中心",
			icon: "icon-xunipiaowu",
			url: "/pages/marketing/coupon/receive-coupon",
			color: "#6B71D4"
		},
		{
			servicename: "意见反馈",
			icon: "icon-yijianfankui01",
			url: "",
			color: "#6B71D4"
		}
	],
	// 主题列表
	themeList: [{
			title: '官方',
			name: 'rf',
			color: '#fa436a',
			tabList: [
				'/static/tab-home-rf.png',
				'/static/tab-cate-rf.png',
				'/static/tab-notify-rf.png',
				'/static/tab-cart-rf.png',
				'/static/tab-my-rf.png'
			]
		},
		{
			title: '嫣红',
			name: 'red',
			color: '#f7221f',
			tabList: [
				'/static/tab-home-red.png',
				'/static/tab-cate-red.png',
				'/static/tab-notify-red.png',
				'/static/tab-cart-red.png',
				'/static/tab-my-red.png'
			]
		},
		{
			title: '桔橙',
			name: 'orange',
			color: '#f37b1d',
			tabList: [
				'/static/tab-home-orange.png',
				'/static/tab-cate-orange.png',
				'/static/tab-notify-orange.png',
				'/static/tab-cart-orange.png',
				'/static/tab-my-orange.png'
			]
		},
		{
			title: '明黄',
			name: 'yellow',
			color: '#fbbd08',
			tabList: [
				'/static/tab-home-yellow.png',
				'/static/tab-cate-yellow.png',
				'/static/tab-notify-yellow.png',
				'/static/tab-cart-yellow.png',
				'/static/tab-my-yellow.png'
			]
		},
		{
			title: '橄榄',
			name: 'olive',
			color: '#8dc63f',
			tabList: [
				'/static/tab-home-olive.png',
				'/static/tab-cate-olive.png',
				'/static/tab-notify-olive.png',
				'/static/tab-cart-olive.png',
				'/static/tab-my-olive.png'
			]
		},
		{
			title: '森绿',
			name: 'green',
			color: '#39b54a',
			tabList: [
				'/static/tab-home-green.png',
				'/static/tab-cate-green.png',
				'/static/tab-notify-green.png',
				'/static/tab-cart-green.png',
				'/static/tab-my-green.png'
			]
		},
		{
			title: '天青',
			name: 'cyan',
			color: '#1cbbb4',
			tabList: [
				'/static/tab-home-cyan.png',
				'/static/tab-cate-cyan.png',
				'/static/tab-notify-cyan.png',
				'/static/tab-cart-cyan.png',
				'/static/tab-my-cyan.png'
			]
		},
		{
			title: '海蓝',
			name: 'blue',
			color: '#0081ff',
			tabList: [
				'/static/tab-home-blue.png',
				'/static/tab-cate-blue.png',
				'/static/tab-notify-blue.png',
				'/static/tab-cart-blue.png',
				'/static/tab-my-blue.png'
			]
		},
		{
			title: '姹紫',
			name: 'purple',
			color: '#6739b6',
			tabList: [
				'/static/tab-home-purple.png',
				'/static/tab-cate-purple.png',
				'/static/tab-notify-purple.png',
				'/static/tab-cart-purple.png',
				'/static/tab-my-purple.png'
			]
		},
		{
			title: '木槿',
			name: 'mauve',
			color: '#9c26b0',
			tabList: [
				'/static/tab-home-mauve.png',
				'/static/tab-cate-mauve.png',
				'/static/tab-notify-mauve.png',
				'/static/tab-cart-mauve.png',
				'/static/tab-my-mauve.png'
			]
		},
		{
			title: '桃粉',
			name: 'pink',
			color: '#e03997',
			tabList: [
				'/static/tab-home-pink.png',
				'/static/tab-cate-pink.png',
				'/static/tab-notify-pink.png',
				'/static/tab-cart-pink.png',
				'/static/tab-my-pink.png'
			]
		},
		{
			title: '棕褐',
			name: 'brown',
			color: '#a5673f',
			tabList: [
				'/static/tab-home-brown.png',
				'/static/tab-cate-brown.png',
				'/static/tab-notify-brown.png',
				'/static/tab-cart-brown.png',
				'/static/tab-my-brown.png'
			]
		},
		{
			title: '玄灰',
			name: 'grey',
			color: '#8799a3',
			tabList: [
				'/static/tab-home-grey.png',
				'/static/tab-cate-grey.png',
				'/static/tab-notify-grey.png',
				'/static/tab-cart-grey.png',
				'/static/tab-my-grey.png'
			]
		},
		{
			title: '草灰',
			name: 'gray',
			color: '#aaaaaa',
			tabList: [
				'/static/tab-home-gray.png',
				'/static/tab-cate-gray.png',
				'/static/tab-notify-gray.png',
				'/static/tab-cart-gray.png',
				'/static/tab-my-gray.png'
			]
		},
		{
			title: '墨黑',
			name: 'black',
			color: '#333333',
			tabList: [
				'/static/tab-home-black.png',
				'/static/tab-cate-black.png',
				'/static/tab-notify-black.png',
				'/static/tab-cart-black.png',
				'/static/tab-my-black.png'
			]
		}
	],


	//地址下的彩虹条
	rainbow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"
}
