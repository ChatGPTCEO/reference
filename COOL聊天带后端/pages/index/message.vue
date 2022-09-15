<template>
	<cl-page>
		<view class="page-message">
			<cl-sticky>
				<view class="search">
					<view class="input">
						<cl-input
							v-model="keyWord"
							round
							:border="false"
							prefix-icon="cl-icon-search"
							background-color="#F8F8F8"
						>
							<template #prepend>
								<cl-icon name="search"></cl-icon>
							</template>
						</cl-input>
					</view>

					<view class="add" @tap="menu.visible = true">
						<cl-icon name="plus-border" :size="44"></cl-icon>
					</view>

					<!-- 浮动弹窗 -->
					<view class="popover-menu" v-show="menu.visible">
						<view class="mask" @tap="menu.visible = false"></view>

						<view class="list">
							<view class="item" @tap="toPage('/pages/chat/add-group')">
								<image src="/static/icon/message-w.png" mode="aspectFit" />
								<text>发起群聊</text>
							</view>
							<view class="item" @tap="toPage('/pages/chat/add-friend')">
								<image src="/static/icon/add-friend-w.png" mode="aspectFit" />
								<text>添加朋友</text>
							</view>
						</view>
					</view>
				</view>
			</cl-sticky>

			<!-- 内容区域 -->
			<view class="container">
				<view class="list">
					<cl-list-item
						v-for="(item, index) in flist"
						:key="item.id"
						:ref="setRefs(`list-item__${item.id}`)"
						:arrow-icon="false"
						swipe="right"
						@tap="toChat(item)"
					>
						<view class="item">
							<view class="icon">
								<cl-badge :value="item.unreadCount">
									<!-- 群聊 -->
									<view class="group" v-if="item.type == 1">
										<image v-for="url in item.avatars" :key="url" :src="url" />
									</view>

									<!-- 单聊 -->
									<view class="user" v-else>
										<cl-avatar
											:src="item.avatars[0]"
											:size="100"
											shape="square"
										></cl-avatar>
									</view>
								</cl-badge>
							</view>

							<view class="content">
								<text class="name">{{ item.name }}</text>
								<text class="message">{{ item.message }}</text>
							</view>

							<text class="date">{{ item.date }}</text>
						</view>

						<template #menu>
							<cl-button type="error" @tap="del(item, index)">删除</cl-button>
						</template>
					</cl-list-item>
				</view>

				<view class="empty" v-show="!flist.length">
					<image src="/static/icon/empty/message.png" mode="aspectFit" />
					<text>暂无消息</text>
				</view>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onHide, onReady, onShow } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import { computed, reactive, ref, watch } from "vue";
import { socket, useCool } from "/@/cool";
import { Session } from "/@/types";

const { service, router, ui, refs, setRefs, mitt } = useCool();

// 关键字
const keyWord = ref<string>("");

// 弹出菜单
const menu = reactive<any>({
	visible: false,
});

// 会话列表
const list = ref<Session.Info[]>([]);

// 过滤
const flist = computed(() =>
	list.value
		.filter((e) => e.name.toLowerCase().includes(keyWord.value.toLowerCase()))
		.map((e) => {
			// 处理内容
			switch (e.contentType) {
				case 0:
					try {
						const { text } = JSON.parse(String(e.content));
						e.message = text;
					} catch (err) {
						console.error(err);
					}

					break;
				case 1:
					e.message = "[图片]";
					break;
				case 2:
					e.message = "[表情]";
					break;
				case 3:
					e.message = "[语音]";
					break;
				case 4:
					e.message = "[视频]";
					break;
				default:
					e.message = "暂无消息";
					break;
			}

			// 处理日期
			if (e.lastChatTime) {
				if (dayjs(e.lastChatTime).isBefore(dayjs().hour(0).minute(0).second(0))) {
					e.date = dayjs(e.lastChatTime).format("YYYY-MM-DD");
				} else {
					e.date = dayjs(e.lastChatTime).format("HH:mm:ss");
				}
			} else {
				e.date = dayjs(e.createTime).format("HH:mm:ss");
			}

			// 处理头像
			e.avatars = (e.headimgs || "").split(",");

			return e;
		})
);

// 刷新
async function refresh(params?: any) {
	return service.chat.session
		.list({
			order: "lastChatTime",
			sort: "desc",
			...params,
		})
		.then((res) => {
			list.value = res;
		});
}

// 删除会话
function del(item: any, index: number) {
	ui.showConfirm({
		title: "温馨提示",
		message: "删除该聊天",
		callback(action) {
			if (action == "confirm") {
				service.chat.session.delete({
					ids: [item.id],
				});

				list.value.splice(index, 1);
			} else {
				refs.value[`list-item__${item.id}`].restore();
			}
		},
	});
}

// 跳页面
function toPage(path: string) {
	router.push(path);
}

// 去聊天
function toChat(item: any) {
	router.push({
		path: "/pages/chat/index",
		query: {
			[item.type == 0 ? "userId" : "groupId"]: item.objectId,
		},
	});
}

// 获取未读，设置角标
function unreadCount() {
	watch(
		list,
		(arr) => {
			const num = arr.reduce((a, b) => a + b.unreadCount, 0);

			if (num) {
				uni.setTabBarBadge({
					index: 0,
					text: String(num),
				});
			} else {
				uni.removeTabBarBadge({ index: 0 });
			}
		},
		{
			deep: true,
		}
	);
}

onReady(() => {
	unreadCount();

	// 监听消息
	mitt.on("chat-message", (msg) => {
		if (router.isTab(router.path)) {
			const i = list.value.findIndex((e) => e.sessionId == msg.sessionId);

			if (i >= 0) {
				const d = list.value[i];

				d.unreadCount += 1;
				d.lastChatTime = msg.createTime;
				d.name = msg.user.nickName;
				d.content = msg.content;
				d.contentType = msg.contentType;

				if (i > 0) {
					list.value.splice(i, 1);
					list.value.unshift(d);
				}
			}
		}
	});

	if (socket) {
		// 监听消息：创建会话
		socket.on("sessionCreate", () => {
			if (router.isTab(router.path)) {
				refresh();
			}
		});
	}
});

onShow(() => {
	refresh();
});

onHide(() => {
	menu.visible = false;
});
</script>

<style lang="scss" scoped>
.page-message {
	// #ifdef H5
	padding-bottom: 50px;
	// #endif

	.search {
		display: flex;
		align-items: center;
		padding: 20rpx 0 20rpx 30rpx;
		position: relative;
		background-color: #fff;
		border-bottom: 1rpx solid #f7f7f7;

		.input {
			flex: 1;
		}

		.add {
			margin: 0 30rpx;
		}

		.popover-menu {
			position: absolute;
			right: 14rpx;
			top: 90rpx;
			background-color: rgba(0, 0, 0, 0.9);
			border-radius: 16rpx;
			padding: 10rpx 0;

			.mask {
				position: fixed;
				left: 0;
				top: 0;
				height: 100%;
				width: 100%;
				z-index: 100;
			}

			.list {
				position: relative;
				z-index: 101;

				&::after {
					content: "";
					display: block;
					width: 0;
					height: 0;
					border: 12rpx solid transparent;
					border-bottom-color: rgba(0, 0, 0, 0.9);
					position: absolute;
					top: -32rpx;
					right: 26rpx;
				}

				.item {
					display: flex;
					align-items: center;
					height: 70rpx;
					padding: 0 30rpx;

					image {
						height: 32rpx;
						width: 32rpx;
					}

					text {
						color: #fff;
						font-size: 24rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
	}

	.container {
		.list {
			.item {
				display: flex;
				align-items: center;
				height: 120rpx;
				padding: 0 10rpx;
				flex: 1;

				&:active {
					background-color: #f7f7f7;
				}

				.icon {
					flex-shrink: 0;

					.group {
						display: flex;
						flex-wrap: wrap-reverse;
						justify-content: center;
						align-items: center;
						height: 100rpx;
						width: 100rpx;
						background-color: #f7f7f7;
						border-radius: 10rpx;
						overflow: hidden;
						padding: 4rpx;
						box-sizing: border-box;

						image {
							display: block;
							height: 44rpx;
							width: 44rpx;
							box-sizing: border-box;
							margin: 1rpx;
							background-color: #ddd;
						}
					}
				}

				.content {
					margin: 0 38rpx;
					display: flex;
					flex-direction: column;
					flex: 1;

					.name,
					.message {
						display: block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.name {
						font-size: 28rpx;
						margin-bottom: 10rpx;
						width: 400rpx;
					}

					.message {
						font-size: 24rpx;
						color: #999;
						width: 550rpx;
					}
				}

				.date {
					font-size: 24rpx;
					color: #999;
					position: absolute;
					right: 30rpx;
					top: 30rpx;
				}
			}
		}

		.empty {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 100rpx;

			image {
				width: 400rpx;
			}

			text {
				font-size: 28rpx;
				color: #666;
				margin-top: -50rpx;
			}
		}
	}
}
</style>
