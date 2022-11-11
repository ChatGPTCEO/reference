<template>
	<view>
		<navigationBar :text="blogDetail.blogName ? blogDetail.blogName : '文章详情'" backgroundColor="#5af" :back="true">
		</navigationBar>
		<divisionLine></divisionLine>
		<loading v-if="loading"></loading>
		<view v-else>
			<view class="info-title">{{blogDetail.blogName}}</view>
			<view class="info-tyle">
				<text class="text-blue">{{blogDetail.typeName}}</text>
				<text class="info-date">{{blogDetail.createTime}}</text>
			</view>
			<view class="cover-image">
				<u--image :showLoading="true" v-if="blogDetail.blogCoverImg" :src="blogDetail.blogCoverImg" :fade="true"
					duration="450" width="100%" height="300rpx" @click="click">
					<view slot="error" style="font-size: 24rpx;">加载失败</view>
				</u--image>
			</view>
			<view class="info-content">
				<markdownParse :resource="blogDetail.contentMd"></markdownParse>
			</view>
			<!-- <talkGroup></talkGroup> -->
			<liability :text="liability"></liability>
			<anchorLine leftText="评论区" leftIconName="plus" rightText="发表评论" v-if="commentList.length > 0">
			</anchorLine>
			<view class="info-comment">
				<view class="cu-item-comment" v-for="(item,index) in commentList" :key="index">
					<view class="comment-img">
						<u-avatar :size="72" :src="item.userCoverImg"></u-avatar>
					</view>
					<view class="comment-content">
						<view class="main-name">
							<view>{{item.nickName}}</view>
							<view style="flex-grow: 1;"></view>
							<view v-if="userInfo.userId == item.userId" style="font-size: 26rpx;"
								@click="delComment(item.id)">删除</view>
						</view>
						<view class="main-msg">{{item.content}}</view>
						<view class="other-msg" v-if="item.sonComments.length > 0">
							<view v-for="(sonItem,sonIndex) in item.sonComments" :key="sonIndex">
								{{sonItem.nickName}}:{{sonItem.content}}
							</view>
						</view>
						<view class="main-footer">
							<view class="foot-time">{{item.createTime}}</view>
							<view style="flex-grow: 1;"></view>
							<view @click="addCommentByParent(item.id)">
								<u-icon name="chat" size="32"></u-icon>
							</view>

						</view>
					</view>
				</view>
			</view>

			<view style="height: 100rpx;width: 100%;"></view>
			<view class="info-footer grid col-2">
				<view class="info-footer-input">
					<u--input placeholder="留下评论&吐槽" v-model="comment" prefixIcon="edit-pen" border="surround" clearable
						:focus="hasFocus" shape="circle" @confirm="addComment" @clear="clear">
					</u--input>
				</view>
				<view class="info-footer-btn">
					<view @click="handleLike">
						<u-icon name="thumb-up" size="64" :color="isLike ? '#ff0000' : '#606266'"></u-icon>
					</view>
					<view @click="handleCollect">
						<u-icon name="heart" size="64" :color="isCollect ? '#ff0000' : '#606266'"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import markdownParse from '@/uni/markdownParse/index.vue'
	import blogApi from '@/api/blogApi.js'
	import userApi from '@/api/userApi.js'
	import sysConfigApi from "@/api/sysConfigApi.js"
	import sysConstant from '@/utils/sys-constant.js'
	let app = getApp()
	export default {
		components: {
			markdownParse
		},
		data() {
			return {
				userInfo: {},
				isLogin: false,
				loading: false,
				blogId: 0,
				userInfo: {},
				blogDetail: {},
				isLike: false,
				isCollect: false,
				comment: '',
				commentList: [],
				parentId: 0,
				hasFocus: false,
				liability: ''
			}
		},
		onLoad(param) {
			let blogId = param.blogId
			this.blogId = blogId ? blogId : 0
			this.getBlogDetail()
		},
		onShow() {
			this.isLogin = app.globalData.isLogin
			this.userInfo = app.globalData.userInfo
			this.checkUserHandle()
			this.getComment()
			this.init()
		},
		methods: {
			async init() {
				let res = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.LIABILITY)
				this.liability = res.data
			},
			clear() {
				this.comment = ''
			},
			async getBlogDetail() {
				this.loading = true
				let res = await blogApi.getBlogDetail(this.blogId)
				this.blogDetail = res.data
				this.loading = false
			},
			addCommentByParent(id) {
				this.parentId = id
				this.hasFocus = true
			},
			async addComment() {
				if (!this.comment) return
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				let param = {}
				param.content = this.comment
				param.blogId = this.blogId
				param.parentId = this.parentId
				let res = await blogApi.addComment(param)
				this.comment = ''
				this.parentId = 0
				this.hasFocus = false
				this.getComment()
			},
			async delComment(id) {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				let ids = [id]
				let res = await blogApi.delComment(ids)
				this.getComment()
			},
			async getComment() {
				let res = await blogApi.getBlogComment(this.blogId)
				this.commentList = res.data
			},
			// 检测用户是否已经关注
			async checkUserHandle() {
				if (this.isLogin) {
					let res = await userApi.existAttentionBlog(this.blogId)
					let res1 = await userApi.existLikeBlog(this.blogId)
					this.isCollect = res.data
					this.isLike = res1.data
				}
			},
			async handleCollect() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				let handleType = this.isCollect ? 1 : 0
				let res = await userApi.attentionBlog(this.blogId, handleType);
				this.isCollect = !this.isCollect
			},
			async handleLike() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				let handleType = this.isLike ? 1 : 0
				let res = await userApi.likeBlog(this.blogId, handleType);
				this.isLike = !this.isLike
			}
		}
	}
</script>

<style scoped>
	.cover-image {
		margin: 20rpx 40rpx;

	}

	.info-title {
		padding: 40rpx 30rpx 20rpx 30rpx;
		font-size: 32rpx;
		line-height: 60rpx;
		font-weight: bold;
		background: #fff;
	}

	.info-tyle {
		padding: 0rpx 30rpx 20rpx 30rpx;
		font-size: 24rpx;
		background: #fff;
		border-bottom: solid 1px #f3f3f3;
	}

	.text-blue {
		color: #0081ff;
	}

	.info-date {
		float: right;
		color: #999;
	}

	.info-content {
		background: #fff;
		font-size: 28rpx;
		line-height: 50rpx;
		padding: 10rpx 30rpx 40rpx 30rpx;
		text-align: justify;
	}

	.menu-avatar {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-bottom: solid 1px #f3f3f3;
	}

	.cu-item {
		position: relative;
		display: flex;
		padding-right: 10rpx;
		height: 140rpx;
		background-color: #ffffff;
		align-items: center;
	}

	.cu-item image {
		height: 100rpx;
		width: 100rpx;
		margin: 0 30rpx;
	}

	.text-gray {
		font-size: 30rpx;
		display: flex;
		align-items: center;
		color: #8799a3;
	}

	.content {
		flex-grow: 1;
	}

	.text-gray,
	.line-gray,
	.lines-gray {
		color: #aaaaaa;
	}

	.text-sm {
		font-size: 24rpx;
	}

	.flex {
		display: flex;
	}

	.info {
		width: 100rpx;
		text-align: center;
		color: #0081ff;
	}

	.info-footer {
		position: fixed;
		z-index: 200;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		border-top: #eee solid 1px;
		display: flex;
		align-items: center;
	}

	.info-footer-input {
		width: 70%;
		padding: 15rpx 30rpx;
	}

	.info-footer-btn {
		width: 30%;
		padding-right: 20rpx;
		font-size: 50rpx;
		line-height: 100rpx;
		display: flex;
	}

	.info-footer-btn view {
		display: flex;
		align-items: center;
		margin: 0 26rpx;
	}

	.info-comment {
		margin-top: 10rpx;
	}

	.cu-item-comment {
		padding: 30rpx 30rpx 30rpx 120rpx;
		height: auto;
		position: relative;
		display: flex;
		background-color: #ffffff;
		align-items: center;
	}

	.comment-img {
		position: absolute;
		left: 30rpx;
		top: 30rpx;
	}

	.comment-content {
		margin-left: 10rpx;
	}

	.main-name {
		font-size: 30rpx;
		display: flex;
		align-items: center;
		color: #8799a3;
	}

	.main-msg {
		word-break: break-all;
		vertical-align: middle;
		line-height: 1.6;
		font-size: 28rpx;
	}

	.other-msg {
		color: #8799a3;
		background-color: #e7ebed;
		border-radius: 6rpx;
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
		width: 550rpx;
	}

	.other-msg view {
		margin: 10rpx 0;
	}

	.main-footer {
		margin: 10rpx 0;
		display: flex;
		width: 590rpx;
	}

	.foot-time {
		color: #aaaaaa;
		font-size: 28rpx;
	}
</style>
