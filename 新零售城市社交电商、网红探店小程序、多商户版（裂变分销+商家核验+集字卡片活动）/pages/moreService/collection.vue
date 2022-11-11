<template>
	<view>
		<!-- tabs -->
		<view class="tabs">
			<u-tabs :list="tabsList" :is-scroll="false" :current="tabsCurrent" bg-color="#fff" show-bar active-color="#333"
			 :bar-style="{backgroundColor: '#f29100'}" @change="tabsChange">
			</u-tabs>
		</view>
		<!-- list -->
		<view class="list">
			<template v-if="list.length || loadStatus != 'nomore'">
				<view class="boxcell" v-if="tabsCurrent == 0">
					<u-cell-group :border="false">
						<u-cell-item :arrow="false" v-for="(item, index) in list" :key="index" icon-size="88" :icon="item.merchant.mer_avatar||'/static/logo.png'"
						 :title="item.merchant.mer_name" :label="`${item.merchant.care_count}人关注`" :title-style="{fontWeight: 'bold'}"
						 @click="toRoute({
                url: 'pages/goods/store',
                params: {
                  id: item.type_id
                }
              })">
							<view class="">
								<u-button size="mini" @click="cancel(index)">取消关注</u-button>
							</view>
						</u-cell-item>
					</u-cell-group>
				</view>
				<view class="" v-else-if="tabsCurrent == 1">
					<view class="ad-list-item" v-for="(item, index) in list" :key="index" @click="toRoute({
              url: 'pages/goods/details',
              params: {
                id: item.type_id
              }
            })">
						<advance-item :src="item.product.image" :title="item.product.store_name" :show-label="false" btn-text="删除"
						 btn-type="default" :price="item.product.price" :show-old="false" @handle="cancel(index)">
						</advance-item>
					</view>
				</view>
				<view class="u-padding-20">
					<u-loadmore :status="loadStatus"></u-loadmore>
				</view>
			</template>
			<view class="u-padding-80" v-else>
				<u-empty text="您还没有相关记录呢" mode="list"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsList: [{
					name: '收藏的店铺'
				}, {
					name: '收藏的商品'
				}],
				tabsCurrent: 0,
				loadStatus: 'loadmore',
				page: 1,
				limit: 10,
				list: []
			};
		},
		onLoad(options) {
			this.getList()
		},
		onReachBottom() {
			this.getList()
		},
		methods: {
			cancel(index) {
				let id = this.list[index].type_id
				let type = this.list[index].type
				this.$u.post('/api/user/relation/delete', {
					type_id: id,
					type: type
				}).then((res) => {
					uni.showToast({
						title: res.message
					})
					this.list = []
					this.loadStatus = 'loadmore'
					this.page = 1
					this.getList()
				})
			},
			toRoute(params) {
				this.$u.route(params)
			},
			getList() {
				if (this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					let url = '/api/user/relation/merchant/lst'
					if (this.tabsCurrent == 1) {
						url = '/api/user/relation/product/lst'
					}
					this.$u.get(url, {
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
			tabsChange(index) {
				this.tabsCurrent = index;
				this.page = 1
				this.list = []
				this.loadStatus = 'loadmore'
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.ad-list-item {
		padding: $gutter;
		border-bottom: 1rpx solid #F8F8F8;
	}
</style>
