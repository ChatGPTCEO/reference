<template>
	<view>
		<!--顶部-->
		<view class="user-bg u-p-b-60">
			<!--已登录-->
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30" v-if="isLogin">
				<view class="u-m-r-30">
					<u-avatar :src="userInfo.avatar" size="120"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20">{{userInfo.nickname}}</view>

					<!--VIP会员标识-->
					<view class="user-vipinfo u-flex">
						<u-icon name="integral-fill" color="#ffbc44" size="32"></u-icon>
						<view class="u-font-12">{{userVip.name}}</view>
					</view>
				</view>
				<view class="u-m-l-10 u-p-10" @click="$u.route('/pagesUser/userinfo/userinfo')">
					<u-icon name="setting" color="#9899a1" size="32"></u-icon>
				</view>
			</view>

			<!--未登录-->
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" v-else>
				<view class="u-m-r-30" @click="navTo('/pagesUser/userinfo/userinfo',true)">
					<u-avatar :src="pic" size="120"></u-avatar>
				</view>
				<view class="u-flex-1">
					<view class="u-font-18 u-p-b-20" @click="navTo('/pagesUser/userinfo/userinfo',true)">登录/注册</view>
					<view class="u-font-14 user-tips">登录账户获取更多体验...</view>
				</view>
				<view class="u-m-l-10 u-p-10" @click="navTo('/pagesUser/userinfo/userinfo',true)">
					<u-icon name="setting" color="#9899a1" size="32"></u-icon>
				</view>
			</view>
		</view>

		<!--工具栏-->
		<view class="menu-bg">
			<!--我的功能-->
			<view class="menu u-p-30 u-shadow-warp">
				<view class="menu-title">
					<u-section title="我的工具" :right="false" :show-line="false"></u-section>
				</view>
				<u-grid :col="4" :border="false">
					<u-grid-item @click="navTo('/pagesUser/push/push',true)">
						<view class="gird">
							<view class="u-icon-share newicon-normal"></view>
							<view class="grid-text">我的发布</view>
						</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesUser/resume/resume',true)">
						<view class="gird">
							<view class="u-icon-cardbag newicon-normal"></view>
							<view class="grid-text">我的简历</view>
						</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesUser/collect/collect',true)">
						<view class="gird">
							<view class="u-icon-star newicon-normal"></view>
							<view class="grid-text">我的收藏</view>
						</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesFind/store_center/store_center',true)">
						<view class="gird">
							<view class="u-icon-shop newicon-normal"></view>
							<view class="grid-text">我的店铺</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>

			<!--服务-->
			<view class="menu u-p-30 u-shadow-warp">
				<view class="menu-title">
					<u-section title="我的服务" :right="false" :show-line="false"></u-section>
				</view>
				<u-grid :col="4" :border="false">
					<u-grid-item v-if="opentop" @click="navTo('/pagesUser/vip/vip',true)">
						<view class="u-icon-vip newicon-normal"></view>
						<view class="grid-text">我的会员</view>
					</u-grid-item>
					<u-grid-item>
						<!--#ifdef MP-WEIXIN-->
						<button class="concat" hover-class='none' open-type="contact">
							<view class="u-icon-service newicon-normal" ></view>
						</button>
						<view class="grid-text">联系客服</view>
						<!--#endif-->
						<!--#ifndef MP-WEIXIN-->
						<view class="gird" @click="callContact">
							<view class="u-icon-service newicon-normal"></view>
							<view class="grid-text">联系客服</view>
						</view>
						<!--#endif-->
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesUser/help/help',false)">
						<view class="gird">
							<view class="u-icon-help newicon-normal"></view>
							<view class="grid-text">帮助中心</view>
						</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesUser/feedback/feedback',true)">
						<view class="gird">
							<view class="u-icon-edit-form newicon-normal"></view>
							<view class="grid-text">意见反馈</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>

			<!--其他-->
			<view class="menu u-p-30 u-shadow-warp">
				<view class="menu-title">
					<u-section title="其他" :right="false" :show-line="false"></u-section>
				</view>
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<!--#ifdef MP-WEIXIN-->
						<button class="concat" hover-class='none' open-type="share">
							<view class="u-icon-my-add newicon-normal"></view>
						</button>
						<view class="grid-text">邀请好友</view>
						<!--#endif-->
						<!--#ifndef MP-WEIXIN-->
						<view class="gird">
							<view class="u-icon-my-add newicon-normal"></view>
							<view class="grid-text">邀请好友</view>
						</view>
						<!--#endif-->
					</u-grid-item>
					<u-grid-item @click="navTo('/pagesUser/setting/setting',false)">
						<view class="gird">
							<view class="u-icon-set newicon-normal"></view>
							<view class="grid-text">系统设置</view>
						</view>
					</u-grid-item>
					<u-grid-item @click="$u.route('/pagesUser/textmain/textmain',{id:1})">
						<view class="gird">
							<view class="u-icon-con-taurus newicon-normal"></view>
							<view class="grid-text">关于我们</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>

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
				opentop:false,
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
	.grid-text {
		margin-top: 22rpx;
	}

	.user-tips {
		color: #9899a1;
	}

	.menu-bg {
		background-color: #F3F4F6;
		height: 100vh;
		padding-top: 40rpx;
	}

	.menu {
		margin: 30rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
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
		height: 65rpx;
		overflow: hidden;
		color: #333333;
	}

	.concat::after {
		border: none;
	}
</style>
