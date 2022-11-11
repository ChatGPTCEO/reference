<template>
	<view class="bg-w flex center alcenter" style="height: 100vh;">
		<view style="width: calc(100% - 60rpx); padding-bottom: 300rpx;">
			<view class="text-center">
				<image class="site-logo"></image>
			</view>
			<view v-if="step == 1" class="mt32">
				<view class="text-center  ft14 cl-main ftw500">
					是否允许获取您的微信头像和昵称？
				</view>
				<view class="mt40 flex alcenter center">
					<button class="btn-mid"  :style="{color:tempColor,background:'#F5F6FA'}">拒绝</button>
					<button class="btn-mid"  @click="getInfo" :style="getBtnStyle" style="margin-left: 30rpx;">允许</button>
				</view>
			</view>
			<view v-if="step == 2" class="mt32">
				<view class="text-center ft14 cl-main ftw500">
					使用微信授权手机号进行实名登录
				</view>
				<view class="mt40">
					<button open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber" class="btn-big" :style="getBtnStyle">
						<text class="iconfont icon-weixin1 mr10 ft20"></text>微信授权手机号
					</button>
				</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default{
		data(){
			return {
				step:1,
				form:{
					code:'',
					face:'',
					sex:'',
					nickName:'',
				},
			}
		},
		onLoad(){
			uni.login({
				provider:'weixin',
				success:(res)=>{
					this.form.code = res.code;
				},
			});
		},
		methods:{
			getInfo(){
				wx.getUserProfile({
				      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				      success: (res) => {
				        this.form.face = res.userInfo.avatarUrl;
						this.form.sex  = res.userInfo.gender;
						this.form.nickName = res.userInfo.nickName;
						this.step = 2;
				      }
				});
			},
			decryptPhoneNumber(e){
				let encryptedData = e.detail.encryptedData;
				let  iv = e.detail.iv;
				//登录逻辑
				console.log(e);
				
			}
		}
	}
</script>

<style>
	.site-logo{
		width: 180rpx;
		height: 180rpx;
		border-radius: 90rpx;
		box-shadow: 0rpx 2rpx 10rpx 0rpx rgba(197, 202, 219, 0.5);
		background: #F2F2F2;
	}
</style>