<template>
  <!-- 列表 -->
  <view
    class="det-person-box"
    :style="'paddingBottom:' + btnShow ? '80rpx' : '50rpx; background:' + listBg"
  >
    <!-- 有多少个人支付 -->
    <view class="det-per-number" v-if="canReward && personNum != 0">
      {{ personNum }}{{ t.persenUnit }}{{ type }}
    </view>
    <!-- 有多少个人支付结束 -->
    <!-- 支付人头像 -->
    <view class="det-per-list" v-if="canReward && personRes.length > 0">
      <view class="det-person" v-for="(person, index) in personRes" :key="index">
        <view @click="personJump(person.id)">
          <qui-avatar v-if="person.showAvatar" :user="person" size="50" />
        </view>
      </view>
    </view>
    <!-- 支付人头像结束 -->
    <view class="fold-box" v-if="personNum > limitCount">
      <!--<qui-icon
        name="icon-unfold"
        :style="{ transform: transform }"
        class="unfold"
        @click="foldClick"
      ></qui-icon>-->
      <image
        src="/static/unfold.svg"
        class="unfold"
        @click="foldClick"
        :style="{ transform: transform }"
      ></image>
    </view>
    <!-- 支付红色弹窗框 -->
    <button class="det-per-btn" v-if="btnShow" :style="{ background: btnBg }" @click="btnClick">
      <qui-icon
        :name="'icon-' + btnIconName"
        :color="btnTextColor"
        class="qui-icon"
        v-if="btnIconShow"
      ></qui-icon>
      <view :style="{ color: btnTextColor }">{{ btnText }}</view>
    </button>
    <!-- 支付红色弹窗框结束 -->
    <view class="red_bag_proper" v-if="redbag">
      <image src="../../static/h5-play/redbao.png" mode="aspectFit" class="imgstyleing"></image>
      <text>该主题含红包，{{ condition === 0 ? `回复` : `点赞${likenum}个` }}即可瓜分，</text>
      <view>
        <text>
          共
          <text class="redbig">{{ number }}</text>
          个，已领取
          <text class="redbig">{{ yet_get }}</text>
          个，还剩
          <text class="redbig">{{ remainNumber }}</text>
          个，
          <text class="redbig">分完即止</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 类型
    type: {
      default: '类型',
      type: String,
    },
    // list总数
    personNum: {
      default: '0',
      type: [Number, String],
    },
    // 初始化显示数量
    limitCount: {
      default: '10',
      type: [Number, String],
    },
    // list列表
    personList: {
      default: () => {
        return [];
      },
      type: Array,
    },
    // 是否显示按钮
    btnShow: {
      default: true,
      type: Boolean,
    },
    // 按钮背景色
    btnBg: {
      default: '#fa5151',
      type: String,
    },
    listBg: {
      default: '--color(--qui-BG-2)',
      type: String,
    },
    // 按时是否显示icon
    btnIconShow: {
      default: true,
      type: Boolean,
    },
    // icon的name值
    btnIconName: {
      default: '',
      type: String,
    },
    // 按钮text
    btnText: {
      default: '按钮',
      type: String,
    },
    // 按钮text颜色
    btnTextColor: {
      default: '#ffffff',
      type: String,
    },
    redbag: {
      // 是不是红包，是就显示
      type: Boolean,
      default: false,
    },
    number: {
      // 红包的总数
      type: [Number, String],
      default: 0,
    },
    remainNumber: {
      // 红包的剩余数
      type: [Number, String],
      default: 0,
    },
    condition: {
      // 领取方式，如果是0那就是评论帖子，是1就是点赞帖子
      type: [Number, String],
      default: 0,
    },
    likenum: {
      type: [Number, String],
      default: 1,
    },
    canReward: {
      type: Boolean,
      default: true,
    },
  },
  data: () => {
    return {
      personRes: [],
      foldStatus: false,
      transform: '',
    };
  },
  computed: {
    t() {
      return this.i18n.t('topic');
    },
    yet_get() {
      return this.number - this.remainNumber;
    },
  },
  watch: {
    // 监听得到的数据
    personList: {
      handler(newVal) {
        newVal.map(item => {
          const person = item;
          person.showAvatar = true;
          return person;
        });
        // this.personRes = newVal;
        this.personRes = this.limitArray(newVal, this.limitCount);
      },
      deep: true,
      immediate: true,
    },
    number: {
      handler(newVal) {
        this.number = newVal;
      },
    },
    remainNumber: {
      handler(newVal) {
        this.remainNumber = newVal;
      },
    },
  },
  created() {
    this.$forceUpdate();
  },
  methods: {
    // 数组取前几条数据
    limitArray(obj, limit) {
      const arr = [];
      Object.values(obj).forEach((item, index) => {
        if (index >= limit) {
          return;
        }
        arr.push(item);
      });
      return arr;
    },
    // 展开 折叠
    foldClick() {
      this.foldStatus = !this.foldStatus;
      if (this.foldStatus) {
        this.transform = 'rotate(180deg)';
        this.personRes = this.limitArray(this.personList, this.personNum);
      } else {
        this.transform = '';
        this.personRes = this.limitArray(this.personList, this.limitCount);
      }
    },
    personJump(param) {
      this.$emit('personJump', param);
    },
    btnClick(param) {
      this.$emit('btnClick', param);
    },
    // 头像失效
    imageError(person) {
      const item = person;
      item.showAvatar = false;
      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.det-person-box {
  display: flex;
  flex-direction: column;
  padding: 0 0 80rpx;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  padding-bottom: 18rpx !important;
  /* #endif */
  text-align: center;
  background: --color(--qui-BG-2);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  border-radius: 4rpx;
  /* #endif */
  align-items: center;
  .det-per-number {
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    margin-top: 47rpx;
    /* #endif */
    font-size: $fg-f4;
    color: --color(--qui-FC-AAA);
    text-align: center;
  }
  .det-per-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 30rpx 0;
  }
  .det-person {
    width: 50rpx;
    height: 50rpx;
    margin: 0 3rpx 10rpx 4rpx;
    border-radius: 50%;
  }

  .det-per-btn {
    display: flex;
    width: 465rpx;
    height: 90rpx;
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    margin-top: 33rpx;
    margin-bottom: 33rpx;
    /* #endif */
    flex-direction: row;
    justify-content: center;
    font-size: $fg-f4;
    line-height: 90rpx;
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */

    background: #ea3d5a !important;
    border-radius: 43rpx;
    &:after {
      border: none;
    }
    /* #endif */
    .qui-icon {
      margin-right: 13rpx;
      font-size: 36rpx;
      line-height: 90rpx;
    }
  }
}
.fold-box {
  padding: 0 0 30rpx;
  .unfold {
    width: 34rpx;
    height: 34px;
    transition: transform 200ms;
    transform-origin: 50% 50%;
  }
}
.red_bag_proper {
  position: relative;
  width: 690rpx;
  height: 195rpx;
  padding: 37rpx 134rpx 38rpx 53rpx;
  font-size: 28rpx;
  color: #000;
  text-align: left;
  background: #fefbf5;
  border-radius: 6px;
  box-sizing: border-box;
  .imgstyleing {
    position: absolute;
    top: -60rpx;
    right: 60rpx;
    width: 148rpx;
    height: 125rpx;
  }
  .redbig {
    color: #d23a2a;
  }
  text {
    font-family: 'PingFang SC';
    font-weight: bold;
    line-height: 46rpx;
  }
}
</style>
