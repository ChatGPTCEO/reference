<template>
  <qui-page :data-qui-theme="theme" class="favorite">
    <view class="favorite-head">
      <!-- 草稿显示那栏 -->
      <qui-cell-item
        :title="`${totalData}${i18n.t('profile.item')}草稿`"
        :border="false"
      ></qui-cell-item>
      <!-- 草稿显示那栏结束 -->
    </view>
    <view class="favorite-content">
      <view v-for="(item, index) in data" :key="index" class="favorite-content__item">
        <qui-thread-item
          :bottomicon="false"
          :currentindex="index"
          :thread="item"
          @toTopic="toTopic"
          @handleClickShare="handleClickShare"
        ></qui-thread-item>
        <!-- 编辑功能 -->
        <qui-icon name="icon-link" size="27" color="#aaa" @tap="toCompile(item)"></qui-icon>
        <text @tap="toCompile(item)" class="icon-links">编辑</text>
        <!-- 编辑功能结束 -->
        <!-- 删除功能 -->
        <qui-icon
          name="icon-delete"
          size="27"
          color="#aaa"
          @tap="itemDelete(item._jv.id, item.isFavorite, index)"
        ></qui-icon>
        <text
          style="color: rgb(170, 170, 170);  "
          @tap="itemDelete(item._jv.id, item.isFavorite, index)"
          class="icon-deletes"
        >
          删除
        </text>
        <!-- 删除功能结束 -->
      </view>
    </view>
    <uni-popup ref="popTips" type="center">
      <uni-popup-dialog
        type="warn"
        :before-close="true"
        :content="i18n.t('确定删除这条草稿吗？')"
        @close="handleCancel"
        @confirm="handleOk"
      ></uni-popup-dialog>
    </uni-popup>
  </qui-page>
</template>

<script>
import { status } from '@/library/jsonapi-vuex/index';
import forums from '@/mixin/forums';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog';

export default {
  components: { uniPopupDialog },
  mixins: forums,
  props: {
    userId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loadingType: '',
      data: [],
      query: {},
      totalData: 0, // 总数
      pageSize: 20,
      pageNum: 1, // 当前页数
      currentItem: '',
      editThreadId: '',
      nowThreadId: '',
      refresherTriggered: false,
      scrollViewStyle: '',
      isShow: true,
    };
  },
  created() {
    // 动态设置scroll-view高度，使下拉刷新在小程序端生效
    try {
      const res = uni.getSystemInfoSync();
      this.scrollViewStyle = `height: ${res.windowHeight}px;`;
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    } catch (e) {
      // error
    }
  },
  mounted() {
    this.loadlikes();
  },
  onPullDownRefresh() {
    this.pageNum = 1;
    this.loadlikes();
  },
  onReachBottom() {
    this.pullUp();
  },
  onLoad() {
    // #ifdef MP-WEIXIN
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
    // #endif
  },
  onShow() {
    this.uploadItem();
  },
  // // 唤起小程序原声分享（微信）
  // onShareAppMessage(res) {
  //   // 来自页面内分享按钮
  //   if (res.from === 'button') {
  //     const threadShare = this.$store.getters['jv/get'](`/threads/${this.nowThreadId}`);
  //     return {
  //       title: threadShare.type === 1 ? threadShare.title : threadShare.firstPost.summaryText,
  //       path: `/topic/index?id=${this.nowThreadId}`,
  //     };
  //   }
  // },
  // // 分享到朋友圈
  // onShareTimeline() {
  //   return {
  //     title: this.forums.set_site.site_name,
  //     query: '',
  //   };
  // },
  methods: {
    toTopic(id) {
      this.editThreadId = id;
    },
    handleClickShare(id) {
      this.nowThreadId = id;
    },
    loadlikes() {
      this.loadingType = 'loading';
      const params = {
        include:
          'user,user.groups,firstPost,firstPost.images,category,threadVideo' +
          ',question,question.beUser,question.beUser.groups,firstPost.postGoods,threadAudio',
        'page[number]': this.pageNum,
        'page[limit]': this.pageSize,
      };
      status
        .run(() => this.$store.dispatch('jv/get', ['thread/draft', { params }]))
        .then(res => {
          if (this.pageNum === 1) {
            this.totalData = 0;
            this.data = [];
          }
          if (res._jv) {
            this.totalData = res._jv.json.meta.threadCount;
            delete res._jv;
          }
          this.loadingType = res.length === this.pageSize ? 'more' : 'nomore';
          this.data = [...this.data, ...res];
        })
        .finally(() => {
          uni.stopPullDownRefresh();
        });
    },
    handleCancel() {
      this.$refs.popTips.close();
    },
    handleOk() {
      this.$refs.popTips.close();
      const { currentItem } = this;
      // const params = {
      //   _jv: {
      //     type: 'threads',
      //     id: currentItem.id,
      //   },
      //   isFavorite: currentItem.isFavorite !== true,
      // };
      this.$store.dispatch('jv/delete', `threads/${currentItem.id}`).then(() => {
        this.totalData -= 1;
        this.data.splice(currentItem.index, 1);
      });
    },
    // 删除收藏
    itemDelete(id, isFavorite, index) {
      const currentItem = { id, isFavorite, index };
      this.currentItem = currentItem;
      this.$refs.popTips.open();
    },
    // 上拉刷新
    pullUp() {
      if (this.loadingType !== 'more') {
        return;
      }
      this.pageNum += 1;
      this.loadlikes();
    },
    // 下拉刷新
    pullDown() {
      this.pageNum = 1;
      this.refresherTriggered = true;
      this.loadlikes();
    },
    uploadItem() {
      if (!this.editThreadId) {
        return;
      }
      const item = this.$store.getters['jv/get'](`threads/${this.editThreadId}`);
      this.data.forEach((data, index) => {
        if (data._jv.id === this.editThreadId) {
          this.editThreadId = '';
          this.$set(this.data, index, item);
        }
      });
    },
    toCompile(num) {
      if (num.type === 5 && num.questionTypeAndMoney.type === 0) {
        uni.redirectTo({
          url: `/pagesplay_web/reward-to-ask?type=${num.type}&operating=draft&threadId=${num._jv.id}&fromdrafts=${this.fromdrafts}`,
        });
      } else {
        uni.redirectTo({
          url: `/topic/post?type=${num.type}&operating=draft&threadId=${num._jv.id}&fromdrafts=${this.fromdrafts}&isredbag=${num.isRedPacket}&categoryId=${num.category._jv.id}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';

.scroll-y {
  max-height: 100vh;
}
.favorite /deep/ {
  .favorite-head {
    padding-top: 20rpx;
    padding-left: 40rpx;
    background: --color(--qui-BG-2);
  }
  .cell-item__body {
    height: 78rpx;
  }
  .themeCount .addFine {
    display: none;
  }
  .themeCount .addAsk {
    display: none;
  }
  .themeCount .icon-delete {
    position: absolute;
    top: 35rpx;
    right: 40rpx;
  }
  /deep/ .themeItem {
    margin: 0;
    border: none;
    border-radius: 0;
    min-height: 300rpx;
  }
  .favorite-content__item {
    position: relative;
  }
  .icon-delete {
    position: absolute;
    right: 104rpx;
    bottom: 18rpx;
    font-size: 30rpx;
    color: rgb(170, 170, 170);
  }
  .icon-deletes {
    position: absolute;
    right: 42rpx;
    bottom: 12rpx;
    font-size: 30rpx;
    color: rgb(170, 170, 170);
  }
  .icon-links {
    position: absolute;
    bottom: 12rpx;
    left: 72rpx;
    font-size: 30rpx;
    color: rgb(170, 170, 170);
  }
  .icon-link {
    position: absolute;
    bottom: 18rpx;
    left: 42rpx;
    font-size: 30rpx;
    color: rgb(170, 170, 170);
  }
}
</style>
