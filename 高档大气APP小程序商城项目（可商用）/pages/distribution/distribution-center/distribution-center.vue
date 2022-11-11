<template>
  <view>
    <!--顶部信息 -->
    <view class="user-info d-f justify-between">
      <view class="info-box">
        <view class="name">{{ distributionUserInfo.nickname }}</view>
        <view class="level">{{ distributionUserInfo.levelName }}</view>
      </view>
      <image :src="distributionUserInfo.image" class="header border rounded-50"></image>
    </view>
    <view class="distribution-number d-f justify-start">
      <view class="distribution-item"  @click="toMyLevel">
        <view>{{distributionUserInfo.lowest_level_nums}}</view>
        <view>我的推广</view>
      </view>
      <view class="distribution-item" @click="toMyLevel">
        <view>{{distributionUserInfo.all_counts}}</view>
        <view>全部推广</view>
      </view>
			<view class="distribution-item" @click="toDistributionInfo">
				<view class="iconfont font-s-9 icon-ico"></view>
			</view>
    </view>
    <!-- 我的收益 -->
    <view class="my-profit rounded">
      <view class="profit-title">
        <text class="iconfont icon-shezhi2"></text>
        我的收益
      </view>
      <view class="profit-box d-f justify-between">
        <view class="profit-item">
          <view>{{distributionUserInfo.today_money || 0 }}</view>
          <view>今日收益</view>
        </view>
        <view class="profit-item">
          <view>{{distributionUserInfo.purchased_money || 0 }}</view>
          <view>累计提现</view>
        </view>
        <view class="profit-item">
          <view>{{distributionUserInfo.total_money || 0 }}</view>
          <view>累计收益</view>
        </view>
      </view>
    </view>
    <!-- 可提现金额 -->
    <view class="withdrawal-box d-f justify-between">
      <view class="withdrawal-money">
        <view>可提现金额（元）</view>
        <view class="money">+{{distributionUserInfo.cash_money || 0 }}</view>
      </view>
      <view class="withdrawal-option" @click="toApplicationProfit">去提现</view>
    </view>
    <!-- 操作图标菜单列表 -->
    <view class="option-list">
      <view class="option-item" v-for="(item,index) in optionList" :key="index"
            @click="optionMenuClick(item)">
        <view class="content">
          <view class="iconfont font-s-8 text-main-color" :class="item.icon"></view>
          <view class="font-s-3 mt-1">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <!-- 收益状态 -->
    <view class="profit-status">
      <view class="title">收益状态</view>
      <view class="profit-content">
        <view class="profit-title d-f">
          <view style="width: 40%">日期</view>
          <view style="width: 40%">订单号</view>
          <view style="width: 20%">佣金</view>
        </view>
        <view class="profit-list">
          <view class="profit-item d-f" v-for="item in profitList" :key="item.id">
            <view style="width: 40%">{{item.created_at}}</view>
            <view style="width: 40%">{{item.no }}</view>
            <view style="width: 20%">+{{item.money || 0 }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { distributionUserInfoUrl,getDistributionProfitListUrl } from '@/api/index'

export default {
  data () {
    return {
      optionList: this.$Management.userCenterOption,
      distributionUserInfo: {},
      profitList: [],
      profitQueryInfo: {
        distributeUserId:'',
        pageSize: 10,
        page: 1,
        field: '',
        desc: '',
      },
    }
  },
  onLoad () {
    this.initData()
  },
  onShow(){
    this.initData()
  },
  methods: {
    initData () {
      this.getDistributionUserInfo()
    },
    // 获取推广员中心个人信息
    getDistributionUserInfo () {
      this.$R.get(distributionUserInfoUrl)
        .then(res => {
          uni.setStorage({ key: 'distributionUserInfo', data: res.data });
          this.distributionUserInfo = res.data
          this.getDistributionProfitList()
        })
    },
    // 获取收益列表
    getDistributionProfitList(){
      this.profitQueryInfo.distributeUserId = this.distributionUserInfo.id
      this.$R.get(getDistributionProfitListUrl, this.profitQueryInfo).then(res => {
        this.profitList = res.data.list
      })
    },
    // 操作菜单跳转
    optionMenuClick (item) {
      console.log(item)
      if (item.url != '') {
        uni.navigateTo({
          url: item.url
        })
      }
    },
		// 跳转到推广中心
		toDistributionInfo(){
			uni.navigateTo({
			  url: '/pages/distribution/my-distribution-info/my-distribution-info'
			})
		},
		// 跳转到我的下级
		toMyLevel(){
			uni.navigateTo({
			  url: '/pages/distribution/my-subordinate/my-subordinate'
			})
		},
    // 去提现
    toApplicationProfit () {
      uni.navigateTo({
        url: '/pages/distribution/application-profit/application-profit'
      })
    },
  }
}
</script>

<style lang="scss">

  .user-info {
    padding: 0 24rpx;
    margin: 20rpx 0;

    .info-box {
      margin-top: 26rpx;

      .name {
        font-size: 36rpx;
        color: #333333;
				font-weight: bold;
        height: 50rpx;
        line-height: 50rpx;
      }

      .level {
        font-size: 24rpx;
				margin-top: 8rpx;
        color: #999999;
      }
    }

    .header {
      width: 130rpx;
      height: 130rpx;
    }
  }

  .distribution-number {
    padding: 0 24rpx;

    .distribution-item {
			margin-right: 70rpx;
      text-align: center;
      font-size: 24rpx;
      color: #333333;
    }
  }

  .my-profit {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #292929;
    color: #ffecc4;

    .profit-title {
      font-size: 30rpx;
      margin-bottom: 20rpx;

      text {
        margin-right: 20rpx;
      }
    }

    .profit-box {
      .profit-item {
        width: 150rpx;
        text-align: center;
        font-size: 26rpx;
        line-height: 50rpx;
      }
    }
  }

  .withdrawal-box {
    padding: 0 24rpx;
    margin-top: 50rpx;

    .withdrawal-money {
      font-size: 26rpx;
      color: #666666;
      line-height: 40rpx;

      .money {
        font-size: 40rpx;
        line-height: 60rpx;
				font-weight: bold;
        color: $bg-main-color;
      }
    }

    .withdrawal-option {
      border: 1px solid $bg-main-color;
      border-radius: 30rpx;
      height: 60rpx;
      line-height: 60rpx;
      padding: 0 30rpx;
      color: $bg-main-color;
      font-size: 26rpx;
      margin-top: 20rpx;
    }
  }

  .option-list {
    padding: 0 24rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    .option-item {
      width: 33%;
      margin-bottom: 40rpx;

      .content {
        width: 160rpx;
        text-align: center;
        margin: 0 auto;
      }

      &:nth-child(1) .content {
        float: right;
      }

      &:nth-child(3n+1) .content {
        float: left;
      }

      &:nth-child(3n) .content {
        float: right;
      }
    }

  }

  .profit-status {
    padding: 20rpx;

    .title {
      font-size: 30rpx;
      color: #333333;
      margin-bottom: 20rpx;
      font-weight: bold;
    }

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
  }
</style>
