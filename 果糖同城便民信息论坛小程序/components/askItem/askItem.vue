<template>
	<view>
		<view class="item" v-for="(item,index) in askData" :key="index"
			@click="$u.route('/pagesIndex/askmain/askmain',{id:item.id})">
			<view class="left">
				<view style="display: flex;flex-direction: row;align-items: flex-start;">
					<u-icon v-if="item.is_top=='2'" name="/static/images/top.png" size="40"
						style="margin-right: 10rpx;"></u-icon>
					<view class="item-title">{{item.title}}</view>
				</view>
				<block v-if="item.type=='1'">
					<view class="price" v-if="item.price_max||item.price_min">
						{{item.price_max}}-{{item.price_max}}万元
					</view>
				</block>
				<block v-if="item.type=='2'">
					<view class="price" v-if="item.price_max||item.price_min">
						{{item.price_max}}-{{item.price_max}}元/月
					</view>
				</block>
				<block v-if="item.type=='3'">
					<view class="price" v-if="item.price_max||item.price_min">
						{{item.price_max}}-{{item.price_max}}万元
					</view>
				</block>
				<block v-if="item.type=='4'">
					<view class="price" v-if="item.price_max||item.price_min">
						{{item.price_max}}-{{item.price_max}}元
					</view>
				</block>
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
			<u-image v-if="item.images.length>0" width="220rpx" height="200rpx" :src="item.images[0]">
			</u-image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "askItem",
		props: {
			askData: {
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
		flex-direction: row;
		padding: 20rpx;
		background-color: white;
		border-bottom: 1rpx solid #e6e6e6;
		min-height: 200rpx;

		.left {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-right: 20rpx;

			.item-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: 600;
				word-break: break-all;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.price {
				font-size: 30rpx;
				color: red;
				font-weight: 600;
			}

			.bot {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #666666;

				.user {
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			}
		}
	}
</style>
