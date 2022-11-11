<template>
	<view>
		<view class="w-100 bg-white border-bottom fixed-top common-header">
			<view :style="'height:' + statusBarheight + 'px;'"></view>
			<view class="flex-1 mx-2 pb-1 row-ac">
				<view class="font-s-5" @click="toBack">取消</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="w-100" :style="'height:' + commonHeaderHeight + 'px;'"></view>

		<view class="mt-2 mx-3">
			<view class="row-ac flex-wrap mt-2">
				<view v-if="articleForm.videoSrc">
					<view class="video-box py-2">
						<video class="article-video" :src="articleForm.videoSrc"></video>
						<view class="iconfont icon-shanchu1 font-s-2 text-main-color row" style="z-index: 9999;"
							@click="deleteVideo"></view>
					</view>
					<view class="progress-box" style="width: 700rpx">
						<progress :percent="videoProgress" activeColor="red" active stroke-width="8" />
					</view>
				</view>
				<view v-else class="d-f flex-wrap">
					<view class="evaluate-img-box" v-for="(item, index) in articleForm.seeImages" :key="index">
						<image class="evaluate-img" :src="item"></image>
						<view class="iconfont icon-shanchu1 font-s-2 text-main-color row" @click="deleteImg(index)">
						</view>
					</view>
					<view class="img-box border row" v-if="articleForm.seeImages.length < 9">
						<view class="iconfont icon-jiahao" @click="chooseUploadFile"></view>
					</view>
					<view class="img-box border row" v-if="articleForm.seeImages.length < 1">
						<view class="iconfont icon-shipin" style="font-size: 45rpx;" @click="chooseUploadVideoFile">
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 视频封面弹窗 -->
		<view class="flex-1 mx-3 py-3 border-top" @touchmove.stop.prevent v-if="articleForm.dialogStatus">
			<view class="text-main-color font-s-3" v-if="articleForm.seeVideoCover < 1">请上传一张视频封面吧</view>
			<view class="text-light-grey font-s-3" v-if="articleForm.seeVideoCover">视频封面</view>
			<view class="img-box border row mt-2">
				<img v-if="articleForm.seeVideoCover" :src="articleForm.seeVideoCover" />
				<view v-else class="iconfont icon-jiahao" @click="chooseUploadVideoCoverFile"></view>
			</view>
		</view>
		<view class="flex-1 border-bottom mx-3 mt-4"><input type="text" v-model="articleForm.title"
				class="content-input" placeholder="输入标题更多点赞哟!" /></view>
		<view class="flex-1 mx-3"><textarea type="text" v-model="articleForm.content" class="content-input"
				maxlength="-1" placeholder="添加正文" /></view>
		<!-- 分类 -->
		<view class="flex-1 mx-3" style="margin-bottom: 100rpx">
			<view class="font-s-2 text-light-grey">选择话题</view>
			<view class="flex-1 mt-2">
				<scroll-view scroll-x class="scroll-row">
					<view class="scroll-row-item mr-2" v-for="item in articleClassificationList" :key="item.id"
						@click="articleClassificationItemClick(item)"
						:class="{ active: articleForm.articleTypeId == item.id }">
						<view class="font-s-3 topic-title">#{{ item.title }}</view>

					</view>
				</scroll-view>
				<view></view>
			</view>
		</view>

		<!-- 关联商品 -->
		<view>
			<view @click="toRelationProd">关联商品</view>
			<view v-if="articleForm.productData && articleForm.productData.id">
				<image :src="articleForm.productData.slide_list.img" class="cate-like" lazy-load></image>
				<view class="cate-text in2line">{{ articleForm.productData.title }}</view>
				<view class="cate-item">
					<view class="cate-price">￥{{articleForm.productData.price}}</view>
					<view class="cate-tariff">
						原价￥{{articleForm.productData.marketPrice || articleForm.productData.market_price || ''}}</view>
				</view>

				<view @click="removeSelectProd">移除商品</view>
			</view>
		</view>
		<view class="row fixed-bottom flex-1" style="height: 130rpx;">
			<view class="row bg-color font-s-5  srtivcle-hair" @click="submitArticle">发表心情</view>
		</view>


	</view>
</template>

<script>
	import {
		releaseArticleUrl,
		getArticleClassificationUrl,
		uploadCloudVideosUrl,
		fileUploadUrl
	} from '@/api/index'

	export default {
		data() {
			return {
				commonHeaderHeight: '',
				statusBarheight: '',
				articleForm: {
					title: '',
					content: '',
					articleTypeId: '',
					image: [],
					seeImages: [],
					video: '',
					videoSrc: '',
					introduction: '',
					subtitle: '',
					dialogStatus: false,
					videoCover: '',
					seeVideoCover: '',
					productData: {},
					productId: []
				},
				videoProgress: '',
				categoryQueryInfo: {
					pid: 1,
					isOpen: 1
				},
				articleClassificationList: []
			}
		},
		mounted() {
			//计算顶部元素高度
			uni.createSelectorQuery()
				.in(this)
				.select('.common-header')
				.boundingClientRect(res => {
					this.commonHeaderHeight = res.height
				})
				.exec()
		},
		//获取屏幕信息
		created() {
			let obj = {}
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect()
			// #endif

			uni.getSystemInfo({
				success: res => {
					this.width = obj.left || res.windowWidth
					this.statusBarheight = res.statusBarHeight + 5 //获取顶部状态栏高度+3个像素
					//微信右上角胶囊按纽占比
					// #ifdef MP-WEIXIN
					this.watchButtonWidth = ((obj.width + 10) / res.windowWidth) * 100
					this.appPussWidth = 100 - this.watchButtonWidth
					// #endif
				}
			})
		},
		onLoad() {
			this.getArticleClassificationList()
			this.getSelectGood()
		},
		onShow() {
			this.getSelectGood()
		},
		methods: {
			// 获取分类标签
			getArticleClassificationList() {
				this.$R.get(getArticleClassificationUrl, this.categoryQueryInfo).then(res => {
					this.articleClassificationList = res.data
				})
			},
			// 文章分类点击事件
			articleClassificationItemClick(articleClassificationInfo) {
				this.articleForm.articleTypeId = articleClassificationInfo.id
			},
			// 选择上传图片
			chooseUploadFile() {
				if (this.articleForm.video.length > 0) {
					return uni.showToast({
						icon: 'none',
						title: '图片或视频只能选择一个进行上传'
					})
				}
				let url = this.$R.baseUrl()
				let that = this
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera '], //从相册选择
					success: function(res) {
						that.articleForm.seeImages = res.tempFilePaths

						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: url + fileUploadUrl,
								filePath: item,
								name: 'file',
								formData: {
									//'file': 'test'
								},
								// 请求头一定要加，否则 iOS 图片上传会失败
								header: {
									'content-type': 'multipart/form-data'
								},
								success: uploadFileRes => {
									let result = JSON.parse(uploadFileRes.data)
									if (result.code !== 200) {
										uni.showToast({
											title: result.msg,
											icon: 'none'
										})
									} else {
										that.articleForm.image.push(result.data)
									}
								}
							})
						})
					}
				})
			},

			// 上传视频封面
			chooseUploadVideoCoverFile() {
				let url = this.$R.baseUrl()
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera '], //从相册选择
					success: function(res) {
						that.articleForm.seeVideoCover = res.tempFilePaths

						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: url + fileUploadUrl,
								filePath: item,
								name: 'file',
								formData: {
									//'file': 'test'
								},
								// 请求头一定要加，否则 iOS 图片上传会失败
								header: {
									'content-type': 'multipart/form-data'
								},
								success: uploadFileRes => {
									let result = JSON.parse(uploadFileRes.data)
									if (result.code !== 200) {
										uni.showToast({
											title: result.msg,
											icon: 'none'
										})
									} else {
										that.articleForm.videoCover = result.data
										// that.articleForm.dialogStatus = false;
									}
								}
							})
						})
					}
				})
			},
			// 上传腾讯云点播
			chooseUploadVideoFile() {
				if (this.articleForm.image.length > 0) {
					return uni.showToast({
						icon: 'none',
						title: '图片或视频只能选择一个进行上传'
					})
				}
				let url = this.$R.baseUrl()
				let that = this
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						that.articleForm.videoSrc = res.tempFilePath
						that.articleForm.dialogStatus = true
						var uploadTask = uni.uploadFile({
							url: url + uploadCloudVideosUrl, //仅为示例，非真实的接口地址
							filePath: res.tempFilePath,
							name: 'file',

							success: uploadFileRes => {
								let result = JSON.parse(uploadFileRes.data)
								if (result.code !== 200) {
									console.log("33333333333333333333");
									console.log(result)
									uni.showToast({
										title: result.msg,
										icon: 'none'
									})
								} else {
									that.articleForm.video = result.data.url
									that.articleForm.dialogStatus = true
								}
							}
						})
						uploadTask.onProgressUpdate((taskRes) => {
							this.videoProgress = taskRes.progress.data
							
						})
					}
				})
			},
			// 删除上传的图片
			deleteImg(index) {
				this.articleForm.seeImages.splice(index, 1)
				this.articleForm.image.splice(index, 1)
			},
			// 删除已经上传的视频
			deleteVideo() {
				this.articleForm.videoSrc = ''
				this.articleForm.video = ''
				this.articleForm.seeVideoCover = ''
				this.articleForm.videoCover = ''
			},
			// 跳转到选择商品页面
			toRelationProd() {
				uni.navigateTo({
					url: '/pages/index/search/search?type=relationProd'
				});
			},
			// 获取用户选择的商品
			getSelectGood() {
				this.articleForm.productData = this.$store.state.userSelectProdItem;
				this.$store.commit('setUserSelectProdItem', {})
			},
			// 移除商品
			removeSelectProd() {
				this.articleForm.productData = {}
			},

			// 发布文章
			submitArticle() {
				if (this.articleForm.seeVideoCover) {
					if (!this.articleForm.video) {
						return uni.showToast({
							icon: 'none',
							title: '视频正则上传服务器中，请稍等一下子再发表心情吧'
						})
					}
				}
				this.articleForm.productId = []
				if (this.articleForm.productData.id) {
					this.articleForm.productId.push(this.articleForm.productData.id)
				}
				this.$R.post(releaseArticleUrl, this.articleForm).then(res => {
					uni.showToast({
						icon: 'none',
						title: '发布成功，2秒后将返回上一页'
					})
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 2000)
				})
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.save-draft {
		width: 125rpx;
		height: 58rpx;
		border-radius: 12rpx;
		background-color: #22a0e1;
		color: #ffffff;
	}

	.img-box {
		width: 150rpx;
		height: 150rpx;
		border-radius: 8rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;

		.iconfont {
			color: #c8c8c8;
			font-size: 40rpx;
		}
	}

	.video-box {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;

		.article-video {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}

		.icon-shanchu1 {
			margin-top: -210rpx;
			position: relative;
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background-color: #7d7d7d;
			color: #ffffff;
			float: right;
		}
	}

	.evaluate-img-box {
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;

		.evaluate-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 10rpx;
		}

		.icon-shanchu1 {
			margin-top: -210rpx;
			position: relative;
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background-color: #7d7d7d;
			color: #ffffff;
			float: right;
		}
	}

	.content-input {
		padding: 20rpx 30rpx;
	}

	.srtivcle-hair {
		width: 460rpx;
		height: 90rpx;
		border-radius: 45rpx;
	}

	.active .topic-title {
		color: #0081FF;
	}
</style>
