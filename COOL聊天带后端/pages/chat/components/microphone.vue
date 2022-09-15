<template>
	<view class="microphone">
		<button @longpress="start" @touchend="stop" class="btn">
			{{ hand.down ? "松开 结束" : "按住 说话" }}
		</button>

		<cl-popup v-model="hand.down" :padding="0" background-color="transparent">
			<view
				class="popup"
				:class="[
					{
						'is-cancel': isCancel,
					},
				]"
			>
				<text class="time">{{ duration }}</text>
				<text class="desc">松开发送，上滑取消</text>
			</view>
		</cl-popup>
	</view>
</template>

<script lang="ts" setup>
import { computed, inject, reactive, ref, watch } from "vue";
import { useCool } from "/@/cool";
import { Chat } from "/@/types";

const { upload, ui } = useCool();

// 聊天
const chat = inject<Chat.Provide>("chat");

// 录音设备
const recorderManager = uni.getRecorderManager();

// 手势
const hand = reactive<any>({
	down: false,
	start: 0,
	move: 0,
});

// 录制时长
const duration = ref<number>(0);

// 是否取消
const isCancel = computed(() => {
	return hand.move ? hand.start - hand.move > 50 : false;
});

// 计时器
let timer: any = null;

// 长按
function start() {
	hand.down = true;

	// 初始值
	hand.start = 0;
	hand.move = 0;
	duration.value = 1;

	// #ifndef H5
	// 开始录制
	recorderManager.start({});
	// #endif

	// 记时
	clearInterval(timer);
	timer = setInterval(() => {
		duration.value += 1;

		if (duration.value >= 60) {
			clearInterval(timer);
		}
	}, 1000);
}

// 松开暂停
function stop() {
	clearInterval(timer);
	hand.down = false;

	// #ifndef H5
	// 监听暂停
	recorderManager.onStop(send);

	// 录制暂停
	recorderManager.stop();
	// #endif
}

// 发送
function send(res: any) {
	stop();

	if (!isCancel.value) {
		upload({
			path: res.tempFilePath,
		})
			.then((url) => {
				chat?.send(
					{
						contentType: 3,
						content: {
							voiceUrl: url,
							duration: duration.value,
						},
					},
					true
				);
			})
			.catch((err) => {
				ui.showToast(err.message);
			});
	}
}

// 监听移动
watch(
	() => chat?.touches,
	(val) => {
		if (hand.down) {
			hand.move = val.value[0].clientY;

			if (!hand.start) {
				hand.start = hand.move;
			}
		}
	},
	{
		deep: true,
	}
);
</script>

<style lang="scss" scoped>
.microphone {
	background-color: #f7f7f7;
	padding: 30rpx 50rpx;
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-weight: bold;
		background-color: #fff;
		border: 0;
		height: 80rpx;
		border-radius: 16rpx;

		&:active {
			background-color: #eee;
		}

		&::after {
			border: 0;
		}
	}

	.popup {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: #fff;

		&.is-cancel {
			background-color: red;
			color: #fff;
		}

		.time {
			font-size: 40rpx;
			margin-bottom: 20rpx;
			font-weight: bold;

			&::after {
				content: "s";
				font-size: 28rpx;
				margin-left: 4rpx;
			}
		}

		.desc {
			font-size: 24rpx;
		}
	}
}
</style>
