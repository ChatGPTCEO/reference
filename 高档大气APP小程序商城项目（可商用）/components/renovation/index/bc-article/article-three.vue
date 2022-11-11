<template>
	<view class="flex-1 mx-3 d-f justify-between mt-2">
		<view class="article-box">
			<view class="article-item flex-1" v-for="(item,index) in articleList.leftArr" :key="index"
				@click="toArticleDetails(item)">
				<view class="flex-1 img-box">
					<image class="article-img flex-1" :src="item.image[0] || item.videoCover" mode="widthFix"></image>
					<view class="icon-video row" v-if="item.videoCover != ''"><text class="iconfont icon-bofang"></text>
					</view>
					<view class="article-info text-white py-2">
						<view class="flex-1 mx-2 font-s-3 in1line">{{ item.title }}</view>
						<view class="row-ac flex-1 mx-2 mt-1">
							<image :src="item.userImage" class="user-image" mode=""></image>
							<view class="font-s-2 ml-1">{{ item.userName }}</view>
						</view>
					</view>
				</view>
				<view class="flex-1 mx-2 pb-2 pt-1" v-if="item.productData.length > 0">
					<view class="font-s-2 in2line">{{ item.productData[0].title }}</view>
					<view class="row-ac-sb">
						<view class="text-main-color font-s-6 font-w mt-1"><text
								class="font-s-1">￥</text>{{ item.productData[0].price }}</view>
						<view class="font-s-1 text-de text-light-grey mr-3">￥{{ item.productData[0].marketPrice }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="article-box">
			<view class="article-item flex-1" v-for="(item,index) in articleList.rightArr" :key="index"
				@click="toArticleDetails(item)">
				<view class="flex-1 img-box">
					<image class="article-img flex-1" :src="item.image[0] || item.videoCover" mode="widthFix"></image>
					<view class="icon-video row" v-if="item.videoCover != ''"><text class="iconfont icon-bofang"></text>
					</view>
					<view class="article-info text-white py-2">
						<view class="flex-1 mx-2 font-s-3 in1line">{{ item.title }}</view>
						<view class="row-ac flex-1 mx-2 mt-1">
							<image :src="item.userImage" class="user-image" mode=""></image>
							<view class="font-s-2 ml-1">{{ item.userName }}</view>
						</view>
					</view>
				</view>
				<view class="flex-1 mx-2 pb-2 pt-1" v-if="item.productData.length > 0">
					<view class="font-s-2 in2line">{{ item.productData[0].title }}</view>
					<view class="d-f justify-between align-stretch">
						<view class="text-main-color font-s-6 font-w mt-1"><text
								class="font-s-1">￥</text>{{ item.productData[0].price }}</view>
						<view class="font-s-1 text-de text-light-grey mr-3">￥{{ item.productData[0].marketPrice }}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getArticleListUrl
	} from '@/api/index.js';
	export default {
		data() {
			return {
				articleListOn: []
			}
		},
		props: {
			articleInfo: {
				type: [String, Object],
				default () {
					return {};
				},
			}
		},

		created() {
			this.articleTypeId = this.articleInfo.articleTypeId
			uni.$emit('articleTypeIdEmit', this.articleTypeId)
			uni.$on('articleListEmit', res => {
				this.articleListOn = res
			})
		},
		computed: {
			articleList() {
				let allArr = this.waterfallFlow(this.articleListOn)
				return allArr
			}
		},
		methods: {
			waterfallFlow(arr) {
				if (arr.length <= 0) {
					return false
				}
				let allArr = {
					leftArr: [],
					rightArr: []
				}
				let leftArr = []
				arr.forEach((item, index) => {
					if (index % 2 == 0) {
						allArr.leftArr.push(item)
					} else {
						allArr.rightArr.push(item)
					}
				})
				return allArr
			},
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
	}
</script>

<style lang="scss">
	.article-box {
		width: 335rpx;

		.article-item {
			margin-bottom: 20rpx;
			background-color: #FFFFFF;

			.img-box {
				position: relative;

				.article-img {}

				.icon-video {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, .2);
					position: absolute;
					top: 20rpx;
					right: 20rpx;

					.iconfont {
						font-size: 18rpx;
						color: #FFFFFF;
					}
				}

				.article-info {
					width: 100%;
					margin-top: -130rpx;
					background: linear-gradient(to bottom, rgba(0, 0, 0, .01), rgba(0, 0, 0, .8));
					position: absolute;

					.user-image {
						width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						border: 2rpx solid #FFFFFF;
					}
				}
			}
		}
	}
</style>
