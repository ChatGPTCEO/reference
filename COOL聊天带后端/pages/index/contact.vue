<template>
	<cl-page>
		<view class="page-contact">
			<cl-list-index
				:data="friend.list"
				:dict="{
					name: 'nickName',
				}"
				@select="toDetail"
			>
				<template #append>
					<view class="count"> 共{{ friend.list.length }}个朋友 </view>
				</template>
			</cl-list-index>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { computed } from "vue-demi";
import { useCool } from "/@/cool";
import { useChat } from "/@/hooks";

const { router } = useCool();

// 聊天缓存
const { friend } = useChat();

// 联系人详情
function toDetail(item: any) {
	router.push({
		path: "/pages/chat/user-detail",
		query: {
			id: item.id,
		},
	});
}

// 刷新
function refresh() {
	friend.get();
}

onShow(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.page-contact {
	height: 100%;
	.count {
		font-size: 24rpx;
		text-align: center;
		padding: 20rpx;
	}
}
</style>
