<template>
	<view class="u-p-20 ">
		<view class="topic bg-white u-p-20 text-blue u-line-2" v-if="topic">{{topic.content}}</view>
		<u-gap height="100"></u-gap>
		<view v-for="(item,index) in message" :key="index" class="u-m-b-80">
			<view v-if="item.to_id==vuex_user.id">
				<view class="u-light-color u-p-20" style=" text-align: center;">{{$u.timeFormat(item.createtime,'mm/dd，hh:MM:ss')}}</view>
				<view class="u-flex u-col-top">
						<u-avatar :src="baseUrl+params.avatar" class="u-m-r-20"></u-avatar>
					<view class="bg-white chat-left u-main-color u-font-lg" style="margin-right: 120rpx;">{{item.content}}</view>
					<text style="margin-left: -100rpx;" >
					<text style="color: red;" v-if="item.status==0">未读</text>
					<text v-if="item.status==1">已读</text>
					</text>
				</view>
			</view>

			<view  v-if="item.from_id==vuex_user.id">
				<view class="u-light-color u-p-20" style=" text-align: center;">{{$u.timeFormat(item.createtime,'mm/dd，hh:MM:ss')}}</view>
				<view class="u-flex u-col-top u-row-right">
					<text style="margin-right: -100rpx;" >
					<text style="color: red;" v-if="item.status==0">未读</text>
					<text v-if="item.status==1">已读</text>
					</text>
					<view class=" chat-right u-main-color u-font-lg" style="margin-left: 120rpx;background: #83e065;">
						{{item.content}}</view>
						<u-avatar :src="baseUrl+vuex_user.avatar" class="u-m-l-20"></u-avatar>
				</view>
			</view>
		</view>
		<view class="bottom u-flex">
			<u-search search-icon="chat" placeholder="" bg-color="rgba(255,255,255,0.5)" border-color="#1296bd"
				:show-action="true" action-text="发送" :input-style="{background:'transparent'}"
				:action-style="{borderRadius:'30rpx',background:'#1296DB',height:'60rpx',lineHeight:'60rpx',color:'white'}"
				class="u-flex-1" @custom="send"></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:this.$u.http.config.baseUrl,
				message: [],
				topic: {},
				params:{},
			}
		},

		async onLoad(e) {
			this.params=e
				const res = await this.$u.api.messageDetail({topic:e.topic})
				this.message = res.data.message
				this.topic = res.data.topic
			if(this.params.created==0&&this.message.length>0){
				this.params.created = this.message[0].created
			}
			setTimeout(() => {  
			   uni.pageScrollTo({scrollTop: 99999, duration: 0});  
			}, 50);  
		},

		methods: {
			async send(val) {
				const param = {
					content:val,
					topic_id:this.params.topic,
					to_id:this.params.uid,
					created:this.params.created,
					type:1 //1为论坛
					};
				const res = await this.$u.api.send(param)
				this.message = res.data.message
				setTimeout(() => {
					uni.pageScrollTo({
						scrollTop: 9999
					})
				}, 100)
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: #F1F1F1;
	}
	.topic{
		position: fixed;
		top: 10rpx;
		left: 10rpx;
		right:10rpx;
		z-index: 2;
	}
	.chat-left,
	.chat-right {
		position: relative;
		border: solid 2rpx #E4E7ED;
		padding: 20rpx;
		border-radius: 20rpx;
		text-align: justify;
	}
	.chat-left::before,
	.chat-left::after,
	.chat-right::before,
	.chat-right::after {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		top: 25rpx;
		border: solid 20rpx transparent;
	}
	.chat-left::before {
		left: -40rpx;
		border-right-color: #E4E7ED;
	}
	.chat-right::before {
		right: -40rpx;
		border-left-color: #E4E7ED;
	}
	.chat-left::after {
		left: -38rpx;
		border-right-color: white;
		z-index: 1;
	}
	.chat-right::after {
		right: -38rpx;
		border-left-color: #83e065;
		z-index: 1;
	}
	.bottom {
		position: fixed;
		bottom: 10rpx;
		left: 30rpx;
		right: 30rpx;
	}
</style>
