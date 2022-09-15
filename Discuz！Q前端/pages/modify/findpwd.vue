<template>
  <qui-page :data-qui-theme="theme" class="page-findpwd">
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <view class="login-box-h">{{ i18n.t('modify.retrievepassword') }}</view>
    <!-- #endif -->
    <view class="retireve" @click.stop="toggleBox">
      <view class="retireve-tab">
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <view class="retireve-titel">
          {{ i18n.t('modify.forgetpassword') }}\{{ i18n.t('modify.retrievepassword') }}
        </view>
        <!-- #endif -->
        <!-- 已绑定手机号码验证 -->
        <view class="retireve-phon" v-if="phon">
          <view class="retireve-phon-test">
            {{ i18n.t('modify.phonnumber') }}
          </view>
          <view :class="disphon ? 'retireve-phon-num' : 'retireve-phon-num1'" v-if="inptdisplay">
            {{ disphon ? disphon : i18n.t('modify.phonnumberempty') }}
          </view>
          <input
            class="new-phon-num"
            type="number"
            v-model="newphon"
            :focus="true"
            :cursor="1"
            @input="changeinput"
            maxlength="11"
            v-else
          />
          <button
            class="retireve-phon-send"
            @click="verifyPhoneNumber"
            id="TencentCaptcha"
            :data-appid="(forums && forums.qcloud && forums.qcloud.qcloud_captcha_app_id) || ''"
            :disabled="disabled"
          >
            {{ btnContent }}
          </button>
        </view>
        <view class="retireve-pas">
          <view class="retireve-pas-title">
            {{ i18n.t('modify.placeenternewpass') }}
          </view>
          <view class="retireve-pas-input">
            <input class="retireve-pas-input-i" type="password" v-model="newpassword" />
          </view>
        </view>
        <view class="retireve-pass" v-if="passt">
          {{ passtext }}
        </view>
        <!-- 验证码 -->
        <view class="retireve-input" @click.stop="fourse">
          <view class="retireve-input-test">
            {{ i18n.t('modify.placeentercode') }}
          </view>
          <qui-input-code
            @getdata="btndata"
            :title="pad"
            :text="test"
            :show="inshow"
            :isiphonex="inisIphone"
            ref="quiinput"
          ></qui-input-code>
        </view>
        <view class="retireve-button">
          <qui-button type="primary" size="large" @click="submission">
            {{ i18n.t('modify.submission') }}
          </qui-button>
        </view>
      </view>
    </view>
  </qui-page>
</template>

<script>
import { status } from '@/library/jsonapi-vuex/index';
import forums from '@/mixin/forums';
// #ifdef  H5
import tcaptchs from '@/utils/tcaptcha';
// #endif

export default {
  mixins: [
    forums,
    // #ifdef  H5
    tcaptchs,
    // #endif
  ],
  data() {
    return {
      userid: '',
      passt: false,
      phon: true,
      disphon: '',
      phonnumber: '',
      newpassword: '',
      codepass: '',
      pad: false,
      num: 5,
      test: '',
      passtext: '',
      sendtype: '',
      inshow: false,
      inisIphone: false,
      interval: '',
      inptdisplay: true,
      newphon: '',
      captcha: null, // 腾讯云验证码实例
      btnContent: this.i18n.t('modify.sendverificode'),
      time: 0, // 倒计时
      timer: '', // 定时器
      disabled: true, // 发送验证码按钮的状态
    };
  },
  onLoad(sing) {
    this.sendtype = sing.pas;
    this.userid = Number(sing.user) || '';
    if (this.userid) {
      this.inptdisplay = true;
    } else {
      this.inptdisplay = false;
    }
    this.personaldata();
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
  methods: {
    fourse() {
      this.inshow = true;
    },
    changeinput() {
      setTimeout(() => {
        this.newphon = this.newphon.replace(/[^\d]/g, '');
      }, 30);
      if (this.newphon.length === 11) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 校验手机号
    verifyPhoneNumber() {
      if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.newphon) || this.disphon) {
        if (this.forums.qcloud.qcloud_captcha) {
          if (!this.ticket || !this.randstr) {
            this.toTCaptcha();
            return false;
          }
        } else {
          this.time = 60;
          this.countdown();
          this.sendSMS();
        }
      } else {
        uni.showToast({
          icon: 'none',
          title: this.i18n.t('modify.phonerro'),
          duration: 2000,
        });
      }
    },
    // 60s倒计时
    countdown() {
      if (this.time > 1) {
        this.time -= 1;
        this.btnContent = `${this.time}${this.i18n.t('modify.retransmission')}`;
        this.disabled = true;
        this.timer = setTimeout(this.countdown, 1000);
      } else if (this.time === 1) {
        this.btnContent = this.i18n.t('modify.sendverificode');
        clearTimeout(this.timer);
        this.disabled = false;
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
          appId: this.forums.qcloud.qcloud_captcha_app_id, // 您申请的验证码的 appId
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
      this.captcha = new TencentCaptcha(this.forums.qcloud.qcloud_captcha_app_id, res => {
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
    btndata(num) {
      this.codepass = num;
    },
    // 获取个人信息
    personaldata() {
      const params = {
        _jv: {
          type: 'users',
          id: this.userid,
        },
        include: 'groups',
      };
      this.$store.dispatch('jv/get', params).then(data => {
        this.disphon = data.mobile;
        this.phonnumber = data.originalMobile;
        this.disabled = false;
      });
    },
    // 发送短信
    sendSMS() {
      const params = {
        _jv: {
          type: 'sms/send',
        },
        mobile: this.phonnumber || this.newphon,
        type: this.sendtype,
        captcha_ticket: this.ticket,
        captcha_rand_str: this.randstr,
      };
      const sendphon = status.run(() => this.$store.dispatch('jv/post', params));
      sendphon
        .then(res => {
          if (res) {
            this.ticket = '';
            this.randstr = '';
          }
        })
        .catch(() => {
          this.ticket = '';
          this.randstr = '';
        });
    },
    // 提交
    submission() {
      const params = {
        _jv: {
          type: 'sms/verify',
        },
        mobile: this.phonnumber || this.newphon,
        code: this.codepass,
        type: this.sendtype,
        password: this.newpassword,
        pay_password: this.newpassword,
        pay_password_confirmation: this.newpassword,
      };
      const postphon = status.run(() => this.$store.dispatch('jv/post', params));
      postphon
        .then(res => {
          const pages = getCurrentPages();
          if (res) {
            uni.showToast({
              title: this.i18n.t('modify.titlepassword'),
              duration: 2000,
            });
            // #ifdef H5
            uni.navigateBack({
              delta: 1,
            });
            // #endif
            // #ifndef H5
            uni.navigateBack({
              delta: 1,
              success() {
                pages[1].onLoad();
              },
            });
            // #endif
          }
        })
        .catch(err => {
          if (err.statusCode === 422) {
            this.passt = true;
            const [
              {
                detail: [sun],
              },
            ] = err.data.errors;
            uni.showToast({
              icon: 'none',
              title: sun,
              duration: 2000,
            });
          } else if (err.statusCode === 500) {
            this.test =
              this.i18n.t('modify.validionerro') + this.num + this.i18n.t('modify.frequency');
            this.pad = true;
            if (this.num < 0) {
              this.test = this.i18n.t('modify.lateron');
            }
          }
          this.empty();
        });
    },
    toggleBox() {
      this.inshow = false;
    },
    empty() {
      const empty = this.$refs.quiinput;
      empty.deleat();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.login-box-h {
  padding: 60rpx 0rpx 80rpx 40rpx;
  font-size: 36rpx;
  font-weight: 400;
  color: #fff;
  text-align: center;
  background: url(../../static/h5-play/loginbei.png) no-repeat;
  background-size: 100% 100%;
}
.page-findpwd /deep/ {
  background-color: --color(--qui-BG-2);
  box-sizing: border-box;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  /deep/ .qui-back {
    background: #ff2058;
    border-bottom: 5rpx solid #ff2058;
  }
  /* #endif */
  .retireve {
    width: 100vw;
    /* #ifndef H5 */
    height: 100vh;
    /* #endif */
    background-color: --color(--qui-BG-2);
    box-sizing: border-box;
  }
  .retireve-tab {
    padding: 31rpx 0 0 40rpx;
    box-sizing: border-box;
  }
  /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
  .retireve-titel {
    font-size: $fg-f7;
    font-weight: bold;
    line-height: 60rpx;
    color: --color(--qui-FC-333);
    opacity: 1;
  }
  /* #endif */
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  .retireve-titel {
    // width: 141rpx;
    // height: 34rpx;
    font-size: 36rpx;
    font-weight: 400;
    // white-space: nowrap;
    text-align: center;
    // color: #ffffff;
  }
  /* #endif */
  .retireve-phon {
    display: flex;
    width: 710rpx;
    height: 100rpx;
    justify-content: space-between;
    margin: 80rpx 0 0;
    border-bottom: 2rpx solid --color(--qui-BOR-ED);
    box-sizing: border-box;
  }
  .new-phon-num {
    width: 280rpx;
    height: 100rpx;
    margin-left: 50rpx;
    font-size: $fg-f6;
    font-weight: bold;
    line-height: 100rpx;
    color: --color(--qui-FC-333);
  }
  .retireve-phon-test {
    font-size: $fg-f4;
    font-weight: 400;
    line-height: 100rpx;
    color: --color(--qui-FC-777);
    white-space: nowrap;
  }
  .retireve-phon-num {
    margin: 0 0 0 109rpx;
    font-size: $fg-f5;
    font-weight: 400;
    line-height: 100rpx;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
  }
  .retireve-phon-num1 {
    margin-left: 80rpx;
    font-size: $fg-f4;
    font-weight: 400;
    line-height: 100rpx;
    color: --color(--qui-FC-777);
  }
  /* #ifdef H5 */
  .uni-input-input {
    color: --color(--qui-FC-333);
  }
  /* #endif */
  .retireve-pas {
    display: flex;
    width: 100%;
    height: 100rpx;
    padding: 0 40rpx 0 0;
    border-bottom: 2rpx solid --color(--qui-BOR-ED);
    box-sizing: border-box;
    justify-content: space-between;
  }
  .retireve-pas-title {
    font-size: $fg-f4;
    font-weight: 400;
    line-height: 100rpx;
    color: --color(--qui-FC-777);
    opacity: 1;
  }
  .retireve-input {
    width: 710rpx;
  }
  .retireve-input-test {
    font-size: $fg-f4;
    font-weight: 400;
    line-height: 100rpx;
    color: --color(--qui-FC-777);
  }
  .retireve-vftion-input {
    display: flex;
    width: 100%;
    height: 100rpx;
  }
  .retireve-pas-input-i {
    width: 400rpx;
    height: 100rpx;
    font-size: $fg-f6;
    line-height: 100rpx;
  }
  .retireve-button {
    margin: 52rpx 0 0;
  }
  .retireve-pass {
    font-size: $fg-f2;
    font-weight: 400;
    line-height: 100rpx;
    color: --color(--qui-RED);
  }
}
/* #ifndef H5-PLAY ||MP-WEIXIN-PLAY */
.retireve-phon-send {
  display: block;
  height: 70rpx;
  min-width: 180rpx;
  margin: 15rpx 40rpx 0;
  font-size: $fg-f4;
  font-weight: 400;
  line-height: 70rpx;
  color: --color(--qui-FC-FFF);
  text-align: center;
  background-color: --color(--qui-BG-HIGH-LIGHT);
  border-radius: 5rpx;
}
/* #endif */
/* #ifdef H5-PLAY ||MP-WEIXIN-PLAY */
.retireve-phon-send {
  display: block;
  height: 70rpx;
  width: 172rpx;
  min-width: 180rpx;
  margin: 15rpx 40rpx 0;
  font-size: $fg-f4;
  font-weight: 400;
  line-height: 70rpx;
  // color: --color(--qui-FC-FFF);
  color: #666 !important;
  text-align: center;
  background: #eee;
  opacity: 0.7;
  // background-color: --color(--qui-BG-HIGH-LIGHT);
  border-radius: 5rpx;
  // border: 1px solid #DCDCDC;
  // border-radius: 4px;
}
.retireve-phon-send::after {
  border: none;
}
/* #endif */
.retireve-button /deep/.qui-button--button {
  &[size='large'] {
    font-size: $fg-f4;
    color: --color(--qui-FC-FFF);
    /* #ifdef H5-PLAY|| MP-WEIXIN-PLAY */
    width: 649rpx;
    height: 88rpx;
    background: #ea3d5a;
    border-radius: 44rpx;
    /* #endif */
  }
}
</style>
