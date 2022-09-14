<template>
	<view>
		<view class="uni_extra"></view>
		<view class="uni_tabbar">
			<view class="tabbar_item" v-for="(item,index) in tabbar" :key="index" @click="tabbarChange(item)">
				<view class="tabbar_icon">
					<image v-if="item.pagePath == pagePath" mode="aspectFit" :src="item.selectedIconPath"></image>
					<image v-else mode="aspectFit" :src="item.iconPath"></image>
				</view>
				<view class="tabbar_label"  :class="item.pagePath == pagePath ? 'active': ''">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pagePath: null
		},
		data() {
			return {
				showPage: false,
				containerHeight: 400,
				tabbar: [{
						"pagePath": "/pages/index/index",
						"iconPath": "/static/tabBar/tabBar01.png",
						"selectedIconPath": "/static/tabBar/tabBar01_active.png",
						"text": "首页"
					},
					{
						"pagePath": "/pages/user/user",
						"iconPath": "/static/tabBar/tabBar02.png",
						"selectedIconPath": "/static/tabBar/tabBar02_active.png",
						"text": "我的"
					}
				]
			};
		},
		mounted() {
			// true为判断条件，根据实际的需求替换即可
			// if (true) {
			// 	this.tabbar.splice(1, 0, {
			// 		"pagePath": "/pages/index/index",
			// 		"iconPath": "/static/home.png",
			// 		"selectedIconPath": "/static/home_active.png",
			// 		"text": "首页"
			// 	})
			// }
		},
		methods: {
			// 点击tabbar
			tabbarChange(item) {
				console.log("当前tabBar");
				console.log(item);
				this.page = item.pagePath;
				// 使用reLaunch关闭所有的页面，打开新的栏目页面
				uni.reLaunch({
					url: this.page
				});
			},
		}
	}
</script>

<style scoped>
	.uni_extra {
		width: 100%;
		height: 100rpx;
	}

	.uni_tabbar {
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		border-top: solid 1rpx #eee;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);
		overflow: hidden;
		position: fixed;
		bottom: 0;
		z-index: 9999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tabbar_item {
		flex: 1;
		text-align: center;
	}

	.tabbar_icon {
		width: 100%;
	}

	.tabbar_icon image {
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
	}

	.tabbar_label {
		width: 100%;
		font-size: 24rpx;
		text-align: center;
		color: #999;
	}

	.tabbar_label.active {
		color: #E2231A;
	}
</style>
