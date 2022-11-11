<template>
	<view>

    <customtop top_title="验证码登录"></customtop>

    <view class="container">

      <view class="login">
        <view class="">
          <u--form ref="form">
            <u--input
                placeholder="手机号"
                class="item"
                v-model="form.phone"
              >
            </u--input>

            <view
              class="item"
            >
              <u-input placeholder="验证码" v-model="form.code">
                <template slot="suffix">
                  <u-code
                    ref="uCode"
                    @change="codeChange"
                    seconds="60"
                    changeText="X秒重新获取"
                    class="ubtn"
                  ></u-code>
                  <u-button
                    @tap="getCode"
                    :text="tips"
                    type="primary"
                    size="mini"
                    class="ubtn"
                  ></u-button>
                </template>
              </u-input>
            </view>

            <button class="luckbtn luckbtn-default" @click="formSubmit();">立即登录</button>
          </u--form>
        </view>

        <view class="other_way">
          <view class="ow_item ow_item1" @click="jumpPage('/pages/account/login_password');">密码登录</view>
          <view class="ow_item ow_item2" @click="jumpPage('/pages/account/register');">立即注册</view>
        </view>
      </view>

    </view>

	</view>
</template>

<script>
import { request } from "@/utils/http.js"
import util from "@/utils/util.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      form: {},
      tips: '',
    }
  },

  onLoad(options) {
    // 微信内打开
    if (options.wxmp_openid != undefined) {
      this.wxmp_openid = options.wxmp_openid;
    }
  },

  onShow() {
    // 微信内打开
    if (util.is_wx()) {
      if (this.wxmp_openid != undefined) {
        uni.setStorageSync('wxmp_openid', this.wxmp_openid);
        return false;
      }

      let wxmp_openid = uni.getStorageSync('wxmp_openid');
      if (wxmp_openid != '') return false;

      var pages = getCurrentPages() // 获取栈实例
      let currentRoute  = pages[pages.length-1].route; // 获取当前页面路由
      let currentPage = pages[pages.length-1]['$page']['fullPath'] //当前页面路径(带参数)
      request.post('/common/getConfig').then((res) => {
        window.location.href = res.data.app_url + '/wxmp_login?url_ident=' + currentPage;
      })
    }
  },

  methods: {
    formSubmit() {
      uni.showLoading();
      let params = this.form;
      params.inviteUserId = uni.getStorageSync('inviteUserId');
      // 微信内打开
      if (util.is_wx()) {
        params.type = 'wxmp';
        params.wxmp_openid = uni.getStorageSync('wxmp_openid');
      }
      request.post('/account/login', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          console.log(res.data);
          uni.setStorageSync('user_token', res.data.user_token);
          uni.showToast({
            title: '登录成功',
            duration: 1500,
            success: function() {
              setTimeout(function(){
                uni.switchTab({ url: '/pages/account/index' });
              }, 1500)
            }
          });
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    getCode: function() {
      if (this.$refs.uCode.canGetCode) {
        uni.showLoading({});
        request.post('/account/sendCode', {phone: this.form.phone}).then(res => {
          uni.hideLoading();
          if (res.code == 200) {
            uni.hideLoading();
            uni.$u.toast('验证码已发送');
            this.$refs.uCode.start();
          } else if (res.code == 400) {
            uni.showToast({ title: res.message, icon: 'none' });
          }
        })
      } else {
        return false;
      }
    },

    codeChange(text) {
      this.tips = text;
    },

    jumpPage: function(url) {
      uni.navigateTo({
        url: url,
      })
    }
  }
}
</script>

<style>
@import url("login.css");
.ubtn {
  padding: 5px !important;
}
</style>
