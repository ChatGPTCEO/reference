<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="listData" :mounted-auto-call-reload="false">
			<view slot="top">
				<view class="ym-search">
					<u-search placeholder="输入关键词搜索一下吧" v-model="search.keyword" @custom="toSearch()"></u-search>
				</view>
				<u-tabs :list="opentop?list:list1" active-color="#f44c01" :current="current" @change="change">
				</u-tabs>
			</view>
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<block v-if="opentop">
				<block v-if="search.type=='job'">
					<view class="info-margin">
						<!-- 招聘信息列表 -->
						<JobList :JobData="listData"></JobList>
					</view>
				</block>
				<block v-if="search.type=='house'">
					<view class="info-margin">
						<!-- 房源信息列表 -->
						<HouseList :houseData="listData"></HouseList>
					</view>
				</block>
				<block v-if="search.type=='car'">
					<view class="info-margin">
						<!-- 车信息列表 -->
						<CarList :carData="listData"></CarList>
					</view>
				</block>
				<block v-if="search.type=='commodity'">
					<view class="info-margin">
						<GoodsList :goodsData="listData"></GoodsList>
					</view>
				</block>
				<block v-if="search.type=='farming'">
					<view class="info-margin">
						<FarmList :farmData="listData"></FarmList>
					</view>
				</block>
				<block v-if="search.type=='transfer'">
					<view class="info-margin">
						<TransferList :transferData="listData"></TransferList>
					</view>
				</block>
				<block v-if="search.type=='ask'">
					<view class="info-margin">
						<AskItem :askData="listData"></AskItem>
					</view>
				</block>
				<block v-if="search.type=='promote'">
					<view class="info-margin">
						<PromoteItem :promoteData="listData"></PromoteItem>
					</view>
				</block>
			</block>
			<block v-else>
				<block v-if="search.type=='house'">
					<view class="info-margin">
						<!-- 房源信息列表 -->
						<HouseList :houseData="listData"></HouseList>
					</view>
				</block>
				<block v-if="search.type=='car'">
					<view class="info-margin">
						<!-- 车信息列表 -->
						<CarList :carData="listData"></CarList>
					</view>
				</block>
				<block v-if="search.type=='commodity'">
					<view class="info-margin">
						<GoodsList :goodsData="listData"></GoodsList>
					</view>
				</block>
			</block>
		</z-paging>
	</view>
</template>

<script>
	import JobList from '@/components/JobList/JobList.vue';
	import HouseList from '@/components/HouseList/HouseList.vue';
	import CarList from '@/components/CarList/CarList.vue';
	import GoodsList from '@/components/GoodsList/GoodsList.vue';
	import FarmList from '@/components/FarmList/FarmList.vue';
	import TransferList from '@/components/TransferList/TransferList.vue';
	import AskItem from '@/components/askItem/askItem.vue';
	import PromoteItem from '@/components/promoteItem/promoteItem.vue';
	export default {
		components: {
			CarList,
			GoodsList,
			JobList,
			HouseList,
			FarmList,
			TransferList,
			AskItem,
			PromoteItem
		},
		data() {
			return {
				list: [{
					name: '招聘',
					type: 'job'
				}, {
					name: '房源',
					type: 'house'
				}, {
					name: '车辆',
					type: 'car'
				}, {
					name: '物品',
					type: 'commodity'
				}, {
					name: '农林牧渔',
					type: 'farming'
				}, {
					name: '生意转让',
					type: 'transfer'
				}, {
					name: '需求打听',
					type: 'ask'
				}, {
					name: '本地推广',
					type: 'promote'
				}],
				list1: [{
					name: '房源',
					type: 'house'
				}, {
					name: '车辆',
					type: 'car'
				}, {
					name: '物品',
					type: 'commodity'
				}, {
					name: '农林牧渔',
					type: 'farming'
				}, {
					name: '生意转让',
					type: 'transfer'
				}, {
					name: '需求打听',
					type: 'ask'
				}, {
					name: '本地推广',
					type: 'promote'
				}],
				current: 0,
				listData: [],
				search: {
					page: 1,
					type: 'job',
					keyword: '',
				},
				opentop: false,
			}
		},
		onLoad(e) {
			this.$u.get('/addons/hicity/index/getVerify', {}).then(res => {
				this.opentop = res.opentop;
				this.search.type = e.type;
				if (this.opentop) {
					this.search.type = 'job';
					this.list.map((item, index) => {
						if (item.type == e.type) {
							this.current = index;
						}
					})
				} else {
					this.search.type = 'house'
					this.list1.map((item, index) => {
						if (item.type == e.type) {
							this.current = index;
						}
					})
				}
			})
		},
		mounted() {
			this.$refs.paging.complete([])
		},
		methods: {
			toSearch() {
				if (this.search.keyword == '') {
					return this.$u.toast('请输入关键字')
				}
				this.$refs.paging.reload();
			},
			change(index) {
				this.current = index;
				this.search.type = this.list[index].type;
				if (this.search.keyword != '') {
					this.$refs.paging.reload();
				} else {
					this.listData = [];
					this.$refs.paging.complete([])
				}
			},
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				if(this.search.keyword==''){
					this.$u.toast('请输入关键字')
					return this.$refs.paging.complete()
				}
				switch (this.search.type) {
					case 'job':
						this.$u.get('/addons/hicity/job/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'house':
						this.$u.get('/addons/hicity/house/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'car':
						this.$u.get('/addons/hicity/car/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'commodity':
						this.$u.get('/addons/hicity/commodity/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'farming':
						this.$u.get('/addons/hicity/farming/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'transfer':
						this.$u.get('/addons/hicity/transfer/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'ask':
						this.$u.get('/addons/hicity/ask/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					case 'promote':
						this.$u.get('/addons/hicity/promote/search', this.search).then(res => {
							this.$refs.paging.complete(res)
						}).catch(err => {
							this.$refs.paging.complete(false)
						})
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ym-search {
		padding: 20rpx;
		background-color: white;
	}

	.info-margin {
		margin: 0 0 20rpx 0;
	}
</style>
