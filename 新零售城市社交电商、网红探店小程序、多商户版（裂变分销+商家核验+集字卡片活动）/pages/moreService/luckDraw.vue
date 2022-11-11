<template>
	<view>
		<!-- tabs -->
		<view class="tabs">
			<u-tabs :list="tabsList" :is-scroll="false" :current="tabsCurrent" bg-color="#fff" show-bar active-color="#333"
			 :bar-style="{backgroundColor: '#f29100'}" @change="tabsChange">
			</u-tabs>
		</view>
		<view class="a-list" v-if="list.length || loadStatus != 'nomore'">
			<view class="a-item" v-for="(item, index) in list" :key="index">
				<advance-item :title="item.store_name" :src="item.image" :price="item.price" :show-old="false" :show-label="false"
				 :btn-text="item.status == 1 ? '继续集卡' :  '已结束'" @handle="toDetails(item)">
				</advance-item>
			</view>
			<view class="u-padding-30">
				<u-loadmore :status="loadStatus"></u-loadmore>
			</view>
		</view>
		<view class="u-padding-80" v-else>
			<u-empty text="您还没有相关记录呢" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsList: [{
					name: '未完成'
				}, {
					name: '已完成'
				}, {
					name: '已失败'
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
			toDetails(item) {
				this.$u.route({
					url: 'pages/activity/details',
					params: {
						cp_id: item.cp_id
					}
				})
			},
			getList() {
				if (this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					let statusText = [1, 0, -1]
					this.$u.get('/api/store/product/getMyJoinList', {
						page: this.page++,
						limit: this.limit,
						status: statusText[this.tabsCurrent]
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
				this.list = []
				this.loadStatus = 'loadmore'
				this.page = 1
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.a-list {
		position: relative;

		.a-item {
			padding: $gutter;
		}
	}
</style>
