<template>
	<view class="">
		<!-- 聊天内容区域 -->
		<scroll-view scroll-y :style="chatBkdyBottom" class="position-fixed left-0 right-0">
			<block v-for="(item, index) in list" :key="index">
				<chat-item :item="item" :index="index" :pretime="index > 0 ? list[index - 1].create_time : 0" ref="chatItem"></chat-item>
			</block>
		</scroll-view>
		<view class="bottom-message flex-1 bg-white" :style="'bottom:' + KeyboardHeight + 'px;'">
			<view class="flex-1 mx-2 row-ac message-box">
				<view class="message-icon row"><text class="iconfont icon-yuyin"></text></view>
				<view class="flex-1 message-textarea mx-1 row">
					<textarea class="textarea border pl-2" maxlength="-1" :adjust-position="false" v-model="chatContent" />
				</view>
				<view class="message-icon row"><text class="iconfont icon-biaoqing"></text></view>
				<template v-if="chatContent.length === 0 ">
					<view class="message-icon row"><text class="iconfont icon-add-01"></text></view>
				</template>
				<template v-else>
					<view class="message-delivery row" @click="sendDelivery"><text class="delivery bg-color row">发送</text></view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
import chatItem from '@/components/chat/chat-item.vue';

export default {
	components: {
		chatItem
	},
	data() {
		return {
			commonHeaderHeight: '',
			swiperHeight: '',
			KeyboardHeight: 0,
			chatContent: "", //输入文字
			list: [
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 1, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗',
					create_time: '1631424276'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 2, //用户ID
					nikename: '我是李小白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '我很好',
					create_time: '1631424476'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 1, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗',
					create_time: '1631424576'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 1, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗',
					create_time: '1631424876'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 2, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗',
					create_time: '1631425076'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 1, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗',
					create_time: '1631424276'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 2, //用户ID
					nikename: '我是李小白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '我很好',
					create_time: '1630424476'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 2, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗',
					create_time: '1631424576'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 1, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗',
					create_time: '1631425876'
				},
				{
					avatar: '/static/img/header-img.png', //头像
					user_id: 2, //用户ID
					nikename: '我是李大白', //昵称
					type: 'text', //信息类型，如图片，文字信息，语音，短视频
					empty: '你好吗',
					create_time: '1631425076'
				}
			]
		};
	},
	created() {
		//接收组件传送元素高度
		uni.$on('commonHeader', res => {
			this.commonHeaderHeight = res;
		});
		uni.getSystemInfo({
			success: res => {
				// 固定头部和尾部总高度
				this.topAndBottom = this.commonHeaderHeight + uni.upx2px(170);
				//中间可用高度
				this.swiperHeight = res.windowHeight - this.topAndBottom;
			}
		});
		uni.onKeyboardHeightChange(res => {
			console.log(res.height);
			this.KeyboardHeight = res.height;
			if (this.KeyboardHeight > 0) {
				this.pageToBottom();
			}
		});
	},
	computed: {
		//聊天区域bottom
		chatBkdyBottom() {
			return `bottom:${uni.upx2px(140) + this.KeyboardHeight}px;top:${this.commonHeaderHeight}px;`;
		}
	},
	methods: {
		sendDelivery(type) {
			var obj = {
				avatar: '/static/img/header-img.png', 
				user_id: 1, 
				nikename: '我是李大白',
				type: "text", 
				empty: this.chatContent,
				create_time: (new Date()).getTime()
			}
			switch (type){
				case 'text':
				obj.empty = this.chatContent
					break;
			}
			this.list.push(obj);
			//发送文字成功清空输入框
			if(type == 'text'){
				this.chatContent = ''
			}
			//发送完置于底部
			this.pageToBottom()
		},
		pageToBottom() {
			// let chatItem = this.$refs.chatItem;
			// let lastIndex = chatItem.length > 0 ? chatItem.length - 1 : 0;
			// let last = chatItem[lastIndex];
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #eceff2;
}
.bottom-message {
	height: 140rpx;
	position: fixed;
	left: 0;
	right: 0;
	transition: 0.29s;
	.message-box {
		height: 120rpx;
	}
}
.message-icon {
	width: 60rpx;
	height: 120rpx;
	.iconfont {
		font-size: 50rpx;
	}
}
.message-delivery {
	width: 120rpx;
	height: 120rpx;
	.delivery {
		width: 120rpx;
		height: 65rpx;
		border-radius: 12rpx;
	}
}
.message-textarea {
	.textarea {
		height: 72rpx;
		line-height: 72rpx;
		width: 420rpx;
		border-radius: 12rpx;
		background-color: #f5f5f5;
	}
}
</style>
