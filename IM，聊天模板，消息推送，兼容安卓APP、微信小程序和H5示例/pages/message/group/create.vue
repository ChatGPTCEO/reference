<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="header" :style="{'padding-right': posRight}">
			<view class="left flex-row" @tap="goBack" style="justify-content: flex-start;">
				<uni-icons type="arrowleft" size="18"></uni-icons>
				<view style="font-size: 28upx;">创建群聊</view>
			</view>
			<view class="center"></view>
			<view @tap="createGroup" class="right">完成</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space"></view>
			<view @tap="toggleItem(item)" v-for="(item, index) in list" :key="index" class="item flex-row">
				<uni-icons v-if="userIds.includes(item.friendUserId)" type="checkbox-filled" size="20" color="#2BA245"></uni-icons>
				<uni-icons v-else type="circle" size="20" color="#999"></uni-icons>
				<view class="title flex-row">{{ item.friendName }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
export default{
	components: { uniIcons },
	data(){
		return {
			groupId: '',
			userId: uni.getStorageSync('userId') || '',
			posRight: '15px',
			userIds: [],
			list: []
		}
	},
	onLoad(option){
		// #ifdef MP-WEIXIN
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.posRight = (menuButtonInfo.width + 20) + 'px'
		// #endif
		this.groupId = option.groupId
		this.getList()
	},
	methods: {
		// 切换选择
		toggleItem(item){
			if(this.userIds.includes(item.friendUserId)){
				this.userIds = this.userIds.filter(userId=>userId != item.friendUserId)
			}else{
				this.userIds.push(item.friendUserId)
			}
		},
		// 创建群聊
		createGroup(){
			if(!this.userIds.length) return
			this.groupId ? this.updateMember() : this.addGroup()
		},
		// 新增群聊
		addGroup(){
			this.$util.loading('创建中')
			uni.request({
				method: 'POST',
				url: this.$api.createGroup,
				data: {
					userId: this.userId,
					groupUserId: JSON.stringify(this.userIds)
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.$util.toast(res.data.msg)
					if(res.data.code) return
					this.goBack()
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('创建失败')
				}
			})
		},
		// 更新群成员
		updateMember(){
			this.$util.loading('保存中')
			uni.request({
				method: 'POST',
				url: this.$api.addGroupMember,
				data: {
					userId: this.userId,
					groupId: this.groupId,
					groupUserId: JSON.stringify(this.userIds)
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.$util.toast(res.data.msg)
					if(res.data.code) return
					this.goBack()
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('保存失败')
				}
			})
		},
		// 获取通讯录
		getList(){
			this.$util.loading('加载中')
			uni.request({
				method: 'POST',
				url: this.$api.getFriends,
				data: {
					userId: uni.getStorageSync('userId')
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.list = res.data.data
					if(this.groupId) this.getMember()
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('获取失败')
				}
			})
		},
		// 获取当前群的成员
		getMember(){
			this.$util.loading('加载中')
			uni.request({
				method: 'POST',
				url: this.$api.getGroupMember,
				data: {
					groupId: this.groupId
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.userIds = res.data.data.map(item=>item.userId)
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
.list{
	height: calc(100vh - 100upx - var(--status-bar-height));
	
	.item{
		width: 100vw;
		height: 100upx;
		padding: 0 30upx;
		box-sizing: border-box;
		
		.title{
			height: 100%;
			box-sizing: border-box;
			width: calc(100vw - 120upx);
			position: relative;
			
			&::after{
				content: '';
				width: 100%;
				height: 2upx;
				background-color: #F6F6F6;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}
	}
}
</style>
