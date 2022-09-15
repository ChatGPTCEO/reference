<template>
	<cl-page>
		<view class="page-chat-detail">
			<view class="users">
				<cl-grid :column="5">
					<cl-grid-item v-for="(item, index) in info.members" :key="index">
						<view class="item" @tap="toUser(item)">
							<view class="icon">
								<cl-avatar shape="square" :size="90" :src="item.avatar"></cl-avatar>
							</view>
							<cl-text color="#C5C6C5" :value="item.nickName" :ellipsis="1"></cl-text>
						</view>
					</cl-grid-item>

					<template v-if="info.isGroup">
						<cl-grid-item>
							<!-- 添加组员 -->
							<view class="item is-add" @tap="openUsers('add')">
								<view class="icon">
									<text class="cl-icon-plus"></text>
								</view>
							</view>
						</cl-grid-item>

						<cl-grid-item>
							<!-- 移除组员 -->
							<view
								class="item is-minus"
								@tap="openUsers('remove')"
								v-if="user.info.id == info.userId"
							>
								<view class="icon">
									<text class="cl-icon-minus"></text>
								</view>
							</view>
						</cl-grid-item>
					</template>

					<template v-else>
						<!-- 创建新群组 -->
						<cl-grid-item>
							<view class="item is-add" @tap="openUsers('create')">
								<view class="icon">
									<text class="cl-icon-plus"></text>
								</view>
							</view>
						</cl-grid-item>
					</template>
				</cl-grid>
			</view>

			<view class="container">
				<cl-list v-if="info.isGroup">
					<cl-list-item label="修改名称" @tap="openName">{{ info.name }}</cl-list-item>
				</cl-list>

				<cl-list>
					<cl-list-item label="查找聊天内容"></cl-list-item>
					<cl-list-item label="投诉"></cl-list-item>
				</cl-list>

				<cl-list justify="center">
					<cl-list-item :arrow-icon="false" @tap="clear">
						<cl-text :size="28" color="red" value="清空聊天记录"></cl-text>
					</cl-list-item>

					<cl-list-item :arrow-icon="false" @tap="quit">
						<cl-text :size="28" color="red" value="删除并退出"></cl-text>
					</cl-list-item>
				</cl-list>
			</view>
		</view>

		<!-- 编辑组员 -->
		<edit-users :ref="setRefs('edit-users')" @success="refresh()" />

		<!-- 编辑群名称 -->
		<edit-name :ref="setRefs('edit-name')" @success="refresh()" />

		<!-- 弹出菜单 -->
		<cl-action-sheet ref="ActionSheet"></cl-action-sheet>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useCool, useStore } from "/@/cool";
import { User } from "/@/types";
import { useChat } from "/@/hooks";
import EditUsers from "./components/edit-users.vue";
import EditName from "./components/edit-name.vue";

const { service, router, refs, setRefs, ui } = useCool();

const { user } = useStore();

// 聊天
const { friend, session } = useChat();

// 弹出菜单
const ActionSheet = ref<ClActionSheet.Ref>();

// 详情
const info = ref<any>({
	name: "",
	num: "",
	isGroup: false,
	members: [],
	userId: null,
});

// 刷新
function refresh() {
	const { userId, groupId } = router.query;

	if (userId) {
		service.chat.friend
			.info({
				id: userId,
			})
			.then((res) => {
				res.members = [res];
				info.value = res;
			});
	}

	if (groupId) {
		service.chat.group
			.info({
				id: groupId,
			})
			.then((res) => {
				res.isGroup = true;
				info.value = res;
			});
	}
}

// 删除、退出
function quit() {
	ActionSheet.value?.open({
		list: [
			{
				label: "退出后不会通知群聊中其他成员，且不会再接收此群聊消息",
				disabled: true,
				size: "24rpx",
			},
			{
				label: "确认",
				color: "red",
			},
		],
		callback(action) {
			if (action == 1) {
				service.chat.group[info.value.userId == user.info?.id ? "dissolve" : "quit"]({
					groupId: info.value.id,
				})
					.then(() => {
						router.home();
					})
					.catch((err) => {
						ui.showTips(err.message);
					});
			}
		},
	});
}

// 清空记录
function clear() {
	ActionSheet.value?.open({
		list: [
			{
				label: "清空聊天记录",
				color: "red",
			},
		],
		callback(action) {
			if (action == 0) {
				service.chat.message
					.clear({
						sessionId: session.info?.sessionId,
					})
					.then(() => {
						ui.showTips("已清空聊天记录", () => {
							router.home();
						});
					})
					.catch((err) => {
						ui.showTips(err.message);
					});
			}
		},
	});
}

// 用户详情
function toUser(item: any) {
	router.push({
		path: "/pages/chat/user-detail",
		query: {
			id: item.id,
		},
	});
}

// 编辑名称
function openName() {
	refs.value["edit-name"].open(info.value);
}

// 添加、移除组员
function openUsers(action: "add" | "remove" | "create") {
	const d: any = {
		groupId: router.query.groupId,
		action,
		list: [],
		selection: [],
	};

	switch (action) {
		case "remove":
			d.list = info.value.members.filter((e: any) => e.id != user.info?.id);
			break;
		case "add":
			d.list = friend.list;
			d.selection = info.value.members.map((e: any) => {
				return {
					disabled: true,
					...e,
				};
			});
			break;
		case "create":
			d.list = friend.list;
			d.selection = info.value.members;
			break;
	}

	refs.value["edit-users"].open(d);
}

onReady(() => {
	info.value.isGroup = Boolean(router.query.groupId);
	refresh();
});
</script>

<style lang="scss" scoped>
.page-chat-detail {
	.users {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx 20rpx 10rpx 20rpx;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 150rpx;
			margin-bottom: 20rpx;
			.icon {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 90rpx;
				width: 90rpx;
				border-radius: 10rpx;
				border: 2rpx solid #eee;
				margin-bottom: 15rpx;

				text {
					font-size: 34rpx;
					color: #999;
					font-weight: bold;
				}
			}

			text {
				font-size: 24rpx;
				color: #c5c6c5;
			}

			&.is-add,
			&.is-minus {
				.icon {
					border-style: dashed;
				}
			}
		}
	}
}
</style>
