<template>
	<view>
		<view class="flexView">
			<view class="scrollView">
				<view class="head-read">
					<view class="flex">
						<image class="read-img" :src="userInfo.logo" mode="aspectFill" />
						<view class="flex-box">
							<view class="flex-box-text">姓名：{{userInfo.name}}</view>
							<view class="flex-box-text">ID：2022000{{userInfo.id}}</view>
						</view>
					</view>
				</view>
				<view class="white-box">
					<view class="tx">
						<view class="tx-grid">
							<view class="tx-grid-text">
								<view class="title">可提现余额</view>
								<view class="money">
									<text>{{bydata ? bydata.pay:0}}</text>
									<text class="money-b">元</text>
								</view>
							</view>
						</view>
						<view class="tx-grid" @click="navTo('/pages/user/withdrawal')"><span class="tx-grid-comm-sign">立即提现</span></view>
					</view>
					<view class="palace palace-one">
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{bydata ? bydata.dapay:0}}</text>
									<text class="palace-grid-text-data-b">元</text>
								</view>
								<view class="palace-grid-text-name">即将到账</view>
							</view>
						</view>
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{bydata ? bydata.ydpay:0}}</text>
									<text class="palace-grid-text-data-b">元</text>
								</view>
								<view class="palace-grid-text-name">累计到账</view>
							</view>
						</view>
						<view class="palace-grid">
							<view class="palace-grid-text">
								<view class="palace-grid-text-data">
									<text>{{bydata ? bydata.ljpay:0}}</text>
									<text class="palace-grid-text-data-b">元</text>
								</view>
								<view class="palace-grid-text-name">累计收入</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="u-demo-block__content">
				<u-tabs :list="list1" @click="click" :current="current">
				</u-tabs>
			</view>
			<view class="body">
				<view class="com-item">
					<view class="com-wrap">
						<view class="cell" v-for="(item, index) in list" :key="index">
							<view class="cell-left">
								<view class="cell-text">{{ item.ctime}}</view>
							</view>
							<view class="shen" v-if="current==1&&item.status==0 ">审核中</view>
							<view class="cg" v-if="current==1&&item.status==1 ">提现成功</view>
							<view class="pay" v-if="current==1&&item.status==2 ">提现失败</view>
							<view class="pay" v-if="current==0">+{{item.pay}}元</view>
							<view class="pay" v-if="current==1">-{{item.pay/100}}元</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore
				loadmoreText="显示最近30天的数据"
				color="#ababab"
				dashed
				:line="true"
			></u-loadmore>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo:null,
			bydata:null,
			current:0,
			list1: [{
				name: '收入记录',
			}, {
				name: '提现记录',
			}],
			list:[]
		};
	},
	onLoad(e) {
		
		uni.hideShareMenu({
		  menus: ['shareAppMessage', 'shareTimeline']
		})
		this.current=e.current;
		console.log(e)
	},
	onShow() {
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			this.userInfo=userInfo;
		}
		this.getlist();
		this.getpaylist();
	},
	methods: {
		navTo(path){
			console.log(path)
			uni.$u.route({
				url: path
			})
		},
		click(e){
			this.current=e.index;
			this.getpaylist();
			this.list=[]
		},
		getlist() {
			uni.showLoading({title: '数据加载中',mask:true});
			uni.$u.http.post('Income/payData', {id:this.userInfo.id}).then(res => {
				uni.hideLoading();
				// console.log(res)
				this.bydata=res.data
				uni.setStorageSync('payData', res.data);
				
			})
		},
		getpaylist() {
			// uni.showLoading({title: '数据加载中',mask:true});
			uni.$u.http.post('Income/payList', {id:this.userInfo.id,current:this.current}).then(res => {
				// uni.hideLoading();
				// console.log(res)
				if(res.code==200){
					this.list=res.data
				}
				
				// uni.setStorageSync('payData', res.data);
				
			})
		},
	},
	
};
</script>

<style lang="scss" scoped>
page {
		background: #f2f2f2;
	}
.ns {
	width: 100%;
	height: 60px;
	text-align: center;
	line-height: 200rpx;
	color: white;
	font-size: 34rpx;
	font-weight: bold;
	background: linear-gradient(to right, #ff8440, #ff1e0f);
}
.top {
	margin-top: 20rpx;
}
.flexView {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	.scrollView {
		width: 100%;
		height: 100%;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		position: relative;
		// padding-bottom: 116rpx;
		.head-read {
			background: linear-gradient(to right, #ff8440, #ff1e0f);
			background-color: #ff8440;
			padding-bottom: 100rpx;
			.flex {
				display: flex;
				align-items: center;
				padding: 50rpx;
				position: relative;
				.read-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 100%;
					overflow: hidden;
					margin-right: 20rpx;
					border: 4rpx solid rgba(255, 255, 255, 0.3);
				}
				.flex-box {
					flex: 1;
					min-width: 0;
					font-size: 26rpx;
					color: #333;
					&-text {
						margin: 10rpx 0;
						color: #f5f5f5;
						font-weight: normal;
					}
				}
				.arrow {
					position: relative;
					padding-right: 30rpx;
					span {
						font-size: 28rpx;
						color: white;
					}
					&:after {
						content: ' ';
						display: inline-block;
						height: 12rpx;
						width: 12rpx;
						border-width: 4rpx 4rpx 0 0;
						border-color: #848484;
						border-style: solid;
						transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
						position: relative;
						top: -4rpx;
						position: absolute;
						top: 50%;
						margin-top: -8rpx;
						right: 4rpx;
						border-radius: 2rpx;
					}
				}
				.arrow-one:after {
					border-color: white;
					margin-top: -6rpx;
				}
			}
		}
		.white-box {
			width: 94%;
			background: white;
			border-radius: 10rpx;
			margin: -120rpx auto 20rpx;
			box-shadow: 0 6rpx 20rpx #e7e7e7;
			.tx {
				padding-top: 26rpx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-content: center;
				&-grid {
					box-sizing: border-box;
					&:first-child {
						margin-left: 40rpx;
					}
					&-comm-sign {
						display: block;
						border-radius: 40rpx 0 0 40rpx;
						font-size: 26rpx;
						padding: 16rpx 44rpx;
						background: linear-gradient(to right, #fef082, #ffc551);
						background-color: #fef082;
						color: #cf4400;
					}
					&-text {
						display: block;
						color: #333;
						font-size: 26rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						.title {
							font-size: 26rpx;
							font-weight: normal;
							color: #ff6423;
						}
						.money {
							font-size: 60rpx;
							color: #ff6423;
							letter-spacing: 2rpx;
							margin-bottom: 10rpx;
							&-b {
								font-size: 28rpx;
							}
						}
					}
				}
			}
			.palace {
				padding-bottom: 20rpx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				&-grid {
					flex: 1;
					position: relative;
					box-sizing: border-box;
					&:not(:last-child) {
						&:after {
							width: 1rpx;
							height: 80rpx;
							background: #fddece;
							content: ' ';
							display: inline-block;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					&-text {
						display: block;
						text-align: center;
						color: #333;
						font-size: 32rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&-name {
							font-size: 26rpx;
							font-weight: normal;
							color: #ff8a4a;
						}
						&-data {
							font-size: 32rpx;
							color: #ff8a4a;
							letter-spacing: 2rpx;
							margin-bottom: 5rpx;
							&-b {
								font-size: 20rpx;
							}
						}
					}
				}
			}
		}
	}
}

.u-demo-block__content{
	text-align: center;
	align-items: center;
}

.com-item {
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 20rpx;
			background-color: #fff;

			.com-wrap {
				border-radius: 25rpx;
				overflow: hidden;
			}
		}

		.cell {
			height: 80rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			border-bottom: 1px solid #f8f8f8;

			&:active {
				background: #f2f2f2;
			}

			&:last-child {
				border-bottom: none !important;
			}

			.cell-left {
				display: flex;
				align-items: center;

				.cell-icon {
					width: 50rpx;
					height: 50rpx;
				}

				.cell-text {
					color: #666;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
			}

			
		}
	.pay{
		color: #f71109;
	}
.shen{color: #f7a974;}
.cg{color: #2da327;}
</style>
