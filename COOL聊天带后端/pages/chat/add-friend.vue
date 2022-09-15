<template>
	<cl-page>
		<view class="page-add-friend">
			<view class="search">
				<cl-search model-value="" placeholder="账号/手机号" @search="onSearch"></cl-search>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { useCool } from "/@/cool";

const { service, router, ui } = useCool();

// 搜索
function onSearch(val: string) {
	if (val) {
		service.chat.friend
			.search({ num: val })
			.then((res) => {
				if (res) {
					router.push({
						path: "/pages/chat/user-detail",
						query: {
							id: res.id,
						},
						mode: "redirectTo",
					});
				} else {
					ui.showTips("该用户不存在");
				}
			})
			.catch((err) => {
				ui.showTips(err.message);
			});
	}
}
</script>

<style lang="scss" scoped>
.page-add-friend {
	.search {
	}
}
</style>
