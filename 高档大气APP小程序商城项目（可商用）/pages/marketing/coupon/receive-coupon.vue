<template>
	<view>
		<view class="fix-box coupon-header">
			<view class="login-box" v-show="fixTopStatus.loginStatus">
				<view class="login-status w-100 row-ac-sb" v-if="userInfo.id">
					<view class="user-info row-ac ml-4">
						<image :src="userInfo.image" class="user-img rounded-50 border"></image>
						<view class="ml-2 font-s-2">{{ userInfo.name }}</view>
					</view>
				</view>
				<view class="login-status w-100 row-ac-sb" v-else>
					<view class="user-info row-ac ml-4">
						<image src="/static/common/img/my.png" class="user-img rounded-50 border"></image>
						<view class="ml-2 font-s-2">未登陆</view>
					</view>
					<view class="to-login row mr-4 font-s-2" @click="toLogin">请登陆</view>
				</view>
			</view>
			<view class="exclusive-list row-ac flex-1 mx-2" v-show="fixTopStatus.memberStatus">
				<view class="exclusive-item row-a-j-fc" v-for="(item, index) in exclusiveList" :key="index">
					<view class="iconfont row rounded-50 text-white" :class="item.icon"></view>
					<view class="font-s-3 mt-3" style="font-weight: 400;">{{ item.title }}</view>
					<view class="font-s-1 mt-2 font-s-1">{{ item.info }}</view>
				</view>
			</view>
		</view>
		<view class="coupon-header">
			<view class="login-box">
				<view class="login-status w-100 row-ac-sb" v-if="userInfo.id">
					<view class="user-info row-ac ml-4">
						<image :src="userInfo.image" class="user-img rounded-50 border"></image>
						<view class="ml-2 font-s-2">{{ userInfo.name }}</view>
					</view>
				</view>
				<view class="login-status w-100 row-ac-sb" v-else>
					<view class="user-info row-ac ml-4">
						<image src="/static/common/img/my.png" class="user-img rounded-50 border"></image>
						<view class="ml-2 font-s-2">未登陆</view>
					</view>
					<view class="to-login row mr-4 font-s-2" @click="toLogin">请登陆</view>
				</view>
			</view>
			<view class="coupon-exclusive row w-750">
				<view class="coupon-exclusive-dotted flex-1 ml-4"></view>
				<view class="font-s-7 px-3 font-w">会员专享</view>
				<view class="coupon-exclusive-dotted flex-1 mr-4"></view>
			</view>
			<view class="exclusive-list row-ac flex-1 mx-2">
				<view class="exclusive-item row-a-j-fc" v-for="(item, index) in exclusiveList" :key="index">
					<view class="iconfont row rounded-50 text-white" :class="item.icon"></view>
					<view class="font-s-3 mt-3" style="font-weight: 400;">{{ item.title }}</view>
					<view class="font-s-1 mt-2 font-s-1">{{ item.info }}</view>
				</view>
			</view>
		</view>
		<view class="coupon-recommend w-714 bg-white">
			<view class="coupon-recommend-title w-100 row-ac-sb">
				<view class="row-ac ml-2">
					<view class="font-s-5 font-w">
						全球优品
						<text class="ml-1">|</text>
					</view>
					<view class="font-s-2 ml-1">会员领券全场尊享</view>
				</view>
				<view class="font-s-2 mr-2">
					更多
					<text class="iconfont icon-xiangxia ml-1" style="font-size: 20rpx;"></text>
				</view>
			</view>
			<view class="recommend-goods-box flex-1 row-ac">
				<view class="recommend-goods-item border" v-for="(item, index) in recommendList" :key="index" v-if="index < 3">
					<image :src="item.slide_list.img" class="recommend-img"></image>
					<view class="in1line font-s-2 mx-2 mt-2">{{ item.title }}</view>
					<view class="font-s-1 ml-2 text-light-grey">￥{{ item.market_price }}</view>
					<view class="font-s-4 row-ac ml-2">
						<view class="text-main-color">￥{{ item.price }}</view>
						<view class="recommend row text-white ml-1">尊享价</view>
					</view>
				</view>
			</view>
		</view>
		<view class="coupon-list bg-white mt-2">
			<view class="coupon-title w-100 row-ac">
				<view class="row-ac ml-2">
					<view class="font-s-5 font-w">
						会员礼券
						<text class="ml-1">|</text>
					</view>
					<view class="font-s-2 ml-1">全场通用优惠券</view>
				</view>
			</view>
			<view class="coupon-item" v-for="item in receiveCouponList" :key="item.id">
				<image :src="couponBgimg" mode="" class="coupon-bgimg"></image>
				<view class="coupon-info row-ac">
					<view class="coupon-limit row  flex-column text-white">
						<view class="font-s-5 font-w">{{ item.name }}</view>
						<view class="limit-time">{{ item.notAfter }}</view>
					</view>
					<view class="coupon-denomination d-f justify-center flex-column text-white">
						<view class="font-s-8 font-w mt-1">{{ item.value | numFilter }}</view>
						<view class="font-s-1">满{{ item.minAmount | numFilter }}可用</view>
					</view>
					<view class="receive-state row-a-j-fc font-s-2" @click="receiveCouponHandle(item)">
						<view class="receive-state-ing row font-s-2" :class="item.isReceive == 0 ? 'state-color-1' : 'state-color-2'">
							{{ item.isReceive == 0 ? '点击领取' : '您已领取' }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { recommendGoods, receiveCouponCenterUrl, userReceiveCouponUrl } from '@/api/index';
import { userInfo as userInfoUrl } from '@/api/index';

export default {
	data() {
		return {
			queryInfo: {
				pageSize: 10,
				page: 1,
				field: '',
				desc: ''
			},
			exclusiveList: [
				{ icon: 'icon-chongzhijilu', title: '全球优品A', info: '专享价1' },
				{ icon: 'icon-chongzhijilu', title: '全球优品B', info: '专享价2' },
				{ icon: 'icon-chongzhijilu', title: '全球优品C', info: '专享价3' },
				{ icon: 'icon-chongzhijilu', title: '全球优品D', info: '专享价4' },
				{ icon: 'icon-chongzhijilu', title: '全球优品E', info: '专享价5' }
			],
			receiveCouponList: [],
			recommendList: [],
			total: 0,
			userInfo: {},
			fixTopStatus: {
				loginStatus: false,
				memberStatus: false
			}
		};
	},
	filters: {
		numFilter(value) {
			let realVal = parseFloat(value).toFixed(0);

			return realVal;
		}
	},
	// 页面往下滚动事件
	onPageScroll(res) {
		const scrollTop = res.scrollTop;
		this.fixTopStatus.loginStatus = scrollTop >= 0;
		this.fixTopStatus.memberStatus = scrollTop >= 55;
	},
	onLoad() {
		this.initData();
	},
	onShow() {
		this.getUserInfo();
	},
	// 上划加载
	onReachBottom() {
		this.onReachBottomHandle();
	},
	computed: {
		couponBgimg() {
			let url = this.$R.baseUrl();
			return `${url.substring(0, url.length - 4)}/image/coupon-bgimg.png`;
		}
	},
	methods: {
		initData() {
			this.getReceiveCouponList();
			this.getUserInfo();
			this.getRecommendGoods();
		},
		onReachBottomHandle() {
			// 触底事件
			if (this.total != this.receiveCouponList.length) {
				this.queryInfo.page++;
				this.getReceiveCouponList();
			}
		},
		// 获取可以领取优惠券的列表
		getReceiveCouponList() {
			this.$R.get(receiveCouponCenterUrl, this.queryInfo).then(res => {
				this.receiveCouponList = [...this.receiveCouponList, ...res.data.list];
				console.log(this.receiveCouponList);
				this.total = res.data.total;
			});
		},
		// 获取推荐商品列表
		getRecommendGoods() {
			this.$R.get(recommendGoods).then(res => {
				this.recommendList = res.data.list;
			});
		},
		// 领取优惠券
		receiveCouponHandle(couponInfo) {
			let token = uni.getStorageSync('token');
			if (token == '') {
				uni.showToast({
					icon: 'none',
					title: '请先登录，3秒后将跳转至登录页'
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 3000);
				return false;
			} else {
				if (couponInfo.isReceive == 0) {
					this.$R.put(userReceiveCouponUrl + couponInfo.id).then(res => {
						console.log(res);
						uni.showToast({
							title: '领取成功',
							icon: 'none'
						});
						++couponInfo.counts;
						if (couponInfo.counts >= couponInfo.everyNums) {
							couponInfo.isReceive = 1;
						}
					});
				}
			}
		},
		// 跳转到登录页
		toLogin() {
			uni.navigateTo({
				url: '/pages/public/login'
			});
		},
		// 获取登录状态用户信息
		getUserInfo() {
			let token = uni.getStorageSync('token');
			if (token != '') {
				this.$R.get(userInfoUrl).then(res => {
					this.userInfo = res.data;
				});
			}
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f2f2f2;
}
.fix-box {
	position: fixed;
	z-index: 3;
	left: 0;
	right: 0;
	background-color: #ffffff;
	transition: 0.3s;
}

.coupon-header {
	.login-status {
		height: 90rpx;
		background-color: #000;

		.user-info {
			color: #fef0c2;

			.user-img {
				width: 46rpx;
				height: 46rpx;
			}
		}

		.to-login {
			width: 134rpx;
			height: 52rpx;
			border-radius: 26rpx;
			background-color: #fef0c2;
			color: #682900;
		}
	}

	.coupon-exclusive {
		height: 114rpx;
		color: #f4c44f;

		.coupon-exclusive-dotted {
			border-top: dotted #f4c44f 5rpx;
		}
	}

	.exclusive-list {
		height: 236rpx;

		.exclusive-item {
			width: 20%;
			height: 236rpx;

			.iconfont {
				width: 80rpx;
				height: 80rpx;
				background-color: #f5d077;
				font-size: 48rpx;
			}
		}
	}
}

.coupon-recommend {
	border-radius: 16rpx;

	.coupon-recommend-title {
		height: 88rpx;
		background: linear-gradient(to right, #fdefc6, #f2d8a3);
		border-radius: 16rpx 16rpx 0 0;
		color: #652500;
	}

	.recommend-goods-box {
		height: 362rpx;

		.recommend-goods-item {
			width: 236rpx;
			height: 362rpx;

			.recommend-img {
				width: 180rpx;
				height: 180rpx;
				margin: 5rpx 28rpx;
			}

			.recommend {
				width: 62rpx;
				height: 25rpx;
				background: linear-gradient(to right, #f61f1b, #ec684a);
				border-radius: 0 16rpx 0 0;
				font-size: 18rpx;
			}
		}
	}
}

.coupon-list {
	width: 714rpx;
	margin-left: 18rpx;
	margin-right: 18rpx;
	border-radius: 16rpx;
	.coupon-title {
		height: 92rpx;
		background-color: #2d2b29;
		border-radius: 16rpx 16rpx 0 0;
		color: #ffffff;
	}

	.coupon-item {
		width: 700rpx;
		height: 163rpx;
		margin: 30rpx 7rpx 0 7rpx;

		.coupon-bgimg {
			width: 700rpx;
			height: 163rpx;
			position: absolute;
		}

		.coupon-info {
			position: relative;
			width: 700rpx;
			height: 163rpx;
			.coupon-denomination {
				margin-left: 65rpx;
				width: 33%;
				height: 163rpx;
				view {
					line-height: 1.3;
				}
			}

			.coupon-limit {
				width: 33%;
				height: 163rpx;
				.limit-time {
					font-size: 14rpx;
				}
			}

			.receive-state {
				width: 33%;
				height: 163rpx;
				.receive-state-ing {
					width: 120rpx;
					height: 30rpx;
					border-radius: 15rpx;
					border: 2rpx solid;
				}
			}

			.state-color-1 {
				color: #ffffff;
			}

			.state-color-2 {
				color: #fad600;
			}
		}
	}
}
</style>
