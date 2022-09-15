<template>
	<cl-page>
		<view class="page-set" v-if="user.info">
			<cl-list :radius="16">
				<cl-list-item label="头像" :arrow-icon="false" @tap="onAvatar">
					<cl-avatar round :size="108" :src="user.info.avatar" />
				</cl-list-item>
				<cl-list-item label="昵称" :arrow-icon="false">
					<cl-text :value="user.info.nickName" color="#666"></cl-text>
				</cl-list-item>
				<cl-list-item label="账号" :arrow-icon="false">
					<cl-text :value="user.info.num" color="#666"></cl-text>
				</cl-list-item>
				<cl-list-item label="性别" :arrow-icon="false">
					<cl-text
						:value="`${user.info.sex == 0 ? '未知' : user.info.sex == 1 ? '男' : '女'}`"
						color="#666"
					></cl-text>
				</cl-list-item>
				<cl-list-item label="编辑资料" @tap="toPage('/pages/user/edit')"> </cl-list-item>
			</cl-list>

			<cl-list :radius="16">
				<cl-list-item label="关于我们" @tap="toPage('/pages/user/about')"> </cl-list-item>
				<cl-list-item label="用户协议"> </cl-list-item>
				<cl-list-item label="隐私政策"> </cl-list-item>

				<cl-list-item label="软件升级" :border="false">
					<cl-text
						:value="`新版本 v${app.version.versionNo}`"
						color="red"
						:size="28"
						v-if="app.version"
					></cl-text>
					<cl-text value="已经是最新版本" color="#666" :size="28" v-else></cl-text>
				</cl-list-item>
			</cl-list>

			<view class="op">
				<cl-button fill round plain :height="80" type="error" @tap="user.logout"
					>退出登录</cl-button
				>
			</view>
		</view>

		<!-- 底部菜单 -->
		<cl-action-sheet ref="ActionSheet"></cl-action-sheet>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool, useStore } from "/@/cool";

const { router, upload } = useCool();
const { user, app } = useStore();

// 菜单
const ActionSheet = ref<ClActionSheet.Ref>();

// 跳页面
function toPage(path: string) {
	router.push(path);
}

// 更新头像
function onAvatar() {
	ActionSheet.value?.open({
		list: [
			{
				label: "选择图片",
			},
		],
		callback(action) {
			if (action == 0) {
				uni.chooseImage({
					count: 1,
					sourceType: ["album", "camera"],
					success(res) {
						upload(res.tempFiles[0]).then(async (res) => {
							await user.update({ avatar: res });
							user.get();
						});
					},
				});
			}
		},
	});
}
</script>

<style lang="scss" scoped>
.page-set {
	padding: 20rpx 24rpx;

	.op {
		margin-top: 72rpx;
	}
}
</style>
