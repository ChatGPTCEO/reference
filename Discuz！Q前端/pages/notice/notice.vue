<template>
  <qui-page :data-qui-theme="theme">
    <view class="notification-box">
      <!-- 通知信息 -->
      <scroll-view
        scroll-y="true"
        @scrolltolower="pullDown"
        show-scrollbar="false"
        show-icon="true"
        class="scroll-y"
        style="height: 100vh;"
      >
        <!-- 消息数据 -->
        <qui-notification :list="noticeList" @deleteNotice="deleteNotice"></qui-notification>
        <!-- 加载更多 -->
        <qui-load-more
          :status="loadingType"
          v-if="noticeList && noticeList.length > 0"
        ></qui-load-more>
      </scroll-view>
      <!-- 删除提示弹框 -->
      <uni-popup ref="popTips" type="center">
        <uni-popup-dialog
          type="warning"
          :before-close="true"
          :content="i18n.t('core.deleteNewsSure')"
          @close="handleCancel"
          @confirm="handleOk"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </qui-page>
</template>

<script>
import { time2DateAndHM } from '@/utils/time';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';

export default {
  components: { uniPopupDialog },
  data() {
    return {
      navTitle: '', // 导航栏标题
      loadingType: 'more', // 上拉加载状态
      pageSize: 20, // 每页20条数据
      pageNum: 1, // 当前页数
      noticeList: [], // 通知列表
      type: '', // 当前的通知类型
      noticeId: 0, // 通知id
      emojiList: [],
    };
  },
  onLoad(params) {
    const { title, type, unReadNum } = params;
    let newType = '';
    if (type === 'rewarded,withdrawal') {
      this.type = type;
      newType = `${type},threadrewarded,receiveredpacket,threadrewardedexpired`;
    } else {
      this.type = type;
      newType = type;
    }
    this.navTitle = title;
    if (parseInt(unReadNum, 10) > 0) {
      this.navTitle = this.i18n.t('notice.item', { title, unReadNum });
    }
    // 设置导航栏标题
    uni.setNavigationBarTitle({
      title: this.navTitle,
    });
    this.getNotices(newType);
  },
  methods: {
    // 解析系统消息中的表情
    getContentEmoji() {
      this.$store.dispatch('jv/get', ['emoji', {}]).then(data => {
        this.emojiList = data;
        this.noticeList.forEach(noticeItem => {
          const notice = noticeItem;
          // 获取表情请求
          this.emojiList.forEach(item => {
            // 如果内容中存在表情code，则将code替换为图片
            if (notice.content.includes(item.code)) {
              notice.content = notice.content.replace(
                item.code,
                `<img style="display:inline-block;vertical-align:top;" src="${item.url}" class="qq-emotion"/>`,
              );
            }
          });
        });
      });
    },
    // 根据type的类型发送不同的通知请求
    getNotices(type) {
      const params = {
        'page[number]': this.pageNum,
        'page[limit]': this.pageSize,
        'filter[type]': type,
      };
      this.$store.commit('jv/clearRecords', { _jv: { type: 'notification' } });
      this.$store.dispatch('jv/get', ['notification', { params }]).then(res => {
        if (res && res._jv) {
          delete res._jv;
          for (let i = 0; i < res.length; i += 1) {
            res[i].username = res[i].user_name;
            res[i].avatarUrl = res[i].user_avatar;
            if (res[i].created_at) {
              res[i].time = time2DateAndHM(res[i].created_at);
            }
            if (res[i].thread_created_at) {
              res[i].thread_time = time2DateAndHM(res[i].thread_created_at);
            }
            if (res[i].reply_post_created_at) {
              res[i].reply_time = time2DateAndHM(res[i].reply_post_created_at);
            }
            if (res[i].type === 'rewarded' && res[i].amount) {
              res[i].money = `￥${res[i].amount}`;
            }
            if (res[i].type === 'withdrawal' && res[i].cash_actual_amount) {
              res[i].money = `-￥${res[i].cash_actual_amount}`;
            }
          }
          this.noticeList = [...this.noticeList, ...res];
          // 如果是系统消息，解析表情符号
          // #ifndef H5-PLAY || MP-WEIXIN-PLAY
          if (type === 'system') {
            this.getContentEmoji();
          }
          // #endif
          // #ifdef H5-PLAY || MP-WEIXIN-PLAY
          if (type === 'system,threadrewarded,Creceiveredpacket') {
            this.getContentEmoji();
          }
          // #endif
          this.loadingType = res.length === this.pageSize ? 'more' : 'nomore';
          uni.$emit('notiRead');
        }
      });
    },
    // 上拉加载
    pullDown() {
      if (this.loadingType !== 'more') {
        return;
      }
      this.pageNum += 1;
      this.getNotices(this.type);
    },
    // 删除通知
    deleteNotice(id) {
      this.noticeId = id;
      this.$refs.popTips.open();
    },
    // 删除取消
    handleCancel() {
      this.$refs.popTips.close();
    },
    // 删除确认
    handleOk() {
      this.$refs.popTips.close();
      this.$store.dispatch('jv/delete', `notification/${this.noticeId}`).then(res => {
        if (res) {
          this.pageNum = 1;
          this.noticeList = [];
          this.getNotices(this.type);
          uni.showToast({
            title: '删除成功',
            duration: 2000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

.notification-box {
  color: --color(--qui-FC-333);
  background-color: --color(--qui-BG-1);
  transition: $switch-theme-time;

  /deep/ .uni-dialog-title {
    color: #f2b968;
  }
}
/* #ifdef H5-PLAY ||MP-WEIXIN-PLAY */
/deep/ .list-box__system-notice__hl__title {
  font-family: 'PingFang SC';
  font-size: 28rpx;
  font-weight: 400;
  color: #666;
}
/deep/ .list-box__system-notice {
  position: relative;
}
/deep/.list-box__system-notice__hl__time {
  position: absolute;
  bottom: -40rpx;
  left: 34rpx;
  font-family: 'PingFang SC';
  font-size: 24rpx;
  font-weight: 400;
  color: #c5c6cb;
}
/deep/ .list-box__system-notice__con__text {
  font-family: 'PingFang SC';
  font-size: 30rpx;
  font-weight: 400;
  line-height: 46rpx;
}
/deep/ .list-box__ft {
  font-family: 'PingFang SC';
  font-size: 24rpx;
  font-weight: 400;
  color: #c5c6cb;
}
// 回复里的头像框框
/deep/ .list-box__notice__hl-avatar {
  width: auto;
  height: auto;
}
// 回复里的头像框框结束

// 回复里的id字体
/deep/ .list-box__notice__hl-info-username {
  font-family: 'PingFang SC';
  font-size: 26rpx;
  font-weight: 400;
}
// 回复里的id字体结束
// 回复里的回复了我那句话
/deep/ .list-box__notice__hl-info-title {
  font-family: 'PingFang SC';
  font-size: 24rpx;
  font-weight: 400;
  color: #999;
}
// 回复里的回复了我那句话结束
// 回复里的时间
/deep/.list-box__notice__hl-info-time {
  width: 240rpx;
  height: 19rpx;
  font-family: 'PingFang SC';
  font-size: 24rpx;
  font-weight: 400;
  color: #c5c6cb;
}
// 回复里的时间结束
/deep/.list-box__notice__con__wrap {
  background-color: rgba(224, 224, 224, 0.2);
  // opacity: 0.6;
  border-radius: 6rpx;
}
/deep/ .list-box__notice__con__text {
  font-family: 'PingFang SC';
  font-size: 30rpx;
  font-weight: 400;
  line-height: 38rpx;
}
/deep/ .list-box__notice__con__wrap-info {
  font-family: 'PingFang SC';
  font-size: 30rpx;
  font-weight: 400;
  line-height: 38rpx;
}
/* #endif */
</style>
