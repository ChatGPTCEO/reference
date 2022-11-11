<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row">
			<view class="title">群聊</view>
			<view @tap="toPage('/pages/message/group/create')">创建群聊</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space"></view>
			<view v-for="(item, index) in list" :key="index">
				<view class="item flex-row" @tap="toDetail(item)">
					<view class="title">
						<view class="main flex-row">
							<text class="text">{{ item.groupName || '群聊'+item.groupId }}</text>
						</view>
					</view>
				</view>
			</view>
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
			userId: uni.getStorageSync('userId') || '',
			list: []
		}
	},
	onShow(){
		this.getList()
	},
	methods: {
		// 获取列表
		getList(){
			this.$util.loading()
			uni.request({
				url: this.$api.getGroups,
				data: {
					userId: this.userId
				},
				header: this.$util.getHeader(),
				success: res=>{
					uni.hideLoading()
					this.list = res.data.data
				},
				fail: err=>{
					uni.hideLoading()
					this.$util.toast('加载失败')
				}
			})
			
		},
		// 详情
		toDetail(group){
			uni.setStorageSync('groupName', group.groupName || '群聊'+group.groupId)
			this.toPage('/pages/message/group/detail?groupId='+group.groupId)
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
		line-height: 100upx;
		box-sizing: border-box;
		align-items: flex-start;
		
		.title{
			height: 100%;
			box-sizing: border-box;
			width: calc(100vw - 60upx);
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
			
			.sub{
				color: #999;
				font-size: 24upx;
			}
		}
	}
}
</style>
