<template>
	<view>
		<!-- 移到组件中了，暂无用 -->
		<cu-custom bgColor="bg-gradual-pink"><block slot="content">我的</block></cu-custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-if="!hasLogin" @tap="showModal" data-target="DialogModal1">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey">请登录</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							
						</view>
					 </view>
				</view>
				<view class="btn-group justify-around">
					<button class="cu-btn bg-green shadow-blur round">登录</button>
				</view>
			</view>
			<view class="cu-item" v-else>
				<view class="cu-avatar round lg" :style="[{'background-image':'url('+user.avatar+')'}]"></view>
				<view class="content">
					<view class="text-grey">{{user.name}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							当前账号已登录过{{user.token_length||0}}台设备
						</view> </view>
				</view>
			
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择一个马甲登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding" style="overflow-y: auto;max-height: 600rpx;" >
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="item,index in users" :key="index">
							<view class="cu-avatar round lg" :style="[{'background-image':'url('+item.avatar+')'}]"></view>
							<view class="content">
								<view class="text-cut text-grey">{{item.name}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										当前账号已登录过{{item.token_length||0}}台设备
									</view> </view>
							</view>
							<view class="btn-group justify-around">
								<button class="cu-btn bg-green shadow-blur round" @tap="login(item)">选它</button>
							</view>
						</view>
					</view>
				</view>
		
			</view>
		</view>
		
		<view v-if="hasLogin" class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="showModal" data-target="DialogModal1">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">切换账号</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''" @tap="logout()">
				<view class="content">
					<text class="cuIcon-explorefill text-grey"></text>
					<text class="text-grey">退出</text>
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
				<view class="text-gray">好友</view>
			</view>
			<view class="action" @tap="toPage('my')">
				<view class="cuIcon-my">
				</view>
				<view class="text-green">我的</view>
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
				modalName:'',
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
			}
		},
		mixins:[app,im],
		computed:{
		},

		methods: {
	
			async showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				var res = await this.$store.dispatch('app/users')
			},

			login(user){
				
				this.$store.dispatch('login',{email:user.email,password:'password'}).then(res=>{
					this.modalName = null
				})
			},
			logout(){
				
				this.$store.dispatch('logout')
				uni.closeSocket();
				// uni.reLaunch({
				// 	url:'/pages/my/my'
				// })
			}
		},
		async onLoad(){
			if(!this.hasLogin){
				console.log('您还没有登录')
			}
			this.connectWbsocket()
		}
	}
</script>

<style>

</style>
