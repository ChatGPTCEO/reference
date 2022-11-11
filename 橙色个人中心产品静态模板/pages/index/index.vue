<template>
	<view class="main" style="background-color: #e4ecf7;min-height: 100vh;">
		<view class="user_header_box">
			<view class="avatar_box">
				<image class="img" src="../../static/user/avatar.png" mode=""></image>
			</view>
			<view class="user_info">
				<view class="name">
					张三
				</view>
				<view class="uid">
					DI:184 8888 8888
				</view>
			</view>
		</view>
		<view class="user_amount_box">
			<view class="user_level">
				<image class="icon" src="../../static/user/level_icon.png"></image>
				<view class="level_desc_box">
					<view class="title">
						申请会员权益
					</view>
					<view class="desc">
						加入会员享受更多特权
					</view>
				</view>
				<image class="right_icon" src="../../static/user/right.png" mode=""></image>
			</view>
			<view class="amount_box">
				<view class="amount">
					360,000.00 <text style="font-size: 26rpx;">元</text>
				</view>
				<view class="now_with">
					立即提现
				</view>
			</view>
		</view>
		<view class="user_tab_box">
			<view class="tab_title">
				常用服务
			</view>
			<view class="tab_list_box">
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/amount.png" mode=""></image>
					<view class="text">我的钱包</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/xieyi.png" mode=""></image>
					<view class="text">注册协议</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/account.png" mode=""></image>
					<view class="text">我的资料</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/help.png" mode=""></image>
					<view class="text">常见问题</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/kefu.png" mode=""></image>
					<view class="text">我的客服</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/level.png" mode=""></image>
					<view class="text">激活权限</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/about.png" mode=""></image>
					<view class="text">关于我们</view>
				</view>
				<view class="list_item">
					<image class="icon" src="../../static/user/tab_icon/setting.png" mode=""></image>
					<view class="text">我的设置</view>
				</view>
			</view>
		</view>
		<view class="loan_box">
			<view class="loan_title_box">
				<view class="title">
					热门产品
				</view>
				<view class="link">
					查看更多
				</view>
			</view>
			<view class="loan_list">
				<view class="list_item" v-for="(item,index) in productList" :key="index">
					<view class="item_head">
						<image class="pic" src="../../static/logo.png" mode=""></image>
						<view class="loan_info">
							<view class="name">
								产品名称
							</view>
							<view class="date">
								产品描述
							</view>
						</view>
						<view class="join_btn">
							立即购买
						</view>
					</view>
					<view class="item_bottom">
						<view class="bottom_item">
							<view class="names">
								价格
							</view>
							<view class="amount">
								{{index+1}}300
							</view>
						</view>
						<view class="bottom_item">
							<view class="names">
								服务周期
							</view>
							<view class="amount">
								3-24
							</view>
						</view>
						<view class="bottom_item">
							<view class="names">
								售后服务
							</view>
							<view class="amount">
								{{index+1}}次
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot_line">
			<view class="line"></view>
			<text style="margin: 0 20rpx;font-size: 28rpx;">我的也有底线的</text>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList:[1,2,3,4,5,6,7]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.user_header_box{
		height: 340rpx;
		width: 100%;
		background-image: url(../../static/user/head_bg.png);
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: left;
		.avatar_box{
			margin-left: 80rpx;
			.img{
				height: 120rpx;
				width: 120rpx;
			}
		}
		.user_info{
			color: #fff;
			margin-left: 20rpx;
			.name{
				
			}
			.uid{
				
			}
		}
	}
	.user_amount_box{
		width: 90%;
		margin: -90rpx auto 0 auto;
		.user_level{
			border-radius: 10rpx 10rpx 0 0;
			background-color: #e2eefe;
			padding: 10rpx 14rpx;
			display: flex;
			align-items: center;
			.icon{
				height: 60rpx;
				width: 60rpx;
			}
			.level_desc_box{
				margin-left: 20rpx;
				.title{
					font-size: 28rpx;
				}
				.desc{
					font-size: 20rpx;
					color: #808080;
				}
			}
			.right_icon{
				height: 26rpx;
				width: 16rpx;
				margin-left: auto;
				padding-right: 10rpx;
			}
		}
		.amount_box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			border-radius: 0 0 10rpx 10rpx;
			padding: 40rpx 60rpx;
			.amount{
				font-size: 46rpx;
			}
			.now_with{
				background-color: #ffa415;
				color: #fff;
				padding: 8rpx 30rpx;
				border-radius: 5rpx;
			}
		}
	}
	.user_tab_box{
		background-color: #fff;
		width: 90%;
		margin: 20rpx auto;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		.tab_title{
			font-size: 30rpx;
		}
		.tab_list_box{
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			.list_item{
				width: 25%;
				text-align: center;
				margin: 16rpx 0;
				.icon{
					height: 80rpx;
					width: 80rpx;
				}
				.text{
					color: #666666;
					margin-top: -10rpx;
					font-size: 26rpx;
				}
			}
		}
	}
	.loan_box{
		background-color: #fff;
		width: 90%;
		margin: 20rpx auto;
		border-radius: 10rpx;
		padding: 10rpx 20rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		.loan_title_box{
			display: flex;
			align-items: center;
			padding-top: 6rpx;
			.title{
				font-size: 30rpx;
			}
			.link{
				margin-left: auto;
				color: #797979;
				font-size: 20rpx;
			}
		}
		.loan_list{
			margin-top: 30rpx;
			.list_item{
				padding: 0 10rpx;
				border-bottom: 1px solid #e9e9e9;
				margin-top: 20rpx;
				.item_head{
					display: flex;
					align-items: center;
					.pic{
						height: 100rpx;
						width: 100rpx;
					}
					.loan_info{
						margin-left: 20rpx;
						.name{
							color: #797979;
							font-weight: 600;
						}
						.date{
							color: #797979;
							margin-top: 6rpx;
						}
					}
					.join_btn{
						background-color: #2979ff;
						color: #fff;
						margin-left: auto;
						margin-right: 20rpx;
						padding: 6rpx 30rpx;
						border-radius: 30rpx;
						font-size: 28rpx;
					}
				}
				.item_bottom{
					display: flex;
					margin-top: 20rpx;
					padding-bottom: 14rpx;
					width: 100%;
					.bottom_item{
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: center;
						font-size: 26rpx;
						.names{
							color: #797979;
						}
						.amount{
							color: #ff0548;
							margin-top: 6rpx;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
	.foot_line{
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 20rpx;
		color: #5f5f5f;
		.line{
			width: 200rpx;
			border-bottom: 1px solid #5f5f5f;
		}
	}
</style>
