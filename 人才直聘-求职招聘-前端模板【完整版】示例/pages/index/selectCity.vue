<template>
	<view>
		<view class="body" :style="{ 'margin-top': topHeight + 'px' }">
			<citySelect @selectCity="selectCity"></citySelect>
		</view>
	</view>
</template>

<script>
import citySelect from '@/components/yzb/yzb-city-select.vue';
export default {
	components: {
		citySelect
	},
	data() {
		return {
			topHeight: 0,//120
			type:0,
		};
	},

	onLoad(options) {
		console.log(options);
		if(options.type){
			this.type=options.type;
		}
	},

	onShow() {
		
	},

	methods: {
		returnIndex() {
			uni.navigateBack({
				delta: 1
			});
		},
		selectCity(item) {
			console.log('selectCity====', item);
			if(this.type==1){
				uni.$emit('expect-city', item);
			}else{
				uni.$emit('city', item);
			}
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>
<style lang="scss">
.Icons {
	padding: 0 10rpx;
}

button::after {
	border: none;
}

.topFixed {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background: #ffffff;
	z-index: 999;
}

.navCon {
	width: 100%;
	padding: 60rpx 20rpx 20rpx 20rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	box-sizing: border-box;

	button {
		background: none;
		padding: 0;
		margin: 0;
		color: #4395ff;
		font-size: 32rpx;
	}

	label {
		font-size: 38rpx;
		font-weight: bold;
		line-height: 80rpx;
		margin-left: 60rpx;
	}
}

.selectCon {
	display: flex;
	flex-direction: row;
	margin: 20rpx;
	background: #f4f5f9;
	border-radius: 100rpx;
	padding: 20rpx 30rpx;

	.address {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-right: 2rpx solid #c1c2cd;

		text {
			font-size: 28rpx;
			color: #333;
		}
	}

	.inputView {
		padding: 0 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		flex: 1;

		input {
			font-size: 28rpx;
		}

		.inputClear {
			position: absolute;
			right: 0;
			top: 0;
		}
	}
}

.searchResult {
	padding: 0 30rpx;
	display: flex;
	flex-direction: column;

	.searchList {
		display: flex;
		flex-direction: column;
		padding: 30rpx 0;
		border-bottom: 2rpx solid #eaeaea;

		.seInfo {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			label {
				font-weight: bold;
			}
		}

		text {
			font-size: 28rpx;
			color: #999999;
		}

		.seAdd {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 10rpx;
		}
	}
}

.historyCon {
	padding: 30rpx 30rpx 0 30rpx;

	.historyTitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
	}

	.historyList {
		text {
			padding: 8rpx 16rpx;
			background: #f4f5f9;
			border-radius: 8rpx;
			margin: 0 30rpx 30rpx 0;
			display: inline-block;
			font-size: 28rpx;
			color: #999999;
		}
	}
}
</style>
