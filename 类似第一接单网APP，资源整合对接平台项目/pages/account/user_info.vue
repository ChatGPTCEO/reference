<template>
	<view class="container">
    
    <customtop top_title="个人信息"></customtop>

    <form class="luckform" @submit="formSubmit">
      <view class="items">
        <view class="weui-cell item_avatar weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
          <view class="weui-cell__hd">
            <view class="weui-label">头像</view>
          </view>
          <view class="weui-cell__bd right" @click="uploadAvatar">
            <image mode="aspectFill" :src="form.avatar" class="avatar"></image>
            <input name="avatar" hidden="true" :value="form.avatar" />
          </view>
        </view>
        <view class="item weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">昵称</view>
          </view>
          <view class="weui-cell__bd right">
            <input name="nickname" class="weui-input" type="text" placeholder="" :value="form.nickname" />
          </view>
        </view>
        <view class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
          <view class="weui-cell__hd">
            <view class="weui-label">性别</view>
          </view>
          <view class="weui-cell__bd" @click="setSexShow">
            {{form.sex ? form.sex : '请选择'}}
            <input hidden="true" name="sex" :value="form.sex" />
          </view>
        </view>
        <view class="weui-cell weui-cell_active weui-cell_access weui-cell_select weui-cell_select-after">
          <view class="weui-cell__hd">
            <view class="weui-label">地区</view>
          </view>
          <view class="weui-cell__bd" @click="setCityShow">
            {{form.city_shortname ? form.city_shortname : '请选择'}}
            <input hidden="true" name="city_id" :value="form.city_id ? form.city_id : ''" />
          </view>
        </view>
        <view class="item weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">所在公司</view>
          </view>
          <view class="weui-cell__bd right">
            <input name="company" class="weui-input" type="text" placeholder="请输入所在公司" :value="form.company" />
          </view>
        </view>
        <view class="item weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">担任职位</view>
          </view>
          <view class="weui-cell__bd right">
            <input name="job_title" class="weui-input" type="text" placeholder="请输入担任职位" :value="form.job_title" />
          </view>
        </view>
        <view class="item weui-cell">
          <view class="weui-cell__hd">
            <view class="weui-label">个人简介</view>
          </view>
          <view class="weui-cell__bd right">
            <input name="introduce" class="weui-input" type="text" placeholder="请输入个人简介" :value="form.introduce" />
          </view>
        </view>
      </view>

      <view class="btnbox">
        <button class="luckbtn luckbtn-default" formType="submit">保存资料</button>
        <button class="luckbtn luckbtn-secondary logout" @click="logout">退出登录</button>
      </view>
    </form>

    <view class="user_id">
      <span>USER ID</span>
      <span>{{form.id}}</span>
    </view>

    <view>
      <u-picker
        :show="set_sex_show"
        :columns="set_sex_columns"
        @confirm="setSexConfirm"
        @close="setSexClose"
        @cancel="setSexClose"
        :closeOnClickOverlay="true"
      >
      </u-picker>
      <city :city_show="city_show" :use_all="false" :use_country="false" @setCityHide="setCityHide" @setCityReceive="setCityReceive"></city>
    </view>

	</view>

</template>

<script>
import { request, upload } from "@/utils/http.js"
import city from "@/components/city.vue"
import customtop from "@/components/customtop.vue"

export default {
  components: {
    city,
    customtop
  },

  data() {
    return {
      form: {},
      set_sex_show: false,
      set_sex_columns: [],
      city_show: false,
    }
  },

  onLoad: function() {
    this.getUser();
  },

  methods: {
    getUser: function() {
      uni.showLoading();
      request.post('/user/getLoginUser').then(res => {
        uni.hideLoading();
        if (res.data.id) {
          this.form = res.data;
        }
      })
    },

    formSubmit: function(e) {
      uni.showLoading();
      let params = e.detail.value;
      request.post('/user/update', params).then(res => {
        uni.hideLoading();
        if (res.code == 200) {
          uni.showToast({
            icon: 'none',
            title: '操作成功',
            duration: 1500,
            mask: true,
            success: function() {
              setTimeout(function() {
                uni.navigateBack();
              }, 1500);
            }
          })
        } else if (res.code == 400) {
          uni.showToast({ title: res.message, icon: 'none' });
        }
      })
    },

    uploadAvatar: function() {
      var that = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          uni.showLoading();
          let tempFilePaths = res.tempFilePaths;
          let formData = {type: 'user'};
          upload(tempFilePaths[0], formData).then(res => {
            uni.hideLoading();
            if (res.code == 200) {
              that.form.avatar = res.data.url;
            } else {
              uni.showToast({title: res.message, icon: 'none'});
            }
          })
        }
      })
    },

    setSexShow: function() {
      this.set_sex_columns = [['男', '女']];
      this.set_sex_show = true;
    },

    setSexClose: function() {
      this.set_sex_show = false;
    },

    setSexConfirm: function(event) {
      this.form.sex = event.value[0];
      this.setSexClose();
    },

    setCityShow: function() {
      this.city_show = true;
    },

    setCityHide: function() {
      this.city_show = false;
    },

    setCityReceive: function(city_id, city_name) {
      this.form.city_shortname = city_name;
      this.form.city_id = city_id;
    },

    logout: function() {
      uni.showModal({
        title: '提示',
        content: '确认退出？',
        success (res) {
          if (res.confirm) {
            uni.showLoading({title: '退出中'});
            request.post('/account/logout').then((res) => {
              uni.removeStorageSync('user_token');
              uni.navigateBack({ delta: 1 });
            });
          }
        }
      })
    },
  }
}
</script>

<style>
@import url("user_info.css");
</style>
