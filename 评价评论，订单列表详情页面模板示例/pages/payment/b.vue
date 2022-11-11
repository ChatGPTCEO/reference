<template>
	<view class="page_or_details">
		<view class="or_top"  v-for="(item,index) in pro">
			<view class="top_one">
				<view class="top_left">
					<view class="left_one">
						<image src="../../tupian/location.png" class="left_two"></image>
						<view class="font14 left_three">{{item.name}}</view>
						<view class="font14 left_four">{{item.telephone}}</view>
					</view>
					<view class="font14 left_five">{{item.address}}</view>
				</view>
				<view class="top_right">
					<image src="../../tupian/set.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
			</view>
			<view class="top_bc"></view>
		</view>
		<view class="or_list">
			<view class="or_list1" v-for="(item,index) in pro">
				<image :src=item.src class="or_list2"></image>
				<view class="or_list3">
					<view class="font16 fontbold">{{item.title}}</view>
					<view class="fontbold or_list4" >
						<view class="font12">￥</view>
						<view class="font14">{{item.money}}</view>
					</view>
				</view>
			</view>
			<view  v-for="(item,index) in pro">
				<u-cell-group :border="false">
					<u-cell  title="属性" :border="false" :value="item.attribute" :isLink="true" ></u-cell>
					<u-cell  title="数量" :border="false" :value="item.quantity" :isLink="true"></u-cell>
					<u-cell  title="支付方式" :border="false" :value="item.oline_payment" :isLink="true" ></u-cell>
					<u-cell  title="优惠券" :border="false" :value="item.discount" :isLink="true"></u-cell>
					<u-cell  title="积分" :border="false" :value="item.integral" :isLink="true" ></u-cell>
				</u-cell-group>
			</view>
		</view>
		<view class="or_list5" v-for="(item,index) in pro">
			<u-cell-group :border="false">
				<u-cell  title="服务时间" :border="false" :value="item.time" :isLink="true" ></u-cell>
				<u-cell  title="备注" :border="false" :value="item.remarks" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		<view class="or_btm"  v-for="(item,index) in pro">
			<view class="or_btm1">
				<view class="font14">合计：</view>
				<view class="or_btm2">
					<view class="font12">￥</view>
					<view class="font16">{{item.money}}</view>
				</view>
				<u-button class="or_btm3">{{item.button}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pro:[{
					name:"王子毅",
					telephone:"14748890613",
					address:"贵州省黔西南州兴义市梦乐城购物中心",
					title:"春色家政-专业冰箱清理",
					money:"166.00",
					src:require('@/tupian/touxiang.jpg'),
					attribute:"对开门冰箱清洗",
					quantity:"2",
					oline_payment:"在线支付",
					discount:"200元",
					time:"2021-12-10 16:13:00",
					remarks:"走南门",
					integral:"30分",
					button:"预约服务",
				}],
				}
			}
		}
</script>

<style lang="scss">
	.page_or_details {
		width: 100vw;
		min-height: 100vh;
		background-color: #f8f8f8;
		.font12{
			font-size: 12px;
		}
		.font14{
			font-size: 14px;
		}
		.font16{
			font-size: 16px;
		}

		.or_top {
			width: 100vw;
			height: 230rpx;
			position: relative;
			display: flex;
			justify-content: center;

			.top_one {
				height: 180rpx;
				width: 86vw;
				background-color: #ffffff;
				position: absolute;
				margin-top: 30rpx;
				border-radius: 10px;
				display: flex;

				.top_left {
					width: 80%;

					.left_one {
						display: flex;
						align-items: center;
					}

					.left_two {
						width: 50rpx;
						height: 50rpx;
						margin: 40rpx 20rpx 0 40rpx;
					}

					.left_three {
						margin: 40rpx 40rpx 0 0;
						font-weight: bold;
					}

					.left_four {
						margin: 40rpx 0 0 20rpx;
						font-weight: bold;
					}

					.left_five {
						margin-left: 110rpx;
						color: #828282;
					}
				}

				.top_right {
					width: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.top_bc {
				background-color:#25A785;
				height: 80%;
				width: 100%;
				border-radius: 0 0 50% 50%;
			}
		}

		.or_list {
			width: 86vw;
			height: 700rpx;
			background-color: #FFFFFF;
			margin-left: 56rpx;
			border-radius: 10px;
			.or_list1{
				display: flex;padding:30rpx;
			}
			.or_list2{
				width: 170rpx;height: 170rpx;border-radius: 10px;
			}
			.or_list3{
				height: 160rpx;margin-left: 30rpx;
			}
			.or_list4{
				display: flex;color: red;align-items: flex-end;margin-top: 60rpx;
			}
		}
		.or_list5{
			width: 86vw;background-color: #FFFFFF;
				margin-left: 56rpx;
				margin-top: 30rpx;
				border-radius: 10px;
				height: 180rpx;
		}
		.or_btm {
			background-color: #ffffff;
			width: 100vw;
			height: 100rpx;
			position: fixed;
			bottom: 0rpx;
			.or_btm1{
				display: flex;align-items: center;margin: 15rpx 15rpx 15rpx 90rpx;
			}
			.or_btm2{
				display: flex;align-items: flex-end;color: red;
			}
			.or_btm3{
				width: 40%;background-color: #25A785;border:#25A785;color: #FFFFFF;
			}
		}
	}
</style>
