<template>
	<view>
		<view :style="'height:' + windowHeight + 'px;'" style="background-color: #000;">
			<view class="swiper-box w-100">
				<swiper circular indicator-active-color="#FFA5C4" indicator-color="#ffffff"
					:style="'height:' + windowHeight + 'px'" @change="swiperCurrent" :current='comCurrentImg'>
					<swiper-item v-for="(item, index) in articleDetail.image" :key="index">
						<view class="swiper-item row flex-wrap" :style="'height:' + windowHeight + 'px'">
							<view class="flex-1">
								<image :src="item" class="swiper-image" mode="widthFix" />
								<view class="font-s-71 current-number">
									<view class="row-ac">
										<text class="number-box row">{{ comCurrentImg+1 }}</text>/<text
											class="number-box row">{{ articleDetail.image.length }}</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="header-box flex-1 text-white">
				<view style="height: 80rpx;"></view>
				<view class="row-ac flex-1 mx-2">
					<view class="row-ac">
						<view style="width: 80rpx;height: 80rpx;" class="row" @click="toBack">
							<text class="iconfont icon-back2-01"></text>
						</view>
						<image :src="articleDetail.userAvatar" class="user-img ml-2" mode=""></image>
						<view class="font-s-4 ml-1">{{ articleDetail.userName }}</view>
					</view>
				</view>
				<view class="flex-1 mx-3 in1line text-center article-title mt-2">{{ articleDetail.title }}</view>
			</view>
			<view class="fixed-right">
				<view class="row-a-j-fc icon-box" @tap="clicksWitchEmit">
					<view class="iconfont icon-yijianfankui"></view>
					<view class="font-s-2 mt">{{ articleDetail.commentCount }}</view>
				</view>
				<view class="row-a-j-fc icon-box" @tap="startArticle">
					<view v-if="!articleDetail.isFabulous" class="iconfont icon-heart1"></view>
					<view v-else class="iconfont icon-heart-2-01 text-main-color"></view>
					<view class="font-s-2 mt">{{ articleDetail.fabulousCount }}</view>
				</view>

			</view>
			<view class="foot-box flex-1 text-white">
				<view class="flex-1 mx-3 mb-2">
					<text class="font-s-4 in2line">{{ articleDetail.content }}</text>
				</view>
				<view class="flex-1 mx-3">
					<view class="flex-1 product-box row-ac" v-for="(item,index) in articleDetail.productData"
						:key="index" v-if="index < 1" @click="toProduct(item)">
						<image :src="item.img.img" class="product-img ml-1" mode=""></image>
						<view class="flex-1 mx-3 d-f justify-between flex-column" style="height: 160rpx;">
							<view class="font-s-4 in2line mt-1">{{ item.title }}</view>
							<view class="flex-1 row-ac-sb">
								<view class="row-ac mb-1">
									<view class="font-s-7"><text class="font-s-1">￥</text> {{ item.price }}</view>
									<view class="font-s-2 ml-3 text-de">￥{{ item.marketPrice }}</view>
								</view>
								<view class="to-buy bg-color row font-s-3">前往购买</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<window-popup @clicks-witch="clicksWitchEmit" :popupHeight="1100">
			<view class="article-comment flex-1 mx-3">
				<view class="font-s-3 py-3">共{{ articleDetail.commentCount }}条评论</view>
				<view v-for="item in articleDetail.comment" :key="item.id">
					<view class="d-f">
						<view class="comment-user-img-box py-2" style="width: 66rpx;">
							<image :src="item.img" class="comment-user-img"></image>
						</view>
						<view class="flex-1 ml-2 pt-2 border-bottom">
							<view class="d-f">
								<view class="flex-1 mr-5">
									<view class="font-s-3 text-light-grey">{{ item.username }}</view>
									<view class="font-s-2 mt" @click="showComment(item)">
										{{ item.commentContent }}
										<text class="ml-1 font-s-1 text-light-grey">{{ item.createdAt }}</text>
									</view>
								</view>
								<view class="d-f flex-column align-center content-comment " @click="startComment(item)">
									<view class="iconfont icon-guanzhu"></view>
									<view class="font-s-1" v-if="item.fabulousCount > 0">{{ item.fabulousCount }}</view>
								</view>
							</view>
							<view v-for="childrenCommentItem in item.children" :key="childrenCommentItem.id">
								<view class="d-f">
									<view class="comment-user-img-box py-2" style="width: 66rpx;">
										<image :src="childrenCommentItem.img" class="comment-user-img"></image>
									</view>
									<view class="flex-1 ml-2">
										<view class="d-f">
											<view class="flex-1 mr-5">
												<view class="font-s-3 text-light-grey">
													{{ childrenCommentItem.username }}
												</view>
												<view class="font-s-2 mt" @click="showComment(item)">
													{{ childrenCommentItem.commentContent }}
													<text
														class="ml-1 font-s-1 text-light-grey">{{ childrenCommentItem.createdAt }}</text>
												</view>
											</view>
											<view class="d-f flex-column align-center content-comment "
												@click="startComment(childrenCommentItem)">
												<view class="iconfont icon-guanzhu"></view>
												<view class="font-s-1" v-if="childrenCommentItem.fabulousCount > 0">
													{{ childrenCommentItem.fabulousCount }}
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 这个输入框是隐藏状态，点击下面说点什么之后显示 -->
			<view class="row-ac fixed-bottom comment-input-box flex-1" v-if="commentForm.commentStatus">
				<view class="flex-1 mx-2 mb-2">
					<input focus type="text" v-model="commentForm.commentContent" placeholder="你也来说点什么吧"
						class="comment-input ml-1" />
				</view>
				<view class="release-box mb-2 row bg-color font-s-3" @click="submitComment">发布</view>
				<view class="release-cancel mb-2 row mx-2 font-s-3 bg-warning text-white" @click="cancleComment">取消
				</view>
			</view>

			<view class="fixed-bottom bg-white border-top" v-else>
				<view class="row-ac flex-1 mx-3 comment-bottom-box mb-2">
					<view class="row-ac comment-box flex-1" @click="showComment">
						<text class="ml-2 text-light-grey font-s-3">你也来说点什么吧</text>
					</view>
					<view class="row-ac comment-unm" @click="collectionArticle">
						<text v-if="!articleDetail.isCollection" class="iconfont icon-collect-01"></text>
						<text v-else class="iconfont icon-collect2-01 text-main-color"></text>
						<text class="font-s-2 ml-1">{{ articleDetail.collectionCount }}</text>
					</view>
					<view class="row-ac comment-unm" @click="startArticle">
						<text v-if="!articleDetail.isFabulous" class="iconfont icon-heart1"></text>
						<text v-else class="iconfont icon-heart-2-01 text-main-color"></text>
						<text class="font-s-2 ml-1">{{ articleDetail.fabulousCount }}</text>
					</view>
				</view>
			</view>
		</window-popup>
	</view>
</template>

<script>
	import windowPopup from '@/components/common/window-popup';
	import {
		getArticleDetailUrl,
		articleCollectionOptionUrl,
		articleStartOptionUrl,
		commentArticleUrl,
		commentStartOptionUrl
	} from '@/api/index';
	import {
		debounce
	} from '@/utils/util';

	export default {
		components: {
			windowPopup
		},
		data() {
			return {
				windowHeight: '',
				comCurrentImg: 0,
				showPopup: false,
				articleDetail: {
					comment: [{
						children: []
					}]
				},
				commentForm: {
					commentStatus: false,
					commentContent: '',
					pid: 0
				}
			};
		},
		created() {
			uni.getSystemInfo({
				success: (res => {
					this.windowHeight = res.windowHeight
					uni.$emit('windowHeightEmit', this.windowHeight)
				})
			});
		},
		onLoad(options) {
			this.initData(options);
		},
		methods: {
			initData(options) {
				this.getArticleDetail(options.id);
			},
			swiperCurrent(e) {
				this.comCurrentImg = e.detail.current
			},
			// 获取文章详情
			getArticleDetail(articleId) {
				this.$R.get(getArticleDetailUrl + articleId).then(res => {
					this.articleDetail = res.data;
					//console.log('++++++++++++++++');
					//console.log(this.articleDetail);
				});
			},
			// 收藏、取消收藏文章
			collectionArticle: debounce(function(goodsId, count) {
				if (this.articleDetail.isCollection) {
					console.log(1);
					// 取消收藏
					this.$R.put(articleCollectionOptionUrl + this.articleDetail.id, {
						status: 0
					}).then(res => {
						this.articleDetail.isCollection = !this.articleDetail.isCollection;
						uni.showToast({
							icon: 'none',
							title: '取消收藏成功'
						});
						this.articleDetail.collectionCount--;
					});
				} else {
					console.log(0);
					this.$R.put(articleCollectionOptionUrl + this.articleDetail.id, {
						status: 1
					}).then(res => {
						this.articleDetail.isCollection = !this.articleDetail.isCollection;
						uni.showToast({
							icon: 'none',
							title: '添加收藏成功'
						});
						this.articleDetail.collectionCount++;
					});
				}
			}),
			// 点赞、取消点赞文章
			startArticle: debounce(function() {
				if (this.articleDetail.isFabulous) {
					console.log(1);
					// 取消收藏
					this.$R.put(articleStartOptionUrl + this.articleDetail.id, {
						status: 0
					}).then(res => {
						this.articleDetail.isFabulous = !this.articleDetail.isFabulous;
						uni.showToast({
							icon: 'none',
							title: '已取消点赞'
						});
						this.articleDetail.fabulousCount--;
					});
				} else {
					console.log(0);
					this.$R.put(articleStartOptionUrl + this.articleDetail.id, {
						status: 1
					}).then(res => {
						this.articleDetail.isFabulous = !this.articleDetail.isFabulous;
						uni.showToast({
							icon: 'none',
							title: '点赞成功'
						});
						this.articleDetail.fabulousCount++;
					});
				}
			}),
			// 点赞、取消点赞评论
			startComment: debounce(function(commentInfo) {
				if (commentInfo.isFabulous) {
					console.log(1);
					// 取消收藏
					this.$R.put(commentStartOptionUrl + commentInfo.id, {
						status: 0
					}).then(res => {
						commentInfo.isFabulous = !commentInfo.isFabulous;
						uni.showToast({
							icon: 'none',
							title: '已取消点赞'
						});
						commentInfo.fabulousCount--;
					});
				} else {
					console.log(0);
					this.$R.put(commentStartOptionUrl + commentInfo.id, {
						status: 1
					}).then(res => {
						commentInfo.isFabulous = !commentInfo.isFabulous;
						uni.showToast({
							icon: 'none',
							title: '点赞成功'
						});
						commentInfo.fabulousCount++;
					});
				}
			}),

			// 展示评论窗口
			showComment(commentItem) {
				if (commentItem.id) {
					// 对评论的评论
					this.commentForm.pid = commentItem.id;
					this.commentForm.commentContent = `@${commentItem.username} `;
				} else {
					// 对文章的评论
				}
				this.commentForm.commentStatus = true;
			},
			// 取消评论
			cancleComment() {
				this.commentForm.commentStatus = false;
				this.commentForm.pid = 0;
			},

			// 提交评论
			submitComment() {
				if (this.commentForm.commentContent) {
					this.$R.put(commentArticleUrl + this.articleDetail.id, this.commentForm).then(res => {
						//console.log(res);
						this.commentForm.commentStatus = false;
						this.commentForm.pid = 0;
						this.commentForm.commentContent = '';
						this.getArticleDetail(this.articleDetail.id);
					});
				}
			},
			toProduct(item) {
				uni.navigateTo({
					url: '/pages/product/product?productId=' + item.productId
				});
			},
			clicksWitchEmit() {
				this.showPopup = !this.showPopup
				uni.$emit('showPopup', this.showPopup)
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.swiper-box {
		width: 100%;
		position: absolute;

		.swiper-item {
			width: 100%;
			background-color: #000000;

			.current-number {
				color: #FFFFFF;
				float: right;
				position: relative;
				margin-top: -70rpx;
				margin-right: 20rpx;

				.number-box {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					background-color: rgba(86, 86, 86, 0.4);
				}
			}
		}
	}

	.header-box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		pointer-events: initial;

		.user-img {
			width: 42rpx;
			height: 42rpx;
			border-radius: 50%;
			border: 2rpx solid #FFFFFF;
		}

		.article-title {
			padding: 10rpx 20rpx;
			background-color: rgba(173, 173, 173, 0.2);
			border-radius: 6rpx;
		}
	}

	.fixed-right {
		width: 100rpx;
		position: fixed;
		bottom: 600rpx;
		right: 0rpx;
		z-index: 800;
		color: #FFFFFF;

		.icon-box {
			width: 100rpx;
			height: 150rpx;
		}

		.icon-yijianfankui {
			font-size: 70rpx;
		}

		.icon-heart1 {
			font-size: 70rpx;
		}

		.icon-heart-2-01 {
			font-size: 70rpx;
		}
	}

	.foot-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 50rpx;

		.product-box {
			height: 180rpx;
			border-radius: 18rpx;
			background-color: rgba(215, 215, 215, 0.2);

			.product-img {
				width: 160rpx;
				height: 160rpx;
				border-radius: 16rpx;
			}

			.to-buy {
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 12rpx;
				border-radius: 12rpx;
			}
		}
	}

	.article-comment {
		padding-bottom: 102rpx;
	}

	.comment-box {
		height: 66rpx;
		line-height: 66rpx;
		background-color: #f4f4f4;
		border-radius: 33rpx;

		.comment-input {
			padding: 15rpx 30rpx;
			font-size: 26rpx;
		}
	}

	.comment-user-img-box {
		width: 66rpx;

		.comment-user-img {
			width: 66rpx;
			height: 66rpx;
			border-radius: 50%;
		}
	}

	.content-comment {
		width: 66rpx;
		height: 120rpx;
	}

	.comment-bottom-box {
		height: 120rpx;

		.iconfont {
			font-size: 45rpx;
		}

		.comment-unm {
			margin-left: 20rpx;
		}
	}

	.comment-input-box {
		height: 140rpx;
		background-color: #FFFFFF;

		.comment-input {
			height: 66rpx;
			line-height: 66rpx;
			padding-left: 20rpx;
			font-size: 26rpx;
			background-color: #f4f4f4;
			border-radius: 33rpx;
		}

		.release-box {
			width: 110rpx;
			height: 60rpx;
			border-radius: 12rpx;
		}

		.release-cancel {
			width: 110rpx;
			height: 60rpx;
			border-radius: 12rpx;
		}
	}
</style>
