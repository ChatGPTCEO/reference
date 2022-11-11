<template>
	<view>
		<view class="container skeletons">
			<view class="computed">
				<view class="info-wrap">
					<view v-if="isLogin">
						<view @tap="jumpToScoreDetail" class="bean-num ptp_exposure" data-ptpid="3c23-1d65-8cff-709f">
							<text class="skeletons-rect">{{ score }}</text>
							<view class="bean-btn">
								<view class="skeletons-rect">
									我的青豆
									<text class="iconfont iconarrow"></text>
								</view>
							</view>
						</view>
					</view>
					<view class="login-btn-box" v-else>
						<view class="login-btn skeletons-rect ptp_exposure" data-ptpid="2ae0-1933-bb92-5ee6">
							<open-button @initData="loginSuccess" buttonName="请先登录" openType="getPhoneNumber" ptpId="2ae0-1933-bb92-5ee6"></open-button>
						</view>
					</view>
					<view class="info-box">
						<button @tap="jumpToOrder" class="info-button skeletons-rect ptp_exposure" data-ptpid="0d04-1335-aa5c-e1de" hoverClass="info-button-pressed">
							<view class="iconfont iconfile button-icon"></view>
							<view>我的订单</view>
						</button>
						<view class="info-border"></view>
						<button @tap="jumpToMyRatrace" class="info-button skeletons-rect ptp_exposure" data-ptpid="0865-1be4-8d89-ac8e" hoverClass="info-button-pressed">
							<view class="iconfont iconbonus button-icon"></view>
							<view>我的夺宝</view>
							<view class="award-img" v-if="isBeanWinningGet">领奖</view>
						</button>
						<view class="info-border"></view>
						<button @tap="jumpToCoupon" class="info-button skeletons-rect ptp_exposure" data-ptpid="ce90-1bc6-88b6-f1f2" hoverClass="info-button-pressed">
							<view class="iconfont iconcoupon button-icon"></view>
							<view>优惠券</view>
						</button>
					</view>
				</view>
				<view class="info-white-box"></view>
				<view class="ten-bean-treasure" v-if="tenBeansListFirst.goods">
					<view class="title-wrap">
						<image lazyLoad class="ten-image skeletons-rect" src="https://qiniu-image.qtshe.com/20191029tenBeanicon.png"></image>
						<image lazyLoad class="main-title-image skeletons-rect" src="https://qiniu-image.qtshe.com/20191231tenBeantitlenew.png"></image>
						<image lazyLoad class="new-image skeletons-rect" src="https://qiniu-image.qtshe.com/20191024new.png" v-if="isTenBeansPaid"></image>
						<view @tap="jumpToRace" class="title-button ptp_exposure_bean skeletons-rect" data-ptpid="311e-10e1-8046-2bcd">往期回顾</view>
					</view>
					<view class="sub-title-text ten-image-margin"><text class="skeletons-rect">每日限投注3次，投注越多中奖概率越大</text></view>
					<view
						@tap="jumpToRatRace"
						class="treasure-box ptp_exposure_bean"
						:data-businessId="tenBeansListFirst.robActivityId"
						data-businessType="14"
						:data-id="tenBeansListFirst.robActivityId"
						data-ptpid="2b5c-1c85-b3cd-b2c6"
					>
						<view class="treasure-info">
							<image lazyLoad class="treasure-pic skeletons-rect" :src="tenBeansListFirst.goods.indexImg + '?imageView2/0/w/270'"></image>
							<view class="treasure-detail">
								<view class="name ellipsis skeletons-rect">{{ tenBeansListFirst.goods.title }}</view>
								<text class="price skeletons-rect">{{ tenBeansListFirst.goods.price }}元</text>
								<button class="btn skeletons-rect" hoverClass="btn-pressed">
									{{ tenBeansListFirst.todayJoin ? '查看夺宝详情' : !isLogin ? '免费夺宝1次' : hasFree ? '免费夺宝1次' : '10青豆夺宝' }}
								</button>
								<view class="people skeletons-rect">
									已有
									<text class="c-red">{{ tenBeansListFirst.applyCount }}</text>
									人次参与
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tenbean-wrap" v-if="welfareTenBeansList.length > 0">
					<view class="title-wrap">
						<view class="main-title skeletons-rect">5豆专区</view>
						<image lazyLoad class="new-image skeletons-rect" src="https://qiniu-image.qtshe.com/20191024new.png" v-if="isNewTenBean"></image>
						<view @tap="jumpToBeanList" class="title-button skeletons-rect ptp_exposure_tenBean" data-ptpid="8f93-19aa-84c1-a879">更多</view>
					</view>
					<view class="sub-title-text"><text class="skeletons-rect">5豆一口价，低价任意兑</text></view>
					<scroll-view scrollX class="common-list">
						<view
							@tap="jumpToDetailTen"
							class="common-list-item skeletons-rect ptp_exposure_tenBean"
							:data-businessId="item.id"
							data-businessType="11"
							:data-id="item.id"
							:data-index="index"
							data-ptpid="06b9-12d6-a893-c131"
							v-for="(item, index) in welfareTenBeansList"
							:key="item.id"
						>
							<image lazyLoad class="common-image" :src="item.indexImg"></image>

							<view class="common-title ellipsis">{{ item.title }}</view>

							<view class="common-price ellipsis">{{ item.score }}青豆</view>
						</view>
					</scroll-view>
				</view>
				<view class="superise-wrap" v-if="flashSaleList.length >= 3">
					<view class="title-wrap">
						<view class="main-title skeletons-rect">限时惊喜</view>
						<view class="sub-title superise-countTime skeletons-rect">
							<view class="text">距结束</view>
							<view class="time">{{ countDown.hour }}:{{ countDown.min }}:{{ countDown.sec }}</view>
						</view>
						<view @tap="jumpToLimiteGoods" class="title-button skeletons-rect ptp_exposure_flash" data-ptpid="f732-1cf0-8407-0e8f">更多</view>
					</view>
					<view class="sub-title-text"><text class="skeletons-rect">爆款补贴价，抢到就赚到</text></view>
					<scroll-view scrollX class="common-list">
						<view
							@tap="jumpToDetail"
							class="common-list-item ptp_exposure_flash"
							:data-businessId="item.id"
							data-businessType="11"
							:data-id="item.id"
							:data-index="index"
							data-ptpid="f996-100e-9ddb-cecb"
							v-for="(item, index) in flashSaleList"
							:key="item.id"
						>
							<image lazyLoad class="common-image" :src="item.indexImg"></image>

							<view class="common-title ellipsis">{{ item.title }}</view>

							<view class="common-price ellipsis" v-if="item.salePrice">{{ item.saleScore }}青豆+{{ item.salePrice }}元</view>

							<view class="common-price ellipsis" v-else>{{ item.saleScore }}青豆</view>

							<view class="common-desc ellipsis">{{ item.score }}青豆{{ item.price ? '+' + item.price + '元' : '' }}</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="recommend-wrap">
				<view :class="'nav-box ' + (isFixed ? 'nav-list-fixed' : '')">
					<scroll-view scrollX class="nav-list">
						<view
							@tap="navChange"
							:class="'nav-item skeletons-rect ' + (index === selectIndex ? 'nav-item-active' : '') + ' ptp_exposure_nav_' + index"
							:data-id="item.id"
							:data-index="index"
							data-ptpid="e9d2-1826-ac54-5c46"
							v-for="(item, index) in navList"
							:key="item.id"
						>
							{{ item.name }}
						</view>
					</scroll-view>
					<search-slide @change="searchChange" @pageScrollTop="pageScrollTop"></search-slide>
				</view>
				<view class="min-height" v-if="goodsList.length > 0">
					<view class="goods-list">
						<view
							@tap="jumpToDetail"
							:class="'goods-item ptp_exposure_item_' + item.id"
							:data-businessId="item.id"
							data-businessType="11"
							:data-id="item.id"
							:data-index="index"
							data-ptpid="3e8c-1070-aaf2-3587"
							v-for="(item, index) in goodsList"
							:key="item.id"
						>
							<image class="goods-pic" :lazyLoad="true" :src="item.indexImg"></image>

							<view class="goods-title ellipsis">{{ item.title }}</view>

							<view class="goods-price ellipsis" v-if="item.saleScore">
								{{ item.saleScore }}青豆
								<text v-if="item.salePrice">+{{ item.salePrice }}元</text>
							</view>

							<view class="goods-price ellipsis" v-else>
								<text v-if="item.score">{{ item.score }}青豆</text>
								<text v-if="item.score && item.price">+</text>
								<text v-if="item.price">{{ item.price }}元</text>
							</view>

							<view class="tags-box" v-if="item.tags.length">
								<text class="tag" v-for="(tags, index1) in item.tags" :key="index1">{{ tags }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="blank-wrap" v-else>
					<image lazyLoad class="blank-pic" src="https://qiniu-image.qtshe.com/20191024default-page.png"></image>
					<view class="blank-text">啊哦，该类目暂无商品信息</view>
				</view>
			</view>
			<winning-modal @close="winningClose" :info="isBeanModalInfo" :show="isBeanNotOpenShow"></winning-modal>
			<quick-login @initData="loginSuccess" :isShow="isShow"></quick-login>
		</view>
		<bean-winning @close="beanWinningClose" :info="isBeanModalInfo" :show="isBeanWinning"></bean-winning>
	</view>
</template>

<script>
import searchSlide from './components/searchSlide/index';
import winningModal from './components/winningModal/index';
import beanWinning from './components/beanWinning/index';
import openButton from '@/pages/components/openButton/openButton';

// api
import { apitebBeansList,apigoodsList } from '@/api/mock/mock.js';

var app = getApp();
export default {
	components: {
		searchSlide,
		winningModal,
		beanWinning,
		openButton
	},
	data() {
		return {
			welfareTenBeansList: [],
			hasFree: false,
			
			tenBeansListFirst: {
			    goods: {
			        indexImg: '',
			        title: '',
			        price: ''
			    },
			
			    robActivityId: '',
			    todayJoin: false,
			    applyCount: ''
			},
			
			flashSaleList: [],
			navList: [],
			selectIndex: 0,
			isFixed: false,
			top: 421,
			score: 0,
			isShow: false,
			pageNum: 1,
			pageSize: 20,
			categoryId: 0,
			
			searchData: {
			    sortType: 1,
			    sortMethod: 0,
			    payType: ''
			},
			
			countDown: {
			    hour: '00',
			    min: '00',
			    sec: '00'
			},
			
			leftTime: '',
			isEnd: false,
			goodsList: [],
			isBeanWinning: false,
			isBeanWinningGet: false,
			isBeanNotOpenShow: false,
			
			isBeanModalInfo: {
			    winTime: '',
			    status: 0,
			    robStatus: 0,
			    robActivityId: '',
			    goodsName: ''
			},
			
			isNewTenBean: true,
			isTenBeansPaid: true,
			deviceOS: 0,
			bgWhite: false,
			isLogin: false,
			tags: []
		};
	},
	onShareAppMessage: function() {},
	onLoad: function(t) {},
	onShow: function() {
		this.initTenBeansData();
		this.queryPageGoods();
		this.initNavData();
		this.hasFree = true;
		this.tenBeansListFirst = [];
	},
	onReady: function() {
		this.computedTop();
	},
	onHide: function() {
		clearInterval(this.timer);
	},
	onUnload: function() {
		clearInterval(this.timer);
	},
	// 监听页面滚动，固定商品分类导航栏
	onPageScroll: function(t) {
		let e = t.scrollTop;
		if (e <= 165 && this.bgWhite) {
		    this.bgWhite = false;
		    uni.setNavigationBarColor({
		        backgroundColor: '#00CC88',
		        frontColor: '#ffffff'
		    });
		}
		
		if (e > 165 && !this.bgWhite) {
		    this.bgWhite = true;
		    uni.setNavigationBarColor({
		        backgroundColor: '#fff',
		        frontColor: '#000000'
		    });
		}
		let a = e >= this.top;
		
		if ((a && !this.isFixed) || (!a && this.isFixed)) {
			this.isFixed = a;
		}
	},
	onPullDownRefresh: function() {},
	onUnload: function() {},
	onReachBottom: function() {},
	methods: {
		computedTop: function() {},

		timestamp: function(t) {},

		countDownFun: function(t) {},

		getQtbean: function() {},

		initFlashSaleData: function() {},

		initNavData: function() {
			let navArray = [
			    {
			        id: 0,
			        name: '全部'
			    },
				{
					"id": 701,
					"name": "家居百货"
				}, {
					"id": 412,
					"name": "服饰鞋包"
				}, {
					"id": 514,
					"name": "美妆个护"
				}, {
					"id": 621,
					"name": "数码电器"
				}
			];
			this.navList = navArray;
		},

		searchChange: function(t) {},

		queryPageGoods: function() {
			apigoodsList(1,10).then(res=>{
				res.map(function (t) {
				    if (t.tags) {
				        t.tags = t.tags.split(',');
				    } else {
				        t.tags = [];
				    }
				});
				this.goodsList = res;
			}).catch(err=>{
				console.log(err);
			})
		},

		checkToken: function(t) {},

		loginSuccess: function() {},

		initTenBeansData: function() {
			apitebBeansList(1,10).then(res=>{
				this.welfareTenBeansList = res;
			}).catch(err=>{
				console.log(err);
			})
		},

		initTenBeansList: function() {},

		initBeanWinning: function() {},

		beanWinningClose: function() {},

		bannerJump: function(t) {},

		navChange: function(t) {},

		navChangeQueryData: function() {},

		jumpToCoupon: function() {},

		jumpToMyRatrace: function() {},

		jumpToBeanList: function() {},

		jumpToDetail: function(t) {},

		jumpToDetailTen: function(t) {},

		jumpToWelfare: function(t) {},

		jumpToOrder: function() {},

		jumpToScoreDetail: function() {},

		jumpToRatRace: function(t) {},

		jumpToRace: function() {},

		jumpToLimiteGoods: function() {},

		winningClose: function(t) {},

		pageScrollTop: function() {}
	}
};
</script>
<style lang="scss">
	@import './pointStore.scss';
</style>
