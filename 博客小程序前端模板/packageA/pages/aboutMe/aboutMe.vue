<template>
	<view class="components-home">
		<view class="bgImg">
			<view class="bannerBox">
				<swiper style="height: 680rpx;" class="swiper" @change="cardSwiper" circular="true"
					indicator-dots="true" autoplay="true" interval="4000" duration="600">
					<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
						<view class="swiper-item uni-bg-red">
							<image class=" radius" :src="item.imageUrl" style="width: 100%;height: 400rpx;"
								mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="article-container">
				<image
					:src="articleInfo.cover ?articleInfo.cover :'https://code-graden-server-dev.oss-cn-beijing.aliyuncs.com/2022-05-20/1ef4592a-ff86-424a-845a-260a58a550a4_logo.jpg'"
					class="article-image"></image>
				<view class="info-container">
					<view style="display: flex;align-items: center;flex-direction: column;">
						<view class="article-name">{{articleInfo.name ? articleInfo.name : 'azhou'}}</view>
						<view class="article-job">{{articleInfo.job ? articleInfo.job : '后端开发'}}</view>
						<view class="article-info">{{articleInfo.info ? articleInfo.info : '算是一枚勤劳的后端程序猿。'}}</view>
					</view>
					<anchorLine leftText="关注我们" leftEnglish="about">
					</anchorLine>
					<view class="tel-container" v-if="articleInfo.qq">
						<image style="height: 40rpx;width: 40rpx;margin-right: 30rpx;"
							src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/qq.png">
						</image>
						<view @click="myCopy(articleInfo.qq)">{{articleInfo.qq}}</view>
					</view>
					<view class="tel-container" v-if="articleInfo.wx">
						<image class="tip-image"
							src="https://code-grade-server-prd.oss-cn-shenzhen.aliyuncs.com/smart-config-img/wx.png">
						</image>
						<view @click="myCopy(articleInfo.wx)"> {{articleInfo.wx}}</view>
					</view>
					<anchorLine leftText="扫码直达" leftEnglish="code" v-if="qqQrcode">
					</anchorLine>
					<view style="display: flex;align-items: center;flex-direction: column;" v-if="qqQrcode">
						<image class="bottom-img" :src="qqQrcode" @click="preview(qqQrcode)">
						</image>
					</view>
				</view>
			</view>
			<view @tap="toHome" class="to-home">返回首页</view>
		</view>


	</view>
</template>

<script>
	import sysConfigApi from "@/api/sysConfigApi.js"
	import sysConstant from '@/utils/sys-constant.js'
	export default {
		data() {
			return {
				cardCur: 0,
				articleInfo: {},
				qqQrcode: '',
				bannerList: [{
						imageUrl: 'https://code-graden-server-dev.oss-cn-beijing.aliyuncs.com/2022-05-20/07aae646-23ce-4acd-81c8-41ecfeb3eb34_qh_banner8.jpg'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/qdpz_banner3.jpg'
					}
				],
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			async init() {
				let articleInfo = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.ARTICLE_INFO)
				this.articleInfo = JSON.parse(articleInfo.data)
				let res = await sysConfigApi.getConfigByName(sysConstant.CONFIG_NAME.QQ_QR_CODE)
				this.qqQrcode = res.data
			},
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			toHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			myCopy(value) {
				uni.setClipboardData({
					data: value, //要被复制的内容
					success: () => {
						uni.showToast({
							title: "复制成功",
							icon: 'none'
						})
					}
				});
			},
			preview(e) {
				let array = [];
				array.push(e);
				uni.previewImage({
					urls: array,
					current: array[0]
				});
			}

		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {
		height: 100%;
	}

	.article-container {
		position: relative;

		.article-image {
			position: absolute;
			height: 200rpx;
			width: 200rpx;
			border-radius: 50%;
			top: -330rpx;
			z-index: 99;
			left: 50%;
			margin-left: -100rpx;
			background-color: #ffffff;
			box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
		}

		.info-container {
			position: absolute;
			width: 610rpx;
			padding: 20rpx;
			height: 900rpx;
			background-color: #ffffff;
			box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
			margin-left: 50rpx;
			border-radius: 30rpx;
			top: -200rpx;

		}

		.article-name {
			margin-top: 80rpx;
			color: #3f3f3f;
			font-weight: 700;
			font-size: 40rpx;
		}

		.article-job {
			color: #595959;
			margin: 20rpx 0;
			font-size: 26rpx;
		}

		.article-info {
			color: #999;
			text-align: justify;
		}

		.tel-container {
			height: 80rpx;
			display: flex;
			align-items: center;
			margin-left: 20rpx;
		}

		.tip-image {
			height: 50rpx;
			width: 50rpx;
			margin-right: 20rpx;
		}

		.bottom-img {
			position: absolute;
			bottom: 40rpx;
			border-radius: 20rpx;
			height: 200rpx;
			width: 200rpx;
		}
	}

	.to-home {
		margin-top: 30rpx;
		font-size: 30rpx;
		color: #5af;
		display: flex;
		flex-direction: row-reverse;
		position: absolute;
		bottom: 100rpx;
		right: 50rpx;
	}
</style>
