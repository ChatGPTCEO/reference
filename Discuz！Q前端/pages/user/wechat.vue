<template>
  <qui-page :data-qui-theme="theme" :header="false"></qui-page>
</template>
<script>
import user from '@/mixin/user';
import forums from '@/mixin/forums';
import appCommonH from '@/utils/commonHelper';
import loginModule from '@/mixin/loginModule';
import { SITE_PAY } from '@/common/const';

export default {
  mixins: [user, forums, appCommonH, loginModule],
  data() {
    return {
      state: true,
    };
  },
  onLoad(params) {
    // #ifdef H5
    this.wxLogin(params);
    // #endif
  },
  methods: {
    wxLogin(data) {
      // 进行一次修正, 以防止未进入首页的 mount 生命周期
      if (
        !this.$store.getters['session/get']('isLogin') &&
        this.forums &&
        this.forums.set_reg &&
        this.forums.set_reg.register_type === 2
      ) {
        uni.setStorageSync('isSend', true);
        uni.setStorageSync('register', 1);
      }
      this.$store
        .dispatch('session/noSenseh5Login', data)
        .then(res => {
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
          if (res && res.data && res.data.data && res.data.data.id) {
            this.logind();
            if (
              this.forums &&
              this.forums.set_site &&
              this.forums.set_site.site_mode !== SITE_PAY
            ) {
              uni.getStorage({
                key: 'page',
                success(resData) {
                  uni.redirectTo({
                    url: resData.data,
                  });
                },
                // 兜底逻辑处理，兜底返回至 pages/home/index 防止出现白屏
                fail() {
                  uni.redirectTo({ url: '/pages/home/index' });
                },
              });
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
            } else if (
              this.forums &&
              this.forums.set_site &&
              this.forums.set_site.site_mode === SITE_PAY &&
              this.user
            ) {
              // 检查当前是否是进行绑定逻辑
              const isBind = uni.getStorageSync('isBind');

              const _this = this;

              // 判断用户是否付费，从而进行不同的跳转逻辑
              // eslint-disable-next-line func-names
              const checkUserPaid = function() {
                if (_this.user.paid) {
                  uni.getStorage({
                    key: 'page',
                    success(resData) {
                      if (resData === '/site/info' && !isBind) {
                        uni.redirectTo({ url: '/pages/home/index' });
                        return;
                      }
                      uni.redirectTo({
                        url: resData.data,
                      });
                    },
                    // 兜底逻辑处理，兜底返回至 pages/home/index 防止出现白屏
                    fail() {
                      uni.redirectTo({ url: '/pages/home/index' });
                    },
                  });
                } else {
                  uni.redirectTo({
                    url: '/pages/site/info',
                  });
                }
              };

              uni.showToast({
                title: isBind ? '绑定成功' : '登录成功',
                icon: 'success',
                duration: 2000,
                complete() {
                  checkUserPaid();
                },
              });
            }
            return;
          }
          if (res && res.data && res.data.errors) {
            const [error] = res.data.errors;
            if (res.data.errors[0].code === 'no_bind_user') {
              const userInfo = {
                headimgurl: res.data.errors[0].user.headimgurl,
                username: res.data.errors[0].user.nickname,
              };
              uni.setStorageSync('token', res.data.errors[0].token);
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
              return;
            }
            if (res.data.errors[0].code === 'permission_denied') {
              this.login();
              return;
            }
            if (res.data.errors[0].code === 'register_validate') {
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
              return;
            }
            if (res.data.errors[0].code === 'validate_reject') {
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
              return;
            }
            if (res.data.errors[0].code === 'register_close') {
              uni.showToast({
                icon: 'none',
                title: this.i18n.t('core.register_close'),
                duration: 2000,
              });
              // 站点禁止注册，跳转至站点信息页
              uni.redirectTo({ url: '/pages/site/info' });
              return;
            }
            if (res.data.errors[0].code === 'ban_user') {
              uni.showToast({
                icon: 'none',
                title: this.i18n.t('core.ban_user'),
                duration: 2000,
              });
              this.$store.dispatch('forum/setError', {
                loading: false,
                code: 'ban_user',
              });
              return;
            }
            if (res.data.errors[0].code === 'account_has_been_bound') {
              uni.getStorage({
                key: 'page',
                success(resData) {
                  uni.redirectTo({
                    url: resData.data,
                  });
                  setTimeout(() => {
                    uni.showToast({
                      icon: 'none',
                      title: '用户或微信已绑定其它，无法进行绑定',
                      duration: 2000,
                    });
                  }, 1000);
                },
              });
              return;
            }
            if (res.data.errors[0].code === 'rebind_mp_wechat') {
              uni.setStorageSync('token', res.data.errors[0].token);
              uni.redirectTo({
                url: '/pages/user/login-bind',
              });
              return;
            }
          }
          // 默认兜底
          uni.redirectTo({
            url: '/',
          });
          setTimeout(() => {
            uni.showToast({
              icon: 'none',
              title: `未知错误${res.data.errors[0].code}`,
              duration: 2000,
            });
          }, 500);
        })
        .catch(err => {
          uni.redirectTo({
            url: '/',
          });
          setTimeout(() => {
            uni.showToast({
              icon: 'none',
              title: err.message,
              duration: 2000,
            });
          }, 500);
        });
    },
  },
};
</script>
