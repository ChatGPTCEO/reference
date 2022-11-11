<template>
	<view>
		<view class="houseList" v-for="(item,index) in farmData" :key="index"
			@click="$u.route('/pagesIndex/farmingmain/farmingmain',{id:item.id})">
			<u-image width="220rpx" height="160rpx" :src="item.banner_images[0]">
			</u-image>
			<view class="cont">
				<view style="display: flex;flex-direction: row;flex: 1;align-items: flex-start;">
					<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40"
						style="margin-right: 10rpx;"></u-icon>
					<text class="title">{{item.title}}</text>
				</view>
				<text class="info">{{item.createtime_text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "GoodsList",
		props: {
			farmData: {
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
	.houseList {
		display: flex;
		flex-direction: row;
		padding: 20rpx;
		background-color: white;
		border-bottom: 1rpx solid #e6e6e6;

		.cont {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 20rpx;

			.title {
				font-size: 32rpx;
				color: #333333;
				flex: 1;
				font-weight: 600;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.info {
				font-size: 26rpx;
				color: #999999;
				margin-top: 20rpx;
			}
		}
	}
</style>
