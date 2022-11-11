<!--
 * @name: 
 * @version: 1.1.1
 * @Author: 刘大可
 * @Date: 2022-03-30 12:08:30
 * @LastEditors: 刘大可
 * @LastEditTime: 2022-03-30 12:32:04
-->
<template>

    <view class="pages">
        <cu-custom bgColor="bgmain" :isBack="true">
            <view slot="backText"></view>
            <view slot="content">登录</view>
        </cu-custom>
        <view class="login"  @tap="bindgetuserinfo">登录</view>
    </view>
</template>
<script>
var app = getApp();

export default {
    data() {
        return {
            
        }
    },
    methods: {
          //用户授权登录
        bindgetuserinfo(data) {
            console.log('打印', data);
            var that = this;
			uni.getUserProfile({
			    desc: '用于获取用户信息',
			    success(res) {
					console.log(res)
					uni.login({
						success(code)
						{
							console.log(code)
							app.globalData.util.request({
							    url: 'Login/miniLogin',
							    data: {
							        code: code.code,
									nickName:res.userInfo.nickName,
									avatar:res.userInfo.avatarUrl,
							    },
								success(user)
								{
									uni.setStorageSync('userinfo',res.userInfo)
									that.loginuserinfo = res.userInfo
									that.setData({
										islogin: true
									})
									console.log(user.data.token)
									uni.setStorageSync('token',user.data.token)
									// that.getUser()
                                    uni.navigateBack({ delta: 1 })
								}
							})
						}
					})
				
				}
			});
			
			// uni.getUserProfile({
			//     desc: '用于获取用户信息',
			//     success(res) {
			// 		console.log(res)
			// 	// app.globalData.util.request({
			// 	//     url: 'entry/wxapp/GetUid',
			// 	//     data: {
			// 	//         code: data.code
			// 	//     },
			// 	}
			// });
            
        },
        
    },
}
</script>
<style lang="scss">
	page{
		background-image: url('https://test.fkynet.net/wximage/login_bg.jpg');
		background-size: 100% 100%;
	}
.pages{
    display:flex;
    flex-direction: column;
    height: 100vh;
}
    .login{
        width: 600rpx;
        height: 100rpx;
        background-color: $main_color;
        border-radius: 10rpx;
        margin-top: auto;
        margin-bottom: 150rpx;
        margin: auto auto 200rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 40rpx;
       
    }
</style>