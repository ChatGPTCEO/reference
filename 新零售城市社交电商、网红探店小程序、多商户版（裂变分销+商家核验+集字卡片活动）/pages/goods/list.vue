<template>
	<view>
		<view class="d-flex j-center a-center  bg-yellow py-5">
			<text class="text-white mr-1 font-37">⭐</text>
			<view class="font-37">{{title}}</view>
			<text class="text-white mr-1 font-37">⭐</text>
			<!-- <text class="text-white ml-1">⭐</text> -->
		</view>
		<template v-if="list.length || loadStatus != 'nomore'">

			<view class="px-2 pt-3 d-flex j-sb flex-wrap ">
				<!-- 750-40=710-660=50 -->
				<view class="mb-3  border-bottom" style="width: 340rpx;height: 390rpx;" v-for="(item, index) in list" :key="index"
				 @click="toRoute({
					url: 'pages/goods/details',
					params: {
					  id: item.product_id
					}
				})">
					<image :src="item.image" style="width: 340rpx;height: 190rpx;"></image>
					<view class="text-elli-two font-700 font-title my-1" style="height: 76rpx;">{{item.store_name}}</view>
					<!-- 190 + 80 + 20 = 290 -->
					<view class="d-flex j-sb " style="height: 95rpx;">
						<view>
							<!-- 32rpx -->
							<member v-if="item.vip_price">会员省{{ (item.price - item.vip_price).toFixed(2) }}元</member>
							<!-- 40rpx -->
							<view class="d-flex a-center font-20 mb-2" style="height: 40rpx;">
								<text class="text-red font-700 font-price mr-1 ">￥{{item.price}}</text>
								<text class="text-red-light font-up mr-1" v-if="item.spec_type">起</text>
								<!-- <text class="text-red-light font-up mr-1">起</text> -->
								<!-- 原价 -->
								<text class="text-through text-muted mr-1 font-ago">￥{{item.ot_price}}</text>
							</view>

						</view>
					</view>

				</view>
			</view>


			<view class="u-padding-30">
				<u-loadmore :status="loadStatus" />
			</view>
		</template>
		<template v-else>
			<view class="u-padding-30">
				<image src="/static/noShopper.png" mode="aspectFit" class="empty-image"></image>
			</view>
		</template>
	</view>
</template>

<script>
	import Arrow from '@/components/index/arrow.vue';
	import Member from '@/components/index/member.vue';
	import BottomBuy from '@/components/index/bottom-buy.vue';

	export default {
		components: {
			Arrow,
			Member,
			BottomBuy
		},
		data() {
			return {
				loadStatus: 'loadmore',
				page: 1,
				limit: 10,
				list: [],
				title: '',
				type: '',
				isvip: 0,
				brand_id: '',
				price_on: '',
				price_off: '',
				cate_id: '',

				// 检查 pid
				pid: ""
			};
		},
		onLoad(options) {

			this.pid = options.pid

			//console.log("list页面：", options);
			this.title = options.title
			this.type = options.type
			this.isvip = options.isvip
			this.price_on = options.price_on
			this.price_off = options.price_off
			this.brand_id = options.brand_id
			this.hot_type = options.hot_type
			this.cate_id = options.cate_id
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			getList() {
				let params = {}
				// 获取后台传参
				if (this.isvip) {
					params.isvip = this.isvip
				}
				if (this.price_on) {
					params.price_on = this.price_on
				}
				if (this.price_off) {
					params.price_off = this.price_off
				}
				if (this.brand_id) {
					params.brand_id = this.brand_id
				}
				if (this.cate_id) {
					params.cate_id = this.cate_id
				}
				if (this.hot_type) {
					params.hot_type = this.hot_type
				}
				if (this.pid) {
					params.pid = this.pid
				}



				if (this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					this.$u.get('/api/store/product/lst', {
						page: this.page++,
						limit: this.limit,
						...params
					}).then(({
						data
					}) => {
						this.list = this.list.concat(data.list)
						if (data.list.length < this.limit) {
							this.loadStatus = 'nomore'
						} else {
							this.loadStatus = 'loadmore'
						}
					})
				}
			},
			toRoute(params) {
				this.$u.route(params)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "/common/dev-yuchen.css";

	.page {
		background-color: #f0f0f0;
	}

	.goods-list {
		padding-top: $gutter;
	}

	.goods-inbox {
		position: relative;
		display: flex;
		flex-wrap: wrap;

		.goods-initem {
			width: 345rpx;
			margin-left: $gutter;
			margin-bottom: $gutter;
		}
	}

	.tabulation-box {
		position: relative;

		.tabulation-image {
			padding: 0 $gutter;
		}

		.tabulation-more {
			padding: $gutter;
			background-color: rgba($color: #ffdd00, $alpha: 0.2);
			margin: $gutter;
			border-top-right-radius: $uni-border-radius-lg;
			border-top-left-radius: $uni-border-radius-lg;
			overflow: hidden;
		}
	}

	.empty-image {
		width: 414rpx;
		height: 336rpx;
		margin: 0 auto;
		display: block;
	}
</style>
