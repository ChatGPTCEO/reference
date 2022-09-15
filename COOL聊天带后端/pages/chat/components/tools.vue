<template>
	<view class="tools">
		<cl-row>
			<cl-col :span="6">
				<view class="item" @tap="chooseImage">
					<image :src="Picture" mode="aspectFit" />
					<text>照片</text>
				</view>
			</cl-col>

			<cl-col :span="6">
				<view class="item" @tap="chooseVideo">
					<image :src="Video" mode="aspectFit" />
					<text>视频</text>
				</view>
			</cl-col>
		</cl-row>
	</view>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from "vue";
import { useCool } from "/@/cool";
import { Chat, Message } from "/@/types";
import Camera from "../static/images/tool-camera.png";
import Picture from "../static/images/tool-picture.png";
import Video from "../static/images/tool-video.png";

const { upload } = useCool();

// 聊天
const chat = inject<Chat.Provide>("chat");

// 上传处理
function toUpload(list: any, { contentType, key }: any) {
	list.forEach((e: any) => {
		const d = reactive<Message.Item>({
			progress: 0,
			contentType,
			content: {
				[key]: e.path,
			},
		});

		// 入栈
		chat?.append(d, true);

		// 上传
		upload(e, {
			onProgressUpdate({ progress }) {
				d.progress = progress;
			},
		})
			.then((url) => {
				d.progress == 100;

				if (d.content) {
					d.content[key] = url;
				}

				// 发消息
				chat?.send(d);
			})
			.catch((err) => {
				d.error = err.message;
			});
	});
}

// 选择图片
function chooseImage() {
	uni.chooseImage({
		sourceType: ["album", "camera"],
		success(res) {
			toUpload(res.tempFiles, {
				contentType: 1,
				key: "imageUrl",
			});
		},
	});
}

// 选择视频
function chooseVideo() {
	uni.chooseVideo({
		sourceType: ["album", "camera"],
		success(res) {
			toUpload([{ path: res.tempFilePath, name: res.tempFile?.name }], {
				contentType: 4,
				key: "videoUrl",
			});
		},
	});
}
</script>

<style lang="scss" scoped>
.tools {
	background-color: #f7f7f7;
	padding: 0 30rpx;

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 220rpx;

		image {
			height: 56rpx;
			width: 56rpx;
			background-color: #fff;
			padding: 20rpx;
			border-radius: 16rpx;
			margin-bottom: 16rpx;
		}

		text {
			font-size: 24rpx;
		}
	}
}
</style>
