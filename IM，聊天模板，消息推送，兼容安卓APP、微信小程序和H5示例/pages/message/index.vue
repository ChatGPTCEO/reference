<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row" @tap="closeSwipe" :style="{'padding-right': posRight}">
			<view class="title">消息</view>
			<view @tap="toPage('/pages/message/group/create')">创建群聊</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space" @tap="closeSwipe"></view>
			<uni-swipe-action ref="swipe">
				<uni-swipe-action-item v-for="(item, index) in list" :key="index">
					<view class="item flex-row" @tap="toDetail(item)">
						<view class="cover flex-row flex-column">
							<image v-if="item.type == 'group' && item.groupFace" :src="item.groupFace" class="icon"></image>
							<image v-else-if="item.type == 'single' && item.userFace" :src="item.userFace" class="icon"></image>
							<image v-else src="../../static/img/face.png" class="icon"></image>
							<view v-if="item.unReadNumebr" class="tag empty flex-row flex-column"></view>
						</view>
						<view class="title">
							<view class="main flex-row">
								<!--判断是群聊还是单聊-->
								<text v-if="item.type == 'group'" class="text">{{ item.groupName || '群聊'+item.groupId }}</text>
								<text v-else class="text">{{ item.telephone }}</text>
								<text class="time">{{ item.date }}</text>
							</view>
							<view v-if="item.type == 'group'" class="sub text-ellipsis">{{ item.content }}</view>
							<view v-else class="sub text-ellipsis">{{ item.content }}</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
export default{
	components: { uniIcons,uniSwipeAction,uniSwipeActionItem },
	data(){
		return {
			options:[
				{
					text: '删除',
					style: {
						backgroundColor: '#f9828a'
					}
				}
			],
			posRight: '15px',
			userId: uni.getStorageSync('userId') || '',
			list: []
		}
	},
	onShow(){
		// 监听是否连接成功
		this.$xbcim.onsuccess(()=>{
			console.log('连接成功')
		})
		
		// 监听连接是否错误
		this.$xbcim.onerror((error)=>{
			console.log('error', error)
		})
		
		// 监听Sockect是否断开
		this.$xbcim.onclose(()=>{
			console.log('连接断开')
		})
		
		// 接收消息
		this.$xbcim.onmessage(data=>{
			this.list = this.list.map(item=>{
				switch(item.type){
					case 'group':	// 群消息
						if(data.type == 'group' && item.groupId == data.target){
							item.content = data.content
							item.date = '刚刚'
						}
						break
					case 'single':	// 单聊消息
						if(data.type == 'single' && (item.fromUserId == data.source || item.toUserId == data.source)){
							item.content = data.content
							item.date = '刚刚'
						}
						break
				}
				return item
			})
		})
		
		this.getList()
	},
	onLoad(){
		// #ifdef MP-WEIXIN
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.posRight = (menuButtonInfo.width + 20) + 'px'
		// #endif
	},
	methods: {
		// 关闭滑块
		closeSwipe(){
			this.$refs.swipe.closeOther()
		},
		// 详情
		toDetail(item){
			// 判断是群聊还是单聊
			if(item.type == 'group'){
				uni.setStorageSync('groupName', item.groupName || '群聊'+item.groupId)
				this.toPage('/pages/message/group/detail?groupId='+item.groupId)
			}else{
				let { fromUserId, toUserId, telephone } = item
				let userId = toUserId == this.userId ? fromUserId : toUserId
				this.toPage('/pages/message/chat/index?toUserId='+userId+'&toUserName='+telephone)
			}
		},
		// 切换
		swipeChange(){},
		// 处理消息类型
		dealMessage(msg='', type='text'){
			let ret = msg;
			switch(type){
				case 'voice': ret = '语音消息'; break
				case 'image': ret = '图片'; break
				case 'map': ret = '位置信息'; break
				default: ret = msg
			}
			return ret
		},
		// 获取用户消息
		getList(){
			uni.request({
				url: this.$api.getMsgRecord,
				data: {
					userId: this.userId
				},
				header: this.$util.getHeader(),
				success: res=>{
					let data = res.data.data
					if(data){
						this.list = data.map(item=>{
							item.content = this.dealMessage(item.content, item.msgType)
							item.groupFace = item.groupFace ? this.$api.staticPath + item.groupFace : ''
							item.userFace = item.face ? this.$api.staticPath + item.face : ''
							return item
						})
					}else{
						this.list = []
					}
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
		height: 160upx;
		padding: 30upx;
		box-sizing: border-box;
		align-items: flex-start;
		
		.cover{
			width: 100upx;
			height: 100upx;
			border-radius: 10upx;
			box-sizing: border-box;
			border: 2upx solid #f9f9f9;
			position: relative;
			
			.icon{
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
			
			.tag{
				color: #fff;
				width: 30upx;
				height: 30upx;
				font-size: 20upx;
				border-radius: 50%;
				background-color: red;
				position: absolute;
				top: -12upx;
				right: -12upx;
				z-index: 9;
				
				&.empty{
					width: 20upx;
					height: 20upx;
					background-color: #F72727;
					top: -6upx;
					right: -6upx;
				}
			}
		}
		
		.title{
			height: 100%;
			box-sizing: border-box;
			width: calc(100vw - 130upx - 60upx);
			position: relative;
			
			&::after{
				content: '';
				width: 100%;
				height: 2upx;
				background-color: #F6F6F6;
				position: absolute;
				left: 0;
				bottom: -30upx;
			}
			
			.main{
				height: 40upx;
				margin: 6upx 0 12upx;
				
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
			
			.sub{
				color: #999;
				font-size: 24upx;
			}
		}
	}
}
</style>
