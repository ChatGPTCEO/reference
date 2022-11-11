<template>
  <view>

    <customtop top_title="联系方式"></customtop>

    <view class="container">
      <form class="luckform" @submit="formSubmit">

        <view class="items">
          <view class="top"><view class="title">微信</view></view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <input name="weixin" class="weui-input" type="text" placeholder="请输入微信号" :value="user_contact.weixin" />
            </view>
          </view>
        </view>
        <view class="items">
          <view class="top"><view class="title">手机</view></view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <input name="phone" class="weui-input" type="text" placeholder="请输入手机号" :value="user_contact.phone" />
            </view>
          </view>
        </view>
        <view class="items">
          <view class="top"><view class="title">Q Q</view></view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <input name="qq" class="weui-input" type="text" placeholder="请输入QQ号" :value="user_contact.qq" />
            </view>
          </view>
        </view>
        <view class="items">
          <view class="top"><view class="title">电话</view></view>
          <view class="item weui-cell">
            <view class="weui-cell__bd">
              <input name="telphone" class="weui-input" type="text" placeholder="请输入座机电话" :value="user_contact.telphone" />
            </view>
          </view>
        </view>

        <view class="btnbox">
          <button class="lucnbtn luckbtn-default" formType="submit">确认提交</button>
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
      user_contact: {},
    }
  },

  onLoad: function (options) {
    this.getUserContact();
  },

  methods: {
    getUserContact: function() {
      uni.showLoading();
      request.post('/user/getUserContact').then(res => {
        uni.hideLoading();
        this.user_contact = res.data;
      })
    },

    formSubmit: function(e) {
      uni.showLoading();
      let params = e.detail.value;
      request.post('/user/user_contact_update', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          wx.showToast({ icon: 'success', title: '保存成功' })
        } else if (res.code == 400) {
          uni.showToast({ icon: 'none', title: res.message });
        }
      })
    },
  }
}
</script>

<style>
@import url("@/static/weui.min.css");
page {
  padding-bottom: 50rpx;
}
.luckform .items {
  margin-top: 30rpx;
}
.luckform .btnbox {
  margin-top: 30rpx;
}
</style>
