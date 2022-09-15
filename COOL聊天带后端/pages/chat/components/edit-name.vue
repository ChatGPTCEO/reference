<template>
	<cl-confirm ref="Confirm">
		<view class="edit-name">
			<cl-input v-model="name" clearable placeholder="未命名" maxlength="20"></cl-input>
		</view>
	</cl-confirm>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool } from "/@/cool";

const emit = defineEmits(["success"]);

const { ui, service } = useCool();

// cl-confirm
const Confirm = ref<ClConfirm.Ref>();

// 名称
const name = ref<string>("");

// 打开
function open(data: any) {
	name.value = data.name || "";

	Confirm.value?.open({
		title: "修改名称",
		showCancelButton: false,
		beforeClose(action, { done }) {
			if (action == "confirm") {
				if (!name.value) {
					return ui.showToast("请填写");
				}

				service.chat.group
					.update({
						id: data.id,
						name: name.value,
					})
					.then(() => {
						ui.showToast("修改成功");
						emit("success");
						done();
					})
					.catch((err) => {
						ui.showToast(err.message);
					});
			}
		},
	});
}

defineExpose({
	open,
});
</script>
