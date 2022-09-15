<template>
  <view class="my">
    <!-- #ifndef MP-WEIXIN-PLAY -->
    <!-- #ifdef MP-WEIXIN -->
    <uni-nav-bar
      :title="i18n.t('profile.mine')"
      fixed="true"
      :color="checked ? '#fff' : '#000'"
      :background-color="checked ? '#2e2f30' : '#fff'"
      status-bar
    ></uni-nav-bar>
    <!-- #endif -->
    <!-- #endif -->
    <view class="scroll-y">
      <view class="my-info">
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <view class="my-info__box">
          <view class="my-info__box__detail" @click="jumpUserPage">
            <!-- 头像图标 -->
            <qui-avatar :user="userInfo" :is-real="userInfo.isReal" :size="100" />
            <!-- 头像图标结束 -->
            <!-- 用户信息字体 -->
            <qui-cell-item
              :title="userInfo.username || ''"
              :brief="userInfo.groupsName"
              :border="false"
              class="my-info__box__detail-username"
            ></qui-cell-item>
            <!-- 用户信息字体结束 -->
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <!-- 大白框框 -->
        <view class="white_dishdish"></view>
        <!-- 大白框框结束 -->
        <view class="my-info__box">
          <view class="my-info__box__detail" @click="jumpUserPage">
            <!-- 头像图标 -->
            <qui-avatar :user="userInfo" :is-real="userInfo.isReal" :size="90" />
            <!-- 头像图标结束 -->
            <!-- 用户信息字体 -->
            <qui-cell-item
              :title="userInfo.username || ''"
              :border="false"
              class="my-info__box__detail-username"
            ></qui-cell-item>
            <!-- 用户信息字体结束 -->
          </view>
        </view>
        <!-- #endif -->
        <view class="my-info__introduction" v-if="userInfo.signature">
          {{ userInfo.signature }}
        </view>
      </view>
      <!-- 主题、专辑、问答横栏 -->
      <view class="my-tabs">
        <qui-tabs :values="items" @clickItem="onClickItem" :brief="true" :current="-1"></qui-tabs>
      </view>
      <!-- 主题、专辑、问答横栏结束 -->
      <view class="my-items">
        <view class="my-items__wrap">
          <!-- 我的资料 -->
          <navigator url="/pages/my/profile" hover-class="none">
            <qui-cell-item :title="i18n.t('profile.myprofile')" arrow></qui-cell-item>
          </navigator>
          <!-- 我的资料结束 -->
          <!-- 我的钱包 -->
          <navigator
            url="/pages/my/wallet"
            hover-class="none"
            v-if="forums.paycenter ? forums.paycenter.wxpay_close : ''"
          >
            <qui-cell-item :title="i18n.t('profile.mywallet')" arrow></qui-cell-item>
          </navigator>
          <!-- 我的钱包结束 -->
          <!-- 我的购买 -->
          <navigator url="/pagesplay_web/my_purchase" hover-class="none">
            <qui-cell-item :title="'我的购买'" arrow></qui-cell-item>
          </navigator>
          <!-- 我的购买结束 -->
          <!-- 我的收藏 -->
          <navigator url="/pages/my/favorite" hover-class="none">
            <qui-cell-item :title="i18n.t('profile.myfavorite')" arrow></qui-cell-item>
          </navigator>
          <!-- 我的收藏结束 -->
          <!-- <navigator url="/pages/questions/index" hover-class="none">
            <qui-cell-item :title="i18n.t('profile.mycontent')" arrow></qui-cell-item>
          </navigator> -->
          <!-- 我的草稿箱 -->
          <navigator url="/pagesplay_web/drafts" hover-class="none">
            <qui-cell-item :title="'我的草稿箱'" arrow></qui-cell-item>
          </navigator>
          <!-- 我的草稿箱结束 -->
          <!-- 我的屏蔽 -->
          <navigator url="/pages/my/shield" hover-class="none">
            <qui-cell-item
              :title="i18n.t('profile.myshield')"
              arrow
              :border="false"
            ></qui-cell-item>
          </navigator>
          <!-- 我的屏蔽结束 -->
        </view>
        <view class="my-items__wrap">
          <!-- 站点信息 -->
          <navigator url="/pages/site/index" hover-class="none">
            <qui-cell-item
              :title="i18n.t('profile.circleinfo')"
              arrow
              :border="
                forums.other &&
                (forums.other.can_create_invite ||
                  forums.other.can_edit_user_group ||
                  forums.other.can_invite_user_scale)
                  ? true
                  : false
              "
            ></qui-cell-item>
          </navigator>
          <!-- 站点信息结束 -->
          <!-- 邀请朋友 -->
          <navigator
            url="/pages/invite/index"
            hover-class="none"
            v-if="forums.other && forums.other.can_invite_user_scale"
          >
            <qui-cell-item
              :title="i18n.t('profile.inviteFriends')"
              arrow
              :border="
                forums.other && (forums.other.can_create_invite || forums.other.can_edit_user_group)
                  ? true
                  : false
              "
              :class-item="'invite-friends'"
            ></qui-cell-item>
          </navigator>
          <!-- 邀请朋友结束-->
          <!-- 站点管理 -->
          <navigator
            v-if="
              forums.other && (forums.other.can_create_invite || forums.other.can_edit_user_group)
            "
            url="/pages/manage/index"
            hover-class="none"
          >
            <qui-cell-item
              :title="i18n.t('profile.circlemanagement')"
              arrow
              :border="false"
            ></qui-cell-item>
          </navigator>
        </view>

        <view class="my-items__wrap">
          <qui-cell-item :title="i18n.t('profile.theme')" slot-right :border="false">
            <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
            <u-switch @change="changeCheck" v-model="checked" active-color="#1E78F3"></u-switch>
            <!-- #endif -->
            <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
            <u-switch @change="changeCheck" v-model="checked" active-color="#ea3d5a"></u-switch>
            <!-- #endif -->
          </qui-cell-item>
        </view>

        <!-- 小程序和微信内：用户名模式和手机号模式展示退出登录按钮，无感模式不展示退出登录按钮
             微信外：展示退出登录按钮 -->
        <!-- #ifdef MP-WEIXIN -->
        <view class="logout" v-if="forums && forums.set_reg && forums.set_reg.register_type !== 2">
          <qui-button size="large" type="warn" @click="logout">
            {{ i18n.t('user.logout') }}
          </qui-button>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5-->
        <view
          class="logout"
          v-if="isWeixin && forums && forums.set_reg && forums.set_reg.register_type !== 2"
        >
          <qui-button size="large" type="warn" @click="logout">
            {{ i18n.t('user.logout') }}
          </qui-button>
        </view>
        <!-- 退出登录 -->
        <view class="logout" v-if="!isWeixin">
          <qui-button size="large" type="warn" @click="logout">
            {{ i18n.t('user.logout') }}
          </qui-button>
        </view>
        <!-- 退出登录结束 -->
        <!-- #endif -->
      </view>
    </view>
    <uni-popup ref="popup" type="center">
      <uni-popup-dialog
        type="warn"
        :content="i18n.t('user.loginOutTips')"
        :before-close="true"
        @close="handleClickCancel"
        @confirm="handleClickOk"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script>
import { THEME_DEFAULT, THEME_DARK, SITE_PAY } from '@/common/const';
import forums from '@/mixin/forums';
import user from '@/mixin/user';
import appCommonH from '@/utils/commonHelper';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';
import { mapState, mapMutations } from 'vuex';

export default {
  components: { uniPopupDialog },
  mixins: [forums, user, appCommonH],
  data() {
    return {
      items: [
        { title: this.i18n.t('profile.topic'), brief: '0' },
        // #ifdef H5-PLAY || MP-WEIXIN-PLAY
        // { title: '专辑', brief: '0' },
        // #endif
        { title: this.i18n.t('profile.questionAndAnswer'), brief: '0' },
        { title: this.i18n.t('profile.following'), brief: '0' },
        { title: this.i18n.t('profile.followers'), brief: '0' },
        { title: this.i18n.t('profile.likes'), brief: '0' },
      ],
      current: 0,
      checked: false,
      // #ifdef H5
      isWeixin: false, // 默认不是微信浏览器
      // #endif
      register_type: 2, // 默认注册模式为无感模式
      site_mode: '', // 站点模式
    };
  },
  computed: {
    ...mapState({
      footerIndex: state =>
        state.footerTab.footerIndex ? parseInt(state.footerTab.footerIndex, 10) : 0,
    }),
    userId() {
      return this.$store.getters['session/get']('userId');
    },
    userInfo() {
      const userInfo = this.$store.getters['jv/get'](`users/${this.userId}`);
      let groups = [];
      if (userInfo.groups && userInfo.groups.length > 0) {
        groups = userInfo.groups.filter(item => item.isDisplay);
      }
      if (groups.length > 0) {
        userInfo.groupsName = groups[0].name;
      } else {
        userInfo.groupsName = '';
      }
      this.setNum(userInfo);
      return userInfo;
    },
  },
  created() {
    this.$store.dispatch('jv/get', ['forum', { params: { include: 'users' } }]).then(forumRes => {
      if (forumRes && forumRes.set_reg) {
        this.site_mode = forumRes.set_site.site_mode;
      }
    });
    // #ifdef H5
    const { isWeixin } = appCommonH.isWeixin();
    this.isWeixin = isWeixin;
    // #endif
  },
  methods: {
    ...mapMutations({
      setFooterIndex: 'footerTab/SET_FOOTERINDEX',
    }),
    jumpUserPage() {
      uni.navigateTo({
        url: `/pages/profile/index?userId=${this.userId}`,
      });
    },
    changeCheck(e) {
      getApp().globalData.themeChanged(e ? THEME_DARK : THEME_DEFAULT);
    },
    onClickItem(e) {
      uni.navigateTo({
        url: `/pages/profile/index?current=${e.currentIndex}&userId=${this.userId}`,
      });
    },
    logout() {
      this.$refs.popup.open();
    },
    handleClickOk() {
      // #ifdef MP-WEIXIN
      this.$store.dispatch('session/logout').then(() => {
        uni.clearStorage();
        if (this.site_mode !== SITE_PAY) {
          this.setFooterIndex(parseInt(0, 10));
        }
        if (this.site_mode === SITE_PAY && this.user && !this.user.isPaid) {
          uni.redirectTo({
            url: '/pages/site/info',
          });
        }
      });
      // #endif
      // #ifdef H5
      this.$store.dispatch('session/logout').then(() => {
        this.handleClickCancel();
        window.location.reload();
      });
      // #endif
    },
    handleClickCancel() {
      this.$refs.popup.close();
    },
    // 设置粉丝点赞那些数字
    setNum(res) {
      this.items[0].brief = res.threadCount || 0;
      this.items[1].brief = res.questionCount || 0;
      this.items[2].brief = res.followCount || 0;
      this.items[3].brief = res.fansCount || 0;
      this.items[4].brief = res.likedCount || 0;
    },
    // 组件初始化数据
    ontrueGetList() {
      this.checked = this.theme !== THEME_DEFAULT;
    },
    // 获取最新主题数那些
    refreshNum() {
      const userId = this.$store.getters['session/get']('userId');
      const params = {
        include: 'groups,wechat',
      };
      this.$store.dispatch('jv/get', [`users/${userId}`, { params }]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.my-items__wrap {
  padding-left: 40rpx;
  margin-top: 30rpx;
  background: --color(--qui-BG-2);
  border-bottom: 2rpx solid --color(--qui-BOR-ED);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  border-bottom: none;
  /* #endif */
  transition: $switch-theme-time;
}
.scroll-y {
  padding-bottom: 30rpx;
  background: --color(--qui-BG-1);
}
.my-items {
  padding-bottom: 100rpx;
}
.my-info {
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  position: relative;
  height: 402rpx;
  /* #endif */
  /* #ifdef MP-WEIXIN-PLAY */
  height: 460rpx;
  /* #endif */
  padding: 40rpx;
  padding-top: 30rpx;
  font-size: $fg-f4;
  background-color: --color(--qui-BG-2);
  transition: $switch-theme-time;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  background: url(@/static/h5-play/mybackground.png) no-repeat;
  background-color: --color(--qui-BG-FFF);
  background-size: 100%;
  /* #endif */
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  .white_dishdish {
    position: absolute;
    top: 206rpx;
    left: 284rpx;
    width: 184rpx;
    height: 184rpx;
    background-color: --color(--qui-BG-FFF);
    border-radius: 50%;
  }
  /* #endif */
  /* #ifdef MP-WEIXIN-PLAY */
  .white_dishdish {
    top: 200rpx;
    left: 284rpx;
  }
  /* #endif */
}
/* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
.my-info__box {
  display: flex;
  justify-content: space-between;
}
/* #endif */
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.my-info__box {
  display: flex;
  height: 100%;
  padding-top: 190rpx;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
/* #endif */
/* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
.my-info__introduction {
  margin-top: 40rpx;
  color: --color(--qui-FC-333);
  word-break: break-all;
  transition: $switch-theme-time;
}
/* #endif */
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.my-info__introduction {
  // margin-top: 30rpx;
  overflow: hidden;
  font-family: 'PingFang SC';
  font-size: 24rpx;
  font-weight: 400;
  color: #999;
  text-align: center;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  transition: $switch-theme-time;
}
/* #endif */
.my-info__box__detail {
  /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: $fg-f4;
  box-sizing: border-box;
  /* #endif */
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* #endif */
}
.my-info__box__detail-username {
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  padding-right: 0 !important;
  padding-left: 20rpx;
  margin-top: 16rpx;
  /* #endif */
}
.my-tabs {
  background: --color(--qui-BG-2);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  background: #fff;
  /* #endif */
  transition: $switch-theme-time;
}
.logout {
  margin: 30rpx 30rpx 0;
  text-align: center;
  border-radius: 7rpx;
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
/deep/ .active {
  color: var(--qui-FC-333);
}
/deep/ .qui-tabs__item__title {
  color: --color(--qui-TAB-333);
}
/* #endif */
</style>
