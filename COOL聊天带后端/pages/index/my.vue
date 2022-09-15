<template>
	<cl-page>
		<view class="page-my">
			<view class="info" v-if="user.info" @tap="toPage('/pages/user/set')">
				<cl-avatar :size="96" :src="user.info.avatar"></cl-avatar>

				<view class="det">
					<cl-text :size="36" bold block :value="user.info.nickName"></cl-text>
					<cl-text
						color="#999"
						:value="`账号：${user.info.num}`"
						@tap.stop="toCopy"
					></cl-text>
				</view>
			</view>

			<view class="container">
				<cl-list>
					<cl-list-item label="钱包" @tap="toDev">
						<template #icon>
							<image class="icon" src="/static/icon/wallet.png" mode="aspectFit" />
						</template>
					</cl-list-item>
					<cl-list-item label="收藏" @tap="toDev">
						<template #icon>
							<image
								class="icon"
								src="/static/icon/collection.png"
								mode="aspectFit"
							/>
						</template>
					</cl-list-item>
					<cl-list-item label="客服" @tap="toDev">
						<template #icon>
							<image class="icon" src="/static/icon/cs.png" mode="aspectFit" />
						</template>
					</cl-list-item>
					<cl-list-item label="设置" @tap="toPage('/pages/user/set')">
						<template #icon>
							<image class="icon" src="/static/icon/set.png" mode="aspectFit" />
						</template>
					</cl-list-item>
				</cl-list>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onShow } from "@dcloudio/uni-app";
import { useCool, useStore } from "/@/cool";

const { router, ui } = useCool();
const { user } = useStore();

// 刷新
async function refresh() {
	return user.get();
}

// 跳页面
function toPage(path: string) {
	router.push(path);
}

// 复制
function toCopy() {
	uni.setClipboardData({
		data: user.info?.num || "",
	});
}

// 开发中
function toDev() {
	ui.showToast("开发中");
}

onShow(() => {
	if (!user.token) {
		return router.login();
	}

	refresh();
});
</script>

<style lang="scss" scoped>
.page-my {
	height: 100%;
	background-color: #fff;

	.info {
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		height: 200rpx;

		.det {
			margin-left: 20rpx;
			flex: 1;
		}
	}

	.container {
		padding: 0 30rpx;

		.icon {
			height: 34rpx;
			width: 34rpx;
		}

		:deep(.cl-list-item__container) {
			padding: 0;
		}
	}
}
</style>
