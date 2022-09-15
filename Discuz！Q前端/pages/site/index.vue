<template>
  <qui-page :data-qui-theme="theme" class="site">
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <!-- 头部的红色显示区域 -->
    <qui-header
      :head-img="
        forums.set_site && forums.set_site.site_logo
          ? forums.set_site.site_logo
          : '/static/logo.png'
      "
      :theme="i18n.t('home.theme')"
      :theme-num="siteInfo.count_users"
      :post-num="siteInfo.count_threads"
      :share-btn="shareBtn"
      :share-show="shareShow"
      :title="title"
      :iconcolor="theme === $u.light() ? '#333' : '#fff'"
      @click="open"
      @closeShare="closeShare"
      @logoClick="logoClick"
    ></qui-header>
    <!-- 头部的红色显示区域结束 -->
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <!-- 头部的红色显示区域 -->
    <qui-header
      :head-img="
        forums.set_site && forums.set_site.site_logo
          ? forums.set_site.site_logo
          : '/static/admin-logo-x2.png'
      "
      :theme="i18n.t('home.theme')"
      :theme-num="siteInfo.count_users"
      :post-num="siteInfo.count_threads"
      :share-btn="shareBtn"
      :share-show="shareShow"
      :title="title"
      :iconcolor="theme === $u.light() ? '#333' : '#fff'"
      @click="open"
      @closeShare="closeShare"
      @logoClick="logoClick"
    ></qui-header>
    <!-- 头部的红色显示区域结束 -->
    <!-- #endif -->
    <!-- 分享弹窗 -->
    <uni-popup ref="popupHead" type="bottom">
      <qui-share @close="cancel"></qui-share>
    </uni-popup>
    <!-- 站点信息 -->
    <view class="site-item">
      <qui-cell-item
        class="cell-item--left cell-item--auto"
        :title="i18n.t('manage.siteintroduction')"
        :addon="siteInfo.site_introduction"
      ></qui-cell-item>
      <qui-cell-item
        :title="i18n.t('manage.creationtime')"
        :addon="siteInfo.createdAt"
      ></qui-cell-item>
      <qui-cell-item
        :title="i18n.t('manage.circlemode')"
        :addon="
          siteInfo.set_site && siteInfo.set_site.site_mode === 'public'
            ? i18n.t('manage.publicmode')
            : i18n.t('manage.paymentmode')
        "
      ></qui-cell-item>
      <qui-cell-item :title="i18n.t('manage.circlemaster')" slot-right>
        <view class="site-item__owner" @click.stop="jumpUserPage(siteInfo.userId, $event)">
          <qui-avatar
            class="site-item__owner-avatar"
            :user="{ username: siteInfo.username, avatarUrl: siteInfo.avatar }"
            size="60"
          />
          <text class="site-item__owner-name">{{ siteInfo.username }}</text>
        </view>
      </qui-cell-item>
      <navigator url="/pages/manage/users" hover-class="none">
        <qui-cell-item class="member" :title="i18n.t('home.theme')" slot-right arrow>
          <view
            v-for="(item, index) in siteInfo.users"
            :key="index"
            class="site-item__person__content"
            @click.stop="jumpUserPage(item.id)"
          >
            <qui-avatar class="site-item__person__content-avatar" :user="item" size="60" />
          </view>
        </qui-cell-item>
      </navigator>
      <qui-cell-item :title="i18n.t('manage.myRole')" :addon="userInfo.groupName"></qui-cell-item>
      <qui-cell-item
        :title="i18n.t('manage.joinedTime')"
        :addon="userInfo.joinedTime"
        v-if="siteInfo.set_site && siteInfo.set_site.site_mode === 'pay' && userInfo.joinedAt"
      ></qui-cell-item>
      <qui-cell-item
        :title="i18n.t('manage.periodvalidity')"
        slot-right
        v-if="siteInfo.set_site && siteInfo.set_site.site_mode === 'pay'"
      >
        {{ userInfo.expiredTime }}
        <text
          v-if="userInfo.expiredTime !== '永久有效'"
          style="color: #0000bf;"
          @click.stop="renewal"
        >
          {{ day === '' ? i18n.t('manage.renewal') : i18n.t('manage.renewalTime', { day }) }}
        </text>
      </qui-cell-item>
      <qui-cell-item :title="i18n.t('manage.version')" :addon="version"></qui-cell-item>
      <qui-cell-item
        :title="i18n.t('site.myauthority')"
        slot-right
        :border="false"
        class="cell-item--auto cell-item--left"
      >
        <view v-for="(item, index) in permissionInfo" :key="index" class="site-item__permission">
          <!-- <text>{{ i18n.t('permission.' + item.replace(/\./g, '_')) }}</text> -->
          <text>{{ handlePermission(item) }}</text>
        </view>
      </qui-cell-item>
    </view>
    <view v-if="payShowStatus">
      <qui-pay
        ref="payShow"
        :money="forums.set_site && parseFloat(forums.set_site.site_price)"
        :wallet-status="userInfo.canWalletPay"
        :balance="Number(userInfo.walletBalance)"
        :pay-type-data="payTypeData"
        @onInput="onInput"
        @paysureShow="paysureShow"
      ></qui-pay>
    </view>
    <uni-popup ref="wechatPopup" type="center">
      <uni-popup-dialog
        type="warn"
        :content="wechatTip"
        :before-close="true"
        @close="handleWechatClickCancel"
        @confirm="handleWechatClickOk"
      ></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="codePopup" type="center" class="code-popup-box">
      <view class="code-content" v-if="qrcodeShow">
        <view class="code-title">{{ pay.payNow }}</view>
        <view class="code-pay-money">
          <view class="code-yuan">￥</view>
          {{ forums.set_site && forums.set_site.site_price }}
        </view>
        <view class="code-type-box">
          <view class="code-type-tit">{{ pay.payType }}</view>
          <view class="code-type">
            <qui-icon class="code-type-icon" name="icon-wxPay" size="36" color="#09bb07"></qui-icon>
            <view class="code-type-text">{{ pay.wxPay }}</view>
          </view>
        </view>
        <image :src="codeUrl" class="code-img"></image>
        <view class="code-tip">{{ pay.wechatIdentificationQRcode }}</view>
      </view>
    </uni-popup>
  </qui-page>
</template>

<script>
import { VERSION } from '@/common/const';
import { mapState, mapMutations } from 'vuex'; // vuex里的仓库和更改的办法
// import VodUploader from '@/common/cos-wx-sdk-v5.1';
import forums from '@/mixin/forums'; // 拿本地缓存数据的方法
import user from '@/mixin/user'; // 不知道干嘛的，好像是重复发送请求的
import loginModule from '@/mixin/loginModule'; // 用来各种小程序登录请求的
// #ifdef  H5
import tcaptchs from '@/utils/tcaptcha'; // 1200多行没备注，神仙，看不懂，应该是组件封装的方法
import appCommonH from '@/utils/commonHelper'; // 判断设备类型的方法
// #endif
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog'; // 弹出的对话框

let payWechat = null;
export default {
  name: 'Post',
  components: { uniPopupDialog },
  mixins: [
    // 混入方法使之内部可以直接使用
    forums, // 计算属性里添加一个请求数据的方法
    user, // 不知道干嘛的，好像是重复发送请求的
    loginModule, // 用来各种小程序登录请求的
    // #ifdef H5
    tcaptchs, // 1200多行没备注，神仙，看不懂，应该是组件封装的方法
    appCommonH, // 判断设备类型的方法
    // #endif
  ],
  data() {
    return {
      browser: 0, // 是不是浏览器
      version: VERSION,
      title: this.i18n.t('manage.circleinfo'),
      shareBtn: 'icon-share1',
      isWeixin: '', // 是否是微信浏览器
      shareShow: false, // h5内分享提示信息
      isPhone: false,
      wechatTip: this.i18n.t('discuzq.wechatBind'), // 微信绑定提示
      payShowStatus: false, // 是否显示支付
      qrcodeShow: false, // 二维码弹框
      isAnonymous: '0',
      payTypeData: [
        {
          name: this.i18n.t('pay.wxPay'),
          icon: 'icon-wxPay',
          color: '#09bb07',
          value: '0',
        },
        {
          name: '钱包支付',
          icon: 'icon-walletPay',
          color: '#1878f3',
          value: '1',
        },
      ],
    };
  },
  onLoad() {
    // uni.hideHomeButton();
    this.getSiteInfo();
    this.getPermissions();
    // #ifdef H5
    this.isWeixin = appCommonH.isWeixin().isWeixin;
    this.isPhone = appCommonH.isWeixin().isPhone;
    // if (this.isWeixin === false) {
    //   this.payTypeData[0].hide = true;
    // }
    this.browser = 1;
    // #endif
    // #ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
    // #endif
  },
  // 唤起小程序原声分享
  onShareAppMessage(res) {
    // 来自页面内分享按钮
    if (res.from === 'button') {
      return {
        title: this.forums.set_site.site_name,
      };
    }
    return {
      title: this.forums.set_site.site_name,
    };
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.forums.set_site.site_name,
      query: '',
    };
  },
  computed: {
    // pay支付语言包
    pay() {
      return this.i18n.t('pay');
    },
    currentLoginId() {
      const userId = this.$store.getters['session/get']('userId');
      return parseInt(userId, 10);
    },
    // 获取 站点信息
    siteInfo() {
      const info = this.$store.getters['jv/get']('forums/1');
      if (info && info.other) {
        info.count_users = info.other.count_users;
        info.count_threads = info.other.count_threads;
      }
      if (info && info.set_site) {
        info.site_introduction = info.set_site.site_introduction;
        if (info.set_site.site_install) {
          info.createdAt = info.set_site.site_install.slice(0, 10);
        }
      }
      if (info && info.set_site && info.set_site.site_author) {
        info.avatar = info.set_site.site_author.avatar;
        info.username = info.set_site.site_author.username;
        info.userId = info.set_site.site_author.id;
      }
      return info;
    },
    // 获取 用户信息
    userInfo() {
      const info = this.$store.getters['jv/get'](`users/${this.currentLoginId}`);
      if (info && info.joinedAt) {
        info.joinedTime = info.joinedAt.slice(0, 10);
      }
      if (info && info.expiredAt) {
        info.expiredTime = `${info.expiredAt.substr(0, 10)} `;
      } else {
        info.expiredTime = this.i18n.t('site.permanent');
      }
      if (info && info.groups && info.groups.length > 0) {
        info.groupName = info.groups[0].name;
      }
      return info;
    },
    day() {
      const info = this.$store.getters['jv/get']('forums/1');
      if (info && info.set_site && info.set_site.site_expire) {
        return info.set_site.site_expire;
      }
      return '';
    },
    // 获取 用户权限
    permissionInfo() {
      let permissionList = [];
      const info = this.$store.getters['jv/get'](`users/${this.currentLoginId}`);
      if (info && info.groups) {
        const currentGrops = info.groups[0];
        permissionList = currentGrops.permission.map(item => item.permission);
      }
      return permissionList;
    },
    ...mapState({
      footerIndex: state => state.footerTab.footerIndex,
    }),
  },
  methods: {
    // 处理权限国际化匹配
    handlePermission(str) {
      if (str.includes('canBeAsked.money')) {
        return this.$t(`permission.canBeAsked_money`, { lowPrice: str.match(/\d+$/)[0] });
      }
      return this.$t(`permission.${str.replace(/\./g, '_')}`);
    },
    // 调用 获取配置（站点信息） 接口
    getSiteInfo() {
      const params = {
        include: ['users'],
      };
      this.$store.dispatch('jv/get', ['forum', { params }]).then(res => {
        console.log(res);
      });
    },
    // 调用 用户组权限 接口
    getPermissions() {
      const params = {
        'filter[type]': 'invite',
        include: ['permission'],
      };
      this.$store.dispatch('jv/get', ['groups', { params }]).then(res => {
        console.log(res);
      });
    },
    // 首页头部分享按钮弹窗
    open() {
      // #ifdef MP-WEIXIN
      this.$refs.popupHead.open();
      // #endif
      // #ifdef H5
      if (this.isWeixin === true) {
        this.shareShow = true;
      } else {
        this.h5Share({
          title: this.forums.set_site.site_name,
          url: 'pages/site/index',
        });
      }
      // #endif
    },
    closeShare() {
      this.shareShow = false;
    },
    // 取消按钮
    cancel() {
      this.$refs.popupHead.close();
    },
    ...mapMutations({
      setFooterIndex: 'footerTab/SET_FOOTERINDEX',
    }),
    logoClick() {
      this.setFooterIndex(parseInt(0, 10));
      uni.redirectTo({
        url: `/pages/home/index`,
      });
    },
    // 跳转到个人主页
    jumpUserPage(userId) {
      if (userId) {
        uni.navigateTo({
          url: `/pages/profile/index?userId=${userId}`,
        });
      }
    },
    // 续期
    renewal() {
      this.payStatus = false;
      this.payShowStatus = true;
      this.$nextTick(() => {
        this.$refs.payShow.payClickShow();
      });
    },
    // 确认去绑定微信
    handleWechatClickOk() {
      // #ifdef MP-WEIXIN
      this.mpLogin();
      // #endif
      // #ifdef H5
      if (this.isWeixin) {
        this.wxh5Login(0, 0);
      } else {
        uni.showToast({
          icon: 'none',
          title: this.i18n.t('user.unLogin'),
          duration: 2000,
        });
      }
      // #endif
    },
    // 取消去绑定微信
    handleWechatClickCancel() {
      this.$refs.wechatPopup.close();
    },
    // 输入密码完成时
    onInput(val) {
      if (!this.forums.paycenter.wxpay_close) {
        this.value = 1;
      } else {
        this.value = val;
      }
      this.creatOrder(this.price, 8, this.value, 1);
    },
    // 支付方式选择完成点击确定时
    paysureShow(payType) {
      uni.setStorage({
        key: 'page',
        data: `/pages/site/index`,
      });
      if (payType === 0) {
        // #ifdef H5
        if (this.isWeixin === true && this.user.wechat === undefined) {
          this.$refs.wechatPopup.open();
          return;
        }
        if (this.isWeixin === true && this.user.wechat && this.user.wechat.mp_openid === '') {
          this.$refs.wechatPopup.open();
          return;
        }
        // #endif
        // #ifdef MP-WEIXIN
        if (
          this.user.wechat === undefined ||
          (this.user.wechat && this.user.wechat.min_openid === '')
        ) {
          this.$refs.wechatPopup.open();
          return;
        }
        // #endif
        this.creatOrder(this.price, 8, this.value, payType);
      } else if (payType === 1) {
        // 这是详情页获取到的支付方式---钱包
      }
    },
    // 创建订单
    creatOrder(amount, type, value, payType) {
      const params = {
        _jv: {
          type: 'orders',
        },
        type,
        amount,
        is_anonymous: this.isAnonymous,
      };
      /* eslint-disable */
      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.orderSn = res.order_sn;
          if (payType === 0) {
            // 微信支付
            if (this.browser === 0) {
              // 这是微信小程序内的支付
              this.orderPay(13, value, this.orderSn, payType, '0');
            } else {
              // 这是除微信小程序之外, this.isWeixin, this.isPhone
              if (this.isWeixin && this.isPhone) {
                // 这是微信浏览器
                this.orderPay(12, value, this.orderSn, payType, '1');
              } else if (this.isPhone) {
                this.orderPay(11, value, this.orderSn, payType, '2');
              } else {
                // 这是pc，没调接口之前
                this.orderPay(10, value, this.orderSn, payType, '3');
              }
            }
          } else if (payType === 1) {
            // 钱包支付
            this.orderPay(20, value, this.orderSn, payType);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 订单支付       broswerType: 0是小程序，1是微信浏览器，2是h5，3是pc
    orderPay(type, value, orderSn, payType, broswerType) {
      let params = {};
      if (payType === 0) {
        params = {
          _jv: {
            type: `trade/pay/order/${orderSn}`,
          },
          payment_type: type,
        };
      } else if (payType === 1) {
        params = {
          _jv: {
            type: `trade/pay/order/${orderSn}`,
          },
          payment_type: type,
          pay_password: value,
        };
      }

      this.$store
        .dispatch('jv/post', params)
        .then(res => {
          this.wxRes = res;
          if (payType === 0) {
            if (broswerType === '0') {
              this.wechatPay(
                res.wechat_js.timeStamp,
                res.wechat_js.nonceStr,
                res.wechat_js.package,
                res.wechat_js.signType,
                res.wechat_js.paySign,
              );
            } else if (broswerType === '1') {
              if (typeof WeixinJSBridge === 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(res), false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(res));
                  document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(res));
                }
              } else {
                this.onBridgeReady(res);
              }
            } else if (broswerType === '2') {
              payPhone = setInterval(() => {
                if (this.payStatus === 1) {
                  clearInterval(payPhone);
                  return;
                }
                this.getOrderStatus(orderSn, broswerType);
              }, 3000);
              window.location.href = res.wechat_h5_link;
            } else if (broswerType === '3') {
              if (res) {
                this.codeUrl = res.wechat_qrcode;
                this.payShowStatus = false;
                this.$refs.codePopup.open();
                this.qrcodeShow = true;
                payWechat = setInterval(() => {
                  if (this.payStatus === 1) {
                    clearInterval(payWechat);
                    return;
                  }
                  this.getOrderStatus(this.orderSn, broswerType);
                  uni.hideLoading();
                }, 3000);
              }
            }
          } else if (payType === 1) {
            const _this = this;
            if (res.wallet_pay.result === 'success') {
              this.$store.dispatch('jv/get', [`users/${this.currentLoginId}`, {}]);
              uni.showToast({
                icon: 'none',
                title: this.i18n.t('site.renewalSuccessfully'),
                duration: 2000,
              });
              this.payShowStatus = false;
              this.coverLoading = false;
            }
            this.coverLoading = false;
          }
        })
        .catch(err => {
          if (payType !== 0) {
            // 清空支付的密码
            this.$refs.payShow.clearPassword();
          };
        });
    },

    wechatPay(timeStamp, nonceStr, packageVal, signType, paySign) {
      // 小程序支付。
      const _this = this;
      uni.requestPayment({
        provider: 'wxpay',
        timeStamp,
        nonceStr,
        package: packageVal,
        signType,
        paySign,
        success(res) {
          _this.coverLoading = true;
          payWechat = setInterval(() => {
            if (_this.payStatus === 1) {
              clearInterval(payWechat);
              return;
            }
            _this.getOrderStatus(_this.orderSn);
          }, 3000);
        },
        fail(err) {
          _this.payShowStatus = false;
          _this.coverLoading = false;
          _this.$refs.toast.show({ message: _this.p.payFail });
        },
      });
    },

    // 非小程序内微信支付
    onBridgeReady(data) {
      // const that = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: data.wechat_js.appId, // 公众号名称，由商户传入
          timeStamp: data.wechat_js.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.wechat_js.nonceStr, // 随机串
          package: data.wechat_js.package,
          signType: 'MD5', // 微信签名方式：
          paySign: data.wechat_js.paySign, // 微信签名
        },
        function(data) {
          // alert('支付唤醒');
          if (data.err_msg == 'get_brand_wcpay_request:ok') {
            //微信支付成功，进行支付成功处理
          } else if (data.err_msg == 'get_brand_wcpay_request:cancel') {
            // 取消支付
            clearInterval(payWechat);
            resolve;
          } else if (data.err_msg == 'get_brand_wcpay_request:fail') {
            // 支付失败
            clearInterval(payWechat);
            resolve;
          }
        },
      );
      payWechat = setInterval(() => {
        if (this.payStatus === 1) {
          clearInterval(payWechat);
          return;
        }
        this.getOrderStatus(this.orderSn);
      }, 3000);
    },

    // 查询订单支状 broswerType: 0是小程序，1是微信浏览器，2是h5，3是pc
    getOrderStatus(orderSn, broswerType) {
      this.$store
        .dispatch('jv/get', [`orders/${orderSn}`, { custom: { loading: false } }])
        .then(res => {
          this.payStatus = res.status;
          if (this.payStatus === 1) {
            this.payShowStatus = false;
            this.coverLoading = false;
            if (broswerType === '3') {
              // 这是pc扫码支付完成
              this.$refs.codePopup.close();
              this.qrcodeShow = false;
              uni.showToast({
                icon: 'none',
                title: '用户组购买成功',
                duration: 2000,
              });
            }
            this.$refs.toast.show({ message: this.p.paySuccess });
          }
        })
        .catch(err => {
          this.coverLoading = false;
          this.$refs.toast.show({ message: this.p.payFail });
        });
    },
  },
};
</script>
<style lang="scss" scope>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

.site /deep/ {
  .popup-pay {
    .pay-title,
    .pay-radio {
      display: none;
    }
    .pay-btn {
      margin-top: 40rpx;
      margin-bottom: 40rpx;
    }
  }
  .popup-pay-type {
    padding-top: 40rpx;
    .pay-title {
      display: none;
    }
    .pay-tip {
      display: none;
    }
    .pay-type-chi {
      margin-bottom: 40rpx;
    }
  }
  .header {
    height: auto;
    margin-bottom: 30rpx;
    background: --color(--qui-BG-2);
    border-bottom: 2rpx solid --color(--qui-BOR-ED);
  }
  .header .circleDet {
    padding: 60rpx 40rpx 50rpx;
    opacity: 1;
  }
  .header .circleDet-txt {
    color: --color(--qui-FC-333);
    opacity: 1;
  }
  .header .logo {
    height: 75rpx;
    padding-top: 71rpx;
  }
  .header .qui-back {
    background: --color(--qui-BG-2);
  }
  .cell-item__body__content-title {
    width: 150rpx;
    margin-right: 40rpx;
    color: --color(--qui-FC-777);
  }
  .header .circleDet-num,
  .header .circleDet-share {
    color: --color(--qui-FC-333);
  }
  .site-invite {
    padding-bottom: 20rpx;
    text-align: center;
  }
  .cell-item--auto .cell-item__body {
    height: auto;
    padding: 35rpx 0;
    align-items: flex-start;
  }
  .cell-item--left .cell-item__body__right {
    text-align: left;
  }
}

//下面部分样式
.site-item {
  padding-left: 40rpx;
  background: --color(--qui-BG-2);
  border-bottom: 2rpx solid --color(--qui-BOR-ED);
}
.site .cell-item {
  padding-right: 40rpx;
}
.site-item__person__content-avatar,
.site-item__owner-avatar {
  margin-left: 8rpx;
}
.site-item__owner {
  display: flex;
  align-items: center;
}
.site-item__owner-avatar {
  margin-right: 20rpx;
}
/deep/ .member .cell-item__body__right {
  display: flex;
}
.site-item__person__content {
  display: inline-block;
  height: 60rpx;
  overflow: hidden;
  font-size: 0;
}
.site-item__permission {
  display: inline-block;
  height: 60rpx;
  padding: 0 28rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
  font-size: $fg-f3;
  line-height: 60rpx;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  color: #999;
  /* #endif */
  border: 2rpx solid --color(--qui-BOR-ED);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  border: 2rpx solid #e5e5e5;
  /* #endif */
  border-radius: 7rpx;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  border-radius: 36rpx;
  /* #endif */
}
</style>
