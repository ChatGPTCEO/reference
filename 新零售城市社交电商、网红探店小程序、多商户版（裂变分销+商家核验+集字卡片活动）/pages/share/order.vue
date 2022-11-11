<template>
	<view>
		<view class="promoter-order">
			<view class='promoterHeader bg-color'>
				<view class='headerCon acea-row row-between-wrapper'>
					<view>
						<view class='name'>累积推广订单</view>
						<view><text class='num'>{{recordCount || 0}}</text>单</view>
					</view>
					<view>
            <u-icon name="order" size="100" color="rgba(0,0,0,0.6)"></u-icon>
          </view>
				</view>
			</view>
			<view class='list' v-if="recordList.length>0">
				<block v-for="(item,index) in recordList" :key="index">
					<view class='item'>
						<!-- <view class='title acea-row row-column row-center'>
							<view class='data'>{{item.time}}</view>
							<view>本月累计推广订单：{{item.count || 0}}单</view>
						</view> -->
						<view class='listn'>
								<view class='itenm'>
									<view class='top acea-row row-between-wrapper'>
										<view class='pictxt acea-row row-between-wrapper'>
											<view class='pictrue'>
												<image :src='item.user.avatar'></image>
											</view>
											<view class='text line1'>{{item.user.nickname}}</view>
										</view>
										<view class='money' v-if="item.status >= 2">返佣：<text class='font-color'>￥{{item.brokerage}}</text></view>
										<view class='money' v-else>暂未返佣：<text class='font-color'>￥{{item.brokerage}}</text></view>
									</view>
									<view class='bottom'>
										<view><text class='name'>订单编号：</text>{{item.order_sn}}</view>
										<view><text class='name'>下单时间：</text>{{item.pay_time}}</view>
									</view>
								</view>
						</view>
					</view>
				</block>
			</view>
			<view v-if="recordList.length == 0">
        <u-empty src="/static/empty-box.png" text="暂无推广" icon-size="414" margin-top="50"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				page: 1,
				limit: 8,
				status: false,
				recordList: [],
				recordCount: 0,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				userInfo:''
			};
		},
		onLoad() {
      this.getRecordOrderList();
		},
		methods: {
			spreadInfo(){
				this.$u.get('/api/user/spread_info').then(res => {
					this.userInfo = res.data
				});
			},
			onLoadFun() {
				this.isShowAuth = false;
				this.getRecordOrderList();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			getRecordOrderList: function() {
				let that = this;
				let page = that.page;
				let limit = that.limit;
				let status = that.status;
				let recordList = that.recordList;
				let recordListNew = [];
				if (status == true) return;
				this.$u.get('/api/user/spread_order', {
					page: page,
					limit: limit
				}).then(res => {
					let len = res.data.list ? res.data.list.length : 0;
					let recordListData = res.data.list;
					recordListNew = recordList.concat(recordListData);
					that.recordCount = res.data.count || 0;
					that.status = limit > len;
					that.page +=1;
					that.$set(that, 'recordList', recordListNew);
				});
			}
		},
		onReachBottom() {
			this.getRecordOrderList();
		}
	}
</script>

<style scoped lang="scss">
	page {
    background-color: $bg;
  }
  .promoter-order .list .item{
		margin-bottom: 20rpx;
	}
	.promoter-order .list .item .title {
		height: 133rpx;
		padding: 0 30rpx;
		font-size: 26rpx;
		color: #999;
	}

	.promoter-order .list .item .title .data {
		font-size: 28rpx;
		color: #282828;
		margin-bottom: 5rpx;
	}

	.promoter-order .list .item .listn .itenm {
		background-color: #fff;
	}

	.promoter-order .list .item .listn .itenm~.itenm {
		margin-top: 12rpx;
	}

	.promoter-order .list .item .listn .itenm .top {
		margin-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1rpx solid #eee;
		height: 110rpx;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt {
		width: 320rpx;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt .text {
		width: 230rpx;
		font-size: 30rpx;
		color: #282828;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt .pictrue {
		width: 66rpx;
		height: 66rpx;
	}

	.promoter-order .list .item .listn .itenm .top .pictxt .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 3rpx solid #fff;
		box-sizing: border-box;
		box-shadow: 0 0 15rpx #aaa;
	}

	.promoter-order .list .item .listn .itenm .top .money {
		font-size: 28rpx;
	}

	.promoter-order .list .item .listn .itenm .bottom {
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		color: #666;
		line-height: 1.6;
	}
  .font-color, .font-color-red {
    color: red !important;
  }
	.promoter-order .list .item .listn .itenm .bottom .name {
		color: #999;
	}
  .promoterHeader .headerCon{padding:0 88rpx 20rpx 55rpx;}
  .promoterHeader .headerCon .name{margin-bottom:10rpx;}
  .promoterHeader .headerCon .num{font-size:50rpx;}
  .promoterHeader .headerCon .iconfont{font-size:125rpx;}
</style>
