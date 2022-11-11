<template>
	<view class="item row-between"
		hover-class="itemHover"
		hover-stay-time=".5s"
		@click="toChat">
		<view class="avatar_header center">
			<image :src="portraituri" mode="widthFix"></image>
		</view>
		<view class="content flex1" :style="{'borderBottom' : lastItem ? '0' : ''}">
			<view class="user_name row-between">
				<view class="omit flex1">{{ nickname }}<text v-if="item.conversationType == 3">({{ usercount }})</text></view>
				<view class="msg">{{ item.latestMessage.sentTime | handlerMsgTime }}</view>
			</view>
			<view class="message row-between">
				<view class="omit flex1" v-if="item.latestMessage.messageType == 'RC:ImgMsg'">
					[图片]
				</view>
				<view class="omit flex1" v-else-if="item.latestMessage.messageType == 'RC:HQVCMsg'">
					[语音]
				</view>
				<view class="omit flex1" v-else-if="item.latestMessage.messageType == 'RC:SightMsg'">
					[视频]
				</view>
				<view class="omit flex1" :style="{'color': item.unreadMessageCount != 0 ? '#666666 !important' : ''}" v-else>
					{{ item.latestMessage.content.message }}
				</view>
				<view class="center" v-if="item.unreadMessageCount != 0">{{ item.unreadMessageCount }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 
	 * @description 会话item 
	 * 
	 * */
	import { userinfoAPI, groupInfoAPI } from '../api/index.js';
	
	import { handlerMsgTime } from '../utils/filters.js';
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			lastItem: {    // 最后一条不显示边框
				type: Boolean,
				default: ''
			}
		},
		data() {
			return {
				nickname: '',
				portraituri: '',
				usercount: 1,  // 群组人数
			}
		},
		filters: {
			handlerMsgTime: handlerMsgTime
		},
		created() {
			if (this.item.targetId) {
				if (this.item.conversationType == 3) {
					groupInfoAPI(this.item.targetId).then((res) => {
						const { groupname, shoplogo } = res.msg.groupinfo;
						this.nickname = groupname;
						this.portraituri = shoplogo;
						this.usercount = res.msg.usercount;
					})
				} else if (this.item.conversationType == 1) {
					userinfoAPI(this.item.targetId).then((res) => {
						this.nickname = res.msg.nickname;
						this.portraituri = res.msg.portraituri;
					})
				}
				
			}
		},
		methods: {
			/**
			 * 
			 * @description 跳转聊天界面
			 * */
			toChat() {
				if (this.item.unreadMessageCount != 0) {    // 清除消息未读数
					this.$RMutils._clearConversationUnreadStatus(this.item.conversationType, this.item.targetId).then(res => {
						this.$emit('clear_UnreadStatus', this.item.targetId);
					})
				}
				
				if (this.item.conversationType == 3) {   // 群聊
					this.$base.navigateTo('/pages_chat_modules/chat-group/index?groupId=' + this.item.targetId)
				} else {   // 私聊
					this.$base.navigateTo('/pages_chat_modules/chat-private/index?targetId=' + this.item.targetId)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url("../assets/scss/common.scss");
	
	.item {
		height: 144rpx;
		padding: 0 0 0 40rpx;
	}
	.itemHover {
		background-color: #e1e5e5;
	}

	.avatar_header {
		width: 96rpx;
		height: 96rpx;
		border-radius: 8rpx;
		overflow: hidden;

		&>image {
			width: 100%;
			height: 100%;
		}
	}

	.content {
		padding: 30rpx 38rpx 29rpx 0;
		border-bottom: 1rpx solid rgba(0,0,0, .1);
		margin-left: 26rpx;
		flex: 1;
	}

	.user_name {
		&>.omit {
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
			line-height: 40rpx;
			width: 0;
		}

		&>.msg {
			font-size: 24rpx;
			font-weight: 400;
			color: #AAAAAA;
			line-height: 34rpx;
		}
	}

	.message {
		margin-top: 8rpx;

		&>.flex1 {
			font-size: 24rpx;
			font-weight: 500;
			// color: #666666;
			font-weight: 400;
			color: #AAAAAA;
			line-height: 36rpx;
			width: 0;
		}

		&>.center {
			height: 28rpx;
			background: #FFDC62;
			padding: 0 10rpx;
			font-size: 18rpx;
			font-weight: 600;
			color: #333333;
			border-radius: 14rpx;
		}
	}
</style>
