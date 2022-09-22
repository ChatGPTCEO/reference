<template>
	<view class="content">
		<view class="warpv">
			阿康
		</view>
		<u-cell-group>
			<u-cell-item icon="heart" title="动态列表" value="我有的你不一定有" :arrow="true" @click="toDynamic()"></u-cell-item>
			<u-cell-item icon="chrome-circle-fill" title="loading" value="七彩虹效果" :arrow="true" @click="toLoading()"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				
			};
		},
		methods: {
			toDynamic(){
				uni.navigateTo({
					url: './dynamic'
				})
			},
			toLoading(){
				uni.navigateTo({
					url: './loading'
				})
			},
		}
	};
</script>
<style lang="scss">
	.warpv{
		font-size: 25px;
		text-align: center;
		padding: 20px;
		text-shadow: 5px 3px 0px #FFC107;
	}
</style>