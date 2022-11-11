<template>
	<view>
		<view class="user">
			<view class="user-top">
				<view class="userinfo" v-if="isLogin" @click="$u.route('/pagesUser/userinfo/userinfo')">
					<u-avatar mode="circle" size="150" :src="userInfo.avatar"></u-avatar>
					<view class="info">
						<text>{{userInfo.nickname}}</text>
						<view class="vip">
							<image src="../../static/images/VIP1.png" mode="" style="width: 40rpx;height: 40rpx;">
							</image>
							<text class="viptext">{{userVip.name}}</text>
						</view>
					</view>
				</view>
				<view class="userinfo" v-else @click="$u.route('/pages/login/login')">
					<u-avatar mode="circle" size="150" src="avatar">
					</u-avatar>
					<view class="info">
						<text style="color: #666666;">您还未登录哦</text>
					</view>
				</view>
				<view class="sigin" @click="navTo('/pagesUser/userinfo/userinfo',true)">
					<u-icon name="edit-pen" color="#ffffff" size="28"></u-icon>
					<text style="margin-left: 10rpx;">编辑</text>
				</view>
			</view>
			<!-- <u-grid :col="3" :border="false">
				<u-grid-item>
					<text>22</text>
					<view class="grid-text">发布</view>
				</u-grid-item>
				<u-grid-item>
					<text>22</text>
					<view class="grid-text">收藏</view>
				</u-grid-item>
				<u-grid-item>
					<text>22</text>
					<view class="grid-text">积分</view>
				</u-grid-item>
			</u-grid> -->
		</view>
		<view class="menu">
			<text class="menu-title">我的功能</text>
			<u-grid :col="4" :border="false">
				<u-grid-item @click="navTo('/pagesUser/push/push',true)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu12.png"></u-image>
						<view class="grid-text">我的发布</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pagesUser/resume/resume',true)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu13.png"></u-image>
						<view class="grid-text">我的简历</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pagesUser/collect/collect',true)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu14.png"></u-image>
						<view class="grid-text">我的收藏</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pagesFind/store_center/store_center',true)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu15.png"></u-image>
						<view class="grid-text">我的店铺</view>
					</view>
				</u-grid-item>
				<!-- <u-grid-item @click="navTo('/pagesUser/msg/msg')">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu1.png"></u-image>
						<view class="grid-text">我的消息</view>
					</view>
				</u-grid-item> -->
			</u-grid>
		</view>
		<view class="menu">
			<text class="menu-title">工具与服务</text>
			<u-grid :col="4" :border="false">
				<u-grid-item v-if="opentop" @click="navTo('/pagesUser/vip/vip',true)">
					<u-image width="80rpx" height="80rpx" src="@/static/images/vip.png"></u-image>
					<view class="grid-text">我的会员</view>
				</u-grid-item>
				<u-grid-item>
					<!--#ifdef MP-WEIXIN-->
					<button class="concat" hover-class='none' open-type="contact">
						<u-image style="margin-bottom: -15rpx;" width="80rpx" height="80rpx"
							src="@/static/images/menu16.png"></u-image>
						<view style="margin-bottom: -15rpx;" class="grid-text">联系客服</view>
					</button>
					<!--#endif-->
					<!--#ifndef MP-WEIXIN-->
					<view class="gird" @click="callContact">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu16.png"></u-image>
						<view class="grid-text">联系客服</view>
					</view>
					<!--#endif-->
				</u-grid-item>
				<u-grid-item @click="navTo('/pagesUser/help/help',false)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu17.png"></u-image>
						<view class="grid-text">帮助中心</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="navTo('/pagesUser/feedback/feedback',true)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu18.png"></u-image>
						<view class="grid-text">意见反馈</view>
					</view>
				</u-grid-item>
				<u-grid-item>
					<!--#ifdef MP-WEIXIN-->
					<button class="concat" hover-class='none' open-type="share">
						<u-image style="margin-bottom: -15rpx;" width="80rpx" height="80rpx"
							src="@/static/images/menu19.png"></u-image>
						<view style="margin-bottom: -15rpx;" class="grid-text">邀请好友</view>
					</button>
					<!--#endif-->
					<!--#ifndef MP-WEIXIN-->
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu19.png"></u-image>
						<view class="grid-text">邀请好友</view>
					</view>
					<!--#endif-->
				</u-grid-item>
				<u-grid-item @click="navTo('/pagesUser/setting/setting',false)">
					<view class="gird">
						<u-image width="80rpx" height="80rpx" src="@/static/images/menu20.png"></u-image>
						<view class="grid-text">系统设置</view>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {
		APP_MOBILE,
		APP_NAME
	} from '../../env.js'
	export default {
		data() {
			return {
				userVip: {
					vip_id: 1,
					vip_time: 0,
					name: "普通会员"
				},
				opentop: false,
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				isLogin: state => state.user.isLogin,
			})
		},
		onLoad() {
			this.getVerify()
		},
		onShow() {
			if (this.isLogin) {
				this.$u.get('/addons/hicity/user/getUserVip', {

				}).then(res => {
					this.userVip = res
				})
			}
		},
		onShareAppMessage() {
			return {
				title: APP_NAME,
				path: '/pages/index/index'
			}
		},
		methods: {
			getVerify() {
				this.$u.get('/addons/hicity/index/getVerify', {}).then(res => {
					this.opentop = res.opentop;
				})
			},
			navTo(path, toLogin) {
				if (path == '/pagesUser/vip/vip' || path == '/pagesFind/store_center/store_center' || path ==
					'/pagesUser/push/push') {
					return this.$u.toast('完整演示请咨询');
				}
				if (toLogin) {
					if (this.isLogin) {
						this.$u.route(path)
					} else {
						this.$u.route('/pages/login/login')
					}

				} else {
					this.$u.route(path)
				}
			},
			callContact() {
				uni.makePhoneCall({
					phoneNumber: APP_MOBILE
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		background-color: white;
		margin: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx;

		.user-top {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.userinfo {
				display: flex;
				flex-direction: row;
				align-items: center;

				.info {
					margin-left: 20rpx;
					color: #333333;
					font-weight: 600;
					font-size: 35rpx;
					word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					margin-right: 20rpx;

					.vip {
						display: flex;
						flex-direction: row;
						align-items: center;
						font-size: 24rpx;
						margin-top: 15rpx;

						.viptext {
							margin-left: 10rpx;
							color: #333333;
							font-weight: normal;
						}
					}
				}
			}

			.sigin {
				background-color: #f44c01;
				margin-right: -20rpx;
				border-top-left-radius: 30rpx;
				border-bottom-left-radius: 30rpx;
				color: white;
				height: 50rpx;
				width: 150rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.menu {
		margin: 20rpx;
		background-color: white;
		padding: 20rpx;
		border-radius: 20rpx;

		.menu-title {
			font-size: 32rpx;
			color: #666666;
		}
	}

	.gird {
		height: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #333333;
	}

	.concat {
		font-size: 28rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		height: 120rpx;
		overflow: hidden;
		color: #333333;
	}

	.concat::after {
		border: none;
	}
</style>
