<template>
	<view>
		<view class="item" v-for="(item,index) in promoteData" :key="index"
			@click="$u.route('/pagesIndex/promotemain/promotemain',{id:item.id})">
			<view style="display: flex;flex-direction: row;align-items: flex-start;">
				<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40" style="margin-right: 10rpx;">
				</u-icon>
				<text class="title">{{item.title}}</text>
			</view>
			<text class="intro">{{item.content}}</text>
			<view class="imgbox">
				<block v-for="(it,ix) in item.banner_images" :key="ix">
					<u-image class="image" width="216rpx" height="216rpx" v-if="ix<=2" :src="it"></u-image>
				</block>
			</view>
			<view class="bot">
				<view class="user">
					<u-image shape="circle" width="35rpx" height="35rpx" :src="item.user.avatar"></u-image>
					<text style="margin-left: 10rpx;">{{item.user.nickname}}</text>
				</view>
				<view class="">
					<text>{{item.createtime_text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "promoteItem",
		props: {
			promoteData: {
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
	.item {
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		background-color: white;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
		margin-top: 10rpx;
		border-radius: 20rpx;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.intro {
			font-size: 30rpx;
			color: #666666;
			word-break: break-all;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}

		.imgbox {
			display: flex;
			flex-direction: row;
			align-items: center;

			.image {
				margin: 5rpx;
			}
		}

		.bot {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			color: #666666;
			margin-top: 20rpx;

			.user {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		}
	}
</style>
