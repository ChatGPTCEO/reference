<template>
	<view>
		<view class="houseList" v-for="(item,index) in goodsData" :key="index"
			@click="$u.route('/pagesIndex/goodsmain/goodsmain',{id:item.id})">
			<u-image width="240rpx" height="180rpx" :src="item.banner_images[0]">
			</u-image>
			<view class="cont">
				<view style="display: flex;flex-direction: row;align-items: flex-start;">
					<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40"
						style="margin-right: 10rpx;"></u-icon>
					<text class="title">{{item.title}}</text>
				</view>
				<view class="tag" v-if="item.labelconfig">
					<text class="tag-item" v-for="(label,ix) in item.labelconfig" :key="ix">{{label.name}}</text>
				</view>
				<view v-else style="flex: 1;"></view>
				<text class="price" v-if="item.is_face=='0'">{{item.price}}元</text>
				<text class="price" v-else>面议</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "GoodsList",
		props: {
			goodsData: {
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

			.tag {
				display: flex;
				flex-direction: row;
				align-items: center;
				flex-wrap: wrap;

				.tag-item {
					padding: 3rpx 10rpx;
					background-color: #F8F8F8;
					margin-right: 10rpx;
					font-size: 24rpx;
					color: #999999;
					margin-top: 20rpx;
				}
			}

			.price {
				color: #ff2d45;
				font-weight: bold;
				margin-top: 20rpx;
			}
		}
	}
</style>
