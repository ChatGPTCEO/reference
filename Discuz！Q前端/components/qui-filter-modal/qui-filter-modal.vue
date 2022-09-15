<template>
  <view>
    <!-- #ifndef H5 -->
    <view class="filter-modal" :class="{ show: showValue }" @tap.stop="cancel">
      <view class="filter-modal__content" v-if="showValue" @tap.stop :style="{ top: contentTop }">
        <view class="filter-modal__content__search" v-if="showSearch" @click="searchClick">
          <qui-icon class="icon-search" name="icon-search" size="26" color="#777"></qui-icon>
          {{ i18n.t('search.search') }}
        </view>
        <view v-for="(item, index) in filterList" class="filter-modal__content__item" :key="index">
          <view class="filter-modal__content__item-title">{{ item.title }}</view>
          <view
            v-for="(filterItem, filterIndex) in item.data"
            :class="!filterItem.selected ? '' : 'active'"
            :key="filterIndex"
            @click="changeSelected(filterItem, index, filterIndex)"
            class="filter-modal__content__item-detail"
          >
            {{ filterItem.label }}
          </view>
          <view class="secondLevel" v-if="index === 0">
            <view
              class="secondLevelItem"
              v-for="(SLitem, SLindex) in secondLevelData"
              :key="SLindex"
              @click="secondLevelItem(SLitem, SLindex)"
              :class="isSecondLevelActive === SLindex ? 'isSecondLevelActive' : ''"
            >
              {{ SLitem.name }}
            </view>
          </view>
        </view>
        <view class="filter-modal__content__confirm" @tap.stop="confirm" v-if="ifNeedConfirm">
          {{ confirmText || i18n.t('search.filter') }}
        </view>
      </view>
    </view>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <view
      class="filter-modal"
      :class="{ show: showValue }"
      @tap.stop="cancel"
      @touchmove.self.stop.prevent=""
    >
      <view
        class="filter-modal__content"
        v-if="showValue"
        @touchmove.stop=""
        @tap.stop
        :style="{ top: contentTop }"
      >
        <view class="filter-modal__content__search" v-if="showSearch" @click="searchClick">
          <qui-icon class="icon-search" name="icon-search" size="26" color="#777"></qui-icon>
          {{ i18n.t('search.search') }}
        </view>
        <view v-for="(item, index) in filterList" class="filter-modal__content__item" :key="index">
          <view class="filter-modal__content__item-title">{{ item.title }}</view>
          <view
            v-for="(filterItem, filterIndex) in item.data"
            :class="!filterItem.selected ? '' : 'active'"
            :key="filterIndex"
            @click="changeSelected(filterItem, index, filterIndex)"
            class="filter-modal__content__item-detail"
          >
            {{ filterItem.label }}
          </view>
          <view class="secondLevel" v-if="index === 0">
            <view
              class="secondLevelItem"
              v-for="(SLitem, SLindex) in secondLevelData"
              :key="SLindex"
              @click="secondLevelItem(SLitem, SLindex)"
              :class="isSecondLevelActive === SLindex ? 'isSecondLevelActive' : ''"
            >
              {{ SLitem.name }}
            </view>
          </view>
        </view>
        <view class="filter-modal__content__confirm" @tap.stop="confirm" v-if="ifNeedConfirm">
          {{ confirmText || i18n.t('search.filter') }}
        </view>
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  name: 'FilterModal',
  props: {
    confirmText: {
      type: String,
      default: '',
    },
    ifNeedConfirm: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    filterList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    contentTop: {
      type: String,
      default: '0',
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    categoriesData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      filterIsClick: false,
      showValue: this.value,
      selectedData: [],
      secondLevelData: [], // 二级菜单数据
      secondLevelId: '', // 二级分类id
      isSecondLevelActive: -1, // 二级分类是否激活
      refreshItem: -1, // 刷新二级分类
      num: 0,
    };
  },
  watch: {
    value(n) {
      this.showValue = n;
    },
    showValue(n) {
      this.$emit('input', n);
    },
  },
  mounted() {
    this.categoriesData.forEach(itme => {
      if (itme.checked === 0) {
        this.secondLevelData = itme.children || [];
      }
    });
  },
  methods: {
    confirm() {
      if (!this.filterIsClick) {
        this.filterList[0].data.forEach((val, index) => {
          if (val.value === this.selectedData[0].data.value) {
            this.num = index;
          }
        });
      }
      this.filterIsClick = false;
      this.showValue = false;
      // 如果没有选中默认给每项的第一项
      // const data = [];
      this.selectedData.forEach((v, i) => {
        if (v.data.length === 0) {
          this.filterList[i].data[0].selected = true;
          this.selectedData[i].data.push(this.filterList[i].data[0]);
        }
      });
      this.$emit('confirm', this.selectedData, this.secondLevelId, this.num);
      this.$emit('change', this.filterList);
      this.selectedData = [];
    },
    cancel() {
      this.showValue = false;
      this.$emit('cancel');
      this.selectedData = [];
    },
    // 二级分类点击事件
    secondLevelItem(item, index) {
      this.secondLevelId = item.searchIds;
      this.isSecondLevelActive = index;
    },
    // 筛选的二级分类列表
    getSecondLevel(itemValue) {
      if (this.refreshItem !== itemValue) {
        this.isSecondLevelActive = -1;
      }
      this.secondLevelId = '';
      this.categoriesData.forEach(itme => {
        if (parseInt(itme._jv.id, 10) === itemValue) {
          this.secondLevelData = itme.children || [];
        }
      });
    },
    // dataIndex : 板块index  filterIndex : 细类index
    changeSelected(item, dataIndex, filterIndex) {
      // 区分单选多选
      if (dataIndex === 0) {
        this.filterIsClick = true;
        this.num = filterIndex;
      }
      this.getSecondLevel(parseInt(item.value, 10));
      if (!this.multiSelect) {
        const moduleData = this.filterList[dataIndex].data;
        moduleData.forEach((v, index) => {
          moduleData[index].selected = index === filterIndex;
        });
        this.selectedData[dataIndex].data = { ...item, index: filterIndex };
        // 不需要确定按钮
        if (!this.ifNeedConfirm) {
          this.confirm();
        }
      } else {
        // const moduleData = this.filterList[dataIndex].data;
        // if (moduleData.selected) {
        //   this.filterList[dataIndex].data.selected = false;
        //   this.filterList[dataIndex].data.splice(filterIndex, 1);
        // } else {
        //   this.filterList[dataIndex].data.selected = true;
        //   this.filterList[dataIndex].data.push(item);
        // }
      }
      // 动态改变数据
      this.$emit('change', this.filterList);
    },
    // 传入的值放入选中里面,保证按照分类顺序展示
    setData() {
      const selectedData = [];
      this.filterList.forEach((v, i) => {
        let flag = false;
        v.data.forEach(item => {
          if (item.selected) {
            flag = true;
            selectedData[i] = { title: v.title, data: item };
          }
        });
        if (!flag) {
          selectedData[i] = { title: v.title, data: [] };
        }
      });
      this.selectedData = selectedData;
    },
    // 搜索跳转
    searchClick(evt) {
      this.$emit('searchClick', evt);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
/* 二级列表样式 */
.secondLevel {
  width: calc(100% - 20rpx);
  margin-right: auto;
  margin-left: auto;
  background: #fafafc;
  border-radius: 10rpx;
}
.secondLevelItem {
  display: inline-block;
  height: 60rpx;
  padding: 0 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  font-family: 'PingFang SC';
  font-size: $fg-f3;
  font-weight: 400;
  line-height: 70rpx;
  color: --color(--qui-FC-TAG);
}
.isSecondLevelActive {
  color: #1878f3;
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  color: #ea3d5a;
  /* #endif */
}
.filter-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;
}
@keyframes fadeZoom {
  0% {
    opacity: 0.6;
    transform: scale(0.7);
  }
  80% {
    opacity: 0.3;
    transform: scale(1.2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.filter-modal__content {
  position: absolute;
  width: calc(100% - 60rpx);
  max-height: 800rpx;
  padding: 30rpx;
  overflow-y: auto;
  background: --color(--qui-BG-2);
  border-radius: 10rpx;
  box-sizing: border-box;
  animation: fadeZoom 0.15s linear;
}
.icon-search {
  margin-right: 19rpx;
}
.filter-modal__content__search {
  position: absolute;
  right: 30rpx;
  font-size: $fg-f4;
  color: --color(--qui-FC-777);
}
.filter-modal.show {
  opacity: 1;
  visibility: visible;
}
.filter-modal__content__confirm {
  width: calc(100% - 100rpx);
  height: 90rpx;
  margin-top: 40rpx;
  margin-right: auto;
  margin-left: auto;
  line-height: 90rpx;
  color: --color(--qui-BG-2);
  text-align: center;
  background: --color(--qui-BG-BTN);
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  background: #ea3d5a;
  /* #endif */
  border-radius: 5rpx;
}
.filter-modal__content__item {
  text-align: left;
}
.filter-modal__content__item-title {
  padding-top: 10rpx;
  padding-bottom: 40rpx;
  font-size: $fg-f4;
  font-weight: bold;
}
.filter-modal__content__item-detail {
  display: inline-block;
  height: 70rpx;
  padding: 0 20rpx;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  font-size: $fg-f3;
  line-height: 70rpx;
  color: --color(--qui-FC-TAG);
  background: --color(--qui-BG-F9F);
  border: 2rpx solid --color(--qui-BOR-CCDD);
  border-radius: 7rpx;
  /* #ifndef H5-PLAY || MP-WEIXIN-PLAY */
  &.active {
    color: --color(--qui-FC-FFF);
    background: --color(--qui-MAIN);
    border-color: transparent;
  }
  /* #endif */
  /* #ifdef H5-PLAY || MP-WEIXIN-PLAY */
  &.active {
    color: --color(--qui-FC-FFF);
    background: #ea3d5a;
    border-color: transparent;
  }
  /* #endif */
}
</style>
