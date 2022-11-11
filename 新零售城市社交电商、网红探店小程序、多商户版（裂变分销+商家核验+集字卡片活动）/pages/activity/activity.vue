<template>
	<view>
		<!-- <image src="/static/activity.png" mode="aspectFit" class="topbg"></image>  timestamp(item.activite_endtime) == true ? '结束':'抢购中' -->
		<view class="a-list">
			<view class="a-item" v-for="(item, index) in list" :key="index">
				<activity-item :src="item.image" :title="item.store_name" :show-price="false" :show-old="false" :disabled="item.total_count && !item.remain_count"
				 :btn-type="item.total_count && !item.remain_count ? 'error' : 'warning'" :btn-text="timestamp(item.activite_endtime) == true ? '已结束':'抢购中' && item.total_count && !item.remain_count ? '已抢完' : 
            !item.join ? '抢购中' : hasLogin ? '已参与' : '抢购中'"
				 :nums="item.join_people" @click="toDetails(item)">
					<text v-if="item.total_count">剩余{{ item.remain_count }}份<text>/共{{ item.total_count }}份</text></text>
				</activity-item>
			</view>
			<view class="u-padding-20">
				<u-loadmore :status="loadStatus" color="#fff"></u-loadmore>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				limit: 10,
				loadStatus: 'loadmore'
			};
		},
		onLoad() {
			this.getList()
		},
		computed: {
			hasLogin() {
				return this.$store.state.hasLogin
			}
		},
		methods: {
			toDetails(item) {
				this.$u.route({
					url: 'pages/activity/details',
					params: {
						product_id: item.product_id,
						coupon_id: item.coupon_id,
						cp_id: item.cp_id
					}
				})
			},
			getList() {
				if (this.loadStatus == 'loadmore') {
					this.loadStatus = 'loading'
					let url = '/api/store/product/getCouponProjectList'
					if (this.hasLogin) {
						url = '/api/store/product/getPowerCouponProjectList'
					}
					this.$u.get(url, {
						page: this.page++,
						limit: this.limit
					}).then(({
						data
					}) => {
						this.list = this.list.concat(data.list)
						//console.log('list:', this.list)
						if (data.list.length < this.limit) {
							this.loadStatus = 'nomore'
						} else {
							this.loadStatus = 'loadmore'
						}
					})
				}
			},
			timestamp(e) {
				//let times = "2021-01-01 11:53:40"
				let d = e ? e.replace(/\-/g, '/') : ''
				let endTime = new Date(d).getTime()
				let nowTime = new Date().getTime()
				if (endTime < nowTime) {
					return true
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFDD00;
	}

	.topbg {
		width: 100%;
		height: 712rpx;
	}

	.a-list {
		padding: $gutter;
		// margin-top: -100rpx;
		position: relative;
		z-index: 10;

		.a-item {
			background-color: #fff;
			margin-bottom: $gutter;
			padding: $gutter;
			border-radius: $uni-border-radius-lg;
			// border: 6rpx solid #ffdd00;
			overflow: hidden;
			box-shadow: 0 5rpx 10rpx rgba($color: #000000, $alpha: 0.3);
		}
	}
</style>
