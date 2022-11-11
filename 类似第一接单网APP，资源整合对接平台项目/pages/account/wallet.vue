<template>
  <view>
    
    <customtop top_title="我的钱包"></customtop>
    
    <view class="container" v-if="!loading">
    
      <view class="wallet_top luckbox">
        <view class="txt"><span>钱包余额</span><span class="price">{{user.wallet}}</span></view>
        <view class="btns">
          <span class="luckbtn luckbtn-default btn1" @click="jumpPage('/pages/account/wallet_withdraw')">提现</span>
          <span class="luckbtn luckbtn-payment btn2" @click="jumpPage('/pages/account/wallet_pay')">充值</span>
        </view>
      </view>
    
      <view class="log_list luckbox">
      	<view class="top"><span class="title">钱包明细</span></view>
      	<view class="items" v-if="logs.length > 0">
      		<view class="item" v-for="(item, index) in logs">
      			<view class="info">
      				<view class="txt">{{item.description}}</view>
      				<view class="ident">{{item.ident == 'inc' ? '+' : '-'}}{{item.price}}</view>
      			</view>
      			<view class="date">{{item.created_at}}</view>
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
    this.getWalletLogsPaginate();
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

    getWalletLogsPaginate: function() {
      request.post('/account/getWalletLogsPaginate', this.params).then(res => {
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
        this.getWalletLogsPaginate();
      }
    },

    jumpPage: function(url) {
      uni.navigateTo({ url: url });
    }
  }
}
</script>

<style>
page {
  padding-bottom: 60rpx;
}
.luckbox {
  margin-top: 30rpx;
}
.wallet_top {
	text-align: center;
	padding-top: 40rpx;
	padding-bottom: 50rpx;
}
.wallet_top .txt span {
	display: block;
}
.wallet_top .txt span.price {
	font-size: 68rpx;
}
.wallet_top .txt span.price i {
	font-size: 32rpx;
	margin-right: 6px;
	font-style: normal;
}
.wallet_top .btns {
	margin-top: 32rpx;
  display: flex;
  justify-content: center;
}
.wallet_top .btns .luckbtn {
	width: 200rpx;
  margin: 0 5px;
}

.log_list .items {
  border-top: 1px solid #f5f5f5;
  padding-top: 30rpx;
}
.log_list .items .item {
	border-bottom: 1px solid #f5f5f5;
  padding-bottom: 30rpx;
  margin-bottom: 30rpx;
}
.log_list .items .info {
	overflow: hidden;
}
.log_list .items .info .txt {
	float: left;
}
.log_list .items .info .ident {
	float: right;
	color: #61e7ce;
	font-weight: 600;
}
.log_list .items .item .date {
	font-size: 24rpx;
	color: #999;
	margin-top: 5px;
}
</style>
