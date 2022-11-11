<template>
	<view class="withdraw">
		<view class="withdraw-head">
			<view class="withdraw-head-to">到账渠道</view>
			<view class="withdraw-head-way">
				<view class="withdraw-head-way-1">
					<image class="way-icon" src="../../static/images/money.png"></image>
					<text class="way-text">微信零钱</text>
				</view>
				<view class="withdraw-head-way-2">仅支持整数，72小时内到账</view>
			</view>
		</view>
		<view class="withdraw-body">
			<text>提现金额</text>
			<view class="input-money">
				<text class="rmb">￥</text>
				<input v-model="extract" @input="numberFixedDigit" type="text" class="t-input" />
			</view>
			<view class="info-money">
				<view v-if="is_out">
					<text class="info-money-num" style="color: #ff1e0f;">输入金额超过可提现余额，账户余额{{ pool }}元</text>
				</view>
				<view v-else-if="is_lowest">
					<text class="info-money-num" style="color: #ff1e0f;">最低{{ lowest }}元起提现，账户余额{{ pool }}元</text>
				</view>
				<view v-else>
					<text class="info-money-num">当前可提现余额{{ pool }}元，</text>
					<text class="info-money-all" @click="getAll">全部提现</text>
				</view>
			</view>
			<view :class="'tx' + (is_post ? '-active' : '')"><button @click="handleShowModel">提现</button></view>
		</view>
		<view class="cu-modal" >
			<view class="cu-dialog">
				<view class="padding-xl" style="text-align: left;">
					<view>
						<text class="text-red">可提现余额：</text>
						<text>当前您可以提现的金额</text>
					</view>
					<view class="margin-top-sm">
						<text class="text-red">微信零钱：</text>
						<text>仅支持整数，72小时内到账</text>
					</view>
					<view class="margin-top-sm">
						<text class="text-red">提现服务费：</text>
						<text>微信官方服务费0.45%</text>
					</view>
					<view class="margin-top-sm">
						<text class="text-red">提现次数：</text>
						<text>每天只可提现一次</text>
					</view>
					
					<view class="margin-top-sm"><text class="text-red">*注：所有金额币种均为人民币，单位为元</text></view>
				</view>
				
			</view>
		</view>

		

	</view>
</template>

<script>
export default {
	data() {
		return {
			pool: 0,
			extract: '',
			service_fee: 0.0,
			showModal: false,
			is_out: false,
			is_lowest: false,
			is_post: false,
			lowest: 10,
			fee: 0,
			money: '',
			real_money: '',
			keyboradShow: false,
			isIphoneX: false,
			isRefuse: false,
			userInfo:null,
			bydata:null
		};
	},
	watch: {
		extract(oldVal, newVal) {}
	},
	onLoad() {
		uni.hideShareMenu({
		  menus: ['shareAppMessage', 'shareTimeline']
		})
	},
	onShow() {
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			this.userInfo=userInfo;
		}
		const bydata=uni.getStorageSync('payData');
		this.pool=bydata.pay
		
	},
	methods: {
		
		
		
		getAll() {
			this.extract = parseInt(this.pool);
			this.checkMoney();
		},
		checkMoney() {
			if (!this.extract || this.extract < this.lowest) {
				this.is_lowest = true;
				this.is_post = false;
			} else if (this.extract > this.pool) {
				this.is_out = true;
				this.is_lowest = false;
				this.is_post = false;
			} else {
				this.is_out = false;
				this.is_lowest = false;
				this.is_post = true;
			}
			if (parseFloat(this.extract).toString() == 'NaN') {
				this.is_post = false;
				// this.$api.msg('输入金额不合法');
				uni.showToast({
					title: "输入金额不合法",
					icon: 'none'
				})
			}
		},
		
		numberFixedDigit (e) { // 只能输入整数
		  e.target.value = e.target.value.replace(/^0|[^\d]|[.]/g, '')
		  this.$nextTick(() => {
		    this.extract= e.target.value
		  })
		  this.checkMoney();
		},
		
		handleShowModel() {
			if (this.isRefuse) return;
			this.checkMoney();
			if (!this.is_post) return;
			this.money = this.extract;
			this.service_fee = Number((this.extract * (this.fee / 100)).toString().match(/^\d+(?:\.\d{0,2})?/));
			this.real_money = Number((this.extract - this.service_fee).toString().match(/^\d+(?:\.\d{0,2})?/));
			this.showModal = true;
			
			uni.showLoading({title: '提交中',mask:true});
			uni.$u.http.post('Income/payAdd', {id:this.userInfo.id,pay:this.extract}).then(res => {
				
				// uni.hideLoading();
				console.log(res)
				
				if(res.code==200){
					uni.hideLoading();
					uni.showToast({
						title: res.msg,
						icon: 'success'
					})
					setTimeout(() => {
						// 返回上一页并刷新数据方法
						let pages = getCurrentPages(); // 当前页面
						let beforePage = pages[pages.length - 2]; // 上一页
						beforePage.data.refreshIfNeeded = true;
						// 返回上一页 delta返回的页面数 如果delta大于现有页面数，则返回首页
					  uni.navigateBack({
						delta: 1
					  })
					}, 300);
				}else{
					this.getlist()
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
				
				
			})
		},
		getlist() {
			// uni.showLoading({title: '数据加载中',mask:true});
			uni.$u.http.post('Income/payData', {id:this.userInfo.id}).then(res => {
				
				uni.hideLoading();
				// console.log(res)
				// this.bydata=res.data
				this.pool=res.data.pay
				uni.setStorageSync('payData', res.data);
				
			})
		},
		
	},
	
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.withdraw {
	padding: 20px;
	&-head {
		background-color: #f7f7f7;
		display: flex;
		align-content: center;
		padding: 20px 30px;
		font-size: 14px;
		&-to {
		}
		&-way {
			display: flex;
			flex-direction: column;
			align-content: center;
			margin-left: 20px;
			&-1 {
				color: #576b95;
				margin-bottom: 10px;
				.way-icon {
					width: 16px;
					height: 16px;
					margin-right: 5px;
					top: 2px;
				}
			}
			&-2 {
				color: #acacac;
				font-size: 12px;
			}
		}
	}
	&-body {
		background-color: #fff;
		padding: 20px 30px;
		font-size: 14px;
		.input-money {
			display: flex;
			align-content: center;
			font-weight: 600;
			border-bottom: 0.5px solid #eaeef1;
			.rmb {
				font-size: 2em;
				top: 10px;
				position: relative;
			}
			.t-input {
				height: 1.9em;
				font-size: 2.5em;
				border: none;
				position: relative;
				left: 3.5%;
				outline: none;
			}
		}
		.info-money {
			margin-top: 10px;
			font-size: 12px;
			margin-bottom: 20px;
			&-num {
				color: #b2b2b2;
			}
			&-all {
				color: #576b95;
			}
		}
		.tx {
			button {
				color: #b2b2b2;
			}
		}
		.tx-active {
			button {
				color: #fff;
				background: #07c160;
			}
		}
	}
	.keyboard {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ebebeb;
		display: flex;
		justify-content: center;
		z-index: 2;
		flex-wrap: wrap;
		transition: all 0.2s ease-in 0.2s;
	}
	.active {
		bottom: -400rpx;
	}
	.keyboard-item {
		box-sizing: border-box;
		width: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-size: 40rpx;
		color: #333;
		height: 99rpx;
		border: 1rpx solid #ebebeb;
		border-top: none;
		border-left: none;
	}
	.hide {
		opacity: 0;
	}
	.delte {
		background: none;
		box-shadow: none;
	}
	.delte image {
		width: 60rpx;
		height: 60rpx;
	}
	.isIphone {
		padding-bottom: 68rpx !important;
	}
	.fee {
		em {
			font-size: 0.5rem;
			font-style: normal;
		}
	}
}
.cu-modal{
	background-color: #f7f7f7;
	border-radius: 10rpx;
	padding: 20px 30px;
	font-size: 14px;
	line-height: 55rpx;
	color: #ce760f;
}
</style>
