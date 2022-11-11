<template>
  <view>
    <view class="order-list">
      <view class="order-item" v-for="item in orderList" :key="item.id">
        <view class="row-ac-sb">
          <view class="font-s-3 p-2">订单号:
            <text class="text-muted ml-1">{{item.no}}</text>
          </view>
          <view class="order-status">
            <view v-if="item.status_code === 'paid'" class="row bg-color mr-2 rounded font-s-4" style="width: 100rpx;height: 50rpx;">未付款</view>
            <view v-else-if="item.status_code === 'delivery'" class="row bg-success text-white mr-2 rounded font-s-4" style="width: 100rpx;height: 50rpx;">待发货</view>
            <view v-else-if="item.status_code === 'delivered'" class="row bg-success text-white mr-2 rounded font-s-4" style="width: 100rpx;height: 50rpx;">已发货</view>
            <view v-else-if="item.status_code === 'received'" class="row bg-success text-white mr-2 rounded font-s-4" style="width: 100rpx;height: 50rpx;">已收货</view>         </view>
        </view>
        <view class="goods-list">
          <view class="goods-item d-f ml-2">
            <image :src="item.productImg" class="goods-img rounded"></image>
            <view class="goods-info">
              <view class="title">
                <view class="font-s-3 goods-name in2line">{{item.productName}} <text class="fr">*{{item.amount}}</text></view>
                <view class="font-s-1 w-100">购买人：{{item.nickname}}</view>
              </view>
              <view class="price-box">
                产品金额
                <text class="text-main-color">￥{{item.productPrice}}</text>
                分销佣金
                <text class="text-main-color">￥{{item.distributeMoney}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDistributionOrderListUrl } from '@/api/index'

export default {
  data () {
    return {
      queryInfo: {
        // 1是自推订单 2是团队订单
        type: '',
        pageSize: 10,
        page: 1,
        field: '',
        desc: '',
      },
      orderList: [],
			total:''
    }
  },
  onLoad (option) {
    this.initData(option)
  },
	// 上划加载
	onReachBottom () {
		this.onReachBottomHandle()
	},
  methods: {
    initData (option) {
      this.getList(option)
    },
		onReachBottomHandle () {
			// 触底事件
			console.log(1)
			if(this.total != this.orderList.length){
				this.queryInfo.page++
				let option = {
					pageType:''
				}
				this.getList(option)
			}
		},
    getList (option) {
      if (option.pageType == 'my') {
        // 自推订单
        uni.setNavigationBarTitle({
          title: '自推订单'
        })
        this.queryInfo.type = 1
      } else if(option.pageType == 'team'){
        // 团队订单
        uni.setNavigationBarTitle({
          title: '团队订单'
        })
        this.queryInfo.type = 2
      }
      this.$R.get(getDistributionOrderListUrl, this.queryInfo)
        .then(res => {
          console.log(res)
					this.orderList = [...this.orderList,...res.data.list]
					this.total = res.data.total
        })
    }
  }
}
</script>

<style lang="scss">
  page {
    background-color: #f2f2f2;
  }

  .order-list {
    padding: 20rpx;

    .order-item {
      background-color: #ffffff;
      margin-bottom: 20rpx;
      border-radius: 10rpx;

      .option {
        width: 100rpx;
        height: 50rpx;
      }

      .goods-list {
        .goods-item {
          padding-bottom: 10rpx;
          margin-bottom: 10rpx;
          border-bottom: 1rpx solid #dddddd;

          &:last-child {
            border-bottom: none;
          }

          .goods-img {
            width: 150rpx;
            height: 150rpx;
            background-color: #dddddd;
          }

          .goods-info {
            margin-left: 20rpx;
						width: 500rpx;
            .title {
							border-bottom: 1px solid #dddddd;
							padding-bottom: 20rpx;
              .goods-name {
                height: 80rpx;
                line-height: 40rpx;
								margin-bottom: 10rpx;
              }
            }

            .price-box {
              font-size: 24rpx;
							margin-top: 10rpx;
							height: 50rpx;
							line-height: 50rpx;
              text {
                margin-right: 20rpx;
              }
            }
          }
        }

      }
    }
  }
</style>
