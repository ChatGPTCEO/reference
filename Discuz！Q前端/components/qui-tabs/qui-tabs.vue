<template>
  <view class="qui-tabs">
    <view
      v-for="(item, index) in values"
      :class="index === currentIndex ? 'qui-tabs__item--active qui-tabs__item' : 'qui-tabs__item'"
      :key="index"
      @tap="onClick(index)"
    >
      <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
      <text v-if="brief" class="qui-tabs__item__brief">
        {{ item.brief }}
      </text>
      <!-- #endif -->
      <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
      <text
        v-if="brief"
        :class="index === currentIndex ? 'qui-tabs__item__brief active' : 'qui-tabs__item__brief'"
      >
        {{ item.brief }}
      </text>
      <!-- #endif -->
      <text class="qui-tabs__item__title">
        {{ item.title }}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'QuiTabs',
  props: {
    current: {
      type: Number,
      default: 0,
    },
    values: {
      type: Array,
      default() {
        return [];
      },
    },
    brief: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: '#1878F3',
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    current(val) {
      if (val !== this.currentIndex) {
        this.currentIndex = val;
      }
    },
  },
  created() {
    this.currentIndex = this.current;
  },
  methods: {
    onClick(index) {
      this.currentIndex = index;
      this.$emit('clickItem', { currentIndex: index });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.qui-tabs {
  display: flex;
  flex-direction: row;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  background: --color(--qui-BG-2);
  /* #endif */
  border-bottom: 2rpx solid --color(--qui-BOR-ED);
  box-sizing: border-box;
  transition: $switch-theme-time;
}
.qui-tabs__item {
  position: relative;
  display: inline-flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30rpx;
  box-sizing: border-box;
}
.qui-tabs__item__brief {
  font-size: $fg-f4;
  color: --color(--qui-FC-333);
  transition: $switch-theme-time;
}
.qui-tabs__item__title {
  font-size: $fg-f2;
  color: --color(--qui-FC-AAA);
}
.qui-tabs__item--active {
  position: relative;
  &:after {
    position: absolute;
    bottom: -2rpx;
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    bottom: 17rpx;
    /* #endif */
    width: 100%;
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    width: 34rpx;
    /* #endif */
    height: 4rpx;
    background: --color(--qui-MAIN);
    /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
    background-color: #ea3d5a;
    /* #endif */
    content: '';
  }
}
.qui-tabs__item--active .qui-tabs__item__title {
  font-weight: bold;
  color: --color(--qui-FC-333);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  color: #ea3d5a;
  /* #endif */
}
/* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
.active {
  color: #ea3d5a;
}
/* #endif */
</style>
