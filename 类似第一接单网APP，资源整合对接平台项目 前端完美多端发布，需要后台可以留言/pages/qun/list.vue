<template>
  <view>
    <customtop2></customtop2>

    <view class="condition">
    	<view class="box container">
        <view class="left_box">
          <view class="items">
            <view class="item" :class="(!params.order || params.order == '' ? 'on' : '')" @click="bindtapSetOrderParams('order', '')">默认</view>
            <view class="item" :class="(params.order == 1 ? 'on' : '')" @click="bindtapSetOrderParams('order', 1)">最新</view>
          </view>
        </view>
        <view class="right_box" @click="onShow_screen_popup();">
        	<view class="screen_switch" :class="JSON.stringify(params_search) != '{}' ? 'on' : ''" bindtap="onShow_screen_popup">
            <u-icon name="grid-fill" size="14" color="" class="icon"></u-icon><span>筛选</span>
          </view>
        </view>
    	</view>
    </view>
    <view class="condition_blank"></view>

    <view class="qun_list" v-if="!loading">
      <view class="container">
        <view class="items" v-if="quns.length > 0">
          <view class="item" v-for="(item, index) in quns">
            <view class="qrcode">
              <view class="shade">遮</view>
              <image class="img" :src="item.qrcode" />
            </view>
            <view class="info">
              <view class="name">{{item.name}}</view>
              <view class="types">
                <span class="span_item">{{item.created_at}}</span>
                <span class="span_item">{{item.number}}人+</span>
              </view>
            </view>
            <view class="btn_box">
              <view class="luckbtn luckbtn-default btn" v-if="item.is_get_contact == 0" @click="getContact(item.id);">加群</view>
              <view class="luckbtn luckbtn-weixin btn" v-if="item.is_get_contact == 1" @click="getContact(item.id);">已查看</view>
            </view>
          </view>
          <u-loadmore :status="loadmore_status" />
        </view>
        <u-empty
          v-if="quns.length == 0"
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/data.png"
          text="暂无内容~"
        >
        </u-empty>
      </view>
    </view>

    <u-popup
      mode="right"
      customStyle="width: 400rpx; height: 100%;"
      :show="screen_popup_show"
      @close="onClose_screen_popup"
    >
      <view class="screen_popup">
        <view class="box">
          <view class="items">
            <view class="item">
              <view class="title">群类型</view>
              <view class="options">
                <span
                  v-for="(item, index) in config.qun.types"
                  :class="(params_search.type == item) ? 'on' : ''"
                  @click="bindtapSetSearchParams_type(item)"
                >
                  {{item}}
                </span>
              </view>
            </view>
          </view>
        </view>
        <view class="btns">
          <view class="btn" @click="bindtapResetSearch">重置</view>
          <view class="btn" @click="bindtapSearch">确定</view>
        </view>
      </view>
    </u-popup>

    <u-popup
      mode="center"
      round="3"
      :show="contact_popup_show"
      @close="onClose_contact_popup"
    >
      <view class="contact_popup">
        <view class="box">
          <view class="tip1">今日免费次数已用完</view>
          <view class="tip2">可获取更多查看次数</view>
          <view class="btns">
            <button class="btn btn1" @click="getContact_one">单次查看</button>
            <button class="btn btn2" @click="switchTab('/pages/account/index')">开通会员</button>
          </view>
          <view class="tip3">单次查看需消耗 <span class="text-danger">{{config.qun.contact_gold}}</span> 金币</view>
          <view class="tip3">普通用户每天可查看 <span class="text-danger">{{config.qun.get_contact_count_default_user}}</span> 金币</view>
          <view class="tip3">会员用户每天可查看 <span class="text-danger">{{config.qun.get_contact_count_vip_user}}</span> 金币</view>
        </view>
      </view>
    </u-popup>

    <u-popup
      :show="qrcode_popup_show"
      :round="10"
      mode="bottom"
      @close="onClose_qrcode_popup"
      :closeable="true"
    >
      <view class="qun_qrcode_popup">
        <view class="tip1">群二维码名片</view>
        <view class="qrcode_img">
          <image @click="previewImage(current_qrcode)" class="img" :src="current_qrcode" />
        </view>
        <view class="tip3">点击放大，长按识别进群~</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { request } from "@/utils/http.js"
import customtop2 from "@/components/customtop2.vue"

export default {
  components: { customtop2 },

  data() {
    return {
      quns: [],
      loading: true,
      loadmore_status: 'loadmore',
      loadmore_finished: false,
      params: {
        page_size: 15,
        page: 1,
        order: '',
      },
      params_search: {},
      current_id: 0,
      getContact_type: 0,
      contact_popup_show: false,
      qrcode_popup_show: false,
      current_qrcode: '',
      config: {
        qun: {}
      },
      screen_popup_show: false,
    }
  },

  onLoad: function (options) {
    request.post('/common/getConfig').then(res => {
      this.config = res.data;
    })

    uni.showLoading();
    this.getQunsPaginate();
  },

  onReachBottom() {
    this.getMore();
  },

  methods: {
    getQunsPaginate: function() {
      let params = this.params;
      request.post('/qun/getQunsPaginate', params).then(res => {
        uni.hideLoading();
        this.loading = false;
        if (res.data.total == 0) return false;

        if (res.data.current_page == 1) {
          this.quns = res.data.data;
        } else {
          this.quns = this.quns.concat(res.data.data);
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
        this.getQunsPaginate();
      }
    },

    bindtapSetOrderParams: function(key, value = '') {
      this.params.page = 1;
      this.params[key] = value;
      this.loading = true;
      this.quns = [];
      uni.showLoading();
      this.getQunsPaginate();
    },

    bindtapSetSearchParams_type: function(value) {
      this.params_search.type = value;
      this.$forceUpdate();
    },

    bindtapResetSearch: function() {
      let params = this.params;
      this.params_search = {};
      this.onClose_screen_popup();

      let array = {};
      array.page = 1;
      array.order = params.order;
      this.params = array;
      this.loading = true;
      this.quns = [];
      uni.showLoading();
      this.getQunsPaginate();
    },

    bindtapSearch: function() {
      let params = this.params;
      let params_search = this.params_search;
      params = Object.assign(params, params_search);
      params.page = 1;

      this.params = params;
      this.loading = true;
      this.quns = [];
      uni.showLoading();
      this.getQunsPaginate();
      this.onClose_screen_popup();
    },

    onShow_screen_popup() {
      this.screen_popup_show = true;
    },

    onClose_screen_popup() {
      this.screen_popup_show = false;
    },

    getContact: function(id) {
      this.current_id = id;
      uni.showLoading({ title: '获取中' });
      let params = {};
      params.one = this.getContact_type;
      params.id = id;
      request.post('/qun/getQrcode', params).then(res => {
        uni.hideLoading();
        if (res.code == 4001) {
          this.contact_popup_show = true;
          return false;
        }
        if (res.code == 400) {
          uni.showToast({
            title: res.message,
            icon: 'none'
          })
          return false;
        }
        this.onClose_contact_popup();
        this.qrcode_popup_show = true;
        this.current_qrcode = res.data;
        this.getQrcodeAfter(id);
      })
    },

    onClose_contact_popup: function() {
      this.contact_popup_show = false;
      this.getContact_type = 0;
    },

    getContact_one: function() {
      this.contact_popup_show = false;
      let that = this;
      uni.showModal({
        title: '提示',
        content: '单次查看将消耗' + that.config.qun.contact_gold + '金币，确认查看？',
        success (res) {
          if (res.confirm) {
            that.getContact_type = 1;
            that.getContact(that.current_id);
          }
        }
      })
    },

    // 查看后
    getQrcodeAfter: function(id) {
      let quns = this.quns;
      if (!quns.length > 0) return false;
      for (var i = 0; i < quns.length; i++) {
        if (quns[i].id == id) {
          quns[i].is_get_contact = 1;
        }
      }
      this.quns = quns;
    },

    onClose_qrcode_popup: function() {
      this.qrcode_popup_show = false;
    },

    previewImage: function(current) {
      let urls = [];
      urls.push(current);
      uni.previewImage({
        current: current,
        urls: urls
      })
    },

    switchTab: function(url) {
      uni.switchTab({ url: url });
    },
  }
}
</script>

<style>
.condition {
	width: 100%;
	height: 48px;
	line-height: 48px;
	background-color: #fff;
	z-index: 99;
	position: fixed;
	left: 0;
  font-size: 28rpx;
}
.condition_blank {
	height: 48px;
}
.condition .left_box {
	float: left;
}
.condition .left_box .items {
  margin-left: -12rpx;
  display: flex;
}
.condition .left_box .items .item {
  margin-left: 8px;
}
.condition .left_box .items .item.on {
  color: #00B38A;
}
.condition .right_box {
	float: right;
}
.condition .right_box .screen_switch.on {
	color: #00B38A;
}
.condition .right_box .screen_switch span {
	margin-left: 3px;
}
.condition .right_box .icon {
  display: inline-block;
}
.screen_popup {
	height: 100%;
}
.screen_popup .box {
	height: calc(100% - 50px);
	overflow-y: scroll;
}
.screen_popup .box .items {
	padding: 28rpx 28rpx 36rpx 28rpx;
}
.screen_popup .items .item {
	margin-top: 20px;
}
.screen_popup .items .item:first-child {
	margin-top: 0;
}
.screen_popup .items .item .title {
  letter-spacing: 1px;
}
.screen_popup .options {
	margin-top: 10px;
	margin-right: -6px;
  margin-bottom: -6px;
}
.screen_popup .options span {
	background-color: #eee;
  font-size: 26rpx;
  border-radius: 1px;
  padding: 3px 8px;
  margin-right: 6px;
  margin-bottom: 6px;
  display: inline-block;
  color: #666;
}
.screen_popup .options span.on {
	background: #00B38A;
	color: #fff;
}
.screen_popup .btns {
	width: 100%;
	height: 50px;
	line-height: 50px;
	box-shadow: 0 -1px 0 #ddd;
	display: flex;
}
.screen_popup .btns .btn {
	flex: 1;
	text-align: center;
}
.screen_popup .btns .btn:last-child {
	background-color: #00B38A;
	color: #fff;
}


.qun_list {
  padding-top: 30rpx;
  padding-bottom: 30rpx;
}
.qun_list .item {
  background-color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 30rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.qun_list .item .qrcode {
  float: left;
}
.qun_list .item .qrcode .img {
  width: 126rpx;
  height: 126rpx;
  vertical-align: top;
  object-fit: cover;
  border-radius: 3px;
  border: 1px solid #eee;
  padding: 3px;
}
.qun_list .item .info {
  float: left;
  margin-left: 10px;
  flex: 1;
}
.qun_list .item .info .name {
  overflow: hidden;
  display: box;
  display: -webkit-box;
  display: -moz-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
.qun_list .item .types {
  font-size: 24rpx;
  color: #999;
  margin-top: 3px;
  margin-left: -5px;
}
.qun_list .item .types .span_item {
  margin-left: 5px;
}
.qun_list .item .btn_box {
  float: right;
}
.qun_list .item .btn_box .btn {
  width: 120rpx;
  font-size: 28rpx;
  margin-left: 10px;
  float: right;
}
.qun_list .item .btn_box .btn1 {
  width: 70px;
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}

.qun_list .qrcode {
  position: relative;
}
.qun_list .qrcode .shade {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 25px;
  height: 25px;
  line-height: 25px;
  background-color: #0d6efd;
  color: #fff;
  text-align: center;
  border-radius: 50%;
  font-size: .75rem;
  opacity: .99;
  z-index: 98;
}

.contact_popup {
	width: 690rpx;
}
.contact_popup .box {
	background-color: #fff;
	padding: 40rpx 32rpx;
	text-align: center;
  border-radius: 3px;
}
.contact_popup .btns {
	margin: 30rpx 0;
	display: flex;
}
.contact_popup .btns .btn {
	width: 47%;
	color: #fff;
}
.contact_popup .btns .btn1 {
	background-color: #5ca75b;
}
.contact_popup .btns .btn2 {
	background-color: #d8b66c;
}
.contact_popup .tip3 {
	color: #999;
	font-size: 24rpx;
  margin-top: 5px;
}
.contact_popup .tip3 span {
  margin: 0 3px;
}

.qun_qrcode_popup {
  padding: 50px 0 60px 0;
  text-align: center;
}
.qun_qrcode_popup .qrcode_img {
  margin-top: 30rpx;
}
.qun_qrcode_popup .qrcode_img .img {
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 3px;
  vertical-align: top;
  object-fit: cover;
  padding: 3px;
}
.qun_qrcode_popup .tip3 {
  font-size: .75rem;
  color: #999;
  margin-top: 30rpx;
}
</style>
