<template>
  <view>
    <!-- #ifndef H5-PLAY || MP-WEIXIN-PLAY -->
    <u-parse
      :content="content | formatRichText"
      :content-parse="contentParse"
      @navigate="navigate"
    ></u-parse>
    <image :src="imgs" mode="" v-if="!!imgs" class="imgsstyle" @click="previewImg(imgs)"></image>
    <!-- #endif -->
    <!-- #ifdef H5-PLAY || MP-WEIXIN-PLAY -->
    <u-parse
      :content="content | formatRichText"
      :content-parse="contentParse"
      @navigate="navigate"
      :is-show-home-pages="type"
      :is-reward="isReward"
    ></u-parse>
    <image :src="imgs" mode="" v-if="!!imgs" class="imgsstyle" @click="previewImg(imgs)"></image>
    <!-- #endif -->
  </view>
</template>
<script>
import uParse from '@/components/feng-parse/parse';
import s9e from '@/utils/s9e';

const url2new = {};
// eslint-disable-next-line dot-notation
url2new['details'] = '/topic/index?id={id}';
url2new['home-page'] = '/pages/profile/index?userId={id}';
let that = null;

export default {
  components: {
    uParse,
  },
  filters: {
    formatRichText(html) {
      return s9e.parse(html, that);
    },
  },
  props: {
    content: {
      type: String,
      default: '',
    },
    contentParse: {
      type: Object,
      default: null,
    },
    imgs: {
      type: String,
      default: '',
    },
    // #ifdef H5-PLAY || MP-WEIXIN-PLAY
    type: {
      type: Number,
      default: -1,
    },
    isReward: {
      type: Boolean,
      default: false,
    },
    // #endif
  },
  data() {
    return {
      that: null,
    };
  },
  created() {
    that = this;
  },
  methods: {
    navigate(url) {
      let toUrl = url;

      // 适应老h5 地址
      // #ifdef H5
      if (toUrl.indexOf(window.location.host) !== -1) {
        // eslint-disable-next-line no-restricted-syntax
        for (const page in url2new) {
          if (toUrl.indexOf(page) !== -1) {
            const id = toUrl.split('/')[4];
            toUrl = url2new[page].replace('{id}', id);
          }
        }
      }
      window.location.href = toUrl;
      // #endif
      // #ifdef MP-WEIXIN
      const httpReg = /^http/g;
      const isHttp = url.match(httpReg);
      if (isHttp === null) {
        uni.navigateTo({
          url,
        });
      } else {
        uni.setClipboardData({
          data: url, // 要被复制的内容
          success: () => {
            // 复制成功的回调函数
            uni.showToast({
              // 提示
              title: '复制成功',
            });
          },
        });
      }
      // #endif
      // #ifndef H5 || MP-WEIXIN
      if (toUrl.indexOf('http') !== -1) {
        toUrl = `/pages/common/view?url=${encodeURIComponent(toUrl)}`;
      }
      uni.navigateTo({
        url: toUrl,
      });
      // #endif
    },
    // 预览图片
    previewImg(current) {
      uni.previewImage({
        urls: [current],
        current,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/base/variable/global.scss';
@import '@/styles/base/theme/fn.scss';
.imgsstyle {
  width: 200rpx !important;
  height: 200rpx !important;
}
</style>
