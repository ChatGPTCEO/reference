<template>
  <qui-page :data-qui-theme="theme" class="register-bind-box">
    <view class="new" @click.stop="toggleBox">
      <view class="register-bind-box-h">
        {{ i18n.t('user.bindPhone') }}
      </view>
      <view class="register-bind-box-info">
        <view class="register-bind-box-info-h">
          <text>{{ i18n.t('user.dear') }}</text>
          <img class="register-bind-box-info-image" :src="userInfo.headimgurl" />
          <text class="register-bind-box-info-bold">{{ userInfo.username }}</text>
        </view>
        <view class="register-bind-box-info-ft">{{ i18n.t('user.bindText') }}</view>
      </view>
      <view class="new-phon">
        <view class="new-phon-test">{{ i18n.t('user.phoneNumber') }}</view>
        <view class="new-phon-number">
          <input
            class="new-phon-num"
            type="number"
            v-model="phoneNumber"
            @input="changeinput"
            maxlength="11"
          />
          <button
            class="new-phon-send"
            @click="sendVerificationCode"
            id="TencentCaptcha"
            :data-appid="(forum && forum.qcloud && forum.qcloud.qcloud_captcha_app_id) || ''"
            :disabled="disabled"
          >
            {{ btnContent }}
          </button>
        </view>
      </view>
      <view class="newphon-erro" v-if="formeerro">{{ formeerro }}</view>
      <!-- 验证码 -->
      <view class="new-input" @click.stop="fourse">
        <view class="new-input-test">{{ i18n.t('modify.placeentercode') }}</view>
        <qui-input-code
          @getdata="btndata"
          :title="tit"
          :text="test"
          :show="inshow"
          :isiphonex="inisIphone"
          ref="quiinput"
        ></qui-input-code>
      </view>
      <view class="register-bind-box-btn" @click="handleClickBind">
        {{ i18n.t('user.bind') }}
      </view>
    </view>
  </qui-page>
</template>

<script>
import user from '@/mixin/user';
import loginModule from '@/mixin/loginModule';
import { SITE_PAY } from '@/common/const';
// #ifdef H5
import tcaptchs from '@/utils/tcaptcha';
// #endif

export default {
  mixins: [
    user,
    loginModule,
    // #ifdef H5
    tcaptchs,
    // #endif
  ],
  data() {
    return {
      tit: false,
      test: '',
      inshow: false,
      inisIphone: false,
      formeerro: '',
      btnContent: this.i18n.t('modify.sendverificode'),
      time: 0, // 倒计时
      timer: '', // 定时器
      disabled: true, // 发送验证码按钮的状态
      phoneNumber: '', // 手机号
      verificationCode: '', // 验证码
      isPaid: false, // 默认未付费
      captcha: null, // 腾讯云验证码实例
      captcha_ticket: '', // 腾讯云验证码返回票据
      captcha_rand_str: '', // 腾讯云验证码返回随机字符串
      captchaResult: {},
      forum: {}, // 配置
    };
  },
  onLoad() {
    this.getForum();
    // 接受验证码captchaResult
    this.$u.event.$on('captchaResult', result => {
      this.ticket = result.ticket;
      this.randstr = result.randstr;
      this.time = 60;
      this.countdown();
      this.sendSMS();
    });
    this.$u.event.$on('closeChaReault', () => {
      uni.hideLoading();
    });
  },
  onUnload() {
    this.$u.event.$off('captchaResult');
    this.$u.event.$off('closeChaReault');
    // 隐藏验证码
    if (this.captcha) {
      this.captcha.destroy();
    }
  },
  computed: {
    userInfo() {
      const data = uni.getStorageSync('userInfo');
      return data;
    },
    isBind() {
      const data = uni.getStorageSync('isBind');
      return data;
    },
  },
  methods: {
    changeinput() {
      setTimeout(() => {
        this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, '');
      }, 30);
      if (this.phoneNumber.length === 11) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    fourse() {
      this.inshow = true;
    },
    btndata(num) {
      this.verificationCode = num;
    },
    // 发送验证码
    sendVerificationCode() {
      if (this.forum && this.forum.qcloud && this.forum.qcloud.qcloud_captcha) {
        if (!this.ticket || !this.randstr) {
          this.toTCaptcha();
          return false;
        }
      } else {
        this.time = 60;
        this.countdown();
        this.sendSMS();
      }
    },
    // 发送验证码按钮的验证
    toTCaptcha() {
      // #ifdef MP-WEIXIN
      wx.navigateToMiniProgram({
        appId: 'wx5a3a7366fd07e119',
        path: '/pages/captcha/index',
        envVersion: 'release',
        extraData: {
          appId: this.forum.qcloud.qcloud_captcha_app_id, // 您申请的验证码的 appId
        },
        success() {
          console.log('验证码成功打开');
        },
        fail() {
          uni.hideLoading();
        },
      });
      // #endif
      // #ifdef H5
      // eslint-disable-next-line no-undef
      this.captcha = new TencentCaptcha(this.forum.qcloud.qcloud_captcha_app_id, res => {
        if (res.ret === 0) {
          this.ticket = res.ticket;
          this.randstr = res.randstr;
          // 验证通过后发布
          this.time = 60;
          this.countdown();
          this.sendSMS();
        }
        if (res.ret === 2) {
          this.postLoading = false;
          uni.hideLoading();
        }
      });
      // 显示验证码
      this.captcha.show();
      // #endif
    },
    // 60s倒计时
    countdown() {
      if (this.time > 1) {
        this.time -= 1;
        this.btnContent = `${this.time}${this.i18n.t('modify.retransmission')}`;
        this.disabled = true;
        this.timer = setTimeout(this.countdown, 1000);
        this.isGray = true;
      } else if (this.time === 1) {
        this.btnContent = this.i18n.t('modify.sendverificode');
        clearTimeout(this.timer);
        this.disabled = false;
        this.isGray = false;
      }
    },
    // 发送短信
    sendSMS() {
      const params = {
        _jv: {
          type: 'sms/send',
        },
        mobile: this.phoneNumber,
        type: 'login',
        captcha_ticket: this.ticket,
        captcha_rand_str: this.randstr,
      };
      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          if (res) {
            this.ticket = '';
            this.randstr = '';
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClickBind() {
      if (this.phoneNumber === '') {
        uni.showToast({
          icon: 'none',
          title: this.i18n.t('user.phonenumberEmpty'),
          duration: 2000,
        });
      } else if (this.verificationCode === '') {
        uni.showToast({
          icon: 'none',
          title: this.i18n.t('user.verificationCodeEmpty'),
          duration: 2000,
        });
      } else {
        this.$store.dispatch('session/setPhone', this.phoneNumber);
        this.verifyPhoneNumber();
      }
    },
    // 验证手机号
    verifyPhoneNumber() {
      const that = this;
      const params = {
        data: {
          attributes: {
            mobile: this.phoneNumber,
            code: this.verificationCode,
            type: 'login',
            register: 1,
          },
        },
      };

      const verificationCodeRequest = requestParams => {
        that.$store
          .dispatch('session/verificationCodeh5Login', requestParams)
          .then(res => {
            if (res && res.access_token) {
              that.logind();
              uni.showToast({
                title: '绑定成功',
                duration: 2000,
              });
              if (that.forum && that.forum.set_site && that.forum.set_site.site_mode !== SITE_PAY) {
                uni.getStorage({
                  key: 'page',
                  success(resData) {
                    uni.redirectTo({
                      url: resData.data,
                    });
                  },
                });
              }
              if (
                that.forum &&
                that.forum.set_site &&
                that.forum.set_site.site_mode === SITE_PAY &&
                that.user &&
                !that.user.paid
              ) {
                uni.redirectTo({
                  url: '/pages/site/info',
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
      // #ifdef MP-WEIXIN
      // 小程序注册必传参数, 此参数异步获取得到
      this.refreshmpParams(() => {
        const data = that.$store.getters['session/get']('params');
        if (data && data.data && data.data.attributes) {
          params.data.attributes.js_code = data.data.attributes.js_code;
          // 4.13日，微信登录接口升级，配合后台改动
          params.data.attributes.noAES = 1;
        }
        verificationCodeRequest(params);
      });
      // #endif
      // 微信内置浏览器注册必传参数
      // #ifdef H5
      const token = uni.getStorageSync('token');
      if (token !== '') {
        params.data.attributes.token = token;
      }
      verificationCodeRequest(params);
      // #endif
    },
    toggleBox() {
      this.inshow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

page {
  overflow: scroll;
  overflow-x: hidden;
}

.register-bind-box {
  font-size: $fg-f4;
  background-color: --color(--qui-BG-2);
  /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
  &-h {
    padding: 60rpx 0rpx 80rpx 40rpx;
    font-size: 50rpx;
    font-weight: bold;
    color: --color(--qui-FC-333);
  }
  /* #endif */
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  &-h {
    padding: 60rpx 0rpx 80rpx 40rpx;
    font-size: 36rpx;
    font-weight: 400;
    color: #fff;
    text-align: center;
    background: url(../../static/h5-play/loginbei.png) no-repeat;
    background-size: 100% 100%;
  }
  /deep/ .qui-back {
    background: #ff2058;
    border-bottom: 5rpx solid #ff2058;
  }
  /* #endif */
  &-info {
    padding: 0rpx 0rpx 50rpx 40rpx;
    font-size: 40rpx;

    &-h {
      margin-bottom: 20rpx;
    }

    &-image {
      width: 50rpx;
      height: 50rpx;
      margin-right: 20rpx;
      vertical-align: middle;
      border-radius: 100rpx;
    }

    &-bold {
      font-weight: bold;
    }

    &-ft {
      font-size: 34rpx;
    }
  }
  /* #ifndef H5-PLAY||MP-WEIXIN-PLAY */
  &-btn {
    width: 670rpx;
    height: 90rpx;
    margin: 50rpx auto 0rpx;
    line-height: 90rpx;
    color: --color(--qui-FC-FFF);
    text-align: center;
    background-color: --color(--qui-MAIN);
    border-radius: 5rpx;
  }
  /* #endif */
  /* #ifdef H5-PLAY||MP-WEIXIN-PLAY */
  &-btn {
    width: 670rpx;
    height: 90rpx;
    margin: 50rpx auto 0rpx;
    line-height: 90rpx;
    color: --color(--qui-FC-FFF);
    text-align: center;
    background-color: #ea3d5a;
    border-radius: 44rpx;
  }
  /* #endif */
}

.new {
  width: 100vw;
  padding-bottom: 40px;
  background-color: --color(--qui-BG-2);
  box-sizing: border-box;
}
.new-phon {
  width: 710rpx;
  margin-left: 40rpx;
  font-size: $fg-f7;
  font-weight: bold;
  line-height: 100rpx;
  border-bottom: 2rpx solid --color(--qui-BOR-ED);
  box-sizing: border-box;
}
.new-phon-test {
  font-size: $fg-f4;
  font-weight: 400;
  line-height: 100rpx;
  color: --color(--qui-FC-777);
}
.new-phon-number {
  display: flex;
}
.new-phon-num {
  width: 399rpx;
  height: 100rpx;
  font-size: $fg-f7;
  font-weight: bold;
  line-height: 100rpx;
  color: --color(--qui-FC-333);
}
.newphon-erro {
  margin: 20rpx 0 0 40rpx;
  font-size: $fg-f2;
  font-weight: 400;
  color: --color(--qui-RED);
}
.new-phon-send {
  display: block;
  height: 70rpx;
  min-width: 180rpx;
  margin: 15rpx 0 0 91rpx;
  font-size: $fg-f4;
  font-weight: 400;
  line-height: 70rpx;
  color: --color(--qui-FC-FFF);
  text-align: center;
  background: --color(--qui-BG-HIGH-LIGHT);
  border-radius: 5rpx;
}
.new-input {
  width: 710rpx;
  margin: 0 0 0 40rpx;
}
.new-input-test {
  font-size: $fg-f4;
  font-weight: 400;
  line-height: 100rpx;
  color: --color(--qui-FC-777);
  opacity: 1;
}
.new-vftion-input {
  display: flex;
  width: 100%;
  height: 100rpx;
}
.new-button {
  margin: 52rpx 40rpx 0;
}
</style>
