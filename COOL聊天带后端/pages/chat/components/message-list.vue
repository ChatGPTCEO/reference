<template>
	<view class="message-list__wrap">
		<view class="message-list" v-for="item in list" :key="item.id">
			<view class="date" v-if="item.date">{{ item.date }}</view>

			<view
				class="message-list__item"
				:class="{
					'is-my': item.isMy,
				}"
			>
				<view class="avatar" @tap="toUser(item)">
					<cl-avatar
						lazy-load
						:size="80"
						:src="item.isMy ? user.info.avatar : item.avatar"
					/>
				</view>

				<view class="det">
					<view class="content">
						<view class="name">{{
							item.isMy ? user.info.nickName : item.nickName
						}}</view>

						<!-- 文本 -->
						<template v-if="item.contentType == 0">
							<view class="wrap text">{{ item.content?.text }}</view>
						</template>

						<!-- 图片 -->
						<template v-else-if="item.contentType == 1">
							<view class="picture" @tap="onImage(item)">
								<image
									lazy-load
									mode="widthFix"
									:src="resizeImage(item.content?.imageUrl || '', 200)"
								/>
							</view>
						</template>

						<!-- 表情 -->
						<template v-else-if="item.contentType == 2">
							<view class="wrap emoji">
								<image :src="item.content?.imageUrl" mode="aspectFit" />
							</view>
						</template>

						<!-- 语音 -->
						<template v-else-if="item.contentType == 3">
							<view
								class="wrap voice"
								:class="[
									{
										'is-play': item.isPlay,
									},
								]"
								:style="{
									[item.isMy ? 'paddingLeft' : 'paddingRight']: `${
										16 + 4 * (item.content?.duration || 1)
									}rpx`,
								}"
								@tap="onVoice(item)"
							>
								<view class="icon">
									<text class="chat-icon-voice-right"></text>
									<text class="chat-icon-voice-right1"></text>
								</view>
								<text class="x">{{ item.content?.duration }}"</text>
							</view>
						</template>

						<!-- 视频 -->
						<template v-else-if="item.contentType == 4">
							<view class="video" @tap="onVideo(item)">
								<image
									:src="videoPoster(item.content?.videoUrl || '', [0, 300])"
									mode="aspectFill"
								/>
								<text class="cl-icon-play"></text>
							</view>
						</template>

						<!-- 进度 -->
						<view
							class="progress"
							v-if="item.progress && item.progress > 0 && item.progress < 100"
						>
							<cl-progress
								:model-value="item.progress"
								:show-text="false"
							></cl-progress>
						</view>

						<!-- 错误 -->
						<view class="error" v-if="item.error">
							<text class="cl-icon-warning-border"></text>
							{{ item.error }}
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 视频 -->
		<view class="popup-video" v-if="preview.url">
			<video
				id="video"
				controls
				autoplay
				:src="preview.url"
				@play="onVideoPlay"
				@fullscreenchange="onVideoFullscreenChange"
			></video>
		</view>
	</view>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, inject, reactive } from "vue";
import { useCool, useStore, useUpload } from "/@/cool";
import { isString } from "lodash";
import { Chat, Message } from "/@/types";

const { resizeImage, videoPoster } = useUpload();

const { router } = useCool();

// 缓存
const { user } = useStore();

// 聊天
const chat = inject<Chat.Provide>("chat");

// 音频
const voice = {
	ctx: uni.createInnerAudioContext(),
	url: "",
};

// 视频
const video: any = {
	ctx: null,
};

// 预览
const preview = reactive({
	url: "",
});

// 列表
const list = computed(() => {
	let prev: any = "";

	return chat?.list.value.map((e) => {
		// 处理时间
		let date = null;

		if (e.createTime) {
			// 1分钟内不显示日期
			if (prev && dayjs(e.createTime).isBefore(dayjs(prev).add(1, "minute"))) {
				date = "";
			} else {
				// 前一天显示完整日期
				if (dayjs(e.createTime).isBefore(dayjs().hour(0).minute(0).second(0))) {
					date = e.createTime;
				} else {
					// 今天只显示时分秒
					date = dayjs(e.createTime).format("HH:mm:ss");
				}
			}

			prev = e.createTime;
		}

		return Object.assign(e, {
			// 日期
			date,
			// 是否自己发的消息
			isMy: e.mode == "send" || e.fromId == user.info?.id,
			// 是否播放
			isPlay: false,
			// 内容
			content: isString(e.content) ? JSON.parse(String(e.content)) : e.content,
		});
	});
});

// 计时器
let timer: any = null;

// 图片预览
function onImage(item: Message.Item) {
	const urls: string[] = [];

	chat?.list.value.filter((e) => {
		if (e.contentType == 1 && e.content?.imageUrl) {
			urls.push(e.content?.imageUrl);
		}
	});

	uni.previewImage({
		current: urls.indexOf(item.content?.imageUrl || ""),
		urls,
	});
}

// 音频播放
function onVoice(item: Message.Item) {
	if (item.content) {
		const { voiceUrl, duration } = item.content;

		if (voiceUrl && duration) {
			item.isPlay = !item.isPlay;

			// 清除定时器
			clearTimeout(timer);

			// 播放
			if (item.isPlay) {
				voice.ctx.src = voiceUrl;
				voice.ctx.play();

				timer = setTimeout(() => {
					item.isPlay = false;
				}, duration * 1000);
			} else {
				voice.ctx.stop();
			}
		}
	}
}

// 视频播放
function onVideo(item: Message.Item) {
	video.ctx = uni.createVideoContext("video");
	preview.url = item.content?.videoUrl || "";
}

// 监听全屏
function onVideoFullscreenChange(e: any) {
	if (!e.detail.fullScreen) {
		preview.url = "";
	}
}

// 监听播放
function onVideoPlay() {
	video.ctx.requestFullScreen({
		direction: 0,
	});
}

// 用户详情
function toUser(item: Message.Item) {
	router.push({
		path: "/pages/chat/user-detail",
		query: {
			id: item.fromId,
		},
	});
}
</script>

<style lang="scss" scoped>
.message-list__wrap {
	.date {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		font-size: 24rpx;
	}

	.popup-video {
		position: absolute;
		left: -200%;
		top: 0;
		height: 100%;
		width: 100%;

		video {
			height: 100%;
			width: 100%;
		}
	}
}

.message-list {
	&__item {
		display: flex;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.avatar {
			flex-shrink: 0;
		}

		.det {
			flex: 1;
			margin: 0 30rpx;
			.content {
				display: flex;
				flex-direction: column;
				align-items: flex-start;

				.wrap {
					display: inline-flex;
					align-items: center;
					font-size: 26rpx;
					background-color: #fff;
					border-radius: 0 20rpx 20rpx 20rpx;
					padding: 20rpx;
					height: 80rpx;
					max-width: 70%;
					box-sizing: border-box;
					position: relative;
				}

				.name {
					font-size: 24rpx;
					margin-bottom: 10rpx;
				}

				.progress {
					width: 150rpx;
				}

				.error {
					font-size: 24rpx;
					color: red;
				}

				.text {
					padding: 20rpx 30rpx;
					height: auto;
					word-break: break-all;
					word-wrap: break-word;
					white-space: pre-wrap;
				}

				.picture {
					width: 200rpx;

					image {
						width: 100%;
						border-radius: 10rpx;
					}
				}

				.emoji {
					image {
						height: 40rpx;
						width: 40rpx;
					}
				}

				.voice {
					.icon {
						position: relative;
						font-size: 40rpx;
						height: 50rpx;
						width: 50rpx;

						text {
							position: absolute;
						}
					}

					&.is-play {
						.icon {
							text {
								&:nth-child(1) {
									animation: ss 0.8s linear infinite;
								}

								@keyframes ss {
									0% {
										opacity: 1;
									}
									50% {
										opacity: 0;
									}
									100% {
										opacity: 01;
									}
								}
							}
						}
					}
				}

				.video {
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #333;
					border-radius: 16rpx;
					height: 180rpx;
					width: 300rpx;
					position: relative;
					overflow: hidden;

					image {
						height: 100%;
						width: 100%;
					}

					.cl-icon-play {
						position: absolute;
						z-index: 2;
						color: rgba(255, 255, 255, 0.9);
						font-size: 50rpx;
						text-shadow: 0 0 4rpx #999;
					}
				}
			}
		}

		&.is-my {
			flex-direction: row-reverse;

			.content {
				align-items: flex-end;

				.wrap {
					border-radius: 20rpx 0 20rpx 20rpx;
					background-color: $cl-color-primary;
				}

				.voice {
					flex-direction: row-reverse;
					.icon {
						transform: rotate(180deg);
					}
				}
			}
		}
	}
}
</style>
