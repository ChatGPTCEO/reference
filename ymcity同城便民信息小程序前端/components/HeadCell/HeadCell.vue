<template>
	<view>
		<view class="ym-head" :style="{'padding':leftShow?'20rpx':'10rpx'}">
			<view class="head-left" v-if="leftShow">
				<u-image width="50rpx" height="50rpx" :src="leftIcon"></u-image>
				<text style="margin-left: 10rpx;">{{title}}</text>
			</view>
			<view class="head-tab" :style="{'width':rightShow?'580rpx':'100%'}" v-else>
				<u-tabs :list="tabs" bg-color="transparent" :height="65" active-color="#f44c01" :current="tabCurrent"
					@change="tabChange"></u-tabs>
			</view>
			<view class="head-right" v-if="rightShow" @click="rigthClick">
				<text>更多</text>
				<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "HeadCell",
		props: {
			title: {
				type: String,
				default: ''
			},
			leftIcon: {
				type: String,
				default: ''
			},
			leftShow: {
				type: Boolean,
				default: true
			},
			rightShow:{
				type: Boolean,
				default: true
			},
			tabs: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				tabCurrent: 0
			};
		},
		methods: {
			tabChange(index) {
				this.tabCurrent = index
				this.$emit('tabChange', index);
			},
			rigthClick(){
				this.$emit('rigthClick');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ym-head {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: linear-gradient(315deg, #fff, rgba(255, 195, 0, .3));
		padding: 20rpx;
		margin: 0 20rpx;
		border-top-left-radius: 25rpx;
		
		.head-left {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
		}

		.head-right {
			font-size: 26rpx;
			color: #999999;
			width: 120rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
		}
	}
</style>
