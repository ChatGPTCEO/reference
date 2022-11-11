<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="false">
			<block slot="content">个人中心</block>
		</cu-custom>
		<view class="mine-userinfo bg-red">
			<view class="mine-userinfo-bg1">
			</view>
			<view class="mine-userinfo-bg2">
			</view>
			<view class="mine-userinfo-bg3">
			</view>
			<view class="mine-userinfo-bg4">
			</view>
			<view class="hx-user-info">
				<view class="flex">
					<view class="cu-avatar round xl head flex"
						:style="'background-image:url(' + userInfo.avatarUrl + ')'">
					</view>
					<view class="nick-name">
						<view v-if="userInfo" style="color:#fff">
							{{userInfo.nickName}}
						</view>
						<view v-else @tap="goLogin">
							去登录
						</view>
						<!--  #ifdef MP-WEIXIN -->
						<view class="padding-top-xs" v-if="userInfo">
							<button class="cu-btn round sm lines-gray" v-if="canIUseGetUserProfile"
								@tap="getUserProfile">更新头像昵称</button>
							<button class="cu-btn round sm" v-else open-type="getUserInfo"
								@getuserinfo="getWxUserInfo">更新头像昵称</button>
						</view>
						<!--  #endif -->
					</view>


				</view>
				<view class="text-xxl">
					<text class="cuIcon-settings text-white" @tap="toUserDetail"></text>
				</view>
			</view>
			<view class="grid no-border col-4 padding-xs">
				<view>
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=0">
						<view class="text-xl">
							<text class="cuIcon-pay text-white"></text>
						</view>
						<view class="text-white">收藏</view>
					</navigator>
				</view>
				<view>
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=1">
						<view class="text-xl">
							<text class="cuIcon-send text-white"></text>
						</view>
						<view class="text-white">订阅</view>
					</navigator>
				</view>
				<view>
					<navigator class="content" hover-class="none" url="/pages/user/user-footprint/index">
						<view class="text-xl">
							<text class="cuIcon-footprint text-white"></text>
						</view>
						<view class="text-white">足迹</view>
					</navigator>
				</view>
				<view>
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=1">
						<view class="text-xl">
							<text class="cuIcon-send text-white"></text>
						</view>
						<view class="text-white">钱包</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="margin-sm bg-white">
			<view class="flex justify-between padding-lr padding-top-xs">
				<view class="text-black text-bold">我的订单</view>
				<navigator class="action " url="/pages/order/order-list/index" hover-class="none">
					<text class="text-grey text-sm">查看全部 <text class="cuIcon-right"></text></text>
				</navigator>
			</view>
			<view class="cu-list grid no-border col-5">
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=1">
						<view class="cuIcon-pay text-red">
							<view class="cu-tag badge order-tag" v-if="orderCount && orderCount[1]!=0">
								<block>{{orderCount[1]>99?'99+':orderCount[1]}}</block>
							</view>
						</view>
						<view class="text-df">待付款</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=2">
						<view class="cuIcon-send text-red">
							<view class="cu-tag badge order-tag" v-if="orderCount && orderCount[2]!=0">
								<block>{{orderCount[2]>99?'99+':orderCount[2]}}</block>
							</view>
						</view>
						<view class="text-df">待发货</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=3">
						<view class="cuIcon-deliver text-red">
							<view class="cu-tag badge order-tag" v-if="orderCount && orderCount[3]!=0">
								<block>{{orderCount[3]>99?'99+':orderCount[3]}}</block>
							</view>
						</view>
						<view class="text-grey">待收货</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=4">
						<view class="cuIcon-evaluate text-red">
							<view class="cu-tag badge order-tag" v-if="orderCount && orderCount[4]!=0">
								<block>{{orderCount[4]>99?'99+':orderCount[4]}}</block>
							</view>
						</view>
						<view class="text-grey">待评价</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/order/order-list/index?status=5">
						<view class="cuIcon-refund text-red">
							<view class="cu-tag badge order-tag" v-if="orderCount && orderCount[5]!=0">
								<block>{{orderCount[5]>99?'99+':orderCount[5]}}</block>
							</view>
						</view>
						<view class="text-grey">退款/售后</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="margin-sm bg-white">
			<view class="flex justify-between padding-lr padding-top-xs">
				<view class="text-bold">我的服务</view>
			</view>
			<view class="cu-list grid no-border col-4">
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/user/user-address/index">
						<view class="cuIcon-location text-red"></view>
						<view class="text-grey">收货地址</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/loot-user/loot-user-list/index">
						<view class="cuIcon-friend text-red"></view>
						<view class="text-grey">0元夺宝</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/user/user-address/index">
						<view class="cuIcon-edit text-red"></view>
						<view class="text-grey">我的评价</view>
					</navigator>
				</view>
				<view class="cu-item">
					<navigator class="content" hover-class="none" url="/pages/user/user-address/index">
						<view class="cuIcon-recharge text-red"></view>
						<view class="text-grey">分销中心</view>
					</navigator>
				</view>

			</view>
		</view>
		<view class="text-grey text-sm text-center margin-sm">环兴商城 版本所有（{{versionNumber}}）</view>
	</view>
</template>

<script>
	import packageJson from '@/package.json'
	export default {
		data() {
			return {
				theme: getApp().globalData.theme,
				userInfo: null,
				orderCount: null,
				canIUseGetUserProfile: false,
				versionNumber: packageJson.version
			}
		},
		onShow() {
			getApp().initPage().then(res => {
				this.getUserInfo();
				this.getOrderCount();
			})
		},
		onLoad() {
			if (wx.getUserProfile) {
				this.canIUseGetUserProfile = true
			}
		},
		methods: {
			getUserInfo() {
				uni.$myRequest.userInfo().then(res => {
					this.userInfo = res.data;
				});
			},
			getOrderCount() {
				uni.$myRequest.orderCount().then(res => {
					this.orderCount = res.data;
					console.log(JSON.stringify(this.orderCount[1]))
				})
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				});
			},
			toUserDetail() {
				uni.navigateTo({
					url: '/pages/user/user-info/index?userInfo=' + encodeURIComponent(JSON.stringify(this
						.userInfo)),

				});
			},
			jumpPages(url) {
				uni.navigateTo({
					url: url
				});
			},
			toOrder(status) {
				uni.navigateTo({
					url: '/pages/order/order-list/index?status=' + status
				});
			},
			/**
			 * 获取微信用户个人信息
			 */
			getUserProfile(e) {
				// https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html
				//推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						uni.$myRequest.maUpdateInfo(res).then(res => {
							uni.setStorageSync('userInfo', res.data);
							this.getUserInfo();
						})
					}
				})
			},
			getWxUserInfo(e) {
				// 不推荐使用 getUserInfo 获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
				uni.$myRequest.maUpdateInfo(e).then(res => {
					uni.setStorageSync('userInfo', res.data);
				})
			},
		}
	}
</script>

<style lang="scss">
	.hx-user-info {
		display: flex;
		padding: 60rpx;
		align-items: center;
		justify-content: space-between;

		.nick-name {
			padding: 20rpx;
		}
	}

	.swiper {
		height: 720rpx;
	}

	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 26rpx;
		font-weight: 700;
	}

	.title-right {
		font-size: 24rpx;
		color: #999999;
	}

	.order-bottom {
		display: flex;
		background-color: #F1F1F1;
		border: #F1F1F1 1px solid;
		border-radius: 16rpx;
		margin: 20rpx;

		.right {
			padding-left: 20rpx;

			.title {
				margin-top: 10rpx;
				font-size: 24rpx;
			}

			.describe {
				font-size: 24rpx;
				margin-top: 20rpx;
			}
		}

	}

	.hx-top {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;

		.item {
			padding: 0rpx 50rpx;
			display: flex;
			align-items: center;

			.name {
				font-weight: 700;
				font-size: 30rpx;
			}
		}
	}

	.mine-userinfo {
		position: relative;
		width: 750rpx;
		z-index: 0;

		&-bg1 {
			position: absolute;
			bottom: 250rpx;
			left: -40rpx;
			width: 300rpx;
			height: 300rpx;
			border-radius: 50%;
			background-color: rgba($color: #fff, $alpha: 0.2);
		}

		&-bg2 {
			position: absolute;
			bottom: 200rpx;
			right: 80rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: rgba($color: #fff, $alpha: 0.2);
		}

		&-bg3 {
			position: absolute;
			bottom: 150rpx;
			right: 220rpx;
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background-color: rgba($color: #fff, $alpha: 0.2);
		}

		&-bg4 {
			position: absolute;
			bottom: 100rpx;
			right: 180rpx;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: rgba($color: #fff, $alpha: 0.2);
		}
	}

	.order-tag {
		margin-left: 10rpx !important;
	}
</style>
