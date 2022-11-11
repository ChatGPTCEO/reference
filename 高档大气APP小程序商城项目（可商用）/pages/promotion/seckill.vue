<template>
	<view>
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus">
		</orange-fullloading>
		<view class="seckill-header w-750 fixed-top">
			<view :style="{ paddingTop: statusBarheight + 'px' }"></view>
			<view class="row-ac">
				<view class="iconfont icon-xiangqian text-white ml-2" @tap="getBack"></view>
				<view class="" style="width: 170rpx;height: 50rpx;">
					<image src="/static/img/seckill.png" mode=""></image>
				</view>
			</view>
			<view class="w-710 row-ac mt-3" style="height: 102rpx;">
				<view class="seckill-on-time row-a-j-fc font-w font-s-7 text-white border-right"
					style="width: 15%;height: 102rpx;">
					整点秒杀
				</view>
				<view class="" style="width: 85%;height: 102rpx;">
					<scroll-view scroll-x class="scroll-row" :scroll-into-view="scrollIntoTime">
						<view class="scroll-row-item" v-for="(item,index) in seckillTime" :key="index"
							:id="'time' + index" @click="cliickSeckillTime(item.id,index)"
							:class="seckillTimeIndex == index ? 'active' : ''">
							<view class="seckill-time-item text-white">
								<view class="seckill-time row">{{ item.swapName }}</view>
								<view class="seckill-state row" v-if="index == nowSeckillActive">抢购中</view>
								<view class="seckill-state row" v-else-if="index<nowSeckillActive">已结束</view>
								<view class="seckill-state row" v-else>即将开始</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="w-750 seckill-goods-box">
			<view class="w-750 seckill-goods-inle" style=""></view>
			<view class="seckill-goods-list w-710">
				<view class="w-100 d-f bg-white rounded mt-2" style="height: 310rpx;"
					v-for="(item,index) in seckillGoodsList" :key="index" @click="toProduct(item)">
					<image :src="item.slideList.img" class="seckill-goods-img rounded mx-2 my-2" mode=""></image>
					<view class="flex-1 mt-2">
						<view class="mr-1 in2line seckill-goods-title">
							<text class="bg-color font-s-1 font-w px-1 mx goods-title-text">秒</text>
							<text class="font-s-3">{{ item.title }}</text>
						</view>
						<view class="row-ac mt-2">
							<view class="row-ac limit-quantity" style="">
								<view class="already-quantity bg-color" :style="{'width': alreadyquantity + '%'}">
								</view>
							</view>
							<view class="font-s-2 text-main-color ml-2">仅限{{item.stock}}件</view>
						</view>
						<view class="d-f align-end justify-between">
							<view class="mt-3">
								<view class="font-s-7 font-w text-main-color">
									<text class="font-s-2">￥</text>
									{{ item.seckillPrice }}
								</view>
								<view class="font-s-2 text-light-grey ml-1 text-de">原价￥{{ item.price }}</view>
							</view>
							<view v-if="item.activeStatus==1" class="bg-color row mt-5 mr-2"
								style="width: 138rpx;height: 52rpx;border-radius: 26rpx;">
								马上抢
							</view>
							<view v-else-if="item.activeStatus==0" class="bg-color row mt-5 mr-2"
								style="width: 138rpx;height: 52rpx;border-radius: 26rpx;">
								已结束
							</view>
							<view v-else-if="item.activeStatus==2" class="bg-color row mt-5 mr-2"
								style="width: 138rpx;height: 52rpx;border-radius: 26rpx;">
								尚未开始
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getActivitySeckillUrl,
		getActivitySeckillGoodsListUrl
	} from '@/api/index'

	export default {
		components: {},
		data() {
			return {
				statusBarheight: '',
				scrollIntoTime: '',
				seckillTimeIndex: 0,
				seckillTime: [],
				alreadyquantity: 0,
				seckillGoodsList: [],
				seckillGoodsQueryInfo: {
					title: '',
					page: 1,
					pageSize: 10
				},
				nowSeckillActive: 0,
				seckillActiveId: 0,
				loadingStatus: true,
			}
		},
		filters: {},
		// 上划加载
		onReachBottom() {
			this.onReachBottomHandle()
		},
		// 下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			this.initData()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
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
			this.initData()
			//列表item项销售数量百分比，（ 销量 / 总限量 ）* 百分百 = 百分比
			this.alreadyquantity = (60 / 200) * 100
		},
		methods: {
			initData() {
				this.seckillGoodsList = []
				this.getActivitySeckill()
				// 异步延迟加载
				setTimeout(() => {
					this.loadingStatus = false
				}, 100)
			},
			// 触底事件
			onReachBottomHandle() {
				this.seckillGoodsQueryInfo.page++
				this.getActivitySeckillGoodsList(this.seckillActiveId, this.seckillTimeIndex)
			},
			// 顶部场次点击事件
			cliickSeckillTime(activeId, index) {
				if (this.seckillTimeIndex === index) {
					return
				}
				this.seckillTimeIndex = index
				this.scrollIntoTime = 'time' + index
				this.seckillGoodsQueryInfo.page = 1
				this.seckillGoodsList = []
				this.getActivitySeckillGoodsList(activeId, index)
				this.seckillActiveId = activeId
			},
			// 获取秒杀场次
			getActivitySeckill() {
				this.$R.get(getActivitySeckillUrl).then(res => {
					console.log(res)
					this.seckillTime = res.data
					// 获取当前时间
					let date1 = new Date()
					// 去掉时间戳的毫秒
					let nowTime = Number(String(date1.getTime()).substring(0, 10))
					console.log(this.seckillTime)
					this.seckillTime.forEach((item, index) => {
						if (item.startAt < nowTime && item.endAt > nowTime) {
							console.log(item)
							this.seckillTimeIndex = index
							this.nowSeckillActive = index
							this.scrollIntoTime = 'time' + index
							this.getActivitySeckillGoodsList(item.id)
							this.seckillActiveId = item.id
						}
					})
				})
			},
			// 根据对应场次id获取商品列表
			getActivitySeckillGoodsList(activeId, index) {
				console.log(activeId)
				this.$R.get(getActivitySeckillGoodsListUrl + activeId, this.seckillGoodsQueryInfo).then(res => {
					if (this.seckillGoodsList.length > 0) {
						this.seckillGoodsList = [...this.seckillGoodsList, ...res.data.list]
					} else {
						this.seckillGoodsList = res.data.list
					}
					console.log(this.nowSeckillActive)
					if (index < this.nowSeckillActive) {
						// 活动已结束
						this.seckillGoodsList.forEach(item => {
							item.activeStatus = 0
						})
					} else if (index > this.nowSeckillActive) {
						// 活动未开始
						this.seckillGoodsList.forEach(item => {
							item.activeStatus = 2
						})
					} else {
						// 秒杀活动进行中
						this.seckillGoodsList.forEach(item => {
							item.activeStatus = 1
						})
					}

				})
			},
			// 跳转到商品详情页
			toProduct(productInfo) {
				uni.navigateTo({
					url: `/pages/product/product?productId=${productInfo.id}&pageStatus=seckill&activeId=${this.seckillActiveId}&productStatus=${productInfo.activeStatus}`
				})
			},
			getBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	.seckill-header {
		width: 750rpx;
		height: 282rpx;
		background: linear-gradient(to right, #FA4F7A, #E70009);

		.icon-xiangqian {
			font-size: 36rpx;
			margin-right: 235rpx;
		}

		.seckill-on-time {
			line-height: 1.3;
		}

		.scroll-row-item {
			width: 25%;
			height: 102rpx;

			.seckill-time-item {
				width: 100%;
				height: 102rpx;

				.seckill-time {
					width: 100%;
					height: 60rpx;
					font-size: 38rpx;
				}

				.seckill-state {
					width: 100%;
					height: 42rpx;
					font-size: 25rpx;
				}
			}

		}

		.active .seckill-time {
			font-weight: 900;
			font-size: 46rpx !important;
		}

		.active .seckill-state {
			font-weight: 900;
			font-size: 27rpx !important;
			color: #F2D113;
		}

	}

	.seckill-goods-box {
		margin-top: 282rpx;

		.seckill-goods-inle {
			background: linear-gradient(to right, #FA4F7A, #E70009);
			height: 218rpx;
		}

		.seckill-goods-list {
			margin-top: -205rpx;

			.seckill-goods-img {
				width: 270rpx;
				height: 270rpx;
			}

			.seckill-goods-title {
				width: 92%;
				height: 82rpx;
				vertical-align: middle;

				.goods-title-text {
					border-radius: 6rpx;
					margin-top: -5rpx;
				}
			}

			.limit-quantity {
				width: 200rpx;
				height: 20rpx;
				border-radius: 10rpx;
				background-color: #DEE2E6;

				.already-quantity {
					height: 20rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
