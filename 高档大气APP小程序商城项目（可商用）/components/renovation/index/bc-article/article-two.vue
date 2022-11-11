<template>
	<view class="flex-1" :style="modulMTop">
		<scroll-view scroll-x class="scroll-row article-scroll" v-if="articleListOn.length > 0">
			<view class="scroll-row-item article-item" :style="itemBox" v-for="(item,index) in articleListOn"
				:key="index" @click="toArticleDetails(item)" v-if="containProduct(item)">
				<view class="article-img flex-1">
					<image :style="imgRadius" :src="item.image[0] || item.videoCover" mode="aspectFill" />
					<view class="icon-video row" v-if="item.videoCover != ''">
						<text class="iconfont icon-bofang"></text>
					</view>
					<view class="article-info text-white py-1 gradient-mt" v-if="articleInfo.showProduct == 0">
						<view class="flex-1 mx-2 font-s-3 in1line">{{ item.title }}</view>
						<view class="row-ac flex-1 mx-2 mt-1">
							<image :src="item.userImage" class="user-image" mode=""></image>
							<view class="font-s-2 ml-1">{{ item.userName }}</view>
						</view>
					</view>
				</view>
				<view class="flex-1 mx-2 pt-1 foot-box"
					v-if="articleInfo.showProduct == 0 && item.productData.length > 0">
					<view class="font-s-2 in2line mt-1" :style="fontSize">{{ item.productData[0].title }}</view>
					<view class="row-ac-sb flex-1">
						<view class="text-main-color font-s-6 font-w mt-1" :style="priceSizeModify"><text
								class="font-s-1">￥</text>{{ item.productData[0].price }}</view>
						<view class="font-s-1 text-de text-light-grey mr-3 mt-1"
							v-if="articleInfo.articleList.marketpriceType == 0">￥{{ item.productData[0].marketPrice }}
						</view>
					</view>
				</view>
				<view class="flex-1 mx-2 foot-box" v-else>
					<view class="font-s-3 in1line mt-1" :style="fontSize">{{ item.title }}</view>
					<view class="row-ac flex-1 mt-1">
						<image :src="item.userImage" class="user-image" mode=""></image>
						<view class="font-s-2 ml-1 text-light-grey">{{ item.userName }}</view>
					</view>
					<view class="row-ac-sb flex-1 text-light-grey font-s-1 mt-2">
						<view><text class="iconfont icon-yijianfankui mr-1"
								v-if="articleInfo.articleList.commentCountType== 0"></text>{{ item.commentCount }}
						</view>
						<view><text class="iconfont icon-zan mr-1"
								v-if="articleInfo.articleList.fabulousCountType == 0"></text>{{ item.fabulousCount }}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getArticleListUrl
	} from '@/api/index.js';
	export default {
		data() {
			return {
				articleListOn: [],
				quantityUum: '',
				articleQueryInfo: {
					articleTypeId: ''
				}
			}
		},
		props: {
			articleInfo: {
				type: [String, Object],
				default: () => {
					return {};
				}
			}
		},
		computed: {
			itemBox() {
				this.itemBgColor = this.articleInfo.articleList.itemBgColor
				this.borderShadow = this.articleInfo.articleList.borderShadow
				this.pictureRadius = this.articleInfo.articleList.pictureRadius
				return `box-shadow: 0 0 8rpx ${this.borderShadow};border-radius:${this.pictureRadius}rpx;background:${this.itemBgColor}`
			},
			fontSize() {
				this.titleColor = this.articleInfo.articleList.titleColor
				this.titleSize = this.articleInfo.articleList.titleSize
				this.titleThickness = this.articleInfo.articleList.titleThickness
				return `font-size: ${this.titleSize}rpx;font-weight:${this.titleThickness};color:${this.titleColor};`
			},
			priceSizeModify() {
				this.priceColor = this.articleInfo.articleList.priceColor
				this.priceSize = this.articleInfo.articleList.priceSize
				this.priceThickness = this.articleInfo.articleList.priceThickness
				return `font-size: ${this.priceSize}rpx;font-weight:${this.priceThickness};color:${this.priceColor};`
			},
			modulMTop() {
				this.modulMT = this.articleInfo.articleList.modulMT
				return `margin-top:${this.modulMT}rpx;`
			},
			imgRadius() {
				this.pictureRadius = this.articleInfo.articleList.pictureRadius
				return `border-top-left-radius:${this.pictureRadius}rpx;border-top-right-radius:${this.pictureRadius}rpx;`
			},
		},
		filters: {
			num1Filter(value) {
				let realVal = parseFloat(value).toFixed(1);
				return realVal;
			}
		},
		created() {
			this.articleTypeId = this.articleInfo.articleTypeId
			this.articleQueryInfo = {
				articleTypeId: this.articleTypeId
			}
			this.quantityUum = this.articleInfo.articleList.quantity
		},
		mounted() {
			this.initData()
		},
		methods: {
			initData(){
				this.getArticleList()
			},
			getArticleList(){
				this.$R.get(getArticleListUrl, this.articleQueryInfo).then(res=>{
					this.articleListOn = res.data.list
				})
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
			},
			//计算属性
			containProduct(item){
				if(this.articleInfo.showProduct == 0){
					return item.productData.length > 0
				}else{
					return true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.article-scroll {
		height: 420rpx;

		.article-item {
			width: 250rpx;
			height: 418rpx;
			margin-right: 20rpx;

			.article-img {
				width: 250rpx;
				height: 250rpx;
				position: relative;

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
					background: linear-gradient(to bottom, rgba(0, 0, 0, .01), rgba(0, 0, 0, .8));
					position: absolute;

					view {
						line-height: 1.2;
					}

					.user-image {
						width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						border: 2rpx solid #FFFFFF;
					}
				}

				.gradient-mt {
					margin-top: -100rpx;
				}
			}

			.foot-box {
				height: 168rpx;
				overflow: auto;
				.user-image {
					width: 36rpx;
					height: 36rpx;
					border-radius: 50%;
					border: 2rpx solid #BBBBBB;
				}

				.iconfont {
					font-size: 28rpx;
				}
			}
		}
	}
</style>
