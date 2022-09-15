<template>
	<cl-page>
		<view
			class="page-chat"
			:style="{
				height,
			}"
			@touchmove.stop.prevent="onTouchMove"
		>
			<!-- 顶部导航 -->
			<cl-topbar :title="title">
				<template #append>
					<text class="more-btn cl-icon-more" @tap="toDetail"></text>
				</template>
			</cl-topbar>

			<!-- 消息区域 -->
			<view class="container" @tap="onContainer">
				<scroll-view
					scroll-y
					:scroll-with-animation="scroller.animation"
					:scroll-top="scroller.top"
					:upper-threshold="0"
					scroll-anchoring
					@scrolltoupper="loadmore"
					class="scroller"
				>
					<!-- <view class="loading" :class="{ 'is-active': loading }">
						<cl-loading :size="18"></cl-loading>
						<cl-text :margin="[0, 0, 0, 10]" value="加载中"></cl-text>
					</view> -->

					<!-- 消息列表 -->
					<view class="list">
						<message-list />
					</view>
				</scroll-view>
			</view>

			<!-- 底部区域 -->
			<view class="footer">
				<!-- 麦克风 -->
				<view class="icon" @tap="openPanel('microphone')">
					<text class="chat-icon-microphone"></text>
				</view>
				<!-- 输入框 -->
				<view class="input">
					<textarea
						v-model="input.text"
						type="text"
						confirm-type="send"
						auto-height
						:adjust-position="false"
						:confirm-hold="true"
						:focus="input.focus"
						@focus="onFocus"
						@confirm="onTextSend"
						@keyboardheightchange="onKeyBoardHeightChange"
					/>
				</view>
				<!-- 表情 -->
				<view class="icon" @tap="openPanel('emoji')">
					<text class="chat-icon-emoji"></text>
				</view>
				<!-- 工具 -->
				<view class="icon" @tap="openPanel('tools')">
					<text class="chat-icon-add-circle"></text>
				</view>
			</view>

			<!-- 追加内容 -->
			<view
				class="append"
				:style="{
					height: panel.height,
				}"
			>
				<!-- 表情 -->
				<view class="panel">
					<!-- 工具 -->
					<tools :ref="setRefs('tools')" v-show="panel.name == 'tools'" />
					<!-- 表情 -->
					<emoji :ref="setRefs('emoji')" v-show="panel.name == 'emoji'" />
					<!-- 麦克风 -->
					<microphone :ref="setRefs('microphone')" v-show="panel.name == 'microphone'" />
				</view>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, reactive, ref } from "vue";
import MessageList from "./components/message-list.vue";
import Microphone from "./components/microphone.vue";
import Tools from "./components/tools.vue";
import Emoji from "./components/emoji.vue";

import { useCool, useStore, socket } from "/@/cool";
import { onReady, onShow } from "@dcloudio/uni-app";
import { debounce, isString } from "lodash";
import { getRect } from "/@/cool/utils";
import { Message } from "/@/types";
import { useChat } from "/@/hooks";

const { safeAreaInsets } = uni.getSystemInfoSync();

const { refs, setRefs, service, router, ui, mitt } = useCool();

// 缓存
const { user } = useStore();

// 聊天
const { session } = useChat();

// 消息列表
const list = ref<Message.Item[]>([]);

// 加载中
const loading = ref<boolean>(false);

// 标题
const title = ref<string>("");

// 滚动高度
const scroller = reactive<{ top: number; animation: boolean }>({
	top: 0,
	animation: false,
});

// 面板
const panel = reactive<any>({
	height: 0,
	name: "",
});

// 键盘高度
const keyBoardHeight = ref<number>(0);

// 内容输入
const input = reactive<any>({
	text: "",
	focus: false,
});

// 页面高度
const height = computed(() => {
	return keyBoardHeight.value > 0
		? `calc(100% - ${keyBoardHeight.value - (safeAreaInsets?.bottom || 0)}px)`
		: "100%";
});

// 监听键盘高度
function onKeyBoardHeightChange(e: any) {
	keyBoardHeight.value = e.detail.height;
}

// 打开，关闭面板
function openPanel(action: string) {
	panel.name = action == "close" ? "" : panel.name == action ? "" : action;

	if (!panel.name) {
		panel.height = 0;
	} else {
		nextTick(() => {
			uni.createSelectorQuery()
				.select(".panel")
				.boundingClientRect((res) => {
					panel.height = res.height + "px";
					scrollBottom();
				})
				.exec();
		});
	}
}

// 内容区域事件
function onContainer() {
	openPanel("close");
}

// 输入框聚焦
function onFocus() {
	openPanel("close");

	setTimeout(() => {
		scrollBottom();
	}, 300);
}

// 滚动到底部
const scrollBottom = debounce(() => {
	scroller.animation = true;
	scroller.top = 100000 + Math.random();
}, 300);

// 触摸点
const touches = ref<any[]>([]);

// 屏幕触摸
function onTouchMove(e: any) {
	touches.value = e.changedTouches;

	e.stopPropagation();
	e.preventDefault();

	return false;
}

// 聊天详情
function toDetail() {
	const { userId, groupId } = router.query;

	router.push({
		path: "/pages/chat/detail",
		query: {
			userId,
			groupId,
		},
	});
}

// 追加消息
function append(data: Message.Item, isMy?: boolean) {
	try {
		if (isString(data.content)) {
			data.content = JSON.parse(data.content);
		}
	} catch (err) {
		data.content = {};
	}

	if (isMy) {
		data.mode = "send";
	}

	// 开启滚动
	scroller.animation = true;

	// 添加
	list.value.push(data);

	// 滚动到底
	scrollBottom();
}

// 发送消息
function send(data: Message.Item, isAppend?: boolean) {
	if (session.info) {
		const { type, sessionId, objectId } = session.info;

		// 合并
		Object.assign(data, {
			user: user.info,
			type,
			sessionId,
			objectId,
			fromId: user.info?.id,
		});

		socket.send(data);

		if (isAppend) {
			append(data, true);
		}

		// 重新获取会话
		if (!session.info.sessionId) {
			getSession();
		}
	}
}

// 文本发送
function onTextSend() {
	if (input.text) {
		send(
			{
				contentType: 0,
				content: {
					text: input.text,
				},
			},
			true
		);

		input.text = "";
	}
}

// 分页
const pager = {
	page: 1,
	size: 20,
	total: 0,
	isFinished: false,
};

// 更多消息
async function loadmore() {
	if (!loading.value && !pager.isFinished) {
		// 原位置
		const r1 = await getRect(".list");

		// 获取记录
		await refresh({ page: ++pager.page });

		await nextTick();

		// 新位置
		const r2 = await getRect(".list");

		// 关闭动画
		scroller.animation = false;

		// 滚动到旧位置
		scroller.top = r2.height - r1.height + Math.random();

		// 防止白屏
		setTimeout(() => {
			// #ifdef APP
			scroller.top += Math.random();
			// #endif
		}, 30);
	}
}

// 刷新
async function refresh(params?: any) {
	if (session.info?.sessionId) {
		loading.value = true;

		const d = {
			page: 1,
			size: 20,
			sessionId: session.info?.sessionId,
			...params,
			order: "createTime",
			sort: "desc",
		};

		await service.chat.message
			.page(d)
			.then((res) => {
				// 合并
				list.value.unshift(...res.list.reverse());

				// 是否加载完
				pager.isFinished = res.list.length < d.size;

				// 读消息
				service.chat.message.read({
					sessionId: session.info?.sessionId,
					messageIds: res.list.map((e) => e.id),
				});
			})
			.catch((err) => {
				ui.showTips(err.message);
			});

		loading.value = false;
	}
}

// 获取会话详情
async function getSession() {
	await session.get(router.query).then(() => {
		title.value = session.info?.name || "会话中";
	});
}

// 注入
provide("chat", {
	list,
	touches,
	send,
	append,
	scrollBottom,
	refresh,
});

onReady(async () => {
	// 获取会话
	await getSession();

	// 获取列表
	await refresh();

	// 滚动到底
	scrollBottom();

	// 接收消息
	mitt.on("chat-message", (msg: Message.Item) => {
		if (router.isCurrentPage("/pages/chat/index")) {
			if (session.info?.sessionId == msg.sessionId) {
				append({
					...msg.user,
					...msg,
				});

				// 读消息
				service.chat.message.read({
					sessionId: session.info?.sessionId,
					messageIds: [msg.id],
				});
			}
		}
	});
});

onShow(() => {
	if (ui.loaded) {
		getSession();
	}
});
</script>

<style lang="scss" scoped>
.page-chat {
	display: flex;
	flex-direction: column;
	padding-bottom: env(safe-area-inset-bottom);
	background-color: #fff;
	box-sizing: border-box;
	overflow: hidden;

	.more-btn {
		padding: 0 20rpx;
		font-size: 44rpx;
	}
	.container {
		flex: 1;
		background-color: #f7f7f7;
		overflow: hidden;

		.scroller {
			height: 100%;
			position: relative;

			.loading {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100rpx;
				width: 100%;
				position: absolute;
				left: 0;
				background-color: #fff;
				z-index: 9;
				transform: translateY(-100rpx);
				transition: all 0.3s;

				&.is-active {
					transform: translateY(0);
				}
			}
		}
	}

	.footer {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: #fff;
		flex-shrink: 0;
		padding: 14rpx 10rpx;
		box-sizing: border-box;

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			width: 80rpx;
			border-radius: 8rpx;

			&:active {
				background-color: #f7f7f7;
			}

			text {
				font-size: 60rpx;
			}
		}

		.input {
			background-color: #f7f7f7;
			border-radius: 16rpx;
			flex: 1;
			margin: 0 10rpx;

			// #ifdef MP
			padding: 4rpx 20rpx;
			// #endif

			// #ifndef MP
			padding: 14rpx 30rpx;
			// #endif

			textarea {
				display: flex;
				align-items: center;
				width: 100%;
				font-size: 28rpx;
				box-sizing: border-box;
			}
		}
	}

	.append {
		transition: height 0.3s;
		position: relative;

		& > view {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}
	}
}
</style>
