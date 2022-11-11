<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="header">
			<view class="left flex-row" @tap="goBack" style="justify-content: flex-start;">
				<uni-icons type="arrowleft" size="18"></uni-icons>
				<view style="font-size: 28upx;">成员管理</view>
			</view>
			<view class="center"></view>
			<view class="right" @tap="addMember">添加成员</view>
		</view>
		<!--列表-->
		<scroll-view class="list" scroll-y>
			<view style="height:30upx"></view>
			<view v-for="(item, index) in list" :key="index" class="item flex-column">
				<image v-if="item.face" :src="item.face" class="icon"></image>
				<image v-else src="../../../static/img/face.png" class="icon"></image>
				<text class="text-ellipsis name">{{ item.telephone }}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			groupId: '',
			list: []
		}
	},
	onLoad(option){
		this.groupId = option.groupId
	},
	onShow(){
		if(this.groupId) this.getList()
	},
	methods: {
		addMember(){
			this.toPage('/pages/message/group/create?groupId='+this.groupId)
		},
		getList(){
			this.$util.loading()
			uni.request({
				url: this.$api.getGroupMember,
				data: {
					groupId: this.groupId
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.list = res.data.data.map(item=>{
						item.face = item.face ? this.$api.staticPath + item.face : item.face
						return item
					})
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
.header{
	background-color: #F7F7F7;
}
.list{
	height: calc(100vh - 88upx - var(--status-bar-height));
	
	.item{
		float: left;
		margin-left: 30upx;
		margin-bottom: 30upx;
		
		.icon{
			width: calc((100vw - 150upx) / 4);
			height: calc((100vw - 150upx) / 4);
			border-radius: 10upx;
		}
		
		.name{
			color: #777;
			font-size: 24upx;
			margin-top: 10upx;
		}
	}
}
</style>
