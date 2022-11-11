<template>
	<view class="center">
		<view class="center_top"
			:style="{background: `url(${userInfo.photo?userInfo.photo:defaultImg}) no-repeat`,backgroundSize:'cover'}">
			<view class="mask"></view>
		</view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header"
						:style="{backgroundImage: `url(${userInfo.photo?userInfo.photo:defaultImg})`}" style="background-repeat: no-repeat;
    background-size: 100% 100%;">
					</view>
					<text>{{userInfo.nickName ? userInfo.nickName : '尚未登录'}}</text>
					<view style="flex-grow: 1;"></view>
					<image src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/setting.png"
						lazy-load @click="updateDia = true" v-if="isLogin"></image>
				</view>
				<view class="order_status">
					<view class="status" @click="toDetail(1)">
						<image class="icon"
							src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/dianzan.png"
							mode="aspectFill"></image>
						<text>点赞</text>
					</view>
					<view class="status" @click="toDetail(2)">
						<image class="icon"
							src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/shoucang.png"
							mode="aspectFill"></image>
						<text>收藏</text>
					</view>
					<view class="status" @click="menuCLick(3)">
						<image class="icon"
							src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/yuyue.png"
							mode="aspectFill"></image>
						<text>定制</text>
					</view>
					<view class="status" @click="menuCLick(4)">
						<image class="icon"
							:src="!isLogin ? 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/login.png' : 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/logout.png'"
							mode="aspectFill"></image>
						<text>{{!isLogin ? '登录' : '退出'}}</text>
					</view>
				</view>
			</view>
			<view class="baiban"></view>
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus" @click="clickItem(item)" :key="item.key">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="center" :round="10" :safeAreaInsetBottom="false" @close="show = false">
			<view style="height: 800rpx;width: 600rpx;">
				<image :src="qqQrcode" style="height: 800rpx;width: 600rpx;"></image>
			</view>
		</u-popup>
		<updateUserInfo v-if="updateDia" @close="close"></updateUserInfo>
	</view>
</template>

<script>
	import myCache from '@/utils/myCache.js'
	import sysConfigApi from "@/api/sysConfigApi.js"
	import sysConstant from '@/utils/sys-constant.js'
	var app = getApp();
	export default {
		data() {
			return {
				show: false, // 交流群弹框
				qqQrcode: '',
				updateDia: false,
				isLogin: getApp().globalData.isLogin,
				userInfo: {},
				defaultImg: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/default.png',
				menus: [{
						name: 'QQ交流群',
						icon: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/jl.png',
						key: 1,
					},
					{
						name: '意见反馈',
						icon: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/yj.png',
						key: 3,
					},
					{
						name: '关于我们',
						icon: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/me.png',
						key: 4,
					},
					{
						name: '服务流程',
						icon: 'https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/mz.png',
						key: 5,
					},
				]
			};
		},
		onShow() {
			this.checkLogin()
			this.init()
		},
		methods: {
			async init() {
				let res = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.QQ_QR_CODE)
				this.qqQrcode = res.data
			},
			close() {
				this.updateDia = false
				this.checkLogin()
			},
			checkLogin() {
				if (app.globalData.isLogin) {
					this.isLogin = true
					let userInfo = app.globalData.userInfo
					this.userInfo = userInfo
				}
			},
			toDetail(type) {
				if (this.isLogin) {
					let name
					if (type == 1) {
						name = '我的点赞'
					} else {
						name = '我的收藏'
					}
					uni.setStorageSync("subjectName", name);
					uni.navigateTo({
						url: '/packageA/pages/subjectBlogList/subjectBlogList?type=' + type
					})
				} else {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
			},
			menuCLick(key) {
				switch (key) {
					case 1:
						uni.navigateTo({
							url: '/packageA/pages/aboutMe/aboutMe'
						})
						break
					case 3:
						if (this.isLogin) {
							uni.navigateTo({
								url: '/packageA/pages/customList/customList'
							})
						} else {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
						uni.navigateTo({
							url: '/packageA/pages/customList/customList'
						})
						break
					case 4:
						if (this.isLogin) {
							myCache.cache("userToken", null)
							this.isLogin = false
							this.userInfo = {}
						} else {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
						break
					default:
						return
				}
			},
			clickItem(item) {
				switch (item.key) {
					case 1:
						this.show = true
						break
					case 2:
						uni.navigateTo({
							url: '/pages/login/login'
						})
						break
					case 3:
						uni.navigateTo({
							url: '/packageA/pages/message/message'
						})
						break
					case 4:
						uni.navigateTo({
							url: '/packageA/pages/aboutMe/aboutMe'
						})
						break
					case 5:
						uni.navigateTo({
							url: '/packageA/pages/serviceProcess/serviceProcess'
						})
						break
					default:
						return
				}

				console.log(item)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.profily,
	.profily_header {
		border-radius: 8px;
	}

	.center {
		height: 100%;

		&_top {
			height: 35%;

			.mask {
				background: rgba(0, 0, 0, .4);
				height: 100%;
			}
		}

		&_box_bg {
			background: #F9F9F9;
			position: relative;

			.profily {
				position: absolute;
				width: 90%;
				// border:1px solid #F7F7F7;
				margin: 0 auto;
				top: -100upx;
				left: 5%;
				background: #FEFEFE;
				padding: 35upx;
				box-sizing: border-box;
				box-shadow: 0px 2px 5px #EDEDED;
			}
		}
	}

	.base {
		display: flex;
		align-items: center;
		border-bottom: 2px solid #F6F6F6;
		padding-bottom: 35upx;
		position: relative;

		.profily_header {
			height: 120upx;
			width: 120upx;

			background-size: 100%;
		}

		text {
			margin-left: 20px;
			font-size: 30upx;
		}

		image {
			height: 40upx;
			width: 40upx;
			right: 0px;
			top: 0px;
		}
	}

	.order_status {
		display: flex;
		justify-content: space-between;
		margin-top: 35upx;

		.status {
			width: 140upx;
			font-size: 24upx;
			text-align: center;
			letter-spacing: .5px;
			display: flex;
			flex-direction: column;

			.icon {
				width: 50upx;
				height: 50upx;
				margin: 0 auto;
				margin-bottom: 5px;

			}
		}
	}

	.baiban {
		background: #FEFEFE;
		height: 300upx;
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: 28upx;
			letter-spacing: 1px;
			padding: 14px 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/right.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 40upx;
				height: 40upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
