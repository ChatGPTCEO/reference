<template>
	<view>

    <customtop top_title="设置密码"></customtop>

    <view class="container" v-if="!loading">
      <form class="luckform" @submit="formSubmit">

        <view v-if="user.password != ''">
          <view class="items">
            <view class="top"><view class="title">旧密码</view></view>
            <view class="item weui-cell">
              <view class="weui-cell__bd">
                <input name="password_old" class="weui-input" type="password" placeholder="请输入旧密码" />
              </view>
            </view>
          </view>
          <view class="items">
            <view class="top"><view class="title">新密码</view></view>
            <view class="item weui-cell">
              <view class="weui-cell__bd">
                <input name="password" class="weui-input" type="password" placeholder="请输入新密码" />
              </view>
            </view>
          </view>
          <view class="items">
            <view class="top"><view class="title">确认新密码</view></view>
            <view class="item weui-cell">
              <view class="weui-cell__bd">
                <input name="password_confirm" class="weui-input" type="password" placeholder="请输入确认新密码" />
              </view>
            </view>
          </view>
        </view>

        <view v-if="user.password == ''">
          <view class="items">
            <view class="top"><view class="title">登录密码</view></view>
            <view class="item weui-cell">
              <view class="weui-cell__bd">
                <input name="password" class="weui-input" type="password" placeholder="请输入登录密码" />
              </view>
            </view>
          </view>
          <view class="items">
            <view class="top"><view class="title">确认密码</view></view>
            <view class="item weui-cell">
              <view class="weui-cell__bd">
                <input name="password_confirm" class="weui-input" type="password" placeholder="请输入确认密码" />
              </view>
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

  onShow: function() {
    this.getUser();
  },

  data() {
    return {
      loading: true,
      user: {}
    }
  },
  methods: {
    getUser: function() {
      uni.showLoading();
      request.post('/user/getLoginUser').then(res => {
        uni.hideLoading();
        this.user = res.data;
        this.loading = false;
      })
    },

    formSubmit: function(e) {
      let that = this;
      uni.showLoading();
      let params = e.detail.value;
      request.post('/user/user_password_update', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function() {
                uni.navigateBack({ delta: 1 });
              }, 1500);
            }
          });
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
