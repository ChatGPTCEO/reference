<template>
  <view>

    <customtop top_title="钱包提现"></customtop>

    <view class="container" v-if="!loading">

      <form class="luckform" @submit="formSubmit">
        <view class="items">
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">钱包余额</view>
            </view>
            <view class="weui-cell__bd">
              <input class="weui-input" type="text" disabled="true" :value="'¥' + user.wallet" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">提现金额</view>
            </view>
            <view class="weui-cell__bd">
              <input name="price" class="weui-input" type="text" placeholder="¥" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">支付宝账号</view>
            </view>
            <view class="weui-cell__bd">
              <input name="alipay_account" class="weui-input" type="text" placeholder="" value="" />
            </view>
          </view>
          <view class="item weui-cell">
            <view class="weui-cell__hd">
              <view class="weui-label">账号名字</view>
            </view>
            <view class="weui-cell__bd">
              <input name="alipay_name" class="weui-input" type="text" placeholder="支付宝账号名字" value="" />
            </view>
          </view>
        </view>

        <view class="btnbox">
          <button class="luckbtn luckbtn-default" formType="submit">提交信息</button>
        </view>
      </form>

    <view class="luckbox">
      <view class="top"><span class="title">提现记录</span></view>

      <view v-if="logs.length > 0">
        <uni-table border class="log_list">
        	<uni-tr>
        		<uni-th class="utable_th" width="125">申请时间</uni-th>
        		<uni-th class="utable_th" width="85">金额</uni-th>
        		<uni-th class="utable_th" width="105">审核状态</uni-th>
        	</uni-tr>
        	<uni-tr v-for="(item, index) in logs">
        		<uni-td class="utable_td">{{item.created_at}}</uni-td>
        		<uni-td class="utable_td">{{item.price}}</uni-td>
        		<uni-td class="utable_td">
              <view v-if="item.status == 0">审核中</view>
              <view v-if="item.status == 1">已审核</view>
              <view v-if="item.status == 2">
                审核失败
                <i class="iconfont icon-wenhao icon_question" @click="showStatusMessage(item.message != '' ? item.message : '无留言');"></i>
              </view>
            </uni-td>
        	</uni-tr>
        </uni-table>
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
      loading: true,
      user: {},
      logs: [],
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
    this.getWalletWithdrawalLogsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    formSubmit: function(e) {
      uni.showLoading();
      let that = this;
      let params = e.detail.value;
      request.post('/account/wallet_withdraw', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            icon: 'none',
            title: '申请成功，等待系统审核~',
            success: function() {
              setTimeout(function(){
                that.getUser();
                that.logs = [];
                that.params.page = 1;
                that.getWalletWithdrawalLogsPaginate();
              }, 1500)
            }
          });
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    getUser: function() {
      uni.showLoading();
      request.post('/user/getLoginUser').then(res => {
        uni.hideLoading();
        this.user = res.data;
        this.loading = false;
      })
    },

    getWalletWithdrawalLogsPaginate: function() {
      request.post('/account/getWalletWithdrawalLogsPaginate', this.params).then(res => {
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
        this.getWalletWithdrawalLogsPaginate();
      }
    },

    showStatusMessage: function(message) {
      uni.showModal({
        showCancel: false,
        confirmText: '我知道了',
        content: message
      })
    }
  }
}
</script>

<style>
@import url("@/static/weui.min.css");
page {
  padding-bottom: 60rpx;
}
.luckform .items {
  margin-top: 30rpx;
}
.luckform .btnbox {
  margin-top: 30rpx;
}
.luckbox {
  margin-top: 60rpx;
}
.utable_th {
  font-size: 28rpx;
}
.utable_td {
  font-size: 24rpx;
}
.icon_question {
  margin-left: 3px;
}
</style>
