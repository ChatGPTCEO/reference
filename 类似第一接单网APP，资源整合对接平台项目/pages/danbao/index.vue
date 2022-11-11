<template>
	<view>

    <customtop :top_title="top_title"></customtop>

    <view class="container">
      <view class="luckbox introduce">
        <view class="top"><span class="title">担保交易</span></view>
        <view class="bd">
          担保交易服务是指为保证合作双方彼此的利益，甲方先将合作款项付至平台官方交易账户，合作完成后，再将合作款项结算给乙方，保障合作双方的资金安全，营造诚信的合作环境。
        </view>
      </view>

      <view class="luckbox flow">
        <view class="top"><span class="title">交易流程</span></view>
        <view class="bd">
          <view class="item"><span>1</span><span>向合作方发起交易</span></view>
          <view class="item"><span>2</span><span>付款方支付交易款</span></view>
          <view class="item"><span>3</span><span>合作完成后，结算交易款至乙方账户</span></view>
          <view class="item"><span>4</span><span>交易完成</span></view>
        </view>
      </view>

      <view class="btn_box">
        <view class="luckbtn luckbtn-default">咨询客服</view>
        <view class="luckbtn luckbtn-payment" @click="jumpPage('/pages/danbao/create')">发起交易</view>
      </view>

    </view>

	</view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      top_title: '担保交易',
    }
  },

  methods: {
    switchTab: function(url) {
      uni.switchTab({ url: url });
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
page {
  padding-bottom: 30rpx;
}
.luckbox {
  margin-top: 30rpx;
}
.introduce .bd {
  line-height: 1.8;
  letter-spacing: 2px;
}
.flow .item {
	margin-bottom: 10px;
}
.flow .item:last-child {
	margin-bottom: 0;
}
.flow .item span:first-child {
	margin-right: 12px;
	background-color: #00B38A;
	color: #fff;
	width: 26px;
	height: 26px;
	line-height: 26px;
	text-align: center;
	display: inline-block;
	border-radius: 50%;
}
.btn_box {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  margin-top: 50rpx;
}
.btn_box .luckbtn {
  width: 48%;
}
</style>
