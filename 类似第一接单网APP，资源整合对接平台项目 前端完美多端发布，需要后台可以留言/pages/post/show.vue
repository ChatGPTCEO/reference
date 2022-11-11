<template>
  <view>

    <customtop :top_title="top_title"></customtop>

    <view v-if="!loading">

      <view class="container" v-if="post.id">

        <view class="luckbox top_page">
          <view class="title">{{post.title}}</view>
        </view>

        <view class="luckbox" hidden="true">
          <view class="user_info">
            <view class="avatar"><img :src="user.avatar"></view>
            <view class="info">
              <view class="name"><span class="txt">{{user.nickname}}</span></view>
              <view class="types">
                <span class="type">{{user.city_shortname}}</span>
                <span class="type">{{user.company}}</span>
              </view>
            </view>
          </view>
        </view>

        <view class="luckbox typelist">
          <view class="bd">
            <view class="item"><span>合作编号：</span><span>{{post.id}}</span></view>
            <view v-for="(item, index) in post.attributes">
              <view class="item">
                <span>{{item.name}}：</span>
                <span
                  class="span_item"
                  v-for="(item_value, index_value) in item.values"
                >
                  {{item_value}}
                </span>
              </view>
            </view>
            <view class="item"><span>更新时间：</span><span>{{post.refresh_date}}</span></view>
          </view>
        </view>

        <view class="luckbox content">
          <view class="top"><view class="title">详细介绍</view></view>
          <view class="bd">
            <rich-text :nodes="post.content"></rich-text>
          </view>
        </view>

        <view class="luckbox images" v-if="post.images.length > 0">
          <view class="top"><view class="title">图片介绍</view></view>
          <view class="bd">
            <image
              mode="widthFix"
              :src="item.image"
              v-for="(item, index) in post.images"
              bindtap="previewImages"
            />
          </view>
        </view>

        <view class="luckbox contact">
          <view class="top"><view class="title">联系方式</view></view>

          <view class="bd" v-if="contact.is_get_contact == 0">
            <button class="luckbtn luckbtn-default" @click="getContact">查看联系方式</button>
            <view class="remark_info" v-if="user_login.id">您当前为：<span class="text-danger">{{ user_login.vip == 1 ? 'VIP' : '普通' }}用户</span>，今日还有<span class="text-danger count_number">{{contact.today_get_contact_count}}</span>次查看权限，开通会员每日赠送20张查看卡！</view>
          </view>
          <view class="bd" v-if="contact.is_get_contact == 1">
            <view class="contact_item">
              <span>微信：</span>
              <span class="span_items" v-if="post.contact.weixin != ''">
                <span>{{post.contact.weixin}}</span><u-icon class="u_icon" name="file-text" color="" size="" @click="copy(post.contact.weixin);"></u-icon>
              </span>
              <span v-if="post.contact.weixin == ''">未填写</span>
            </view>
            <view class="contact_item">
              <span>手机：</span>
              <span class="span_items" v-if="post.contact.phone != ''">
                <span>{{post.contact.phone}}</span><u-icon class="u_icon" name="file-text" color="" size="" @click="copy(post.contact.phone);"></u-icon>
              </span>
              <span v-if="post.contact.phone == ''">未填写</span>
            </view>
            <view class="contact_item">
              <span>Q Q：</span>
              <span class="span_items" v-if="post.contact.qq != ''">
                <span>{{post.contact.qq}}</span><u-icon class="u_icon" name="file-text" color="" size="" @click="copy(post.contact.qq);"></u-icon>
              </span>
              <span v-if="post.contact.qq == ''">未填写</span>
            </view>
            <view class="contact_item">
              <span>电话：</span>
              <span class="span_items" v-if="post.contact.telphone != ''">
                <span>{{post.contact.telphone}}</span><u-icon class="u_icon" name="file-text" color="" size="" @click="copy(post.contact.telphone);"></u-icon>
              </span>
              <span v-if="post.contact.telphone == ''">未填写</span>
            </view>


            <view class="luckbox contact">
                   <view class="top"><view class="title">免责声明*</view></view>
                   <span>合作之前建议签订合同，激流推客作为信息共享平台，无法对信息的真实性及准确性做出判断，
                   不承担任何财产损失和法律责任，若您不同意该提示，请关闭网页且不要在本站拓展任何合作，
                   否则造成的任何损失由您个人承担。</span>
            </view>



          </view>

        </view>


      </view>

      <view class="foot_action_blank none"></view>
      <view class="foot_action none" v-if="post.id">
        <view class="foot_action_container">
          <view class="btns">
            <button open-type="share" class="btn btn1"><u-icon name="share-square" color="#fff" class="icon"></u-icon>分享</button>
            <button class="btn btn2" bindtap="createPyqImage"><u-icon name="moments" color="#fff" class="icon"></u-icon>朋友圈</button>
          </view>
        </view>
      </view>

      <view v-if="!post.id">
        <u-empty
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/data.png"
          text="内容已下架~"
        >
        </u-empty>
      </view>

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
            <view class="tip3">单次查看需消耗{{config.contact_gold}}金币</view>
          </view>
        </view>
      </u-popup>

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
      top_title: '',
      loading: true,
      post: {},
      user_login: {},
      user: {},
      category: {},
      contact: {},
      getContact_type: 0,
      pyq_img_origin: '',
      pyq_img: '',
      pyq_img_show: false,
      contact_popup_show: false,
    }
  },

  onLoad: function (options) {
    let id = '';
    if (options.id != undefined) {
      id = options.id;
    } else if (options.scene != undefined) {
      let scene = decodeURIComponent(options.scene);
      let obj = util.urlToObj(scene);
      if (obj.id != undefined) {
        id = obj.id;
      }
    }

    request.post('/common/getConfig').then(res => {
      this.config = res.data;
    })
    this.id = id;
    this.getPost();
  },

  methods: {
    getPost: function() {
      uni.showLoading();
      request.post('/post/getPost', {id: this.id}).then(res => {
        uni.hideLoading();
        this.top_title = ( res.data.category.name ? res.data.category.name : '') + '详情';
        uni.setNavigationBarTitle({ title: ( res.data.category.name ? res.data.category.name : '') + '详情' });
        this.loading = false;
        this.post = res.data.post;
        this.user_login = res.data.user_login;
        this.user = res.data.user;
        this.contact = res.data.contact;
      })
    },

    getContact: function() {
      uni.showLoading({ title: '获取中' });
      let params = {};
      params.id = this.id;
      params.one = this.getContact_type;
      request.post('/post/getContact', params).then(res => {
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
        this.contact.is_get_contact = 1;
        this.post.contact = res.data;
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
        content: '单次查看将消耗' + that.config.contact_gold + '金币，确认查看？',
        success (res) {
          if (res.confirm) {
            that.getContact_type = 1;
            that.getContact();
          }
        }
      })
    },

    switchTab: function(url) {
      uni.switchTab({ url: url });
    },

    copy: function(content) {
      wx.setClipboardData({ data: content });
    },
  }
}
</script>

<style>
@import url("show.css");
</style>
