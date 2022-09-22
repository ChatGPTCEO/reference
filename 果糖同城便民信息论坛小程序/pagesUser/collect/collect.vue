<!-- 普通模式演示(vue) -->
<template>
	<view class="content">
		<z-paging ref="paging" fixed @query="queryList" :list.sync="dataList">
			<u-tabs slot="top" active-color="#f44c01" :list="list" :current="tabIndex" @change="tabChange"></u-tabs>
			<view class="list">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in dataList" :key="item.id"
					@click="click" @open="open" :options="options">
					<view class="houseList" @click="routeTo(item)">
						<u-image v-if="item.image" width="220rpx" height="160rpx" :src="item.image">
						</u-image>
						<view class="cont">
							<view style="display: flex;flex-direction: row;flex: 1;align-items: flex-start;">
								<text class="title">{{item.title}}</text>
							</view>
							<text class="info">{{item.createtime_text}}</text>
						</view>
					</view>
				</u-swipe-action>
			</view>
		</z-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '招聘信息',
					type: 'job'
				}, {
					name: '人才信息',
					type: 'resume'
				}, {
					name: '房源信息',
					type: 'house'
				}, {
					name: '物品信息',
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
				}, {
					name: '商家店铺',
					type: 'store'
				}],
				dataList: [],
				tabIndex: 0,
				search: {
					type: 'job',
					page: 1,
				},
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		methods: {
			tabChange(index) {
				this.tabIndex = index;
				this.search.type = this.list[index].type;
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/user/getCollect', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			},
			click(index, index1) {
				if (index1 == 0) {
					this.$u.post('/addons/hicity/user/collect', {
						type: this.search.type,
						info_id: this.dataList[index].info_id,
						title: this.dataList[index].title,
					}).then(res => {
						this.dataList.splice(index, 1);
					})
				}
			},
			open(index) {
				this.dataList[index].show = true;
				this.dataList.map((val, idx) => {
					if (index != idx) this.dataList[idx].show = false;
				})
				this.$forceUpdate()
			},
			routeTo(item) {
				console.log(item)
				switch (this.search.type) {
					case 'job':
						this.$u.route('/pagesIndex/jobmain/jobmain', {
							id: item.info_id
						})
						break;
					case 'resume':
						this.$u.route('/pagesIndex/resumemain/resumemain', {
							id: item.info_id
						})
						break;

					case 'house':
						this.$u.route('/pagesIndex/housemain/housemain', {
							id: item.info_id
						})
						break;
					case 'car':
						this.$u.route('/pagesIndex/carmain/carmain', {
							id: item.info_id
						})
						break;
					case 'commodity':
						this.$u.route('/pagesIndex/goodsmain/goodsmain', {
							id: item.info_id
						})
						break;
					case 'farming':
						this.$u.route('/pagesIndex/farmingmain/farmingmain', {
							id: item.info_id
						})
						break;
					case 'transfer':
						this.$u.route('/pagesIndex/transfermain/transfermain', {
							id: item.info_id
						})
						break;
					case 'promote':
						this.$u.route('/pagesIndex/promotemain/promotemain', {
							id: item.info_id
						})
						break;
					case 'store':
						this.$u.route('/pagesFind/storemain/storemain', {
							id: item.info_id
						})
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.houseList {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		background-color: white;
		border-bottom: 1rpx solid #e6e6e6;

		.cont {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 20rpx;

			.title {
				font-size: 32rpx;
				color: #333333;
				flex: 1;
				font-weight: 600;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.info {
				font-size: 26rpx;
				color: #999999;
				margin-top: 20rpx;
			}
		}
	}
</style>
