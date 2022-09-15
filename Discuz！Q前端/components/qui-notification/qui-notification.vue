<template>
  <view>
    <qui-no-data :tips="i18n.t('manage.noContent')" v-if="!list || list.length <= 0"></qui-no-data>
    <view class="list-box" v-for="item in list" :key="item.id" v-else>
      <!-- 除系统通知以外的通知 -->
      <view class="list-box__notice" v-if="item.type !== 'system'">
        <view class="list-box__notice__h">
          <view class="list-box__notice__hl">
            <view class="list-box__notice__hl-image">
              <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-avatar
                class="list-box__notice__hl-avatar"
                :user="item"
                :is-real="item.isReal"
                @click="jumpUserPage(item.user_id)"
              />
              <!-- #endif -->
              <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
              <qui-avatar
                class="list-box__notice__hl-avatar"
                :user="item"
                :is-real="item.isReal"
                @click="jumpUserPage(item.user_id)"
                :size="60"
              />
              <!-- #endif -->
            </view>
            <view class="list-box__notice__hl-box">
              <view>
                <view class="list-box__notice__hl-info">
                  <view
                    :class="[
                      item.type === 'rewarded' || item.type === 'rewarded'
                        ? 'list-box__notice__hl-info-con'
                        : '',
                    ]"
                  >
                    <text
                      v-if="item.type === 'related'"
                      :class="[
                        item.thread_user_groups ? '' : 'list-box__notice__hl-info-username-space',
                        'list-box__notice__hl-info-username',
                      ]"
                    >
                      {{ item.user_name }}
                    </text>
                    <text
                      v-if="item.type === 'liked'"
                      :class="[
                        item.thread_user_groups ? '' : 'list-box__notice__hl-info-username-space',
                        'list-box__notice__hl-info-username list-box__notice__hl-info-replied',
                      ]"
                    >
                      {{ item.user_name }}
                    </text>
                    <text
                      v-if="item.type === 'replied'"
                      :class="[
                        item.thread_user_groups ? '' : 'list-box__notice__hl-info-username-space',
                        'list-box__notice__hl-info-username list-box__notice__hl-info-replied',
                      ]"
                    >
                      {{ item.user_name }}
                    </text>
                    <text
                      v-if="
                        item.type !== 'related' &&
                          item.type !== 'liked' &&
                          item.type !== 'replied' &&
                          item.type !== 'questioned'
                      "
                      :class="[
                        item.thread_user_groups ? '' : 'list-box__notice__hl-info-username-space',
                        'list-box__notice__hl-info-username list-box__notice__hl-info-rewarded',
                      ]"
                    >
                      {{ item.user_name }}
                    </text>
                    <text
                      v-if="item.type === 'questioned'"
                      :class="[
                        item.thread_user_groups ? '' : 'list-box__notice__hl-info-username-space',
                        'list-box__notice__hl-info-username list-box__notice__hl-info-questioned',
                      ]"
                    >
                      {{ item.user_name }}
                    </text>
                    <text
                      class="list-box__notice__hl-info-amount"
                      v-if="item.type === 'questioned' && item.is_answer === 0"
                    >
                      ￥{{ item.amount }}
                    </text>
                    <text class="list-box__notice__hl-info-title" v-if="item.type === 'related'">
                      {{ i18n.t('notice.relatedMe') }}
                    </text>
                    <text class="list-box__notice__hl-info-title" v-if="item.type === 'replied'">
                      {{ i18n.t('notice.repliedMe') }}
                    </text>
                    <text class="list-box__notice__hl-info-title" v-if="item.type === 'liked'">
                      {{ i18n.t('notice.likedMe') }}
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'rewarded' && item.order_type === 1"
                    >
                      {{ i18n.t('notice.scaledRegister') }}
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'rewarded' && item.order_type === 2"
                    >
                      {{
                        !item.isScale
                          ? i18n.t('notice.rewardedMe')
                          : i18n.t('notice.scaledrewarded')
                      }}
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'rewarded' && item.order_type === 3"
                    >
                      {{ !item.isScale ? i18n.t('notice.payedMe') : i18n.t('notice.scaledpayed') }}
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'receiveredpacket'"
                    >
                      来自{{ item.thread_username }}的红包
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'threadrewarded'"
                    >
                      来自{{ item.thread_username }}的悬赏
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'threadrewardedexpired'"
                    >
                      来自悬赏结束退回
                    </text>
                    <!-- type为rewarded和order_type为5展示：提问了我 -->
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'rewarded' && item.order_type === 5"
                    >
                      {{ i18n.t('notice.payQuestions') }}
                    </text>

                    <!-- type为rewarded和order_type为6展示：围观了我 -->
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'rewarded' && item.order_type === 6"
                    >
                      {{ i18n.t('notice.watchedMe') }}
                    </text>

                    <!-- type为rewarded和order_type为7展示：支付了我 -->
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'rewarded' && item.order_type === 7"
                    >
                      {{ i18n.t('notice.payedMe') }}
                    </text>

                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'questioned' && item.is_answer === 0"
                    >
                      {{ i18n.t('notice.questions') }}
                    </text>
                    <text
                      class="list-box__notice__hl-info-title"
                      v-if="item.type === 'questioned' && item.is_answer === 1"
                    >
                      {{ i18n.t('notice.answersMe') }}
                    </text>
                  </view>
                  <view class="list-box__notice__hl-info-time">{{ item.time }}</view>
                </view>
              </view>
              <view>
                <text class="list-box__notice__hl__amount" v-if="item.type === 'rewarded'">
                  {{ item.money }}
                </text>
                <text class="list-box__notice__hl__cash-amount" v-if="item.type === 'withdrawal'">
                  {{ item.money }}
                </text>
                <text
                  class="list-box__notice__hl__amount"
                  v-if="
                    item.type === 'threadrewarded' ||
                      item.type === 'threadrewardedexpired' ||
                      item.type === 'receiveredpacket'
                  "
                >
                  ￥{{ parseFloat(item.amount).toFixed(2) }}
                </text>
              </view>
            </view>
          </view>
          <view class="list-box__notice__hr">
            <qui-icon class="arrow" name="icon-folding-r" size="22" color="#ddd"></qui-icon>
          </view>
        </view>
        <view class="list-box__notice__con">
          <view
            class="list-box__notice__con__text"
            v-if="item.post_content"
            v-html="item.post_content"
            @click="jumpMyComment(item)"
          ></view>
          <view
            class="list-box__notice__con__text"
            v-if="item.answer_content"
            v-html="item.answer_content"
            @click="jumpMyComment(item)"
          ></view>
          <view
            class="list-box__notice__con__text"
            v-if="item.content && item.is_answer === 0"
            v-html="item.content"
            @click="jumpMyComment(item)"
          ></view>
          <view
            class="list-box__notice__con__space"
            v-if="item.post_content && item.thread_id"
          ></view>
          <view class="list-box__notice__con__wrap" v-if="item.type === 'withdrawal'">
            <view v-if="item.cash_status === 2">{{ i18n.t('notice.approved') }}</view>
            <view v-if="item.cash_status === 3">{{ i18n.t('notice.unapproved') }}</view>
            <view v-if="item.cash_status === 5">{{ i18n.t('notice.applicationHasBeenPaid') }}</view>
          </view>
          <view
            class="list-box__notice__con__wrap"
            v-if="item.thread_id && item.reply_post_id === 0 && item.is_answer !== 0"
            @click="jumpOtherTopic(item.thread_id)"
          >
            <view class="list-box__notice__con__wrap-info">
              <text class="list-box__notice__con__wrap-info-username">
                {{ item.thread_username }}：
              </text>
              <view
                v-if="
                  item.type !== 'rewarded' &&
                    item.type !== 'system' &&
                    item.type !== 'threadrewarded' &&
                    item.type !== 'receiveredpacket'
                "
                v-html="item.thread_title"
                style="display: inline-block;"
              ></view>
              <view
                v-if="item.type === 'rewarded'"
                v-html="item.content"
                style="display: inline-block;"
              ></view>
              <view
                v-if="item.type === 'questioned'"
                v-html="item.content"
                style="display: inline-block;"
              ></view>
              <view
                v-if="item.type === 'threadrewarded'"
                v-html="item.content"
                style="display: inline-block;"
              ></view>
              <view
                v-if="item.type === 'receiveredpacket'"
                v-html="item.content"
                style="display: inline-block;"
              ></view>
              <view class="list-box__notice__con__wrap-info-time">{{ item.thread_time }}</view>
            </view>
          </view>
          <view
            class="list-box__notice__con__wrap"
            v-if="
              item.thread_id &&
                item.reply_post_id !== 0 &&
                item.type !== 'system' &&
                item.type !== 'rewarded' &&
                item.type !== 'withdrawal'
            "
            @click="jumpMyComment(item)"
          >
            <view class="list-box__notice__con__wrap-info">
              <!-- 谁回复了谁 -->
              <text class="list-box__notice__con__wrap-info-username">
                {{
                  userInfo.username == item.reply_post_user_name
                    ? i18n.t('home.tabsMy')
                    : item.reply_post_user_name
                }}
              </text>
              <text class="list-box__notice__con__wrap-info-text" decode>{{ reply }}</text>
              <text class="list-box__notice__con__wrap-info-username">
                {{ item.thread_username }}：
              </text>
              <!-- 谁回复了谁结束 -->
              <view
                v-if="item.type !== 'rewarded' && item.type !== 'system'"
                v-html="item.reply_post_content"
                style="display: inline-block; word-break: break-all;"
              ></view>
              <view
                v-if="item.type === 'rewarded'"
                v-html="item.content"
                style="display: inline-block;"
              ></view>
              <view class="list-box__notice__con__wrap-info-time">{{ item.reply_time }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 系统通知 -->
      <view class="list-box__system-notice" @click="jumpNotice(item)" v-else>
        <view class="list-box__system-notice__h">
          <view>
            <view class="list-box__system-notice__hl__title">{{ item.title }}</view>
            <view class="list-box__system-notice__hl__time">{{ item.time }}</view>
          </view>
          <view class="list-box__system-notice__hr">
            <qui-icon class="arrow" name="icon-folding-r" size="22" color="#ddd"></qui-icon>
          </view>
        </view>
        <view class="list-box__system-notice__con">
          <view
            class="list-box__system-notice__con__text"
            v-if="item.type === 'system'"
            v-html="item.content"
          ></view>
        </view>
      </view>
      <!-- 删除按钮 -->
      <view class="list-box__ft">
        <qui-icon name="icon-delete" size="26" @click="deleteNotification(item.id)"></qui-icon>
        <text class="list-box__ft__text" @click="deleteNotification(item.id)">
          {{ i18n.t('notice.delete') }}
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},

  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    const userId = this.$store.getters['session/get']('userId');
    return {
      reply: '&nbsp;回复了&nbsp;',
      userInfo: this.$store.getters['jv/get'](`users/${userId}`),
    };
  },

  methods: {
    // 跳转个人主页
    jumpUserPage(id) {
      if (id <= 0) {
        return;
      }
      if (id) {
        uni.navigateTo({
          url: `/pages/profile/index?userId=${id}`,
        });
      }
    },
    // 删除消息
    deleteNotification(id) {
      this.$emit('deleteNotice', id);
    },

    // 点击消息跳转
    jumpMyComment(item) {
      if (item.type === 'liked') {
        uni.navigateTo({
          url: `/topic/index?id=${item.thread_id}`,
        });
        return;
      }
      if (item.type === 'questioned') {
        uni.navigateTo({
          url: `/topic/index?id=${item.thread_id}`,
        });
        return;
      }
      if (item && item.reply_post_id !== 0) {
        uni.navigateTo({
          url: `/pages/topic/comment?threadId=${item.thread_id}&commentId=${item.reply_post_id}`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/topic/comment?threadId=${item.thread_id}&commentId=${item.post_id}`,
        });
      }
    },
    // 非系统消息 - 跳转主题页
    jumpOtherTopic(topicId) {
      // #ifndef H5-PLAY || MP-WEIXIN-PLAY
      if (topicId) {
        uni.navigateTo({
          url: `/topic/index?id=${topicId}`,
        });
      }
      // #endif
      // #ifdef H5-PLAY || MP-WEIXIN-PLAY
      if (topicId) {
        uni.navigateTo({
          url: `/topic/index?id=${topicId}`,
        });
      } else {
        uni.showToast({ title: '该帖已被删除', icon: 'none' });
      }
      // #endif
    },
    // 系统消息 - 跳转主题页
    jumpNotice(item) {
      if (item && item.raw && item.raw.tpl_id !== 6 && item.raw.tpl_id !== 4 && item.thread_id) {
        uni.navigateTo({
          url: `/topic/index?id=${item.thread_id}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

.list-box {
  width: 100%;
  margin: 0 0 20rpx;
  font-size: $fg-f4;
  background-color: --color(--qui-BG-2);

  &__notice {
    padding: 20rpx 40rpx;

    &__h {
      display: flex;
      justify-content: space-between;
      margin: 0rpx 0rpx 20rpx;
    }

    &__hl {
      display: flex;
      align-items: center;
      width: 95%;

      &-avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 100rpx;
        will-change: transform;
      }

      &-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 95%;
        margin: 0rpx 0rpx 0rpx 20rpx;
      }

      &-info-username {
        display: inline-block;
        line-height: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        color: var(--qui-FC-000);
      }

      &-info-rewarded {
        max-width: 118rpx;
        // #ifdef H5-PLAY || MP-WEIXIN-PLAY
        max-width: 140rpx;
        // #endif
      }
      &-info-replied {
        // #ifndef H5-PLAY || MP-WEIXIN-PLAY
        max-width: 400rpx;
        // #endif
      }
      &-info-questioned {
        // #ifndef H5-PLAY || MP-WEIXIN-PLAY
        max-width: 400rpx;
        // #endif
      }

      &-info-username-space {
        margin: 0rpx 13rpx 0rpx 0rpx;
      }

      &-info-amount {
        color: #0000ff;
      }

      &-info-groupname,
      &-info-title {
        color: --color(--qui-FC-AAA);
      }

      &-info-time {
        font-size: 24rpx;
        color: --color(--qui-FC-AAA);
      }

      &__amount {
        margin-right: 20rpx;
        font-weight: bold;
        color: --color(--qui-RED);
      }

      &__cash-amount {
        margin-right: 20rpx;
        font-weight: bold;
        color: --color(--qui-GREEN);
      }
    }

    &__hr {
      display: flex;
      align-items: center;
    }

    &__con {
      &__text {
        color: --color(--qui-FC-333);
        word-break: break-all;
      }

      &__space {
        padding: 20rpx 0rpx;
      }

      &__wrap {
        padding: 20rpx;
        font-size: 24rpx;
        color: --color(--qui-FC-333);
        background-color: --color(--qui-BG-ED);
        border-radius: 10rpx;
      }

      &__wrap-info-username {
        font-weight: bold;
        vertical-align: top;
      }

      &__wrap-info-text {
        color: --color(--qui-FC-AAA);
        vertical-align: top;
      }

      &__wrap-info-time {
        margin: 10rpx 0rpx 0rpx;
        font-size: 20rpx;
        color: --color(--qui-FC-AAA);
      }
    }
  }

  &__system-notice {
    padding: 20rpx 40rpx;

    &__h {
      display: flex;
      justify-content: space-between;
      margin: 0rpx 0rpx 20rpx;

      &l__title {
        margin: 0rpx 0rpx 10rpx;
        font-weight: bold;
        color: --color(--qui-FC-000);
      }

      &l__time {
        font-size: 24rpx;
        color: --color(--qui-FC-AAA);
      }
    }

    &__con {
      &__text {
        color: --color(--qui-FC-333);
      }
    }
  }

  &__ft {
    padding: 0rpx 40rpx 40rpx 0rpx;
    color: --color(--qui-FC-777);
    text-align: right;

    &__text {
      padding: 0rpx 0rpx 0rpx 11rpx;
    }
  }
}
</style>
