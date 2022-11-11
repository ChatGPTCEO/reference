<template>
  <view>
    <view class="header bg-color">
      <image :src="userInfo.image" class="border rounded-50"
             @tap="chooseUserHeader"
             style="width: 120rpx;height: 120rpx;display: block;margin: 0 auto">
      </image>
    </view>
    <view class="user-info-list">
      <view class="user-info-item">
        <view class="label">昵称</view>
        <view class="content">
          <input type="text" v-model="userInfo.name" :placeholder="userInfo.name"/>
        </view>
      </view>
      <view class="user-info-item">
        <view class="label">邮箱</view>
        <view class="content">
          <input type="text" v-model="userInfo.email" :placeholder="userInfo.email"/>
        </view>
      </view>
      <view class="user-info-item" >
        <view class="label">性别</view>
        <view class="content">
          <radio-group @change="radioChange">
            <label class="radio" v-for="(item, index) in sexList" :key="item.value" style="margin-right: 20rpx">
              <radio :value="item.value"
                      :checked="index === current" />
              {{item.name}}</label>
          </radio-group>
        </view>

      </view>
    </view>
    <view class="mt-2 row" @click="submitUserInfo">
      <view class="row bg-color font-s-5 rounded " style="width: 360rpx;height: 90rpx;">保存修改</view>
    </view>
  </view>
</template>

<script>
import { userInfo as userInfoUrl,fileUploadUrl,modifyUserInfoUrl } from '@/api/index'

export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      sexList: [
        {
          value: '0',
          name: '保密'
        },
        {
          value: '1',
          name: '男'
        },
        {
          value: '2',
          name: '女'
        },
      ],
      current: 0
    }
  },
  onLoad () {
    this.initData()
  },
  methods: {
    initData () {
      this.getUserInfo()
    },
    getUserInfo () {
      this.$R.get(userInfoUrl).then(res => {
        let resUserInfo = res.data
        uni.setStorage({ key: 'userInfo', data: resUserInfo })
        uni.setStorage({ key: 'weChatOpenId', data: resUserInfo.openid })
        this.userInfo = resUserInfo
        this.current = resUserInfo.sex
        console.log(this.userInfo)
      })
    },
    // 提交用户信息
    submitUserInfo(){
      console.log(this.userInfo)
      if(this.userInfo.email === ''){
        delete this.userInfo.email
      }
      this.$R.post(modifyUserInfoUrl,this.userInfo).then(res => {
        uni.showToast({
          title: '修改用户信息成功',
          icon: 'none'
        });
        uni.setStorage({ key: 'userInfo', data: res.data });
        uni.setStorage({ key: 'weChatOpenId', data: res.data.openid });
        this.getUserInfo()
      });
    },
    // 性别改变事件
    radioChange: function(evt) {
      console.log(evt.target.value)
      this.userInfo.sex = evt.target.value
    },
    // 选择用户头像
    chooseUserHeader(){
      let url = this.$R.baseUrl()
      let that = this;
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album','camera '], //从相册选择
        success: function (res) {
          uni.uploadFile({
            url: url+fileUploadUrl, //仅为示例，非真实的接口地址
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              //'file': 'test'
            },
			// 请求头一定要加，否则 iOS 图片上传会失败
			header: {
				'content-type': 'multipart/form-data' 
			},
            success: (uploadFileRes) => {
              console.log(uploadFileRes)
              console.log(JSON.parse(uploadFileRes.data))
              let result = JSON.parse(uploadFileRes.data)
              if(result.code !== 200){
				  console.log(result)
                uni.showToast({
                  title: result.msg,
                  icon: 'none'
                });
              }else {
                that.userInfo.image = result.data
              }
            }
          });
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
  page {
    background-color: #f5f5f5;
  }

  .header {
    padding: 50rpx;
  }

  .user-info-list {
    padding: 50rpx;

    .user-info-item {
      background-color: #ffffff;
      border-radius: 8rpx;
      height: 80rpx;
      padding: 0 20rpx;
      color: #999999;
      margin-bottom: 40rpx;

      .label {
        height: 80rpx;
        line-height: 80rpx;
        display: inline-block;
        vertical-align: top;
        margin-top: 2rpx;
        margin-right: 20rpx;
      }

      .content {
        display: inline-block;
        height: 80rpx;
        line-height: 80rpx;
        input {
          display: inline-block;
          height: 80rpx;
          line-height: 80rpx;
        }
      }

    }
  }
</style>
