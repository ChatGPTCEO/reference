<template>
	<view>
		<view v-if="show">
			<!-- navbar -->
			<!-- 顶部 搜索栏 -->
			<u-navbar :is-back="false">
				<view class="search">
					<view class="search-text">{{ baseInfo.site_name }}</view>
					<u-search placeholder="搜索好物" :show-action="false" disabled height="56 " @click="
							toRoute({
								url: 'pages/index/search'
							})
						"></u-search>
				</view>
			</u-navbar>
			<!-- tips 添加至我的小程序-->
			<struggler-uniapp-add-tip></struggler-uniapp-add-tip>
			<!-- 顶部 滚动导航 -->
			<scroll-view class="position-fixed" style="height: 80rpx;z-index: 99;">
				<u-tabs name="cate_name" font-size="32" :bold="true" :list="tabsList" :current="tabsCurrent"
					@change="tabsChange"></u-tabs>
			</scroll-view>
			<view class="bg-yellow" style="height: 80rpx;"></view>
			<!-- 顶部 banner -->
			<view class="top-box">
				<swiper class="image" autoplay="true" indicator-dots="true">
					<swiper-item v-for="(item, index) in getbanner" :key="index">
						<image :src="item.pic" mode="aspectFill" class="image" @click="
							toRoute({
								url: item.url
							})
						"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- topradius -->
			<view class="top-radius"></view>
			<template v-if="!tabsCurrent">
				<!-- 九宫格 grid -->
				<!-- #ifndef H5 -->
				<view class="grid-box">
					<u-grid :col="4" :border="false">
						<view class="" style="padding-top: -20rpx;padding-bottom: -20rpx;">
							<u-grid-item v-for="(item, index) in gridList" :key="index" @click="
								toRoute({
									url: item.url,
									params: {
										title: item.name
									}
								})
							">
								<u-icon :name="item.pic" :size="68"></u-icon>
								<view class="grid-text font-700 mt-1 font-title">{{ item.name }}</view>
							</u-grid-item>
						</view>
					</u-grid>
				</view>
				<!-- #endif -->
				<!-- 九宫格 grid -->
				<!-- #ifdef H5 -->
				<view class="grid-box">
					<u-grid :col="4" :border="false">
						<u-grid-item v-for="(item, index) in gridList" :key="index" @click="
								toRoute({
									url: item.url,
									params: {
										title: item.name
									}
								})
							">
							<u-icon :name="item.pic" :size="68"></u-icon>
							<view class="grid-text font-700 mt-1 font-title">{{ item.name }}</view>
						</u-grid-item>
					</u-grid>
				</view>
				<!-- #endif -->
				<!-- 商品栏目 小程序主内容  @click="toRoute({url:'/pages/index/search'})"-->
				<view style="margin:0 10px 0 10px" @click="getArticle(article_id)">
					<u-notice-bar is-circular="false" :list="list" duration="5000" border-radius="15" bg-color="#FFDD00"
						color="#333333" padding="10rpx" mode="vertical" more-icon="true"></u-notice-bar>
				</view>
				<!-- 遍历栏目 -->
				<view v-for="(item, index) in column" :key="index">
					<!-- 判断是栏目还是广告 -->
					<view v-if="item.ptype == 1">
						<!-- 常规广告 -->
						<view class="mx-2 my-1" @click="
							toRoute({
								url: item.url,
								params: {
									title: item.title
								}
							})
						">
							<image :src="item.pic" style="width: 710rpx;height: 300rpx;" class="rounded"></image>
						</view>
					</view>
					<view v-if="item.ptype == 0">
						<!-- 秒杀 -->
						<view v-if="item.lantype == 0">
							<view class="new-goods">
								<!-- 标题栏 -->
								<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
									<view class="position-relative" style="">
										<view class="title-bg">⭐ {{ item.title}}</view>
									</view>
									<view class="font-23 text-muted d-flex ">
										<navigator :url="item.url">
											查看更多
											<u-icon name="arrow-right" size="24"></u-icon>
										</navigator>
									</view>
								</view>
								<!-- 内容 -->
								<view class="new-goods-list">
									<view class="new-goods-item" v-for="(goods, a) in item.datalist" :key="a"
										@click="toDetails(goods, 1, datatime)">
										<advance-item :src="goods.image" :title="goods.store_name" :price="goods.price"
											:show-old="false" :timestamp="datatime"
											@handle="toDetails(goods, 1, datatime)"></advance-item>
									</view>
									<view class="look-more">
										<navigator :url="item.url" class="ain">查看更多</navigator>
									</view>
								</view>
							</view>
						</view>
						<!-- 抽奖 -->
						<view v-else-if="item.lantype == 1">
							<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
								<view class="position-relative">
									<view class="title-bg ">⭐ {{ item.title}}</view>
								</view>
								<view class="font-23 text-muted d-flex " @click="
										toRoute({
											url: item.url,
											params: {
												title: item.title
											}
										})
									">
									查看更多
									<u-icon name="arrow-right" size="24"></u-icon>
								</view>
							</view>
							<view class="mx-2 py-2 shadow-nom" v-for="(lottery,id) in item.datalist" :key="id"
								@click="toDay(lottery)">
								<view class="position-relative">
									<image :src="lottery.image" style="height: 390rpx;width: 710rpx;" class="d-block">
									</image>
									<view
										class="font-25 position-absolute right-0 bottom-0 d-flex a-center j-center rounded-top-left text-white"
										style="background-color: rgba(19,14,11,0.6);width: 250rpx;height: 50rpx;">
										{{ lottery.mer_name }} 赞助
									</view>
								</view>

								<!-- 图下文字 -->
								<view class="mx-1">
									<view class="mt-1 text-elli-two w-100 font-title">{{ lottery.store_name }}</view>
									<view class="mt-1">
										<text class="text-red font-member">价值</text>
										<text class="text-red font-price ml-1">￥{{ lottery.coupon_price }}</text>
									</view>
									<view class="d-flex j-sb my-2">
										<view class="text-light-muted font-member">
											<text>{{ lottery.activite_endtime }}</text>
											<text class="ml-1">{{ lottery.title }}</text>
										</view>
										<view class="text-light-muted font-member">{{ lottery.join_people }}人已参与</view>
									</view>
								</view>
							</view>

						</view>
						<!-- 推荐 -->
						<view v-if="item.lantype == 2">
							<view class="card-swiper mb-2 ">
								<view class="mx-2 d-flex j-sb a-end mb-2" style="height: 60rpx;">
									<view class="position-relative">
										<view class="title-bg ">⭐ {{ item.title}}</view>
									</view>
									<view class="t-right">
										<text class="bold">{{ cardSwiper1 + 1 }}</text>
										<text class="" style="padding-bottom: 6rpx;">/{{ item.datalist.length }}</text>
									</view>
								</view>

								<!-- 轮播图 -->
								<swiper :indicator-dots="false" :autoplay="true" :interval="5000" :duration="1000"
									:circular="true" :current="cardSwiper1" @change="changeCardSwiper1"
									style="height: 610rpx;">
									<swiper-item v-for="(recommend, b) in item.datalist" :key="b" class="mx-2 rounded-8"
										@click="
										toRoute({
											url: 'pages/goods/details',
											params: {
												id: recommend.product_id
											}
										})
									">
										<image :src="recommend.image" class="rounded-8"
											style="width: 710rpx; height: 390rpx;"></image>
										<!-- 图下文字 -->
										<view class="" style="width: 710rpx;height: 190rpx;">
											<text class="text-elli-two my-1 font-title"
												style="height: 80rpx;">{{ recommend.store_name }}</text>
											<view class="d-flex j-sb a-center">
												<!-- 左侧 -->
												<view class="my-1">
													<member v-if="recommend.price - recommend.vip_price > 0">
														会员省{{ (recommend.price - recommend.vip_price).toFixed(2) }}元
													</member>
													<view class="d-flex a-center font-20" style="height: 50rpx;">
														<text
															class="text-red font-700 font-price mr-1">￥{{ recommend.price }}</text>
														<text class="text-red-light font-up mr-1"
															v-if="recommend.spec_type">起</text>

														<text
															class="text-through text-muted mr-1 font-ago">￥{{ recommend.ot_price }}</text>
														<!-- css写左箭头 -->
														<arrow>
															{{ ((recommend.price / recommend.ot_price) * 10).toFixed(1) }}折
														</arrow>
													</view>
												</view>
												<!-- 右侧 -->
												<view>
													<bottom-buy>立即购买</bottom-buy>
												</view>
											</view>
										</view>
									</swiper-item>
								</swiper>
							</view>
						</view>
						<!-- 单商品列表 -->
						<view v-if="item.lantype == 3">
							<view class="goods-list">
								<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
									<view class="position-relative">
										<view class="title-bg ">⭐ {{ item.title }}</view>
									</view>
									<view class="font-23 text-muted d-flex " @click="toRoute({url: item.url})">
										更多推荐
										<u-icon name="arrow-right" size="24"></u-icon>
									</view>
								</view>
								<!-- 内容 -->
								<view class="mx-2 mt-2 p-2 shadow rounded-8 " style="width: 710rpx;">
									<view class="d-flex j-sb mb-2" v-for="(slist, c) in item.datalist" :key="c" @click="toRoute({
											url: 'pages/goods/details',
											params: {
												id: slist.product_id
											}
										})">
										<!-- 左图 -->
										<image :src="slist.image" mode="aspectFill"
											style="width:250rpx;height: 190rpx;border-radius: 5%;"></image>
										<!-- 右侧 -->
										<view class="d-flex flex-column j-sb" style="width: 400rpx;height: 170rpx;">
											<view style="height: 130rpx;">
												<view class="text-elli-two font-700 font-title" style="height: 80rpx;">
													{{ slist.store_name }}</view>
												<view class="d-flex a-center font-20" style="height: 40rpx;">
													<text class="text-red-light px-1 font-sale"
														style="background: #fee9eb;">
														{{ ((slist.price / slist.ot_price) * 10).toFixed(1) }}折
													</text>
												</view>
												<!-- <arrow style="margin-left: -20rpx;">{{ ((item.price / item.ot_price) * 10).toFixed(1)  }}折</arrow> -->
											</view>
											<view class="d-flex j-sb ">
												<view class="">
													<member v-if="slist.price - slist.vip_price > 0">
														会员省{{ (slist.price - slist.vip_price).toFixed(2) }}元</member>
													<text
														class="text-red font-700 font-25 mr-1">￥{{ slist.price }}</text>
													<text class="text-red-light" v-if="slist.spec_type">起</text>
												</view>
												<view>
													<bottom-buy>立即购买</bottom-buy>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 多商品列表 -->
						<view v-if="item.lantype == 4">
							<view class="goods-list" v-if="item.datalist">
								<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
									<view class="position-relative">
										<view class="title-bg ">⭐ {{ item.title }}</view>
									</view>
									<view class="font-23 text-muted d-flex " @click="toRoute({url: item.url,})">
										更多推荐
										<u-icon name="arrow-right" size="24"></u-icon>
									</view>
								</view>
								<!-- 内容 -->
								<view class="px-2 pt-2 d-flex j-sb flex-wrap ">
									<!-- 750-40=710-660=50 -->
									<view class="mb-2  border-bottom" style="width: 340rpx;height: 390rpx;"
										v-for="(mlist, d) in item.datalist" :key="d" @click="toRoute({
											url: 'pages/goods/details',
											params: {
												id: mlist.product_id
											}
										})">
										<image :src="mlist.image" style="width: 340rpx;height: 190rpx;"></image>
										<view class="text-elli-two font-700 font-title my-1" style="height: 80rpx;">
											{{ mlist.store_name }}</view>
										<!-- 190 + 80 + 20 = 290 -->
										<view class="d-flex j-sb " style="height: 95rpx;">
											<view>
												<!-- 32rpx -->
												<member v-if="mlist.price - mlist.vip_price > 0">
													会员省{{ (mlist.price - mlist.vip_price).toFixed(2) }}元</member>
												<!-- 40rpx -->
												<view class="d-flex a-center font-20 mb-2" style="height: 40rpx;">
													<text
														class="text-red font-700 font-price mr-1 ">￥{{ mlist.price }}</text>
													<text class="text-red-light font-up mr-1"
														v-if="mlist.spec_type">起</text>
													<!-- <text class="text-red-light font-up mr-1">起</text> -->
													<!-- 原价 -->
													<text
														class="text-through text-muted mr-1 font-ago">￥{{ mlist.ot_price }}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 滑动商品 -->
						<view v-if="item.lantype == 5">
							<view class="goods-list" v-if="item.datalist">
								<view class="mx-2 d-flex j-sb a-end" style="height: 60rpx;">
									<view class="position-relative">
										<view class="title-bg ">⭐ {{ item.title }}</view>
									</view>
									<view class="font-23 text-muted d-flex " @click="toRoute({url: item.url,})">
										向右滑动查看
										<u-icon name="arrow-right" size="24"></u-icon>
									</view>
								</view>
								<scroll-view scroll-x="true">
									<view class="goods-list-box">
										<view class="goods-listitem u-padding-right-10"
											v-for="(slide, e) in item.datalist" :key="e">
											<goods-item :src="slide.image" :title="slide.store_name"
												:price="slide.price" o-price=" " @click="toDetails(slide)"></goods-item>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
						<view v-else></view>
					</view>
				</view>
				<!-- 视频广告 -->
				<ad unit-id="adunit-43ce3114fc526e9b" ad-type="video" ad-theme="white"></ad
				<!-- 遍历栏目结束 -->
				<!-- 底部技术支持栏 foot logo -->
				<view class="logo-box" v-if="baseInfo.site_name">
					<text class="text">{{ baseInfo.site_name }}技术支持</text>
				</view>
			</template>
		</view>
	</view>
</template>
<script>
	import Arrow from '@/components/index/arrow.vue';
	import Member from '@/components/index/member.vue';
	import BottomBuy from '@/components/index/bottom-buy.vue';

	const appSystem = uni.getSystemInfoSync();
	export default {
		components: {
			Arrow,
			Member,
			BottomBuy
		},
		data() {
			return {
				show: true,
				column: [],
				hot: [],
				showReindex: true,
				tabsList: [{
					cate_name: '推荐'
				}],
				tabsCurrent: 0,
				swiperCurrent: 0,
				cardSwiper1: 0,
				cardSwiper2: 0,
				//banner
				getbanner: [],
				gridList: [],
				page: 1,
				limit: 10,
				loadStatus: 'loadmore',
				indexLoadStatus: 'loadmore',
				goodslist: [],
				list: [], //文章
				article_id: '',
				//recommendList: [],
				datatime: 0,
				init: true,
				ad: {},

			};
		},
		computed: {
			baseInfo() {
				return this.$store.state.baseInfo;
			},
			offsetTop() {
				let scale = 750 / appSystem.screenWidth;
				// #ifndef H5
				return (appSystem.statusBarHeight + 44) * scale;
				// #endif
				// #ifdef H5
				return 0;
				// #endif
			}
		},
		onReady() {

		},
		onLoad(options) {
			// 获取数据
			this.getIndexData();
			this.getSeckillTime();
			this.showLoading();
			this.Notclick();
			if (options.scene) {

				var scene = decodeURIComponent(options.scene);
				var obj = this.parseQuery(scene)
				this.spread_code = obj.spread_code;
				this.spread_id = obj.thirdid;

				if (this.spread_code) {
					uni.setStorage({
						key: 'spread_code',
						data: this.spread_code
					})
				}

				if (this.spread_id) {
					uni.setStorage({
						key: 'spread_id',
						data: this.spread_id
					})
				}

			}


		},
		methods: {
			parseQuery(query) {
				var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
				var obj = {};
				while (reg.exec(query)) {
					obj[RegExp.$1] = RegExp.$2;
				}
				return obj;
			},
			// ** 获取首页数据
			getIndexData() {
				var _self = this;
				this.$u.get('/api/common/home').then(({
					data
				}) => {
					_self.ad = data.ad;
					//获取栏目
					data.hot.forEach(function(e) {
						//如果是栏目则进行获取商品
						//console.log('e1',e)
						if (e.ptype == "0" && e.api) {
							//console.log('e2',e)
							_self.getProductList(e)
							_self.hot.push(e)
						}
						//console.log('e3',e)
						_self.column.push(e);
					});
					//获取 banner
					_self.getbanner = data.banner;
					// this.recommendList = data.hot
					_self.tabsList = _self.tabsList.concat(data.category);
					_self.gridList = _self.gridList.concat(data.menu);

				});
				//uni.hideLoading();
			},
			//获取公告内容
			Notclick() {
				this.$u.get('/api/article/category/lst').then(res => {
					var data = res.data;
					for (var i = 0; i < data.length; i++) {
						if (data[i]['title'] == '平台公告') {
							var id = data[i]['article_category_id'];
							//获取文章
							this.$u.get('/api/article/lst/' + id).then(info => {
								let val = info.data.list;
								for (var i = 0; i < val.length; i++) {
									//push 文章
									this.list.push(val[i].title);
									this.article_id = val[i].article_id;
								}
							});
						}
					}
				});
			},
			//获取公告文章
			getArticle(id) {
				//console.log("aaaaaaa",id)
				//let cid = id
				this.toRoute({
					url: 'pages/index/article',
					params: {
						id: id //文章id
					}
				});
			},
			showLoading() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
			},
			//详情跳转
			toDetails(item, type = 0, date) {
				this.toRoute({
					url: 'pages/goods/details',
					params: {
						type: type,
						id: item.product_id,
						date: date
					}
				});
			},
			// 获取秒杀截止时间
			getSeckillTime() {
				this.$u.get('/api/store/product/seckill/select').then(res => {
					this.datatime = res.data.seckillEndTime;
				});
			},
			// 获取除首页外列表数据
			getList() {
				if (this.tabsCurrent && this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading';
					let pid = this.tabsList[this.tabsCurrent].store_category_id;
					this.$u
						.get('/api/store/product/lst', {
							pid: pid,
							page: this.page++,
							limit: this.limit
						})
						.then(({
							data
						}) => {
							this.goodslist = this.goodslist.concat(data.list);
							if (data.list.length < this.limit) {
								this.loadStatus = 'nomore';
							} else {
								this.loadStatus = 'loadmore';
							}
						});
				}
			},
			//获取栏目api数据
			async getProductList(e) {
				await this.$u
					.get(e.api)
					.then(res => {
						// e.datalist = res.data.list || [];
						this.$set(e, 'datalist', (res.data.list || []))
						setTimeout(function() {
							uni.hideLoading();
						}, 3000);
					})
					.catch(function(error) {
						// e.datalist = [];
						this.$set(e, 'datalist', [])
					});
			},

			// 路由跳转
			toRoute(params) {
				this.$u.route(params);
			},
			// 卡片切换
			changeCardSwiper1({
				detail
			}) {
				//console.log("cardSwiper111:", detail.current);
				this.cardSwiper1 = detail.current;
			},
			changeCardSwiper2({
				detail
			}) {
				//console.log("cardSwiper222:", detail.current);
				this.cardSwiper2 = detail.current;
			},
			// tabs切换
			tabsChange(index) {
				this.tabsCurrent = index;
				this.page = 1;
				this.loadStatus = 'loadmore';
				this.goodslist = [];
				this.getList();
			},
			// 抽奖--跳转去详情页
			toDay(item) {
				//console.log("疯抢：", item);
				this.$u.route({
					url: '/pages/activity/details',
					params: {
						product_id: item.product_id,
						coupon_id: item.coupon_id,
						cp_id: item.cp_id
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	/*公共样式 */
	// @import "/common/common.css";
	/*自定义UI库 */
	@import '/common/dev-yuchen.css';

	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}

	.box {
		margin: 50rpx $gutter;
		padding: 50rpx $gutter;
		background-color: #ffffff;
		border-radius: $uni-border-radius-lg;
		font-size: 20rpx;
		// color: #d1b16b;
	}

	.title-bg {
		// color: #FF0000;
		font-weight: 700;
		font-size: 35rpx;
		position: relative;
		display: inline-block;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-bottom: -4rpx;
		z-index: 2;

		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 4rpx;
			height: 14rpx;
			width: 100%;
			background-image: linear-gradient(45deg, #fac416, #d2d621);
			color: #ffffff;
			border-radius: 4rpx;
			opacity: 0.8;
			z-index: -1;
		}
	}

	.search {
		padding-right: 50rpx;
		display: flex;
		align-items: center;
		height: 100%;

		.search-text {
			font-size: 27rpx;
			padding: 0 $gutter;
			width: 250rpx;
		}
	}

	.banner {
		padding: $gutter;
		position: relative;
		min-height: 250rpx;

		.d-botbox {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: $gutter;

			.b-dot {
				width: 16rpx;
				height: 4rpx;
				background-color: rgba($color: #000000, $alpha: 0.3);

				&.active {
					background-color: rgba($color: #000000, $alpha: 0.8);
				}
			}
		}

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 200rpx;
			border-bottom-left-radius: 50%;
			border-bottom-right-radius: 50%;
			background-color: $uni-color-warning;
		}
	}

	.card-swiper {
		position: relative;

		.card-top {
			display: flex;
			padding: $gutter;

			.t-left {
				flex: 1;
				display: flex;
				flex-direction: column;
				position: relative;
				padding-left: 16rpx;

				.title {
					font-size: 36rpx;
					padding-bottom: 10rpx;
				}

				.label {
					font-size: $uni-font-size-sm;
				}
			}

			.t-right {
				display: flex;
				align-items: flex-end;
				font-size: $uni-font-size-sm;
				color: #999;
				padding-bottom: 2rpx;

				.bold {
					font-size: $uni-font-size-xl;
					color: #333;
					font-weight: bold;
				}

				.text {
					padding-bottom: 6rpx;
				}
			}
		}

		.card-bot {
			position: relative;
			margin-left: -$gutter;

			.cardbox {
				display: flex;
				flex-direction: column;
				padding: 0 $gutter / 2;

				.card-info {
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;

					.text {
						font-size: $uni-font-size-lg;
						padding-bottom: 10rpx;
					}

					.label {
						font-size: $uni-font-size-sm;
						color: #999;
					}
				}
			}
		}
	}

	.grid-box {
		position: relative;

		.grid-text {
			font-size: $uni-font-size-sm;
		}
	}

	.title-box {
		position: relative;
		padding: $gutter;
		font-size: $uni-font-size-xl;
		color: #333;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;

		.label {
			font-size: $uni-font-size-sm;
			color: #999;
			margin-top: 10rpx;
		}

		.sk-more {
			position: absolute;
			right: $gutter;
			top: 50%;
			z-index: 10;
			color: #666;
			margin-top: -12rpx;
			font-size: 24rpx;
		}
	}

	.goods-list {
		position: relative;

		.goods-list-box {
			display: flex;
			align-items: center;
			padding: $gutter;
		}

		.goods-listitem {
			min-width: 300rpx;
			max-width: 300rpx;
		}
	}

	.goods-inbox {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		.goods-initem {
			width: 300rpx;
			margin-left: 50rpx;
			margin-bottom: 20rpx;
			border: 1px solid #c3c3c3;

		}
	}

	.new-goods-list {
		display: flex;
		flex-direction: column;

		.new-goods-item {
			padding: $gutter;
		}
	}

	.look-district {
		display: flex;
		flex-direction: column;
		background-color: $bg;
		padding-top: 20rpx;

		.lookwrapbox {
			display: flex;
			flex-wrap: wrap;

			.lookitem {
				width: 345rpx;
				height: 240rpx;
				position: relative;
				border-radius: $uni-border-radius-lg;
				overflow: hidden;
				margin-left: $gutter;
				margin-bottom: $gutter;

				&:nth-child(3n-2) {
					height: 500rpx;

					&.look-two {
						height: 240rpx;
					}
				}

				&:nth-child(3n) {
					margin-top: -260rpx;
					margin-left: auto;
					margin-right: 24rpx;

					&.look-two {
						margin-top: 0;
						margin-left: $gutter;
						margin-right: 0;
					}
				}

				&.look-one {
					width: 710rpx;
					height: 300rpx;
				}

				.text {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 10;
					color: #fff;
					font-size: $uni-font-size-xl;
					font-weight: bold;
					white-space: nowrap;
				}

				// &::after {
				//   content: '';
				//   position: absolute;
				//   left: 0;
				//   top: 0;
				//   width: 100%;
				//   height: 100%;
				//   background-color: rgba($color: #000000, $alpha: 0.6);
				// }
			}
		}
	}

	.logo-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: $gutter;

		.img-logo {
			width: 60rpx;
			height: 60rpx;
		}

		.text {
			font-size: 24rpx;
			color: #999;
			line-height: 1.5em;
			margin-top: 10rpx;
		}
	}

	.look-more {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #666;
		padding: $gutter 0 30rpx;

		.ain {
			width: 100%;
			text-align: center;
		}
	}

	.top-box {
		height: 240rpx;
		width: 100%;
		background-color: #ffdd00;
		padding-bottom: 15rpx;
	}

	.top-radius {
		border-top-right-radius: 25rpx;
		border-top-left-radius: 25rpx;
		height: 30rpx;
		background-color: #fff;
		margin-top: -26rpx;
		position: relative;
		z-index: 10;
	}

	.re-index {
		width: 100%;
		height: 500rpx;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-40%);
		z-index: 9999;

		.re-content {
			height: 400rpx;
			z-index: 10;
			position: relative;
			overflow: hidden;

			.re-item {
				width: 430rpx;
				margin: 125rpx auto 0;
				background-color: #fff;
				padding: 10rpx;
				border-radius: 10rpx;
				border: 4rpx solid #f3f3f3;
				box-shadow: 0 0 5rpx rgba($color: #000000, $alpha: 0.3);
				display: flex;

				.re-img {
					min-width: 120rpx;
					width: 120rpx;
					height: 110rpx;
				}

				.re-right {
					margin-left: 10rpx;
					width: 300rpx;
					max-width: 280rpx;
					min-width: 280rpx;
					font-size: 25rpx;
					display: flex;
					flex-direction: column;

					.re-bot {
						margin-top: auto;
						font-size: 16rpx;
						display: flex;
						justify-content: space-between;

						.re-price {
							color: red;
							font-size: 20rpx;
						}

						.re-small {
							color: #999;
						}
					}
				}
			}
		}

		.button-text {
			position: absolute;
			left: 0;
			bottom: 133rpx;
			font-size: 30rpx;
			color: #ffffff;
			z-index: 10;
			width: 100%;
			text-align: center;
			padding-left: 18rpx;
			height: 70rpx;
			line-height: 70rpx;
		}

		.re-bg {
			width: 100%;
			height: 510rpx;
			position: absolute;
			top: -65rpx;
			left: 0;
			z-index: 0;
		}

		.re-hide {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			z-index: 2;
		}
	}

	.ico-star {
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -40rpx;
		width: 80rpx;
		height: 80rpx;
		z-index: 10;
	}

	.line {
		position: absolute;
		left: 10rpx;
		bottom: 10rpx;
		width: 260rpx;
		height: 16rpx;
		background-color: #fee233;
		z-index: -1;
		border-radius: 10rpx;

		&.line-top {
			// width: 260rpx;
			bottom: 30rpx;
		}
	}

	.secmore {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		font-size: 24rpx;
		z-index: 10;
		color: #666;
	}

	.advint {
		padding: $gutter;
	}
</style>