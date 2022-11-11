<template>
	<view>
		<u-popup :show="showWxLogin" mode="bottom" round="44rpx" :closeable="true" @close="onClose">
			<view class="popupBox">
				<view class="h2 bold">获取您的昵称、头像</view>
				<view class="h3">获取用户头像、昵称，主要用于向用户提供具有辨识度的用户中心界面</view>
				<view class="form">
					<view class="input u-flex">
						<view class="h2">头像</view>
						<view class="info">
							<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
								<image class="avatar" :src="avatarUrl || '../../../static/head.png'"></image>
							</button> 
						</view>
						<u-icon name="arrow-right" size="32rpx" color="#999"></u-icon>
					</view>
					<view class="input u-flex">
						<view class="h2">昵称</view>
						<view class="info">
							<input type="nickname" v-module="nickName" placeholder="请输入昵称" @blur="onBlur"/>
						</view>
					</view>
				</view>
				<view class="submit" :style="{background:PrimaryColor}" @click="submit">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	computed: {
		...mapState(['showWxLogin']),
	},
    data() {
        return {
			PrimaryColor: '#1fba1a', //主题色
			avatarUrl:'',
			nickName:''
		}
	},
	methods:{
		...mapMutations(['setShowWxLogin','setUserInfo']),
		onClose(){
			this.setShowWxLogin(false);
		},
		onChooseAvatar(e){
			console.log(e)
			//该图片需要上传到自己服务器--此处没做处理
			this.avatarUrl = e.detail.avatarUrl
		},
		onBlur(e){
			console.log(e)
			this.nickName = e.detail.value
		},
		submit(){
			var that = this
			if(!this.avatarUrl){
				uni.showToast({
					title: '请上传头像~',
					icon: 'none'
				});
				return
			}
			if(!this.nickName){
				uni.showToast({
					title: '请输入昵称~',
					icon: 'none'
				});
				return
			}
			uni.login({
			    success(res){
					let httpData = {
						code:res.code,
						avatarUrl:that.avatarUrl,
						nickName:that.nickName,
					};
					// uni.$u.http.post('/api/Login_capLogin',httpData).then(res => {
					    // 储存登录信息
					    let userInfo = {
					        headLogo:that.avatarUrl,
							nickName:that.nickName,
					        token:true,//token用于判断是否登录
					    }
						console.log(userInfo,'userInfo')
					    that.setUserInfo(userInfo)
						uni.$emit("loginCallback") //全局登录监听回调方法
					    uni.showToast({
					    	title: '登录成功~',
					    	icon: 'none'
					    });
					    that.onClose();
					// });
				}
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.popupBox{
	width: 100%;
	padding: 50rpx 40rpx 30rpx;
	.h2{
		color: #333;
		font-size: 32rpx;
	}
	.h3{
		font-size: 26rpx;
		color: #999;
		line-height: 1.4;
		padding-top: 14rpx;
	}
	.bold{
		font-weight: bold;
	}
	.form{
		margin-top: 30rpx;
		border-top: 1px solid #EFEFEF;
		.input{
			padding: 24rpx 0;
			border-bottom: 1px solid #EFEFEF;
			.info{
				flex:1;
				margin-left: 30rpx;
				.avatar-wrapper{
					width: 70rpx;
					height: 70rpx;
					border-radius: 10rpx;
					.avatar{
						width: 70rpx;
						height: 70rpx;
						border-radius: 10rpx;
					}
				}
				input{
					background: transparent;
					width: 100%;
					height: 70rpx;
					color: #333;
					font-size: 30rpx;
				}
			}
		}
	}
}
.submit{
	margin-top: 30rpx;
	width: 100%;
	height: 92rpx;
	border-radius: 10rpx;
	text-align: center;
	line-height: 92rpx;
	color: #fff;
	font-size: 32rpx;
	background: #E83F3C;
}
</style>