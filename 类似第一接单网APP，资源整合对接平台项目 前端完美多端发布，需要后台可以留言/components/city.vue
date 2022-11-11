<template>
	<u-popup
    :show="city_show"
    @close="setCityHide"
    mode="bottom"
  >

    <view class="city">
      <view class="city_top">
        <view class="box">
          <view class="title">选择地区</view>
          <u-icon name="close" color="" size="" class="close u_icon" @click="setCityHide"></u-icon>
        </view>
      </view>
      <scroll-view scroll-y="true" class="city_list">
        <view v-if="use_all">
          <view class="first">全部</view>
          <view class="bd" @click="setCityReceive(0, '全部');">
            <view class="a">全部</view>
          </view>
        </view>
        
        <view v-if="use_country">
          <view class="first">全国</view>
          <view class="bd" @click="setCityReceive(0, '全国');">
            <view class="a">全国</view>
          </view>
        </view>
        
        <view v-for="(item, index) in citys" :key="index">
          <view class="first">{{index}}</view>
          <view class="bd">
            <view class="a" v-for="(item_city, index_city) in item" @click="setCityReceive(item_city.id, item_city.shortname);">
              {{item_city.shortname}}
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

	</u-popup>
</template>

<script>
import { request } from "@/utils/http.js"

export default {
	name: "city",

	data() {
		return {
			citys: []
		};
	},

  props: {
    city_show: {
      type: Boolean

    },
    use_all: {
      type: Boolean
    },
    use_country: {
      type: Boolean
    }
  },

	mounted: function () {
	  this.getCitys();
	},

	methods: {
		getCitys: function() {
			request.post('/common/getCitys').then(res => {
				this.loading = true;
				this.citys = res.data;
			})
		},

    setCityShow() {
      this.city_show1 = true;
      this.$emit('setCityShow');
    },

		setCityHide: function() {
			this.city_show1 = false;
			this.$emit('setCityHide');
		},

		setCityReceive: function(city_id, city_name) {
			this.setCityHide();
			this.$emit('setCityReceive', city_id, city_name);
		}
	}
}
</script>

<style>
@import url("city");
</style>
