<template>
	<view>
		<view class="gird">
			<u-grid :col="4" :border="false">
				<u-grid-item v-if="opentop" style="background: rgba(0,0,0,0);" @click="navTo('/pagesUser/job/job')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu1.png" :lazy-load="true"></u-image>
					<view class="grid-text">招聘信息</view>
				</u-grid-item>
				
				<u-grid-item style="background: rgba(0,0,0,0);" @click="navTo('/pagesUser/house/house')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu2.png" :lazy-load="true"></u-image>
					<view class="grid-text">房产交易</view>
				</u-grid-item>
				
				<u-grid-item style="background: rgba(0,0,0,0);" @click="navTo('/pagesUser/commodity/commodity')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu3.png" :lazy-load="true"></u-image>
					<view class="grid-text">物品交易</view>
				</u-grid-item>
			
				<u-grid-item style="background: rgba(0,0,0,0);" @click="navTo('/pagesUser/promote/promote')">
					<u-image width="80rpx" height="80rpx" src="@/static/images/menu4.png" :lazy-load="true"></u-image>
					<view class="grid-text">本地推广</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				opentop:false,
			}
		},
		onLoad() {
			this.getVerify()
		},
		methods: {
			navTo(path) {
				this.$u.route(path);
			},
			getVerify() {
				this.$u.get('/addons/hicity/index/getVerify', {}).then(res => {
					this.opentop = res.opentop;
				})
			},
		}
	}
</script>
<style>
	page {
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	.gird {
		background-color: white;
		border-radius: 20rpx;
	}
    .grid-text {
		margin-top: 15rpx;
	}
	.modelcont {
		padding: 30rpx;
		width: 500rpx;

		.cont {
			.cell {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 80rpx;
				font-size: 30rpx;
				color: #333333;
				background-color: #F1F1F1;
				border-radius: 10rpx;
				margin-bottom: 20rpx;
			}
		}

		.close {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 50rpx;
		}
	}
</style>
