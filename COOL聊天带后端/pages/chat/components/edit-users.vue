<template>
	<cl-popup v-model="visible" direction="bottom" size="70%" :padding="0" @opened="onOpened">
		<view class="edit-users">
			<view class="edit-users__header">
				<cl-button @tap="close">取消</cl-button>
				<cl-button
					type="primary"
					:disabled="selection.length == 0"
					:loading="loading"
					@tap="save"
					>确定({{ selection.length }})</cl-button
				>
			</view>

			<view class="edit-users__container">
				<cl-list-index
					:ref="setRefs('list-index')"
					v-model:selection="selection"
					:data="list"
					:dict="{
						name: 'nickName',
					}"
					selectable
				></cl-list-index>
			</view>
		</view>
	</cl-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";
import { User } from "/@/types";

const emit = defineEmits(["success"]);

const { ui, service, router, refs, setRefs } = useCool();

// 师傅可见
const visible = ref<boolean>(false);

// 加载中
const loading = ref<boolean>(false);

// 组员列表
const list = ref<User.Info[]>([]);

// 选择列表
const selection = ref<User.Info[]>([]);

// 操作
let action = "add";

// 组id
let groupId: any = null;

// 打开
function open(options: any) {
	// 组id
	groupId = options.groupId;
	// 操作
	action = options.action;
	// 默认选中
	selection.value = options.selection;
	// 列表数据
	list.value = options.list;

	// 显示
	visible.value = true;
}

// 打开后
function onOpened() {
	refs.value["list-index"].doLayout();
}

// 关闭
function close() {
	visible.value = false;
}

// 保存
async function save() {
	loading.value = true;

	switch (action) {
		case "create":
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
				});
			break;
		case "add":
			await service.chat.group
				.invite({
					groupId,
					members: selection.value.filter((e) => !e.disabled).map((e) => e.id),
				})
				.then(() => {
					emit("success");
				})
				.catch((err) => {
					ui.showTips(err.message);
				});
			break;
		case "remove":
			await service.chat.group
				.remove({
					groupId,
					members: selection.value.map((e) => e.id),
				})
				.then(() => {
					emit("success");
				})
				.catch((err) => {
					ui.showTips(err.message);
				});
			break;
	}

	close();
	loading.value = false;
}

defineExpose({
	open,
	close,
});
</script>

<style lang="scss" scoped>
.edit-users {
	display: flex;
	flex-direction: column;
	height: 100%;

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		padding: 10rpx 20rpx 0 20rpx;
	}

	&__container {
		flex: 1;
		height: calc(100% - 90rpx);
	}
}
</style>
