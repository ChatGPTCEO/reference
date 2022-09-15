<template>
  <view v-if="showPopup" class="uni-popup" :style="uniPopup" @touchmove.stop.prevent="clear">
    <uni-transition
      :mode-class="['fade']"
      :styles="maskClass_transparent"
      :duration="duration"
      :show="showTrans"
      @click="onTap"
    />
    <uni-transition
      :mode-class="['fade']"
      :styles="maskClass"
      :duration="duration"
      :show="showTrans"
      @click="onTap"
    />
    <uni-transition
      :mode-class="ani"
      :styles="transClass"
      :duration="duration"
      :show="showTrans"
      @click="onTap"
    >
      <view class="uni-popup__wrapper-box" @click.stop="clear">
        <slot />
      </view>
    </uni-transition>
  </view>
</template>

<script>
/* eslint-disable */
import uniTransition from '../uni-transition/uni-transition.vue';
/**
 * PopUp 弹出层
 * @description 弹出层组件，为了解决遮罩弹层的问题
 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
 * @property {String} type = [top|center|bottom] 弹出方式
 * 	@value top 顶部弹出
 * 	@value center 中间弹出
 * 	@value bottom 底部弹出
 * @property {Boolean} animation = [ture|false] 是否开启动画
 * @property {Boolean} maskClick = [ture|false] 蒙版点击是否关闭弹窗
 * @event {Function} change 打开关闭弹窗触发，e={show: false}
 */
export default {
  name: 'UniPopupCopy',
  components: {
    uniTransition,
  },
  props: {
    // 开启动画
    animation: {
      type: Boolean,
      default: true,
    },
    // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
    type: {
      type: String,
      default: 'center',
    },
    // maskClick
    maskClick: {
      type: Boolean,
      default: false,
    },
    // 是否禁止滚动事件
    stopTouchMove: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      positionTop: '',
      duration: 300,
      ani: [],
      showPopup: false,
      showTrans: false,
      maskClass: {
        position: 'fixed',
        bottom: 0,
        // #ifdef H5
        top: 420+'rpx',
        // #endif
        // #ifdef H5-PLAY
        top: 500+'rpx',
        // #endif
        // #ifdef MP-WEIXIN
        top: 510+'rpx',
        // #endif
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      maskClass_transparent: {
        position: 'fixed',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      transClass: {
        position: 'fixed',
        left: 0,
        right: 0,
      },
    };
  },
  watch: {
    type: {
      handler: function(newVal) {
        switch (this.type) {
          case 'top':
            this.ani = ['slide-top'];
            this.transClass = {
              position: 'absolute',
              left: 0,
              right: 0,
              top: -4+'px'
            };
            break;
          case 'bottom':
            this.ani = ['slide-bottom'];
            this.transClass = {
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
            };
            break;
          case 'center':
            this.ani = ['zoom-out', 'fade'];
            this.transClass = {
              position: 'fixed',
              /* #ifndef APP-NVUE */
              display: 'flex',
              flexDirection: 'column',
              /* #endif */
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
            };
            break;
        }
      },
      immediate: true,
    },
  },
  created() {
    if (this.animation) {
      this.duration = 300;
    } else {
      this.duration = 0;
    }
  },
  mounted() {
      // #ifdef H5
      const obj = document.querySelector('#navId');
      const { bottom } = obj.getBoundingClientRect();
      this.positionTop = bottom-4;
      // #endif
      this.uniPopup = {
        position: 'fixed',
        /* #ifdef H5 */
        top: this.positionTop+'px',
        /* #endif */
        right: 0,
        bottom: 0,
        left: 0,
        /* #ifndef APP-NVUE */
        'z-index': 200,
        /* #endif */
        overflow: 'hidden',
      }
  },
  methods: {
    clear(e) {
      // TODO nvue 取消冒泡
      e.stopPropagation();
    },
    open() {
      //打开二级分类时页面禁止滑动
      // #ifdef MP-WEIXIN
      this.$emit('changeScroll', false);
      // #endif
      this.showPopup = true;
      this.$nextTick(() => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showTrans = true;
        }, 50);
      });
      this.$emit('change', {
        show: true,
      });
    },
    close(type) {
     //关闭二级分类时页面允许滑动
      // #ifdef MP-WEIXIN
      this.$emit('changeScroll', true);
      // #endif
      this.showTrans = false;
      this.$nextTick(() => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$emit('change', {
            show: false,
          });
          this.showPopup = false;
        }, 300);
      });
    },
    onTap() {
      if (!this.maskClick && !this.maskClass_transparent) return;
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
/* #ifdef MP-WEIXIN */
.uni-popup {
  position: fixed;
  top: 480rpx;
  right: 0;
  bottom: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  z-index: 200;
  /* #endif */
  overflow: hidden;
}
/* #endif */
.uni-popup__mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $uni-bg-color-mask;
  opacity: 0;
}
.mask-ani {
  transition-duration: 0.2s;
  transition-property: opacity;
}
.uni-top-mask {
  opacity: 1;
}
.uni-bottom-mask {
  opacity: 1;
}
.uni-center-mask {
  opacity: 1;
}
.uni-popup__wrapper {
  position: absolute;
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
}
.top {
  top: 0;
  right: 0;
  left: 0;
  transform: translateY(-500px);
}
.bottom {
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateY(500px);
}
.center {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  display: flex;
  flex-direction: column;
  /* #endif */

  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(1.2);
}
.qui-popup-at,
.qui-popup-topic {
  .uni-popup__wrapper-box {
    width: 100%;
    height: 100%;
  }
}
.uni-popup__wrapper-box {
  position: relative;
  top: 20rpx;
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
}
.content-ani {
  transition-duration: 0.2s;
  // transition: transform 0.3s;
  transition-property: transform, opacity;
}
.uni-top-content {
  transform: translateY(0);
}
.uni-bottom-content {
  transform: translateY(0);
}
.uni-center-content {
  opacity: 1;
  transform: scale(1);
}
</style>
