<template>
	<view class="pageCont">
		<z-paging ref="paging" @query="queryList" :list.sync="listData" :style="{height: scrollHeight+'px'}">
			<view slot="top">
				<u-tabs :list="list" :is-scroll="false" active-color="#f44c01" :current="current" @change="change">
				</u-tabs>
			</view>
			<view slot="loading">
				<view class="ymref">
					<view class="">
						<u-loading mode="circle" color="#f44c01" size="80"></u-loading>
					</view>
				</view>
			</view>
			<view>
				<view class="list" v-for="(item,index) in listData" :key="index">
					<view class="titbox" @click="$u.route('/pagesIndex/carmain/carmain',{id:item.id})">
						<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40"
							style="margin-right: 10rpx;"></u-icon>
						<text class="title">{{item.title}}</text>
					</view>
					<view class="cell" @click="$u.route('/pagesIndex/carmain/carmain',{id:item.id})">
						<text class="price">{{item.price}}万元</text>
						<text class="time">{{item.createtime_text}}</text>
					</view>
					<view class="tools">
						<view @click="showTop(item)" v-if="item.is_top=='1'&&item.status=='1'" class="btn"
							style="background-color: #19BE6B;color: white;">
							<text>置顶</text>
						</view>
						<view @click="downInfo(item,index)" v-if="item.status=='1'" class="btn"
							style="background-color: #FF9900;color: white;">
							<text>下架</text>
						</view>
						<view @click="upInfo(item,index)" v-if="item.status=='3'" class="btn"
							style="background-color: #FF9900;color: white;">
							<text>上架</text>
						</view>
						<view v-if="item.status=='5'" @click="topay(item)" class="btn"
							style="background-color: #FF9900;color: white;">
							<text>支付</text>
						</view>
						<view @click="delInfo(item,index)" class="btn" style="background-color: #FA3534;color: white;">
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
		<topmodel ref="topmodel" :listData="topList" @confirem="confiremTop"></topmodel>
	</view>
</template>

<script>
	import topmodel from '@/components/Topmodel/Topmodel.vue'
	export default {
		components: {
			topmodel,
		},
		data() {
			return {
				list: [{
					name: '已上线',
				}, {
					name: '审核中',
				}, {
					name: '已下线',
				}, {
					name: '待发布',
				}],
				current: 0,
				listData: [],
				scrollHeight: 500,
				search: {
					type: '1',
					page: 1,
				},
				topList: [],
				selInfo: null,
			}
		},
		onLoad() {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let windowHeight = res.windowHeight;
					let windowWidth = res.windowWidth;
					let headHeight = 80 / 750 * windowWidth;
					let scrollHeight = (windowHeight - headHeight);
					that.scrollHeight = scrollHeight;
				}
			});
			this.getTopConfig()
		},
		methods: {
			getTopConfig() {
				this.$u.get('/addons/hicity/index/getTopConfig', {

				}).then(res => {
					this.topList = this.topList.concat(res)
				})
			},
			change(index) {
				this.current = index;
				this.search.type = index + 1;
				this.$refs.paging.reload();
			},
			queryList(pageNo, pageSize) {
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//通过this.$refs.paging.complete(请求回来的数组);将请求结果传给z-paging
				this.search.page = pageNo;
				this.$u.get('/addons/hicity/car/pushList', this.search).then(res => {
					this.$refs.paging.complete(res)
				}).catch(err => {
					this.$refs.paging.complete(false)
				})
			},
			showTop(item) {
				this.selInfo = item;
				this.$refs.topmodel.show()
			},
			confiremTop(e) {
				let top_id = e.id;
				this.toTop({
					top_id: top_id,
					id: this.selInfo.id
				})
			},
			toTop(params) {
				this.$u.get('/addons/hicity/car/topInfo', params).then(res => {
					this.$u.route('/pagesPush/pay/pay', {
						order_no: res.order_no,
						type: 'car'
					});
				})
			},
			downInfo(item, index) {
				this.$u.get('/addons/hicity/car/upInfoStatus', {
					id: item.id,
					type: 'down'
				}).then(res => {
					this.listData.splice(index, 1);
					this.$u.toast('操作成功')
				})
			},
			upInfo(item, index) {
				this.$u.get('/addons/hicity/car/upInfoStatus', {
					id: item.id,
					type: 'up'
				}).then(res => {
					this.listData.splice(index, 1);
					this.$u.toast('操作成功')
				})
			},
			delInfo(item, index) {
				this.$u.get('/addons/hicity/car/upInfoStatus', {
					id: item.id,
					type: 'del'
				}).then(res => {
					this.listData.splice(index, 1);
					this.$u.toast('操作成功')
				})
			},
			topay(item) {
				this.$u.get('/addons/hicity/car/topay', {
					id: item.id,
				}).then(res => {
					this.$u.route('/pagesPush/pay/pay', {
						order_no: res.order_no,
						type: 'car'
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pageCont {
		height: 100%;
		width: 100%;
		/* 父节点建议开启flex布局 */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		margin: 10rpx 20rpx;
		background-color: white;
		border-radius: 10rpx;

		.titbox {
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 20rpx;
		}

		.title {
			font-size: 32rpx;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.type {
			font-size: 28rpx;
			color: #666666;
			margin-bottom: 10rpx;
		}

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.price {
				font-size: 30rpx;
				color: #F44C01;
			}

			.time {
				font-size: 28rpx;
				color: #666666;
			}
		}

		.tools {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			margin-top: 20rpx;

			.btn {
				width: 150rpx;
				height: 60rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-left: 20rpx;
				border-radius: 40rpx;
			}
		}
	}
</style>
