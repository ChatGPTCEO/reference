<template>
	<cl-page>
		<view class="page-h5">
			<web-view :src="url" allow></web-view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { useCool } from "/@/cool";

const { router, service } = useCool();

const url = ref<string>("");

onReady(() => {
	uni.setNavigationBarTitle({
		title: router.params.title,
	});

	url.value = router.params.url;
});
</script>
