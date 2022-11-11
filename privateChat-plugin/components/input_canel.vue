<template>
	<view class="input_canel">
		<!-- @ 通知 发送优惠券   判断是否为群组 并且为群主-->
		<view class="group_owner_operation" v-if="isGroup && is_groupOwner">
			<view class="center" hover-class="group_owner_operation__hover" hover-stay-time=".3s" @click="$base.navigateTo('/pages_chat_modules/chat-group/inform-group?groupId=' + groupId)">发送通知</view>
		</view>
		
		<!-- 输入框 -->
		<view class="input_con">
			<view class="voice center">
				<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/kuxiong_miniProgram/chat/%E8%AF%AD%E9%9F%B3.png" mode="widthFix" @click="voice_status_change" v-if="isGroup && !show_voice"></image>
				<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/kuxiong_miniProgram/chat/KeyboardOutlined.png" mode="widthFix" v-else @click="show_voice = false;inputFocus = true;"></image>
			</view>
			
			<view class="input_box row" v-if="!show_voice">
				<textarea
				  class="flex1"
				  v-model="message"
				  :maxlength="-1"
				  :auto-height="true"
				  :focus="inputFocus"
				  confirm-type="send"
				  :cursor-spacing="16"
				  :confirm-hold="true"
				  :show-confirm-bar="false"
				  :disable-default-padding="true"
				  :adjust-position="false"
				  @blur="focus_status = false"
				  @focus="textarea_focus"
				  @confirm="sendMessage"
				/>
			</view>
			
			<!-- 按住语音录制 -->
			<voice-chat v-show="show_voice" @sendVoice="params => $emit('sendMessage', params)"></voice-chat>
			
			<view class="right_canel row-between">
				<view class="interface row">
					<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/chat/emoji_icon.png" mode="widthFix" @click="show_emoji_canel" v-if="!show_emoji"></image>
					<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/chat/send_icon.png" mode="widthFix" class="animated fadeIn" v-if="show_emoji" @click="sendMessage"></image>
				</view>
				<view class="interface row">
					<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/chat/interface_icon.png" mode="widthFix"  v-if="!show_more_operation" @click="show_more"></image>
					<u-icon name="arrow-down" color="#141414" bold size="22" v-if="show_more_operation" @click="show_more"></u-icon>
				</view>
			</view>
		</view>
		
		<!-- + 面板 -->
		<view class="block_hidden" :class="[show_more_operation ? 'more_operation_max' : (!show_emoji && !focus_status) ? '' : 'hidden']">
			<view class="more_operation">
				<view class="more_operation__item column-center" @click="chooseImage('album')">
					<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/kuxiong_miniProgram/chat/Frame%20427318427%402x.png"></image>
					<text>图片</text>
				</view>
				<view class="more_operation__item column-center" @click="chooseImage('camera')">
					<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/chat/camera.png"></image>
					<text>拍照</text>
				</view>
				<view class="more_operation__item column-center" @click="chooseVideo()" v-if="isGroup">
					<image src="https://km-hz-test.oss-cn-hangzhou.aliyuncs.com/chat/camera.png"></image>
					<text>视频</text>
				</view>
			</view>
		</view>
		
		
		<!-- 表情选择 -->
		<view class="block_hidden" :class="[show_emoji ? 'emoji_max' : (!show_more_operation && !focus_status) ? '' : 'hidden']">
			<swiper :indicator-dots="false" style="height: 300rpx;margin-top: 30rpx;" @change="e => current_emoji = e.detail.current">
				<swiper-item v-for="(item, index) in emojiList">
					<view class="emoji_canel">
						<view class="emoji_item" v-for="(it, i) in item" :key="it.unicode" @click="sel_emoji(it)">{{ it.emoji }}</view>
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 自定义指示点 -->
			<view class="center indicator">
				<view class="indicator_item" v-for="(item, index) in emojiList" :style="{'backgroundColor': current_emoji == index ? 'rgba(0,0,0,.6)' : 'rgba(0,0,0,.3)'}"></view>
			</view>
		</view>
		
		<!-- 键盘抬起 -->
		<view class="keyword" :style="{'height': focus_status ? (keywordHeight - safeAreaInsets) + 'px' : ''}"></view>
	</view>
</template>

<script>
	import voiceChat from './voice_chat.vue';
	
	// import { is_group_createrAPI } from '@/api/pages_chart_modules';
	
	// const RongIMEmoji = require('@/utils/im/RongIMEmoji-2.2.6.js');
	// RongIMEmoji.init();
	
	// 数组分割
	// function getNewArray(array, subGroupLength) {
	// 	let index = 0;
	// 	let newArray = [];
	// 	while(index < array.length) {
	// 		newArray.push(array.slice(index, index += subGroupLength));
	// 	}
	// 	return newArray;
	// }
	// const emojiList = getNewArray(RongIMEmoji.list, 24);
	
	export default {
		components: {
			'voice-chat': voiceChat
		},
		props: {
			groupId: {
				type: String,
				default: '',
			},
			isGroup: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				message: '',
				inputFocus: false,
				show_more_operation: false,
				
				emojiList,     // 表情列表
				current_emoji: 0,
				show_emoji: false,
				
				show_voice: false,    // 语音
				
				safeAreaInsets: 0,// 苹果底部安全区域
				inputHeight: 0,   // 组件高度
				keywordHeight: 0,  // 键盘高度
				focus_status: false,
				input_canel_style: {},
				
				is_groupOwner: false,    // 是否是群主
				windowWidth: 0,          // 屏幕宽度
			}
		},
		watch: {
			groupId(newVal) {
				newVal && is_group_createrAPI({
					userid: this.$store.state.chat.current_target_id,
					groupid: this.groupId
				}).then(res => {
					this.is_groupOwner = res.msg;
					
					this.$nextTick(() => {    // 获取基础高度
						this.heightChange();
					})
				})
			}
		},
		created() {
			//  监听键盘高度变化
			uni.onKeyboardHeightChange((obj)=>{
				console.log('键盘高度', obj);
				this.keywordHeight = obj.height;
				if (this.keywordHeight == 0 && (this.show_emoji || this.show_more_operation)) {   // 如果键盘收起的同时展开了 表情框或者 + 面板则不触发页面内容的上推处理
					return false;
				}
				this.$emit('input_height_change', 'addHeight' , this.toRpx(obj.height) - this.toRpx(this.safeAreaInsets));
			})
			
		},
		mounted() {
			if (!this.isGroup) {   // 如果不是群组
				this.heightChange();
			}
			
			uni.getSystemInfo({
				success: (res) => {
					this.windowWidth = res.windowWidth;
					this.safeAreaInsets = uni.upx2px(res.safeAreaInsets.bottom);
					// console.log('安全区域高度', this.safeAreaInsets)
				}
			})
		},
		methods: {
			voice_status_change() {
				this.show_voice = true;
				if (this.show_emoji) {
					this.show_emoji_canel()
				} 
				if (this.show_more_operation) {
					this.show_more();
				}
			},
			// 输入框聚焦事件
			textarea_focus() {
				this.show_more_operation = false;
				this.show_emoji = false;
				
				this.$nextTick(() => {
					this.focus_status = true;
				})
			},
			sendMessage() {
				if (this.message == '') {
					return false;
				}
				this.$emit('sendMessage', {sendmsg: this.message, msgtype: 'RC:TxtMsg' });
				this.message = '';
			},
			
			// 获取初始化输入框高度
			heightChange() {
				uni.createSelectorQuery().in(this).select(".input_canel").boundingClientRect(data => {
					console.log('输入框基础高度', data.height);
					this.inputHeight = data.height;
					this.$emit('input_height_change', 'initHeight', this.inputHeight);
				}).exec()
			},
			
			
			// + 点击事件
			show_more() {
				this.show_emoji = false;
				this.show_more_operation = !this.show_more_operation;
				
				if (this.show_more_operation) {
					this.$emit('input_height_change', 'addHeight',  620);
					this.show_voice = false;
				}
				if (!this.show_more_operation && !this.show_emoji && !this.focus_status) {
					this.$emit('input_height_change', 'addHeight', 0);
				}
			},
			
			
			// 选择图片发送
			chooseImage(sourceType) {
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: [sourceType],
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						
						uni.getImageInfo({
							src: tempFilePaths[0],
							success: (res) => {
								let imgw, imgh;
								const { height, width } = res;
								const ratio = width / height;
								if (width > height) {
									imgw = '300rpx';
									imgh = `${300 / ratio}rpx`;
								} else if (height > width) {
									imgh = '300rpx';
									imgw = `${300 * ratio}rpx`;
								} else {
									imgw = '300rpx'
									imgh = '300rpx'
								}
								
								this.$emit('sendMessage', {sendmsg: this.message, msgtype: 'RC:ImgMsg', photoFile: tempFilePaths[0], imgw, imgh });
							}
						})
					}
				})
			},
			
			/**
			 * @description 选择视频发送
			 * 
			 * */ 
			chooseVideo() {
				uni.chooseVideo({
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log('视频地址', res);
						let imgw, imgh;
						const { height, width } = res;
						const ratio = width / height;
						if (width > height) {
							imgw = '300rpx';
							imgh = `${300 / ratio}rpx`;
						} else if (height > width) {
							imgh = '300rpx';
							imgw = `${300 * ratio}rpx`;
						} else {
							imgw = '300rpx'
							imgh = '300rpx'
						}
						
						this.$emit('sendMessage', {
							sendmsg: this.message, 
							msgtype: 'RC:SightMsg', 
							videoFile: res.tempFilePath, 
							// videThumbTempFilePath: res.thumbTempFilePath,
							videThumbTempFilePath: '',
							videoH: imgh,
							videoW: imgw
						});
					}
				})
			},
			
			/**
			 * 
			 * @@description 表情相关
			 * */ 
			sel_emoji(item) {
				this.message += item.emoji
			},
			show_emoji_canel() {
				this.show_more_operation = false;
				this.show_emoji = !this.show_emoji;
				
				if (this.show_emoji) {
					this.$emit('input_height_change', 'addHeight', 360);
					this.show_voice = false;
				}
				if (!this.show_more_operation && !this.show_emoji && !this.focus_status) {
					this.$emit('input_height_change', 'addHeight', 0);
				}
				
			},
			
			// 计算rpx 值
			toRpx (px) {
				if (this.windowWidth) {
					return (750 * Number.parseInt(px)) / this.windowWidth;
				} else {
					uni.getSystemInfo({
						success: (res) => {
							this.windowWidth = res.windowWidth;
							return (750 * Number.parseInt(px)) / this.windowWidth;
						}
					})
				}
			},
			
			lose_focus() {
				if (this.show_emoji) {
					this.show_emoji_canel()
				} else if (this.show_more_operation) {
					this.show_more();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input_canel {
		width: 750rpx;
		padding: 10rpx 0rpx 0;
		padding-bottom: calc(10rpx + env(safe-area-inset-bottom) / 2);
		background: #FFFFFF;
		box-shadow: 0px -16rpx 64rpx 2rpx rgba(70,96,135,0.05);
		position: fixed;
		bottom: -1rpx;
		left: 0;
		z-index: 999;
	}
	.input_con {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding:0 10rpx;
	}
	.right_canel {
		height: 80rpx;
		width: 110rpx;
	}
	.voice {
		width: 60rpx;
		height: 80rpx;
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	.input_box {
		width: 510rpx;
		min-height: 80rpx;
		background: #F4F4F4;
		border-radius: 20rpx;
		textarea {
			max-height: 180rpx;
			padding: 0 20rpx;
		}
	}
	.emoji {
		width: 48rpx;
		height: 40rpx;
	}
	.interface {
		width: 48rpx;
		height: 48rpx;
		image {
			width: 48rpx;
			height: 48rpx;
		}
	}
	.block_hidden {
		max-height: 0;
		transition: max-height .2s linear;
		z-index: 99;
		overflow: hidden;
	}
	.more_operation {
		padding: 40rpx 40rpx 60rpx;
		display: flex;
		align-items: flex-start;
		height: 620rpx;
		
		
		&__item {
			image {
				width: 96rpx;
				height: 96rpx;
			}
			text {
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				line-height: 36rpx;
				margin-top: 12rpx;
				
			}
		}
		
		&__item:nth-child(2) {
			margin-left: 100rpx;
		}
		&__item:nth-child(3) {
			margin-left: 100rpx;
		}
	}
	.more_operation_max {
		max-height: 620rpx;
	}
	
	.emoji_max {
		max-height: 440rpx;
	}
	.hidden {
		height: 0;
	}
	.keyword {
		height: 0;
		transition: height .2s linear;
	}
	
	.emoji_canel {
		padding: 0 0 20rpx 0rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		
		.emoji_item {
			width: 60rpx;
			height: 60rpx;
			font-size: 60rpx;
			margin: 14rpx;
		}
	}
	
	
	.group_owner_operation {
		padding: 20rpx 0 20rpx 40rpx;
		display: flex;
		overflow-x: scroll;
		
		&>view {
			height: 48rpx;
			background: #F7F7F7;
			border-radius: 24rpx;
			border: 1rpx solid #999999;
			padding: 0 16rpx;
			font-size: 28rpx;
			color: #3D3D3D;
			flex-shrink: 0;
		}
		&__hover {
			background: #e6ebeb !important;
		}
	}
	
	.indicator {
		
	}
	.indicator_item {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		margin: 0 20rpx;
	}
	
</style>
