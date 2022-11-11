<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus"></orange-fullloading>

		<view class="my-canvas-box" @touchmove.stop.prevent :class="posterInfo.status ? 'show' : 'hide'" @click="posterInfo.status = false">
			<canvas class="my-canvas" canvas-id="myCanvas" @longpress.stop="saveSharePic"></canvas>
			<view class="canvas-tip">长按可保存海报</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="weixin-header w-100 bg-white fixed-top" style="z-index: 9999;">
			<view class="row-ac" style="bottom: 13rpx;left: 0;right: 0;position: absolute;">
				<view class="ml-2 iconfont icon-back2-01" style="font-size: 36rpx;" @click="toBack()"></view>
				<view class="in1line ml-3">{{ goodsInfo.title || '' }}</view>
			</view>
		</view>
		<view class="w-100" style="height: 170rpx;"></view>
		<!-- #endif -->
		<!--商品轮播图-->
		<swiper :indicator-dots="true" autoplay :interval="3000" class="w-100" style="height: 750rpx;">
			<swiper-item class="w-100" style="height: 750rpx;" v-for="(item, index) in goodsInfo.img" :key="index">
				<image :src="item.img" mode="" class="w-100 h-100"></image>
			</swiper-item>
		</swiper>
		<!--商品信息-->
		<view class="w-100 bg-white ">
			<!--秒杀剩余时间-->
			<view class="seckill-time-box d-f bg-color" v-if="pageInfo.pageStatus === 'seckill' && pageInfo.productStatus == 1">
				<view class="price-box">
					<text class="font-s-5">￥</text>
					{{ goodsInfo.seckillPrice || '' }}
				</view>
				<view class="time-box">
					<view class="text">距离结束仅剩</view>
					<view class="time d-f">
						<text>{{ seckillTime.hou }}</text>
						:
						<text>{{ seckillTime.min }}</text>
						:
						<text>{{ seckillTime.sec }}</text>
					</view>
				</view>
			</view>
			<!-- 助力产品价格开始 -->
			<view class="row-ac flex-1" v-if="pageInfo.pageStatus === 'boost'">
				<view class="flex-1 bg-color row-ac flex-wrap" style="height:110rpx;">
					<view class="font-s-6 font-w ml-2"><text class="font-s-1">到手价:</text>￥{{ goodsInfo.price - goodsInfo.boostAmount || 0 | num1Filter }}</view>
					<view class="font-s-1 ml-2">结束时间：{{ goodsInfo.boostActivityAfter }}</view>
				</view>
				<view class="row-a-j-fc text-white" style="width: 220rpx; height:110rpx;background-color: #FFC600;">
					<view class="font-s-2">助力可减:￥{{ goodsInfo.boostAmount | numFilter }} </view>
					<view class="font-s-1">{{ goodsInfo.boostNumberPeople }}人助力</view>
				</view>
			</view>
			<!-- 助力产品价格结束 -->
			<view class="row-ac-sb flex-1 mx-2 pt-1">
				<!-- 秒杀产品价格开始 -->
				<view class="row-ac" v-if="pageInfo.pageStatus === 'seckill'">
					<view class="text-main-color font-s-6 font-w">
						<text class="font-s-3">￥</text>
						{{ goodsInfo.seckillPrice || '' }}
					</view>
					<view class="ml-3 text-de font-s-3 text-light-grey">
						<text>￥</text>
						{{ goodsInfo.price || '' }}
					</view>
				</view>
				<!-- 秒杀产品价格开始 -->



				<!-- 常规产品价格开始 -->
				<view class="row-ac" v-else>
					<view class="text-main-color font-s-6 font-w">
						<text class="font-s-3">￥</text>
						{{ goodsInfo.price }}
					</view>
					<view class="ml-3 text-de font-s-3 text-light-grey">
						<text>￥</text>
						{{ goodsInfo.marketPrice }}
					</view>
				</view>
				<!-- 常规产品价格结束 -->
				<view class="font-s-3 text-light-grey">{{ goodsInfo.soldCount }}人已经购买</view>
			</view>

            <view v-if="userCheckSku.gradePrice">会员价{{userCheckSku.gradePrice  || (goodsInfo.gradePrice | num1Filter) || '' }}</view>
			<view class="flex-1 ml-2 mr-2 pt-1 font-s-5">{{ goodsInfo.title }}</view>
			<view class="flex-1 mx-4 my-2 row-ac-sb pb-3 text-main-color">
				<view class="row-ac" @click="generatePoster">
					<view class="iconfont icon-haibao" style="font-size: 30rpx;"></view>
					<view class="font-s-4 ml-1">生成海报</view>
				</view>
				<view class="row-ac" @click="handleCollectGoods(goodsInfo)">
					<view class="iconfont icon-shoucang" style="font-size: 34rpx;" v-if="goodsInfo.collectstaue === 0"></view>
					<view class="iconfont icon-guanzhu2" style="font-size: 26rpx;" v-else></view>
					<view class="font-s-4 ml-1" v-if="goodsInfo.collectstaue === 0">收藏</view>
					<text class="font-s-4 ml-1" v-else>已收藏</text>
				</view>
			</view>
		</view>

		<view class="group-buying" v-if="pageInfo.pageStatus === 'groupBuying'">
			<view v-if="groupBuyingList.length">
				<view class="group-title">
					<div class="title__text">可直接参TA们的团</div>
					<div class="title__rule">拼团流程 ></div>
				</view>
				<view class="group-list">
					<view class="group-item" v-for="(item,index) in groupBuyingList" :key="index">
						<div class="item__info">
							<image class="header" :src="item.userImage"></image>
							<div class="info-detail">
								<div class="name">{{item.userName}}</div>
								<div class="count-time">
									<div class="count">仅差{{item.allPeopleCount - item.usedPeopleCount}}人成团</div>
									<div class="time">{{item.formatTime}}结束</div>
								</div>

							</div>
						</div>
						<div class="go-group" @click="toGroup(item)">去参团</div>
					</view>
				</view>
			</view>
			<view v-else>暂时无人开团，快去发起吧</view>
		</view>

		<view>{{this.pageInfo.uuid}}</view>
		<!--规格选择-->
		<view class="w-100 bg-white mt-2 font-s-4">
			<view class="p-3 flex-1 border-bottom text-light-grey">
				保障
				<text class="ml-3 text-dark">厂家直供.官方正品.七天无忧退换</text>
			</view>
			<view class="p-3 flex-1 border-bottom text-light-grey">
				发货
				<text class="ml-3 text-dark">商城直营</text>
			</view>

			<view class="p-3 row-ac-sb flex-1 border-bottom text-light-grey" v-if="!singleSpecificationStatus" @click="toggle('bottom')">
				<view>
					已选
					<text class="ml-3 text-dark">{{ userChooseSkuText }}</text>
				</view>
				<view class="iconfont icon-sandian fon7"></view>
			</view>
		</view>
		<!--用户评价-->
		<view class="w-100 bg-white mt-2">
			<view class="row-ac-sb flex-1 border-bottom">
				<view class="p-2 font-w">
					用户评价
					<text class="text-light-grey font-s-3"><text v-if="goodsInfo.rating < 0">({{ goodsInfo.appraisesCounts }})</text></text>
				</view>
				<view class="mr-2 text-light-grey font-s-3" v-if="goodsInfo.rating > 0" @click="navTo('/pages/product/goods-evaluate-list?productId=' + goodsInfo.id)">
					<text class="text-main-color">{{ goodsInfo.rating }}%</text>
					好评率
					<text class="iconfont icon-xiangxia" style="font-size: 24rpx;"></text>
				</view>
				<view class="mr-2 text-light-grey font-s-3" v-else>暂无评论</view>
			</view>
			<view class="">
				<view class="px-2 mb-2" v-for="item in goodsEvaluateList" :key="item.id">
					<view class="d-f pt-1 pb-1">
						<view v-if="item.userImage !== '匿名评价'"><image :src="item.userImage" mode="" class="evaluate-userImage rounded-50" /></view>
						<view v-else><image :src="userImg" mode="" class="evaluate-userImage rounded-50 border" /></view>
						<view class="ml-1">
							<view class="font-s-1 text-light-grey">{{ item.userName || '匿名评论' }}</view>
							<view class="mt"><xiaoStarComponent :starCount="item.productScore" :iconFontSize="10" :iconfMarginRight="1" /></view>
						</view>
					</view>
					<view class="flex-1 font-s-4 text-light-grey font-s-4">{{ item.content }}</view>
					<view class="d-f mt-2 pb-3 font-s-2 text-light-grey">
						<view class="">规格:{{ item.skuName }}</view>
						<view class=" ml-2">{{ item.createdAt }}</view>
					</view>
					<view class="row-ac flex-1 flex-wrap">
						<scroll-view scroll-x class="scroll-row">
							<view class="rounded mr-2 mb-2 scroll-row-item" v-for="item1 in item.images" :key="item1.id">
								<image :src="item1" mode="" style="width: 200rpx;height: 200rpx;" class="rounded"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<view class="w-100 mt-2 flex-1 bg-white " style="padding-bottom: 120rpx;">
			<view class="row flex-1 pt-2 pb-2 text-light-grey font-s-5">图文详情</view>
			<view class="image-text"><rich-text :nodes="goodsInfo.description"></rich-text></view>
		</view>
		<!-- 规格选择弹窗 -->
		<uni-popup id="popup" ref="popup" :type="type" :animation="false">
			<view class="popup-specifications w-100 bg-white">
				<view class="d-f pt-4">
					<image :src="specificationsImg" mode="" class="rounded ml-2" style="width: 120rpx;height: 120rpx;"></image>
					<view class="ml-2 flex-1 mr-2">
						<view class="">{{ goodsInfo.title }}</view>
						<view class="text-light-grey  font-s-3">
							已选:
							<text class="ml-2"></text>
							{{ userChooseSkuText }}
						</view>
					</view>
				</view>
				<view class="sku-price ml-2 mt-2">
					<view class="text-light-grey font-s-6">
						价格：
						<text class="text-main-color font-s-6 font-w">￥{{ userCheckSku.price || goodsInfo.seckillPrice || goodsInfo.price }}</text>
					</view>
				</view>
                <view class="sku-price ml-2 mt-2">
                    <view class="text-light-grey font-s-6">
                        会员价：
                        <text class="text-main-color font-s-6 font-w">￥{{userCheckSku.gradePrice  || goodsInfo.gradePrice}}</text>
                    </view>
                </view>
				<view class="mt-1">
					<view class="ml-2 mt-5" v-for="(item, index) in goodsInfo.chooseGoodsSkuList" :key="item.id">
						<view class="font-s-6">{{ item.skuKey }}</view>
						<view class="row-ac-fw mt-2">
							<view
								class="mr-2 mb-2 bg-hover-light rounded font-s-4 text-muted"
								v-for="(itemLabel, index) in item.skuLabel"
								:key="itemLabel.id"
								:class="{ 'label-check': itemLabel.checked }"
								@tap="skuLabelClick(item, itemLabel, index)"
								style="padding: 10rpx 30rpx;"
							>
								{{ itemLabel.name }}
							</view>
						</view>
					</view>
				</view>
				<view class="goods-num-box d-f">
					<text>购买数量：</text>
					<view class="" @click="increment">-</view>
					<input type="number" v-model="goodsAmount" />
					<view class="" @click="decrement">+</view>
				</view>
				<!-- 秒杀选择规格弹窗下面的按钮 -->
				<view class="fixed-bottom w-100 row  bg-white" style="height: 100rpx;z-index: 1099;" v-if="pageInfo.pageStatus === 'seckill'">
					<view v-if="pageInfo.productStatus == 2" class="row bg-color rounded" style="width: 230rpx; height: 80rpx;">尚未开始</view>
					<view v-else-if="pageInfo.productStatus == 0" class="row bg-color rounded" style="width: 230rpx; height: 80rpx;">已结束</view>
					<view v-else class="row bg-color rounded" style="width: 230rpx; height: 80rpx;" @tap="seckillBuyNow">立即购买</view>
				</view>

				<!-- 助力选择规格弹窗下面的按钮 -->
				<view class="fixed-bottom w-100 row  bg-white" style="height: 100rpx;z-index: 1099;" v-else-if="pageInfo.pageStatus === 'boost'">
					<view class="row bg-color rounded mr-2 mb-2" @tap="buyNow" style="width: 230rpx; height: 80rpx;">直接购买</view>
					<view class="row bg-color rounded mb-2" style="width: 230rpx; height: 80rpx;" @tap="boostLaunch">助力购买</view>
				</view>

				<!-- 拼团规格弹窗下面的按钮 -->
				<view class="fixed-bottom w-100 row  bg-white" style="height: 100rpx;z-index: 1099;" v-else-if="pageInfo.pageStatus === 'groupBuying'">
					<view class="row bg-color rounded mr-2 mb-2" @tap="buyNow" style="width: 230rpx; height: 80rpx;">直接购买</view>
					<view class="row bg-color rounded mb-2" style="width: 230rpx; height: 80rpx;" v-if="!pageInfo.uuid" @tap="groupBuyingLaunch(false)">发起拼团</view>
					<view class="row bg-color rounded mb-2" style="width: 230rpx; height: 80rpx;" v-else @tap="groupBuyingLaunch(pageInfo.uuid)">参加拼团</view>
				</view>

				<!-- 正常状态选择规格弹窗下面的按钮 -->
				<view class="fixed-bottom w-100 row  bg-white" style="height: 100rpx;z-index: 1099;" v-else>
					<view class="row bg-color rounded mr-2 mb-2" @tap="addToCat" style="width: 230rpx; height: 80rpx;">加入购物车</view>
					<view class="row bg-color rounded mb-2" style="width: 230rpx; height: 80rpx;" @tap="buyNow">立即购买</view>
				</view>
				<view style="padding-bottom: 350rpx;"></view>
			</view>
		</uni-popup>
		<!-- 底部栏固定 -->
		<view class="w-100 bg-white fixed-bottom row-ac border-top" style="height: 140rpx;">
			<view class="row-ac ml-2 pb-2" style="width: 43%;height: 120rpx;">
				<view class="flex-1 d-f">
					<navigator class="row-a-j-fc" url="/pages/index/index" open-type="switchTab">
						<view class="iconfont icon-shouye1 font-s-7"></view>
						<view class="font-s-2">首页</view>
					</navigator>
				</view>
				<view class=" flex-1 d-f">
					<view class="row-a-j-fc" @click="toService">
						<view class="iconfont icon-kefu font-s-7"></view>
						<view class="font-s-2">客服</view>
					</view>
				</view>
				<view class=" flex-1 d-f">
					<navigator class="row-a-j-fc" url="/pages/cart/cart" open-type="switchTab">
						<view class="iconfont icon-gouwuchekong font-s-7"></view>
						<view class="font-s-2">购物车</view>
					</navigator>
					<view class="rounded-50 bg-color row font-s-2" style="width: 35rpx;height: 35rpx;margin-left: -30rpx;margin-top: -0rpx;" v-if="shopCartNum > 0">
						{{ shopCartNum }}
					</view>
				</view>
			</view>
			<!-- 秒杀底部立即购买按钮 -->
			<view class="row bg-white pb-2" style="width: 57%;height: 120rpx;" v-if="pageInfo.pageStatus === 'seckill'">
				<view v-if="pageInfo.productStatus == 2" class="row seckill-buy-now font-s-4">尚未开始</view>
				<view v-else-if="pageInfo.productStatus == 0" class="row seckill-buy-now font-s-4">已结束</view>
				<view v-else class="row seckill-buy-now font-s-4" @click="toggle('bottom')">立即购买</view>
			</view>
			<!-- 助力底部立即购买按钮 -->
			<view class="row bg-white pb-2" style="width: 57%;height: 120rpx;" v-else-if="pageInfo.pageStatus === 'boost'">
				<view class="row bg-color add-to-cart font-s-4" @click="toggle('bottom')">直接购买</view>
				<view class="row bg-color buy-now font-s-4" @click="toggle('bottom')">助力购买</view>
			</view>
			<view class="row bg-white pb-2" style="width: 57%;height: 120rpx;" v-else-if="pageInfo.pageStatus === 'groupBuying'">
				<view class="row bg-color add-to-cart font-s-4" @click="toggle('bottom')">直接购买</view>
				<view class="row bg-color buy-now font-s-4" v-if="!pageInfo.uuid" @click="toggle('bottom')">发起拼团</view>
				<view class="row bg-color buy-now font-s-4" v-else @click="toggle('bottom')">参加拼团</view>
			</view>
			<!-- 正常商品底部立即购买按钮 -->
			<view class="row bg-white pb-2" style="width: 57%;height: 120rpx;" v-else>
				<view class="row bg-color add-to-cart font-s-4" @click="toggle('bottom')">加入购物车</view>
				<view class="row bg-color buy-now font-s-4" @click="toggle('bottom')">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	productDetail,
	getSeckillGoodsDetail,
	addToCartUrl,
	getCartListUrl,
	getNormalGoodsWechatCode,
	getSkillGoodsWechatCode,
	boostProductDetailUrl,
	boostLaunchUrl,
	changeCollectGoodsUrl,
	getOrderEvaluateListUrl,
	getGroupBuyingProductDetailUrl,
	getAllGroupBuyingListByActiveIdUrl
} from '@/api/index.js';
import uniPopup from '@/components/uni/uni-popup/uni-popup.vue';
import { formatRichText,getYMDHMS } from '@/utils/util';
import xiaoStarComponent from '@/components/xiao-star-component/xiao-star-component.vue';
export default {
	components: {
		uniPopup,
		xiaoStarComponent
	},
	data() {
		return {
			goodsInfo: {
				description: '', //商品详情图
				chooseGoodsSkuList: [], // 供用户选择的SKU列表
				goodsSkusList: [] // 商品有的规格列表
			},
			userChooseSku: {}, // 用户选择中的sku对象
			userCheckSku: {}, // 用户已经选中的sku
			userChooseSkuText: '', // 用户选择sku文字
			specificationsImg: '', //弹窗第一张图片
			userImg: '/static/img/header-img.png', //评论用户头像
			prodcutId: '',
			type: 'top',
			goodsAmount: 1,
			// 购物车数量
			shopCartNum: '',
			// 单规格
			singleSpecificationStatus: false,
			loadingStatus: true,
			pageInfo: {
				pageStatus: '',
				// 秒杀状态0已结束  1进行中 2未开始
				productStatus: '',
				activeId: '',
				// 是否扫码进入的商品详情页
				isScene: false,
				// 助力的活动id
				boostId: ''
			},
			seckillTime: {
				hou: 0,
				min: 0,
				sec: 0
			},
			posterInfo: {
				status: false,
				imgSrc: '',
				qrSrc: '',
				title: '',
				priceTxt: '',
				originalTxt: ''
			},
			goodsEvaluateList: [],
			goodsEvaluateListQueryInfo: {
				page: 1,
				pageSize: 2,
				productId: ''
			},
			groupBuyingList:[]
		};
	},
	filters: {
		numFilter(value) {
			let realVal = parseFloat(value).toFixed(0);
			return realVal;
		},
		num1Filter(value) {
			let realVal = parseFloat(value).toFixed(1);
			return realVal;
		}
	},
	onLoad(option) {
		this.initData(option);
	},
	// 返回按钮
	onBackPress(e) {
		if (e.from == 'backbutton') {
			this.toBack();
			return true;
		}
	},
	// 页面销毁事件
	onUnload(options) {
		this.toBack();
	},
	onHide() {
		uni.removeStorageSync('person-card');
	},

	methods: {
		async initData(options) {
			if (options.scene) {
				// 如果是通过扫码小程序码进入的（因为通过小程序码进入，只有一个scene的参数）
				// 先把参数转化为数组的格式，然后取值判断数据
				console.log(options.scene);
				// 先把参数里面的ASCII码中的【,】字符转为,
				let sceneString = options.scene.replace(/%2C/g, ',');
				let optionArr = sceneString.split(',');
				console.log(optionArr);
				// 默认数组第二个参数是商品的id
				this.prodcutId = optionArr[1];
				// 扫码进来的商品，因为返回上一页无效，所以加个状态，返回上一页的时候让返回首页
				this.pageInfo.isScene = true;
				if (optionArr[2]) {
					// 如果有第三个参数，说明是秒杀商品进来的
					this.pageInfo.activeId = optionArr[2];
					this.pageInfo.pageStatus = 'seckill';
				}
				// 把分销商id存储到vuex中
				this.$store.commit('changeShareDistributeId', optionArr[0]);
				await this.getDetail(this.pageInfo);
			} else if (options.boostId) {
				// 助力商品
				this.pageInfo.pageStatus = 'boost';
				this.pageInfo.boostId = options.boostId;
				await this.getDetail(this.pageInfo);
			}else if(options.pageStatus === 'groupBuying'){
				console.log(options)
				this.pageInfo.pageStatus = 'groupBuying';
				this.$set(this.pageInfo,'activityId',options.activityId)
				if(options.uuid){
					this.$set(this.pageInfo,'uuid',options.uuid)
				}
				await this.getDetail(this.pageInfo);
			}else {
				this.prodcutId = options.productId;
				this.pageInfo.pageStatus = options.pageStatus;
				this.pageInfo.activeId = options.activeId;
				await this.getDetail(this.pageInfo);
			}
			await this.getShopCart();
			await this.getGoodsEvaluateList();
			// 异步延迟加载
			setTimeout(() => {
				this.loadingStatus = false;
			}, 100);
		},
		// 获取评价列表
		getGoodsEvaluateList() {
			this.goodsEvaluateListQueryInfo.productId = this.prodcutId;
			this.$R.get(getOrderEvaluateListUrl, this.goodsEvaluateListQueryInfo).then(res => {
				this.goodsEvaluateList = res.data.list;
				console.log('+++++++++++++++++++++++++++++++++');
				console.log(this.goodsEvaluateList);
				this.goodsEvaluateList.forEach(item => {
					item.productScore = Number(item.productScore);
					if (item.sku) {
						item.skuName = [];
						for (let i in item.sku) {
							item.skuName.push(item.sku[i]);
						}
						item.skuName = item.skuName.join('，');
					}
				});
			});
		},
		getDetail(pageInfo) {
			if (pageInfo.pageStatus === 'seckill') {
				let httpObj = {
					activityId: pageInfo.activeId,
					productId: this.prodcutId
				};
				this.$R.get(getSeckillGoodsDetail, httpObj).then(res => {
					this.goodsInfo = res.data;
					
					this.goodsInfo.chooseGoodsSkuList = [];
					this.specificationsImg = res.data.img[0].img; //规格第一张图片
					this.goodsInfo.goodsSkusList = res.data.skus;
					this.goodsInfo.description = formatRichText(res.data.description);

					// 获取当前时间
					let date1 = new Date();
					// 去掉时间戳的毫秒
					let nowTime = Number(String(date1.getTime()).substring(0, 10));
					// 根据当前时间和秒杀商品返回的开始，结束时间，判断商品状态

					console.log('开始时间', this.goodsInfo.startAt);
					console.log('当前时间', nowTime);
					console.log('结束时间', this.goodsInfo.endAt);
					if (this.goodsInfo.startAt < nowTime && this.goodsInfo.endAt > nowTime) {
						// 开始时间小于当前时间并且结束时间大于当前时间，页面秒杀状态变为秒杀进行中
						this.pageInfo.productStatus = 1;
					} else if (this.goodsInfo.startAt > nowTime) {
						// 开始时间大于当前时间，秒杀状态改为未开始
						this.pageInfo.productStatus = 2;
					} else if (this.goodsInfo.endAt < nowTime) {
						// 结束时间小于当前时间，状态改为已结束
						this.pageInfo.productStatus = 0;
					}
					console.log(nowTime);
					// 计算当前时间和秒杀活动的剩余时间
					let surplusTime = this.goodsInfo.endAt - nowTime;
					if (surplusTime > 0) {
						this.seckillTime.hou =
							parseInt((surplusTime % (60 * 60 * 24)) / 3600) < 10
								? '0' + parseInt((surplusTime % (60 * 60 * 24)) / 3600)
								: parseInt((surplusTime % (60 * 60 * 24)) / 3600);
						this.seckillTime.min =
							parseInt(((surplusTime % (60 * 60 * 24)) % 3600) / 60) < 10
								? '0' + parseInt(((surplusTime % (60 * 60 * 24)) % 3600) / 60)
								: parseInt(((surplusTime % (60 * 60 * 24)) % 3600) / 60);
						this.seckillTime.sec =
							parseInt(((surplusTime % (60 * 60 * 24)) % 3600) % 60) < 10
								? '0' + parseInt(((surplusTime % (60 * 60 * 24)) % 3600) % 60)
								: parseInt(((surplusTime % (60 * 60 * 24)) % 3600) % 60);
					}
					let timer = setInterval(() => {
						--this.seckillTime.sec;
						if (this.seckillTime.sec < 0) {
							this.seckillTime.sec = 59;
							--this.seckillTime.min;
							if (this.seckillTime.min < 0) {
								this.seckillTime.min = 59;
								--this.seckillTime.hou;
								if (this.seckillTime.hou < 0) {
									// 如果秒杀结束，清除倒计时
									clearInterval(timer);
									this.pageInfo.productStatus = 0;
								} else if (this.seckillTime.hou < 10) {
									// 小于10在前面追加0
									this.seckillTime.hou = '0' + this.seckillTime.hou;
								}
							} else if (this.seckillTime.min < 10) {
								// 小于10在前面追加0
								this.seckillTime.min = '0' + this.seckillTime.min;
							}
						} else if (this.seckillTime.sec < 10) {
							// 小于10在前面追加0
							this.seckillTime.sec = '0' + this.seckillTime.sec;
						}
					}, 1000);

					if (res.data.attributeList.length == 0 && res.data.skus.length == 0) {
						// 如果是单规格
						this.singleSpecificationStatus = true;
					} else {
						// 把后台返回的供选择的sku列表，从对象转化为数组的格式
						let goosSkuObj = res.data.attributeList;
						// 自增一个数字，用来组合规格的id，因为微信小程序上面id不能相同
						let newSkuLabelId = 0;
						for (let i in goosSkuObj) {
							++newSkuLabelId;
							let o = {
								id: newSkuLabelId,
								skuKey: '',
								skuLabel: []
							};
							o.skuKey = i;
							let idNum = 1;
							for (let j = 0; j < goosSkuObj[i].length; j++) {
								o.skuLabel.push({
									id: newSkuLabelId + j,
									checked: false,
									name: goosSkuObj[i][j]
								});
							}
							// 把重新生成的商品sku列表添加到chooseGoodsSkuList里面
							this.goodsInfo.chooseGoodsSkuList.push(o);
							// 默认第一个是选中状态
							o.skuLabel[0].checked = true;
							this.userChooseSkuText += o.skuLabel[0].name + '，';
							this.goodsInfo.chooseGoodsSkuList.forEach(item => {
								this.userChooseSku[item.skuKey] = item.skuLabel[0].name;
							});
							this.userCheckSku = res.data.skus[0];
						}
					}
				});
			}
			else if (pageInfo.pageStatus === 'boost') {
				this.$R.get(boostProductDetailUrl + pageInfo.boostId, { id: pageInfo.boostId }).then(res => {
					this.goodsInfo = res.data;
					this.goodsInfo.chooseGoodsSkuList = [];
					this.specificationsImg = res.data.img[0].img; //规格第一张图片
					this.goodsInfo.goodsSkusList = res.data.skus;
					this.prodcutId = res.data.id;
					this.goodsInfo.description = formatRichText(res.data.description);
					if (res.data.attributeList.length == 0 && res.data.skus.length == 0) {
						// 如果是单规格
						this.singleSpecificationStatus = true;
					} else {
						// 把后台返回的供选择的sku列表，从对象转化为数组的格式
						let goosSkuObj = res.data.attributeList;
						// 自增一个数字，用来组合规格的id，因为微信小程序上面id不能相同
						let newSkuLabelId = 0;
						for (let i in goosSkuObj) {
							++newSkuLabelId;
							let o = {
								id: newSkuLabelId,
								skuKey: '',
								skuLabel: []
							};
							o.skuKey = i;
							let idNum = 1;
							for (let j = 0; j < goosSkuObj[i].length; j++) {
								o.skuLabel.push({
									id: newSkuLabelId + j,
									checked: false,
									name: goosSkuObj[i][j]
								});
							}
							// 把重新生成的商品sku列表添加到chooseGoodsSkuList里面
							this.goodsInfo.chooseGoodsSkuList.push(o);
							// 默认第一个是选中状态
							o.skuLabel[0].checked = true;
							this.userChooseSkuText += o.skuLabel[0].name + '，';
							this.goodsInfo.chooseGoodsSkuList.forEach(item => {
								this.userChooseSku[item.skuKey] = item.skuLabel[0].name;
							});
							this.userCheckSku = res.data.skus[0];
						}
					}
				});
			}
			else if(pageInfo.pageStatus === 'groupBuying'){
				// 拼团商品详情
				this.$R.get(getGroupBuyingProductDetailUrl + pageInfo.activityId).then(res => {
					this.goodsInfo = res.data;

					this.goodsInfo.chooseGoodsSkuList = [];
					this.specificationsImg = res.data.img[0].img; //规格第一张图片
					this.goodsInfo.goodsSkusList = res.data.skus;
					this.goodsInfo.description = formatRichText(res.data.description);
					this.prodcutId = res.data.id
					if (res.data.attributeList.length == 0 && res.data.skus.length == 0) {
						// 如果是单规格
						this.singleSpecificationStatus = true;
					}
					else {
						// 把后台返回的供选择的sku列表，从对象转化为数组的格式
						let goosSkuObj = res.data.attributeList;
						// 自增一个数字，用来组合规格的id，因为微信小程序上面id不能相同
						let newSkuLabelId = 0;
						for (let i in goosSkuObj) {
							++newSkuLabelId;
							let o = {
								id: newSkuLabelId,
								skuKey: '',
								skuLabel: []
							};
							o.skuKey = i;
							let idNum = 1;
							for (let j = 0; j < goosSkuObj[i].length; j++) {
								o.skuLabel.push({
									id: newSkuLabelId + j,
									checked: false,
									name: goosSkuObj[i][j]
								});
							}
							// 把重新生成的商品sku列表添加到chooseGoodsSkuList里面
							this.goodsInfo.chooseGoodsSkuList.push(o);
							// 默认第一个是选中状态
							o.skuLabel[0].checked = true;
							this.userChooseSkuText += o.skuLabel[0].name + '，';
							this.goodsInfo.chooseGoodsSkuList.forEach(item => {
								this.userChooseSku[item.skuKey] = item.skuLabel[0].name;
							});
							this.userCheckSku = res.data.skus[0];
						}
					}
					this.getGroupBuyingList()
				})
			}
			else {
				// 常规获取商品详情
				this.$R.get(productDetail + this.prodcutId).then(res => {
					this.goodsInfo = res.data;
					console.log("AAAAAA123");
					console.log(this.goodsInfo);
					this.goodsInfo.chooseGoodsSkuList = [];
					this.specificationsImg = res.data.img[0].img; //规格第一张图片
					this.goodsInfo.goodsSkusList = res.data.skus;
					this.goodsInfo.description = formatRichText(res.data.description);
					if (res.data.attributeList.length == 0 && res.data.skus.length == 0) {
						// 如果是单规格
						this.singleSpecificationStatus = true;
					} else {
						// 把后台返回的供选择的sku列表，从对象转化为数组的格式
						let goosSkuObj = res.data.attributeList;
						// 自增一个数字，用来组合规格的id，因为微信小程序上面id不能相同
						let newSkuLabelId = 0;
						for (let i in goosSkuObj) {
							++newSkuLabelId;
							let o = {
								id: newSkuLabelId,
								skuKey: '',
								skuLabel: []
							};
							o.skuKey = i;
							let idNum = 1;
							for (let j = 0; j < goosSkuObj[i].length; j++) {
								o.skuLabel.push({
									id: newSkuLabelId + j,
									checked: false,
									name: goosSkuObj[i][j]
								});
							}
							// 把重新生成的商品sku列表添加到chooseGoodsSkuList里面
							this.goodsInfo.chooseGoodsSkuList.push(o);
							// 默认第一个是选中状态
							o.skuLabel[0].checked = true;
							this.userChooseSkuText += o.skuLabel[0].name + '，';
							this.goodsInfo.chooseGoodsSkuList.forEach(item => {
								this.userChooseSku[item.skuKey] = item.skuLabel[0].name;
							});
							this.userCheckSku = res.data.skus[0];
						}
					}
				});
			}
		},
		// 获取当前拼团列表
		getGroupBuyingList(){
			const that = this
			this.$R.get(getAllGroupBuyingListByActiveIdUrl + this.pageInfo.activityId).then(res => {
				console.log(res)
				if(res && res.data && res.data.length){
					this.groupBuyingList = res.data
					if(this.groupBuyingList && this.groupBuyingList.length){
						this.groupBuyingList.forEach(item=>{
							if(item.endTime){
								const formatTime = getYMDHMS(item.endTime)
								that.$set(item,'formatTime',formatTime)
							}
						})
					}
					console.log(this.groupBuyingList)
				}
			})
		},
		// 获取购物车数量
		getShopCart() {
			// 如果token为空，直接返回
			if (uni.getStorageSync('token') == '') {
				return;
			}
			this.$R.get(getCartListUrl).then(res => {
				this.shopCartNum = res.data.list.length;
				this.$store.commit('shopCartNumChange', this.shopCartNum);
			});
		},
		// 商品-1
		increment() {
			if (this.goodsAmount <= 1) {
				return;
			}
			this.goodsAmount--;
		},
		// 商品+1
		decrement() {
			this.goodsAmount++;
		},

		// 选择商品规格
		skuLabelClick(item, itemLabel, index) {
			// 把点击的那一列checked重置为false
			for (let i = 0; i < item.skuLabel.length; i++) {
				item.skuLabel[i].checked = false;
			}
			// 让点击的哪一个checked变为true
			item.skuLabel[index].checked = true;
			this.userChooseSku[item.skuKey] = itemLabel.name;
			for (let i = 0; i < this.goodsInfo.goodsSkusList.length; i++) {
				if (this.isObjectValueEqualNew(this.userChooseSku, this.goodsInfo.goodsSkusList[i].productSpecs)) {
					this.userCheckSku = this.goodsInfo.goodsSkusList[i];
				}
			}
			this.userChooseSkuText = Object.values(this.userChooseSku).toString();
		},
		// 判断对象键和值是否相等
		isObjectValueEqualNew(a, b) {
			// 判断两个对象是否指向同一内存，指向同一内存返回true
			if (a === b) return true;
			// 获取两个对象键值数组
			let aProps = Object.getOwnPropertyNames(a);
			let bProps = Object.getOwnPropertyNames(b);
			// 判断两个对象键值数组长度是否一致，不一致返回false
			if (aProps.length !== bProps.length) return false;
			// 遍历对象的键值
			for (let prop in a) {
				// 判断a的键值，在b中是否存在，不存在，返回false
				if (b.hasOwnProperty(prop)) {
					// 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
					if (typeof a[prop] === 'object') {
						if (!this.isObjectValueEqualNew(a[prop], b[prop])) return false;
					} else if (a[prop] !== b[prop]) {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		},
		// 立即购买
		async buyNow() {
			if (this.goodsAmount <= 0) {
				return uni.showToast({
					title: '商品数量不能小于0',
					icon: 'none',
					duration: 3000
				});
			}
			// 如果没有登录，跳转到登录页面
			if (uni.getStorageSync('token') == '') {
				uni.showToast({
					title: '请先登录，2秒后将跳转到登录页面',
					icon: 'none',
					duration: 3000
				});
				await setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 2000);
				return false;
			}
			let httpObj = {};
			if (this.singleSpecificationStatus) {
				// 如果是单规格
				httpObj = {
					sku: [
						{
							amount: this.goodsAmount,
							productId: Number(this.prodcutId),
							skuId: 0
						}
					]
				};
			} else {
				// 多规格
				httpObj = {
					sku: [
						{
							amount: this.goodsAmount,
							productId: Number(this.prodcutId),
							skuId: this.userCheckSku.id
						}
					]
				};
			}
			httpObj = JSON.stringify(httpObj);
			uni.navigateTo({
				url: '/pages/order/establishorder?orderType=buyNow&goodsAttribute=' + httpObj
			});
		},
		// 秒杀立即购买
		async seckillBuyNow() {
			if (this.goodsAmount <= 0) {
				return uni.showToast({
					title: '商品数量不能小于0',
					icon: 'none',
					duration: 3000
				});
			}
			// 如果没有登录，跳转到登录页面
			if (uni.getStorageSync('token') == '') {
				uni.showToast({
					title: '请先登录，2秒后将跳转到登录页面',
					icon: 'none',
					duration: 3000
				});
				await setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 2000);
				return false;
			}
			let httpObj = {};
			if (this.singleSpecificationStatus) {
				// 如果是单规格
				httpObj = {
					sku: [
						{
							amount: this.goodsAmount,
							productId: Number(this.prodcutId),
							skuId: 0
						}
					]
				};
			} else {
				// 多规格
				httpObj = {
					sku: [
						{
							amount: this.goodsAmount,
							productId: Number(this.prodcutId),
							skuId: this.userCheckSku.id
						}
					]
				};
			}
			httpObj = JSON.stringify(httpObj);
			uni.navigateTo({
				url: '/pages/order/establishorder?orderType=seckill&activeId=' + this.pageInfo.activeId + '&goodsAttribute=' + httpObj
			});
		},

		// 申请助力，并跳转到助力详情页
		async boostLaunch() {
			// 如果没有登录，跳转到登录页面
			if (uni.getStorageSync('token') == '') {
				uni.showToast({
					title: '请先登录，2秒后将跳转到登录页面',
					icon: 'none',
					duration: 3000
				});
				await setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 2000);
				return false;
			}
			let httpObj = {
				id: this.pageInfo.boostId,
				skuId: ''
			};
			if (this.singleSpecificationStatus) {
				// 如果是单规格
				httpObj.skuId = 0;
			} else {
				// 多规格
				httpObj.skuId = this.userCheckSku.id;
			}
			this.$R.put(boostLaunchUrl + this.pageInfo.boostId, httpObj).then(res => {
				uni.showToast({
					title: '发起助力成功，2秒后跳转到助力详情页面',
					icon: 'none',
					duration: 3000
				});
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/boost/boost-launch-detail?boostId=${res.data.id}`
					});
				}, 2000);
			});
		},

		// 发起拼团
		async groupBuyingLaunch(uuid){
			// 如果没有登录，跳转到登录页面
			if (uni.getStorageSync('token') == '') {
				uni.showToast({
					title: '请先登录，2秒后将跳转到登录页面',
					icon: 'none',
					duration: 3000
				});
				await setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 2000);
				return false;
			}
			let httpObj = {
				activityId: this.pageInfo.activityId,
				skuId: '',
				amount: this.goodsAmount,
				productId: Number(this.prodcutId),
			};
			if(uuid){
				httpObj.uuid = uuid
			}
			if (this.singleSpecificationStatus) {
				// 如果是单规格
				httpObj.skuId = 0;
			} else {
				// 多规格
				httpObj.skuId = this.userCheckSku.id;
			}
			httpObj = JSON.stringify(httpObj);
			uni.navigateTo({
				url: '/pages/order/establishorder?orderType=groupBuying&goodsAttribute=' + httpObj
			});
		},

		// 添加到购物车
		async addToCat() {
			if (this.goodsAmount <= 0) {
				return uni.showToast({
					title: '商品数量不能小于0',
					icon: 'none',
					duration: 3000
				});
			}
			// 如果没有登录，跳转到登录页面
			if (uni.getStorageSync('token') == '') {
				uni.showToast({
					title: '请先登录，2秒后将跳转到登录页面',
					icon: 'none',
					duration: 3000
				});
				await setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 2000);
				return false;
			}

			if (!this.singleSpecificationStatus && JSON.stringify(this.userCheckSku) == '{}') {
				// 如果不是单规格，并且没有选中规格
				return uni.showToast({
					title: '请选择商品规格',
					icon: 'none',
					duration: 3000
				});
			}

			let httpObj = {};
			httpObj.productId = this.prodcutId;
			httpObj.skuId = this.userCheckSku.id;
			httpObj.amount = this.goodsAmount;
			// 添加到购物车
			await this.$R.post(addToCartUrl, httpObj).then(res => {
				uni.showToast({
					title: '添加购物车成功'
				});
				this.$refs.popup.close();
			});
			this.getShopCart();
		},

		// 添加、取消收藏商品
		handleCollectGoods(goodsInfo) {
			let httpObj = {
				productid: goodsInfo.id,
				state: 0
			};
			if (goodsInfo.collectstaue === 0) {
				httpObj.state = 1;
			}
			this.$R.post(changeCollectGoodsUrl, httpObj).then(res => {
				if (httpObj.state === 1) {
					uni.showToast({
						title: '添加收藏成功',
						icon: 'none'
					});
					this.goodsInfo.collectstaue = 1;
				} else {
					uni.showToast({
						title: '已取消收藏',
						icon: 'none'
					});
					this.goodsInfo.collectstaue = 0;
				}
			});
		},
		toService() {
			uni.navigateTo({
				url: '/pages/chat/privateChat',
			});
		},
		toBack() {
			if (this.pageInfo.isScene) {
				// 如果是扫码进入，直接跳回首页
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else {
				// 扫码进入无法返回上一页，所以要做个判断
				uni.navigateBack({
					delta: 1
				});
			}
		},
		toggle(type) {
			this.type = type;
			this.$refs.popup.open();
		},
		navTo(url) {
			uni.navigateTo({
				url
			});
		},
		// 生成海报
		async generatePoster() {
			// 如果没有登录，跳转到登录页面
			if (uni.getStorageSync('token') == '') {
				uni.showToast({
					title: '请先登录，2秒后将跳转到登录页面',
					icon: 'none',
					duration: 3000
				});
				await setTimeout(() => {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}, 2000);
				return false;
			}
			let context = uni.createCanvasContext('myCanvas');
			let userInfo = uni.getStorageSync('userInfo');
			// 加载动画
			this.loadingStatus = true;
			uni.showToast({
				title: '正在生成海报，请稍后',
				icon: 'none',
				duration: 3000
			});
			// 小程序码图片
			let qrImg = '';
			if (this.pageInfo.pageStatus === 'seckill') {
				// 秒杀商品生成小程序推广码
				let httpObj = {
					productId: this.prodcutId,
					activityId: this.pageInfo.activeId
				};
				await this.$R.get(getSkillGoodsWechatCode, httpObj).then(res => {
					qrImg = res.data;
				});
			} else {
				// 正常商品生成小程序推广码
				await this.$R.get(getNormalGoodsWechatCode, { productId: this.prodcutId }).then(res => {
					qrImg = res.data;
				});
			}

			// 给整个填充白色背景
			context.setFillStyle('#ffffff');
			context.fillRect(0, 0, 500, 900);
			context.draw();
			// 绘制用户昵称
			context.setFontSize(12);
			context.setFillStyle('#000000');
			context.fillText(userInfo.name, 75, 35);
			context.setFontSize(12);
			context.setFillStyle('#666666');
			context.fillText('的分享', 75, 52);
			// 绘制价格
			context.setFontSize(18);
			context.setFillStyle('red');
			context.fillText(`￥${this.goodsInfo.price}`, 20, 326);
			// 绘制商品名称
			this.drawText(this.goodsInfo.title, 15, 332, context);
			// 绘制头像
			await uni.downloadFile({
				url: userInfo.image,
				success: function(res) {
					context.save();
					context.beginPath();
					context.arc(40, 40, 20, 0, 2 * Math.PI);
					context.clip();
					context.drawImage(res.tempFilePath, 20, 20, 60, 52);
					context.restore();
					context.draw(true);
				}
			});
			// 绘制商品详情
			await uni.downloadFile({
				url: this.specificationsImg,
				success: function(res) {
					context.drawImage(res.tempFilePath, 12, 75, 225, 225);
					context.draw(true);
				}
			});
			// 绘制小程序码
			await uni.downloadFile({
				url: qrImg,
				success: function(res) {
					context.drawImage(res.tempFilePath, 148, 318, 95, 95);
					context.draw(true);
				}
			});

			// 绘制完成，关闭动画
			setTimeout(() => {
				this.loadingStatus = false;
				this.posterInfo.status = true;
			});
		},
		// canvas文字换行
		drawText(context, x, y, canvas) {
			let strArr = [];
			let n = 11;
			for (let i = 0, l = context.length; i < l / n; i++) {
				let a = context.slice(n * i, n * (i + 1));
				strArr.push(a);
			}
			strArr.forEach((item, index) => {
				// 限制只能显示5行
				if (index > 2) {
					return;
				}
				y += 20;
				canvas.setFontSize(10);
				canvas.setFillStyle('#333333');
				canvas.fillText(item, x, y);
			});
		},
		// 保存生成的海报
		saveSharePic() {
			let that = this;
			let url = this.$R.baseUrl();
			let canvasImg = '';
			uni.showModal({
				title: '提示',
				content: '确定要保存商品海报吗？',
				success: function(res) {
					if (res.confirm) {
						// canvas生成图片
						uni.canvasToTempFilePath({
							fileType: 'jpg',
							canvasId: 'myCanvas',
							quality: 1,
							success: function(res) {
								// 保存带哦本地
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.showToast({
											title: '保存海报成功',
											icon: 'none',
											duration: 3000
										});
									},
									fail: function() {
										uni.showToast({
											title: '保存海报失败',
											icon: 'none',
											duration: 3000
										});
									}
								});
							}
						});
					}
				}
			});
		},

		// 跳转至拼团详情页
		toGroup(groupInfo){
			this.groupBuyingLaunch(groupInfo.uuid)
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: $uni-bg-color-grey;
}

.weixin-header {
	height: 170rpx;
}

.my-canvas-box {
	width: 750rpx;
	height: 100%;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 99;

	&.hide {
		display: none;
	}

	&.show {
		display: block;
	}

	.canvas-tip {
		color: #ffffff;
		font-size: 24rpx;
		margin-top: 30rpx;
		text-align: center;
	}

	/* #ifdef MP-WEIXIN */
	.my-canvas {
		width: 500rpx;
		height: 900rpx;
		background-color: #ffffff;
		margin-left: 125rpx;
		margin-top: 300rpx;
	}

	/* #endif */

	/* #ifdef APP-PLUS || H5 */
	.my-canvas {
		width: 500rpx;
		height: 900rpx;
		background-color: #ffffff;
		margin-left: 125rpx;
		margin-top: 220rpx;
	}

	/* #endif */
}

.detail-desc {
}

.image-text {
	img {
		width: 100%;
	}
}

.add-to-cart {
	width: 180rpx;
	height: 70rpx;
	border-radius: 35rpx 0 0 35rpx;
	margin-right: 1rpx;
}

.seckill-buy-now {
	width: 248rpx;
	height: 80rpx;
	border-radius: 40rpx;
	background: linear-gradient(to right, #f61f1b, #ec684a);
	color: #ffffff;
}

.buy-now {
	width: 180rpx;
	height: 70rpx;
	border-radius: 0 35rpx 35rpx 0;
}

.popup-specifications {
}

.label-check {
	background: $bg-main-color;
	color: #ffffff;
}

// 秒杀时间、价格
.seckill-time-box {
	height: 120rpx;

	.price-box {
		width: 500rpx;
		font-size: 60rpx;
		line-height: 120rpx;

		text {
			padding-left: 30rpx;
		}
	}

	.time-box {
		width: 275rpx;

		.text {
			text-align: center;
			font-size: 26rpx;
			margin: 15rpx 0 10rpx;
		}

		.time {
			margin-left: 40rpx;

			text {
				width: 50rpx;
				height: 50rpx;
				line-height: 50rpx;
				background-color: #000000;
				margin: 0 4rpx;
				border-radius: 10rpx;
				text-align: center;
				color: #ffffff;
			}
		}
	}
}

// 商品数据加减
.goods-num-box {
	padding-left: 20rpx;
	margin-top: 20rpx;

	text {
		height: 60rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 60rpx;
	}

	view {
		height: 60rpx;
		width: 60rpx;
		font-size: 28rpx;
		color: #666666;
		border: 1px solid #dddddd;
		text-align: center;
		line-height: 60rpx;
	}

	input {
		border-top: 1px solid #dddddd;
		border-bottom: 1px solid #dddddd;
		width: 120rpx;
		height: 60rpx;
		font-size: 28rpx;
		text-align: center;
		line-height: 60rpx;
	}
}
.evaluate-userImage {
	width: 60rpx;
	height: 60rpx;
}
	.group-buying{
		margin: 15px;
		background-color: #fff;
		padding: 15px;
		.group-title{
			display: flex;
			justify-content: space-between;
			line-height: 50rpx;
			.title__text{
				font-size:30rpx;
				color: #333;
			}
			.title__rule{
				font-size: 24rpx;
				color: #999;
			}
		}
		.group-list{
			max-height: 300rpx;
			overflow-y: auto;
			.group-item{
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1px solid #ddd;
				.item__info{
					display: flex;
					.header{
						display: block;
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						margin: 0 20rpx ;
					}
					.info-detail{
						.name{
							font-size: 26rpx;
							color: #666;
							line-height: 30rpx;
						}
						.count-time{
							display: flex;
							font-size: 26rpx;
							color: #666;
							line-height: 30rpx;
							.count{
								margin-right: 10rpx;
							}
						}
					}
				}
				.go-group{
					font-size: 30rpx;
					padding: 6rpx 12rpx;
					border: 1rpx solid #BF0F16;
					color: #BF0F16;
				}
			}
		}
	}
</style>
