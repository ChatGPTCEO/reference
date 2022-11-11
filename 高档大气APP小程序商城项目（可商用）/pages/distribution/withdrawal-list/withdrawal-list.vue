<template>
  <view>
    <view class="profit-content">
      <view class="profit-title d-f">
        <view style="width: 20%">支付状态</view>
        <view style="width: 20%">到账方式</view>
        <view style="width: 20%">提现状态</view>
        <view style="width: 40%">申请时间</view>
      </view>
      <view class="profit-list">
        <view class="profit-item d-f" v-for="item in withdrawalList" :key="item.id">
          <view style="width: 20%">
            <view v-if="item.is_pay === 0">待兑现</view>
            <view class="text-success" v-else-if="item.is_pay === 1">已兑现</view>
          </view>
          <view style="width: 20%">
            <view v-if="item.acc_type === 1">微信</view>
            <view v-else-if="item.acc_type === 2">支付宝</view>
            <view v-else-if="item.acc_type === 3">银行卡</view>
          </view>
          <view style="width: 20%">
            <view class="text-main-color" v-if="item.status === 0">审核失败</view>
            <view v-else-if="item.status === 1">审核中</view>
            <view class="text-success" v-else-if="item.status === 2">审核成功</view>
          </view>

          <view style="width: 40%">{{item.created_at}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDistributionWithdrawalListUrl } from '@/api/index'

export default {
  data () {
    return {
      queryInfo: {
        pageSize: 20,
        page: 1,
        field: '',
        desc: '',
      },
      withdrawalList: [],
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
      this.getDistributionWithdrawalList()
    },
    onReachBottomHandle () {
      // 触底事件
      if (this.total != this.myShopGoodsList.length) {
        this.queryInfo.page++
        this.getDistributionWithdrawalList()
      }
    },
    // 获取提现记录
    getDistributionWithdrawalList () {
      this.$R.get(getDistributionWithdrawalListUrl, this.queryInfo).then(res => {
        console.log(res)
        this.withdrawalList = [...this.withdrawalList, ...res.data.list]
        this.total = res.data.total
      })
    },
  }
}
</script>

<style lang="scss">
  .profit-content {
    .profit-title {
      font-size: 30rpx;
      color: #666666;
      text-align: center;
      height: 60rpx;
      line-height: 60rpx;
    }

    .profit-list {
      font-size: 22rpx;
      color: #999999;
      text-align: center;
      height: 60rpx;
      line-height: 60rpx;
    }
  }
</style>
