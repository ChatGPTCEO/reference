<template>
	<view>
		<view class="houseList" v-for="(item,index) in houseData" :key="index"
			@click="$u.route('/pagesIndex/housemain/housemain',{id:item.id})">
			<u-image width="220rpx" height="220rpx" :src="item.banner_images[0]" :lazy-load="true">
			</u-image>
			<view class="cont">
				<view style="display: flex;flex-direction: row;">
					<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40"
						style="margin-right: 10rpx;"></u-icon>
					<text class="title">{{item.title}}</text>
				</view>
				<text class="info">{{item.room}}室{{item.hall}}厅{{item.loo}}卫 | {{item.acreage}}㎡</text>
				<view class="tag" v-if="item.labelconfig">
					<text class="tag-item" v-for="(label,ix) in item.labelconfig" :key="ix">{{label.name}}</text>
				</view>
				<view v-else style="flex: 1;"></view>
				<text class="price" v-if="item.info_type=='rent'">{{item.rent}}元/月</text>
				<text class="price" v-else>{{item.rent}}万元</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "HouseList",
		props: {
			houseData: {
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
        border-radius: 15rpx;
		.cont {
			display: flex;
			flex-direction: column;
			flex: 1;
			margin-left: 20rpx;

			.title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 1;
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
