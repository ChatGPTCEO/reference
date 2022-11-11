<template>
	<view class="neir">
		<view class="feng_flow">
			<view class="flow_block">
				<view class="flow_item" v-for="(item, i1) in lists1" :key="i1"
					@click="jon('/pages/user/userData?id='+item.uid)">
					<image :src="item.aname" mode="widthFix" style="width: 100%;"></image>
					<view class="flow_item_con">
						<!-- <view class="flow_item_des">{{item.half}}</view> -->
						<view class="flow_item_des">
							<u-icon :label="item.name" size="20" labelSize="10" :name="item.logo"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="flow_block">
				<view class="flow_item" v-for="(item2, i2) in lists2" :key="i2"
					@click="jon('/pages/user/userData?id='+item2.uid)">
					<image :src="item2.aname" mode="widthFix" style="width: 100%;"></image>
					<view class="flow_item_con">
						<!-- <view class="flow_item_des">{{item2.half}}</view> -->
						<view class="flow_item_des">
							<u-icon :label="item2.name" size="20" labelSize="10" :name="item2.logo"></u-icon>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lx: 0,
				flowList: [],
				list: [],
				lists1: [],
				lists2: [],
				list1Height: 0,
				list2Height: 0,
			}
		},
		onLoad(e) {
			this.lx = e.lx
			if (e.lx == 1) {
				uni.setNavigationBarTitle({
					title: '校花排行'
				})
			} else {
				uni.setNavigationBarTitle({
					title: '校草排行'
				})
			}
			this.getlist(e.lx);
		},
		methods: {
			getlist(a) {
				const that = this
				uni.$u.http.post('Encounter/xiaolist', {
						lx: a
					})
					.then(res => {
						let listdata = res.data
						listdata.map((da, di) => {
							console.log(da, di)
							if (that.list1Height > that.list2Height) {
								that.list2Height += 1
								that.lists2.push(da)
							} else {
								that.list1Height += 1
								that.lists1.push(da)
							}

						})

					})
			},
			jon(e) {
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo) {
					uni.$u.route({
						url: e
					})
		
				} else {
					uni.$u.toast('未登录')
				}
			}

		}
		
	}
</script>


<style>
	.neir {
		padding: 20rpx;
	}

	.feng_flow {
		display: flex;
		/* padding:15upx; */
	}

	.flow_block {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.flow_item {
		margin: 15upx;
		border-radius: 20upx;
		background: #f4f4f4;
		overflow: hidden;
	}

	.flow_item_con {
		padding: 10upx 20upx 20upx;
	}

	.flow_item_title {
		position: relative;
		font-size: 32upx;
		font-weight: 700;
		margin-bottom: 5upx;
	}

	.flow_item_des {
		font-size: 24upx;
	}
</style>
