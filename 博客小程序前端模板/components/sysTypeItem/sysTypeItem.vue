<template>
	<view class="item-container" @click="goToType">
		<view class="item-header">
			<view class="bg"></view>
			<view class="item-num" v-if="sysTypeItem.projectNum!=0">{{sysTypeItem.projectNum}}种推荐</view>
			<image :src="sysTypeItem.typeImg" :lazy-load="true"></image>
		</view>
		<view class="item-title">{{sysTypeItem.typeName}}</view>
		<view class="item-desc">{{sysTypeItem.typeIntroduce}}</view>
	</view>
</template>

<script>
	export default {
		name: "sysTypeItem",
		props: {
			sysTypeItem: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			goToType() {
				uni.setStorageSync("typeName", this.sysTypeItem.typeName)
				uni.navigateTo({
					url: '/pages/sysList/sysList?typeId=' + this.sysTypeItem.typeId
				})
			}
		}
	}
</script>

<style scoped>
	.item-container {
		border-radius: 20rpx 20rpx 0 0;
		margin: 20rpx;
		width: 310rpx;
		height: 370rpx;
		box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
	}

	.item-header {
		position: relative;
	}

	.bg {
		position: absolute;
		height: 50rpx;
		width: 100%;
		background-image: linear-gradient(#333333, #999999);
		left: 0;
		bottom: 10rpx;
		opacity: 0.4;
	}

	.item-num {
		position: absolute;
		color: #ffffff;
		bottom: 20rpx;
		font-size: 22rpx;
		margin-left: 20rpx;
	}

	.item-header image {
		border-radius: 20rpx 20rpx 0 0;
		height: 260rpx;
		width: 310rpx;
	}

	.item-title {
		margin: 10rpx 20rpx;
		font-weight: bold;
		font-size: 26rpx;
	}

	.item-desc {
		margin: 0 20rpx;
		font-size: 22rpx;
		width: 270rpx;
		color: #888;
		white-space: nowrap;
		/*不换行*/
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
