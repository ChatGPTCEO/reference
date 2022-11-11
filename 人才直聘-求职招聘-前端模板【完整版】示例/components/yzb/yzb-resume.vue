<template>
	<view class="m-position">
		<view class="item" v-for="(item, index) in list" :key="index" @click="onClick(item)">
			<view class="title space-between">
				<view class="left">
					<text class="name">{{item.name}}</text>
					<view class="skill">
						{{formatAge(item.timeToWork)}}年
						<view class="height-line"></view>
						本科
						<view class="height-line"></view>
						{{item.salary || '无'}}
					</view>
				</view>
				<view class="right">
					<image class="right" :src="item.avatar?item.avatar:'/static/img/head.png'"></image>
				</view>
				
			</view>
			<view class="exp" v-if="item.companyName">
				<view class="exp-item">
					<text class="yzb yzb-gongzuobao top-icon"></text>
					<text class="name">{{item.companyName}} · {{item.postName}}</text>
				</view>
				<!-- <view class="item">
					<text class="yzb yzb-xueli top-icon"></text>
					<text>{{position.minEducation}}</text>
				</view> -->
			</view>
			<view class="desc" v-if="item.skill">
				<!-- <text>{{item.expRequire}}</text> -->
				<!-- <text>{{item.education}}</text> -->
				<text v-for="(item2,index2) in formatString(item.skill)" :key="index2" >{{item2}}</text>
			</view>
			<!-- <view class="user">
				<view class="left">
					<image :src="item.memberAvatar"></image>
					<text class="name">{{item.memberName}}</text>
					<text class="post">{{item.memberPostName}}</text>
				</view>
				<view class="right">
					<text class="area">南康区</text>
					<text class="address">家具城</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import mEmptyData from '@/components/m-empty-data/m-empty-data.vue';
import {
		formatDate,
		calCurrentYear
	} from '@/common/date';
export default {
	name: 'm-position',
	props: {
		list: Array
	},
	components: {
		mEmptyData
	},
	data() {
		return {
			no_order_1: this.$mAssetsPath.no_order_1,
		};
	},

	methods: {
		onClick(item) {
			console.log('1111111', item);
			this.$emit('click', item);
		},
		
		formatAge(birthday){
			return calCurrentYear(birthday);
		},
		
		formatString(val){
			if(!val){
				return ''
			}
			if(val instanceof Array){
				return val
			}
			return val.split(",");
		}
	}
};
</script>

<style lang="scss">
.m-position {
	.item {
		background-color: $bgcolor_white;
		padding: 30upx 20upx;
		// margin-bottom: 20upx;
		border-bottom: 3upx solid $border-color-light;
	}
}
.space-between {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
}
.title {
	display: flex;
	flex-direction: row;
	align-items: center;
	.left {
		display: flex;
		flex-direction: column;
		.name{
			font-weight: bold;
			font-size: $uni-font-size-lg;
		}
		.skill {
			color: $font-color-666;
			margin-top: 5upx;
			font-size: $uni-font-size-sm;
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
	}
	.right {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
		// border: 1upx solid $border-color-base;
	}
}

.company {
	color: $font-color-666;
	margin-top: 15upx;
	font-size: $uni-font-size-sm;
	.left {
		margin-right: 15upx;
	}
}

.exp{
	line-height: 1.2;
	.exp-item{
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 1.2;
		.top-icon{
			margin-right: 10upx;
			margin-top: 3upx;
		}
		.name{
			color: $font-color-666;
			font-size: $uni-font-size-sm;
		}
	}
}

.desc {
	margin-top: 15upx;
	flex-wrap: wrap;
	text {
		font-size: $uni-font-size-sm;
		padding: 5upx 10upx;
		margin-right: 15upx;
		background-color: $border-color-light;
		border-radius: 5upx;
		color: $font-color-666;
	}
}

.user {
	margin-top:15upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	image {
		width: 80upx;
		height: 80upx;
		border-radius: 40upx;
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
	}
}
</style>
