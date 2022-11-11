<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" v-if="!_isWidescreen"><block slot="content">{{title}}</block></cu-custom>
		
		<view class="page " :class="[modalName=='message'?'show':'',_isWidescreen?' left-window-index-width':'']" v-if="modalName=='message'">
			<messages></messages>
		</view>
		<view class="page " :class="[modalName=='friend'?'show':'',_isWidescreen?' left-window-index-width':'']" v-if="modalName=='friend'">
			<friend-page></friend-page>
		</view>
		<view class="page " :class="[modalName=='my'?'show':'',_isWidescreen?' left-window-index-width':'']" v-if="modalName=='my'">
			<my-page></my-page>
		</view>
		<view class="cu-bar tabbar bg-white " style="" :class="[_isWidescreen?'foot left-window-index-width':'foot']" >
			<view class="action text-green" :class="{'text-gray':modalName!='message'}">
				<view class="cuIcon-message "   data-target="message" @tap="showModal">
					<view class="cu-tag badge" v-if="unread_count"></view>
					<view class="cu-tag badge" v-if="unread_count!=0">
						<block>{{unread_count>99?'99+':unread_count}}</block>
					</view>
				</view>
				<view  class="" >消息</view>
			</view>
			<view class="action text-green":class="{'text-gray':modalName!='friend'}" data-target="friend" @tap="showModal">
				<view class="cuIcon-group " >
				</view>
				<view class="" >好友</view>
			</view>
			<view class="action text-green" :class="{'text-gray':modalName!='my'}" data-target="my" @tap="showModal">
				<view class="cuIcon-my">
				</view>
				<view class="" >我的</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import app from '@/mixins/app'
	import im from '@/mixins/im.js'
	import random_chat from '@/mixins/random_chat.js'
	export default {
		data() {
			return {
				modalName: 'message',
				listTouchStart: 0,
				listTouchDirection: null,
				_isWidescreen:false
			}
		},
		mixins:[app,im,random_chat],
		computed:{
			title(){
				if(this.modalName=='message'){
					return '消息'
				}else if(this.modalName=='friend'){
					return '好友'
				}else if(this.modalName=='my'){
					return '我的'
				}
			}
		},
		methods:{
			modal_name(name){
				this.modalName = name
			}
		},

		onLoad(option) {
			uni.$on('logout',this.logout)
			uni.$on('login',this.login)
			
			uni.$on('modal_name',this.modal_name)//字页面控制主页面显示哪个 
			this.connectWbsocket()
		},
		onUnload() {
			clearInterval(this.im_timer)
			uni.closeSocket();
			uni.$off('logout',this.logout)
			uni.$off('login',this.login)
			uni.$off('modal_name',this.modal_name)
		},
		onShow(){
			this.needLogin()
		},
	}
</script>

<style>
.page{
	max-height: 100vh;
	overflow-y: auto;
}
</style>
