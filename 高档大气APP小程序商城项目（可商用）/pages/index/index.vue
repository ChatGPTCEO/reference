<template>
	<view :style="'background-color:' + indexBackgroundColor">
		<bc-header v-if="headerContent.switch === 0" :headerInfo="headerContent.content" />
		<view v-for="(item,index) in obtainList" :key="index">
			<bc-swiper v-if="item.component === 'bcSwiper' && item.switch === 0" :bannerList="bannerList"
				:pictrueInfo="item.content" />
			<bc-navigation v-if="item.component === 'bcNavigation' && item.switch === 0" :navInfo="item.content" />
			<bc-column v-if="item.component === 'bcColumn' && item.switch === 0" :columnInfo="item.content" />
			<bc-seckill v-if="item.component === 'bcSeckill' && item.switch === 0" :seckillInfo="item.content" />
			<bc-bargain v-if="item.component === 'bcBargain' && item.switch === 0" :bargainInfo="item.content" />
			<bc-notice v-if="item.component === 'bcNotice' && item.switch === 0" :noticeInfo="item.content" />
			<bc-collage v-if="item.component === 'bcCollage' && item.switch === 0" :collageInfo="item.content" />
			<bc-brand v-if="item.component === 'bcBrand' && item.switch === 0" :brandInfo="item.content"  />
			<bc-picture v-if="item.component === 'bcPicture' && item.switch === 0" :pictrueInfo="item.content" />
			<bc-article-list v-if="item.component === 'bcArticleList' && item.switch === 0" :articleListInfo="item.content" />
			<bc-article v-if="item.component === 'bcArticle' && item.switch === 0" :articleInfo="item.content" />
			<bc-product v-if="item.component === 'bcProduct' && item.switch === 0" :productInfo="item.content" />
		</view>
		<bc-footer v-if="footerContent.switch === 0" :footerInfo="footerContent.content" />
		<view class="py"></view>
		<!-- <common-fixed-nav></common-fixed-nav> -->
	</view>
</template>
<script>
	import bcHeader from '@/components/renovation/index/bc-header'; //APP小程序头部模块
	import bcFooter from '@/components/renovation/index/bc-footer'; //APP小程序头部模块
	import bcNavigation from '@/components/renovation/index/bc-navigation'; //导航模块
	import bcSwiper from '@/components/renovation/index/bc-swiper'; //轮播图模块
	import bcNotice from '@/components/renovation/index/bc-notice'; //公告模块
	import bcPicture from '@/components/renovation/index/bc-picture'; //图片模块
	import bcProduct from '@/components/renovation/index/bc-product'; //商品模块
	import bcArticle from '@/components/renovation/index/bc-article'; //文章模块
	import bcArticleList from '@/components/renovation/index/bc-article-list'; //文章分类模块
	import bcBrand from '@/components/renovation/index/bc-brand'; //栏目条
	import bcColumn from '@/components/renovation/index/bc-column'; //栏目条
	import commonFixedNav from '@/components/common/common-fixed-nav'; // 微信客服
	import {
		getConfigUrl,
		getBanner,
		getSeckillIndexUrl,
		getGroupBuyingListUrl,
		boostCenterListUrl,
		getHotGoods,
		getArticleListUrl,
		getLikeGoodsUrl,
		recommendGoods,
		getNewGoods
	} from '@/api/index.js';
	export default {
		components: {
			bcHeader,
			bcFooter,
			bcNavigation,
			bcSwiper,
			bcNotice,
			bcPicture,
			bcProduct,
			bcArticle,
			bcArticleList,
			bcBrand,
			bcColumn,
			commonFixedNav
		},

		data() {
			return {
				indexBackgroundColor: '',
				obtainList: {},
				headerContent: {},
				footerContent: {},
				bannerList: [],
				boostQueryInfo: {
					status: 1,
					page: 1,
					pageSize: 10
				},
				recommendQueryInfo:{
					size: 50,
					page: 1
				},
				groupQueryInfo: {
					page: 1,
					pageSize: 50
				},
				articleQueryInfo: {
					articleTypeId: 0
				},
				likeGoodsIdList: [],
			}
		},
		/* onLoad() {
			this.loadData();
			this.initData();
		}, */
		mounted() {
			this.loadData();
			this.initData();
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop;
			uni.$emit('scrollTop', this.scrollTop);
		},
		created() {
			uni.$on('articleTypeIdEmit', res => {
				let _this = this
				_this.onArticleId = res
				//这里是接收ID传入，但是没法赋值
			})
		},
		onReachBottom() {
			this.onReachBottomHandle();
		},
		methods: {
			async loadData() {
				this.obtainList = this.$json.renovation.AppTemplate.indexTemplate.modularList
				this.indexBackgroundColor = this.$json.renovation.AppTemplate.indexTemplate.indexBackgroundColor
				this.obtainConsole = this.$json.renovation.AppTemplate
				//console.log(this.obtainConsole);
				this.headerContent = this.$json.renovation.AppTemplate.indexTemplate.headerModular
				this.footerContent = this.$json.renovation.AppTemplate.indexTemplate.footerModular
				this.categoryStyle = this.$json.renovation.AppTemplate.categoryTemplate
			},
			initData() {
				this.getShopConfig()
				this.getBannerList()
				this.getArticleList()
				this.boostCenterLis()
				this.getHotGoodsUrl()
				this.getNewGoodslist()
				this.getRecommendGoods()
				this.getYourLike()
			},
			getShopConfig() {
				this.$R.get(getConfigUrl).then(res => {
					this.shopConfig = res.data
					uni.$emit('shopConfigInfo', this.shopConfig)
				})
			},
			//获取banner
			getBannerList() {
				this.$R.get(getBanner).then(res => {
					this.bannerList = res.data
				})
			},
			//获取首页秒杀
			getSeckillIndex() {
				this.$R.get(getSeckillIndexUrl).then(res => {
					this.seckillIndex = res.data.list
					uni.$emit('seckillIndex', this.seckillIndex)
				})
			},
			onReachBottomHandle() {
				
			},
			boostCenterLis() {
				this.$R.get(boostCenterListUrl, this.boostQueryInfo).then(res => {
					this.boostCenter = res.data.list
					uni.$emit('boostCenter', this.boostCenter)
				})
			},
			getArticleList() {
				this.$R.get(getArticleListUrl, this.articleQueryInfo).then(res => {
					this.articleList = res.data.list;
					uni.$emit('articleListEmit', this.articleList)
				})
			},
			getHotGoodsUrl() {
				this.$R.get(getHotGoods).then(res => {
					this.hotGoods = res.data.list
					uni.$emit('hotGoodsList', this.hotGoods)
				})
			},
			getNewGoodslist() {
				this.$R.get(getNewGoods).then(res => {
					this.newGoodslist = res.data.list;
					uni.$emit('newGoodslistEmit', this.newGoodslist)
				});
			},
			getRecommendGoods() {
				this.$R.get(recommendGoods,this.recommendQueryInfo).then(res => {
					this.recommendGoodslist = res.data.list;
					uni.$emit('recommendGoodslistEmit', this.recommendGoodslist)
				});
			},
			onReachBottomHandle() {
				
			},
			//获取猜您喜欢
			async getYourLike() {
				await this.$R.post(getLikeGoodsUrl + '?ids=[' + this.likeGoodsIdList + ']').then(res => {
					this.yourLikelist = res.data;
					uni.$emit('yourLikelistEmit', this.yourLikelist)
					if (this.yourLikelist.length == 0) {
						this.yourLikelist = [...res.data];
						
					} else {
						this.yourLikelist = [...this.yourLikelist, ...res.data];
						uni.$emit('yourLikelistEmit', this.yourLikelist)
					}
					this.likeGoodsIdList = [];
					this.yourLikelist.forEach(item => {
						this.likeGoodsIdList.push(item.id);
					});
				});
			},
		}
	}
</script>
<style lang="scss">
	.kefu {
		width: 120rpx;
		height: 600rpx;
		box-shadow: 0 0 5px red;
		position: fixed;
		bottom: 60rpx;
		right: 30rpx;
		z-index: 90;
	}
</style>
