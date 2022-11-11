<template>
	<view class="content">
    <view class="cell-box">
      <u-cell-group :border="false">
        <u-cell-item :border-bottom="false" title="手机号" center 
          :value="userInfo.phone"
          @click="!userInfo.phone ? bindPhone() : ''">
        </u-cell-item>
        <u-cell-item :border-bottom="false" title="收货地址" center 
          @click="chooseAddress">
        </u-cell-item>
      </u-cell-group>
    </view>
    <view class="cell-box">
      <u-cell-group :border="false">
        <u-cell-item :border-bottom="false" title="清除缓存"
          @click="showClear = true"></u-cell-item>
      </u-cell-group>
    </view>
		<view class="logout">
		  <u-button ripple @click="logout">退出登录</u-button>
		</view>
    <u-modal v-model="showClear" content="确认清理存储空间？" show-cancel-button @confirm="clearCache"></u-modal>
    <!-- tips -->
    <u-toast ref="uToast" />
  </view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
        showClear: false,
        version: '1.0.0'
			};
		},
    computed: {
      token () {
        return this.$store.state.token
      },
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    onLoad() {
      let accountInfo = uni.getAccountInfoSync()
      try{
        this.version = accountInfo.miniProgram.version || '1.0.0'
      }catch(e){
        //TODO handle the exception
      }
    },
    methods: {
      bindPhone () {
        this.$u.route({
          url: 'pages/login/bindPhone',
          params: {
            type: 1
          }
        })
      },
      chooseAddress () {
        uni.chooseAddress({
          complete: function () {
            uni.showToast({
              title: '请到微信设置中允许微信打开',
              icon: 'none'
            })
          }
        })
      },
      toRoute (params) {
        this.$u.route(params)
      },
      // 退出登录
      logout () {
        this.$u.post('/api/logout')
        .then((res) => {
          this.$store.commit('logOut')
          uni.showToast({
            title: res.message
          })
          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/login/login'
            })
          }, 1500)
        })
      },
      // 清空缓存
      clearCache() {
        try {
          uni.clearStorageSync();
          uni.showToast({
            title: '清空缓存成功'
          })
        } catch (e) {
          // error
          uni.showToast({
            title: '清空缓存失败',
            icon: 'none'
          })
        }
      }
    }
	}
</script>

<style lang="scss">
page {
  background-color: $bg;
}
.content {
  padding: $gutter;
}
.cell-box {
  margin-bottom: $gutter;
  border-radius: $uni-border-radius-lg;
  overflow: hidden;
}
.logout {
  width: 460rpx;
  margin: 115rpx auto 30rpx;
}
</style>
