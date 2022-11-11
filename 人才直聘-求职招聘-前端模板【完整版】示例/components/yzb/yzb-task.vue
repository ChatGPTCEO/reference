<template>
	<view class="list">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view class="top">
				<text class="title">{{ item.name }}</text>
				<text class="price">￥{{ item.money }}</text>
			</view>
			<text class="desc">{{ item.content }}</text>
			<view class="bottom">
				<view>
					<text class="label">匹配中</text>
					<text class="label-type">{{ item.type }}</text>
					<text class="label-type">{{ item.number }}人报名</text>
				</view>
				<text class="time">{{ formatCreateTime(item.createTime) }}</text>
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
		.time {
			color: $font-color-666;
		}
	}
}
</style>
