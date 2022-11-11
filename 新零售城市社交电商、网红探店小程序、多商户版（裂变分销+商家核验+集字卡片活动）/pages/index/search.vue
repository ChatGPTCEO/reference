<template>
	<view>
		<!-- search -->
		<view class="search">
			<u-search placeholder="搜索商品" search-icon-color="#999" border-color="#eee" v-model="keyword" focus @clear="onClear"
			 @search="onSearch">
			</u-search>
		</view>
		<template v-if="!isShowList">
			<!-- history -->
			<view class="search-history">
				<view class="s-cell">
					<text class="s-title">历史搜索</text>
					<text class="empty" @tap="onAllClearHistory">清空</text>
				</view>
				<view class="s-lists">
					<template v-if="historyList.length">
						<view class="l-tags" v-for="(item, index) in historyList" :key="index" @click="onSearchHot(item)">
							<text class="text">{{ item }}</text>
						</view>
					</template>
					<template v-else>
						<view class="empty-list">
							<u-empty text="暂时没有记录" mode="history"></u-empty>
						</view>
					</template>
				</view>
			</view>
			<!-- hot -->
			<view class="search-history">
				<text class="s-title">热门搜索</text>
				<view class="s-lists">
					<view class="l-tags" v-for="(item, index) in hotList" @click="onSearchHot(item.keyword)">
						<text class="text">{{ item.keyword }}</text>
					</view>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="list-box">
				<view class="list-item" v-for="(item, index) in list" :key="index" @click="toRoute({
            url: 'pages/goods/details',
            params: {
              id: item.product_id
            }
          })">
					<goods-item :src="item.image" :title="item.store_name" :price="item.price" :o-price="item.ot_price" :show-btn="false">
					</goods-item>
				</view>
			</view>
			<view class="u-margin-bottom-20 u-margin-top-50">
				<u-loadmore :status="loadStatus" />
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: [],
				hotList: [],
				keyword: '',
				isShowList: false,
				list: [],
				loadStatus: 'loadmore',
				page: 1,
				limit: 10
			};
		},
		onLoad() {
			this.getHotTags()
			uni.getStorage({
				key: 'historyList',
				success: ({
					data
				}) => {
					this.historyList = data
				}
			})
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			toRoute(params) {
				this.$u.route(params)
			},
			// 热门标签
			getHotTags() {
				this.$u.get('/api/common/hot_keyword')
					.then(({
						data
					}) => {
						this.hotList = data
					})
			},
			// 搜索指定keyword
			onSearchHot(item) {
				this.keyword = item
				this.onSearch()
			},
			// 清空历史记录
			onAllClearHistory() {
				this.historyList = []
				uni.removeStorage({
					key: 'historyList'
				})
			},
			// 搜索
			onSearch() {
				this.list = []
				this.loadStatus = 'loadmore'
				this.page = 1
				if (this.keyword) {
					if (this.historyList.indexOf(this.keyword) > -1) {
						this.historyList.splice(this.historyList.indexOf(this.keyword), 1)
					}
					this.historyList.unshift(this.keyword)
					uni.setStorage({
						key: 'historyList',
						data: this.historyList
					})
					this.isShowList = true
					this.getList()
				} else {
					this.isShowList = false
				}
			},
			getList() {
				if (this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					this.$u.get('/api/store/product/lst?', {
						keyword: this.keyword,
						page: this.page++,
						limit: this.limit
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
			onClear() {
				this.isShowList = false
			}
		}
	}
</script>

<style lang="scss">
	.search {
		padding: 15rpx $gutter;
	}

	.search-history {
		position: relative;
		padding: $gutter $gutter 0;
	}

	.s-title {
		font-size: 32rpx;
		color: #343434;
		padding: 16rpx 0 24rpx;
	}

	.l-tags {
		position: relative;
		height: 50rpx;
		border-radius: 200rpx;
		background-color: #f6f6f6;
		line-height: 50rpx;
		padding: 0 20rpx;
		margin: 10rpx;
		font-size: 24rpx;
	}

	.s-lists {
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
		color: #666666;
		margin: 0 -10rpx;
	}

	.empty-list {
		text-align: center;
		margin: 10rpx auto;
	}

	.s-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.empty {
			color: #999;
		}
	}

	.list-box {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;

		.list-item {
			margin-top: 30rpx;
			margin: 0 10rpx;
			width: 345rpx;
		}
	}
</style>
