<template>
	<cl-page>
		<view class="page-user-detail" v-if="info">
			<view class="info">
				<cl-avatar :size="100" shape="square" :src="info.avatar"></cl-avatar>

				<view class="det">
					<view class="name">
						<cl-text
							:size="34"
							:value="info.nickName"
							:margin="[0, 10, 0, 0]"
						></cl-text>
						<cl-icon
							color="#409EFF"
							class-name="chat-icon-man"
							:size="36"
							v-if="info.sex == 1"
						></cl-icon>
						<cl-icon
							color="#F56C6C"
							class-name="chat-icon-woman"
							:size="36"
							v-else-if="info.sex == 2"
						></cl-icon>
						<cl-text value="未知" v-else></cl-text>
					</view>

					<cl-text block :value="`账号：${info.num}`"></cl-text>
				</view>
			</view>

			<view class="container">
				<view class="list">
					<cl-list>
						<cl-list-item label="备注和标签"></cl-list-item>
						<cl-list-item label="朋友圈"></cl-list-item>
					</cl-list>

					<cl-list>
						<cl-list-item label="加入黑名单"></cl-list-item>
						<cl-list-item label="投诉"></cl-list-item>
					</cl-list>

					<cl-list justify="center" v-if="!info.yourself">
						<template v-if="info.isFriend">
							<cl-list-item :arrow-icon="false" @tap="send">
								<cl-text :size="30" value="发消息"></cl-text>
							</cl-list-item>

							<cl-list-item :arrow-icon="false" @tap="del">
								<cl-text color="error" :size="30" value="删除"></cl-text>
							</cl-list-item>
						</template>

						<template v-else>
							<cl-list-item :arrow-icon="false" @tap="add">
								<cl-text :size="30" value="添加到通讯录"></cl-text>
							</cl-list-item>
						</template>
					</cl-list>
				</view>
			</view>
		</view>

		<!-- 弹出菜单 -->
		<cl-action-sheet ref="ActionSheet"></cl-action-sheet>
	</cl-page>
</template>

<script lang="ts" setup>
import { onPullDownRefresh, onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useCool } from "/@/cool";
import { useChat } from "/@/hooks";

const { ui, router, service } = useCool();

// 聊天
const { friend } = useChat();

// 弹出菜单
const ActionSheet = ref<ClActionSheet.Ref>();

// 用户信息
const info = ref<any>();

// 刷新
async function refresh() {
	ui.showLoading();

	await service.chat.friend
		.info({
			id: router.query.id,
		})
		.then((res) => {
			info.value = res;
		});

	ui.hideLoading();
}

// 添加
async function add() {
	ui.showLoading();

	await service.chat.friend
		.add({
			id: router.query.id,
		})
		.then(() => {
			ui.showTips("成功添加该联系人");
			friend.get();
			refresh();
		})
		.catch((err) => {
			ui.showTips(err.message);
		});

	ui.hideLoading();
}

// 发消息
function send() {
	router.push({
		path: "/pages/chat/index",
		mode: "redirectTo",
		query: {
			userId: router.query.id,
		},
	});
}

// 删除
async function del() {
	ActionSheet.value?.open({
		list: [
			{
				label: `将联系人“${info.value.nickName}”删除，同时删除与该联系人的聊天记录`,
				disabled: true,
				size: "24rpx",
			},
			{
				label: "删除联系人",
				color: "red",
			},
		],
		callback(action) {
			if (action == 1) {
				service.chat.friend
					.delete({
						ids: [info.value.id],
					})
					.then(() => {
						ui.showTips("成功删除该联系人", () => {
							router.home();
						});
						friend.get();
					})
					.catch((err) => {
						ui.showTips(err.message);
					});
			}
		},
	});
}

onPullDownRefresh(async () => {
	await refresh();
	uni.stopPullDownRefresh();
});

onReady(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.page-user-detail {
	.info {
		display: flex;
		padding: 30rpx;
		background-color: #fff;

		.det {
			margin-left: 30rpx;
			flex: 1;

			.name {
				display: flex;
				align-items: center;
			}
		}
	}

	.container {
		.list {
			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 90rpx;
				background-color: #fff;
			}
		}
	}
}
</style>
