<template>
	<view>
		<view class="list" v-for="(item,index) in JobData" :key="index"
			@click="$u.route('/pagesIndex/jobmain/jobmain',{id:item.id})">
			<view class="flexspe">
				<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40" style="margin-right: 10rpx;"></u-icon>
				<text class="title">{{item.title}}</text>
				<text class="price" v-if="item.is_face=='0'">{{item.salary_min}}-{{item.salary_max}}元/月</text>
				<text class="price" v-else>面议</text>
			</view>
			<view class="flexspe">
				<view class="list-tag">
					<text>{{item.work_exp_text}}</text>
					<text style="padding: 0 10rpx;">|</text>
					<text>{{item.edu_text}}</text>
				</view>
				<text class="list-tag">{{item.createtime_text}}</text>
			</view>
			<view class="list-tag" v-if="item.labelconfig">
				<text class="tag" v-for="(label,ix) in item.labelconfig"  :key="ix">{{label.name}}</text>
			</view>
			<view class="bot">
				<view class="address">
					<u-icon name="map" color="#999999" size="28"></u-icon>
					<text>{{item.work_address}}</text>
				</view>
				<view class="btn">
					<text>联系</text>
					<!-- <text>申请</text> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "JobList",
		props: {
			JobData: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: white;
		margin-bottom: 10rpx;

		.flexspe {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			flex: 1;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.list-tag {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;
			color: #999999;
			font-size: 28rpx;
			margin-top: 20rpx;

			.tag {
				font-size: 22rpx;
				background-color: #f8f8f8;
				padding: 5rpx 15rpx;
				border-radius: 5rpx;
				margin-right: 15rpx;
			}
		}

		.price {
			color: #ff2d45;
			font-weight: bold;
		}

		.bot {
			border-top: 1rpx solid #e6e6e6;
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding-top: 20rpx;
			color: #999999;
			font-size: 28rpx;
			.address{
				flex: 1;
				margin-right: 20rpx;
			}
			.btn {
				padding: 5rpx 20rpx;
				font-size: 32rpx;
				color: #40c6bf;
				background-color: #ebf9f8;
				border-radius: 5rpx;
			}
		}
	}
</style>
