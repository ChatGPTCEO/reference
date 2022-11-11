<template>
  <view>
    <view class="profit-info">
      <view class="info">可提现金额：￥{{distributionUserInfo.cash_money}}</view>
      <view class="tip text-main-color">最少提现10元</view>
    </view>
    <view class="pay-mode">
      <view class="row-ac-sb border p-3 mb-2 rounded" v-for="(item,index) in payMethodList"
            @click="payDefault(index,item)" :key="item.id">
        <view class="row-ac">
          <view class="iconfont font-s-9" :class="item.icon" :style="'color: '+item.color"></view>
          <view class="ml-5">{{item.text}}
            <text class="font-s-3 text-main-color">{{item.tip}}</text>
          </view>
        </view>
        <view class="row choice text-white rounded-50 iconfont icon-gouxuan"
              :class="item.checked == true ? 'bg-color' : 'bg-white'"></view>
      </view>
    </view>
    <view class="user-info-list">
      <view class="user-info-item">
        <view class="label">收款人</view>
        <view class="content">
          <input type="text" v-model="applyWithdrawal.name" placeholder="请输入收款人名称"/>
        </view>
      </view>
      <view class="user-info-item">
        <view class="label">提现账户</view>
        <view class="content">
          <input type="text" v-model="applyWithdrawal.account" placeholder="请输入提现账户"/>
        </view>
      </view>
      <view class="user-info-item" v-if="applyWithdrawal.type == 3">
        <view class="label">开户银行</view>
        <view class="content">
          <input type="text" v-model="applyWithdrawal.accTargetName" placeholder="请输入开户行"/>
        </view>
      </view>
      <view class="user-info-item">
        <view class="label">提现金额</view>
        <view class="content">
          <input type="number" v-model="applyWithdrawal.money" placeholder="请输入提现金额"/>
        </view>
      </view>
    </view>

    <view class="mt-2 row" @click="submitProfitMoney">
      <view class="row bg-color font-s-5 rounded " style="width: 360rpx;height: 90rpx;">申请提现</view>
    </view>

  </view>
</template>

<script>
import { applyDistributionWithdrawalUrl } from '@/api/index'

export default {
  data () {
    return {
      // #ifdef MP-WEIXIN
      payMethodList: [
        {
          id: 1,
          icon: 'icon-weixinzhifu2',
          color: '#28A745',
          text: '提现到微信',
          tip: '(推荐)',
          checked: true,
        }, {
          id: 3,
          icon: 'icon-qianbao',
          color: '#dc3545',
          text: '提现到银行卡',
          tip: '',
          checked: false,
        }
      ],
      // #endif
      // #ifdef APP-PLUS || H5
      payMethodList: [
        {
          id: 1,
          icon: 'icon-weixinzhifu2',
          color: '#28A745',
          text: '提现到微信',
          tip: '(推荐)',
          checked: true,
        }, {
          id: 2,
          icon: 'icon-zhifubaozhifu1',
          color: '#007BFF',
          text: '提现到支付宝',
          tip: '',
          checked: false,
        },
        {
          id: 3,
          icon: 'icon-qianbao',
          color: '#dc3545',
          text: '提现到银行卡',
          tip: '',
          checked: false,
        }
      ],
      // #endif
      distributionUserInfo: {},
      applyWithdrawal: {
        name: '',
        type: 1,
        account: '',
        money: '',
        accTargetName: ''
      }

    }
  },
  onLoad () {
    this.initData()
  },
  methods: {
    initData () {
      this.distributionUserInfo = uni.getStorageSync('distributionUserInfo')
      console.log(this.distributionUserInfo)
    },
    // 选择提现方式
    payDefault (index, item) {
      console.log(item)
      this.payMethodList.forEach(item => {
        item.checked = false
      })
      this.payMethodList[index].checked = true
      this.applyWithdrawal.type = item.id
    },
    // 申请提现
    submitProfitMoney () {
      if (this.applyWithdrawal.name == '' || this.applyWithdrawal.account == ''
        || this.applyWithdrawal.money == '') {
        return uni.showToast({
          icon: 'none',
          title: '请填写完整信息'
        })
      }
      if(this.applyWithdrawal.money>(this.distributionUserInfo.total_money - this.distributionUserInfo.today_money)){
        return uni.showToast({
          icon: 'none',
          title: '金额大于可提现金额，请重新输入'
        })
      }
      this.$R.post(applyDistributionWithdrawalUrl, this.applyWithdrawal).then(res => {
        console.log(res)
        uni.showToast({
          icon: 'none',
          title: '提现申请成功,2秒后自动返回上一页'
        })
        setTimeout(()=>{
          uni.navigateBack({
            delta: 1
          });
        },2000)

      })
    },
  }
}
</script>

<style lang="scss">
  .profit-info {
    margin: 30rpx 50rpx;

    .info {
      font-size: 30rpx;
      color: #333333;
      line-height: 60rpx;
      height: 60rpx;
    }

    .tip {
      font-size: 24rpx;
      line-height: 40rpx;
      height: 40rpx;
    }
  }

  .user-info-item {
    background-color: #ffffff;
    border-radius: 8rpx;
    height: 80rpx;
    padding: 0 20rpx;
    color: #999999;
    margin-bottom: 40rpx;

    .label {
      height: 80rpx;
      line-height: 80rpx;
      width: 140rpx;
      display: inline-block;
      vertical-align: top;
      margin-top: 2rpx;
      margin-right: 20rpx;
    }

    .content {
      display: inline-block;
      height: 80rpx;
      line-height: 80rpx;

      input {
        display: inline-block;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 30rpx;
        border-bottom: 1px solid #dddddd;
      }
    }

  }

  .pay-mode {
    padding: 0 20rpx;

    .choice {
      width: 40rpx;
      height: 40rpx;
    }
  }

</style>
