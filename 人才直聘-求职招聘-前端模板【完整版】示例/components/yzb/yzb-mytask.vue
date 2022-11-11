<template>
	<view class="list">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view class="top">
				<text class="title">{{ item.outtask.name }}</text>
				<text class="price">￥{{ item.outtask.money }}</text>
			</view>
			<text class="desc">{{ item.outtask.content }}</text>
			<view class="bottom">
				<view>
					<text class="label-close " v-if="item.outtask.status == 1">待开放</text>
					<text class="label" v-else-if="item.outtask.status == 2">已开放</text>
					<text class="label-close" v-else-if="item.outtask.status == 3">已关闭</text>
					<text class="label-close" v-else-if="item.outtask.status == 4">审核失败</text>
					<text class="label-type">{{ item.outtask.type }}</text>
					<text class="label-type">{{ item.outtask.number }}人报名</text>
				</view>
				<text class="time">{{ formatCreateTime(item.outtask.createTime) }}</text>
			</view>
			<view class="applys-title">
				报名信息:
			</view>
			<view class="applys">
				<text class="">报价{{item.price}}元</text>
				<view class="height-line"></view>
				<text class="">工期{{item.timeLimit}}天</text>
				<view class="height-line"></view>
				<text>{{item.phone}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { formatDate } from '@/common/date';
export default {
	name: 'yzb-task',
	props: {
		list: Array
	},
	data() {
		return {
		};
	},

	methods: {
		onClick(item) {
			this.$emit('click', item);
		},
		
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'yyyy-MM-dd');
		},
	}
};
</script>

<style lang="scss">
.list {
	padding: 20upx;
	.item {
		padding: 10upx;
		border-bottom: 1upx solid $border-color-light;
	}
	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 5upx 0;
		.title {
			font-size: $uni-font-size-lg;
			font-weight: bold;
		}
		.price {
			font-size: $uni-font-size-lg;
			color: $main-color;
		}
	}
	.desc {
		color: $font-color-666;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10upx 0upx;
		text {
			font-size: $uni-font-size-base;
			padding: 5upx 10upx;
			margin-right: 15upx;
			border-radius: 5upx;
		}
		.label-type {
			background-color: $border-color-base;
			color: $font-color-666;
		}
		.label {
			border: 1upx solid $font-color-orange;
			color: $font-color-orange;
		}
		.label-close {
			border: 1upx solid $font-color-999;
			color: $font-color-999;
		}
		.time {
			color: $font-color-666;
		}
	}
	.height-line {
		height: 20rpx;
		width: 4rpx;
		background-color: #cccccc;
		margin: 0 15rpx;
	}
	.applys-title{
		font-weight: bold;
		border-top: dotted 1upx $border-color-base;
	}
	.applys {
		display: flex;
		flex-direction: row;
		align-items: center;
		// color: $font-color-666;
		padding-bottom: 20upx;
		color: $main-color;
	}
}
</style>
