<template>
	<view class="defaultIndexPageContainer">
		<u-navbar :is-back="false" title=" " :border-bottom="false">
			<view class="slot-wrap">
				<view>
					<u-image mode="heightFix" height="80rpx" :src="logoUrl"></u-image>
				</view>
				<!-- #ifndef MP-WEIXIN -->
				<view style="color: #5BBFF1;text-align: center;width: 80%;font-weight: bold;font-size: 32rpx;">
					默认首页
				</view>
				<!-- #endif -->
			</view>
		</u-navbar>
		<scroll-view class="content-box" :scroll-x="false" :scroll-y="true" :style="'height:'+windowHeight+'px'">
			<view class="header-box" :style="bannerList.length<1?'height:200rpx;':''">
				<!-- 搜索 -->
				<view class="u-padding-top-30 u-p-l-60 u-p-r-60">
					<!--@blur="searchGood" -->
					<u-search @search="searchGood" v-model="searchWord" placeholder="搜索你想要的商品" shape="round"
						:show-action="false" height="80" bg-color="#ffffff" :clearabled="true"></u-search>
				</view>
				<!-- 公告 -->
				<view style="margin:10rpx 0rpx 0rpx 0rpx;padding: 0rpx 20rpx; color: #FFFFFF;width: 100%;">
					<u-notice-bar mode="horizontal" :list="noticeList.length>0?noticeList:['暂无公告内容']" type="none"
						color="#f29100" bg-color="#5BBFF1" :font-size="32">
					</u-notice-bar>
				</view>

				<!-- 轮播 -->
				<view class="banner-box" v-if="bannerList.length>0">
					<u-swiper :height="320" :list="bannerList" :interval="5000" mode="round" name="pictureUrl"
						:border-radius="20"></u-swiper>
				</view>
			</view>
			<!-- 菜单 这里分两个gird样式才正常-->
			<view :style="bannerList.length<1?'margin-top:20rpx;':''" class="grid-box">
				<u-grid :col="4" :border="false" align="center" hover-class="none">
					<u-grid-item v-for="(item,index) in girdList.slice(0,4)" :key="index" @click="girdClick(item)"
						:custom-style='girdCustomStyle'>
						<u-icon :name="item.iconPath" :size="64"></u-icon>
						<view class="grid-text">{{item.title}}</view>
					</u-grid-item>
				</u-grid>
				<u-grid :col="4" :border="false" align="center" hover-class="none">
					<u-grid-item v-for="(item,index) in girdList.slice(4,8)" :key="index" @click="girdClick(item)"
						:custom-style='girdCustomStyle'>
						<u-icon :name="item.iconPath" :size="64"></u-icon>
						<view class="grid-text">{{item.title}}</view>
					</u-grid-item>
				</u-grid>
			</view>
			<!-- 限时抢购 -->
			<view class="u-m-30" v-if="limitActivityList.length>0">
				<limitActivity :limitActivityList="limitActivityList" @toGoodDetail="toGoodDetail"
					@toActivity="toActivity"></limitActivity>
			</view>
			<!-- 内购专区轮播 -->
			<view class="u-m-30" v-if="bannerList.length>0" style="background-color: #FFFFFF;border-radius: 20rpx;">
				<view class="">
					<u-swiper height="250rpx" :list="bannerList.slice(0,1)" duration="5000" :circular="false"
						mode="round" name="pictureUrl" border-radius="20"></u-swiper>
				</view>
			</view>
			<!-- 精选应用 -->
			<view class="u-m-30" v-if="appList.length>0">
				<selectedApplication :appList="appList" :showTitleIcon="true" :titleAlign="'left'" @loadApp="loadApp">
				</selectedApplication>
			</view>
			<!-- 品牌精选 -->
			<view class="u-m-30" v-if="hotBrandList.length>0">
				<selected-brand :brandList="hotBrandList" :showTitleIcon="true" :titleAlign="'left'"></selected-brand>
			</view>
			<!-- 营销活动 -->
			<view class="u-m-30" v-if="marketActivity.length>0">
				<marketingActivity :showTitle="true" :categoryList="marketActivity" :categoryGoodList="categoryGoodList"
					:currentTab="currentTab" @tabChange="tabChange" @toActivity="toActivity"
					@toGoodDetail="toGoodDetail">
				</marketingActivity>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import limitActivity from '@/components/common/limitActivity.vue'; //限时活动
	import selectedApplication from '@/components/common/selectedApplication.vue'; //精选应用
	import selectedBrand from '@/components/common/selectedBrand.vue'; //精选
	import marketingActivity from '@/components/common/marketingActivity.vue';
	export default {
		name: "default-home",
		components: {
			limitActivity,
			selectedApplication,
			selectedBrand,
			marketingActivity
		},
		data() {
			return {
				windowHeight: 0,
				searchWord: '',
				logoUrl: '/static/uview-logo.png',
				noticeList: ['这里显示公告内容'],
				bannerList: [{
					pictureUrl: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				}],
				//宫格菜单
				girdList: [
					{
						iconPath: '/static/logo.png',
						title: "富强民主",
						category: '11001',
					},
					{
						iconPath: '/static/uview-logo.png',
						title: "文明和谐",
						category: '12001',
					},
					{
						iconPath: '/static/logo.png',
						title: "自由平等",
						category: '268',
					},
					{
						iconPath: '/static/uview-logo.png',
						title: "公正法治",
						category: '333',
					},
					{
						iconPath: '/static/logo.png',
						title: "爱国敬业",
						category: '334',
					},
					{
						iconPath: '/static/uview-logo.png',
						title: "诚信友善",
						category: '12032',
					},
					{
						iconPath: '/static/logo.png',
						title: "我的梦",
						category: '12031',
					},
					{
						iconPath: '/static/uview-logo.png',
						title: "中国梦",
						category: '11008',
					}
				],
				girdCustomStyle: {
					color: '#363132',
					padding: '20rpx 0'
				},
				//精选应用
				appList: [{
						type: 'JD',
						name: '京东商城',
						imageUrl: '/static/image/jd.jpg'
					},
					{
						type: 'Mi',
						name: '小米商城',
						imageUrl: '/static/image/mi.jpg'
					},
					{
						type: 'SUNING',
						name: '苏宁易购',
						imageUrl: '/static/image/sn-app.jpg'
					},
					{
						type: 'apple',
						name: 'apple',
						imageUrl: '/static/image/apple.png'
					},
				],
				//热门品牌
				hotBrandList: [
					{
						id: 1,
						name: 'apple',
						logo: '/static/image/apple.png'
					},
					{
						type: 'Mi',
						name: '小米商城',
						logo: '/static/image/mi.jpg'
					},
					{
						type: 'SUNING',
						name: '苏宁易购',
						logo: '/static/image/sn-app.jpg'
					},
					{
						type: 'JD',
						name: '京东商城',
						logo: '/static/image/jd.jpg'
					},
				],
				//限时抢购
				limitActivityList: [{
					endTime: 1653926400000,
					limitAcGoods: [{
							dataSourceStr: "精品",
							listPrice: 5888.00,
							path: "/static/image/birthdayCake/1.jpg",
							quantity: 10,
							skuId: "good-01",
							skuName: "iPhone12",
							skuType: 1,
							status: true,
							type: "jd",
							unitPrice: 5388.88
						},
						{
							dataSourceStr: "精品",
							listPrice: 6888.00,
							path: "/static/image/birthdayCake/2.jpg",
							quantity: 20,
							skuId: "good-02",
							skuName: "iPhone12",
							skuType: 1,
							status: true,
							type: "jd",
							unitPrice: 6655.00
						}
					],
					limitTimeStamp: 4009416.754,
					limitType: 1,
					nowTime: 1649916982552,
					path: "/static/image/birthdayCake/3.jpg",
					skillId: "96",
					startTime: 1649820090000,
					title: "限时抢购",
					type: 3,
				}],
				//推荐活动
				marketActivity: [{
						title: "五一特惠",
						skillId: "1"
					},
					{
						title: "端午专区",
						skillId: "2"
					}
				],
				currentTab: 0,
				categoryGoodList:[{
						skuId:'good-01',
						dataSourceStr:"精品",
						unitPrice:'128.00',
						listPrice:'168.00',
						path:'/static/image/birthdayCake/4.jpg',
						skuName: "女士蛋糕",
					},
					{
						skuId:'good-02',
						dataSourceStr:"甜诺烘焙",
						unitPrice:'188.00',
						listPrice:'288.00',
						path:'/static/image/birthdayCake/5.jpg',
						skuName: "男士蛋糕-好好好吃吃吃好好好吃吃吃",
					}
				],
			};
		},
		created: function() {
			let that = this;
			// #ifdef H5
			this.windowHeight = this.$u.sys().windowHeight - 60;
			// #endif
			// #ifndef H5
			this.windowHeight = this.$u.sys().windowHeight - 100;
			// #endif
		},
		mounted: function() {
			console.log("默认首页初始化");
			this.initData();
		},

		methods: {
			initData: function() {
				//获取首页限时抢购信息
				//this.limitedTimeActivity();
				//轮播
				//this.getBannerList();
				//this.getGlobalNotice();
				//this.getTabCategoryActivityList();
				//this.getCompanyNotice();
			},
			//点击宫格
			girdClick: function(item) {
				let that = this;

			},
			searchGood: function(value) {
				let that = this;
				console.log("搜索关键字,value", value);
				console.log("搜索关键字", that.searchWord);

			},
			//跳转活动节目
			toActivity: function(activityItem, type) {
				let that = this;

			},
			//获取为你推荐的tab项
			getTabCategoryActivityList: function() {
				let that = this;
			},
			//获取活动的商品列表
			getActivityGoodById: function(params, type) {
				let that = this;
			},
			//精选应用点击
			loadApp: function(item) {

			},
			//为你推荐切换
			tabChange: function(index) {
				this.currentTab = index;
				this.categoryGoodList.reverse();
			},
			//查看商品详情
			toGoodDetail: function(goodDetail) {
				console.log("去商品详情", goodDetail);
			},

		}
	}
</script>

<style lang="scss" scoped>
	.defaultIndexPageContainer {
		color: #363132;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;

		.slot-wrap {
			display: flex;
			align-items: center;
			/* 如果您想让slot内容占满整个导航栏的宽度 */
			flex: 1;
			/* 如果您想让slot内容与导航栏左右有空隙 */
			padding: 0 30rpx;
		}

		.content-box {
			::-webkit-scrollbar {
				display: none;
				width: 0;
				height: 0;
			}

			/* 头部盒子 */
			.header-box {
				background-color: #5BBFF1;
				height: 450rpx;
				border-bottom-left-radius: 50rpx;
				border-bottom-right-radius: 50rpx;
			}

			/* 轮播图 */
			.banner-box {
				padding: 0rpx 30rpx;
				margin-top: 20rpx;
			}

			/* 主体菜单 */
			.grid-box {
				//border: 1px solid red;
				margin: 30rpx;
				margin-top: 100rpx;
				padding-left: 30rpx;
				padding-right: 30rpx;
				border-radius: 16px;
				background-color: #FFFFFF;

				.grid-text {
					font-size: 11px;
					font-family: SourceHanSansSC-Normal, SourceHanSansSC;
					font-weight: 400;
					color: #363132;
					margin-top: 2rpx;
				}
			}
		}
	}
</style>
