<template>
  <view class="auth">
    <view class="auth__header">
      <qui-icon @tap="close" class="auth__header__close" name="icon-close" size="36"></qui-icon>
    </view>
    <view class="auth__content">
      <image
        class="auth__content__image"
        mode="aspectFit"
        :src="(forums && forums.set_site && forums.set_site.site_logo) || '/static/logo.png'"
      ></image>
      <qui-button
        v-if="canIUseGetUserProfile"
        type="primary"
        @click="handleGetUserProfile"
        lang="zh_CN"
        size="medium"
      >
        {{ t.userinfo }}
      </qui-button>
      <qui-button
        v-else
        type="primary"
        open-type="getUserInfo"
        @getuserinfo="handleGetUserInfo"
        lang="zh_CN"
        size="medium"
      >
        {{ t.userinfo }}
      </qui-button>
    </view>
  </view>
</template>

<script>
import forums from '@/mixin/forums';
import user from '@/mixin/user';
import { SITE_PAY } from '@/common/const';
import { getCurUrl } from '@/utils/getCurUrl';
import loginModule from '@/mixin/loginModule';

export default {
  mixins: [forums, user, loginModule],
  data() {
    return {
      canIUseGetUserProfile: false,
    };
  },
  computed: {
    t() {
      return this.i18n.t('auth');
    },
  },

  created() {
    if (wx.getUserProfile) {
      this.canIUseGetUserProfile = true;
    }
  },

  methods: {
    /**
     * 检查是否需要注册账户
     */
    checkIsNeedRegister() {
      const that = this;
      // 进行一次修正, 以防止未进入首页的 mount 生命周期
      if (
        !that.$store.getters['session/get']('isLogin') &&
        that.forums &&
        that.forums.set_reg &&
        that.forums.set_reg.register_type === 2
      ) {
        uni.setStorageSync('isSend', true);
        uni.setStorageSync('register', 1);
      }
    },

    /**
     * 新版本用户信息获取
     */
    handleGetUserProfile() {
      const that = this;

      const loginAction = res => {
        const { encryptedData, iv } = res;

        // when wechat version is between v2.10.4 and v2.16.0
        const isOldWechatVersion = !encryptedData || !iv;

        if (isOldWechatVersion) {
          uni.showToast({
            icon: 'none',
            title: '请升级您的微信到最新版，当前版本不支持微信登录功能',
            duration: 3000,
          });
          return;
        }

        that.checkIsNeedRegister();
        const register = uni.getStorageSync('register');
        that.getmpParams({
          register,
          encryptedData,
          iv,
        });
      };

      wx.getUserProfile({
        desc: '用于完成注册、登录用户信息',
        success(res) {
          loginAction(res);
        },
      });
    },

    /**
     * 兼容老版本的用户信息获取
     */
    handleGetUserInfo(res) {
      const that = this;
      if (res.detail.errMsg === 'getUserInfo:ok') {
        const register = uni.getStorageSync('register');
        const { iv, encryptedData } = res.detail;

        that.checkIsNeedRegister();
        that.getmpParams({
          register,
          iv,
          encryptedData,
        });
      } else {
        that.$emit('login');
      }
    },

    getmpParams({ register = 0, encryptedData, iv }) {
      return new Promise(resolve => {
        uni.login({
          success: loginRes => {
            if (loginRes.errMsg === 'login:ok') {
              const { code } = loginRes;
              const params = {
                data: {
                  attributes: {
                    js_code: code,
                    iv,
                    encryptedData,
                    register,
                  },
                },
              };
              this.$store.dispatch('session/setParams', params);
              this.getParams();
              resolve();
            }
          },
        });
      });
    },
    /**
     * 获取参数
     */
    getParams() {
      const params = {
        data: {
          attributes: {},
        },
      };
      const data = this.$store.getters['session/get']('params');
      if (data && data.data && data.data.attributes) {
        params.data.attributes.js_code = data.data.attributes.js_code;
        params.data.attributes.iv = data.data.attributes.iv;
        params.data.attributes.encryptedData = data.data.attributes.encryptedData;
        params.data.attributes.register = data.data.attributes.register;
      }
      const inviteCode = uni.getStorageSync('inviteCode');
      if (inviteCode !== '') {
        params.data.attributes.code = inviteCode;
      }
      const isSend = uni.getStorageSync('isSend');
      if (isSend) {
        this.noSenseLogin(params);
      }
    },
    // 未绑定用户的逻辑处理
    handleNoBindUser(error) {
      // userInfo，未绑定用户时使用
      const userInfo = {
        headimgurl: error.user.headimgurl,
        username: error.user.username,
      };
      uni.setStorageSync('token', error.token);
      uni.setStorageSync('userInfo', userInfo);
      uni.setStorageSync('isBind', true);
      if (this.forums && this.forums.set_reg && this.forums.set_reg.register_type === 0) {
        // 用户名模式
        this.jump2RegisterBindPage();
      }
      if (this.forums && this.forums.set_reg && this.forums.set_reg.register_type === 1) {
        // 手机号模式
        this.jump2RegisterBindPhonePage();
      }
    },
    // 处理微信小程序的微信登录错误逻辑
    handleMpLoginError(errors) {
      const [error] = errors;

      switch (error.code) {
        // 审核中
        case 'register_validate':
          uni.showToast({
            icon: 'none',
            title: this.i18n.t('core.register_validate'),
            duration: 2000,
          });
          this.$store.commit('session/SET_AUDIT_INFO', {
            errorCode: 'register_validate',
            username: error.data.userName,
          });
          uni.redirectTo({
            url: '/pages/user/warning',
          });
          break;
        case 'permission_denied':
          this.login();
          break;
        // 审核未通过
        case 'validate_reject':
          uni.showToast({
            icon: 'none',
            title: this.i18n.t('core.validate_reject'),
            duration: 2000,
          });
          this.$store.commit('session/SET_AUDIT_INFO', {
            errorCode: 'validate_reject',
            reason: error.data.rejectReason,
            username: error.data.userName,
          });
          uni.redirectTo({
            url: '/pages/user/warning',
          });
          break;
        // 用户被禁用
        case 'ban_user':
          uni.showToast({
            icon: 'none',
            title: this.i18n.t('core.ban_user'),
            duration: 2000,
          });
          this.$store.dispatch('forum/setError', {
            loading: false,
            code: 'ban_user',
          });
          break;
        // 未绑定用户时
        case 'no_bind_user':
          this.handleNoBindUser(error);
          break;
        // 站点禁止注册时
        case 'register_close':
          uni.showToast({
            icon: 'none',
            title: this.i18n.t('core.register_close'),
            duration: 2000,
          });
          // 站点禁止注册，跳转至站点信息页
          uni.redirectTo({ url: '/pages/site/info' });
          break;
        // 其他情况下，跳转至站点信息页
        default:
          uni.redirectTo({ url: '/pages/site/info' });
      }
    },
    /**
     * 无感登录
     */
    noSenseLogin(params) {
      let goBackFlag = false;
      const routes = getCurrentPages();
      const curRoute = routes[routes.length - 1].route;

      if (
        curRoute === 'pages/user/partner-invite' ||
        curRoute === 'pages/user/login' ||
        curRoute === 'pages/user/phone-login' ||
        curRoute === 'pages/user/phone-login-register'
      ) {
        // 三层以上页面，采用返回逻辑
        if (routes.length > 2) {
          goBackFlag = true;
        } else {
          uni.setStorageSync('page', '/pages/home/index');
        }
      } else {
        uni.setStorageSync('page', getCurUrl());
      }
      this.$store
        .dispatch('session/noSenseMPLogin', params)
        .then(res => {
          console.log(res, '微信无感');
          if (
            this.forums &&
            this.forums.set_site &&
            this.forums.set_site.open_ext_fields === '1' &&
            res &&
            res.new_user
          ) {
            this.jump2RegisterExtendPage();
            return;
          }
          if (res && res.data) {
            this.$emit('login');
            if (res.data.data && res.data.data.id) {
              this.logind();
              if (
                this.forums &&
                this.forums.set_site &&
                this.forums.set_site.site_mode !== SITE_PAY
              ) {
                try {
                  const page = uni.getStorageSync('page');
                  // 如果上次记录是 登录相关的页面 跳转至首页
                  if (page.indexOf('/login') !== -1) {
                    uni.redirectTo({ url: '/pages/home/index' });
                    return;
                  }

                  const isBind = uni.getStorageSync('isBind');
                  if (isBind) {
                    uni.showToast({
                      title: '绑定成功',
                      duration: 2000,
                    });
                  } else {
                    uni.showToast({
                      title: '登录成功',
                      duration: 2000,
                    });
                  }
                  if (goBackFlag) {
                    uni.navigateBack({ delta: 1 });
                  } else {
                    uni.redirectTo({
                      url: page,
                      fail: () => {
                        uni.redirectTo({ url: '/pages/home/index' });
                      },
                    });
                  }
                } catch (e) {
                  uni.showToast({
                    title: '登录失败',
                  });
                }
              }
              if (
                this.forums &&
                this.forums.set_site &&
                this.forums.set_site.site_mode === SITE_PAY &&
                this.user &&
                !this.user.paid
              ) {
                uni.redirectTo({
                  url: '/pages/site/info',
                });
                uni.getStorage({
                  key: 'isBind',
                  success(resData) {
                    if (resData.data) {
                      uni.showToast({
                        title: '绑定成功',
                        duration: 2000,
                      });
                    } else {
                      uni.showToast({
                        title: '登录成功',
                        duration: 2000,
                      });
                    }
                  },
                });
              }
            }
            if (res.data.errors) {
              this.handleMpLoginError(res.data.errors);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.auth {
  height: 400rpx;
  background: --color(--qui-BG-2);
  &__header {
    padding: 30rpx 32rpx;
    text-align: right;
    &__close {
      justify-content: flex-end;
      color: --color(--qui-FC-AAA);
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__image {
      max-height: 65rpx;
      margin: 10rpx 0 57rpx;
    }
  }
}
</style>
