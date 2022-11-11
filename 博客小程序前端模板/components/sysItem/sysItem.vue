<template>
	<view class="cu-item" @click="goToDetail">
		<image :src="projectItem.projectCoverImg" :lazy-load="true"></image>
		<view class="sys-title">
			{{projectItem.projectName}}
		</view>
		<view class="tags">
			<view class="cu-tag" v-for="(item,index) in projectItem.tags" :key="index">{{item.tagName}}</view>
		</view>
		<view class="desc">	{{projectItem.projectIntroduction}}</view>
	</view>
</template>

<script>
	export default {
		// 系统列表
		name: "sysItem",
		props:{
			projectItem:{
				type: Object,
				default: () => {}
			}
		},
		methods: {
			goToDetail() {
				uni.navigateTo({
					url: '/pages/sysDetail/sysDetail?projectId=' + this.projectItem.projectId
				})
			}
		}
	}
</script>

<style scoped>
	.cu-item {
		width: 690rpx;
		min-height: 500rpx;
		border-radius: 20rpx 20rpx 0 0;
		margin: 0rpx 30rpx 30rpx;
		border-bottom: solid 1px #f9f9f9;
		display: block;
		background-color: #ffffff;
		overflow: hidden;
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
		position: relative;
		padding-bottom: 20rpx;
	}

	.cu-item image {
		border-radius: 20rpx 20rpx 0 0;
		width: 100%;
		height: 350rpx;
	}

	.sys-title {
		padding: 0 10rpx;
		width: 670rpx;
		height: 60rpx;
		font-size: 28rpx;
		font-weight: 900;
		position: absolute;
		display: flex;
		justify-items: center;
		top: 296rpx;
		overflow: hidden;
		/*隐藏*/
		white-space: nowrap;
		/*不换行*/
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		align-items: center;
		background-color: rgba(249, 249, 249, 0.5);
	}

	.cu-tag {
		border-radius: 5000rpx;
		font-size: 20rpx;
		padding: 0rpx 12rpx;
		height: 32rpx;
		background-color: #013e77;
		color: #ffffff;
		font-size: 24rpx;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0rpx 16rpx;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: nowrap;
		margin-right: 6rpx;
	}

	.tags {
		padding: 0 10rpx;
	}

	.desc {
		margin: 10rpx;
		font-size: 28rpx;
		color: #888;
	}
</style>
