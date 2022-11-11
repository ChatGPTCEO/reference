<template>
	<view class="tag">
		<image :lazy-load="true" :src="tagItem.tagImg"></image>{{tagItem.tagName}}
	</view>
</template>

<script>
	export default {
		// 图片标签
		name: "imgTag",
		props: {
			tagItem: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style scoped>
	.tag {
		padding: 10rpx 15rpx;
		line-height: 40rpx;
		text-align: center;
		color: #fff;
		background-color: #0081ff;
		box-shadow: 0px 0px 10rpx #0081ff;
		width: auto;
		margin: 10rpx;
		border-radius: 8rpx;
		float: left;
		opacity: 0.9;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tag image {
		height: 30rpx;
		width: 30rpx;
		margin-right: 10rpx;
	}
</style>
