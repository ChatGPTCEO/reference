<template>
  <view>
    <view class="profit-box d-f justify-between">
      <view class="profit-money">
        <view>我的收益明细</view>
        <view>￥{{distributionUserInfo.total_money}}</view>
      </view>
      <image :src="distributionUserInfo.image" class="header border rounded-50"></image>
    </view>
    <view class="profit-list">
      <view class="profit-item rounded" v-for="item in profitList" :key="item.id">
        <view class="order-no">订单号：{{item.no}}</view>
        <view class="order-info d-f">
          <image :src="item.image" class="header border rounded-50"></image>
          <view class="info-box">
            <view class="level">
              <text>收益：</text>
              ￥{{ item.money }}
            </view>
            <view class="name">
              <text>下单人：</text>
              {{ item.name }}
            </view>
            <view class="level">
              <text>下单时间：</text>
              {{ item.created_at }}
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { getDistributionProfitListUrl } from '@/api/index'

export default {
  data () {
    return {
      distributionUserInfo: {},
      profitList: [],
      queryInfo: {
        distributeUserId: '',
        pageSize: 10,
        page: 1,
        field: '',
        desc: '',
      },
      total: 0
    }
  },
  onLoad () {
    this.initData()
  },
  // 上划加载
  onReachBottom () {
    this.onReachBottomHandle()
  },
  methods: {
    initData () {
      this.getDistributionUserInfo()
      this.getProfitList()
    },
    onReachBottomHandle () {
      // 触底事件
      if (this.total != this.profitList.length) {
        this.queryInfo.page++
        this.getProfitList()
      }
    },
    // 获取推广员中心个人信息
    getDistributionUserInfo () {
      this.distributionUserInfo = uni.getStorageSync('distributionUserInfo')
      console.log(this.distributionUserInfo)
    },
    // 获取收益列表
    getProfitList () {
      this.queryInfo.distributeUserId = this.distributionUserInfo.id
      this.$R.get(getDistributionProfitListUrl, this.queryInfo).then(res => {
        console.log(res)
        this.profitList = [...this.profitList, ...res.data.list]
        this.total = res.data.total
      })
    },
  }
}
</script>

<style lang="scss">
  page {
    background-color: #F5F5F5;
  }

  .profit-box {
    background-color: #ffffff;
    padding: 20rpx;

    .profit-money {
      font-size: 36rpx;
      font-weight: bold;
      color: #000000;
      line-height: 64rpx;
    }

    .header {
      width: 130rpx;
      height: 130rpx;
    }
  }

  .profit-list {
    padding: 20rpx;

    .profit-item {
      background-color: #ffffff;
      margin-bottom: 20rpx;
      padding: 20rpx;

      .order-no {
        font-size: 28rpx;
        color: #333333;
        margin-bottom: 20rpx;
      }

      .order-info {
        .header {
          width: 130rpx;
          height: 130rpx;
          margin-right: 20rpx;
        }

        .info-box {
          view {
						font-size: 26rpx;
						color: #666666;
						height: 44rpx;
						line-height: 44rpx;
            text {
              width: 130rpx;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
  }
</style>
