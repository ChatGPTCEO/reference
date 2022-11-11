<template>
	<view class="content">
		<!-- 加载动画 -->
		<orange-fullloading text="加载中" :loadshow="loadingStatus" />
		<view class="flex-1" :style="'height:' + windowHeight + 'px'">
			<view class="w-100 search-box row">
				<view class="search-frame flex-1 mx-4 row-ac font-s-3" @click="toSearch">
					<view class="iconfont icon-sousuo ml-2"></view>
					<view class="ml-1">搜索商品</view>
				</view>
			</view>
			<view class="flex-1 d-f">
				<view class="left-nav" :style="cateyNavHeight">
					<scroll-view scroll-y :scroll-into-view="scrollInto" scroll-with-animation class="left-nav"
						:style="cateyNavHeight">
						<view class="category-list row" v-for="(item, index) in categorylist" :key="index"
							@click="leftMenuClick(index,item)" :id="'tab'+ index"
							:class="{active: tabarIndex == index}">
							<view class="underline"></view>
							<view class="category-name row font-s-5 flex-1">{{ item.cname }}</view>
						</view>
					</scroll-view>
				</view>
				<view class="right-frame flex-1 ml-1" :style="cateyNavHeight">
					<scroll-view scroll-y :scroll-into-view="scrollInto" scroll-with-animation  @scrolltolower="lowerBottom"
						class="" :style="cateyNavHeight">
						<template v-if="categoryStyle.type == 0">
							<view class="flex-1 mx-2 mt-2" v-for="item in rightMenu" :key="item.id">
								<view class="font-s-5 font-w" @click="navToList(item.id)"> {{item.cname}}</view>
								<view class="row-ac-fw flex-1">
									<view class="category-top row-a-j-fc mt-2" v-for="items in item.children"
										:key="items.id" @click="navToList(items.id)">
										<view class="category-image row">
											<image :src="items.cover" v-if="items.cover !== ''" mode="aspectFill"></image>
											<text v-else class="iconfont icon-tupian"></text>
										</view>
										<view class=" font-s-3 row mt-1">{{ items.cname }}</view>
									</view>
								</view>
							</view>
						</template>
						<template v-if="categoryStyle.type == 1">
							<view class="product-item flex-1 mx-2 mt-2 pb-3 border-bottom row-ac"
								v-for="(item,index) in productList" :key="index" @click="toProduct(item)">
								<image :src="item.slide_list.img" mode="" class="product-img"></image>
								<view class="flex-1 mx-2 d-f flex-wrap justify-between" style="height: 200rpx;">
									<view>
										<view class="product-title flex-1 font-s-5 in2line">{{ item.title }}</view>
										<view class="product-promotion flex-1 in2line font-s-1 mt-1 text-light-grey">
											{{ item.promotion }}
										</view>
									</view>
									<view class="price-buy flex-1 row-ac-sb">
										<view class="font-s-5">￥{{ item.price }}</view>
										<view class="iconfont icon-shopping-01 mr-1"></view>
									</view>
								</view>
							</view>
						</template>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCategory,
		getCategoryList
	} from '@/api/index'

	export default {
		data() {
			return {
				categoryStyle:{},
				windowHeight: '',
				tabarIndex: 0,
				scrollInto: '',
				category: [],
				rightMenu: [],
				allRightMenu: [],
				categorylist: [],
				queryInfo: {
					categoryId: '',
					pageSize: 10,
					page: 1
				},
				productList: [],
				productTotal: '',
				loadingStatus: true
			}
		},
		onLoad() {
			this.loadData()
		},
		created() {
			uni.getSystemInfo({
				success: (res => {
					this.windowHeight = res.windowHeight
					this.categoryNavHeight = res.windowHeight - 42
				})
			});
		},
		computed: {
			cateyNavHeight() {
				return `height:${this.categoryNavHeight}px;`
			}
		},
		methods: {
			async loadData() {
				await this.getCategorylist()
				// 异步延迟加载
				setTimeout(() => {
					this.loadingStatus = false
				}, 100)
				this.categoryStyle = this.$json.renovation.AppTemplate.categoryTemplate
			},
			getCategorylist() {
				this.$R.get(getCategory)
					.then((res) => {
						this.categorylist = res.data
						// 加入一个空对象，用来撑开左侧底部的高度
						this.categorylist.push({
							cname: '',
							id: 0,
						})
						this.rightMenu = this.categorylist[0].children
						this.queryInfo.categoryId = this.categorylist[0].id
						this.getProductList()
					})
			},
			lowerBottom(){
				this.onReachBottomHandle()
			},
			onReachBottomHandle() {
				if (this.productTotal != this.productList.length) {
					this.queryInfo.page++;
					this.getProductList();
				}
			},
			getProductList() {
				this.$R.get(getCategoryList, this.queryInfo).then(res => {
					this.productList = [...this.productList, ...res.data.list]
					this.productTotal = res.data.total
				})
			},
			leftMenuClick(index, getCategoryId) {
				// 如果点击的那个空对象，直接返回
				if (this.tabIndex === index) {
					return
				}
				this.tabarIndex = index
				// 滚动到指定位置
				this.scrollInto = 'tab' + index
				this.rightMenu = this.categorylist[index].children
				this.queryInfo = {
					categoryId: getCategoryId.id,
					pageSize: 10,
					page: 1
				};
				this.productList = []
				this.getProductList();
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/index/search/search'
				})
			},
			navToList(categoryId) {
				uni.navigateTo({
					// url: '/pages/product/list?categoryId=' + categoryId,
					url: '/pages/product/list?type=category&id=' + categoryId,
				})
			},
			toProduct(item){
				if(item.productId){
					uni.navigateTo({
						url: '/pages/product/product?productId='+item.productId
					});
				}
				else {
					uni.navigateTo({
						url: '/pages/product/product?productId='+item.id
					});
				}
			},
		}
	}
</script>
<style lang="scss">
	.search-box {
		height: 42px;

		.search-frame {
			height: 32px;
			background-color: #F1F1F1;
			border-radius: 16px;
			color: #999999;
		}

	}

	.left-nav {
		width: 200rpx;
		background-color: #fff;

		.category-list {
			width: 200rpx;
			height: 120rpx;

			.underline {
				width: 9rpx;
				height: 120rpx;
			}

			.category-name {
				height: 120rpx;
			}
		}

		.active .underline {
			background-color: $main-color;
		}

		.active .category-name {
			background-color: #F1F1F1;
		}
	}

	.right-frame {
		.category-top {
			width: 160rpx;
			height: 200rpx;
			margin-right: 10rpx;

			.category-image {
				width: 100rpx;
				height: 100rpx;
				background-color: #F1F1F1;
				border-radius: 13rpx;

				.icon-tupian {
					font-size: 72rpx;
					color: #CFCFCF;
				}
			}
		}

		.category-top:nth-child(3n) {
			margin-right: 0;
		}

		.product-item {
			height: 200rpx;

			.product-img {
				width: 200rpx;
				height: 200rpx;
				border-radius: 13rpx;
			}

			.product-title {
				// height: 90rpx;
				max-height: 90rpx;
			}

			.product-promotion {
				height: 72rpx;
			}

			.price-buy {
				color: #FF1116;

				.iconfont {
					font-size: 30rpx;
				}
			}
		}
	}
</style>
