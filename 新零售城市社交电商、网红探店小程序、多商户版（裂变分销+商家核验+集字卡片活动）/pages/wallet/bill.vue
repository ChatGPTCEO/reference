<template>
	<view>
		<view class='bill-details'>
			<view class='nav acea-row'>
				<view class='item' :class='type==0 ? "on":""' @click='changeType(0)'>全部</view>
				<view class='item' :class='type==1 ? "on":""' @click='changeType(1)'>消费</view>
				<view class='item' :class='type==2 ? "on":""' @click='changeType(2)'>充值</view>
			</view>
			<view class='sign-record'>
				<view class='list' v-for="(item,index) in userBillList" :key="index">
					<view class='item'>
						<!-- <view class='data'>{{item.time}}</view> -->
						<view class='listn'>
							<view class='itemn acea-row row-between-wrapper'>
								<view>
									<view class='name line1'>{{item.title}}</view>
									<view class="small">{{item.create_time}}</view>
								</view>
								<view class='num' v-if="item.pm ==1">+{{item.number}}</view>
								<view class='num font-color' v-else>-{{item.number}}</view>
							</view>
						</view>
					</view>
				</view>
        <view class="u-padding-20" v-if="userBillList.length || loadStatus != 'nomore'">
          <u-loadmore :status="loadStatus"></u-loadmore>
        </view>
				<view class="u-padding-top-30" v-else>
          <u-empty text="暂无账单的记录哦～" mode="data"></u-empty>
				</view>
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
				loading: false,
				loadend: false,
				page: 1,
				limit: 10,
				type: 0,
				userBillList: [],
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false ,//是否隐藏授权
        loadStatus: 'loadmore'
			};
		},
		onShow() {
      this.getUserBillList();
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad (options) {
			this.type = options.type || 0;
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom () {
			this.getUserBillList();
		},
		methods: {
			/**
			 * 获取账户明细
			 */
			getUserBillList: function() {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadStatus = "loading";
				let data = {
					page: that.page,
					limit: that.limit,
					type:that.type
				}
        this.$u.get('/api/user/bill', data)
				.then(function(res) {
					let list = res.data.list,
						loadend = list.length < that.limit;
					that.userBillList = that.userBillList.concat(list)
					that.$set(that, 'userBillList', that.userBillList);
					that.loadend = loadend;
					that.loading = false;
					that.loadStatus = loadend ? "nomore" : "loadmore";
					that.page = that.page + 1;
				}, function(res) {
					that.loading = false;
					that.loadStatus = 'loadmore';
				});
			},
			/**
			 * 切换导航
			 */
			changeType: function(type) {
				this.type = type;
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'userBillList', []);
				this.getUserBillList();
			},
		}
	}
</script>

<style scoped lang='scss'>
	.bill-details .nav {
		background-color: #fff;
		height: 90rpx;
		width: 100%;
		line-height: 90rpx;
	}

	.bill-details .nav .item {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		color: #282828;
	}

	.bill-details .nav .item.on {
		color: #daa918;
		border-bottom: 3rpx solid #daa918;
	}
  .acea-row {
    display: flex;
  }
  .sign-record .list .item .listn .itemn .num {
    color: #16ac57;
  }
  .small {
    font-size: 24rpx;
    color: #999;
  }
  .font-color, .font-color-red {
    color: #fc4141!important;
  }
  .sign-record .list .item .listn .itemn .name {
    width: 390rpx;
    font-size: 28rpx;
    color: #282828;
    margin-bottom: 10rpx;
  }
  .sign-record .list .item .listn .itemn {
    height: 120rpx;
    border-bottom: 1rpx solid #eee;
    padding-right: 30rpx;
    margin-left: 30rpx;
  }
  .acea-row.row-between-wrapper {
    justify-content: space-between;
    align-items: center;
  }
</style>
