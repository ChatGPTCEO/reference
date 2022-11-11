<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row" :style="{'padding-right': posRight}">
			<view class="title">通讯录</view>
			<view @tap="addFriend">添加</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space"></view>
			<view v-for="(item, index) in list" :key="index" class="item flex-row" @tap="toDetail(item)">
				<view class="cover flex-row">
					<image src="../../static/img/face.png" class="icon"></image>
					<view class="tag empty flex-row flex-column"></view>
				</view>
				<view class="title flex-row">{{ item.friendName }}</view>
			</view>
			
			<!--添加好友-->
			<uni-popup ref="addFriend">
				<view class="add-friend">
					<view class="title">添加好友</view>
					<input class="input" v-model="telephone" type="text" placeholder="请输入手机号" />
					<view @tap="addFriendAction" class="btn" :class="{disabled: !telephone}">添加</view>
					<view @tap="cancelAdd" class="close">
						<uni-icons type="closeempty" size="26" color="#999"></uni-icons>
					</view>
				</view>
			</uni-popup>
		</scroll-view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
export default{
	components: { uniIcons },
	data(){
		return {
			posRight: '15px',
			list: [],
			telephone: ''
		}
	},
	onLoad(){
		// #ifdef MP-WEIXIN
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.posRight = (menuButtonInfo.width + 20) + 'px'
		// #endif
		this.getList()
	},
	methods: {
		// 取消添加
		cancelAdd(){
			this.$refs.addFriend.close()
			this.telephone = ''
		},
		// 添加好友
		addFriend(){
			this.$refs.addFriend.open()
		},
		addFriendAction(){
			if(!this.$validate.isPhone(this.telephone)){
				return this.$util.toast('手机号格式错误')
			}
			
			this.$util.loading('添加中')
			uni.request({
				method: 'POST',
				url: this.$api.addFriend,
				data: {
					userId: uni.getStorageSync('userId'),
					telephone: this.telephone
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					if(res.data.code){
						return this.$util.toast(res.data.msg)
					}
					this.$refs.addFriend.close()
					this.telephone = ''
					this.getList()
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('添加失败')
				}
			})
		},
		// 详情
		toDetail(item){
			let { friendUserId, friendName } = item
			this.toPage('/pages/message/chat/index?toUserId='+friendUserId+'&toUserName='+friendName)
		},
		// 获取好友列表
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
.add-friend{
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
.list{
	height: calc(100vh - 100upx - var(--status-bar-height));
	
	.item{
		width: 100vw;
		padding: 20upx 30upx 0;
		box-sizing: border-box;
		
		.cover{
			width: 80upx;
			height: 80upx;
			border-radius: 10upx;
			box-sizing: border-box;
			border: 2upx solid #f9f9f9;
			position: relative;
			
			.icon{
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
		
		.title{
			height: 100%;
			box-sizing: border-box;
			width: calc(100vw - 110upx - 60upx);
			position: relative;
			
			&::after{
				content: '';
				width: 100%;
				height: 2upx;
				background-color: #F6F6F6;
				position: absolute;
				left: 0;
				bottom: -34upx;
			}
			
			.main{
				margin: 6upx 0;
				
				.text{
					color: #333;
					font-size: 32upx;
					font-weight: 600;
				}
				
				.time{
					color: #666;
					font-size: 24upx;
				}
			}
		}
	}
}
</style>
