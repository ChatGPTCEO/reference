<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row">
			<view class="title">我的</view>
		</view>
		<view class="items flex-row">
			<text class="label">账号</text>
			<text class="value">{{ user.telephone }}</text>
		</view>
		<view @tap="uploadFace" class="items flex-row">
			<text class="label">头像</text>
			<view class="flex-row">
				<image v-if="user.face" :src="user.face" class="face"></image>
				<image v-else src="../../static/img/face.png" class="face"></image>
				<uni-icons type="arrowright" size="18" color="#999"></uni-icons>
			</view>
		</view>
		
		<view @tap="logout" class="main-btn flex-column">退出登录</view>
		
		<!--修改名称-->
		<uni-popup ref="edit">
			<view class="dialog">
				<view class="title">我的昵称</view>
				<input class="input" v-model="nickname" type="text" placeholder="请输入群聊名称" />
				<view @tap="editAction" class="btn" :class="{disabled: !nickname}">完成</view>
				<view @tap="cancelEdit" class="close">
					<uni-icons type="closeempty" size="26" color="#999"></uni-icons>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default{
	data(){
		return {
			userId: uni.getStorageSync('userId') || '',
			user: {},
			nickname: ''
		}
	},
	onLoad(){
		this.getDetail()
	},
	methods: {
		logout(){
			this.$xbcim.close()
			uni.clearStorageSync()
			this.toPage('/pages/login')
		},
		showEdit(){
			this.groupName = this.group.name
			this.$refs.edit.open()
		},
		cancelEdit(){
			this.$refs.edit.close()
		},
		editAction(){
			if(this.$validate.isNull(this.groupName)) return
			this.$util.loading('保存中')
			uni.request({
				method: 'POST',
				url: this.$api.updateGroupName,
				data: {
					groupId: this.groupId,
					userId: this.userId,
					name: this.groupName
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.$util.toast(res.data.msg)
					if(!res.data.code){
						this.$refs.edit.close()
						this.group.name = this.groupName
						uni.setStorageSync('groupName', this.groupName)
					}
				},
				fail: res=>{
					uni.hideLoading()
					this.$util.toast('保存失败')
				}
			})
		},
		// 上传头像
		uploadFace(){
			uni.chooseImage({
				count: 1,
				success: chooseRes=>{
					const tempFilePaths = chooseRes.tempFilePaths
					
					this.$util.loading('上传中')
					tempFilePaths.forEach(temp=>{
						uni.uploadFile({
							url: this.$api.uploadUserFace,
							filePath: temp,
							formData: {
								groupId: this.groupId,
								userId: this.userId
							},
							name: 'file',
							header: this.$util.getHeader(),
							success: uploadRes=>{
								uni.hideLoading()
								if(uploadRes.data.code) return
								let data = JSON.parse(uploadRes.data)
								this.user.face = this.$api.staticPath + data.data
								uni.setStorageSync('userFace', this.user.face)
							}
						})
					})
				}
			})
		},
		// 获取信息
		getDetail(){
			this.$util.loading()
			uni.request({
				url: this.$api.getUserInfo,
				data: {
					userId: this.userId
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.user = res.data.data
					this.user.face = this.user.face ? this.$api.staticPath + this.user.face : ''
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('获取失败')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.status_bar,
.head{
	background-color: #F7F7F7;
}
.items{
	height: 100upx;
	padding: 0 30upx;
	background-color: #FFF;
	border-bottom: 2upx solid #F2F2F2;
	
	.label{
		color: #666;
		font-size: 32upx;
	}
	
	.value{
		color: #999;
		font-size: 30upx;
	}
	
	.face{
		width: 60upx;
		height: 60upx;
		border-radius: 10upx;
	}
}
.main-btn{
	color: red;
	height: 100upx;
	padding: 0 30upx;
	margin-top: 100upx;
	background-color: #FFF;
}
.dialog{
	width: 600upx;
	height: 460upx;
	padding: 0 40upx;
	border-radius: 10upx;
	background-color: #FFF;
	position: relative;
	
	.close{
		position: absolute;
		right: 20upx;
		top: 20upx;
	}
	
	.title{
		height: 120upx;
		font-size: 32upx;
		text-align: center;
		line-height: 120upx;
	}
	
	.input{
		height: 80upx;
		padding: 0 30upx;
		border-radius: 10upx;
		margin: 40upx 0 80upx;
		border: 2upx solid #ddd;
	}
	
	.btn{
		color: #FFF;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 10upx;
		background-color: #2CA246;
		
		&.disabled,
		&:active{
			opacity: 0.8;
		}
	}
}
</style>
