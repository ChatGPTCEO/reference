<template>
	<cl-page>
		<view class="page-create-group">
			<view class="container">
				<cl-list-index
					v-model:selection="selection"
					:data="friend.list"
					:dict="{
						name: 'nickName',
					}"
					selectable
				>
				</cl-list-index>
			</view>

			<view class="footer">
				<cl-button :disabled="selection.length < 2" type="primary" @tap="save"
					>完成({{ selection.length }})</cl-button
				>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useCool } from "/@/cool";
import { useChat } from "/@/hooks";

const { service, ui, router } = useCool();

const { friend } = useChat();

// 选择列表
const selection = ref<any[]>([]);

// 完成
async function save() {
	ui.showLoading();

	await service.chat.group
		.create({
			members: selection.value.map((e) => e.id),
		})
		.then((res) => {
			ui.showTips("创建成功", () => {
				if (res) {
					router.push({
						path: "/pages/chat/index",
						mode: "redirectTo",
						query: {
							groupId: res.groupId,
						},
					});
				} else {
					router.home();
				}
			});
		})
		.catch((err) => {
			ui.showTips(err);
		});

	ui.hideLoading();
}

onReady(() => {
	friend.get();
});
</script>

<style lang="scss" scoped>
.page-create-group {
	height: 100%;
	overflow: hidden;

	.container {
		height: calc(100% - 100rpx);
		height: calc(100% - 100rpx - env(safe-area-inset-bottom));
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background-color: #fff;
		height: 99rpx;
		padding: 0 30rpx;
		padding-bottom: env(safe-area-inset-bottom);
		border-top: 1rpx solid #f7f7f7;
	}
}
</style>
