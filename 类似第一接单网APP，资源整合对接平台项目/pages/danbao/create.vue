<template>
	<view>

    <customtop :top_title="top_title"></customtop>

    <view class="container">
      <form class="luckform" @submit="formSubmit">

        <view class="items">
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">交易手机号<span class="span_required">*</span></view>
            </view>
            <view class="weui-cell__bd">
              <input name="phone" class="weui-input" type="text" placeholder="请输入交易手机号" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">交易金额<span class="span_required">*</span></view>
            </view>
            <view class="weui-cell__bd">
              <input name="price" class="weui-input" type="text" placeholder="¥" value="" />
            </view>
          </view>
        </view>

        <view class="items custom_checkbox">
          <view class="top">
            <span class="title">买卖关系</span><span class="span_required">*</span>
          </view>
          <view class="item weui-cell">
            <view class="box">
              <span :class="creator == 'payer' ? 'on' : ''" @click="setCreator('payer');">我是付款方</span>
              <span :class="creator == 'payee' ? 'on' : ''" @click="setCreator('payee');">我是收款方</span>
            </view>
          </view>
        </view>

        <view class="items">
          <view class="top">
            <span class="title">交易内容</span><span class="span_required">*</span>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <textarea maxlength="-1" name="content" class="weui-textarea" placeholder="请输入详细介绍"></textarea>
            </view>
          </view>
        </view>

        <view class="btnbox">
          <button class="luckbtn luckbtn-default" formType="submit">提交信息</button>
        </view>
      </form>

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
      top_title: '发起担保交易',
      creator: 'payer',
    }
  },
  methods: {
    formSubmit: function(e) {
      uni.showLoading();
      let params = e.detail.value;
      params.creator = this.creator;
      request.post('/danbao/store', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            icon: 'none',
            title: '发起成功',
            mask: true,
            success: function() {
              setTimeout(function() {
                uni.navigateTo({ url: '/pages/danbao/show?id=' + res.data.id });
              }, 1500);
            }
          })
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    setCreator: function(creator) {
      this.creator = creator;
    },
  }
}
</script>

<style>
@import url("@/static/weui.min.css");
page {
  padding-bottom: 60rpx;
}
.luckform .items {
  margin-top: 30rpx;
}
.luckform .btnbox {
  margin-top: 50rpx;
}
</style>
