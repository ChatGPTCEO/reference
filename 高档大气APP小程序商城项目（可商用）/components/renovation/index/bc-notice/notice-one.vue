<template>
	<view class="flex-1" :style="modulMTop">
		<view class="flex-1 row-ac" :style="modulSize" style="height: 70rpx;background-color: #F1F1F1;">
			<view class="flex-1 row-ac ml-2 font-s-2" :style="modHeight">
				<view :style="modHeight" class="mr-1 row-ac"
					v-if="noticeInfo.modulCover !== '' || noticeInfo.modulIcon !== ''">
					<view class="iconfont" :class="noticeInfo.modulIcon" :style="iconfSizeInfo"
						v-if="noticeInfo.modulIcon !== '' && noticeInfo.modulCover == ''"></view>
					<image :src="noticeInfo.modulCover" :style="modHeight" mode="heightFix"
						v-if="noticeInfo.modulCover !== ''"></image>
				</view>
				<view class="in1line" :style="textSizeInfo">{{ noticeDetail.title }}</view>
			</view>
			<view class="row-ac" :style="moreSize" @click="toToticeDetails(noticeDetail.id)">
				<view class="font-s-2" v-if="noticeInfo.moreText !== ''">{{ noticeInfo.moreText }}</view>
				<view class="iconfont icon-next-01 mx-1" style="font-size: 22rpx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getArticleDetailUrl
	} from '@/api/index.js';
	export default {
		props: {
			noticeInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			},
		},
		data() {
			return {
				noticeDetail: {}
			}
		},
		computed: {
			modulMTop() {
				this.modulMT = this.noticeInfo.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			modulSize() {
				this.modulBgColor = this.noticeInfo.modulBgColor
				this.modulHeight = this.noticeInfo.modulHeight
				this.modulRadius = this.noticeInfo.modulRadius
				return `background-color:${this.modulBgColor};height: ${this.modulHeight}rpx;border-radius:${this.modulRadius}rpx;`
			},
			modHeight() {
				this.modulHeight = this.noticeInfo.modulHeight
				return `height: ${this.modulHeight}rpx;`
			},
			textSizeInfo() {
				this.titleColor = this.noticeInfo.titleColor
				this.titleSize = this.noticeInfo.titleSize
				this.titleThickness = this.noticeInfo.titleThickness
				return `font-size: ${this.titleSize}rpx;font-weight:${this.titleThickness};color:${this.titleColor};`
			},
			moreSize() {
				this.moreColor = this.noticeInfo.moreColor
				this.modulHeight = this.noticeInfo.modulHeight
				return `color:${this.moreColor};height: ${this.modulHeight}rpx;line-height: ${this.modulHeight}rpx;padding: 0 10rpx;`
			},
			iconfSizeInfo() {
				this.iconSize = this.noticeInfo.iconSize
				this.iconColor = this.noticeInfo.iconColor
				return `font-size: ${this.iconSize}rpx;color:${this.iconColor};`
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData(noticeId) {
				this.getArticleDetail()
			},
			getArticleDetail() {
				this.noticeId = this.noticeInfo.noticeId
				this.$R.get(getArticleDetailUrl + this.noticeId).then(res => {
					this.noticeDetail = res.data;
				})
			},
			toToticeDetails(articleId) {
				uni.navigateTo({
					url: '/pages/article/article-details?id=' + articleId
				});
			}
		}
	}
</script>

<style>
</style>
