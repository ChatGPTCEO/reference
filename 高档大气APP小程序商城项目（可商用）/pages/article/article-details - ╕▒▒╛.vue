<template>
	<view>
		<header-article :userAvatar="articleDetail.userAvatar" :userName="articleDetail.userName" :userGrade="articleDetail.userGrade"></header-article>
		<view class="w-100" :style="'height:' + commonnavHeight + 'px;'"></view>
		<view v-if="articleDetail.video"><video :src="articleDetail.video"></video></view>
		<view class="w-100" v-else>
			<swiper :indicator-dots="true" circular indicator-active-color="#FFA5C4" indicator-color="#ffffff" class="swiper-box">
				<swiper-item v-for="(item, index) in articleDetail.image" :key="index">
					<view class="swiper-item"><image :src="item" mode="aspectFill" /></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="flex-1 mx-3 py-2">
			<view class="font-s-6 article-title">{{ articleDetail.title }}</view>
			<view class="font-s-5 mt-1 article-brief">
				<text>{{ articleDetail.content }}</text>
			</view>
		</view>
		<view class="flex-1 mx-3 py-3 row-ac-sb text-light-grey font-s-1 border-bottom">
			<view>{{ articleDetail.createdAt }}</view>
			<view class="row-ac" @click="startArticle">
				<text v-if="!articleDetail.isFabulous" class="iconfont icon-heart1"></text>
				<text v-else class="iconfont icon-heart-2-01 text-main-color"></text>
				<text class="ml-1">{{ articleDetail.fabulousCount }}</text>
			</view>
		</view>
		<view class="article-comment flex-1 mx-3">
			<view class="font-s-3 py-3">共{{ articleDetail.commentCount }}条评论</view>
			<view v-for="item in articleDetail.comment" :key="item.id">
				<view class="d-f">
					<view class="comment-user-img-box py-2" style="width: 66rpx;"><image :src="item.img" class="comment-user-img"></image></view>
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
								<view class="comment-user-img-box py-2" style="width: 66rpx;"><image :src="childrenCommentItem.img" class="comment-user-img"></image></view>
								<view class="flex-1 ml-2">
									<view class="d-f">
										<view class="flex-1 mr-5">
											<view class="font-s-3 text-light-grey">{{ childrenCommentItem.username }}</view>
											<view class="font-s-2 mt" @click="showComment(item)">
												{{ childrenCommentItem.commentContent }}
												<text class="ml-1 font-s-1 text-light-grey">{{ childrenCommentItem.createdAt }}</text>
											</view>
										</view>
										<view class="d-f flex-column align-center content-comment " @click="startComment(childrenCommentItem)">
											<view class="iconfont icon-guanzhu"></view>
											<view class="font-s-1" v-if="childrenCommentItem.fabulousCount > 0">{{ childrenCommentItem.fabulousCount }}</view>
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
			<view class="flex-1 mx-2">
				<input focus type="text" v-model="commentForm.commentContent" placeholder="你也来说点什么吧" class="comment-input" />
			</view>
			<view class="release-box row bg-color font-s-3" @click="submitComment">发布</view>
			<view class="release-cancel row mx-2 font-s-3 bg-warning text-white" @click="cancleComment">取消</view>
		</view>

		<view class=" fixed-bottom bg-white border-top " v-else>
			<view class="row-ac flex-1 mx-3 comment-bottom-box">
				<view class="row-ac comment-box flex-1" @click="showComment"><text class="ml-2 text-light-grey font-s-3">你也来说点什么吧</text></view>
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
				<view class="row-ac comment-unm">
					<text class="iconfont icon-xiaoxi1"></text>
					<text class="font-s-2 ml-1">{{ articleDetail.commentCount }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import headerArticle from '@/components/common/common-header/header-article';
import { getArticleDetailUrl, articleCollectionOptionUrl, articleStartOptionUrl, commentArticleUrl, commentStartOptionUrl } from '@/api/index';
import { debounce } from '@/utils/util';

export default {
	components: {
		headerArticle
	},
	data() {
		return {
			commonnavHeight: 50,
			articleDetail: {
				comment: [
					{
						children: []
					}
				]
			},
			commentForm: {
				commentStatus: false,
				commentContent: '',
				pid: 0
			}
		};
	},
	onLoad(options) {
		this.initData(options);
	},
	created() {
		//接收组件传送元素高度
		uni.$on('commonNav', res => {
			this.commonnavHeight = res;
			console.log(this.commonnavHeight);
		});
	},
	methods: {
		initData(options) {
			this.getArticleDetail(options.id);
		},
		// 获取文章详情
		getArticleDetail(articleId) {
			this.$R.get(getArticleDetailUrl + articleId).then(res => {
				this.articleDetail = res.data;
				console.log('++++++++++++++++');
				console.log(this.articleDetail);
			});
		},
		// 收藏、取消收藏文章
		collectionArticle: debounce(function(goodsId, count) {
			if (this.articleDetail.isCollection) {
				console.log(1);
				// 取消收藏
				this.$R.put(articleCollectionOptionUrl + this.articleDetail.id, { status: 0 }).then(res => {
					this.articleDetail.isCollection = !this.articleDetail.isCollection;
					uni.showToast({
						icon: 'none',
						title: '取消收藏成功'
					});
					this.articleDetail.collectionCount--;
				});
			} else {
				console.log(0);
				this.$R.put(articleCollectionOptionUrl + this.articleDetail.id, { status: 1 }).then(res => {
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
			console.log(this.articleDetail.isFabulous);
			if (this.articleDetail.isFabulous) {
				console.log(1);
				// 取消收藏
				this.$R.put(articleStartOptionUrl + this.articleDetail.id, { status: 0 }).then(res => {
					this.articleDetail.isFabulous = !this.articleDetail.isFabulous;
					uni.showToast({
						icon: 'none',
						title: '已取消点赞'
					});
					this.articleDetail.fabulousCount--;
				});
			} else {
				console.log(0);
				this.$R.put(articleStartOptionUrl + this.articleDetail.id, { status: 1 }).then(res => {
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
			console.log(commentInfo);
			console.log(Boolean(commentInfo.isFabulous));
			if (commentInfo.isFabulous) {
				console.log(1);
				// 取消收藏
				this.$R.put(commentStartOptionUrl + commentInfo.id, { status: 0 }).then(res => {
					commentInfo.isFabulous = !commentInfo.isFabulous;
					uni.showToast({
						icon: 'none',
						title: '已取消点赞'
					});
					commentInfo.fabulousCount--;
				});
			} else {
				console.log(0);
				this.$R.put(commentStartOptionUrl + commentInfo.id, { status: 1 }).then(res => {
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
			console.log(commentItem);
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
			console.log(this.commentForm);
			if (this.commentForm.commentContent) {
				this.$R.put(commentArticleUrl + this.articleDetail.id, this.commentForm).then(res => {
					console.log(res);
					this.commentForm.commentStatus = false;
					this.commentForm.pid = 0;
					this.commentForm.commentContent = '';
					this.getArticleDetail(this.articleDetail.id);
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper-box {
	width: 750rpx;
	height: 960rpx;

	.swiper-item {
		width: 750rpx;
		height: 960rpx;
		// image{
		// 	width: 750rpx;
		// 	height: 960rpx;
		// }
	}
}

.article-title {
	font-weight: 500;
}

.article-brief {
	font-weight: 400;
	color: #525252;
}

.user-img {
	width: 65rpx;

	image {
		width: 65rpx;
		height: 65rpx;
		border-radius: 50%;
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
.comment-input-box{
	height: 140rpx;
	background-color: #FFFFFF;
	.comment-input {
		height: 66rpx;
		line-height: 66rpx;
		padding-left:20rpx;
		font-size: 26rpx;
		background-color: #f4f4f4;
		border-radius: 33rpx;
	}
	.release-box{
		width: 110rpx;
		height: 60rpx;
		border-radius: 12rpx;
	}
	.release-cancel{
		width: 110rpx;
		height: 60rpx;
		border-radius: 12rpx;
	}
}
</style>
