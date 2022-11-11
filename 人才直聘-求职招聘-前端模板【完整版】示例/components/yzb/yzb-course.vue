<template>
	<view class="list">
		<view class="item" v-for="(item,index) in list" :key="index" @click="onClick(item)">
			<view class="left">
				<view class="img">
					<image :src="item.url"></image>
				</view>
				<view class="middle">
					<text class="title">{{item.name}}</text>
					<text class="name">授课教师：{{item.teachers}}</text>
					<view class="info">
						<text class="time">
							开课时间：{{formatCreateTime(item.startTime)}}
						</text>
						<text class="number">{{item.number}}人报名</text>
					</view>
				</view>
			</view>
			<text class="yzb yzb-next"></text>
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
			return formatDate(date, 'MM-dd hh:mm');
		},
	}
};
</script>

<style lang="scss">
.list {
	padding: 20upx;
	.item{
		padding: 15upx 0;
		border-bottom: 1upx solid $border-color-light;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.left{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}
	
	.img{
		image{
			width: 180upx;
			height: 180upx;
			border-radius: 10upx;
		}
	}
	.middle{
		box-sizing: border-box;
		padding: 20upx;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title{
			line-height: 1.4;
			font-weight: bold;
			font-size: $uni-font-size-base;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.name{
			color: $font-color-666;
		}
		.info{
			display: flex;
			flex-direction: row;
			width: 100%;
			justify-content: space-between;
			
			.time{
				color: $font-color-666;
			}
			.number{
				color:$font-color-orange
			}
		}
	}
}
</style>
