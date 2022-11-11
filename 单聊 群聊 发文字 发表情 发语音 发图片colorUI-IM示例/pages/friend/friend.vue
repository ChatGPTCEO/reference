<template>
	<view>
		<!-- 移到组件中了，暂无用 -->
		<cu-custom bgColor="bg-gradual-pink"><block slot="content">好友</block></cu-custom>
		<view  class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<!-- <view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="DialogModal1">
				<view class="content">
					<text class="cuIcon-friendadd text-grey"></text>
					<text class="text-grey">新的朋友</text>
				</view>
			</view> -->
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="DialogModal1">
				<view class="content">
					<text class="cuIcon-group text-grey"></text>
					<text class="text-grey">群聊</text>
				</view>
			</view>
		</view>
		
		<friends></friends>
		
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择一个群</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding" style="overflow-y: auto;max-height: 600rpx;" >
					<groups></groups>
				</view>
		
			</view>
		</view>
		<view class="cu-bar tabbar bg-white foot">
			<view class="action" @tap="toPage('index')">
				<view class="cuIcon-message">
					<!-- <view class="cu-tag badge">99</view> -->
				</view>
				<view class="text-grey">消息</view>
			</view>
			<view class="action" @tap="toPage('friend')">
				<view class="cuIcon-group">
				</view>
				<view class="text-green">好友</view>
			</view>
			<view class="action" @tap="toPage('my')">
				<view class="cuIcon-my">
				</view>
				<view class="text-grey">我的</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import app from '@/mixins/app.js'
	import im from '@/mixins/im.js'
	export default {
		data() {
			return {
				modalName:null,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
			}
		},
		onUnload() {
			// clearInterval(this.timer)
			// uni.closeSocket();
		},
		mixins:[app,im],
		methods: {
			toPage(type){
				uni.navigateTo({
					url:`/pages/${type}/${type}`
				})
			},
			async showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		},
		onShow(){
			this.needLogin()
		},
		onLoad() {
			this.connectWbsocket()
		}
	}
</script>

<style>

page{
	padding-bottom: 120rpx;
}
</style>
