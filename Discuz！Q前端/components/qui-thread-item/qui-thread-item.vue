<template>
  <view class="thread">
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <qui-content
      :ref="'thread-' + currentindex"
      :item="threadData"
      :currentindex="currentindex"
      :pay-status="(threadData.price > 0 && threadData.paid) || threadData.price == 0"
      :user-name="threadData.user ? threadData.user.username : ''"
      :theme-image="threadData.user ? threadData.user.avatarUrl : ''"
      :post-goods="threadData.firstPost.postGoods ? threadData.firstPost.postGoods : ''"
      :is-real="threadData.user ? threadData.user.isReal : false"
      :theme-btn="threadData.canHide || ''"
      :theme-reply-btn="threadData.canReply || ''"
      :user-groups="handleGroup(threadData.user && threadData.user.groups)"
      :user-answer-groups="
        handleGroup(
          threadData.question && threadData.question.beUser
            ? threadData.question.beUser.groups
            : [],
        )
      "
      :answer-image="
        threadData.question && threadData.question.beUser
          ? threadData.question.beUser.avatarUrl
          : ''
      "
      :theme-time-answer="threadData.question && threadData.question.answered_at"
      :theme-time="threadData.createdAt"
      :theme-content="threadData.type == 1 ? threadData.title : threadData.firstPost.summary"
      :thread-type="threadData.type"
      :them-pay-btn="threadData.price > 0 || thread.attachmentPrice > 0"
      :media-url="threadData.threadVideo && threadData.threadVideo.media_url"
      :is-great="threadData.firstPost.isLiked"
      :theme-like="threadData.firstPost.likeCount"
      :theme-comment="threadData.postCount - 1"
      :tags="[threadData.category]"
      :images-list="threadData.firstPost.images"
      :theme-essence="threadData.isEssence"
      :video-width="threadData.threadVideo && threadData.threadVideo.width"
      :video-height="threadData.threadVideo && threadData.threadVideo.height"
      :video-id="threadData.threadVideo && threadData.threadVideo._jv.id"
      :cover-image="threadData.threadVideo && threadData.threadVideo.cover_url"
      :duration="threadData.threadVideo && threadData.threadVideo.duration"
      :is-deleted="threadData.isDeleted"
      :questions-name="threadData.user.username"
      :be-ask-name="
        threadData.question && threadData.question.beUser ? threadData.question.beUser.username : ''
      "
      :question-content="threadData.question && threadData.question.content"
      :add-ask="threadData.question && threadData.question.is_answer"
      :onlooker-number="threadData.question && threadData.question.onlooker_number"
      :free-ask="threadData.question && threadData.question.price == 0"
      :ask-price="threadData.question && threadData.question.price"
      :ask-content="threadData.question && threadData.question.content"
      :onlooker-unit-price="threadData.question && threadData.question.onlooker_unit_price"
      :on-looker="threadData.question && threadData.question.onlooker_unit_price == 0"
      :thread-position="
        threadData.location
          ? [threadData.location, threadData.address, threadData.longitude, threadData.latitude]
          : []
      "
      :thread-audio="
        threadData.threadAudio || (threadData && threadData.extension && threadData.extension.video)
      "
      :is-new-interface="!!(threadData && threadData.extension && threadData.extension.video)"
      :bottomicon="bottomicon"
      @click="handleClickShare(threadData._jv.id)"
      @handleIsGreat="
        handleIsGreat(
          threadData.firstPost._jv.id,
          threadData.firstPost.canLike,
          threadData.firstPost.isLiked,
          currentindex,
        )
      "
      @commentClick="commentClick(threadData._jv.id)"
      @answeClick="answeClick(threadData.user._jv.id)"
      @beAskClick="beAskClick(threadData.question.beUser.id)"
      @contentClick="contentClick(threadData._jv.id)"
      @backgroundClick="contentClick(threadData._jv.id)"
      @headClick="headClick(threadData.user._jv.id)"
      @videoPlay="handleVideoPlay"
    ></qui-content>
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <qui-content
      :ref="'thread-' + currentindex"
      :item="threadData"
      :currentindex="currentindex"
      :pay-status="(threadData.price > 0 && threadData.paid) || threadData.price == 0"
      :user-name="threadData.user ? threadData.user.username : ''"
      :theme-image="threadData.user ? threadData.user.avatarUrl : ''"
      :post-goods="threadData.firstPost.postGoods ? threadData.firstPost.postGoods : ''"
      :is-real="threadData.user ? threadData.user.isReal : false"
      :theme-btn="threadData.canHide || ''"
      :theme-reply-btn="threadData.canReply || ''"
      :user-groups="handleGroup(threadData.user && threadData.user.groups)"
      :user-answer-groups="
        handleGroup(
          threadData.question && threadData.question.beUser
            ? threadData.question.beUser.groups
            : [],
        )
      "
      :answer-image="
        threadData.question && threadData.question.beUser
          ? threadData.question.beUser.avatarUrl
          : ''
      "
      :theme-time-answer="threadData.question && threadData.question.answered_at"
      :theme-time="threadData.createdAt"
      :theme-content="threadData.type == 1 ? threadData.title : threadData.firstPost.summary"
      :thread-type="threadData.type"
      :them-pay-btn="threadData.price > 0 || threadData.attachmentPrice > 0"
      :media-url="threadData.threadVideo && threadData.threadVideo.media_url"
      :is-great="threadData.firstPost.isLiked"
      :theme-like="threadData.firstPost.likeCount"
      :theme-comment="threadData.postCount - 1"
      :tags="[threadData.category]"
      :images-list="threadData.firstPost.images"
      :theme-essence="threadData.isEssence"
      :video-width="threadData.threadVideo && threadData.threadVideo.width"
      :video-height="threadData.threadVideo && threadData.threadVideo.height"
      :video-id="threadData.threadVideo && threadData.threadVideo._jv.id"
      :cover-image="threadData.threadVideo && threadData.threadVideo.cover_url"
      :duration="threadData.threadVideo && threadData.threadVideo.duration"
      :is-deleted="threadData.isDeleted"
      :questions-name="threadData.user.username"
      :be-ask-name="
        threadData.question && threadData.question.beUser ? threadData.question.beUser.username : ''
      "
      :question-content="threadData.question && threadData.question.content"
      :add-ask="threadData.question && threadData.question.is_answer"
      :onlooker-number="threadData.question && threadData.question.onlooker_number"
      :free-ask="threadData.question && threadData.question.price == 0"
      :ask-price="threadData.question && threadData.question.price"
      :ask-content="thread.question && threadData.question.content"
      :onlooker-unit-price="threadData.question && threadData.question.onlooker_unit_price"
      :on-looker="threadData.question && threadData.question.onlooker_unit_price == 0"
      :thread-position="
        threadData.location
          ? [threadData.location, threadData.address, threadData.longitude, threadData.latitude]
          : []
      "
      :thread-audio="
        threadData.threadAudio || (threadData && threadData.extension && threadData.extension.video)
      "
      :is-new-interface="!!(threadData && threadData.extension && threadData.extension.video)"
      :bottomicon="bottomicon"
      @click="handleClickShare(threadData._jv.id)"
      @handleIsGreat="
        handleIsGreat(
          threadData.firstPost._jv.id,
          threadData.firstPost.canLike,
          threadData.firstPost.isLiked,
          currentindex,
        )
      "
      @commentClick="commentClick(threadData._jv.id)"
      @answeClick="answeClick(threadData.user._jv.id)"
      @beAskClick="beAskClick(threadData.question.beUser.id)"
      @contentClick="contentClick(threadData._jv.id)"
      @backgroundClick="contentClick(threadData._jv.id)"
      @headClick="headClick(threadData.user._jv.id)"
      @videoPlay="handleVideoPlay"
    ></qui-content>
    <!-- #endif -->
    <uni-popup ref="popupContent" type="bottom">
      <qui-share @close="cancel" share-type="content" :now-thread-id="nowThreadId"></qui-share>
    </uni-popup>
  </view>
</template>

<script>
// #ifdef H5
import wxshare from '@/mixin/wxshare-h5';
// #endif
import forums from '@/mixin/forums';
import loginModule from '@/mixin/loginModule';
import { getCurUrl } from '@/utils/getCurUrl';
import apiRequest from '../../api/new-api';

export default {
  mixins: [
    forums,
    loginModule,
    // #ifdef H5
    wxshare,
    // #endif
  ],
  props: {
    thread: {
      type: Object,
      default: () => {
        return {};
      },
    },
    conversationId: {
      type: [Number, String],
      default: '',
    },
    currentindex: {
      type: [Number, String],
      default: '0',
    },
    bottomicon: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      threadData: {},
      isLiked: false, // 主题点赞状态
      shareShow: false, // h5内分享提示信息
      shareTitle: '', // h5内分享复制链接
      shareBtn: 'icon-share1',
      playIndex: null,
      nowThreadId: '',
      tabIndex: 0, // 选中标签栏的序列,默认显示第一个
    };
  },
  created() {
    this.threadData = this.thread;
  },
  methods: {
    // 内容部分点击跳转到详情页
    contentClick(id) {
      if (this.threadData.isDraft) return;
      this.$emit('toTopic', id);
      uni.navigateTo({
        url: `/topic/index?id=${id}&topicid=${this.conversationId}`,
      });
    },
    // 点击头像调转到个人主页
    headClick(id) {
      if (id <= 0) {
        return;
      }
      uni.navigateTo({
        url: `/pages/profile/index?userId=${id}`,
      });
    },
    // 点击用户名跳转提问者个人主页
    answeClick(id) {
      if (id <= 0) {
        return;
      }
      uni.navigateTo({
        url: `/pages/profile/index?userId=${id}`,
      });
    },
    // 点击用户名跳转回答者个人主页
    beAskClick(id) {
      if (id <= 0) {
        return;
      }
      uni.navigateTo({
        url: `/pages/profile/index?userId=${id}`,
      });
    },

    // #ifdef H5
    closeShare() {
      this.shareShow = false;
    },
    // #endif

    // 取消按钮
    cancel() {
      this.$refs.popupContent.close();
    },
    // 点赞调取用户信息取消弹框
    close() {
      this.$refs.auth.close();
    },
    // 内容部分点赞按钮点击事件
    handleIsGreat(id, canLike, isLiked, index) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      const params = {
        pid: parseInt(id, 10),
        data: {
          attributes: {
            isLiked: isLiked !== true,
          },
        },
      };
      apiRequest.updatePosts({ data: params }).then(res => {
        this.threadData.firstPost.isLiked = res.Data.isLiked;
        this.threadData.firstPost.likeCount = res.Data.likeCount;
        this.$emit('greatCallBack', isLiked, index);
      });
    },
    // 视频禁止同时播放
    handleVideoPlay(index) {
      if (this.playIndex !== index && this.playIndex !== null) {
        this.$refs[`thread-${this.playIndex}`][0].pauseVideo();
      }
      this.playIndex = index;
    },
    // 内容部分点击评论跳到详情页
    commentClick(id) {
      uni.navigateTo({
        url: `/topic/index?id=${id}`,
      });
      this.$emit('toTopic', id);
    },
    // 首页内容部分分享按钮弹窗
    handleClickShare(id) {
      if (!this.$store.getters['session/get']('isLogin')) {
        uni.setStorage({
          key: 'page',
          data: getCurUrl(),
        });
        // #ifdef MP-WEIXIN
        this.mpLoginMode();
        // #endif
        // #ifdef H5
        this.h5LoginMode();
        // #endif
      }
      // #ifdef MP-WEIXIN
      this.$emit('handleClickShare', id);
      this.nowThreadId = id;
      this.$refs.popupContent.open();
      // #endif
      // #ifdef H5
      const shareThread = this.$store.getters['jv/get'](`threads/${id}`);
      if (shareThread.type === 1) {
        this.shareTitle = shareThread.title;
      } else {
        this.shareTitle = shareThread.firstPost.summaryText;
      }
      this.h5Share({
        title: this.shareTitle,
        id,
        url: 'topic/index',
      });
      // #endif
    },
    handleGroup(data) {
      let groups = [];
      if (data && data.length > 0) {
        groups = data.filter(item => item.isDisplay);
      }
      if (groups.length > 0) {
        return [groups[0]];
      }
      return [];
    },
  },
};
</script>
