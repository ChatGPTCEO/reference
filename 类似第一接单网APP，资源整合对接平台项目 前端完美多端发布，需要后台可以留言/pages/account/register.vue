<template>
	<view>

    <customtop top_title="注册"></customtop>

    <view class="container">

      <view class="login">
        <view class="">
          <u--form ref="form">
            <u--input
                placeholder="昵称"
                class="item"
                v-model="form.nickname"
              >
            </u--input>
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

            <u--input
                placeholder="密码"
                type="password"
                class="item"
                v-model="form.password"
              >
            </u--input>

            <u--input
                placeholder="确认密码"
                type="password"
                class="item"
                v-model="form.password_confirm"
              >
            </u--input>

            <button class="luckbtn luckbtn-default" @click="formSubmit();">立即注册</button>
          </u--form>
        </view>

        <view class="other_way">
          <view class="ow_item ow_item1" @click="jumpPage('/pages/account/login_password');">已有账号？立即登录</view>
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
    // 邀请有礼
    if (options.inviteUserId != undefined) {
      uni.setStorageSync('inviteUserId', options.inviteUserId);
    }

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
      request.post('/account/register', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.setStorageSync('user_token', res.data.user_token);
          uni.showToast({
            title: '注册成功',
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
