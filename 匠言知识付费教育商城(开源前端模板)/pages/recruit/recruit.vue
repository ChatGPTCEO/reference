/**
 * 匠言知识付费v2.0.0
 * Author: 山西匠言网络科技有限公司
 * 这不是一个免费软件，它受限于许可条款，你可以访问https://www.zsfzxkc.cn/获取更多详细信息。
 * This is not a free software, it under the license terms, you can visit https://www.zsffzxkc.cn/ get more details.
 */
<template>
	<view class="container">
		
		<view class="beijing">
			<image src="../../static/jszm.jpg" mode="aspectFill"></image>
		</view>
		
		
		<form @submit="submit" :model="applyForm">
			<input class="name" v-model="applyForm.name" type="text" placeholder="请输入姓名" />
			<input class="phone" v-model="applyForm.phone" type="text" placeholder="请输入您的手机号" />
			<view class="code">
				<input type="text" v-model="applyForm.code" placeholder="请输入您的验证码" />
				<text class="shuxian">|</text>
				<view class="sendcode" @click="sendCode">{{timetext}}</view>
			</view>
			
			<view class="submit">
				<button form-type="submit">立即申请</button>
			</view>
		</form>
		
		
	</view>
</template>

<script>
	import { postTeacherJsreg, postSendCode } from '@/request/tutor'
	import {checkUserinfo} from '@/request/checkUserinfo'
	export default {
		data() {
			return {
				userinfo: {},
				is_sh: 0,
				flag:false,
				timetext:'获取验证码',
				applyForm: {
					name: '',
					phone: '',
					code: '',
					uid: ''
				}
			};
		},
		onShow() {
			checkUserinfo()
			let userinfo=uni.getStorageSync('userinfo')
			this.userinfo = userinfo.userdata
		},
		onShareAppMessage(res) {
			let path = getCurrentPages()
			let path_share = path[0].$page.fullPath
			let path_title = path[0].data.title
			let userinfo = uni.getStorageSync('userinfo')
			let base_set = uni.getStorageSync('base_set')
			if(userinfo.uid=='' || !userinfo.uid){
				uni.navigateTo({
					url:'../login/login'
				})
				return {
					title: '请先登录后再分享给好友',
					path: ''
				}
			}else{
				if (res.from === 'button') {
					
				}
				return {
					title: base_set.title,
					path: `${path_share}?pid=${userinfo.uid}`
				}
			}
		},
		methods: {
			submit () {
				if(this.applyForm.name == '' || this.applyForm.code == '' || this.applyForm.phone == '') {
					uni.showToast({
						title: '名称、手机号、验证码不能为空',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				if(!/^\d{6}$/.test(this.applyForm.code)) {
					uni.showToast({
						title: '验证码必须为6为数字',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				if(!/^1[3-9]\d{9}$/.test(this.applyForm.phone)) {
					uni.showToast({
						title: '手机号码格式不正确,请重试',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				let userinfo=uni.getStorageSync('userinfo')
				this.applyForm.uid = userinfo.uid
				postTeacherJsreg(this.applyForm).then(res => {
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title: '提交成功，等待审核',
							duration: 2000
						});
						setTimeout(()=>{
							uni.switchTab({
								url:'../user/user'
							})
						},1500)
					}else{
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
						})
					}
					
				})
			},
			sendCode(){
				var time = 60;
			   //设置点击标记，防止60内再次点击生效
				var phone = this.phonenum;
				const BASE_URL=uni.BASE_URL
				if(phone==''){
				  uni.showToast({
					  title: '手机号码不能为空',
					  duration: 2000,
					  icon:'none'
				  });
				  return false;
				}
				else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){
					uni.showToast({
						title: '手机号码格式不正确,请重试',
						duration: 2000,
						icon:'none'
					});
					return false;
				}else{
					this.flag = true;
				}
				if(this.flag){
					var timer = setInterval( ()=> {
						if(time == 60 && this.flag){
							this.flag = false;
							uni.request({
								url: BASE_URL+'index/user/sendcode',
								data: {
									phone:phone
								},
								method:'POST',
								success:(res) =>{
									console.log(res.data);
									if(res.data.data.Code=='OK' || res.data.data.code==0){
										uni.showToast({
											title: '已发送',
											duration: 2000
										});
									}
								},
								fail:(res)=> {
									console.log(res.data);
								}
							});
						}else if(time == 0){
							clearInterval(timer);
							time = 60;
							this.flag = false;
							this.timetext="获取验证码"
						}else {
							this.flag = true;
							this.timetext=time+' s'
							time--;
						}
					},1000);
				}
			}
		}
	}
</script>

<style lang="less" scoped>

.beijing {
	image {
		width: 750upx;
		height: 350upx;
	}
	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 55upx;
		left: 300upx;
		image {
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
		}
		text {
			font-size: 34upx;
			color: #fff;
			margin-top: 20upx;
		}
	}
}

form {
	.name, .phone {
		width: 690upx;
		height: 80upx;
		border: 2upx solid #333;
		border-radius: 10upx;
		margin: 20upx 30upx 0;
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.code {
		width: 690upx;
		height: 80upx;
		// background-color: orange;
		margin: 20upx 30upx 0;
		box-sizing: border-box;
		display: flex;
		position: relative;
		.shuxian {
			position: absolute;
			top: 16upx;
			right: 200upx;
			color: #ddd;
		}
		input {
			width: 490upx;
			height: 80upx;
			border: 2upx solid #333;
			border-right: 0;
			border-radius: 10upx 0 0 10upx;
			padding-left: 20upx;
			box-sizing: border-box;
		}
		.sendcode {
			width: 200upx;
			height: 80upx;
			text-align: center;
			line-height: 76upx;
			border: 2upx solid #333;
			border-left: 0;
			border-radius: 0 10upx 10upx 0;
			font-size: 30upx;
			color: #333;
			// padding: 0;
			box-sizing: border-box;
			background-color: #f5f5f5;
		}
	}
	.submit {
		width: 100%;
		height: 120upx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		button {
			width: 690upx;
			height: 80upx;
			background-color: #4b89ff;
			border-radius: 80upx;
			color: #fff;
			line-height: 80upx;
		}
	}
}



</style>
