<template>
	<view>

    <customtop2></customtop2>

    <view class="items">
      <view class="item" v-for="(item, index) in publish_data" @click="jumpPage(item.url_h5)">
        <view class="title">{{item.name}}</view>
        <view class="description">{{item.description}}</view>
      </view>
    </view>

	</view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop2 from "@/components/customtop2.vue"

export default {
  components: { customtop2 },
  
  data() {
    return {
      loading: true,
      publish_data: [],
      read_agreement: true
    }
  },

  onShow: function () {
    this.getPublishData();
  },

  methods: {
    getPublishData: function() {
      uni.showLoading();
      request.post('/common/getPublishData').then(res => {
        uni.hideLoading();
        this.loading = false;
        this.publish_data = res.data;
      })
    },

    switchTab: function(url) {
      uni.switchTab({
        url: url,
      })
    },

    jumpPage: function(url) {
      uni.navigateTo({
        url: url,
      })
    }
  }
}
</script>

<style>
.items {
	display: flex;
	flex-wrap: wrap;
  justify-content: space-between;
  width: 690rpx;
  margin: 0 auto;
}
.items .item {
	width: 100%;
	margin-top: 30rpx;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 32rpx;
}
.items .item .title {
  letter-spacing: 3px;
}
.items .item .description {
  color: #999;
  font-size: 24rpx;
  margin-top: 12rpx;
}
</style>
