<template>
	<view>
		<!-- 时间显示 -->
		<view class="row pb-3 pt-2" v-if="showTime">
			<text class="text-light-grey font-s-3">{{ showTime }}</text>
		</view>
		<!-- 聊天内容 -->
		<view class="chat-message d-f align-start mx-3 position-relative mb-3" :class="!isSelf ? 'justify-start' : 'justify-end'">
			<!-- 非用户本人聊天时显示在左边 -->
			<template v-if="!isSelf">
				<image :src="item.avatar" class="user-img" mode=""></image>
				<text class="iconfont icon-caret-left text-white position-absolute"></text>
			</template>
			
			<view class=" p-2 rounded message-info" :class="isSelf ? 'bg-color mr-3' : 'bg-white ml-3 '">
				<text class="font-s-5" selectable="true">{{ item.empty }}</text>
			</view>
			<!-- 用户本人聊天时显示在右边 -->
			<template v-if="isSelf">
				<text class="iconfont icon-you text-main-color position-absolute"></text>
				<image :src="item.avatar" class="user-img" mode=""></image>
			</template>
		</view>
	</view>
	
</template>

<script>
	import $T from '@/config/time.js';
	export default {
		props: {
			item:Object,
			index:Number,
			//上一条消息的时间戳
			pretime:[Number,String]
		},
		computed:{
			isSelf(){
				let id = 1
				return this.item.user_id === id
			},
			//显示信息时间
			showTime(){
				return $T.getChatTime(this.item.create_time,this.pretime)
			}
		}
	}
</script>

<style lang="scss">
	.chat-message{
		.user-img{
			width: 70rpx;
			height: 70rpx;
			border-radius: 8rpx;
		}
		.icon-caret-left{
			left: 70rpx;
			top: 20rpx;
			font-size: 50rpx;
		}
		.icon-you{
			right: 70rpx;
			top: 20rpx;
			font-size: 50rpx;
		}
		.message-info{
			max-width: 480rpx;
		}
	}
</style>
