<!-- 客户项目 -->
<template>
	<view>
		<navigationBar text="帮助列表" backgroundColor="#5af" :back="true">
		</navigationBar>
		<loading v-if="loading"></loading>
		<view class="wrap" v-else>
			<view class="page-box" v-if="dataList.length > 0">
				<view class="order" v-for="(res, index) in dataList" :key="res.id">
					<view class="top">
						<view class="left">
							<uni-text class="cuIcon-titles text-blue"></uni-text>
							<view class="store">{{ res.projectName }}</view>
						</view>
					</view>
					<view class="item">
						<view class="left">
							<image src="http://cdn.zhoukaiwen.com/web2.jpg" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="title u-line-2 text-bold">联系方式：{{ res.tel ? res.tel : '暂无' }}</view>
							<view class="type">预算：{{ res.budget }}</view>
							<view class="delivery-time">开始时间： {{ res.startTime }}</view>
							<view class="delivery-time">结束时间： {{res.endTime}}</view>
						</view>
					</view>
					<u-line color="#f1f1f1" margin="24rpx 0 15rpx 0"></u-line>
					<view class="bottom">
						<view class="bottom_left">
							<redeMore>
								{{res.projectModule}}
							</redeMore>
						</view>
					</view>
					<view class="bottom">
						<view class="bottom_left">
						</view>
						<view class="btnBox">
							<view @click="canal(res.id)" class="evaluate btn">取消项目</view>
						</view>
					</view>

				</view>
			</view>
			<view class="help" @click="toAdd" v-else>项目帮助</view>
		</view>
		<u-modal :show="show" content='确认取消吗？' showCancelButton @confirm="del" @cancel="show = false"></u-modal>
	</view>
</template>

<script>
	import userApi from '@/api/userApi.js'
	export default {
		data() {
			return {
				loading: false,
				show: false,
				dataList: [],
				id: -1,
			};
		},
		onShow() {
			this.loading = true
			this.init();

		},
		methods: {
			async init() {
				let res = await userApi.getUserCustomer();
				console.log(res)
				this.dataList = res.data
				this.loading = false
			},
			canal(id) {
				this.id = id
				this.show = true
			},
			async del() {
				this.show = false
				let res = await userApi.delUserCustomer(this.id)
				this.init()
				this.id = -1
			},
			toAdd() {
				uni.navigateTo({
					url: '/pages/addDemand/addDemand'
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);

		.top {
			display: flex;
			justify-content: space-between;

			.left {
				display: flex;
				align-items: center;

				.store {
					margin: 0 10rpx;
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.right {
				color: #007AFF;

				.progressBox {
					width: 150rpx;
					float: right;
				}
			}
		}

		.item {
			display: flex;
			margin: 20rpx 0 0;

			.left {
				margin-right: 20rpx;

				image {
					width: 260rpx;
					height: 190rpx;
					border-radius: 10rpx;
				}
			}

			.content {
				.title {
					font-size: 28rpx;
					line-height: 45rpx;
				}

				.type {
					margin: 6rpx 0;
					font-size: 24rpx;
					color: #007AFF;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					line-clamp: 3;
					-webkit-box-orient: vertical;
				}

				.delivery-time {
					margin-top: 20rpx;
					color: #a29995;
					font-size: 24rpx;
				}
			}

			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;

				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}
			}
		}

		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;

			.total-price {
				font-size: 32rpx;
			}
		}

		.bottom {
			line-height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.bottom_left {
				display: flex;
				align-items: center;

				.progressBox {
					width: 150rpx;
					float: right;
				}
			}

			.btnBox {
				width: 150rpx;
				display: flex;
				justify-content: space-between;

				.btn {
					line-height: 52rpx;
					width: 140rpx;
					border-radius: 12rpx;
					border: 2rpx solid #007AFF;
					font-size: 26rpx;
					text-align: center;
					color: #007AFF;
				}

				.evaluate {
					color: #007AFF;
					border-color: #007AFF;
				}
			}
		}
	}

	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;

		image {
			width: 300rpx;
			border-radius: 50%;
			margin: 0 auto;
		}

		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
		}
	}


	.help {
		text-align: center;
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, #1cbbb4 0%, #0081ff 100%);
	}
</style>
