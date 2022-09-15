<template>
  <view>
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <view
      class="comment-child-comment-box"
      :style="{
        padding: padVal,
        borderRadius: radiusVal + 'rpx',
      }"
    >
      <view
        class="comment-child-reply"
        v-for="(reply, index) in replyList"
        :key="index"
        @click="commentJump"
      >
        <view class="reply-user">{{ reply.user.username || reply.user.userName }}</view>
        <view v-if="reply.commentPostId !== null && reply.commentUser" class="reply-to">
          {{ i18n.t('topic.reply') }}
        </view>
        <view v-if="reply.commentPostId !== null && reply.commentUser" class="reply-user">
          {{ reply.commentUser.username || reply.commentUser.userName }}
        </view>
        <view class="reply-user">：</view>
        <view class="reply-content" v-if="commentTypeVal === 0 || commentTypeVal === 1">
          <u-parse class-name="inline" :content="reply.contentHtml | formatRichText"></u-parse>
        </view>
        <!--<qui-uparse
        v-if="commentTypeVal === 0"
        :content="reply.summary"
        class="reply-content"
      ></qui-uparse>
      <qui-uparse
        v-else-if="commentTypeVal === 1"
        :content="reply.contentHtml"
        class="reply-content"
      ></qui-uparse>
      -->
        <!--<qui-uparse
        :content="reply.contentHtml"
        class="reply-content"
        style="display: inline;"
      ></qui-uparse>-->
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <view
      class="comment-child-comment-box"
      :style="{
        padding: padVal,
        borderRadius: radiusVal + 'rpx',
      }"
    >
      <view
        class="comment-child-reply"
        v-for="(reply, index) in replyList"
        :key="index"
        @click="commentJump"
      >
        <view class="reply-user">{{ reply.user.username }}</view>
        <view v-if="reply.commentPostId !== null && reply.commentUser" class="reply-to">
          {{ i18n.t('topic.reply') }}
        </view>
        <view v-if="reply.commentPostId !== null && reply.commentUser" class="reply-user">
          {{ reply.commentUser.username }}
        </view>
        <view class="reply-user">：</view>
        <view class="reply-content" v-if="commentTypeVal === 0 || commentTypeVal === 1">
          <u-parse class-name="inline" :content="reply.contentHtml | formatRichText"></u-parse>
        </view>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import uParse from '@/components/feng-parse/parse';
import s9e from '@/utils/s9e';

export default {
  components: {
    uParse,
  },
  filters: {
    formatRichText(contentHtml) {
      return s9e.parse(contentHtml, this);
    },
  },

  props: {
    // #ifdef H5-PLAY || MP-WEIXIN-PLAY
    // 评论回复的用户名
    userName: {
      type: String,
      default: '',
    },
    // #endif
    // 类型，0为取摘要，1为取全部内容
    commentTypeVal: {
      type: Number,
      default: 0,
    },
    // 盒子padding值
    padVal: {
      type: String,
      default: '16rpx',
    },
    // 盒子的圆角
    radiusVal: {
      type: Number,
      default: 10,
    },
    // 评论的回复列表
    replyList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 回复的id
    postId: {
      type: [Number, String],
      default: '',
    },
    // 评论回复的图片
    imagesList: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 图片裁剪、缩放的模式
    modeVal: {
      type: String,
      default: 'center',
    },
  },
  data: () => {
    return {
      isAdmin: true,
      isGreat: false,
    };
  },
  computed: {
    t() {
      return this.i18n.t('topic');
    },
  },
  watch: {
    // 监听得到的数据
    commentTypeVal: {
      handler(newVal) {
        this.commentTypeVal = newVal;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 点击内容事件
    commentJump() {
      this.$emit('commentJump');
    },
    // 点击头像以及用户名事件
    personJump() {
      this.$emit('personJump');
    },
    // 删除事件
    deleteComment() {
      this.$emit('deleteComment');
    },
    // 点击图片事件(默认参数图片id)
    imageClick(imageId) {
      this.$emit('imageClick', imageId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

.comment-child-comment-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 40rpx;
  background: --color(--qui-BG-ED);
  border-radius: 7rpx;
  box-sizing: border-box;
}
.comment-reply-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.comment-child-reply {
  display: block;
  padding: 4rpx 0;
  font-size: $fg-f3;
  line-height: 35rpx;
  word-break: break-all;
  .reply-user {
    display: inline;
    color: --color(--qui-LINK);
  }
  .reply-connector {
    display: inline;
    padding: 0 5px;
    color: --color(--qui-FC-777);
    flex-shrink: 0;
  }
  .reply-content {
    display: inline;
  }
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.themeItem__header {
  position: relative;
  margin-bottom: 30rpx;
  &__triangle_box {
    position: absolute;
    top: -44rpx;
    left: 14rpx;
    width: 40rpx;
    height: 22rpx;
  }
  &__triangle {
    width: 100%;
    height: 100%;
  }
  &__img {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
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
      display: flex;
      height: 37rpx;
      max-width: 286rpx;
      overflow: hidden;
      font-size: 26rpx;
      font-weight: 400;
      font-weight: bold;
      line-height: 37rpx;
      color: #333;
      text-indent: 80rpx;
      text-overflow: ellipsis;
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
      padding: 2rpx 10rpx;
      margin-left: 15rpx;
      font-size: $fg-f1;
      background: --color(--qui-BG-IT);
      border-radius: 18rpx;
      box-sizing: border-box;
    }

    &__time {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 31rpx;
      color: --color(--qui-FC-AAA);
      text-indent: 80rpx;
      &__userName {
        padding-left: 10rpx;
        font-family: 'PingFangSC Regular' !important;
        font-size: 26rpx;
        font-weight: 400;
        color: #333;
      }
      &__content {
        padding-left: 10rpx;
        font-family: 'PingFang SC' !important;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: 1.5rpx;
        color: #000;
      }
    }

    &__jumpBtn {
      float: right;
      width: 10rpx;
      height: 37rpx;
      margin-top: 10rpx;
      font-size: 10rpx;
      line-height: 37rpx;
      color: #ddd;
    }
  }
}
/* #endif */
.reply-to {
  display: inline;
  padding: 0 10rpx;
  font-size: $fg-f2;
  color: --color(--qui-FC-777);
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.themeItem__header {
  position: relative;
  margin-bottom: 30rpx;
  &__triangle_box {
    position: absolute;
    top: -44rpx;
    left: 14rpx;
    width: 40rpx;
    height: 22rpx;
  }
  &__triangle {
    width: 100%;
    height: 100%;
  }
  &__img {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
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
      margin-bottom: 0rpx;
      margin-left: 2rpx;
      font-size: 28rpx;
      line-height: 37rpx;
    }

    &__username {
      display: flex;
      height: 37rpx;
      max-width: 286rpx;
      overflow: hidden;
      font-size: 26rpx;
      font-weight: 400;
      font-weight: bold;
      line-height: 37rpx;
      color: #333;
      text-indent: 80rpx;
      text-overflow: ellipsis;
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
      padding: 2rpx 10rpx;
      margin-left: 15rpx;
      font-size: $fg-f1;
      background: --color(--qui-BG-IT);
      border-radius: 18rpx;
      box-sizing: border-box;
    }

    &__time {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 31rpx;
      color: --color(--qui-FC-AAA);
      text-indent: 80rpx;
      &__userName {
        padding-left: 10rpx;
        font-family: 'PingFangSC Regular' !important;
        font-size: 26rpx;
        font-weight: 400;
        color: #333;
      }
      &__content {
        padding-left: 10rpx;
        font-family: 'PingFang SC' !important;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        letter-spacing: 1.5rpx;
        color: #000;
      }
    }

    &__jumpBtn {
      float: right;
      width: 10rpx;
      height: 37rpx;
      margin-top: 10rpx;
      font-size: 10rpx;
      line-height: 37rpx;
      color: #ddd;
    }
  }
}
/* #endif */
</style>
