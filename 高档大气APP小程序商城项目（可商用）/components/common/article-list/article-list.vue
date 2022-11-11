<template>
	<view class="flex-1">
		<view class="swiper-item-list">
			<view class="article-item w-100 bg-white mb-2" v-for="(item, index) in list" :key="index" @click="toArticleDetails(item)">
				<view class="article-img">
					<image class="item-img" :src="item.image[0] || item.videoCover" mode="widthFix"></image>
					<view class="icon-video row" v-if="item.videoCover != ''"><text class="iconfont icon-bofang"></text></view>
				</view>
				<view class="flex-1 mx-2">
					<view class="in2line font-w font-s-4 article-introduction">{{ item.title }}</view>
					<view class="row-ac-sb py-2 text-light-grey">
						<view class="row-ac">
							<image :src="item.userImage" class="user-img" mode=""></image>
							<view class="ml-1 font-s-1">{{ item.userName }}</view>
						</view>
						<view class="row-ac">
							<view class="iconfont icon-heart-2-01"></view>
							<view class="font-s-1 ml-1">{{ item.fabulousCount }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'articleList',
	data() {
		return {
			itemImgHeight: ''
		};
	},
	props: {
		list: {
			item: Object,
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		toArticleDetails(item) {
			if (item.videoCover === '' && item.videoCover != 'null') {
				uni.navigateTo({
					url: '/pages/article/article-details?id=' + item.id
				});
			} else {
				uni.navigateTo({
					url: '/pages/article/article-video?id=' + item.id
				});
			}
		}
	}
};
</script>

<style lang="scss">
.swiper-item-list {
	width: 361rpx;
	.article-item {
		border-radius: 12rpx;
	}
	.article-img {
		width: 361rpx;
		height: 100%;
		flex-shrink: 0;
		position:relative;
		.item-img {
			border-radius: 12rpx 12rpx 0 0;
			width: 361rpx;
			max-height: 485rpx;
		}
		.icon-video{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background-color: rgba(0,0,0,.2);
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			.iconfont{
				font-size: 18rpx;
				color: #FFFFFF;
			}
		}
	}
	.article-introduction {
		line-height: 1.5;
		color: #666;
	}
	.user-img {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
	}
	.iconfont {
		font-size: 23rpx;
		color: #B4B4B4;
	}
}
</style>
