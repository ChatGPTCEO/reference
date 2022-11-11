<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view v-if="item.type == 0" class="job">
				<view class="title space-between">
					<view class="left">
						<text class="title-name">{{ item.position.postName }}</text>
						<text class="title-share" v-if="item.position.positionType == 3">共享</text>
					</view>
					<text class="right">{{ item.position.salary }}</text>
				</view>
				<view class="company">
					{{ item.companyName }}
					<view class="height-line"></view>
					{{ item.companyStaffSize }}
					<view class="height-line"></view>
					{{ item.companyNature }}
				</view>
				<view class="desc">
					<text>{{ item.position.expRequire }}</text>
					<text>{{ item.position.minEducation }}</text>
					<text v-if="item.position.skill" v-for="(item2, index2) in item.position.skill.split(',')" :key="index2">{{ item2 }}</text>
				</view>
				<view class="user">
					<view class="left">
						<image :src="item.memberAvatar"></image>
						<text class="name">{{ item.memberName }}</text>
						<text class="post">{{ item.memberPostName }}</text>
					</view>
					<view class="right" @click.stop="deleteItem(item)"><text class="yzb yzb-shanchu"></text></view>
				</view>
			</view>
			<view v-else-if="item.type == 1" class="course">
				<view class="left">
					<view class="img"><image :src="item.course.url"></image></view>
					<view class="middle">
						<text class="title">{{ item.course.name }}</text>
						<text class="name">授课教师：{{ item.course.teachers }}</text>
						<view class="info">
							<text class="time">开课时间：{{ formatCreateTime(item.course.startTime) }}</text>
							<text class="number">{{ item.course.number }}人报名</text>
						</view>
					</view>
				</view>
				<text class="yzb yzb-next"></text>
			</view>
			<view v-else-if="item.type == 2" class="task">
				<view class="top">
					<text class="title">{{ item.task.name }}</text>
					<text class="price">￥{{ item.task.money }}</text>
				</view>
				<text class="desc">{{ item.task.content }}</text>
				<view class="bottom">
					<view>
						<text class="label">匹配中</text>
						<text class="label-type">{{ item.task.type }}</text>
						<text class="label-type">{{ item.task.number }}人报名</text>
					</view>
					<text class="time">{{ formatCreateTime(item.task.createTime) }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { formatDate, calCurrentYear } from '@/common/date';
export default {
	name: 'yzb-collect',
	props: {
		list: Array
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1
		};
	},

	methods: {
		onClick(item) {
			this.$emit('click', item);
		},
		deleteItem(item) {
			this.$emit('onDelete', item);
		},
		formatAge(birthday) {
			return calCurrentYear(birthday);
		},
		formatString(val) {
			if (!val) {
				return '';
			}
			return val.split(',');
		},
		formatCreateTime(time) {
			if (time == null || time === '') {
				return null;
			}
			let str = time.replace(/-/g,'/');
			let date = new Date(str);
			return formatDate(date, 'MM-dd hh:mm');
		}
	}
};
</script>

<style lang="scss">
.m-position {
	.item {
		background-color: $bgcolor_white;
		// border-bottom: 3upx solid $border-color-light;
	}

	.job {
		border-bottom: 3upx solid $border-color-light;
		padding: 30upx 20upx;
		.title {
			.left {
				font-weight: bold;
				font-size: $uni-font-size-lg;
			}
			.title-name {
				font-weight: bold;
				font-size: $uni-font-size-lg;
			}
			.title-share {
				color: $main-color;
				border: 1upx solid $main-color;
				border-radius: 20upx 0upx;
				// height: 38upx;
				// width: 130upx;
				font-size: $uni-font-size-sm;
				margin-left: 20upx;
				padding: 0upx 10upx;
			}
			.right {
				color: $uni-color-warning;
				font-weight: bold;
			}
		}

		.company {
			color: $font-color-666;
			margin-top: 5upx;
			font-size: $uni-font-size-base;
			display: flex;
			flex-direction: row;
			align-items: center;
			.height-line {
				height: 20upx;
				width: 4upx;
				background-color: $font-color-ccc;
				margin: 0 15upx;
			}
		}

		.desc {
			margin-top: 10upx;
			text {
				font-size: $uni-font-size-base;
				padding: 5upx 10upx;
				margin-right: 15upx;
				background-color: $border-color-base;
				border-radius: 5upx;
				color: $font-color-666;
			}
		}

		.user {
			margin-top: 25upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			image {
				width: 60upx;
				height: 60upx;
				border-radius: 30upx;
			}
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: $uni-font-size-base;
				.name {
					margin: 0 20upx;
				}
				.post {
					// color: $font-color-666;
				}
			}
			.right {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: $font-color-666;
				font-size: $uni-font-size-base;
				.area {
					margin-right: 15upx;
				}
				.yzb-shanchu {
					font-size: $font-size-40;
					color: $uni-color-error;
				}
			}
		}
	}

	.course {
		padding: 15upx 20upx;
		border-bottom: 1upx solid $border-color-light;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
		}

		.img {
			image {
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
			}
		}
		.middle {
			box-sizing: border-box;
			padding: 20upx;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.title {
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
			.name {
				color: $font-color-666;
			}
			.info {
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: space-between;

				.time {
					color: $font-color-666;
				}
				.number {
					color: $font-color-orange;
				}
			}
		}
	}
	.task {
		padding: 20upx;
		border-bottom: 1upx solid $border-color-light;
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
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
</style>
