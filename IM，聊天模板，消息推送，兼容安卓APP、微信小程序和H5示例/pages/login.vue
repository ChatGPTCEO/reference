<template>
	<view class="container">
		<view class="status_bar"></view>
		<view class="head flex-row">
			<view class="title">登录</view>
		</view>
		<view style="height: 100upx;"></view>
		<input class="input" v-model="form.telephone" type="text" placeholder="手机号" />
		<input class="input" v-model="form.password" type="password" placeholder="登录密码,初始密码为123456" />
		<view class="login" :class="{able: isAbled}" @tap="login">登录</view>
		<view class="tip">
			<view class="item">客户端为DEMO(非商业用途)，如有侵权，请及时联系我们</view>
			<view class="item">反馈地址：<text class="link" @tap="toPage('/pages/web')">点击访问</text></view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			form: {
				telephone: '',
				password: ''
			}
		}
	},
	computed: {
		isAbled(){
			return !this.$validate.isNull(this.form.telephone) && !this.$validate.isNull(this.form.password)
		}
	},
	onShow(){
		uni.clearStorageSync()
	},
	methods: {
		login(){
			// 数据校验
			if(!this.isAbled) return
			if(!this.$validate.isPhone(this.form.telephone)){
				return this.$util.toast('手机号码格式错误')
			}
			if(this.$validate.isNull(this.form.password)){
				return this.$util.toast('请输入登录密码')
			}
			
			// 执行登录
			this.$util.loading()
			uni.request({
				method: 'POST',
				url: this.$api.login,
				data: this.form,
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					if(res.data.code){
						return this.$util.toast(res.data.msg)
					}
					
					// 缓存数据
					let { userId, userFace, userToken, token } = res.data.data
					uni.setStorageSync('userId', userId)
					uni.setStorageSync('userToken', userToken)
					uni.setStorageSync('userFace', userFace ? this.$api.staticPath + userFace : '')
					uni.setStorageSync('token', token)
					
					// 连接
					this.$xbcim.init(token)
					
					// 跳转首页
					this.toTab('/pages/message/index')
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('登录失败')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.tip{
	width: 100%;
	text-align: center;
	padding: 0 30upx;
	position: absolute;
	bottom: 30upx;
	
	.item{
		color: #777;
		font-size: 24upx;
		margin-top: 10upx;
		
		.link{
			color: blue;
			font-size: 24upx;
		}
	}
}
.input{
	height: 80upx;
	padding: 0 20upx;
	margin: 60upx 100upx 0;
	border: 2upx solid #999;
}
.login{
	color: #fff;
	opacity: 0.6;
	margin: 100upx;
	padding: 20upx 0;
	text-align: center;
	border-radius: 10upx;
	background-color: #4CD964;
	
	&.able{
		opacity: 1;
		background-color: #4CD964;
	}
}
</style>
