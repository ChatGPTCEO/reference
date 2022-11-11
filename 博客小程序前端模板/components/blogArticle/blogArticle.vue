<template>
	<view class="cu-card article no-card">
		<view class="cu-item shadow">
			<view class="title" @click="toBlogDetail">
				<view class="text-cut">{{blogItem.blogName}}</view>
			</view>
			<view class="content">
				<image v-if="blogItem.blogCoverImg" :src="blogItem.blogCoverImg" :lazy-load="true"></image>
				<view class="desc">
					<view class="text-content">{{blogItem.blogIntroduction ? blogItem.blogIntroduction : "暂无简介"}}</view>
					<view>
						<view class="cu-tag data-author">
							<u-icon name="eye-fill" size="28"></u-icon>
							<view class="cu-tag-text">{{blogItem.viewNum}}</view>
						</view>
						<view class="cu-tag data-author">
							<u-icon name="star-fill" size="28"></u-icon>
							<view class="cu-tag-text">{{blogItem.collectNum}}</view>
						</view>
						<view class="cu-tag data-author">
							<u-icon name="chat-fill" size="28"></u-icon>
							<view class="cu-tag-text">{{blogItem.commonNum}}</view>
						</view>
						<view class="cu-tag data-time">{{blogItem.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "blogArticle",
		props: {
			blogItem: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			toBlogDetail() {
				uni.navigateTo({
					url: '/pages/blogDetail/blogDetail?blogId=' + this.blogItem.blogId
				})
			}
		}
	}
</script>

<style scoped>
	.cu-card {
		border-bottom: solid 2rpx #f3f3f3;
		display: block;
	}

	.cu-card {
		overflow: hidden;
	}

	.article>.cu-item {
		margin: 0rpx;
		border-radius: 0rpx;
		padding-bottom: 30rpx;
	}

	.cu-card>.cu-item {
		display: block;
		background-color: #ffffff;
		overflow: hidden;
		border-radius: 10rpx;
	}

	.title {
		font-size: 30rpx;
		font-weight: 900;
		color: #333333;
		line-height: 100rpx;
		padding: 0 30rpx;
	}

	.content {
		display: flex;
		padding: 0 30rpx;
	}

	.text-cut {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.content>image {
		width: 240rpx;
		height: 180rpx;
		margin-right: 20rpx;
		border-radius: 6rpx;
	}

	.desc {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.content .text-content {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		word-break: break-all;
		font-size: 28rpx;
		color: #888;
		height: 4.8em;
		overflow: hidden;
		vertical-align: middle;
		line-height: 1.6;
	}

	.data-author {
		background: none !important;
		padding-left: 0px !important;
		color: #999;
	}

	.cu-tag {
		font-size: 24rpx;
		vertical-align: middle;
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 0rpx 16rpx;
		height: 48rpx;
		font-family: Helvetica Neue, Helvetica, sans-serif;
		white-space: nowrap;
	}

	.cu-tag-text {
		margin-left: 6rpx;
	}

	.data-time {
		background: none !important;
		color: #999 !important;
		float: right;
		padding: 0;
	}
</style>
