<template>
  <view>

    <customtop top_title="我的金币"></customtop>

    <view class="main">
    	<view class="main_container">
    		<view class="number">
    			<view class="icon"><i class="iconfont icon-jinbi"></i></view>
    			<view class="txt">{{user.gold}}</view>
    			<view class="btn" @click="jumpPage('/pages/account/gold_pay')"><span>充值金币</span></view>
    		</view>
    		<view class="description">小金币有大用途，多领一些存起来吧~</view>
    	</view>
    </view>

    <view class="log" v-if="!loading">
    	<view class="title">金币记录</view>
    	<view v-if="logs.length > 0">
    		<view class="items">
    			<view class="item" v-for="(item, index) in logs">
    				<view class="info">
    					<view class="txt">{{item.description}}</view>
    					<view class="ident">{{item.ident == 'inc' ? '+' : '-'}}{{item.gold}}</view>
    				</view>
    				<view class="date">{{item.created_at}}</view>
    			</view>
    		</view>
    		<u-loadmore :status="loadmore_status" />
      </view>

    	<u-empty
    	  v-if="logs.length == 0"
    	  mode="data"
    	  icon="http://cdn.uviewui.com/uview/empty/data.png"
    	  text="暂无记录~"
    	>
    	</u-empty>
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
      user: {},
      logs: [],
      loading: true,
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
      },
    }
  },

  onShow: function() {
    this.getUser();
    this.getGoldLogsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getUser: function() {
      uni.showLoading();
      request.post('/user/getLoginUser').then(res => {
        uni.hideLoading();
        this.user = res.data;
        this.loading = false;
      })
    },

    getGoldLogsPaginate: function() {
      request.post('/account/getGoldLogsPaginate', this.params).then(res => {
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.logs = res.data.data;
        } else {
          this.logs = this.logs.concat(res.data.data);
        }

        if (this.params.page == res.data.last_page) {
          this.loadmore_finished = true;
          this.loadmore_status = 'nomore';
          return false;
        }

        let params = this.params;
        params.page = parseInt(res.data.current_page) + parseInt(1);
        this.loadmore_status = 'loadmore';
        this.loadmore_finished = false;
        this.params = params;
      })
    },

    getMore: function() {
      if (!this.loadmore_finished) {
        this.loadmore_status = 'loading';
        this.getGoldLogsPaginate();
      }
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
@import url("gold.css");
</style>
