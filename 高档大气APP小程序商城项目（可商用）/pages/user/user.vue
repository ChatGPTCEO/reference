<template>
	<view class="">
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus"></orange-fullloading>
		<!--头部-->
		<view class="user-header w-100 text-white" style="height: 388rpx;background-color: #B79B80;">
			<!-- 未登陆前 -->
			<view class="row-ac ml-2" style="padding-top: 140rpx;" v-if="!loginStatus"
				@tap="nvaTo('/pages/public/login')">
				<image :src="userInfo.image" class="border rounded-50" style="width: 120rpx;height: 120rpx;" mode="">
				</image>
				<view class="flex-1 ml-2">
					<view class="font-s-4 font-w">登陆 / 注册</view>
				</view>
			</view>
			<!-- 登陆后 -->
			<view class="row-ac user-info-box ml-2" v-else>
				<image :src="userInfo.image" class="border rounded-50" style="width: 120rpx;height: 120rpx;" mode="">
				</image>
				<view class="flex-1 ml-2">
					<view class="font-s-5 font-w">{{ userInfo.name }}</view>
					<view class="font-s-3">ID:{{ userInfo.id }}</view>
				</view>
				<view class="distribution-box">
					<view v-if="userInfo.levelName !== ''" class="distribution-status">{{ userInfo.levelName }}</view>
				</view>
			</view>
			
		</view>
		<view class="collection-box bg-white rounded row-ac py-3" v-if="loginStatus"  style="margin-bottom: 88rpx;">
			<view class="row-a-j-fc flex-1" @click="nvaTo('/pages/user-collection/user-collection?pageType=collect')">
				<view class="font-s-5 font-w">{{ userInfo.collectCount || 0 }}</view>
				<view class="font-s-3 mt-1">收藏数</view>
			</view>
			<view class="row-a-j-fc flex-1" @click="nvaTo('/pages/user-collection/user-collection?pageType=history')">
				<view class="font-s-5 font-w">{{ userInfo.historyCount || 0 }}</view>
				<view class="font-s-3 mt-1">历史记录数</view>
			</view>
			<view class="row-a-j-fc flex-1" @click="nvaTo('/pages/user-collection/user-collection?pageType=brand')">
				<view class="font-s-5 font-w">{{ userInfo.attentionCount || 0 }}</view>
				<view class="font-s-3 mt-1">关注数</view>
			</view>
		</view>

		<view class="user-box bg-white rounded">
			<view class="row-ac-sb p-2 border-bottom">
				<view class="font-w">我的订单</view>
				<view class="font-s-4 text-light-grey" @click="toOrder(0)">
					全部
					<text class="iconfont icon-xiangxia font-s-s"></text>
				</view>
			</view>
			<view class="row-ac">
				<view class="d-f  flex-1 row">
					<view class="row-a-j-fc" style="height: 150rpx;" @tap="toOrder(1)">
						<view class="iconfont icon-daifukuan font-s-8"></view>
						<view class="font-s-3 mt-1">待付款</view>
					</view>
					<view v-if="userInfo.paymentCount > 0" class="rounded-50 bg-color row font-s-2"
						style="width: 35rpx;height: 35rpx;margin-left: -30rpx;margin-top: -90rpx;">
						{{ userInfo.paymentCount }}
					</view>
				</view>
				<view class="d-f  flex-1 row" @tap="toOrder(2)">
					<view class="row-a-j-fc" style="height: 150rpx;">
						<view class="iconfont icon-daishouhuo1 font-s-8"></view>
						<view class="font-s-3 mt-1">待发货</view>
					</view>
					<view v-if="userInfo.stateSendCount > 0" class="rounded-50 bg-color row font-s-2"
						style="width: 35rpx;height: 35rpx;margin-left: -30rpx;margin-top: -90rpx;">
						{{ userInfo.stateSendCount }}
					</view>
				</view>
				<view class="d-f  flex-1 row" @tap="toOrder(3)">
					<view class="row-a-j-fc" style="height: 150rpx;">
						<view class="iconfont icon-yiwancheng font-s-8"></view>
						<view class="font-s-3 mt-1">待收货</view>
					</view>
					<view v-if="userInfo.forwardsCount > 0" class="rounded-50 bg-color row font-s-2"
						style="width: 35rpx;height: 35rpx;margin-left: -30rpx;margin-top: -90rpx;">
						{{ userInfo.forwardsCount }}
					</view>
				</view>
				<view class="d-f  flex-1 row" @tap="toOrder(4)">
					<view class="row-a-j-fc" style="height: 150rpx;">
						<view class="iconfont icon-pingjia font-s-8"></view>
						<view class="font-s-3 mt-1">待评价</view>
					</view>
					<view v-if="userInfo.evaluateCount > 0" class="rounded-50 bg-color row font-s-2"
						style="width: 35rpx;height: 35rpx;margin-left: -30rpx;margin-top: -90rpx;">
						{{ userInfo.evaluateCount }}
					</view>
				</view>
			</view>
		</view>
	
		<!-- <button open-type="contact">联系客服</button> -->
		<!--服务-->
		<view class="user-box rounded ml-2 mr-2 mt-2 bg-white">
			<view class="row-ac p-2 border-bottom">
				<view class="font-w">商城服务</view>
			</view>
			<view class="row-ac-fw service-box">
				<view class="row-a-j-fc" style="width: 25%; height: 150rpx;" v-for="(item, index) in servicesList"
					:key="index" @click="mallServices(item, index)">
					<view class="iconfont font-s-8" :class="item.icon"></view>
					<view class="font-s-2 mt-1">{{ item.servicename }}</view>
				</view>
				<view class="row-a-j-fc" style="width: 25%; height: 150rpx;" v-if="userInfo.levelName == '站点管理员'"
					@click="nvaTo('/pages/article/article-list')">
					<view class="iconfont icon-xunipiaowu font-s-8 "></view>
					<button open-type="contact" class="font-s-2 mt-1">文章模块</button>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<!-- 微信登陆状态下才显示 -->
				<view class="row-a-j-fc" style="width: 25%; height: 150rpx;">
					<view class="iconfont icon-kefu font-s-8"></view>
					<button open-type="contact" class="font-s-2 mt-1">联系客服</button>
				</view>
				<view class="row-a-j-fc" style="width: 25%; height: 150rpx;" v-if="loginStatus"
					@click="nvaTo('/pages/user/configure/set')">
					<view class="iconfont icon-shezhi2 font-s-8"></view>
					<view class="font-s-2 mt-1">设置</view>
				</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userInfo as userInfoUrl,
		getHotGoods,
		distributionUserInfoUrl,
	} from '@/api/index';
	import {
		mapState
	} from 'vuex';
	import {
		checkLogin
	} from '@/utils/util';

	export default {
		data() {
			return {
				myRedQueryInfo: {
					status: 0,
					pageSize: 10,
					page: 1,
					field: '',
					desc: ''
				},
				// 用户信息
				userInfo: {
					// 用户id
					id: '',
					// 昵称
					name: '',
					// 头像
					image: '/static/img/header-img.png',
					// 积分
					point: '',
					// 余额
					money: '',
					// 邮箱
					email: ''
				},
				servicesList: this.$Management.mallServices,
				distributionMenuList: this.$Management.distributionMenu,
				hotGoodslist: [],
				// 登录状态
				loginStatus: false,
				loadingStatus: true,
				distributionUserCenterInfo: {
					isDistribute: false
				},
				redEnvelopeNum: 0.0
			};
		},
		computed: {},
		filters: {
			numFilter(value) {
				let realVal = parseFloat(value).toFixed(2);
				return realVal;
			}
		},
		onLoad() {
			this.initData();
		},
		onShow() {
			this.initData();
		},
		methods: {
			async initData() {
				this.getHotGoods();
				this.getUserInfo();
				this.getRedEnvelopeNum();
				// 异步延迟加载
				setTimeout(() => {
					this.loadingStatus = false;
				}, 100);
			},
			nvaTo(url) {
				uni.navigateTo({
					url
				});
			},
			toMyRedEnvelope() {
				let loginStatus = checkLogin();
				if (!loginStatus) {
					return false;
				}
				uni.navigateTo({
					url: '/pages/marketing/my-red-envelope-list/my-red-envelope-list'
				});
			},
			//顶部设置和消息点击事件
			onNavigationBarButtonTap(e) {
				if (e.index === 0) {
					//点击设置时如果没有登陆跳转登陆页面登陆后返回
					if (!this.loginStatus) {
						uni.navigateTo({
							url: '/pages/public/login'
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.navigateTo({
							url: '/pages/user/configure/set'
						});
					}
				}
				if (e.index === 1) {
					//点击消息时如果没有登陆跳转登陆页面登陆后返回
					if (!this.loginStatus) {
						uni.navigateTo({
							url: '/pages/public/login'
						});
						this.$store.commit('login', res);
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: '前往消息页',
							icon: 'none'
						});
					}
				}
			},
			async getUserInfo() {
				/*  */
				/*let token = uni.getStorageSync('token');
      let userInfo = uni.getStorageSync('userInfo');
      console.log(userInfo);
      console.log(token);
      if (token == '' && userInfo == '') {
        this.loginStatus = false;
        this.userInfo = {
          // 用户id
          id: '',
          // 昵称
          name: '',
          // 头像
          image: '/static/img/header-img.png',
          // 积分
          point: '登录后可查看',
          // 余额
          money: '',
          // 邮箱
          email: ''
        };
      }
      if (token != '') {
        // 如果token不为空，缓存中的userInfo为空，重新获取用户信息
        if (userInfo == '' || JSON.stringify(userInfo) == '{}') {
          await this.$R.get(userInfoUrl).then(res => {
            console.log(res);
            let resUserInfo = res.data;
            uni.setStorage({ key: 'userInfo', data: resUserInfo });
            uni.setStorage({ key: 'weChatOpenId', data: resUserInfo.openid });
            this.userInfo = resUserInfo;
            this.loginStatus = true;
          });
        }else {
          this.userInfo = userInfo
          this.loginStatus = true;
        }
      }*/
				let token = uni.getStorageSync('token');
				console.log(token);
				if (token != '') {
					await this.$R.get(userInfoUrl).then(res => {
						let resUserInfo = res.data;
						uni.setStorage({
							key: 'userInfo',
							data: resUserInfo
						});
						uni.setStorage({
							key: 'weChatOpenId',
							data: resUserInfo.openid
						});
						this.userInfo = resUserInfo;
						this.loginStatus = true;
						// 如果是推广员，获取推广员信息
						this.getDistributionUserCenterInfo();
					});
				} else {
					this.loginStatus = false;
					this.userInfo = {
						// 用户id
						id: '',
						// 昵称
						name: '',
						// 头像
						image: '/static/img/header-img.png',
						// 积分
						point: '',
						// 余额
						money: '',
						// 邮箱
						email: ''
					};
				}
			},
			// 获取红包总金额
			getRedEnvelopeNum() {
				let token = uni.getStorageSync('token');
				if (!token) {
					this.redEnvelopeNum = '0.00';
					return false;
				}
				this.$R.get(getMyRedEnvelopeListUrl, this.myRedQueryInfo).then(res => {
					this.redEnvelopeNum = 0.0;
					if (res.data.list.length > 0) {
						res.data.list.forEach(item => {
							if (item.status !== 1) {
								this.redEnvelopeNum += item.red_envelopes_money - 0;
							}
						});
					}
				});
			},
			getHotGoods() {
				this.$R.get(getHotGoods).then(res => {
					this.hotGoodslist = res.data.list;
				});
			},
			toOrder(orderTypeId) {
				if (!this.loginStatus) {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				} else {
					uni.navigateTo({
						url: '/pages/order/order?orderTypeId=' + orderTypeId
					});
				}
			},
			// 商城服务列表点击事件
			mallServices(item, index) {
				if (index !== 6) {
					if (!this.loginStatus) {
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
					}
				}
				if (item.url != '') {
					uni.navigateTo({
						url: item.url
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
	.collection-box{
		width: 690rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		position: absolute;
		margin-top: -80rpx;
		background-color: #fff;
	}


	.user-box {
		width: 690rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		.iconfont {
			font-size: 42rpx;
		}
		

	}

	.service-box {
		color: #6A6A6A;

		.iconfont {
			font-size: 42rpx;
		}
	}

	.user-info-box {
		padding-top: 140rpx;

		.distribution-box {
			background-color: $uni-color-warning;
			height: 64rpx;
			border-radius: 50rpx 0 0 50rpx;
			width: 155rpx;
			padding-left: 24rpx;

			.distribution-status {
				font-size: 26rpx;
				color: $uni-text-white-color;
				line-height: 64rpx;
			}
		}
	}

	.profit-box {
		padding: 20rpx 20rpx 40rpx;

		.profit-item {
			text-align: center;
			padding: 0 20rpx;

			.num {
				font-size: 30rpx;
				line-height: 60rpx;
				height: 60rpx;
				font-weight: bold;
			}

			.text {
				font-size: 24rpx;
				height: 40rpx;
				line-height: 40rpx;
			}
		}
	}

	.exchange-now {
		width: 130rpx;
		height: 45rpx;
		border-radius: 20rpx;
	}
</style>
