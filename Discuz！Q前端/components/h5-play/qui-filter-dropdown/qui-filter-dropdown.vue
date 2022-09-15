<template>
  <view class="filter-box" v-if="true">
    <view class="filter-box-itme">
      哈哈哈哈哈
    </view>
  </view>
</template>

<script>
export default {
  name: 'FilterModal',
  props: {
    filterList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showValue: this.value,
      selectedData: [],
    };
  },
  watch: {},
  methods: {},
};
</script>

<style lang="scss">
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.filter-box {
  position: absolute;
  top: 476rpx;
  left: 0;
  width: 100%;
  background: #999;
  .filter-box-itme {
    color: crimson;
  }
}
</style>
