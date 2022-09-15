<template>
  <view @touchmove.stop.prevent="">
    <!-- 下面的tabber那一栏 -->
    <view
      class="ft"
      :style="{
        paddingBottom: bottom + 'rpx',
      }"
    >
      <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
      <view
        :class="['ft-box', { active: index === footerIndex }, `ft-box${item.id}`]"
        v-for="(item, index) in tabs"
        :key="index"
        @click="select(item, index)"
      >
        <qui-icon
          class="ft-box-icon"
          :name="item.tabsIcon"
          :size="item.tabsIcon === 'icon-faxian' ? 38 : 36"
          :class="redCircle && item.id === 3 ? 'message' : ''"
        ></qui-icon>
        <view class="ft-box-content">{{ item.tabsName }}</view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <view
        :class="['ft-box', { active: index === footerIndex }, `ft-box${item.id}`]"
        v-for="(item, index) in tabs_pay"
        :key="index"
        @click="select(item, index)"
      >
        <image
          :src="index === footerIndex ? item.tabsIcon_2 : item.tabsIcon_1"
          :class="[`ft-box-ic_${index}`]"
        ></image>
        <view class="ft-box-content">{{ item.tabsName }}</view>
      </view>
      <!-- #endif -->
      <view class="ft-box-spacal">
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <image class="ft-box-spacal-icon" src="@/static/published.svg" @click="footerOpen"></image>
        <!-- #endif -->
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <view class="ft-box-spacal-icon-top">
          <image
            class="ft-box-spacal-icon"
            src="./../../static/h5-play/release@2x.png"
            @click="footer_Open"
          ></image>
        </view>
        <!-- #endif -->
      </view>
    </view>
    <!-- 下面的tabber那一栏结束 -->
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <uni-popup ref="popup" type="bottom">
      <view class="popup-share">
        <view
          class="popup-share-content"
          :class="bottomDataLength > 4 ? 'popup-share-content-inner' : ''"
        >
          <view v-for="(item, index) in bottomData" :key="index" class="popup-share-content-box">
            <view class="popup-share-content-image">
              <view class="popup-share-box" @click="handleClick(item)">
                <qui-icon class="content-image" :name="item.icon" size="56" color="#777"></qui-icon>
              </view>
            </view>
            <text class="popup-share-content-text">{{ item.text }}</text>
          </view>
        </view>
        <view class="popup-share-content-space"></view>
        <text class="popup-share-btn" @click="cancel('share')">
          {{ i18n.t('home.cancel') }}
        </text>
      </view>
    </uni-popup>
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <uni-popup ref="popup" type="bottom">
      <!-- 弹窗内容部分 -->
      <view class="popup-share" style="border-radius: 20rpx">
        <view
          class="popup-share-content"
          :class="bottomDataLength > 4 ? 'popup-share-content-inner' : ''"
          style="border-radius: 20rpx"
        >
          <view v-for="(item, index) in bottomData" :key="index" class="popup-share-content-box">
            <view class="popup-share-content-image">
              <view class="popup-share-box" @click="handleClick(item)">
                <view class="content-image-icon" :style="item.size">
                  <image :src="item.selected ? item.src_2 : item.src_1"></image>
                </view>
              </view>
            </view>
            <text
              class="popup-share-content-text"
              :style="item.selected ? 'color:#EA3D5A' : 'color:var(--qui-FC-333)'"
              style="font-weight: 400; font-size: 26rpx"
            >
              {{ item.text }}
            </text>
          </view>
        </view>
        <text class="popup-share-btn" @click="cancel('share')">
          {{ i18n.t('home.cancel') }}
        </text>
      </view>
      <!-- 弹窗内容部分结束 -->
    </uni-popup>
    <!-- #endif -->
    <!-- 跳转问答贴弹窗 -->
    <UniPopupQandA ref="clickOpenQandA" type="center">
      <view class="openOfQandA">
        <view class="openOfQandABox">
          <view class="rewardQuestion" @click="jumpToQandA(1)">悬赏提问</view>
          <view class="appointQuestion" @click="jumpToQandA(2)">向指定人提问</view>
          <view class="redLine"></view>
          <view class="redArc_box">
            <view class="redArc"></view>
          </view>
        </view>
      </view>
    </UniPopupQandA>
    <uni-popup ref="surePopup" type="center">
      <uni-popup-dialog
        type="warn"
        :content="sureTip"
        :before-close="true"
        @close="handleClickCancel"
        @confirm="handleClickOk"
      ></uni-popup-dialog>
    </uni-popup>
    <qui-toast ref="toast"></qui-toast>
    <!-- #ifdef MP-WEIXIN -->
    <uni-popup ref="authPhone" type="bottom">
      <qui-auth-phone @closeDialog="closeDialog"></qui-auth-phone>
    </uni-popup>
    <!-- #endif -->
    <view v-show="false">
      <qui-uploader
        :url="`${url}api/attachments`"
        :form-data="formData"
        name="file"
        :async-clear="true"
        ref="upload"
        :count="uploadImgMax"
        :choose-type="0"
        @uploadClick="uploadClick"
      ></qui-uploader>
      <qui-upload-video
        ref="uploadVideo"
        :url="url"
        @uploadVideo="uploadVideo"
        :choose-type="0"
      ></qui-upload-video>
    </view>
  </view>
</template>
<script>
import forums from '@/mixin/forums';
import user from '@/mixin/user';
import { mapState, mapMutations } from 'vuex';
import loginModule from '@/mixin/loginModule';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';
import { DISCUZ_REQUEST_HOST } from '@/common/const';
// #ifdef H5
import appCommonH from '@/utils/commonHelper';
// #endif
import UniPopupQandA from '@/components/uni-popup/uni-popup-QandA';
// let uploadCountLoop = null;

export default {
  components: {
    uniPopupDialog,
    UniPopupQandA,
  },
  mixins: [
    forums,
    user,
    loginModule,
    // #ifdef H5
    appCommonH,
    // #endif
  ],
  props: {
    bottom: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      sel: 1,
      type: '',
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      tabs_pay: [
        {
          tabsName: 'home.tabsCircle',
          tabsIcon_1: './../../static/h5-play/Home_1@2x.png',
          tabsIcon_2: './../../static/h5-play/Home_2@2x.png',
          id: 1,
          url: '/pages/home/index',
        },
        {
          tabsName: 'home.find',
          tabsIcon_1: './../../static/h5-play/found_1@2x.png',
          tabsIcon_2: './../../static/h5-play/found_2@2x.png',
          id: 2,
          url: '/pages/find/index',
        },
        {
          tabsName: 'home.tabsNews',
          tabsIcon_1: './../../static/h5-play/message_1@2x.png',
          tabsIcon_2: './../../static/h5-play/message_2@2x.png',
          id: 3,
          url: '/pages/notice/index',
          // routePath: 'pages/notice/index', // 仅用作标识不用来跳转
        },
        {
          tabsName: 'home.tabsMy',
          tabsIcon_1: './../../static/h5-play/my_1@2x.png',
          tabsIcon_2: './../../static/h5-play/my_2@2x.png',
          id: 4,
          url: '/pages/my/index',
          // routePath: 'pages/my/index', // 仅用作标识不用来跳转
        },
      ],
      // #endif
      // #ifndef H5-PLAY || MP-WEIXIN-PLAY
      tabs: [
        {
          tabsName: 'home.tabsCircle',
          tabsIcon: 'icon-home',
          id: 1,
          url: '/pages/home/index',
          // routePath: 'pages/home/index', // 仅用作标识不用来跳转
        },
        {
          tabsName: 'home.find',
          tabsIcon: 'icon-faxian',
          id: 2,
          url: '/pages/find/index',
        },
        {
          tabsName: 'home.tabsNews',
          tabsIcon: 'icon-message',
          id: 3,
          url: '/pages/notice/index',
          // routePath: 'pages/notice/index', // 仅用作标识不用来跳转
        },
        {
          tabsName: 'home.tabsMy',
          tabsIcon: 'icon-mine',
          id: 4,
          url: '/pages/my/index',
          // routePath: 'pages/my/index', // 仅用作标识不用来跳转
        },
      ],
      // #endif
      bottomData: [],
      bottomDataLength: 0,
      isTabBar: [0], // 禁止页面第二次加载
      sureType: '', // 二次确认类型
      sureTip: '', // 二次确认提示

      url: '', // 视频url
      formData: {}, // 图片请求data
      uploadStatus: true,
      isWeixin: '', // 是否是微信浏览器内
      isiOS: '',
      uploadImgMax: 9, // 首页上传图片时限制最大数量
    };
  },
  computed: {
    ...mapState({
      getCategoryId: state => state.session.categoryId,
      getCategoryIndex: state => state.session.categoryIndex,
      footerIndex: state =>
        state.footerTab.footerIndex ? parseInt(state.footerTab.footerIndex, 10) : 0,
      categories: state => state.categories.categories,
    }),
    redCircle() {
      return this.user.unreadNotifications;
    },
  },
  created() {
    const len = getCurrentPages().length;
    if (len > 0) {
      // #ifdef MP-WEIXIN
      const currentRout = getCurrentPages()[len - 1].is;
      const str = currentRout && currentRout.split('pages/')[1];
      // #ifndef MP-WEIXIN-PLAY
      if (str) {
        this.tabs = this.tabs.map(tab => {
          const tabsName = this.i18n.t(tab.tabsName);
          if (tab.url && tab.url.includes(str)) {
            this.sel = tab.id;
          }
          const newTab = { ...tab, tabsName };
          return newTab;
        });
      }
      // #endif
      // #ifdef MP-WEIXIN-PLAY
      if (str) {
        this.tabs_pay = this.tabs_pay.map(tab => {
          const tabsName = this.i18n.t(tab.tabsName);
          if (tab.url && tab.url.includes(str)) {
            this.sel = tab.id;
          }
          const newTab = { ...tab, tabsName };
          return newTab;
        });
      }
      // #endif
      // #endif
      // #ifdef H5
      const currentRouts = getCurrentPages()[len - 1].route;
      const strs = currentRouts && currentRouts.split('pages/')[1];

      // #ifndef H5-PLAY
      if (strs) {
        this.tabs = this.tabs.map(tab => {
          const tabsName = this.i18n.t(tab.tabsName);
          if (tab.url && tab.url.includes(strs)) {
            this.sel = tab.id;
          }
          const newTab = { ...tab, tabsName };
          return newTab;
        });
      }
      // #endif
      // #ifdef H5-PLAY
      if (strs) {
        this.tabs_pay = this.tabs_pay.map(tab => {
          const tabsName = this.i18n.t(tab.tabsName);
          if (tab.url && tab.url.includes(strs)) {
            this.sel = tab.id;
          }
          const newTab = { ...tab, tabsName };
          return newTab;
        });
      }
      // #endif
      this.isWeixin = appCommonH.isWeixin().isWeixin;
      this.isiOS = appCommonH.isWeixin().isiOS;
      // #endif
    }
    // 上传图片
    this.url = DISCUZ_REQUEST_HOST;
    this.formData = {
      type: 1,
    };

    // 图片上传事件注册
    /*
    选择图片发帖导致的多次跳转原因如下：
    在点击图片发帖时重复绑定事件，导致多次点击后会出现多次事件触发
    在点击图片发帖时重复添加定时器，导致多次跳转发生
    解决：
    将事件注册上升到生命周期created中注册
    移除定时器
    */
    let uploadData = [];
    // let errorStatus = false;
    let errorCount = 0;
    let chooseLength = 1;
    uni.$off('uploadLength');
    uni.$on('uploadLength', data => {
      chooseLength = data;
    });
    uni.$off('uploadFail');
    uni.$on('uploadFail', () => {
      errorCount += 1;
    });
    let uploadDataLength = 0;
    uni.$off('uploadOver');
    uni.$on('uploadOver', data => {
      let url;
      uni.showLoading({
        title: this.i18n.t('core.loading'),
        mask: true,
      });
      if (this.footerIndex === 0) {
        url = `/topic/post?type=3&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`;
      } else {
        url = `/topic/post?type=3`;
      }
      uploadData.push(data.data);
      uploadData.map((val, key) => {
        if (val.data.attributes.order > this.uploadImgMax) {
          uploadData.splice(key, 1);
        }
        return uploadData;
      });
      uploadDataLength = data.times;

      if (uploadDataLength + errorCount >= chooseLength) {
        uni.navigateTo({
          url,
          success: res => {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit(
              'acceptDataFromOpenerPage',
              uploadData.sort(this.compare('order')),
            );
            errorCount = 0;
            chooseLength = 1;
            uploadData = [];
          },
        });
      }
    });
  },
  destroyed() {
    uni.$off('uploadOver');
    uni.$off('uploadLength');
    uni.$off('uploadFail');
    uni.$off('uploadVideoOver');
  },
  methods: {
    select(item, index) {
      if (this.$store.getters['session/get']('isLogin')) {
        this.setFooterIndex(parseInt(index, 10));
      }
      this.$emit('click', item, index, this.isTabBar);
      this.sel = item.id;
    },
    ...mapMutations({
      setFooterIndex: 'footerTab/SET_FOOTERINDEX',
      // 这个文件里面是这样写的：   const SET_FOOTERINDEX = 'SET_FOOTERINDEX'
    }),
    // 首页底部发帖按钮弹窗
    // #ifndef H5-PLAY || MP-WEIXIN-PLAY
    async footerOpen() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: '/pages/home/index',
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }

      if (this.forums.other.publish_need_real_name) {
        this.sureTip = this.i18n.t('home.needRealname');
        this.$refs.surePopup.open();
        this.sureType = '0';
        return;
      }
      if (this.forums.other.publish_need_bind_phone) {
        this.sureTip = this.i18n.t('home.needPhone');
        this.$refs.surePopup.open();
        this.sureType = '1';
        return;
      }
      if (!this.forums.other.can_create_thread_in_category) {
        this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
        return;
      }

      // if (this.getCategoryId) {
      //   const category = this.$store.getters['jv/get'](`categories/${this.getCategoryId}`);
      //   if (!category.canCreateThread) {
      //     this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
      //   }
      // }
      if (this.getCategoryId) {
        if (this.getCategoryId === -1) {
          const category = this.categories.find(targetCategory => targetCategory.pid === -1) || {};
          if (!category.canCreateThread && this.getCategoryId !== -1) {
            this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
          }
        } else {
          const category =
            this.categories.find(targetCategory => {
              return targetCategory.pid === Number(`${this.getCategoryId}`);
            }) || {};

          if (!category.canCreateThread && this.getCategoryId !== -1) {
            this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
          }
        }
      }

      if (
        !this.forums.other.can_create_thread &&
        !this.forums.other.can_create_thread_long &&
        !this.forums.other.can_create_thread_video &&
        !this.forums.other.can_create_thread_image &&
        !this.forums.other.can_create_thread_question &&
        !this.forums.other.can_create_thread_audio &&
        !this.forums.other.can_create_thread_goods
      ) {
        this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
        return;
      }
      this.bottomData = [];
      if (this.forums.other.can_create_thread) {
        this.bottomData.push({
          text: this.i18n.t('home.word'),
          icon: 'icon-word',
          name: 'text',
          type: 0,
        });
      }
      if (this.forums.other.can_create_thread_long) {
        this.bottomData.push({
          text: this.i18n.t('home.invitation'),
          icon: 'icon-post',
          name: 'post',
          type: 1,
        });
      }
      if (this.forums.other.can_create_thread_image) {
        this.bottomData.push({
          text: this.i18n.t('home.picture'),
          icon: 'icon-img',
          name: 'image',
          type: 3,
        });
      }
      if (this.forums.other.can_create_thread_audio) {
        this.bottomData.push({
          text: this.i18n.t('home.audio'),
          icon: 'icon-record',
          name: 'audio',
          type: 4,
        });
      }
      if (this.forums.other.can_create_thread_video) {
        this.bottomData.push({
          text: this.i18n.t('home.video'),
          icon: 'icon-video',
          name: 'video',
          type: 2,
        });
      }
      // #ifdef H5 || H5-PLAY
      if (this.forums.other.can_create_thread_goods) {
        this.bottomData.push({
          text: this.i18n.t('home.good'),
          icon: 'icon-good',
          name: 'good',
          type: 6,
        });
      }
      // #endif
      if (this.forums.other.can_create_thread_question) {
        this.bottomData.push({
          text: this.i18n.t('home.questions'),
          icon: 'icon-question',
          name: 'questions',
          type: 5,
        });
      }
      this.bottomDataLength = this.bottomData.length;

      this.$refs.popup.open();
    },
    // #endif
    // #ifdef H5-PLAY || MP-WEIXIN-PLAY
    footer_Open() {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: '/pages/home/index',
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      if (this.forums.other.publish_need_real_name) {
        this.sureTip = this.i18n.t('home.needRealname');
        this.$refs.surePopup.open();
        this.sureType = '0';
        return;
      }
      if (this.forums.other.publish_need_bind_phone) {
        this.sureTip = this.i18n.t('home.needPhone');
        this.$refs.surePopup.open();
        this.sureType = '1';
        return;
      }
      if (!this.forums.other.can_create_thread_in_category) {
        this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
        return;
      }
      if (this.getCategoryId) {
        if (this.getCategoryId === -1) {
          const category =
            this.categories.find(targetCategory => {
              return targetCategory.pid === -1;
            }) || {};
          if (!category.canCreateThread && this.getCategoryId !== -1) {
            this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
          }
        } else {
          const category =
            this.categories.find(targetCategory => {
              return targetCategory.pid === Number(`${this.getCategoryId}`);
            }) || {};
          if (!category.canCreateThread && this.getCategoryId !== -1) {
            this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
          }
        }
      }

      if (
        !this.forums.other.can_create_thread &&
        !this.forums.other.can_create_thread_long &&
        !this.forums.other.can_create_thread_video &&
        !this.forums.other.can_create_thread_image &&
        !this.forums.other.can_create_thread_question &&
        !this.forums.other.can_create_thread_audio &&
        !this.forums.other.can_create_thread_goods
      ) {
        this.$refs.toast.show({ message: this.i18n.t('home.noPostingPermission') });
        return;
      }
      this.bottomData = [];
      if (this.forums.other.can_create_thread) {
        this.bottomData.push({
          text: this.i18n.t('home.word'),
          icon: 'icon-word',
          src_1: './../../static/h5-play/text_1@2x.png',
          src_2: './../../static/h5-play/text_2@2x.png',
          name: 'text',
          type: 0,
          selected: false,
          size: 'width: 54rpx;height: 54rpx;',
        });
      }
      if (this.forums.other.can_create_thread_long) {
        this.bottomData.push({
          text: this.i18n.t('home.invitation'),
          icon: 'icon-post',
          src_1: './../../static/h5-play/post_1@2x.png',
          src_2: './../../static/h5-play/post_2@2x.png',
          name: 'post',
          type: 1,
          selected: false,
          size: 'width: 48rpx;height: 54rpx;',
        });
      }
      if (this.forums.other.can_create_thread_image) {
        this.bottomData.push({
          text: this.i18n.t('home.picture'),
          icon: 'icon-img',
          src_1: './../../static/h5-play/picture_1@2x.png',
          src_2: './../../static/h5-play/picture_2@2x.png',
          name: 'image',
          type: 3,
          selected: false,
          size: 'width: 48rpx;height: 50rpx;',
        });
      }
      if (this.forums.other.can_create_thread_audio) {
        this.bottomData.push({
          text: this.i18n.t('home.audio'),
          icon: 'icon-record',
          src_1: './../../static/h5-play/voice_1@2x.png',
          src_2: './../../static/h5-play/voice_2@2x.png',
          name: 'audio',
          type: 4,
          selected: false,
          size: 'width: 36rpx;height: 54rpx;',
        });
      }
      if (this.forums.other.can_create_thread_goods) {
        this.bottomData.push({
          text: this.i18n.t('home.good'),
          icon: 'icon-good',
          src_1: './../../static/h5-play/commodity_1@2x.png',
          src_2: './../../static/h5-play/commodity_2@2x.png',
          name: 'good',
          type: 6,
          selected: false,
          size: 'width: 48rpx;height: 50rpx;',
        });
      }
      if (this.forums.other.can_create_thread_question) {
        this.bottomData.push({
          text: this.i18n.t('home.questions'),
          icon: 'icon-question',
          src_1: './../../static/h5-play/QandA_1@2x.png',
          src_2: './../../static/h5-play/QandA_2@2x.png',
          name: 'questions',
          type: 5,
          selected: false,
          size: 'width: 54rpx;height: 54rpx;',
        });
      }
      if (this.forums.other.can_create_thread_video) {
        this.bottomData.push({
          text: this.i18n.t('home.video'),
          icon: 'icon-video',
          src_1: './../../static/h5-play/video_1@2x.png',
          src_2: './../../static/h5-play/video_2@2x.png',
          name: 'video',
          type: 2,
          selected: false,
          size: 'width: 60rpx;height: 46rpx;',
        });
      }
      // 增加专辑帖选项
      // if (true) {
      //   this.bottomData.push({
      //     text: this.i18n.t('home.album'),
      //     icon: 'icon-question',
      //     src_1: './../../static/h5-play/collection_1@2x.png',
      //     src_2: './../../static/h5-play/collection_2@2x.png',
      //     name: 'album',
      //     type: 7,
      //     selected: false,
      //     size: 'width: 44rpx;height: 54rpx;',
      //   });
      // }

      this.bottomDataLength = this.bottomData.length;

      this.$refs.popup.open();
    },
    // #endif
    // 问答弹窗跳转
    async jumpToQandA(type) {
      if (type === 1) {
        // alert("跳转悬赏提问");
        uni.navigateTo({
          url: `/pagesplay_web/reward-to-ask?type=5&name=select&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`,
        });
      }
      if (type === 2) {
        uni.navigateTo({
          url: `/pages/user/at-member?name=select&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`,
        });
      }
      this.closeHomemAsk();
    },
    // 排序
    compare(property) {
      return (a, b) => {
        const value1 = a.data.attributes[property];
        const value2 = b.data.attributes[property];
        // return value1 - value2;
        if (value1 > value2) {
          return 1;
        }
        if (value1 < value2) {
          return -1;
        }
        return 0;
      };
    },
    // 页面跳转关闭弹窗和清除tabbar变色
    closeHomemAsk() {
      this.bottomData.forEach((i, index) => {
        const bottomDataJosn = JSON.parse(JSON.stringify(i));
        bottomDataJosn.selected = false;
        this.bottomData.splice(index, 1, bottomDataJosn);
      });
      this.$refs.clickOpenQandA.close();
      this.$refs.popup.close();
    },
    // 首页底部发帖点击事件跳转
    handleClick(item) {
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      this.bottomData.forEach((i, index) => {
        const bottomDataJosn = JSON.parse(JSON.stringify(i));
        if (bottomDataJosn.type === item.type) {
          bottomDataJosn.selected = true;
        } else {
          bottomDataJosn.selected = false;
        }
        this.bottomData.splice(index, 1, bottomDataJosn);
      });
      // #endif
      let url;
      if (item.type === 6) {
        uni.navigateTo({
          url: `/pages/topic/parse-goods?type=${item.type}`,
        });
        this.$refs.popup.close();
        return;
      }

      if (this.isWeixin && this.isiOS && item.type === 4) {
        this.$refs.toast.show({ message: this.i18n.t('discuzq.post.IOSWxNotRecordAudio') });
        return;
      }
      if (item.type === 5) {
        this.$refs.clickOpenQandA.open();
        // this.$refs.popup.close();
        return;
      }
      // 锚点
      if (this.footerIndex === 0) {
        url = `/topic/post?type=${item.type}&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`;
      }
      if (item.type === 3) {
        if (!this.forums.other.can_upload_images) {
          this.$refs.toast.show({ message: this.i18n.t('home.NoPermissionToUploadPictures') });
          return;
        }
        // 当选择图片帖时
        this.$nextTick(() => {
          this.$refs.upload.uploadClick();
        });
        // const uploadData = [];
        // // let errorStatus = false;
        // let errorCount = 0;
        // let chooseLength = 1;
        // uni.$on('uploadLength', data => {
        //   chooseLength = data;
        // });
        // uni.$on('uploadFail', data => {
        //   console.log(data);
        //   errorCount += 1;
        // });
        // let uploadDataLength = 0;
        // uni.$on('uploadOver', data => {
        //   uni.showLoading({
        //     title: this.i18n.t('core.loading'),
        //     mask: true,
        //   });
        //   if (this.footerIndex === 0) {
        //     url = `/topic/post?type=${item.type}&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`;
        //   } else {
        //     url = `/topic/post?type=${item.type}`;
        //   }
        //   uploadData.push(data.data);
        //   console.log(data, uploadData, '长度');
        //   uploadData.map((val, key) => {
        //     if (val.data.attributes.order > this.uploadImgMax) {
        //       uploadData.splice(key, 1);
        //     }
        //     return uploadData;
        //   });
        //   uploadDataLength = data.times;
        // });

        // uploadCountLoop = setInterval(() => {
        //   const sum = uploadDataLength + errorCount;
        //   if (sum >= chooseLength) {
        //     // console.log(uploadData.sort(this.compare('order')), '--------');
        //     uni.navigateTo({
        //       url,
        //       success: res => {
        //         // 通过eventChannel向被打开页面传送数据
        //         res.eventChannel.emit(
        //           'acceptDataFromOpenerPage',
        //           uploadData.sort(this.compare('order')),
        //         );
        //       },
        //     });
        //     clearInterval(uploadCountLoop);
        //   }
        // }, 1000);
        this.cancel();
      } else if (item.type === 2) {
        // 当选择视屏帖时
        this.$nextTick(() => {
          this.$refs.uploadVideo.uploadVideo();
        });
        uni.$off('uploadVideoOver');
        uni.$on('uploadVideoOver', data => {
          if (this.footerIndex === 0) {
            url = `/topic/post?type=${item.type}&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`;
          } else {
            url = `/topic/post?type=${item.type}`;
          }
          uni.navigateTo({
            url,
            success: res => {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', {
                data,
              });
            },
          });
          this.cancel();
        });
      } else {
        if (this.footerIndex === 0) {
          url = `/topic/post?type=${item.type}&categoryId=${this.getCategoryId}&categoryIndex=${this.getCategoryIndex}`;
        } else {
          url = `/topic/post?type=${item.type}`;
        }
        uni.navigateTo({
          url,
        });
        this.cancel();
      }
    },

    // 取消按钮
    cancel() {
      this.$refs.popup.close();
    },
    close() {
      this.$refs.auth.close();
    },
    handleClickOk() {
      this.$refs.surePopup.close();
      if (this.sureType === '0') {
        uni.navigateTo({
          url: `/pages/modify/realname?id=${this.user.id}`,
        });
      } else if (this.sureType === '1') {
        // #ifdef MP-WEIXIN
        if (this.user && this.user.mobile === '') {
          this.$refs.authPhone.open();
        }
        // #endif
        // #ifdef H5
        // 删除类型为主题评论
        uni.navigateTo({
          url: `/pages/modify/setphon?id=${this.user.id}`,
        });
        // #endif
      }
    },
    handleClickCancel() {
      this.$refs.surePopup.close();
    },
    // #ifdef MP-WEIXIN
    closeDialog() {
      this.$refs.authPhone.close();
    },
    // #endif
  },
};
</script>
<style lang="scss">
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
/* #ifdef H5 */
$top: -6rpx;
/* #endif */

/* #ifdef MP-WEIXIN */
$top: -9rpx;
/* #endif */
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.popup-share-box {
  background: --color(--qui-BG-2);
}
.content-image-icon {
  width: 54rpx;
  height: 54rpx;
  margin-top: 52rpx;
  margin-left: 36rpx;
  line-height: 54rpx;
  text-align: center;
}
.content-image-icon > image {
  width: auto;
  width: 100%;
  height: auto;
  height: 100%;
}
.ft-box-ic_0 {
  width: 40rpx;
  height: 40rpx;
}
.ft-box-ic_1 {
  width: 40rpx;
  height: 40rpx;
}
.ft-box-ic_2 {
  width: 42rpx;
  height: 30rpx;
  margin: 5rpx 0;
}
.ft-box-ic_3 {
  width: 36rpx;
  height: 40rpx;
}
.popup-share-btn {
  height: 136rpx;
  font-weight: 400;
  background: var(--qui-BG-BTN-GRAY-1);
}
// .redArc {
//   background: #ea3d5a;
//   width: calc(100% + 10rpx);
//   height: 142rpx;
//   border-radius: calc(100% - 0rpx);
// }
/* #endif */
//悬赏跳转弹窗样式
.openOfQandA {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -10;
  display: flex;
  width: 560rpx;
  height: 300rpx;
  // background: --color(--qui-BG-2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  transform: translate(-50%, -89%);
}
.openOfQandABox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rewardQuestion,
.appointQuestion {
  width: 440rpx;
  height: 86rpx;
  // background: #ea3d5a;
  margin: 20rpx;
  font-size: 30rpx;
  line-height: 86rpx;
  color: #fff;
  text-align: center;
  border-radius: 10rpx;
}
.rewardQuestion {
  background-image: url(./../../static/h5-play/home_send_bg_1@2x.png);
  background-size: 440rpx 86rpx;
}
.appointQuestion {
  margin-bottom: 0;
  background-image: url(./../../static/h5-play/home_send_bg_2@2x.png);
  background-size: 440rpx 86rpx;
}
.redLine {
  width: 1rpx;
  height: 200rpx;
  background: #ea3d5a;
  border: 1rpx solid #ea3d5a;
}
.redArc_box {
  width: calc(100% + 210rpx);
  height: 40rpx;
  overflow: hidden;
}
.ft {
  // position: absolute;
  position: fixed;
  bottom: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  // height: 100rpx;
  background-color: --color(--qui-BG-2);
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.05);
}
.ft-box {
  position: relative;
  width: 20%;
  height: 100rpx;
  padding-top: 15rpx;
  font-size: $fg-f3;
  text-align: center;
  box-sizing: border-box;
}
.ft-box3 {
  margin-left: 150rpx;
}
.ft-box-content {
  color: --color(--qui-FC-777);
}
.ft-box-spacal {
  position: absolute;
  top: -5rpx;
  left: 50%;
  width: 105rpx;
  height: 105rpx;
  margin-left: -52rpx;
  -webkit-text-size-adjust: none;
  border-radius: 50%;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.05);
}
.ft-box-spacal-icon {
  position: relative;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  top: -30rpx;
  left: -32rpx;
  /* #endif */
  width: 89rpx;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  width: 132rpx;
  /* #endif */
  height: 89rpx;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  height: 108rpx;
  /* #endif */
  margin: 8rpx 0 0 8rpx;
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.ft-box-spacal-icon-box {
  position: relative;
  /* #ifdef MP-WEIXIN-PLAY */
  top: 2rpx;
  left: -3rpx;
  /* #endif */
  width: 84rpx;
  /* #ifdef MP-WEIXIN-PLAY */
  width: 94rpx;
  /* #endif */
  height: 84rpx;
  /* #ifdef MP-WEIXIN-PLAY */
  height: 94rpx;
  /* #endif */
  border-radius: 50%;
}
.ft-box-spacal-icon-top {
  position: relative;
  top: -34rpx;
  left: -8rpx;
  width: 84rpx;
  /* #ifdef MP-WEIXIN-PLAY */
  width: 132rpx;
  /* #endif */
  height: 84rpx;
  /* #ifdef MP-WEIXIN-PLAY */
  height: 132rpx;
  /* #endif */
  background: var(--qui-BG-2);
  border: 24rpx solid var(--qui-BG-2);
  border-radius: 50%;
}
/* #endif */
.ft-box.active,
.ft-box.active .ft-box-content {
  font-weight: bold;
  color: --color(--qui-TAB);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  color: #ea3d5a;
  /* #endif */
}
.message {
  position: relative;
}
.message:after {
  position: absolute;
  top: $top;
  right: -6rpx;
  width: 10rpx;
  height: 10rpx;
  background: --color(--qui-RED);
  border-radius: 50%;
  content: '';
}
.popup-share-content-inner {
  height: auto;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  padding-top: 0;
  /* #endif */
  overflow: hidden;
  justify-content: flex-start;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  background: var(--qui-BG-2);
  /* #endif */
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.popup-share-content {
  background: var(--qui-BG-2);
}
/* #endif */
.popup-share-content-inner .popup-share-content-box {
  margin-bottom: 40rpx;
  flex: 0 0 25%;
}
</style>
