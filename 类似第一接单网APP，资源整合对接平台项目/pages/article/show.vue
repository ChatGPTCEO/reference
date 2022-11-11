<template>
	<view>
		<customtop top_title="详情"></customtop>

    <view class="container">
      <view class="luckbox top_page">
        {{article.title}}
      </view>

      <view class="luckbox content">
        <view class="bd">
          <rich-text :nodes="article.content"></rich-text>
        </view>
      </view>
    </view>

	</view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop from "@/components/customtop.vue"

export default {
  components: { customtop },

  data() {
    return {
      article: {},
    }
  },

  onLoad(options) {
    uni.showLoading();
    this.id = options.id;
    this.getArticle();
  },

  methods: {
    getArticle: function() {
      request.post('/article/getArticle', {id: this.id}).then(res => {
        uni.hideLoading();
        this.article = res.data;
        console.log(res);
      })
    },
  }
}
</script>

<style>
page {
  padding-bottom: 50rpx;
}
.luckbox {
  margin-top: 30rpx;
}
.top_page {
  font-weight: 600;
}
.content .bd {
	color: #707070;
	line-height: 1.8;
}
</style>
