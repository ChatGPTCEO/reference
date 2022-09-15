<template>
  <view class="themeCount">
    <view class="themeItem">
      <view class="themeItem__header">
        <view class="themeItem__header__img" @click="personJump">
          <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
          <qui-avatar
            :user="{ username: userName, avatarUrl: commentAvatarUrl }"
            :is-real="isReal"
          />
          <!-- #endif -->
          <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
          <!-- 评论修改获得头像 -->
          <qui-avatar
            :user="{ username: userName, avatarUrl: commentAvatarUrl }"
            :is-real="isReal"
            size="60"
          />
          <!-- #endif -->
        </view>
        <view class="themeItem__header__title">
          <view class="themeItem__header__title__top">
            <text class="themeItem__header__title__username" @click="personJump">
              {{ userName }}
            </text>
            <text class="reply-to" v-if="commentPostId !== ''">{{ i18n.t('topic.replyTo') }}</text>
            <text class="themeItem__header__title__username" v-if="commentPostId !== ''">
              {{ commentUser.username || commentUser.userName }}
            </text>
            <view v-if="commentPostId === ''">
              <text
                class="themeItem__header__title__isAdmin"
                v-for="(group, index) in userRole"
                :key="index"
                :class="group.isDisplay ? 'themeItem__header__title__isAdminColor' : ''"
              >
                {{ group.isDisplay ? `${group.name}` : '' }}
              </text>
            </view>
          </view>
          <view class="themeItem__header__title__time">{{ localTime }}</view>
        </view>
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <!-- 评论右上角后的悬赏金的显示 -->
        <view
          class="themeItem__header__goldcoin"
          v-if="
            rewards !== 0 &&
              currentPostData.type === 5 &&
              currentPostData.questionTypeAndMoney.type === 0
          "
        >
          <image
            src="../../static/h5-play/gold_coin_3@2x.png"
            class="themeItem__header__goldcoin__logo"
          ></image>
          <view class="themeItem__header__goldcoin__text">
            获得
            <text class="themeItem__header__goldcoin__textRed">{{ rewards }}元</text>
            悬赏金
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifdef H5-PLAY ||MP-WEIXIN-PLAY -->
        <view class="themeItem__header__r">
          <view class="hbiocon" v-if="!!redPacketAmount">
            <image src="../../static/h5-play/pinglunhb.png" mode="" class="hbiocon_tutu"></image>
            <text class="hbiocon_font">
              获得
              <text style="color: #d23a2a;">{{ redPacketAmount }}元</text>
              红包
            </text>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <view class="themeItem__header__r">
          <view v-if="commentStatus == 0" class="comment-status">{{ t.inReview }}</view>
          <view v-else @click="commentLikeClick" class="comment-like">
            <qui-icon v-if="isLiked" name="icon-liked" class="like"></qui-icon>
            <qui-icon v-else name="icon-like" class="like" size="30"></qui-icon>
            <view class="comment-like-count">
              {{ commentLikeCount == 0 ? t.like : commentLikeCount }}
            </view>
          </view>
        </view>
        <!-- #endif -->
      </view>
      <view class="themeItem__content">
        <view class="themeItem__content__text" @click="commentJump">
          <qui-uparse :content="commentContent"></qui-uparse>
        </view>
        <qui-image :images-list="imagesList"></qui-image>
        <!-- #ifdef H5 || MP-WEIXIN-->
        <view class="themeItem__header__goldcoin" v-if="!!rewards">
          <image
            src="../../static/h5-play/gold_coin_3@2x.png"
            class="themeItem__header__goldcoin__logo"
          ></image>
          <view class="themeItem__header__goldcoin__text">
            获得
            <text class="themeItem__header__goldcoin__textRed">{{ rewards }}元</text>
            悬赏金
          </view>
        </view>
        <view class="themeItem__header__r">
          <view class="hbiocon" v-if="!!redPacketAmount">
            <image src="../../static/h5-play/pinglunhb.png" mode="" class="hbiocon_tutu"></image>
            <text class="hbiocon_font">
              获得
              <text style="color: #d23a2a;">{{ redPacketAmount }}元</text>
              红包
            </text>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
        <!-- 蓝版评论中采纳后悬赏金的显示 -->
        <view
          class="themeItem__header__goldcoin"
          v-if="
            rewards !== 0 &&
              currentPostData.type === 5 &&
              currentPostData.questionTypeAndMoney.type === 0
          "
        >
          <image
            src="../../static/h5-play/gold_coin_3@2x.png"
            class="themeItem__header__goldcoin__logo"
          ></image>
          <view class="themeItem__header__goldcoin__text">
            获得
            <text class="themeItem__header__goldcoin__textRed">{{ rewards }}元</text>
            悬赏金
          </view>
        </view>
        <qui-reply
          v-if="replyList.length > 0"
          :comment-type-val="commentType"
          :reply-list="replyList"
          :user-name="userName"
          @commentJump="commentJump"
        ></qui-reply>
        <!-- #endif -->
        <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
        <!-- 评论中的评论 -->
        <qui-reply
          v-if="replyList.length > 0"
          :comment-type-val="commentType"
          :reply-list="replyList"
          :user-name="userName"
          @commentJump="commentJump"
        ></qui-reply>
        <!-- #endif -->
      </view>

      <view class="themeItem__comment"></view>
      <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
      <view
        class="themeItem__footer"
        :style="{ justifyContent: replyCount > 0 ? 'space-between' : 'flex-end' }"
      >
        <view class="themeItem__footer__l" v-if="replyCount > 3" @click="commentJump">
          <view class="themeItem__footer__con">{{ replyCount }}{{ t.item }}{{ t.reply }}</view>
          <qui-icon
            class="count-jt"
            name="icon-folding-r"
            size="22"
            @click="handleClick"
          ></qui-icon>
        </view>
        <view v-else></view>
        <view class="themeItem__footer__r">
          <view
            v-if="
              currentPostData &&
                currentPostData.thread &&
                currentPostData.thread.questionTypeAndMoney &&
                currentPostData.thread.questionTypeAndMoney.type === 0 &&
                isShowAdopt
            "
            @click="commentAoptClick"
            class="footer__r__child"
          >
            <image
              src="../../static/h5-play/adopt@2x.png"
              style="position: relative;right: 10rpx;width: 34rpx;height: 34rpx;"
            ></image>
            <view class="comment-like-count comment-adopt-count">采纳</view>
          </view>
          <view class="footer__r__child" v-if="canDelete" @click="deleteComment">
            <qui-icon class="icon" name="icon-delete" size="26" color="#AAA"></qui-icon>
            <view class="themeItem__footer__con">{{ t.delete }}</view>
          </view>
          <view class="footer__r__child" @click="replyComment" v-if="commentShow">
            <qui-icon class="icon" name="icon-comments" size="26" color="#AAA"></qui-icon>
            <view class="themeItem__footer__con">{{ t.reply }}</view>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <view
        class="themeItem__footer"
        :style="{ justifyContent: replyCount > 0 ? 'space-between' : 'flex-end' }"
      >
        <view class="themeItem__footer__box">
          <view class="themeItem__footer__l" v-if="replyCount > 3" @click="commentJump">
            <view class="themeItem__footer__con">{{ replyCount }}{{ t.item }}{{ t.reply }}</view>
            <qui-icon
              class="count-jt"
              name="icon-folding-r"
              size="22"
              @click="handleClick"
            ></qui-icon>
          </view>
          <view class="themeItem__header__r">
            <view class="hbiocon" v-if="!!redPacketAmount">
              <image src="../../static/h5-play/pinglunhb.png" mode="" class="hbiocon_tutu"></image>
              <text class="hbiocon_font">
                获得
                <text style="color: #d23a2a;">{{ redPacketAmount }}元</text>
                红包
              </text>
            </view>
            <view v-if="commentStatus == 0" class="comment-status">{{ t.inReview }}</view>
            <view v-else @click="commentLikeClick" class="comment-like">
              <qui-icon v-if="isLiked" name="icon-liked" class="like"></qui-icon>
              <qui-icon v-else name="icon-like" class="like" size="30"></qui-icon>
              <view class="comment-like-count">
                {{ commentLikeCount == 0 ? t.like : `${t.like}${commentLikeCount}` }}
              </view>
            </view>
          </view>
          <view class="themeItem__header__r">
            <view
              v-if="
                currentPostData &&
                  currentPostData.thread &&
                  currentPostData.thread.questionTypeAndMoney &&
                  currentPostData.thread.questionTypeAndMoney.type === 0 &&
                  isShowAdopt
              "
              @click="commentAoptClick"
              class="comment-likecopy"
            >
              <image
                src="../../static/h5-play/adopt@2x.png"
                style="position: relative;right: 10rpx;width: 34rpx;height: 34rpx;"
              ></image>
              <view class="comment-like-count comment-adopt-count">采纳</view>
            </view>
          </view>
          <view class="footer__r__child" v-if="canDelete" @click="deleteComment">
            <qui-icon class="icon" name="icon-delete" size="26" color="#AAA"></qui-icon>
            <view class="themeItem__footer__con">{{ t.delete }}</view>
          </view>
          <view class="footer__r__child" @click="replyComment" v-if="commentShow">
            <qui-icon class="icon" name="icon-comments" size="26" color="#AAA"></qui-icon>
            <view class="themeItem__footer__con">{{ t.reply }}</view>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <!-- 采纳的弹框 -->
      <uni-popup ref="adopt" type="bottom">
        <view class="mask-adopt">
          <view class="mask-adopt-title">采纳回复悬赏</view>
          <view class="mask-adopt-content">
            <view class="mask-adopt-content-percentage">
              <text>悬赏百分比：</text>
              <view class="mask-adopt-content-input-box">
                <input
                  type="text"
                  class="mask-adopt-content-input"
                  value=""
                  @input="adoptedAmount"
                  v-model="percentage"
                />
              </view>
              <text>%</text>
            </view>
            <view class="mask0adopt-content-amountMoney">
              <text>悬赏金额：</text>
              <view class="mask-adopt-content-input-box amountMoneyInputBg">
                <input
                  type="text"
                  class="mask-adopt-content-input"
                  value=""
                  disabled="true"
                  v-model="amountMoney"
                />
              </view>
            </view>
          </view>
          <view class="mask-adopt-footer">
            <view class="mask-adopt-footer-determine" @click="maskAdoptClick('determine')">
              确定
            </view>
            <view class="mask-adopt-footer-cancel" @click="maskAdoptClick('cancel')">
              取消
            </view>
          </view>
        </view>
      </uni-popup>
      <!-- 提示弹框 -->
      <qui-toast ref="toast"></qui-toast>
    </view>
  </view>
</template>

<script>
import { time2DateAndHM } from '@/utils/time';

const { get } = require('lodash');
// #ifdef H5-PLAY || MP-WEIXIN-PLAY
// import UniPopupAdopt from '@/components/uni-popup/uni-popup-adopt.vue';
// #endif

export default {
  // #ifdef H5-PLAY || MP-WEIXIN-PLAY
  // components: {
  //   UniPopupAdopt,
  // },
  // #endif
  props: {
    // 帖子的信息
    currentPostData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rewards: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 类型，0为取摘要，1为取全部内容
    commentType: {
      type: Number,
      default: 0,
    },
    // 刷新状态
    refreshStatus: {
      type: Boolean,
      default: false,
    },
    // 回复的用户头像
    commentAvatarUrl: {
      type: String,
      default: '',
    },
    // 回复的id
    postId: {
      type: [Number, String],
      default: '',
    },
    commentPostId: {
      type: [Number, String],
      default: '',
    },
    commentUser: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 回复的用户名
    userName: {
      type: String,
      default: '',
    },
    // 实名认证
    isReal: {
      type: Boolean,
      default: false,
    },
    // 回复的用户的角色
    userRole: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 回复的审核状态
    commentStatus: {
      type: [String, Number],
      default: '1',
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    // 回复的内容
    commentContent: {
      type: String,
      default: '',
    },
    // 回复的评论
    replyList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 评论的回复数
    replyCount: {
      type: Number,
      default: 0,
    },
    // 回复的时间
    commentTime: {
      type: String,
      default: '',
    },
    // 回复的图片
    imagesList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 图片裁剪、缩放的模式
    modeVal: {
      type: String,
      default: 'aspectFill',
    },
    // 是否显示评论的回复按钮
    commentShow: {
      type: Boolean,
      default: false,
    },
    // 回复的点赞数
    commentLikeCount: {
      type: Number,
      default: 0,
    },
    // 是否显示删除
    canDelete: {
      type: Boolean,
      default: true,
    },
    redPacketAmount: {
      type: [Number, String],
      default: '',
    },
  },
  data: () => {
    return {
      isAdmin: true,
      isGreat: false,
      imageStatus: true,
      amountMoney: '',
      percentage: '',
    };
  },
  computed: {
    // 获取登录者id
    currentLoginId() {
      return this.$store.getters['session/get']('userId');
    },
    // 是否显示采纳按钮
    isShowAdopt() {
      const { author = {} } = this.currentPostData;
      if (author.id !== this.currentLoginId * 1 || this.item.user === undefined) {
        return false;
      }
      return !(this.currentLoginId * 1 === this.item.user.id * 1);
    },
    t() {
      return this.i18n.t('topic');
    },
    // 时间转化
    localTime() {
      return time2DateAndHM(this.commentTime ? this.commentTime : '');
    },
  },
  watch: {
    // 监听得到的数据
    commentLikeCount: {
      handler(newVal) {
        this.commentLikeCount = newVal;
      },
      deep: true,
      immediate: true,
    },
    // 监听得到的数据
    refreshStatus: {
      handler(newVal) {
        this.refreshStatus = newVal;
        if (this.refreshStatus === true) {
          this.$forceUpdate();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 采纳输入百分比
    adoptedAmount() {
      if (!this.percentage) {
        return false;
      }
      if (parseFloat(this.percentage).toString() === 'NaN') {
        this.$refs.toast.show({ message: '只能输入数字' });
        return false;
      }
      if (this.percentage <= 0 || this.percentage > 100) {
        if (!this.percentage) {
          return false;
        }
        this.$refs.toast.show({ message: '只能输入0-100' });
        return false;
      }
      this.amountMoney =
        this.percentage * 0.01 * this.currentPostData.thread.questionTypeAndMoney.money;
      this.amountMoney = parseFloat(this.amountMoney.toFixed(2));
    },
    // 采纳事件
    commentAoptClick() {
      if (this.item.user.id === this.currentLoginId) {
        this.$refs.toast.show({ message: '不可采纳自己的评论' });
        return;
      }
      this.$refs.adopt.open();
    },
    // 采纳确定和取消事件
    maskAdoptClick(str) {
      if (str === 'determine') {
        if (parseFloat(this.percentage).toString() === 'NaN') {
          this.$refs.toast.show({ message: '只能输入数字' });
          this.$refs.adopt.close();
          return false;
        }
        const remainMoney = get(this.currentPostData, 'thread.questionTypeAndMoney.remainMoney', 0);
        if (this.amountMoney > remainMoney) {
          this.$refs.toast.show({ message: '悬赏余额不足' });
          return false;
        }
        const amountMoney = this.amountMoney * 1;
        if (this.amountMoney === 0) {
          this.$refs.toast.show({ message: '悬赏采纳后奖励的金额需大于等于0.01元' });
          return false;
        }
        this.amountMoney = '';
        this.percentage = '';
        this.$emit(
          'submitadoption',
          amountMoney,
          this.postId * 1,
          this.currentPostData.thread.id * 1,
        );
        this.$refs.adopt.close();
      } else {
        this.$refs.adopt.close();
      }
    },
    // 点击内容事件
    commentJump() {
      this.$emit('commentJump');
    },
    // 点击头像以及用户名事件
    personJump() {
      this.$emit('personJump');
    },
    // 评论点赞
    commentLikeClick(evt) {
      this.$emit('commentLikeClick', evt);
    },
    // 删除事件
    deleteComment() {
      this.$emit('deleteComment');
    },
    // 回复事件
    replyComment() {
      this.$emit('replyComment');
    },
    // 点击图片事件(默认参数图片id)
    // imageClick(imageId) {
    //   this.$emit('imageClick', imageId);
    // },
    // 预览图片
    previewPicture(index) {
      const _this = this;
      const preview = [];
      for (let i = 0, len = _this.imagesList.length; i < len; i += 1) {
        preview.push(_this.imagesList[i].url);
      }
      uni.previewImage({
        current: index,
        urls: preview,
        indicator: 'number',
      });
    },
    // 头像加载失败,显示默认头像
    imageError() {
      this.imageStatus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.themeCount {
  position: relative;
  .addFine {
    position: absolute;
    top: -10rpx;
    left: 679rpx;
    width: 31rpx;
    height: 41rpx;
  }
}
.themeItem {
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  position: relative;
  /* #endif */
  width: 100%;
  padding: 30rpx 40rpx;
  border-bottom: 1px solid --color(--qui-BOR-ED);
  box-sizing: border-box;

  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80rpx;
    margin-bottom: 20rpx;

    &__img {
      width: 80rpx;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      width: 60rpx;
      /* #endif */
      height: 80rpx;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      height: 60rpx;
      /* #endif */
      margin-right: 18rpx;
      background: #ccc;
      border-radius: 100%;
      image {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    &__title {
      flex: 1;
      &__top {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 37rpx;
        margin-bottom: 10rpx;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        margin-bottom: 0;
        /* #endif */
        margin-left: 2rpx;
        font-size: 28rpx;
        line-height: 37rpx;
      }

      &__username {
        // display: flex;
        height: 37rpx;
        max-width: 286rpx;
        overflow: hidden;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        font-size: 26rpx;
        /* #endif */
        font-weight: bold;
        /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
        font-weight: 400;
        /* #endif */
        line-height: 37rpx;
        color: --color(--qui-FC-000);
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
      }

      &__isAdmin {
        display: inline-block;
        height: 37rpx;
        font-weight: 400;
        line-height: 37rpx;
        color: --color(--qui-FC-AAA);
      }

      &__isAdminColor {
        min-width: 120rpx;
        // #ifndef H5-PLAY || MP-WEIXIN-PLAY
        padding: 2rpx 10rpx;
        // #endif
        margin-left: 15rpx;
        font-size: $fg-f1;
        text-align: center;
        background: --color(--qui-BG-IT);
        border-radius: 18rpx;
        box-sizing: border-box;
      }

      &__time {
        min-width: 240rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 31rpx;
        color: --color(--qui-FC-AAA);
      }

      &__jumpBtn {
        float: right;
        width: 10rpx;
        height: 37rpx;
        font-size: 10rpx;
        line-height: 37rpx;
        color: #ddd;
      }
    }
    &__r {
      width: 100rpx;
      /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
      width: 124rpx;
      /* #endif */
      .comment-status {
        font-size: 26rpx;
        color: --color(--qui-RED);
        text-align: right;
      }
    }
  }

  &__content {
    &__text {
      overflow: hidden;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 45rpx;
      color: --color(--qui-FC-333);
      word-break: break-all;
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;

      &__item {
        height: 50rpx;
        padding: 0 20rpx;
        margin-right: 10rpx;
        margin-bottom: 8rpx;
        font-family: $font-family;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 50rpx;
        color: rgba(119, 119, 119, 1);
        text-align: center;
        background: rgba(247, 247, 247, 1);
        border-radius: 6rpx;
      }
    }
  }
}
.themeItem__footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 20rpx;
  .themeItem__footer__con {
    font-size: $fg-f3;
    line-height: 37rpx;
  }
  &__l {
    display: flex;
    flex-direction: row;
    line-height: 37rpx;
    color: --color(--qui-LINK);
    text-align: left;
    align-items: center;
    .count-jt {
      padding-left: 6rpx;
      line-height: 34rpx;
      color: --color(--qui-LINK);
    }
  }
  &__r {
    display: flex;
    flex-direction: row;
    line-height: 37rpx;
    color: rgba(170, 170, 170, 1);
    text-align: right;
    align-items: center;
  }
}
.footer__r__child {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 120rpx;
  text-align: right;
  .icon {
    padding-right: 10rpx;
    font-size: $fg-f4;
    line-height: 37rpx;
    color: rgba(170, 170, 170, 1);
  }
}
.comment-like {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .like {
    margin-right: 15rpx;
    font-size: 30rpx;
    line-height: 37rpx;
    color: --color(--qui-FC-777);
  }
  .comment-like-count {
    font-size: $fg-f4;
    line-height: 37rpx;
    color: --color(--qui-FC-777);
  }
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.comment-likecopy {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .like {
    margin-right: 15rpx;
    font-size: 30rpx;
    line-height: 37rpx;
    color: --color(--qui-FC-777);
  }
  .comment-like-count {
    font-size: $fg-f4;
    line-height: 37rpx;
    color: --color(--qui-FC-777);
  }
}
.themeItem__footer__box {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.comment-adopt {
  position: relative;
  left: 150rpx;
}
/* #endif */
// 采纳弹窗
.mask-adopt {
  width: 100%;
  height: 514rpx;
  background: var(--qui-FC-FFF);
  border-radius: 24rpx 24rpx 0 0;
}
.mask-adopt-title {
  height: 30rpx;
  padding: 38rpx 0;
  font-size: 30rpx;
  font-weight: bolder;
  line-height: 30rpx;
  color: var(--qui-BG-000);
  text-align: center;
}
.mask-adopt-content-percentage,
.mask0adopt-content-amountMoney {
  display: flex;
  margin: 20rpx 0;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  font-weight: bolder;
  color: var(--qui-FC-333);
}
.mask-adopt-content-input-box {
  width: 224rpx;
  height: 58rpx;
  padding-top: 20rpx;
  margin-right: 20rpx;
  border: 2rpx solid #eee;
  border-radius: 2rpx;
}
.mask-adopt-content-input {
  font-size: 28rpx;
  text-align: center;
}
.amountMoneyInputBg {
  background: #faf9fb;
}
.mask-adopt-footer {
  display: flex;
  width: 100%;
}
.mask-adopt-footer-determine,
.mask-adopt-footer-cancel {
  width: 50%;
  height: 94rpx;
  line-height: 94rpx;
  color: var(--qui-FC-FFF);
  text-align: center;
}
.mask-adopt-footer-determine {
  // #ifdef H5-PLAY || MP-WEIXIN-PLAY
  background: #c20c0c;
  // #endif
  // #ifndef H5-PLAY || MP-WEIXIN-PLAY
  background: #1878f1;
  // #endif
}
.mask-adopt-footer-cancel {
  background: #c9c9c9;
}
.themeItem__header__goldcoin {
  display: flex;
  width: 280rpx;
  height: 66rpx;
  font-size: 26rpx;
  font-weight: bolder;
  color: #333;
  text-align: center;
  background: #fefbf5;
  justify-content: center;
  align-items: center;
}
.themeItem__header__goldcoin__logo {
  width: 40rpx;
  height: 40rpx;
}
.themeItem__header__goldcoin__text {
  padding-left: 10rpx;
}
.themeItem__header__goldcoin__textRed {
  padding: 0 10rpx;
  color: #d23a2a;
}
.hbiocon {
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  position: absolute;
  top: 24rpx;
  right: 36rpx;
  /* #endif */
  display: flex;
  width: 280rpx;
  height: 66rpx;
  padding: 10rpx;
  font-size: 26rpx;
  color: #333;
  background: #fefbf5;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &_tutu {
    width: 30rpx;
    height: 32rpx;
    margin-right: 5rpx;
  }
  &_hbiocon_font {
    font-family: 'PingFang SC';
    font-size: 26rpx;
    font-weight: 600;
    color: #333;
  }
}
.reply-to {
  padding: 0 10rpx;
  font-size: $fg-f3;
  color: --color(--qui-FC-AAA);
}
</style>
