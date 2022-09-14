<template>
	<view class="ynq-tabbar">
		<view class="ynq-tabbar-bg-box">
			<image class="ynq-tabbar-bg" src="/static/image/tabbar-top.png" mode="aspectFill"></image>
			<view class="ynq-mid-icon" @tap="midClick">
				<image src="/static/image/sender-bg-white.png" mode="aspectFill"></image>
			</view>
			<view class="ynq-tabbar-box">
				<view class="ynq-tabbar-item" v-for="tab,index in data" :key="index" @tap="tabbarItemClick(tab,index)">
					<image class="ynq-tabbar-icon" :src="tabbarIndex==index?tab.selectedIconPath:tab.iconPath"
						mode="aspectFill">
					</image>
					<view class="ynq-tabbar-text" :class="tabbarIndex==index?'ynq-tabbar-text-select':''">{{tab.text}}
					</view>
				</view>
			</view>
		</view>
		<!-- IOS安全距离START -->
		<view class="ynq-ios-aq"></view>
		<!-- IOS安全距离END -->
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: ["index"],
		data() {
			return {
				tabbarIndex: 0,
				data: [{
						text: "首页",
						iconPath: "/static/image/home.png",
						selectedIconPath: "/static/image/home-active.png",
						pagePath: "/pages/index/index"
					},
					{
						text: "转让",
						iconPath: "/static/image/transfer.png",
						selectedIconPath: "/static/image/transfer-active.png",
						pagePath: "/pages/find/find"
					},
					{
						text: "",
						iconPath: "",
						selectedIconPath: "",
						pagePath: ""
					},
					{
						text: "求购",
						iconPath: "/static/image/looking.png",
						selectedIconPath: "/static/image/looking-active.png",
						pagePath: "/pages/msg/msg"
					},
					{
						text: "我的",
						iconPath: "/static/image/user.png",
						selectedIconPath: "/static/image/user-active.png",
						pagePath: "/pages/me/me"
					},
				]
			};
		},
		mounted() {
			this.tabbarIndex = this.index
			uni.hideTabBar()
		},
		methods: {
			tabbarItemClick(tab, index) {
				console.log(tab, index)
				uni.switchTab({
					url: tab.pagePath
				})
			},
			midClick() {
				console.log("点击了中间");
			},

		}
	}
</script>

<style lang="scss" scoped>
	.ynq-tabbar {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;

		.ynq-ios-aq {
			height: env(safe-area-inset-bottom);
			background-color: #FFFFFF;
		}

		.ynq-tabbar-bg-box {
			width: 100%;
			height: 118rpx;
			position: relative;

			.ynq-tabbar-bg {
				width: 100%;
				height: 100%;
			}

			.ynq-mid-icon {
				position: absolute;
				top: 0;
				left: 50%;
				border-radius: 100%;
				width: 92rpx;
				height: 92rpx;
				background-color: $theme-color;
				padding: 20rpx;
				z-index: 10;
				transform: scale(0.65) translate(-78%, -15%);

				image {
					width: 100%;
					height: 100%;
					transform: scale(0.9);
				}
			}


			.ynq-tabbar-box {
				width: 100%;
				height: 96rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;

				.ynq-tabbar-item {
					flex: 1;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.ynq-tabbar-icon {
						width: 46rpx;
						height: 46rpx;
						padding: 2px;
						/*  */
					}

					.ynq-tabbar-text {
						color: #999;
						margin-top: 6rpx;
						line-height: 1;
						font-size: 20rpx;
					}

					.ynq-tabbar-text-select {
						color: $theme-color;
					}
				}
			}
		}
	}
</style>
