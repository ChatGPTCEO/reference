<template>
	<cl-page>
		<cl-topbar title="编辑资料" :border="false">
			<template #append>
				<cl-button
					:height="60"
					:width="120"
					size="mini"
					type="success"
					:margin="[0, 20, 0, 0]"
					@tap="save"
					>完成</cl-button
				>
			</template>
		</cl-topbar>

		<view class="page-user-edit">
			<cl-form ref="Form" v-model="form" :rules="rules">
				<cl-form-item label="昵称" prop="nickName">
					<cl-input
						placeholder="请填写昵称"
						clearable
						v-model="form.nickName"
						maxlength="20"
					></cl-input>
				</cl-form-item>
				<cl-form-item label="性别" prop="sex">
					<cl-select v-model="form.sex" :options="options.sex"></cl-select>
				</cl-form-item>
			</cl-form>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";
import { useCool, useStore } from "/@/cool";

const { service, ui, router } = useCool();

// 用户
const { user } = useStore();

// cl-form
const Form = ref<any>();

// 表单值
const form = ref<any>({
	nickName: "",
	sex: 0,
});

// 验证
const rules = reactive<any>({
	nickName: {
		required: true,
		message: "请填写昵称",
	},
});

// 选项
const options = reactive<any>({
	sex: [
		{
			label: "男",
			value: 1,
		},
		{
			label: "女",
			value: 2,
		},
		{
			label: "未知",
			value: 0,
		},
	],
});

// 保存
function save() {
	Form.value.validate((valid: boolean) => {
		console.log(valid);
		if (valid) {
			service.user.user
				.update(form.value)
				.then(() => {
					ui.showTips("编辑成功", router.back);
					user.get();
				})
				.catch((err) => {
					ui.showTips(err.message);
				});
		}
	});
}

onReady(() => {
	form.value = user.info;
});
</script>

<style lang="scss" scoped>
.page-user-edit {
	background-color: #fff;
	box-sizing: border-box;
	padding: 30rpx;

	.btn {
		margin-top: 50rpx;
	}
}
</style>
